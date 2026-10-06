var connection = new Postmonger.Session();

var payload = {};

$(function () {
    connection.trigger("ready");
});

connection.on(
    "initActivity",
    function (data) {

        payload = data || {};

        var inArguments =
            payload.arguments &&
            payload.arguments.execute &&
            payload.arguments.execute.inArguments
                ? payload.arguments.execute.inArguments
                : [];

        for (
            var i = 0;
            i < inArguments.length;
            i++
        ) {

            var arg = inArguments[i];

            if (
                Object.prototype.hasOwnProperty.call(
                    arg,
                    "messageId"
                )
            ) {

                $("#messageId").val(
                    arg.messageId || ""
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

    }
);

$("#messageId").on(
    "input",
    function () {

        $("#messageIdError").hide();

    }
);

connection.on(
    "clickedNext",
    function () {

        var messageId =
            $("#messageId")
                .val()
                .trim();

        if (!messageId) {

            $("#messageIdError").show();

            return;

        }

        $("#messageIdError").hide();

        payload.arguments =
            payload.arguments || {};

        payload.arguments.execute =
            payload.arguments.execute || {};

        payload.arguments.execute.inArguments = [

            {
                subscriberKey:
                    "{{Contact.Key}}"
            },

            {
                messageId:
                    messageId
            }

        ];

        payload.metaData =
            payload.metaData || {};

        payload.metaData.isConfigured =
            true;

        connection.trigger(
            "updateActivity",
            payload
        );

    }
);
