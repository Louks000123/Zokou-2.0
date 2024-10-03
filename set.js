const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0ZEdExwdEFhcnlhSW85c0tJWWU5ckZEeUliVUMzUG0rVlpKVmowOGFFaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWFhc0RiWElETGpYQUVNekkram1KRkhZMVVnK3lvRU8zdWFEcFQrSVBYMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSkJoNkRrc2ZOekcvWHQrcmFLemRpTktOLzZUQmFsUC9QMFIrYjhMTDFFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJdTY4b0l1ZnV5bWtQdy9KdXB0eUdOQkIzR2hhWHIya3BNaXA1anZEMVFnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJDYm16TndBWkd6Rlh6SkdRKzA1ZzJJUDRrQ0xOQUphd1h0UFZ2bHQ3bW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImcwWXFyTHF0bmg3TmFTdFM5RXJDeTAyMXROUE5WTEtzWXVycGdwSWtnUms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0NBVUdyZ3NXZ3BKQVIzZ3ZSMU8xMWk4VlZMWTgyTkdlb0t3NnFWRCswVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMTVpMTVlVnZLaytPc0gxQ1VJWGI2d1dEZWxpUDBxS3JXblBRbE5UUDBBcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IncvTVIrK0dicEp0S2tqK0Rva0Z3UVQzTDljWCtVdUR6YmFqUTNXUTIyVXNNWVZOTXhkR1c3dVQ3UVovY0pTNVF4NU5YODdFTUJybTlzamFSVDFYaURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTUsImFkdlNlY3JldEtleSI6IkxkTFVXb2NOeHdsNUtLaUxERGxIdW5TdlJZQXVjMjVQUVNxQW5BcG01WWM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjI1MDIzMzE5ODhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjBENzkwODlCMDE0QkY3NEFCMjk0RjdDQUYyNjAxMDIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzkyMTk5Mn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjI1MDIzMzE5ODhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODZERUJFMkE0MjdCOERFQzE4NjFFN0YzNjdDNDEyNDEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzkyMTk5NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiZXBwWnhjQXdTNW1UYkh6cldQelRRQSIsInBob25lSWQiOiIyMDEzNmVkMS0zODI3LTRkY2MtOTE2NS1iYTU3NGRhMDE4NjciLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVmZLNzlld0hTaHNQWldTdE5OQ2hWbFhZNzVVPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhYdFdIbjk4ZVpFZjIzQytEUC9EMGF6Nk9iZz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJUODVUWk1HViIsImxhc3RQcm9wSGFzaCI6IjRDcTRFayIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUJRPT0ifSwibWUiOnsiaWQiOiIyMjUwMjMzMTk4ODo4OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLgvIbKn+G0j+G0nOG0i3PhtI/JtCDhtZjhtrvhtZjhtZDhtYPhtY/igbHgvJIiLCJsaWQiOiIxMjAxMzQ5MzMyMTc5NDo4OEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xUY3o0b0RFTUgrOTdjR0dCd2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlNxU0JJL013MUtYT3VtbW5QWWRQZmQ3K1hCSjNYcHJRSGJ4YkloeHB5WDg9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImJzUUpNZC9WYXNvcFQ5NFVYaG02UFdwb0U4NitEbHlvbE13RmpYUWcwUWkySHZNVXR4RGlldXFsMzZMN3ZYakwvL3JhNjQ5ZE1pUnF1QlJiS2hIaURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSOXp2VURZeE9CS20yUWhibUFabXFaVXowbzZHZ3lQU3V4dUpvZlVCaGJvK3pqM0RZYU53Nm9DRnoxY3ZwTDdGYjQ2SFFBNVh0Ym05UFFVa21ucjREQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyNTAyMzMxOTg4Ojg4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVxa2dTUHpNTlNsenJwcHB6MkhUMzNlL2x3U2QxNmEwQjI4V3lJY2FjbC8ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjc5MjE5ODksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRlJzIn0=',
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
