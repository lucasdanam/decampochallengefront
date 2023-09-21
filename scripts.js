$(document).ready(function () {
    $("#mostrar").click(function (evento) {
        evento.preventDefault();
        $(".prod").remove();
        $.ajax({
            type: 'GET',
            url: "http://localhost:3000/public/api/products?perpage=100",
        }).done(function( msg ) {
            msg.data.forEach(
                producto =>
                    $("#table").append(
                        "<tr>" +
                        "<td class='col-lg-4 prod'>"+producto['name']+"</td>" +
                        "<td class='col-lg-4 prod'>"+producto['price']+"</td>" +
                        "<td class='col-lg-4 prod'>"+producto['usd_price']+"</td>" +
                        "</tr>"
                    )
            );
        }).fail(function (jqXHR, textStatus, errorThrown){
            $("#error").html("The following error occured: "+ textStatus +" "+ errorThrown);
        });
    });
});