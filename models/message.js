const DBconnection = require("./connection");
const mysql = require("mysql");

class Messages {
    async createMessage(form_data, session){
        const response = {
            errors: "",
            message: "",
            succeed: false
        }
        console.log(form_data);
        console.log(session.user_id);

        if(form_data["message"] == ""){
            response.errors = "Message cannot be empty!";
        }

        response.succeed = response.errors == ""

        if(response.succeed){
            response.message = "Your message is successfully created!";
            const query = `INSERT INTO messages (user_id, message, created_at) VALUES ('${session.user_id}', '${form_data["message"]}', NOW())`;
            
            await DBconnection.executeQuery(query);
        }

        return response;
    }

    async getMessages(session){
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
                        JSON_OBJECTAGG(comments.id, JSON_ARRAY(comments.user_id, comments.comment, CONCAT(users.first_name, " ", users.last_name),  DATE_FORMAT(comments.created_at, "%M %D %Y")))
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
        console.log(form_data);

        const query = `DELETE FROM messages WHERE id = ${form_data.message_id}`;
        await DBconnection.executeQuery(query);
    }
}

module.exports = Messages;