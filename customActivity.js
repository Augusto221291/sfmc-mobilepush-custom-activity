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
    "clickedNext",
    function () {

        var messageId =
            $("#messageId")
                .val()
                .trim();

        console.log(
            "clickedNext - messageId:",
            messageId
        );

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

        console.log(
            "Payload enviado ao updateActivity:",
            JSON.stringify(payload)
        );

        connection.trigger(
            "updateActivity",
            payload
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
