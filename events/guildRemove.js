module.exports = (bot, guild) =>  {
    const serverEmbed = new Discord.MessageEmbed()
    .setAuthor(guild.owner.user.tag, guild.owner.user.avatarURL())
    .setTitle("Server Removed!")
    .setColor("RED")
    .setThumbnail(guild.iconURL())
    .setTimestamp()
    .setFooter(`New server count: ${bot.guilds.cache.size}`)
    .setDescription(`Server Name: **${guild.name}**(${guild.id}) \nMember Count: **${guild.members.cache.size}** members.`)
    bot.channels.cache.get("673869397277933653").send(serverEmbed)
}
