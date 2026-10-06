var connection = new Postmonger.Session();

var payload = {};


/* ============================
   READY
   ============================ */

$(function () {

    console.log("[CA] carregada");

    connection.trigger("ready");

});


/* ============================
   INIT ACTIVITY
   ============================ */

connection.on(
    "initActivity",
    function (data) {

        console.log(
            "[CA] initActivity recebido",
            data
        );

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

        console.log(
            "[CA] clickedNext recebido"
        );


        var messageId =
            $("#messageId")
                .val()
                .trim();


        console.log(
            "[CA] messageId digitado:",
            messageId
        );


        if (!messageId) {

            console.log(
                "[CA] validação falhou: messageId vazio"
            );

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


        console.log(
            "[CA] enviando updateActivity",
            payload
        );


        connection.trigger(
            "updateActivity",
            payload
        );


        console.log(
            "[CA] updateActivity disparado"
        );

    }
);
