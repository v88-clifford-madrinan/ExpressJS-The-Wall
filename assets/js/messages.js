function timeSince(date){
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if(interval > 1){
        return isPlural(Math.floor(interval), " year");
    }

    interval = seconds / 2592000;
    if(interval > 1){
        return isPlural(Math.floor(interval), " month");
    }

    interval = seconds / 86400;
    if(interval > 1){
        return isPlural(Math.floor(interval), " day");
    }

    interval = seconds / 3600;
    if(interval > 1){
        return isPlural(Math.floor(interval), " hour");
    }

    interval = seconds / 60;
    if(interval > 1){
        return isPlural(Math.floor(interval), " minute");
    }
    return isPlural(Math.floor(interval), " second");
}

function isPlural(num, str){
    return num + str + (num > 1 ? "s" : "") + " ago";
}

$(document).ready(() => {
    $("form.messages").on("submit", () => {
        const form = $("form.messages");

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            console.log(data);

            if(data.succeed){
                $("p.response").text(data.message);
                $("form.messages textarea").val("");

                $("form.get_message").submit();
            }
            else{
                $("p.response").text(data.errors);
            }
        }, "json");
        return false;
    });

    $("form.get_message").on("submit", () => {
        const form = $("form.get_message");

        $("div.message_container").children().not(":first").remove();

        $.get(form.attr("action"), (data) => {
            console.log(data);
            for(let i = 0; i < data.result.length; i++){
                const message = data.result[i];

                $("div.message_template:first").clone()
                    .css("display", "block")
                    .find("h3.author")
                    .html(message.first_name + " " + message.last_name)
                    .end()
                    .find("p.message_date")
                    .html(timeSince(Date.parse(message.created_at)))
                    .end()
                    .find("p.message_content")
                    .html(message.message)
                    .end()
                    .appendTo("div.message_container");
            }
        }, "json");

        return false;
    })

    $("form.get_message").submit();
});