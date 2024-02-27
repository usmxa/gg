const fs = require('fs');
const config = require('../../config.json');
const hastebin = require('hastebin-gen');
const { inspect } = require("util");

const Discord = require('discord.js');

module.exports = {
  name: 'eval',
  category: 'Dev',
  description: 'Executes a command.',
  aliases: ['eveal', 'execute'],
  usage: '<code>',
  dev: 'true',
  async execute(bot, message, args) {

    const msg = await message.channel.send(`Executing code...`);

    const code = args.join(" ");

    try {
      let output = eval(code);

      if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
      output = inspect(output, {
        depth: 0,
        maxArrayLength: null
      });

      output = clean(output);

      if (output.includes(bot.token)) return msg.edit("Not today.")

       if (output.length > 1000 || code.length > 1000) {
        hastebin(output, { extension: "txt" }).then(haste => {
          const embed = new Discord.MessageEmbed()
          .setTitle("Output was too long, uploaded to hastebin and logged to console!")
          .setURL(haste)
          .setColor("#fcfffd");
          console.log(output);
          msg.edit("", embed);
        }).catch(err => {
          console.log("Hastebin error: " + err)
        });
      } else {
        const embed = new Discord.MessageEmbed()
          .addField("Input", `\`\`\`js\n${code}\`\`\``)
          .addField("Output", `\`\`\`js\n${output}\`\`\``)
          .setColor("#fcfffd");
        msg.edit("", embed);
      }
    } catch (e) {
      msg.edit(`Error \`\`\`js\n${e}\`\`\``);
    }
  }
};

function clean(text) {
  return text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));
};
