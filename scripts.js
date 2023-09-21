$(document).ready(function () {
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
            $("#error").html("The following error occured: "+ textStatus +" "+ errorThrown);
        });
    });
});

function mostrar(){
    $(".prod").remove();
    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/public/api/products?perpage=100",
    }).done(function( msg ) {
        msg.data.forEach(
            producto =>
                $("#table").append(
                    "<tr>" +
                    "<td class='col-lg-4 prod' style='border:1px solid black;'>"+producto['id   ']+"</td>" +
                    "<td class='col-lg-4 prod' style='border:1px solid black;'>"+producto['name']+"</td>" +
                    "<td class='col-lg-4 prod' style='border:1px solid black;'>"+producto['price']+"</td>" +
                    "<td class='col-lg-4 prod' style='border:1px solid black;'>"+producto['usd_price']+"</td>" +
                    "</tr>"
                )
        );
    }).fail(function (jqXHR, textStatus, errorThrown){
        $("#error").html("The following error occured: "+ textStatus +" "+ errorThrown);
    });
}