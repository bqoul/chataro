module.exports = (ctx, queue) => {
    //removing user from the queue
    queue.splice(queue.indexOf(ctx.from.id));
    //and notifying him about it
    ctx.editMessageText("you have been removed from the queue", {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "start new chat", callback_data: "connect"},
                ],
            ],
        }
    });
}