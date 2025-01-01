const { EmbedBuilder } = require("discord.js");

module.exports = async (client, player) => {
    const guild = await client.guilds.cache.get(player.guildId);
    const guildData = client.data.get(`guildData_${guild.id}`);
    const session = player.node.driver.sessionId
    const channel = await client.channels.cache.get(player.textId);

    if (guildData.reconnect.status) {
        console.debug(`[DEBUG] Player reconnected to [${guild.name}] (${guild.id})`);
    } else {
        console.debug(`[DEBUG] Player created in [${guild.name}] (${guild.id})`);
    }

    let url = `http://server:2333/v4/sessions/${session}/players/${guild.id}?noReplace=false`;

    let options = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', Authorization: 'youshallnotpass'},
      body: '{"filters":{"pluginFilters":{"normalization":{"maxAmplitude":0.5,"adaptive":true}}}}'
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(JSON.stringify(json, null, 2)))
        .catch(err => console.error('error:' + err));
    
    const embed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setDescription(`The queue is empty. You can disable this by using \`247\` command.`);

    await delay(client.config.leaveTimeout);
    
    const guildData = client.data.get(`guildData_${guild.id}`);
    if (guildData && !guildData.reconnect.status) {
        const isNotPlaying = !player.playing && !player.queue.currennt;
        if (isNotPlaying) {
            await player.destroy();    
            if (channel) await channel.send({ embeds: [embed] });
        }
    }
};

/**
 * Project: Lunox
 * Author: adh319`
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
