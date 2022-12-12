const { checkFields } = require("../helpers/index.helper");
const DBconnection = require("./connection");
const bcrypt = require("bcryptjs");
const mysql = require("mysql");

class User {
    async createUser(form_data){const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let response_data = {
            status: false,
            result: {},
            errors: null
        }

        /*------------------------ VALIDATING FIRST NAME ------------------------*/
        if(form_data["first_name"] == ""){
            response_data.errors.first_name = "*First name field is required!";
        }
        else if(form_data["first_name"].length < 2){
            response_data.errors.first_name = "*First name must be at least 2 characters long!";
        }

        /*------------------------ VALIDATING LAST NAME ------------------------*/
        if(form_data["last_name"] == ""){
            response_data.errors.last_name = "*Last name field is required!";
        }
        else if(form_data["last_name"].length < 2){
            response_data.errors.last_name = "*Last name must be at least 2 characters long!";
        }

        /*------------------------ VALIDATING EMAIL ADDRESS ------------------------*/
        if(form_data["email_address"] == ""){
            response_data.errors.email = "*Email field is required!";
        }
        else if(!regex.test(form_data["email_address"])){
            response_data.errors.email = "*Invalid email address!";
        }

        /*------------------------ VALIDATING PASSWORD ------------------------*/
        if(form_data["password"] == ""){
            response_data.errors.password = "*Password field is required!";
        }
        else if(form_data["password"].length < 6){
            response_data.errors.password = "*Password must be at least 6 characters long!";
        }

        /*------------------------ VALIDATING CONFIRM PASSWORD ------------------------*/
        if(form_data["confirm_password"] == ""){
            response_data.errors.confirm_password = "*Confirm password field is required!";
        }
        else if(form_data["confirm_password"] != form_data["password"]){
            response_data.errors.confirm_password = "*Password doesn't match!";
        }

        /* STATUS WILL HOLD FALSE IF THERE IS NO ERROR MESSAGE GIVEN */
        response_data.status = Object.keys(response_data.errors).length === 0;

        if(response_data.status){
            /* SAVE THE DATA */
            const query = `INSERT INTO users (first_name, last_name, email, password, created_at) VALUES ('${form_data["first_name"]}', '${form_data["last_name"]}', '${form_data["email_address"]}', '${bcrypt.hashSync(form_data["password"])}', NOW())`;
            await DBconnection.executeQuery(query);
        }

        return response_data;
        //TODO RETURN HERE AFTER LOGIN...
    }

    async validLoginInput(form_data, session) {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let response_data = {
            status: false,
            result:{},
            errors: {},
            message: ""
        };

        try{
            // console.log(form_data);
            let check_fields = checkFields([ "email_address", "password" ], form_data);

            if(check_fields.status){
                // console.log(check_fields.result);
                // console.log(`'${check_fields.result.email_address}'`);
                // console.log(`'${check_fields.result.password}'`);

                /*------------------------ VALIDATING EMAIL ADDRESS ------------------------*/
                if(check_fields.result.email_address == "") {
                    response_data.errors.email = "*Email field is required!";
                }
                else if(!regex.test(check_fields.result.email_address)){
                    response_data.errors.email = "*Invalid email address!";
                }
        
                /*------------------------ VALIDATING PASSWORD ------------------------*/
                if(check_fields.result.password == "") {
                    response_data.errors.password = "*Password field is required!";
                }

                if (Object.keys(response_data.errors).length === 0) {
                    let query = mysql.format("SELECT * FROM users WHERE email = ?", [ form_data["email_address"] ]);
                    let result = await DBconnection.executeQuery(query);

                    if (result.result.length > 0) {
                        /* SUCCEED WILL HOLD TRUE IF INPUTTED PASSWORD MATCHES THE PASSWORD IN THE DATABASE */
                        if (bcrypt.compareSync(form_data["password"], result.result[0].password)) {
                            session.user_id = result.result[0].id;
                            response_data.status = true;
                        }
                        else {
                            response_data.message = "Incorrect password!";
                            response_data.status = false;
                        }
                    }
                    else {
                        response_data.message = "Account doesn't exists!";
                        response_data.status = false;
                    }
                }
            }
            else {
                response_data = check_fields;
            }
        }
        catch(error){
            response_data.errors = error
        }
        
        return response_data;
    }
}

module.exports = User;