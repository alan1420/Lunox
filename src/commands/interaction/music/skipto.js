const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "skipto",
    description: "Skip the current song and jump to specific track",
    category: "music",
    options: [
        {
            name: "position",
            description: "Provide a track position you want to jump to",
            type: 4,
            required: true,
        },
    ],
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: true,
        player: true,
        current: true,
    },
    devOnly: false,
    run: async (client, interaction, player) => {
        const embed = new EmbedBuilder().setColor(client.config.embedColor);

        if (player && player.voiceId !== interaction.member.voice.channelId) {
            embed.setDescription(`You must be in the same voice channel as the bot.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (player.queue.isEmpty && !client.data.get("autoplay", player.guildId)) {
            embed.setDescription(`Queue is empty. Skip not possible.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await interaction.deferReply();

        const position = interaction.options.getInteger("position");

        if (position < 1 || position >= player.queue.length) {
            embed.setDescription(`Invalid track number.`);
            return interaction.editReply({ embeds: [embed], ephemeral: true }); 
        }

        const cuttedQueue = player.queue.splice(0, position)
        const nowCurrentTrack = cuttedQueue.splice(-1)[0]

        player.queue.previous.push(...cuttedQueue)
        player.queue.current ? player.queue.previous.unshift(player.queue.current) : true
        await player.play(nowCurrentTrack)
        player.queue.shift()

        // player.skip();

        embed.setDescription(`Skipped the current song to specific track.`);

        return interaction.editReply({ embeds: [embed] });
    },
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
