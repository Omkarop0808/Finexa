import arcjet, { tokenBucket } from "@arcjet/next"
const aj = arcjet({
    key:process.env.ARCJET_KEY,
    characteristics:["userId"],//track based on Clerk userId
    rules:[
        tokenBucket({
           mode:"LIVE",
           refillRate:2,
           interval:3600, //1 hre
           capacity:2,   //10 request
        }),
    ],
});

export default aj;

