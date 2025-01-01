module.exports = async (client, player) => {
    const guild = await client.guilds.cache.get(player.guildId);
    const guildData = client.data.get(`guildData_${guild.id}`);
    const session = player.node.driver.sessionId

    if (guildData.reconnect.status) {
        console.debug(`[DEBUG] Player reconnected to [${guild.name}] (${guild.id})`);
    } else {
        console.debug(`[DEBUG] Player created in [${guild.name}] (${guild.id})`);
    }

    let url = `http://server:2333/v4/sessions/${session}/players/${guild.id}?noReplace=false`;

    let options = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', Authorization: 'youshallnotpass'},
      body: '{"filters":{"pluginFilters":{"normalization":{"maxAmplitude":0.9,"adaptive":true}}}}'
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(JSON.stringify(json, null, 2)))
        .catch(err => console.error('error:' + err));
};

/**
 * Project: Lunox
 * Author: adh319`
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
