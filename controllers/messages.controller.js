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
        let user_id = this.#req.session.user_id;
        let _message = this.#req.session.message;
        let errors = this.#req.session.errors;
        const message = new Message();
        let messages = [];

        this.#req.session.message = null;
        this.#req.session.errors = null;

        try{
            response_data = await message.getMessages(this.#req.session);
        }
        catch(error){
            response.errors = error;
        }

        messages = response_data.result;

        this.#res.render("messages/index.ejs", { user_id, messages, _message, errors });
    }

    create = async () => {
        let response_data = { status: false, result: {}, errors: null }
        const message = new Message();

        try{
            response_data = await message.createMessage(this.#req.body, this.#req.session);
            
            this.#req.session.errors = response_data.errors;
            this.#req.session.message = response_data.message;
        }
        catch(error){
            response_data.errors = error;
        }
        
        this.#res.send(JSON.stringify(response_data));
    }

    destroy = async () => {
        let response_data = { status: false, result: {}, errors: null }
        const message = new Message();

        try{
            response_data = await message.deleteMessage(this.#req.body);
            
            this.#req.session.errors = response_data.errors;
            this.#req.session.message = response_data.message;
        }
        catch(error){
            response_data.errors = error;
        }

        this.#res.redirect("/");
    }
}

module.exports = MessagesController;