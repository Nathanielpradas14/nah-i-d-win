module.exports = {
  config: {
    name: "help",
    aliases: ["help"],
    version: 1.0,
    author: "LiANE",
    shortDescription: { en: "View all commands" },
    longDescription: { en: "View all available commands" },
    category: "members",
  },
  onStart: async function({ message }) {
    const commandsList = `
𝙰𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜:
╭─╼━━━━━━━━╾─╮
│  📖 | 𝙴𝚍𝚞𝚌𝚊𝚝𝚒𝚘𝚗
│ - Ai
│ - Bard
│ - Claire
│ - Gpt
│ - Gemini
│ - Translate
╰─━━━━━━━━━╾─╯
╭─╼━━━━━━━━╾─╮
│  🗨 | 𝙰𝚒 - 𝙲𝚑𝚊𝚝
│ - Insight  
│ - Tia
╰─━━━━━━━━━╾─╯
╭─╼━━━━━━━━╾─╮
│  🖼 | 𝙸𝚖𝚊𝚐𝚎
│ - Dalle
│ - Image
│ - Gmage
│ - Gpt draw
│ - Pinterest
│ - Pinterest2
│ - Prodia
│ - Remini
╰─━━━━━━━━━╾─╯
╭─╼━━━━━━━━╾─╮
│  🎧 | 𝙼𝚞𝚜𝚒𝚌
│ - Chords 
│ - Lyrics
│ - Play
│ - Song
│ - Spotify
╰─━━━━━━━━━╾─╯
╭─╼━━━━━━━━╾─╮
│  👥 | 𝙼𝚎𝚖𝚋𝚎𝚛𝚜
│ - Alldl
│ - Clean
│ - Font
│ - Help
│ - Join
│ - Prefix
│ - Stat
│ - Uid
│ - Unsend
│ - Uptime
╰─━━━━━━━━━╾─╯
╭─╼━━━━━━━━╾─╮
│ » 𝙾𝚠𝚗𝚎𝚛: Mark S.
│[ 🧋 | 𝙼𝚘𝚌𝚑𝚊 𝙱𝚘𝚝 ]
╰─━━━━━━━━━╾─╯`;

    message.reply(commandsList);
  }
};