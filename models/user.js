const DBconnection = require("./connection");
const bcrypt = require("bcryptjs");

class User {
    async createUser(form_data){const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let response = {
            errors: {},
            succeed: false,
        }

        if(form_data["first_name"] == ""){
            response.errors.first_name = "*First name field is required!";
        }
        else if(form_data["first_name"].length < 2){
            response.errors.first_name = "*First name must be at least 2 characters long!";
        }
        if(form_data["last_name"] == ""){
            response.errors.last_name = "*Last name field is required!";
        }
        else if(form_data["last_name"].length < 2){
            response.errors.last_name = "*Last name must be at least 2 characters long!";
        }
        if(form_data["email_address"] == ""){
            response.errors.email = "*Email field is required!";
        }
        else if(!regex.test(form_data["email_address"])){
            response.errors.email = "*Invalid email address!";
        }
        if(form_data["password"] == ""){
            response.errors.password = "*Password field is required!";
        }
        else if(form_data["password"].length < 6){
            response.errors.password = "*Password must be at least 6 characters long!";
        }
        if(form_data["confirm_password"] == ""){
            response.errors.confirm_password = "*Confirm password field is required!";
        }
        if(form_data["confirm_password"] != form_data["password"]){
            response.errors.confirm_password = "*Password doesn't match!";
        }

        /* SUCCEED WILL HOLD FALSE IF THERE IS NO ERROR MESSAGE GIVEN */
        response.succeed = Object.keys(response.errors).length === 0;

        if(response.succeed){
            /* SAVE THE DATA */
            const query = `INSERT INTO users (first_name, last_name, email, password, created_at) VALUES ('${form_data["first_name"]}', '${form_data["last_name"]}', '${form_data["email_address"]}', '${bcrypt.hashSync(form_data["password"])}', NOW())`;
            await DBconnection.executeQuery(query);
        }

        return response;
    }

    async validLoginInput(form_data, session) {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let response = {
            errors: {},
            succeed: false
        };

        if(form_data["email_address"] == "") {
            response.errors.email = "*Email field is required!";
        }
        else if(!regex.test(form_data["email_address"])){
            response.errors.email = "*Invalid email address!";
        }
        if(form_data["password"] == "") {
            response.errors.password = "*Password field is required!";
        }

        if (Object.keys(response.errors).length === 0) {
            const query = `SELECT * FROM users WHERE email = '${form_data["email_address"]}'`;
            let result = await DBconnection.executeQuery(query);

            if (result.result.length > 0) {
                /* SUCCEED WILL HOLD TRUE IF INPUTTED PASSWORD MATCHES THE PASSWORD IN THE DATABASE */
                if (bcrypt.compareSync(form_data["password"], result.result[0].password)) {
                    session.user_id = result.result[0].id;
                    response.succeed = true;
                }
                else {
                    response.message = "Incorrect password!";
                    response.succeed = false;
                }
            }
            else {
                response.message = "Account doesn't exists!";
                response.succeed = false;
            }
        }
        
        return response;
    }
}

module.exports = User;