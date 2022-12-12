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
            location.reload();
        }, "json");
        return false;
    });

});