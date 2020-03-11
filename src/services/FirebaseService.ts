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
import firebase from "firebase";
import "firebase/firestore";
import { PlaystationRegion } from "playstation";

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

const firestore = app.firestore();

export const getRegions = async (): Promise<PlaystationRegion[]> => {
    const querySnapshot = await firestore.collection("regions").get();
    if (querySnapshot.empty) {
        return [];
    }

    const regions: PlaystationRegion[] = [];
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

export const setRegions = async (regions: PlaystationRegion[]): Promise<void> => {
    if (!regions || regions.length === 0) {
        console.error("No regions to save.");
        return;
    }

    for (const region of regions) {
        await firestore
            .collection("regions")
            .doc(`${region.language.toLowerCase()}-${region.country.toLowerCase()}`)
            .set(region);
    }
};
