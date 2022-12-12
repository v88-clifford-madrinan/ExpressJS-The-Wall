const { checkFields } = require("../helpers/index.helper");
const DBconnection = require("./connection");
const mysql = require("mysql");

class Comment {
    async createComment(form_data, session){
        let response_data = {
            status: false,
            result: {},
            errors: "",
            message: ""
        }

        try{
            let check_fields = checkFields([ "message_id", "comment" ], form_data);

            if(check_fields.status){
                if(check_fields.result.comment == ""){
                    response_data.errors = "Comment cannot be empty!";
                }
                
                response_data.status = response_data.errors == "";

                if(response_data.status){
                    let query = "INSERT INTO comments (user_id, message_id, comment, created_at) VALUES (?, ?, ?, NOW())";
                    let params = [
                        session.user_id,
                        check_fields.result.message_id,
                        check_fields.result.comment
                    ];
                    
                    response_data = await DBconnection.executeQuery(mysql.format(query, params));
                    response_data.message = "Your comment is successfully created!";
                }
            }
            else{
                response_data = check_fields;
            }
        }
        catch(error){
            response_data.errors = error;
        }
        
        return response_data;
    }

    async deleteComment(form_data){
        let response_data = {
            status: false,
            result: {},
            errors: null,
            message: ""
        }

        try{
            let check_fields = checkFields([ "comment_id" ], form_data);

            if(check_fields.status){
                let query = mysql.format("DELETE FROM comments WHERE id = ?", [ check_fields.result.comment_id ]);
                let delete_comment = await DBconnection.executeQuery(query);
                
                if(delete_comment.status && delete_comment.result.affectedRows){
                    response_data.status = true;
                }
                else {
                    response_data.errors = "Something went wrong while deleting message!";
                }
            }
        }
        catch(errors){
            response_data.errors = error;
        }

        return response_data;
    }
}

module.exports = Comment;