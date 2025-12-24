// Arcjet protection for API routes (not middleware)
// Use this in API routes where you need advanced protection

import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/next"

const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["userId"], // track based on Clerk userId
    rules: [
        // Rate limiting
        tokenBucket({
           mode: "LIVE",
           refillRate: 5,
           interval: 3600, // 1 hour
           capacity: 5,   // 5 requests
        }),
        // Shield protection
        shield({
            mode: "LIVE"
        }),
        // Bot detection
        detectBot({
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"],
        })
    ],
});

export default aj;