const DBconnection = require("./connection");

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
        const response_data = {
            data: [],
            user_id:  session.user_id
        }
        const query = `SELECT 
            users.first_name AS first_name, 
            users.last_name AS last_name, 
            messages.id AS id,
            messages.user_id AS user_id,
            messages.message AS message,
            messages.created_at AS created_at
            FROM messages INNER JOIN users ON messages.user_id = users.id ORDER BY messages.id DESC;`
        response_data.data = await DBconnection.executeQuery(query);

        return response_data;
    }
    async deleteMessage(form_data){
        console.log(form_data);

        const query = `DELETE FROM messages WHERE id = ${form_data.message_id}`;
        await DBconnection.executeQuery(query);
    }
}

module.exports = Messages;