const bot = require("./bot");

//empty queue array
let queue = [];
//empty object for connected ids
let interlocutor = {};
//empty object for message/chat ids
let id = {};

bot.start(ctx => {
    //checking if user is connected to someone to prevent usage of /start command
    if(!interlocutor[ctx.from.id]) {
        const start = require("./alias/start");
        start(ctx);
    }
});

bot.on("callback_query", async ctx => {
    switch(ctx.callbackQuery.data) {
        case "connect":
            const connect = require("./alias/connect");
            connect(ctx, queue, interlocutor, id);
            break;
        
        case "cancel queue":
            const cancel = require("./alias/cancel");
            cancel(ctx, queue);
            break;
    }

})

bot.on("text", async ctx => {
    //check if user is connected
    if(interlocutor[ctx.message.from.id]) {
        switch(ctx.message.text.split(" ")[0]) {
            case "/disconnect":
                //disconnecting users from the chat
                const disconnect = require("./alias/disconnect");
                disconnect(ctx, interlocutor);
                break;

            default:
                //sending messages
                ctx.telegram.sendMessage(interlocutor[ctx.message.from.id], ctx.message.text);
                break;
        }
    }
});

bot.launch();