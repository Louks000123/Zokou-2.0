const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUN2ZnM5WU5BY1VUb0VOcmphZTBtZ1lzbHlBNHJTeEtaa2NYMmZmd0lWRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOHExUzUwM0xPWEJRSU1MTzZvcSsyT3FoNDBIMzlSRTh0MWRUS1E4Ymt4TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQWxHM0h0K1JPZm1Mb1V5aDJkNGxOQVd4NmNST1hrcjBiLzhCSStQYTN3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1ZTVSWmpDai91c05CSFNIVDJxWmV6RmprRFRXdktzdVFVT2gxR0lzZ0NzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdBVkwzNGZCWjF4Q2VGbDJ1TFpqQWJRTHY5enRCNGtKWXVCZDN1c1RtMDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijg2M1VCMmVjdTJ4Z2xaMjU2Y3lJaG1POHdwRjdqYkt1SllSRlRNZkIyWGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0loS0Q2TW10cmYveEhGcXMwZXN3bjAwd0doNGo2dmtGT2JPbWlmSENFWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOGhLdmJXYmNoeFplMHRNUnpmckcvamc0UnU1SEF5dVJJRnQzNDhxR0FoVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im42YlB5RldnaDFVd3NuVzVOWms1UjEvSkFDTFVMcDlEMDVDdzVjOHg0aDNuT0tIVEtnQ2xSeUNMVFBFdTJjOGpCVkEwajhMSUlDTGNaU1FBalprRWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEwLCJhZHZTZWNyZXRLZXkiOiJWWmRYNCszWjZZaVJZc21GV2hFNUdCUHgyNlpLYUNLdUxBVTRnNU5PVlIwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyNTAyMzMxOTg4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjIxMDU5QTUxRUQ0NUQ3QjkzREFCRTQxMUVEQ0MyQkYzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjY5MjY5MjR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIyNTAyMzMxOTg4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjJGQzJFN0MxMDQ5QzQwMUZBQThGQUMzRUI0NTExOTlEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjY5MjY5MjV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlJPQ2RKTDhNVFFXRkdTMm83S1VXalEiLCJwaG9uZUlkIjoiODAwYzY0NDAtNGJjYS00NzMxLTgxNGMtNDhkNTM0ZDQ0ZDNhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllPaTVYd0N6bmR4eVJYd1pPOWE2MlBxcHlTTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNdTBpeUpWVGpLYU9tUDcvWVpMdnBzZFZpRTg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWlFQTjFESkgiLCJsYXN0UHJvcEhhc2giOiI0Q3E0RWsiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElCUT09In0sIm1lIjp7ImlkIjoiMjI1MDIzMzE5ODg6NDlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2XoPCdl7/iiIXwnZef8J2XovCdl6jwnZee8J2XpvCdl6LwnZehw5fwnZeo8J2XrfCdl6jwnZeg8J2XlPCdl57wnZec4oiFIiwibGlkIjoiMTIwMTM0OTMzMjE3OTQ6NDlAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLbXV2bUFReGFDN3R3WVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJVcTVIUXIxaW0vVVNzV3BVWTdTaVhjOFgyMzlDR2YwWDYrajJya1F4dG1jPSIsImFjY291bnRTaWduYXR1cmUiOiIvcVJZVmEvYThzbTBCbHczZm1TdHNLLzZ0QmV3a1R5d2VPV1RjTEVoMjNDT3ZFSHU0M2o4dVNjMXNkM1EzNFJiY25xQXB6VmdDODc2aS9Va3M2eEpDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQ0pLOUVxZ2c1bVRlM2E4ekxFRU9EK1Y2ZXlicy9QMXJxZWFqQWpUUVJtOXd1bXpERGgzT1lPekhyWWt1YWdLWmhpT3dDNHhZY3hwSU42TklxL05vZ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjUwMjMzMTk4ODo0OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWS3VSMEs5WXB2MUVyRnFWR08wb2wzUEY5dC9RaG45Rit2bzlxNUVNYlpuIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI2OTI2OTIwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5KayJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "✮✮✮ʟᴏᴜᴋsᴏɴ ᵘᶻᵘᵐᵃᵏⁱ₊ ͟͟͞͞➳",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'ʟᴏᴜᴋsᴏɴ',
    URL : process.env.LIENS_MENU || 'https://telegra.ph/file/085c4b1068f0f4f8db970.mp4',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
