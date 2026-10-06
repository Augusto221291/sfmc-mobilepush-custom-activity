var connection = new Postmonger.Session();

var payload = {};

$(function () {
    connection.trigger("ready");
});


/* ============================
   INIT ACTIVITY
   ============================ */

connection.on("initActivity", function (data) {

    payload = data || {};

    var inArguments =
        payload.arguments &&
        payload.arguments.execute &&
        payload.arguments.execute.inArguments
            ? payload.arguments.execute.inArguments
            : [];


    var savedAppName = "";

    for (var i = 0; i < inArguments.length; i++) {

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

        if (
            Object.prototype.hasOwnProperty.call(
                arg,
                "appName"
            )
        ) {

            savedAppName =
                arg.appName || "";

        }

    }


    if (savedAppName) {

        $("#appName").val(savedAppName);

    }


    updateMessageExample();


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


/* ============================
   APP CHANGE
   ============================ */

$("#appName").on(
    "change",
    function () {

        $("#appError").hide();

        updateMessageExample();

    }
);


/* ============================
   MESSAGE ID CHANGE
   ============================ */

$("#messageId").on(
    "input",
    function () {

        $("#messageIdError").hide();

    }
);


/* ============================
   EXEMPLO POR APP
   ============================ */

function updateMessageExample() {

    var appName =
        $("#appName").val();

    var text = "";


    if (appName === "zap") {

        text =
            "Exemplo ZAP Imóveis: Nzg5NzoxMTQ6MA";

    }


    if (appName === "vivareal") {

        text =
            "Exemplo Viva Real: Nzg5ODoxMTQ6MA";

    }


    $("#messageExample").text(text);

}


/* ============================
   DONE
   ============================ */

connection.on(
    "clickedNext",
    function () {

        var appName =
            $("#appName").val();

        var messageId =
            $("#messageId")
                .val()
                .trim();


        var valid = true;


        if (!appName) {

            $("#appError").show();

            valid = false;

        } else {

            $("#appError").hide();

        }


        if (!messageId) {

            $("#messageIdError").show();

            valid = false;

        } else {

            $("#messageIdError").hide();

        }


        if (!valid) {
            return;
        }


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
            },

            {
                appName:
                    appName
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
