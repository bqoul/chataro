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
    }
})

bot.launch();