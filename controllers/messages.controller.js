const { response } = require("express");
const Message = require("../models/message");

class MessagesController {
    #res;
    #req;

    constructor(req, res){
        this.#req = req;
        this.#res = res;

        if(this.#req.session.user_id == null || typeof this.#req.session.user_id === "undefined"){
            this.#res.redirect("/login");
        }
    }

    index = async () => {
        let response_data = { status: false, result: {}, errors: null }
        const message = new Message();

        try{
            response_data = await message.getMessages(this.#req.session);
            
            this.#req.session.errors = response_data.errors;
            this.#req.session.message = response_data.message;
            console.log(response_data.result);
        }
        catch(error){
            response.errors = error;
        }

        this.#res.render("messages/index.ejs", { messages: response_data.result, user_id: this.#req.session.user_id });
    }

    create = async () => {
        const message = new Message();
        const response_data = await message.createMessage(this.#req.body, this.#req.session);
        
        this.#res.send(JSON.stringify(response_data));
    }

    getMessages = async () => {
        const message = new Message();
        const response_data = await message.getMessages(this.#req.session);
        
        this.#res.send(JSON.stringify(response_data));
    }

    destroy = async () => {
        const message = new Message();
        await message.deleteMessage(this.#req.body);

        this.#res.redirect("/");
    }
}

module.exports = MessagesController;