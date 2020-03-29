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
import { getRegions } from "../../services/Firebase";
import { sleep } from "../Sleep";
import { RegionGrabber } from "./RegionGrabber";

const FIREBASE_REGION_PERIOD = 300000;

export class Grabber {
    private readonly db: FirebaseFirestore.Firestore;

    constructor(db: FirebaseFirestore.Firestore) {
        this.db = db;
    }

    async processRegion(region: any) {
        if (!region.root) {
            logger.warn(`[${region.name}] Skipping invalid`);
            return;
        }

        try {
            const grabber = new RegionGrabber(this.db, region);
            await grabber.process();
        } catch (e) {
            logger.error(`[${region.name}] Cannot process:`, e);
        }
    }

    async process() {
        logger.info("Performing store update");

        try {
            const regions = await getRegions(this.db);
            if (!regions) {
                logger.warn("No regions found");
                return;
            }

            for (const region of regions) {
                await this.processRegion(region);
                await sleep(FIREBASE_REGION_PERIOD);
            }
        } catch (e) {
            logger.error("Processing failed", e);
            return;
        }

        logger.info("Finished store update");
    }
}