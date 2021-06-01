module.exports = (ctx) => {
    ctx.reply("Welcome to chataro!", {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "start new chat", callback_data: "connect"}, 
                ], 
            ],
        }
    });
}