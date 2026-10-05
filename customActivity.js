var connection = new Postmonger.Session();

var payload = {};

$(window).ready(function () {
    connection.trigger("ready");
});

connection.on("initActivity", function (data) {

    payload = data || {};

    var inArguments =
        payload.arguments &&
        payload.arguments.execute &&
        payload.arguments.execute.inArguments
            ? payload.arguments.execute.inArguments
            : [];

    for (var i = 0; i < inArguments.length; i++) {

        if (
            Object.prototype.hasOwnProperty.call(
                inArguments[i],
                "messageId"
            )
        ) {
            $("#messageId").val(
                inArguments[i].messageId || ""
            );
        }
    }

    connection.trigger(
        "updateButton",
        {
            button: "next",
            text: "done",
            visible: true,
            enabled: true
        }
    );
});

connection.on("clickedNext", function () {

    var messageId = $("#messageId")
        .val()
        .trim();

    if (!messageId) {

        $("#messageIdError").show();

        connection.trigger("ready");

        return;
    }

    $("#messageIdError").hide();

    payload.arguments =
        payload.arguments || {};

    payload.arguments.execute =
        payload.arguments.execute || {};

    payload.arguments.execute.inArguments = [
        {
            subscriberKey: "{{Contact.Key}}"
        },
        {
            messageId: messageId
        }
    ];

    payload.metaData =
        payload.metaData || {};

    payload.metaData.isConfigured = true;

    connection.trigger(
        "updateActivity",
        payload
    );
});
