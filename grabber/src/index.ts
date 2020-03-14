/*
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

import * as admin from "firebase-admin";
import fetch from "node-fetch";
import { logger } from "./logger";
const serviceAccount = require("../serviceAccountKey.json");

const queryPsStore = async (region: any, cusa: string, size: number = 0, start: number = 0) => {
    logger.debug(`Quering cusa=${cusa}, start=${start}, size=${size}`);

    const baseUrl = "https://store.playstation.com/store/api/chihiro/00_09_000";
    let url = `${baseUrl}/container/${region.country}/${region.language}/999/${cusa}?&sort=timestamp&direction=asc`;
    if (size !== undefined) {
        url += `&size=${size}`;
    }
    if (start !== undefined) {
        url += `&start=${start}`;
    }

    const response = await fetch(url);
    const json: any = response.json();
    if (json.cause) {
        logger.error(`Cannot execute query. ${json.cause}`);
        return undefined;
    }
    return json;
};

const getRegions = async (db: FirebaseFirestore.Firestore) => {
    const query = await db
        .collection("regions")
        .orderBy("name", "asc")
        .get();
    if (!query || query.docs.length === 0) return undefined;

    const regions = [];
    for (const doc of query.docs) {
        regions.push(doc.data());
    }

    return regions;
};

const updateGameRecord = async (db: FirebaseFirestore.Firestore, region: any, game: any) => {
    if (!game || !game.id) {
        logger.error("Not valid game record: " + JSON.stringify(game));
        return;
    }

    const query = await db
        .collection("regions")
        .doc(`${region.language}-${region.country}`)
        .collection("games")
        .doc(game.id)
        .get();

    const current = query.data();

    if (!current || current.timestamp < game.timestamp) {
        await db
            .collection("regions")
            .doc(`${region.language}-${region.country}`)
            .collection("games")
            .doc(game.id)
            .set(game);
    }
};

const updateStoreJob = async (db: FirebaseFirestore.Firestore) => {
    const start = admin.firestore.Timestamp.now();
    logger.info(`Performing store update at ${start.toMillis()}`);

    const regions = await getRegions(db);
    if (!regions) {
        logger.warn("No regions found");
        return;
    }

    for (const region of regions) {
        if (!region.root) continue;
        logger.info(`Start processing region ${region.name}`);

        const info = await queryPsStore(region, region.root);
        if (!info) {
            logger.warn(`Cannot get store info for ${region.name}`);
            continue;
        }
        await updateGameRecord(db, region, info);

        logger.info(`Loading games from region ${region.name}`);

        const gamesJson = await queryPsStore(region, region.root, info.total_results);
        if (!gamesJson || !gamesJson.links || gamesJson.links.length === 0) {
            logger.warn(`No games found for ${region.name}`);
            continue;
        }

        for (const game of gamesJson.links) {
            if (!game || !game.id || !game.default_sku) continue;
            await updateGameRecord(db, region, game);
        }

        logger.info(`Finish processing region ${region.name}`);
    }

    const end = admin.firestore.Timestamp.now();
    logger.info(`Finished store update at ${end.toMillis()}`);
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://psn-tracker.firebaseio.com",
});
const db = admin.firestore();

Promise.resolve(updateStoreJob(db));
