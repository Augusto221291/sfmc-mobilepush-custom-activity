var connection = new Postmonger.Session();

var payload = {};


/* ============================
   READY
   ============================ */

$(function () {

    connection.trigger("ready");

});


/* ============================
   INIT ACTIVITY
   ============================ */

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
                enabled: true
            }
        );

    }
);


/* ============================
   LIMPAR ERRO AO DIGITAR
   ============================ */

$("#messageId").on(
    "input",
    function () {

        $("#messageIdError").hide();

    }
);


/* ============================
   DONE
   ============================ */

connection.on(
    "clickedNext",
    function () {

        var messageId =
            $("#messageId")
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
