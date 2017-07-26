require("discord.js");


module.exports = {
    Channels: {
        GENERAL: "180791241561079817",
        AFK: "180791844383227905"
    },
    client: {},
    init: function (client) {
        this.client = client;
    },
    ParseMessage: function (message) {
        if (message.content.toLowerCase().startsWith("!help")) {
            message.reply("!gig <HeroName> : Provides wiki page for that Hero");
        }

        if (message.content.startsWith("!Tom")) {
          this.PlaySoundinChannel(message, "./TomsSong.mp3")
        }
    },
    /// Play a sound in response to a message
    PlaySoundinChannel: function (message, soundFilePath, onExit) {
        var voiceChannel = message.member.voiceChannel;
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