const { checkFields } = require("../helpers/index.helper");
const DBconnection = require("./connection");
const mysql = require("mysql");

class Messages {
    async createMessage(form_data, session){
        let response_data = {
            status: false,
            result: {},
            errors: "",
            message: ""
        }

        try{
            let check_fields = checkFields([ "message" ], form_data);

            if(check_fields.status){
                if(check_fields.result.message == ""){
                    response_data.errors = "Message cannot be empty!";
                }
                
                response_data.status = response_data.errors == "";

                if(response_data.status){
                    let query = "INSERT INTO messages (user_id, message, created_at) VALUES (?, ?, NOW())";
                    let params = [
                        session.user_id,
                        check_fields.result.message
                    ];
                    
                    response_data = await DBconnection.executeQuery(mysql.format(query, params));
                    response_data.message = "Your message is successfully created!";
                }
            }
            else {
                response_data = check_fields;
            }
        }
        catch(error){
            response_data.errors = error;
        }

        return response_data;
    }

    async getMessages(){
        let response_data = {
            status: false,
            result: {},
            errors: {}
        }

        try{
            let query = `SELECT 
                messages.id, messages.user_id, messages.message, DATE_FORMAT(messages.created_at, "%M %D %Y") AS created_at,
                CONCAT(users.first_name, " ", users.last_name) AS posted_by,
                (
                    SELECT 
                        JSON_OBJECTAGG(comments.id, JSON_ARRAY(comments.id, comments.user_id, comments.comment, CONCAT(users.first_name, " ", users.last_name),  DATE_FORMAT(comments.created_at, "%M %D %Y")))
                    FROM comments
                    INNER JOIN users ON users.id = comments.user_id
                    WHERE comments.message_id = messages.id
                ) AS comments
                FROM messages
                INNER JOIN users ON users.id = messages.user_id
                ORDER BY messages.id DESC`

            response_data = await DBconnection.executeQuery(mysql.format(query,));
        }
        catch(error){
            response_data.errors = error
        }

        return response_data;
    }
    async deleteMessage(form_data){
        let response_data = {
            status: false,
            result: {},
            errors: null,
            message: ""
        }

        try{
            let check_fields = checkFields([ "message_id" ], form_data);

            if(check_fields.status){
                let query = mysql.format("DELETE FROM messages WHERE id = ?", [ check_fields.result.message_id ]);
                let delete_message = await DBconnection.executeQuery(query);

                if(delete_message.status && delete_message.result.affectedRows){
                    response_data.status = true;
                }
                else {
                    response_data.errors = "Something went wrong while deleting message!";
                }
            }
            else {
                response_data = check_fields;
            }
        }
        catch(error){
            response_data.errors = error;
        }

        return response_data;
    }
}

module.exports = Messages;