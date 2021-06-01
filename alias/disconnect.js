module.exports = (ctx, interlocutor) => {
    //notifying both users about the disconnection
    ctx.reply("diconnected from the chat", {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "start new chat", callback_data: "connect"},
                ],
            ],
        }
    })
    ctx.telegram.sendMessage(interlocutor[ctx.from.id], "interlocutor left the chat", {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "start new chat", callback_data: "connect"},
                ],
            ],
        }
    })

    //removing both users from the connection object
    interlocutor[interlocutor[ctx.from.id]] = undefined;
    interlocutor[ctx.from.id] = undefined;
}