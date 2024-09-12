const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU05jUUhLQ21VVGVtTmlYZHVueisvMm9aMDRUVktTczlpa1liTzMzaVZHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUk1CaFY3eXp3c2thZTZESVRnM2hHRGdHRHU2Q0ozYWRCM1FaNm0wckJVUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpT0poN0ViOHhJa09NViswUTZteHVySkVZOEo2RFVFcVk1T00raUh4YkdBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiNXd0QXk1anNtQUhKRVpFb2xidW93SWJSRXFmVVJ6SE1JMmVZTVMyOVJZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVDclZCNmpYdDRhNDc1SC9OV1EyMkdINjhEb0RUSVp0Q0NCR2ZZc0czRkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InM0VFpXVkd5NDFFNUJXaEh2YzRYNGREMFJXZnQ2bFBwRjNZdVAzYkw4d3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU5yeEY0T1pGMDRiYkR1YzhMb3pKSXJzYkNYMjB3eEQ0SW1nSndyR2tGdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZk5hZ1Nyc1krQmZDcmYvMnJzTnRSRStmTkpLU0RZaUtBbmc5dEpTSlZoUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpCS3JMUlV0TGNsd29FOVVCV0l6c2REWHB5dWUwVkNiNm95YjFIRkVOSlZNV2t2bnlNZ01uSTZaWXFoaGhBYzZhOXBmbXJpR0h0TlFtbDRwMnpqNGhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQwLCJhZHZTZWNyZXRLZXkiOiJIOW5oN0RGODV4a2lhV28zOHdHNmVpOHJEU01tK2RZMjYvUkQvSGZaSnZ3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoidmR4LS0wWmFSMnF2akNTRVNLVmp3ZyIsInBob25lSWQiOiJmM2U3OThlZi1jMjUzLTRjYTEtYWQ5Zi02MTM5MjZkYThkNDIiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiay9iM3JjNHhqOFR1K0pWSFhmMFV6RmQ1V2tvPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNjRXhaWDRJdkVzOGs2eEVYR0Y0L1NJcHRnST0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJFUVFQU1A2NyIsIm1lIjp7ImlkIjoiMjI1MDIzMzE5ODg6MzRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pDNGc3TUhFS3pCaHJjR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlV4ZDgySDJHUld3M1BhckZNcGJTSDZMODRiWTlWZStnMWY0M2ZxVTB3Umc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IllHQkREQ3Z3TVdTU1RBMEx3VVVZSk9BbElLZ3pUN28yaWRuQ2lOeHlma0lMWW9pdXRkQW9CWkt4d0xIN2JVQ1RLRU94aWhXT3dZN29iUUc4cUkwdkNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI1V2ZlSkllb0Uwc1FqZkIrTjBjclhIalA4Y2wzZWdGTVBxaDFqdEUvMUxvMnNpcjFqWVdnRExFODRwT041YlVpcWZZZXQ0YnhVbjFqUEpLbEgwRU5oUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyNTAyMzMxOTg4OjM0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZNWGZOaDloa1ZzTnoycXhUS1cwaCtpL09HMlBWWHZvTlgrTjM2bE5NRVkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "✮✮✮ʟᴏᴜᴋsᴏɴ ᵘᶻᵘᵐᵃᵏⁱ₊ ͟͟͞͞➳",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'ʟᴏᴜᴋsᴏɴ',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
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
