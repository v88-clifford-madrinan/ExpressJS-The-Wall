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

    async getMessages(){
        const query = `SELECT 
            users.id AS user_id,
            users.first_name AS first_name, 
            users.last_name AS last_name, 
            messages.id AS id,
            messages.message AS message,
            messages.created_at AS created_at
            FROM messages INNER JOIN users ON messages.user_id = users.id ORDER BY messages.id DESC;`
        const response_data = await DBconnection.executeQuery(query);

        return response_data;
    }
}

module.exports = Messages;