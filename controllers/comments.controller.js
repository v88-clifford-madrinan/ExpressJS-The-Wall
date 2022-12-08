const Comment = require("../models/comment");

class CommentsController {
    #res;
    #req;

    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    create = async () => {
        const comment = new Comment();
        await comment.createComment(this.#req.body, this.#req.session);

        this.#res.redirect("/");
    }
}

module.exports = CommentsController;
