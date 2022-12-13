$(document).ready(() => {
    $("#login_form").on("submit", function(){
        let form = $(this);

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            if(data.status){
                window.location = "/";
            }
            else{
                location.reload();
            }
        }, "json");

        return false;
    });
});