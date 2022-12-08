const DBconnection = require("./connection");

class Comment {
    async createComment(form_data, session){
        const query = `INSERT INTO comments (user_id, message_id, comment, created_at) VALUES ('${session.user_id}', '${form_data["message_id"]}', '${form_data["comment"]}', NOW())`;
        await DBconnection.executeQuery(query);
    }

    async deleteComment(form_data){
        console.log(form_data);
        const query = `DELETE FROM comments WHERE id = ${form_data.comment_id}`;
        await DBconnection.executeQuery(query);
    }
}

module.exports = Comment;