require("discord.js");

module.exports = {
    client: {},
    init: function (client) {

    },
    ParseMessage: function (message) {
        if (message.content.toLowerCase().startsWith("!help")) {
            message.reply("!gig <HeroName> : Provides wiki page for that Hero");
        }

        if (message.content.startsWith("!play")) {
            console.log("play");
            var voiceChannel = message.member.voiceChannel;

            voiceChannel.join().then(connection => {
                const dispatcher = connection.playFile('./Sounds/Clap.mp3');
                dispatcher.on("end", end => {voiceChannel.leave();});

            }).catch(err => {console.log(err); voiceChannel.leave();});
        }
    }


}