$(document).ready(() => {
    $("form.messages").on("submit", () => {
        const form = $("form.messages");

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            location.reload();
        }, "json");
        return false;
    });

});