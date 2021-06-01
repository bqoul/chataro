module.exports = (ctx, queue) => {
    queue.splice(queue.indexOf(ctx.from.id));
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