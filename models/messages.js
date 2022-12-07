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
}

module.exports = Messages;