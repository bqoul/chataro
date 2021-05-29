const bot = require("./bot");

// const sleep = async (ms) => {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

bot.start(ctx => {
    ctx.reply(`welcome to chataro, ${ctx.message.from.username}!`, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "start", callback_data: "connect"}, 
                    {text: "info", callback_data: "info"}
                ], 
            ],
        }
    });
});

bot.on("callback_query", async ctx => {
    switch(ctx.callbackQuery.data) {
        case "connect":
            ctx.editMessageText("looking for new interlocutor");
            break;

        case "info":
            ctx.editMessageText("all information abot the bot & sourse code here -> https://github.com/bqoul/chataro", {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "back", callback_data: "back"}],
                    ]
                }
            });
            break;
        
        case "back":
            ctx.editMessageText(`welcome to chataro, ${ctx.from.username}!`, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text: "start", callback_data: "connect"}, 
                            {text: "info", callback_data: "info"}
                        ], 
                    ],
                }
            });
            break;
    }
})

bot.launch();