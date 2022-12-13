$(document).ready(() => {
    $("#registration_form").on("submit", () => {
        let form = $("#registration_form");
        $.post(form.attr("action"), $(form).serialize(), (data) => {
            if(data.status){
                window.location = "/";
            }
            else{
                location.reload();
            }
        }, "json");

        return false;
    })
})