const notify = (user_id, ctx, id) => {
    ctx.telegram.deleteMessage(id[user_id].chat, id[user_id].message);
    ctx.telegram.sendMessage(user_id, "conected, have fun chatting!");
}

module.exports = async (ctx, queue, interlocutor, id) => {
    const message = await ctx.editMessageText("looking for new interlocutor", {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "cancel", callback_data: "cancel queue"},
                ],
            ],
        }
    });

    //pushing user id to the queue & getting position of the second user in queue
    let position = queue.push(ctx.from.id) - 2;

    //saving the message & chat id to delete previous message if user is connected to someone
    id[ctx.from.id] = {
        chat: message.chat.id,
        message: message.message_id,
    };

    //if theres someone else in the queue
    if(queue.length > 1) {
        //saving ids to the interlocutor object to send messages
        interlocutor[ctx.from.id] = queue[position];
        interlocutor[queue[position]] = ctx.from.id;

        //notifying both users about succesfull connection
        notify(interlocutor[ctx.from.id], ctx, id);
        notify(interlocutor[queue[position]], ctx, id);

        //removing both ids from the queue
        queue.splice(position, 2);
    }
}