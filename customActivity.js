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
                visible: true,
                enabled: true
            }
        );

    }
);


/* ============================
   CAMPO MESSAGE ID
   ============================ */

$("#messageId").on(
    "input",
    function () {

        $("#messageIdError").hide();

        $("#messageId").removeClass(
            "input-error"
        );

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


        /* ----------------------------
           VALIDAÇÃO
           ---------------------------- */

        if (!messageId) {

            $("#messageIdError").show();

            $("#messageId").addClass(
                "input-error"
            );

            /*
             * Importante:
             * devolve o controle ao Journey Builder
             * quando a validação falha.
             */
            connection.trigger("ready");

            return;

        }


        $("#messageIdError").hide();

        $("#messageId").removeClass(
            "input-error"
        );


        /* ----------------------------
           PAYLOAD
           ---------------------------- */

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


        /* ----------------------------
           SALVAR E FECHAR
           ---------------------------- */

        connection.trigger(
            "updateActivity",
            payload
        );

    }
);
