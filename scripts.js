$(document).ready(function () {
    var cursor = 1;

    $("#mostrar").click(function (evento) {
        evento.preventDefault();
        mostrar();
    });

    $("#agregar").click(function (evento) {
        $("#error").html("");
        evento.preventDefault();
        let nombre = $("#nombre").val();
        let precio = $("#precio").val();
        $.ajax({
            type: 'POST',
            headers: { 'Accept': 'application/json' },
            url: "http://localhost:3000/public/api/products",
            data: { "name": nombre, "price": precio }
        }).done(function( msg ) {
            mostrar();
        }).fail(function (jqXHR, textStatus, errorThrown){
            if (jqXHR["status"] === 422 ) {
                $("#error").html(jqXHR["responseJSON"]["message"]);
            }else{
                $("#error").html("The following error occured: "+ textStatus +" "+ errorThrown);
            }
        });
    });

    $("#atras").click(function (evento) {
        evento.preventDefault();
        if (cursor > 1) cursor--;
        mostrar(cursor);
    });

    $("#adelante").click(function (evento) {
        evento.preventDefault();
        cursor++
        mostrar(cursor);
    });

});

function mostrar(cursor = 1){
    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/public/api/products",
        data: { "page": cursor},
    }).done(function( msg ) {
        $(".prod").remove();
        $("#atras").attr('disabled', false);
        $("#adelante").attr('disabled', false);

        msg.data.forEach(
            producto => {
                $("#table").append(
                    "<tr>" +
                    "<td class='col-lg-3 prod' style='border:1px solid black;'>" + producto['id'] + "</td>" +
                    "<td class='col-lg-3 prod' style='border:1px solid black;'>" + producto['name'] + "</td>" +
                    "<td class='col-lg-3 prod' style='border:1px solid black;'>" + producto['price'] + "</td>" +
                    "<td class='col-lg-3 prod' style='border:1px solid black;'>" + producto['usd_price'] + "</td>" +
                    "</tr>"
                );
            }
        );
    }).fail(function (jqXHR, textStatus, errorThrown){
        $("#error").html("The following error occured: "+ textStatus +" "+ errorThrown);
    });
}