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

const getGame = async (db: FirebaseFirestore.Firestore, region: any, game: any) => {
    const query = await db
        .collection("regions")
        .doc(`${region.language}-${region.country}`)
        .collection("games")
        .doc(game.id)
        .get();

    return query.data();
};

const setGame = async (db: FirebaseFirestore.Firestore, region: any, game: any) => {
    await db
        .collection("regions")
        .doc(`${region.language}-${region.country}`)
        .collection("games")
        .doc(game.id)
        .set(game);
};

export { getRegions, getGame, setGame };
