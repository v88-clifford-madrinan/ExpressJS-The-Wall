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

            location.reload();
            // if(data.status){
            //     $("p.response").text(data.message);
            //     $("form.messages textarea").val("");

            //     $("form.get_message").submit();
            // }
            // else{
            //     $("p.response").text(data.errors);
            // }
        }, "json");
        return false;
    });

    $("form.get_message").on("submit", () => {
        const form = $("form.get_message");

        $("div.message_container").children().not(":first").remove();

        $.get(form.attr("action"), (data) => {
            console.log(data);
            for(let i = 0; i < data.data.result.length; i++){
                const message = data.data.result[i];

                if(data.user_id == message.user_id){
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
                        .find("div.comment_container")
                        .attr("id", "comment_message_" + message.id)
                        .end()
                        .find("input[type=hidden]")
                        .attr("value", message.id)
                        .end()
                        .appendTo("div.message_container");
                }
                else {
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
                        .find("div.comment_container")
                        .attr("id", "comment_message_" + message.id)
                        .end()
                        .find("input.btn_message_delete")
                        .attr("id", "delete_msg" + message.id)
                        .end()
                        .find("#delete_msg" + message.id)
                        .css("display", "none")
                        .end()
                        .find("input[type=hidden]")
                        .attr("value", message.id)
                        .end()
                        .appendTo("div.message_container");
                }
                
                $("div.comment_container#comment_message_" + message.id).children().not(":first").remove();

                for(let j = 0; j < message.comments.length; j++){
                    const comment = message.comments[j];

                    if(data.user_id == comment.user_id){
                        $("#comment_message_" + message.id + " div.comment_template:first").clone()
                            .css("display", "block")
                            .find("h4.author")
                            .html(comment.first_name + " " + comment.last_name)
                            .end()
                            .find("p.comment_date")
                            .html(timeSince(Date.parse(comment.created_at)))
                            .end()
                            .find("p.comment_content")
                            .html(comment.comment)
                            .end()
                            .find("input[type=hidden]")
                            .attr("value", comment.id)
                            .end()
                            .appendTo("div.comment_container#comment_message_" + message.id);
                    }
                    else{
                        $("#comment_message_" + message.id + " div.comment_template:first").clone()
                            .css("display", "block")
                            .find("h4.author")
                            .html(comment.first_name + " " + comment.last_name)
                            .end()
                            .find("p.comment_date")
                            .html(timeSince(Date.parse(comment.created_at)))
                            .end()
                            .find("p.comment_content")
                            .html(comment.comment)
                            .end()
                            .find("input.btn_comment_delete")
                            .attr("id", "delete_cmt" + comment.id)
                            .end()
                            .find("#delete_cmt" + comment.id)
                            .css("display", "none")
                            .end()
                            .appendTo("div.comment_container#comment_message_" + message.id);
                    }
                }
            }
        }, "json");

        return false;
    })

    // $("form.get_message").submit();
});