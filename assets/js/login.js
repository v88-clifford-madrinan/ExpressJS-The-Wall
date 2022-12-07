$(document).ready(() => {
    $("#login_form").on("submit", function(){
        let form = $(this);

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            console.log(data);

            if (data.succeed) {
                window.location = "/";
            }
            else {
                if (data.message) $("p.message").text(data.message);
                else $("p.message").text("");

                if(data.errors.email) $("p.email").text(data.errors.email);
                else $("p.email").text("");

                if(data.errors.password) $("p.password").text(data.errors.password);
                else $("p.password").text("");
            }
        }, "json");

        return false;
    });
});