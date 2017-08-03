const Discord = require("discord.js");
const Util = require("./Util.js");
const fs = require("fs");
const client = new Discord.Client();
const Bot = client;
const TEXT_GENERAL = "180791241561079816";
const SMAD_ROLE_ID = "197696044811681792";
var EXCLUDED_WELCOME = [];
var Welcomes = {};

var userLogin = function (user) {
    this.user = user;
    this.loginDate = new Date();

}
client.login("MzM5NDAxNDgyNzM2NTAwNzM2.DFjd-Q.kGT69FF7KGE5hMJRtvvOzJOi5ec");

client.on("ready", () => {
    console.log("I am ready!");
    client.user.setGame("Use !help for list of commands");
    // load current text data to memory
    fs.readFile("./Data/Data.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        EXCLUDED_WELCOME = JSON.parse(data);
        



    })

});


function UserIsSMAD(guildMember) {
    return guildMember.roles.has(SMAD_ROLE_ID);
}

client.on("message", (message) => {
    Util.init(this,EXCLUDED_WELCOME); // pass the discord client to the util so we can perform discord tasks from it
    Util.ParseMessage(message);


});

client.on("presenceUpdate", (usrOLD, usrNEW) => {

    if (!Welcomes[usrNEW.user.id] && usrNEW.presence.status == "online" && usrOLD.presence.status == "offline") {
        console.log("welcome back");
        // var SMAD_Role = usrNEW.guild.roles.find("name", "SMAD");
        //console.log(SMAD_Role.id);
        if (UserIsSMAD(usrNEW) && EXCLUDED_WELCOME.indexOf(usrNEW.user.username) < 0) {
            client.channels.get(TEXT_GENERAL).send("welcome " + usrNEW.user + " [SMAD]");
            //  Welcomes.push(new userLogin(usrNEW.user));

            Welcomes[usrNEW.user.id] = new userLogin(usrNEW.user);
            console.log(Welcomes[usrNEW.user.id].user);
        }
        else {
            console.log("just another pleb");

        }

    }



});

setInterval(function () {
    Welcomes = {};
    console.log("cleared cache " + new Date().toString());
}, 900000); // clears the welcome cache every 15 mins 