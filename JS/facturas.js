var UrlFacturas = 'http://52.152.236.67:90/G1_19/controller/factura_cliente.php?op=GetFacturas';
var UrlPostFactura = 'http://52.152.236.67:90/G1_19/controller/factura_cliente.php?op=InsertarFactura';
var UrlFactura = 'http://52.152.236.67:90/G1_19/controller/factura_cliente.php?op=GetFactura';
var UrlPutFactura = 'http://52.152.236.67:90/G1_19/controller/factura_cliente.php?op=UpdateFactura';
var UrlDeleteFactura = 'http://52.152.236.67:90/G1_19/controller/factura_cliente.php?op=deleteFactura';



$(document).ready(function(){
CargarFacturas();

});

function CargarFacturas(){
$.ajax({
    url: UrlFacturas,
    type: 'GET',
    datatype: 'JSON',
    success: function(reponse){
        var MiItems = reponse;
        var Valores = '';

        for(i=0;i< MiItems.length;i++){
         Valores += '<tr>'+
         '<td>'+MiItems[i].ID+'</td>'+
         '<td>'+MiItems[i].NUMERO_FACTURA+'</td>'+
         '<td>'+MiItems[i].ID_SOCIO+'</td>'+
         '<td>'+MiItems[i].FECHA_FACTURA+'</td>'+
         '<td>'+MiItems[i].DETALLE+'</td>'+
         '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
         '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
         '<td>'+MiItems[i].TOTAL+'</td>'+
         '<td>'+MiItems[i].FECHA_VENCIMIENTO+'</td>'+
         '<td>'+MiItems[i].ESTADO+'</td>'+
         '<td>'+
         '<button class="btn btn-info" onclick="CargarFactura('+MiItems[i].ID+')">Editar</button>'+ 
         '<button class="btn btn-warning" onclick="EliminarFactura('+MiItems[i].ID+')">Eliminar</button>'
         '</td>'+
         

     '</tr>';
        $('.Facturascliente').html(Valores);

        }

    }

})

}

function AgregarFactura(){
    var datofactura={
        NUMERO_FACTURA:$('#NUMERO_FACTURA').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_FACTURA:$('#FECHA_FACTURA').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_VENCIMIENTO:$('#FECHA_VENCIMIENTO').val(),
        ESTADO:$('#ESTADO').val()

    };
    var datofacturajson = JSON.stringify(datofactura);
    $.ajax({
        url: UrlPostFactura,
        type: 'POST',
        data: datofacturajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al crear factura');

        }

    });
    alert('Factura Agregada');

}


function CargarFactura(idfactura){
var datofactura = {
ID: idfactura
};
var datofacturajson = JSON.stringify(datofactura);
$.ajax({
    url:UrlFactura,
    type: 'POST',
    data: datofacturajson,
    datatype: 'JSON',
    contenttype:'application/json',
    success: function(response){
        var MiItems = response;
        $('#NUMERO_FACTURA').val(MiItems[0].NUMERO_FACTURA);
        $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
        $('#FECHA_FACTURA').val(MiItems[0].FECHA_FACTURA);
        $('#DETALLE').val(MiItems[0].DETALLE);
        $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
        $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
        $('#TOTAL').val(MiItems[0].TOTAL);
        $('#FECHA_VENCIMIENTO').val(MiItems[0].FECHA_VENCIMIENTO);
        $('#ESTADO').val(MiItems[0].ESTADO);
        var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarFactura('+ MiItems[0].ID +')"'+
        'value="Actualizar Factura" class="btn btn-primary"></input>';
        $('.btnfactura').html(btnactualizar);

    }

});

}



function ActualizarFactura(idcliente){
    var datofactura = {
    ID: idcliente,
    NUMERO_FACTURA:$('#NUMERO_FACTURA').val(),
    ID_SOCIO:$('#ID_SOCIO').val(),
    FECHA_FACTURA:$('#FECHA_FACTURA').val(),
    DETALLE:$('#DETALLE').val(),
    SUB_TOTAL:$('#SUB_TOTAL').val(),
    TOTAL_ISV:$('#TOTAL_ISV').val(),
    TOTAL:$('#TOTAL').val(),
    FECHA_VENCIMIENTO:$('#FECHA_VENCIMIENTO').val(),
    ESTADO:$('#ESTADO').val()
    };

    var datofacturajson = JSON.stringify(datofactura);
    $.ajax({
        url: UrlPutFactura,
        type: 'PUT',
        data: datofacturajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al crear factura');

        }

    });
    alert('Factura Actualizada');



}


function EliminarFactura(idcliente){
    var datofactura = {
    ID: idcliente
    };
    var datofacturajson = JSON.stringify(datofactura);
    $.ajax({
        url: UrlDeleteFactura,
        type: 'DELETE',
        data: datofacturajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        }

        

    });
    alert('Factura Eliminada');




}

