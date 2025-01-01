const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "maintenance",
    aliases: ["devmode"],
    description: "Toggle maintenance mode",
    category: "dev",
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: false,
        player: false,
        current: false,
    },
    devOnly: true,
    run: async (client, message, player, args) => {
        const embed = new EmbedBuilder().setColor(client.config.embedColor);
        const maintenance = client.data.get("maintenance");

        const msgGuildID = message.guildId
        if (msgGuildID === "210041951435620352") {
            if (maintenance) {
                client.data.set("maintenance", false);
    
                embed.setDescription(`Maintenance mode is now \`disabled\`.`);
            } else {
                client.data.set("maintenance", true);
    
                embed.setDescription(`Maintenance mode is now \`enabled\`.`);
            }
        } else {
            embed.setDescription(`You cannot use this command.`);
        }    
        return message.reply({ embeds: [embed] });
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
