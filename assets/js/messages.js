$(document).ready(() => {
    $("form.messages").on("submit", () => {
        const form = $("form.messages");

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            console.log(data);

            if(data.succeed){
                $("p.response").text(data.message);
                $("form.messages textarea").val("");
            }
            else{
                $("p.response").text(data.errors);
            }
        }, "json");
        return false;
    });
});