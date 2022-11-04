const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const formatDuration = require('../../../structures/FormatDuration.js');

module.exports = {
  name: 'seek',
  description: 'Seek the current played song.',
  category: 'Music',
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  options: [
    {
      name: 'seconds',
      description: 'New position length of the song.',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 0,
    },
  ],
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);

    const value = interaction.options.getNumber('seconds', true);
    const Duration = formatDuration(player.position);

    if (!player.currentTrack.info.isSeekable) {
        
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`❌\` | Song is not seekable`);

      return interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      await player.seekTo(value * 1000);

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`⏩\` | Song seeked to: \`${Duration}s\``);

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};