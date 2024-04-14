const axios = require("axios");
module.exports = {
	config: {
		name: 'sim',
		version: '1.2',
		author: 'KENLIEPLAYS',
		countDown: 3,
		role: 0,
		shortDescription: 'Simsimi ChatBot by Simsimi.fun',
		longDescription: {
			en: 'Chat with simsimi'
		},
		category: 'sim',
		guide: {
			en: '   {pn} <word>: chat with simsimi'
				+ '\n   Example:{pn} hi'
		}
	},

	langs: {
		en: {
			chatting: 'Already Chatting with sim...',
			error: 'Server Down Please Be Patient',
            loading: "🤖 | 𝙲𝚑𝚊𝚝𝙶𝙿𝚃 |\n━━━━━━━━━━━━━━━\n⏳ | 𝙋𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩......\n━━━━━━━━━━━━━━━\n",
           final: "🤖 | 𝙲𝚑𝚊𝚝𝙶𝙿𝚃 |",
		}
	},

	onStart: async function ({ args, message, event, getLang }) {
		if (args[0]) {
			const yourMessage = args.join(" ");
            const messageText = response.data.reply.trim(); // Adjust according to the response structure of the new API
      const userName = getLang("final");
			try {
				const responseMessage = await getMessage(yourMessage);
				const finalMsg = `━━━━━━━━━━━━━━━\n${responseMessage}\n━━━━━━━━━━━━━━━`;
                api.editMessage(finalMsg, loadingReply.messageID);

			}
			catch (err) {
				console.log(err)
				return message.reply(getLang("error"));
			}
		}
	},

	onChat: async ({ args, message, threadsData, event, isUserCallCommand, getLang }) => {
		if (!isUserCallCommand) {
			return;
		}
		if (args.length > 1) {
			try {
				const langCode = await threadsData.get(event.threadID, "settings.lang") || global.GoatBot.config.language;
				const responseMessage = await getMessage(args.join(" "), langCode);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				return message.reply(getLang("error"));
			}
		}
	}
};

async function getMessage(yourMessage, langCode) {
	try {
        const loadingMessage = getLang("loading");
      const loadingReply = await message.reply(loadingMessage);
		const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ph&message=${yourMessage}&filter=false`);
		if (!res.data.success) {
			throw new Error('API returned a non-successful message');
		}
		return res.data.success;
	} catch (err) {
		console.error('Error while getting a message:', err);
		throw err;
	}
      }