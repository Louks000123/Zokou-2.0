const axios = require('axios');
const { zokou } = require("../framework/zokou");
const fs = require("fs-extra");
const { exec } = require("child_process");
const child_process = require('child_process');
const {unlink } = require ('fs').promises ;


// fonction sleep

const sleep =  (ms) =>{
    return new Promise((resolve) =>{ setTimeout (resolve, ms)})
    
    } 

// Fonction pour la conversion de GIF en vidéo et récupération du buffer vidéo
const GIFBufferToVideoBuffer = async (image) => {
    const filename = `${Math.random().toString(36)}`;
    await fs.writeFileSync(`./${filename}.gif`, image);
    child_process.exec(
        `ffmpeg -i ./${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./${filename}.mp4`
    );
    await sleep(4000);
  
    var buffer5 = await fs.readFileSync(`./${filename}.mp4`);
    Promise.all([unlink(`./${filename}.mp4`), unlink(`./${filename}.gif`)]);
    return buffer5;
};

const generateReactionCommand = (reactionName, reactionEmoji, commandName, action) => {
    zokou({
        nomCom: commandName,
        categorie: "Reaction",
        reaction: reactionEmoji,
    },
    async (origineMessage, zk, commandeOptions) => {
        const { auteurMessage, auteurMsgRepondu, repondre, ms, msgRepondu } = commandeOptions;

        const url = `https://api.waifu.pics/sfw/${reactionName}`;
        try {
            const response = await axios.get(url);
            const imageUrl = response.data.url;

            // Obtenir le buffer du GIF en utilisant la fonction getBuffer
             const gifBufferResponse = await  axios.get(imageUrl, {
                responseType: 'arraybuffer' }) ;
            const gifBuffer = await gifBufferResponse.data;

            // Convertir le GIF en vidéo et obtenir le buffer vidéo
            const videoBuffer = await GIFBufferToVideoBuffer(gifBuffer);

            // Envoyer la vidéo avec Zokou
            if (msgRepondu) { 
              var txt =` @${auteurMessage.split("@")[0]} a ${action} @${auteurMsgRepondu.split("@")[0]}`
       zk.sendMessage(origineMessage, { video: videoBuffer,gifPlayback: true,caption:txt,mentions:[auteurMessage,auteurMsgRepondu] }, { quoted: ms });
    
            } else {
                const videoMessage = {
                    video: videoBuffer,
                    gifPlayback: true,
                    caption: `@${auteurMessage.split("@")[0]} s'est ${action} lui même.`,
                    mentions: [auteurMessage]
                };
                zk.sendMessage(origineMessage, videoMessage, { quoted: ms });
            }

        } catch (error) {
            repondre('Erreur lors de la récupération des données :' + error);
            console.log(error);
        }
    });
};

// ... (utilisation de la fonction generateReactionCommand pour créer des commandes de réaction)


generateReactionCommand("bully", "🍥", "taquiner","taquiné(e)");
generateReactionCommand("cuddle", "🍃", "caliner","caliné(e)");
generateReactionCommand("cry", "🤘🏻", "pleurer","pleuré(e) pour");
generateReactionCommand("hug", "🍜", "calin","fait un calin");
generateReactionCommand("awoo", "🌀", "awoo","awoo");
generateReactionCommand("kiss", "🍥", "embrasser","embrassé(e)");
generateReactionCommand("lick", "🍜", "lecher","leché(e)");
generateReactionCommand("pat", "🤘🏻","tapoter", "tapoté(e)");
generateReactionCommand("smug", "🍃", "malice","fait un sourire malicieux a");
generateReactionCommand("bonk", "🌀", "bonk","bonk");
generateReactionCommand("yeet", "🌀", "lancer","jetté(e)");
generateReactionCommand("blush", "🍥", "rougir","rougi(e) à");
generateReactionCommand("smile", "🍜", "sourire","fait un sourire à");
generateReactionCommand("wave", "🍜", "saluer","salué(e)");
generateReactionCommand("highfive", "🌀", "tope-la","fait un top-la à");
generateReactionCommand("handhold", "🌀", "tenir","tenu(e)");
generateReactionCommand("nom", "🍥", "manger","mangé(e)");
generateReactionCommand("bite", "🍜", "mordre","mordu(e)");
generateReactionCommand("glomp", "🌀", "enlacer","enlacé(e)");
generateReactionCommand("slap", "🤘🏻", "gifler","giflé(e)");
generateReactionCommand("kill", "🍃", "tuer","tué(e)");
generateReactionCommand("kick", "🌀", "pied","donné(e) un coup de pied a");
generateReactionCommand("happy", "🍥", "heureux","l'air heureux pour");
generateReactionCommand("wink", "🍜", "clin","a fait un clin d'œil à");
generateReactionCommand("poke", "🤘🏻", "pousser","pousser");
generateReactionCommand("dance", "🍃", "danser","dansé pour");
generateReactionCommand("cringe", "🍜", "cringe","a l'air cringe pour");
