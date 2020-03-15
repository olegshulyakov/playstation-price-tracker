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

import * as admin from "firebase-admin";
import { EventContext, firestore, Change } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";

admin.initializeApp();
const db = admin.firestore();

const previewGenerator = firestore
    .document("/regions/{regionId}/games/{gameId}")
    .onWrite(async (change: Change<DocumentSnapshot>, context: EventContext) => {
        const regionId = context.params.regionId;
        const gameId = context.params.gameId;
        if (!regionId || !gameId) {
            console.error(`Incorrect params: region=${regionId} game=${gameId}`);
            return;
        }

        const previewRef = `/regions/${regionId}/previews/${gameId}`;

        const newValue = change.after.data();
        if (!newValue || newValue === null) {
            console.debug(`Game ${gameId} is deleted.`);
            try {
                await db.doc(previewRef).delete();
            } catch (e) {
                console.error(`Cannot remove preview for [${gameId}]`, e);
            }
            return;
        }

        if (!newValue.default_sku || !newValue.images || newValue.images.length === 0) {
            // collection info
            console.warn(`[${gameId}] not a game, skipping.`);
            return;
        }

        const reward =
            newValue.default_sku.rewards && newValue.default_sku.rewards.length > 0
                ? newValue.default_sku.rewards[0]
                : undefined;

        let discount = null;
        let bonus = null;
        if (reward !== undefined && reward !== null) {
            if (reward.isPlus) {
                bonus = { discount: reward.discount, display_price: reward.display_price };
            } else {
                discount = { discount: reward.discount, display_price: reward.display_price };
                bonus = { discount: reward.bonus_discount, display_price: reward.bonus_display_price };
            }
        } else {
            console.debug(`No discounts for ${gameId}`);
        }

        const preview = {
            id: newValue.id,
            name: newValue.name,
            image: newValue.images[0] ? newValue.images[0].url : "",
            url: newValue.url,
            timestamp: newValue.timestamp,
            display_price: newValue.default_sku.display_price,
            discount: discount,
            bonus: bonus,
            start_date: reward ? reward.start_date : null,
            end_date: reward ? reward.end_date : null,
        };

        try {
            await db.doc(previewRef).set(preview);
        } catch (e) {
            console.error(`Cannot save preview for [${gameId}]`, e);
            return;
        }
        console.debug(`Generated preview for ${gameId}: ${JSON.stringify(preview)}`);
        return;
    });

export default previewGenerator;
