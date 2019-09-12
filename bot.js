
const Discord = require("discord.js");


const client = new Discord.Client();


const config = require("./config.json");


client.on("ready", () => {
 
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
 
  client.user.setActivity(`+help - Created by Zaryo`);
});

client.on("guildCreate", guild => {
 
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`+help - Created by Zaryo`);
});

client.on("guildDelete", guild => {
  
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`+help - Created by Zaryo`);
});

client.on('guildMemberAdd', member => {
    member.guild.channels.get('563350292092157964').channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Welcome *" + member + "* on the *" + serverName + "* discord server!",
        
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Zaryo®"
          }
       }
    })
});

client.on("message", async message => {
  
  if(message.author.bot) return;
  
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  
  if(command === "ping") {
    
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }else if(command === 'members') {
    const m = await message.channel.send(`Members: ${message.guild.memberCount}`)
  }else if(command === "creator") {
    const m = await message.channel.send("Created by Zaryo#8635")
  }else if(command === "join") {
    let channel = client.channels.get('575763692705021962');
    channel.join();
    const m = await message.channel.send("Joined!")
  }else if(command === "disconnect") {
    let channel = client.channels.get('575763692705021962');
    channel.leave();
    const m = await message.channel.send("Leaved!");
  }else if(command === "whois") {
      const m = await message.channel.send({embed: {
        color: 066454,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "WHOIS - *" + message.author.username + "* ",
        description: "**Status**: *"+  message.author.activity +"*",
        
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Zaryo®"
          }    }}
        )
   
    }

       

        
        const exampleEmbed = new Discord.RichEmbed()
	.setColor('#066454')
	.setTitle('Yaiky help command')
	.setURL('https://discord.js.org/')
	.setAuthor('For Fun Cz', 'https://imgur.com/otC09YK.jpg', 'https://discord.js.org')
    .setDescription(`**+creator**
    show who create me
    **+ping**
    show ur ping
     **+members**
    show how much members are on server`)
	.addBlankField()
	.setImage('https://imgur.com/otC09YK')
	.setTimestamp()
	.setFooter('For Fun Cz/Sk®', 'https://imgur.com/otC09YK');

  if(command === "help") {
    message.author.send(exampleEmbed);
  }

  if(command === "say") {
    
    const sayMessage = args.join(" ");
    
    message.delete().catch(O_o=>{}); 
    
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
   
    if(!message.member.roles.some(r=>["Administrator", "Moderator", "MainOwner", "Owner", "Admin", "Mod", "Discord admin", "- {Main Leader", "- {Leader"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
   
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    
    if(!message.member.roles.some(r=>["Administrator", "MainOwner", "Owner", "Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
   
    const deleteCount = parseInt(args[0], 10);
    
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(process.env.BOT_TOKEN);
