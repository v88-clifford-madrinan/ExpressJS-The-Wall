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

            console.log(check_fields);
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
        const query = `DELETE FROM comments WHERE id = ${form_data.comment_id}`;
        await DBconnection.executeQuery(query);
    }
}

module.exports = Comment;