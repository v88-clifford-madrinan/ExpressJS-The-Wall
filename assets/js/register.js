$(document).ready(() => {
    $("#registration_form").on("submit", () => {
        let form = $("#registration_form");
        console.log("Form submit!");

        console.log($(form).serialize());

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            console.log(data);

            if(data.succeed){
                window.location = "/";
            }
            else {
                if(data.errors.first_name) $("p.first_name").text(data.errors.first_name);
                else $("p.first_name").text("");
                
                if(data.errors.last_name) $("p.last_name").text(data.errors.last_name);
                else $("p.last_name").text("");

                if(data.errors.email) $("p.email").text(data.errors.email);
                else $("p.email").text("");

                if(data.errors.password) $("p.password").text(data.errors.password);
                else $("p.password").text("");

                if(data.errors.confirm_password) $("p.confirm_password").text(data.errors.confirm_password);
                else $("p.confirm_password").text("");
            }
        }, "json");

        return false;
    })
})