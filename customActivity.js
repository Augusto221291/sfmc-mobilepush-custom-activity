var connection = new Postmonger.Session();

var payload = {};


/* ============================
   DEBUG
   ============================ */

function debug(message) {

    var current =
        $("#debug").text();

    $("#debug").text(
        current + "\n" + message
    );

}


/* ============================
   READY
   ============================ */

$(function () {

    debug("1. UI carregada");

    connection.trigger("ready");

    debug("2. ready enviado");

});


/* ============================
   INIT ACTIVITY
   ============================ */

connection.on(
    "initActivity",
    function (data) {

        debug("3. initActivity recebido");

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

        debug("4. botão Done configurado");

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

        debug("5. clickedNext recebido");


        var messageId =
            $("#messageId")
                .val()
                .trim();


        debug(
            "6. messageId: " +
            messageId
        );


        if (!messageId) {

            debug(
                "7. ERRO: messageId vazio"
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


        debug(
            "7. payload preparado"
        );


        debug(
            "8. enviando updateActivity"
        );


        connection.trigger(
            "updateActivity",
            payload
        );


        debug(
            "9. updateActivity enviado"
        );

    }
);
