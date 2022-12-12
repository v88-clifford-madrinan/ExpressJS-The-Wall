const Helper = {};

Helper.checkFields = (required_fields, req_body) => {
    let response_data = { status: true, result: {}, error: null, message: "" };

    try{
        let sanitized_data = {};
        let prohibited_fields = [];

        /* SANITIZING DATA */
        for(let index in required_fields){
            let selected_key = required_fields[index];

            /* ASSIGN THE VALUE FROM SUBMITTED DATA TO SANITIZED DATA */
            sanitized_data[selected_key] = req_body[selected_key];
        }

        /* GETTING PROHIBITED FIELDS/NOT ALLOWED */
        for(field in req_body){
            if(!required_fields.includes(field)){
                prohibited_fields.push(field);
            }
        }

        if(prohibited_fields.length){
            response_data.status = false;
            response_data.result = { prohibited_fields };
            response_data.message  = "There are fields that is not allowed."
        }
        else{
            response_data.status = true;
            response_data.result = sanitized_data;
        }
    }
    catch(error){

    }

    return response_data;
}

module.exports = Helper;