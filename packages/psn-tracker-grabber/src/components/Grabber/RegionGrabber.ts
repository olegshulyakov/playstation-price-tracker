/*
 * Copyright (c) 2020. Oleg Shulyakov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { logger } from "../Logger";
import { queryPsStore } from "../../services/Playstation";
import { sleep } from "../Sleep";
import { firestore } from "firebase-admin";
import Firestore = firestore.Firestore;
import WriteBatch = firestore.WriteBatch;
import DocumentReference = firestore.DocumentReference;

const BATCH_MAX_SIZE = 100; // should be less 500
const FIREBASE_BATCH_PERIOD = 1000;

export class RegionGrabber {
    private readonly db: Firestore;
    private readonly region: any;
    private counter: number = 0;
    private latestTimestamp: number;
    private batch: WriteBatch | undefined = undefined;

    constructor(db: Firestore, region: any) {
        this.db = db;
        this.region = region;
        this.latestTimestamp = this.region.timestamp ? this.region.timestamp : 0;
    }

    addBatch(ref: DocumentReference, doc: any) {
        if (!this.batch) {
            this.batch = this.db.batch();
        }
        this.counter++;
        this.batch.set(ref, doc, { merge: true });
    }

    async commitBatch() {
        if (!this.batch) return;
        logger.debug(`[${this.region.name}] Committing batch`);
        await this.batch.commit();
        this.counter = 0;
    }

    async getStoreInfo() {
        const info = await queryPsStore(this.region, this.region.root);
        if (!info || !info.id) {
            throw new Error(`[${this.region.name}] Cannot get store info`);
        }

        const storeRef = this.db.collection("regions").doc(`${this.region.language}-${this.region.country}`).collection("games").doc(info.id);
        this.addBatch(storeRef, info);

        return info;
    }

    async processGame(game: any) {
        if (!game.id || !game.default_sku || this.latestTimestamp >= game.timestamp) {
            return;
        }

        const gameRef = this.db.collection("regions").doc(`${this.region.language}-${this.region.country}`).collection("games").doc(game.id);
        this.addBatch(gameRef, game);
        this.latestTimestamp = game.timestamp;
    }

    async loadGames(info: any) {
        logger.info(`[${this.region.name}] Loading games`);
        const total = info.total_results;
        let start = 0;
        while (start < total) {
            const size = start + BATCH_MAX_SIZE <= total ? BATCH_MAX_SIZE : total - start;
            const gamesJson = await queryPsStore(this.region, this.region.root, size, start);

            if (!gamesJson || !gamesJson.links || gamesJson.links.length === 0) {
                logger.warn(`[${this.region.name}] No games found`);
                break;
            }

            for (const game of gamesJson.links) {
                if (this.counter >= BATCH_MAX_SIZE) {
                    await this.commitBatch();
                    await sleep(FIREBASE_BATCH_PERIOD);
                }

                await this.processGame(game);
            }
            start += gamesJson.links.length;
        }
    }

    async updateRegion() {
        this.region.timestamp = this.latestTimestamp;
        const regionRef = this.db.collection("regions").doc(`${this.region.language}-${this.region.country}`);
        this.addBatch(regionRef, this.region);
        await this.commitBatch();
    }

    async process() {
        logger.info(`[${this.region.name}] Start processing, last update=${this.latestTimestamp}`);
        const info = await this.getStoreInfo();
        await this.loadGames(info);
        await this.updateRegion();
        logger.info(`[${this.region.name}] Finish processing`);
    }
}
