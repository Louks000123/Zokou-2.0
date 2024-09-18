"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "test", reaction: "🍥", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'Salut je m\'appelle *🅽︎🅰︎🆁︎🆄︎🆃︎🅾︎-🅼︎🅳︎* \n\n ' + 'je suis un bot Whatsapp Multi-appareil ';
    let d = ' developpé par *✮✮✮ʟᴏᴜᴋsᴏɴ ᵘᶻᵘᵐᵃᵏⁱ₊ ͟͟͞͞➳*';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/085c4b1068f0f4f8db970.mp4';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="🍥"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *🅽︎🅰︎🆁︎🆄︎🆃︎🅾︎-🅼︎🅳︎* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *✮✮✮ʟᴏᴜᴋsᴏɴ ᵘᶻᵘᵐᵃᵏⁱ₊ ͟͟͞͞➳*'
      let varmess=z+d
      var img='https://telegra.ph/file/085c4b1068f0f4f8db970.mp4'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
