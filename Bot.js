const Discord = require("discord.js");
const Util = require("./Util.js");
const client = new Discord.Client();
const Bot = client;
const TEXT_GENERAL = "180791241561079816";
const SMAD_ROLE_ID = "197696044811681792";
client.login("MzM5NDAxNDgyNzM2NTAwNzM2.DFjd-Q.kGT69FF7KGE5hMJRtvvOzJOi5ec");

client.on("ready", () => {
    console.log("I am ready!");
    client.user.setGame("Use !help for list of commands");
});


function UserIsSMAD(guildMember) {
    return guildMember.roles.has(SMAD_ROLE_ID);
}

client.on("message", (message) => {
    Util.init(this); // pass the discord client to the util so we can perform discord tasks from it
    Util.ParseMessage(message);
    
});

client.on("presenceUpdate", (usrOLD, usrNEW) => {

    if (usrNEW.presence.status == "online" && usrOLD.presence.status == "offline") {
        console.log("welcome back");
        // var SMAD_Role = usrNEW.guild.roles.find("name", "SMAD");
        //console.log(SMAD_Role.id);
        if (UserIsSMAD(usrNEW)) {
            client.channels.get(TEXT_GENERAL).send("welcome " + usrNEW.user + " [SMAD]");
        }
        else {
            console.log("just another pleb");

        }

    }

});