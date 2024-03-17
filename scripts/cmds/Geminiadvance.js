const axios = require("axios");
const fs = require("fs");
const path = require("path");


module.exports = {
  config: {
    name: "Geminiadvance", // Changed command name to "Gemini"
    version: "1.0",
    author: "Charlie, API by Deku",
    countDown: 5,
    role: 0,
    longDescription: { en: "Artificial Intelligence Google Gemini" },
    guide: { en: "{pn} <query>" },
    category: "Gemini Advance",
  },
  clearHistory() {
    global.GoatBot.onReply.clear();
  },

  async downloadAndSaveImage(imageUrl, imagePath) {
    try {
      const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
      await fs.promises.writeFile(imagePath, imageResponse.data);
      return fs.createReadStream(imagePath);
    } catch (error) {
      console.error("Error occurred while downloading and saving the image:", error);
      throw new Error("An error occurred while downloading and saving the image.");
    }
  },

  async onStart({ message, event, args, commandName }) {
    const { senderID } = event;
    const prompt = args.join(" ");

    if (!prompt) {
      message.reply("Please enter a query.");
      return;
    }

    if (prompt.toLowerCase() === "clear") {
      this.clearHistory();
      try {
        const clear = await axios.get(`https://gemini-api.replit.app/gemini?uid=${input.senderID}&${url? `url=${url}&` : ""}prompt=${encodeURIComponent(prompt)}`);
        message.reply(clear.data.message);
      } catch (error) {
        console.error("Error occurred while clearing history:", error);
        message.reply('An error occurred.');
      }
      return;
    }

    let apiUrl = `https://gemini-api.replit.app/gemini?uid=${input.senderID}&${url? `url=${url}&` : ""}prompt=${encodeURIComponent(prompt)}`;

    if (event.type === "message_reply") {
      const imageUrl = event.messageReply.attachments[0]?.url;
      if (imageUrl) {
        apiUrl += `&attachment=${encodeURIComponent(imageUrl)}`;
      }
    }

    try {
      const response = await axios.get(apiUrl);
      const { message: content, imageUrls } = response.data;
      const replyOptions = { body: content };

      if (Array.isArray(imageUrls) && imageUrls.length > 0) {
        const imageStreams = [];

        const cacheDir = path.join(__dirname, "cache");
        if (!fs.existsSync(cacheDir)) {
          fs.mkdirSync(cacheDir);
        }

        for (let i = 0; i < imageUrls.length; i++) {
          const imageUrl = imageUrls[i];
          const imagePath = path.join(cacheDir, `image${i + 1}.png`);
          const imageStream = await this.downloadAndSaveImage(imageUrl, imagePath);
          imageStreams.push(imageStream);
        }

        replyOptions.attachment = imageStreams;
      }

      // Constructing the header
      let header = "🗨 | 𝙶𝚘𝚘𝚐𝚕𝚎 Gemini | \n━━━━━━━━━━━━━━━━\n";
      
      // Constructing the footer
      let footer = "\n━━━━━━━━━━━━━━━━";

      // Sending the reply with header and footer
      message.reply(header + replyOptions.body + footer, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: senderID,
          });
        }
      });
    } catch (error) {
      console.error("Error occurred while processing onStart:", error);
      message.reply('An error occurred.');
    }
  },

  async onReply({ message, event, Reply, args }) {
    const prompt = args.join(" ");
    const { author, commandName, messageID } = Reply;
    if (event.senderID !== author) return;

    try {
      const apiUrl = `https://gemini-api.replit.app/gemini?uid=${input.senderID}&${url? `url=${url}&` : ""}prompt=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl);

      const { message: content, imageUrls } = response.data;
      const replyOptions = { body: content };

      if (Array.isArray(imageUrls) && imageUrls.length > 0) {
        const imageStreams = [];

        const cacheDir = path.join(__dirname, "cache");
        if (!fs.existsSync(cacheDir)) {
          fs.mkdirSync(cacheDir);
        }

        for (let i = 0; i < imageUrls.length; i++) {
          const imageUrl = imageUrls[i];
          const imagePath = path.join(cacheDir, `image${i + 1}.png`);
          const imageStream = await this.downloadAndSaveImage(imageUrl, imagePath);
          imageStreams.push(imageStream);
        }

        replyOptions.attachment = imageStreams;
      }

      // Constructing the header
      let header = "🗨 | 𝙶𝚘𝚘𝚐𝚕𝚎 Gemini| \n━━━━━━━━━━━━━━━━\n";
      
      // Constructing the footer
      let footer = "\n━━━━━━━━━━━━━━━━";

      // Sending the reply with header and footer
      message.reply(header + replyOptions.body + footer, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author,
          });
        }
      });
    } catch (error) {
      console.error("Error occurred while processing onReply:", error);
      message.reply("An error occurred.");
    }
  },
};
