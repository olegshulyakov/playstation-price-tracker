/**
 * Copyright 2020 Oleg Shulyakov
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

import {logger} from "../Logger";
import {queryPsStore} from "../../services/Playstation";
import {getRegions} from "../../services/Firebase";
import {sleep} from "../Sleep";

const batchSize = 100; // should be less 500
const FIREBASE_BATCH_PERIOD = 1000;
const FIREBASE_REGION_PERIOD = 300000;

export const processRegion = async (db: FirebaseFirestore.Firestore, region: any) => {
    logger.info(`[${region.name}] Start processing`);

    const info = await queryPsStore(region, region.root);
    if (!info || !info.id) {
        logger.warn(`[${region.name}] Cannot get store info`);
        return;
    }


    logger.debug(`[${region.name}] Last update: ${region.timestamp}`);

    let batch = db.batch();
    let count = 1;
    const gameRef = db
        .collection("regions")
        .doc(`${region.language}-${region.country}`)
        .collection("games")
        .doc(info.id);
    batch.set(gameRef, info, {merge: true});


    logger.info(`[${region.name}] Loading games`);
    let latestTimestamp: number = region.timestamp ? region.timestamp : 0;
    let batchStart = 0;
    while (batchStart < info.total_results) {
        const batchEnd = batchStart + batchSize;
        const size = batchEnd > info.total_results ? info.total_results - batchStart : batchSize;
        const gamesJson = await queryPsStore(region, region.root, size, batchStart);

        if (!gamesJson || !gamesJson.links || gamesJson.links.length === 0) {
            logger.warn(`[${region.name}] No games found`);
            break;
        }

        for (const game of gamesJson.links) {
            if (count >= batchSize) {
                logger.debug(`[${region.name}] Flashing batch`);
                await batch.commit();
                await sleep(FIREBASE_BATCH_PERIOD);
                batch = db.batch();
                count = 0;
            }

            if (!game.id || !game.default_sku) {
                // logger.warn(`[${region.name}] Skipping [${game.id}]`);
                continue;
            }

            if (latestTimestamp < game.timestamp) {
                // logger.debug(`[${region.name}] Storing [${game.id}]`);
                count++;
                const gameRef = db
                    .collection("regions")
                    .doc(`${region.language}-${region.country}`)
                    .collection("games")
                    .doc(game.id);
                batch.set(gameRef, game, {merge: true});
            }
            if (latestTimestamp < game.timestamp) {
                latestTimestamp = game.timestamp;
            }
        }
        batchStart += size;
    }

    const regionRef = db
        .collection("regions")
        .doc(`${region.language}-${region.country}`);
    batch.update(regionRef, "timestamp", latestTimestamp);

    await batch.commit();

    logger.info(`[${region.name}] Finish processing`);
};

export const updateStoreJob = async (db: FirebaseFirestore.Firestore) => {
    logger.info("Performing store update");

    try {
        const regions = await getRegions(db);
        if (!regions) {
            logger.warn("No regions found");
            return;
        }

        for (const region of regions) {
            if (!region.root) {
                logger.warn(`[${region.name}] Skipping invalid`);
                continue;
            }
            try {
                await processRegion(db, region);
            } catch (e) {
                logger.error(`[${region.name}] Cannot process:`, e);
            }
            await sleep(FIREBASE_REGION_PERIOD);
        }
    } catch (e) {
        logger.error("Processing failed", e);
        return;
    }

    logger.info("Finished store update");
};
