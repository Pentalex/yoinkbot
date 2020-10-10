

process.on('unhandledRejection', () => {
    console.log('An unhandledRejection occurred');
  })
const { Client, RichEmbed } = require('discord.js');
const { red, green, blue, yellow, cyan } = require('chalk');
const bot = new Client();
const settings = require('./settings.json');
console.log(blue(`[SELF BOT] :: PLEASE NOT THAT YOUR ACCOUNT IS AT RISK`));
console.log(blue(`[SELF BOT] :: AS SELFBOTS ARE AGAINST DISCORD'S TOS`));
console.log(yellow('============================================================================'));
console.log(cyan(`[COMMAND LIST] :: ${settings.prefix}ping :: Displays your ping`));
console.log(cyan(`[COMMAND LIST] :: ${settings.prefix}purge [100]:: Deletes 100 messages you sent.`));
console.log(cyan(`[COMMAND LIST] :: ${settings.prefix}embed [content] :: Send a message in a embed.`));
console.log(cyan(`[COMMAND LIST] :: ${settings.prefix}restart :: Restarts the bot`));
console.log(cyan(`[COMMAND LIST] :: ${settings.prefix}spam [ID] [content] :: Spam a users DM`));
console.log(cyan(`[COMMAND LIST] :: ${settings.prefix}eval [content] :: Evaluate code`));

bot.on('ready', ()=>{
    guild = bot.guilds.get(settings.guild);

    console.log(green(`[SELF BOT] :: ${bot.user.tag} is online and ready`));
    console.log(green(`[SELF BOT] :: my prefix is: ${settings.prefix}`));
    console.log(green(`[SELF BOT] :: my guild name is: ${guild.name}`));
    console.log(yellow('============================================================================'));
});


bot.on('messageReactionAdd', async(reaction, user) => {
    guild = bot.guilds.get(settings.guild);
    let message = reaction.message, emoji = reaction.emoji;
    if (emoji.name == 'WideHardo' && user.id === settings.ID) {
        emote = message.content.match(/<a:.+?:\d+>|<:.+?:\d+>/g).toString().slice(0, -1)
        emoteid = emote.split(':').pop()
        
        url = `https://cdn.discordapp.com/emojis/${emoteid}.gif`
        guild.createEmoji(url, emote.split(':')[1])
        .then(emoji => console.log(`Created new emoji with name ${emoji.name}`))
        .catch(url = `https://cdn.discordapp.com/emojis/${emoteid}.png`,guild.createEmoji(url, emote.split(':')[1]).then(emoji => console.log(`Created new emoji with name ${emoji.name}`)).catch(console.error))

    }



    if(user.id === settings.ID){
        reaction.remove(user);
    }
});
bot.on('message', async(msg)=>{
    if(msg.author.id !== settings.ID) {
        return;
    }
    let cmd = msg.content.split(" ")[0]
    cmd = cmd.slice(settings.prefix.length);
    let args = msg.content.split(" ").slice(1);
    if(msg.content.startsWith(settings.prefix) && msg.author.id === settings.ID){
        console.log(cyan(`[COMMAND RAN] :: ${msg.content}`));
    }

    if(cmd === 'ping'){
        msg.edit(`:ping_pong: pong! your ping is: *${bot.ping.toFixed()}ms*`);
    }
    if(cmd === 'purge'){
        msg.channel.fetchMessages({ limit: 100 }).then(msgs=>msgs.filter(m => m.author.id === bot.user.id).map(r => r.delete()))
    }
    if(cmd === 'embed'){
        let eContent = args.slice(0).join(" ");
        msg.edit("", { embed: new RichEmbed().setColor(`${settings.color}`).setDescription(eContent).setFooter('Self Bot By: Jinx#4321')});
    }
    if(cmd === 'restart'){
        process.exit();
    }
    if(cmd === 'spam'){
        let user = (args[0]);
        let mContent = args.slice(1).join(" ");
        bot.setInterval(()=>{
            bot.users.get(user).send(mContent);
        }, 1500);
        console.log(red(`[CMD INFOMATION] :: YOU MUST RESTART THE BOT IN ORDER TO STOP THE SPAM`));
    }
    if(cmd === 'eval'){
        let res;
        try{
            res = eval(args.join(" "))
        } catch(e){
            return msg.edit("", { embed: new RichEmbed().setTitle("Results").setColor("#FF0000").setDescription(":desktop: **Input**: ```" + args.join("") + "```:eyes: **Error**: ```" + err + "```").setFooter("Eval") })
        }
        msg.edit("", { embed: new RichEmbed().setTitle("Results").setColor("#46FF00").setDescription(":desktop: **Input**: ```" + args.join("") + "```:white_check_mark: **Output**: ```" + res + "```").setFooter("Eval") })
    }
    /***if(cmd === 'yoink'){
        msg.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == 'WideHardo'),
        { max: 1, time: 30000 }).then(collected => {
                if (collected.first().emoji.name == 'WideHardo') {
                        msg.reply('Yoiiink');
                }
        }).catch(() => {
                msg.reply('No reaction after 30 seconds, operation canceled');
        });
    }***/
});



bot.login(settings.token);