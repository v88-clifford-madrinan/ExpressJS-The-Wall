const Comment = require("../models/comment");

class CommentsController {
    #res;
    #req;

    constructor(req, res){
        this.#req = req;
        this.#res = res;

        if(this.#req.session.user_id == null || typeof this.#req.session.user_id === "undefined"){
            this.#res.redirect("/login");
        }
    }

    create = async () => {
        let response_data = { status: false, result: {}, errors: null }
        let comment = new Comment();

        try{
            response_data = await comment.createComment(this.#req.body, this.#req.session);
            
            this.#req.session.errors = response_data.errors;
            this.#req.session.message = response_data.message;
        }
        catch(error){
            response_data.errors = error;
        }

        this.#res.redirect("/");
    }

    destroy = async () => {
        let response_data = { status: false, result: {}, errors: null }
        let comment = new Comment();

        try{
            response_data = await comment.deleteComment(this.#req.body);
            
            this.#req.session.errors = response_data.errors;
            this.#req.session.message = response_data.message;
        }
        catch(errors){
            response_data.errors = error;
        }
        
        this.#res.redirect("/");
    }
}

module.exports = CommentsController;
