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
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/performance";
import "firebase/analytics";
import * as PlaystationApi from "playstation-api";

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

try {
    app.performance();
    console.info("Performance monitoring is ON");
} catch (e) {
    console.warn("Performance monitoring is OFF");
}

try {
    app.analytics();
    console.info("Analytics is ON");
} catch (e) {
    console.warn("Analytics is OFF");
}

const firestore = app.firestore();

try {
    firestore.enablePersistence({ synchronizeTabs: true });
    console.info("Persistence is ON");
} catch (e) {
    console.warn("Persistence is OFF");
}

export const getRegions = async (): Promise<PlaystationApi.types.PlaystationRegion[]> => {
    const querySnapshot = await firestore
        .collection("regions")
        .orderBy("name", "asc")
        .get();
    if (querySnapshot.empty) {
        return [];
    }

    const regions: PlaystationApi.types.PlaystationRegion[] = [];
    querySnapshot.forEach(function(doc) {
        const data = doc.data();
        // console.debug(doc.id, " => ", data);
        const region = {
            country: data.country,
            language: data.language,
            name: data.name,
            root: data.root,
        };
        regions.push(region);
    });

    return regions;
};

export const loadGame = async (
    region: PlaystationApi.types.PlaystationRegion,
    cusa: string,
): Promise<PlaystationApi.types.PlaystationGameResponse | PlaystationApi.types.PlaystationResponse | undefined> => {
    if (!region || !cusa) {
        return undefined;
    }

    const documentSnapshot = await firestore
        .collection("regions")
        .doc(`${region.language.toLowerCase()}-${region.country.toLowerCase()}`)
        .collection("games")
        .doc(cusa)
        .get();

    if (!documentSnapshot.exists) {
        return undefined;
    }
    return documentSnapshot.data() as PlaystationApi.types.PlaystationGameResponse;
};
