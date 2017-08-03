require("discord.js");
var fs = require("fs");

module.exports = {
    Channels: {
        GENERAL: "180791241561079817",
        AFK: "180791844383227905"
    },
    client: {},
    EXCLUDED_WELCOME: [],
    init: function (client, excludedWelcome) {
        this.client = client;
        this.EXCLUDED_WELCOME = excludedWelcome;
    },
    ParseMessage: function (message) {
        if (message.content.toLowerCase().startsWith("!help")) {
            message.reply("!Tom : Plays toms song duhh");
            message.reply("!ExcludeMe : Will exclude you from any welcome messages");
        }

        if (message.content.startsWith("!Tom")) {
            this.PlaySoundinChannel(message, "./Sounds/TomsSong.mp3")
        }

        if (message.content.startsWith("!ExcludeMe")) {
            EXCLUDED_WELCOME.push(message.author.username);
            message.reply("Thank you, you will no longer recieve welcome messages");
        }
        if (message.content.startsWith("!Wow")) {
            // randomize a Wow clip then play it into the channel
            console.log("wow");
            this.PlaySoundinChannel(message, "./Sounds/wow.mp3");
        }
    },
    /// Play a sound in response to a message
    PlaySoundinChannel: function (message, soundFilePath, onExit) {
        var voiceChannel = message.member.voiceChannel;

        if (!voiceChannel) {
            message.reply("ERROR : You must be in a voice channel before using this command");
            return;
        }


        voiceChannel.join().then(connection => {

            const dispatcher = connection.playFile(soundFilePath);
            dispatcher.on("end", end => {
                if (onExit)
                    onExit();
                voiceChannel.leave();

            });

        }).catch(err => { voiceChannel.leave(); });
    }


}