$(document).keypress(
     function(event){
       if (event.which == '13') {
         event.preventDefault();
       }
 });

    //////////////////////////////////
    //////////////////////////////////
    //////////////////////////////////
    //PARTE DE EQUIPO
    //////////////////////////////////
    //////////////////////////////////
    //////////////////////////////////

    piezas_existentes = []
    piezas_enviadas = []

    id_elegido = ""
    sku_elegido = ""
    nombre_elegido = ""
    unidad_elegido = ""
    modelo_elegido = ""
    tipo_elegido = ""
    serie_elegido = ""
    tipocomponente_elegido = ""
    opciones_elegido = ""

    TCS2 = ""

    function busquedaPrincipal(tipo){
        if(tipo == 1){
            $("#sku_busqueda2").val($("#sku_busqueda").val())
            $("#serie_busqueda2").val($("#serie_busqueda").val())

            $("#example2").show()

             $("#example2").DataTable().destroy();
             TCS2 = $('#example2').DataTable({
                 pageLength: 5,
                 responsive: true,
                 serverSide: true,
                 processing : true,
                 dom: 'lrtipB',
                 lengthMenu: [ [ 10, 25, 50, -1 ], [ '10 rows', '25 rows', '50 rows', 'Show all' ] ],
                 buttons: [{
                     extend : 'excel',
                     "text": '<button type="button" class="btn btn-primary btn-blue">Exportar Excel</button>',
                     title: "Componentes",
                     exportOptions : {
                         modifier : {
                             order : 'index', 
                             page : 'all'                                  
                         }
                     }
                     }],
                 retrieve: true,
                 retrieve: true,
                 "ajax": {
                     "url": "/portal/componente_search_despachador/serverside",
                     "type": "GET",
                     "data": {
                         'test': $("#almacen_zona").val(),
                     },                                
                 },
                 "columns":[
                     { "data" : "sku"},
                     { "data" : "nombre"},
                     { "data" : "unidad"},
                     { "data" : "modelo"},
                     { "data" : "tipo"},
                     { "data" : "serie"},
                     { "data" : "tipoinventario"},
                     { "data" : "opciones"},
                 ],
                 "columnDefs": [ ],
                 "order": []
             });

        }else{
            $("#sku_busqueda2").val($("#sku_busqueda").val())
            $("#serie_busqueda2").val($("#serie_busqueda").val())

            $("#example2").show()

             $("#example2").DataTable().destroy();
             TCS2 = $('#example2').DataTable({
                 pageLength: 5,
                 responsive: true,
                 serverSide: true,
                 processing : true,
                 dom: 'lrtipB',
                 lengthMenu: [ [ 10, 25, 50, -1 ], [ '10 rows', '25 rows', '50 rows', 'Show all' ] ],
                 buttons: [{
                     extend : 'excel',
                     "text": '<button type="button" class="btn btn-primary btn-blue">Exportar Excel</button>',
                     title: "Componentes",
                     exportOptions : {
                         modifier : {
                             order : 'index', 
                             page : 'all'                                  
                         }
                     }
                     }],
                 retrieve: true,
                 retrieve: true,
                 "ajax": {
                     "url": "/portal/componente_search_despachador_Componente/serverside",
                     "type": "GET",
                     "data": {
                         'test': $("#almacen_zona").val(),
                     },                                
                 },
                 "columns":[
                     { "data" : "sku"},
                     { "data" : "nombre"},
                     { "data" : "unidad"},
                     { "data" : "modelo"},
                     { "data" : "tipo"},
                     { "data" : "serie"},
                     { "data" : "tipoinventario"},
                     { "data" : "opciones"},
                 ],
                 "columnDefs": [ ],
                 "order": []
             });
        }
        $(".button_buscar_cs_despachador").on( 'click',function(){
            var list_inputs = [];           
            $.each($('.inputs_search_despachador'), function () {
                list_inputs.push($(this).val());
            });
            list_inputs.push($(this).data("idx"));
            TCS2.search(list_inputs.join('|'), true, false, true).draw();
        });

        $('#exampleModal').modal({
            show: 'true'
        });
    }
    //});

    $("#btnBuscar").click(function(){
        valor = $("#id_statuscomercial option:selected").text()

        if (valor == "SUBARRENDADO EQUIPO EXTERNO"){
            busquedaPrincipal(2)
        }else{
            busquedaPrincipal(1)
        }
    });

    $(".button_buscar_cs_despachador").on( 'click',function(){

        var list_inputs = [];           
        $.each($('.inputs_search_despachador'), function () {
            list_inputs.push($(this).val());
        });

        list_inputs.push($(this).data("idx"));

        TCS2.search(list_inputs.join('|'), true, false, true).draw();
    });

    function obtenerInformacion(tipo,id,row){

        if(tipo == 1){
            opciones = "<a class='btn btn-info btn-circle btn-lg m-r-5' data-toggle='tooltip' style='background-color: #23629F; padding-top: 14px; border-color: #23629F' title='Editar Serie' onclick='editarSerie("+ id+ ",this)';> <i class='ti-pencil-alt'></i></a>" +
            "<a class='btn btn-info btn-circle btn-lg m-r-5' data-toggle='tooltip' style='background-color: #23629F; padding-top: 14px; border-color: #23629F' title='Ver Monitoreos' onclick='verMonitoreos(1,"+ id+ ",this)';> <i class='ti-eye'></i></a>" +
            "<a class='btn btn-info btn-circle btn-lg m-r-5' data-toggle='tooltip' style='background-color: #bf3026; padding-top: 14px; border-color: #bf3026' title='Borrar' onclick='eliminarPieza(" +id + ",this)';> <i class='ti-trash'></i></a>"
        }else{
            opciones = "<a class='btn btn-info btn-circle btn-lg m-r-5' data-toggle='tooltip' style='background-color: #23629F; padding-top: 14px; border-color: #23629F' title='Ver Monitoreos' onclick='verMonitoreos(2,"+ id+ ",this)';> <i class='ti-eye'></i></a>" +
            "<a class='btn btn-info btn-circle btn-lg m-r-5' data-toggle='tooltip' style='background-color: #bf3026; padding-top: 14px; border-color: #bf3026' title='Borrar' onclick='eliminarPieza(" +id + ",this)';> <i class='ti-trash'></i></a>"
        }

        yaExiste = false
        agregadoTabla = false

        $('#exampleModal').modal('hide');

        $(row).parent().css('background-color', "#D6D5C3");

        //AGREGAR A LA TABLA
        sku = $(row).parent().parent().children('td').slice(0, 1).text()
        nombre = $(row).parent().parent().children('td').slice(1, 2).text()
        unidad = $(row).parent().parent().children('td').slice(2, 3).text()
        modelo = $(row).parent().parent().children('td').slice(3, 4).text()
        tipo = $(row).parent().parent().children('td').slice(4, 5).text()
        serie = $(row).parent().parent().children('td').slice(5, 6).text()
        tipocomponente = $(row).parent().parent().children('td').slice(6, 7).text()
        
        id_elegido = id
        sku_elegido = sku
        nombre_elegido = nombre
        unidad_elegido = unidad
        modelo_elegido = modelo
        tipo_elegido = tipo
        serie_elegido = serie
        tipocomponente_elegido = tipocomponente
        opciones_elegido = opciones

        //Verificamos que el SKU no este agregado a la tabla
        $('#example1 tr td:first-child').each(function() {
            if($(this).html() == sku){
                //yaExiste = true
                if(tipocomponente == "DESPACHADOR" || tipocomponente == "SISTEMA DE FILTRACION" || tipocomponente == "TANQUES"){
                    agregadoTabla = true
                }
            }
        });

        if (!yaExiste || agregadoTabla == false){
            //AGREGAMOS AL ARRAY QUE SE VA A ENVIAR A BACK
            pieza = {}
            pieza['id'] = id
            pieza['sku'] = sku
            pieza['tipo'] = tipocomponente
            //GUARDAMOS LA PIEZA QUE SE VA A ELIMINAR
            pieza['anterior'] = ""
            piezas_enviadas.push(pieza)
            
            $("#piezas_enviadas").val(JSON.stringify(piezas_enviadas))

            $("#example1").append('<tr><td>'+sku+'</td><td>'+nombre+'</td><td>'+unidad+'</td><td>'+modelo+'</td><td>'+tipo+'</td><td id="serie">'+serie+'</td><td>'+tipocomponente+'</td><td>'+opciones+'</td></tr>')
        
        }else{
            $('#modalExistenteTabla').modal({
                show: 'true'
            });

            $('#modalExistenteTabla button.ok').off().on('click', function() {

                //AGREGAMOS AL ARRAY QUE SE VA A ENVIAR A BACK
                pieza = {}
                pieza['id'] = id
                pieza['sku'] = sku
                pieza['tipo'] = tipocomponente
                //GUARDAMOS LA PIEZA QUE SE VA A ELIMINAR
                pieza['anterior'] = ""
                piezas_enviadas.push(pieza)
                
                $("#piezas_enviadas").val(JSON.stringify(piezas_enviadas))

                $("#example1").append('<tr><td>'+sku+'</td><td>'+nombre+'</td><td>'+unidad+'</td><td>'+modelo+'</td><td>'+tipo+'</td><td id="serie">'+serie+'</td><td>'+tipocomponente+'</td><td>'+opciones+'</td></tr>')
            });
        }
    }

    function verMonitoreos(tipo,id){
        $('#piezasCodigoExistente tr:not(:first)').remove();
        $.ajax({
            type : "GET",
            url : '/portal/getMonitoreos',
            data: {
                "id": id,
                "tipo":tipo,
                },
            success: function(data){
                $(data.data).each(function(i,item){

                    pieza = {}

                    pieza['id'] = item.id
                    pieza['sku'] = item.sku
                    pieza['nombre'] = item.nombre
                    pieza['unidad'] = item.unidad
                    pieza['modelo'] = item.modelo
                    pieza['tipo'] = item.tipo
                    pieza['serie'] = item.serie
                    pieza['tipoinventario'] = item.tipoinventario
                    pieza['fecha'] = item.fecha

                    $("#piezasCodigoExistente").append('<tr><td>'+item.sku+'</td><td>'+item.nombre+'</td><td>'+item.tipoinventario+'</td><td>'+item.unidad+'</td><td>'+item.modelo+'</td><td>'+item.tipo+'</td></tr>')

                    piezas_existentes.push(pieza)
                });
            },
            failure: function(data){}
        });

        $('#modalPiezas').modal({
            show: 'true'
        });

    }

    $("#id_statuscomercial").change(function() {
        $("#example1").find("tr:gt(0)").remove();
        piezas_enviadas = []
    });

    function editarSerie(id,row){
        $('#modalSerie').modal({
            show: 'true'
        });

        sku = $(row).parent().parent().children('td').slice(0, 1).text()
        $("#nserie_modal").val("")
        $('#modalSerie button.ok').off().on('click', function() {
            serie = $("#nserie_modal").val()
            $.ajax({
                type : "GET",
                url : '/portal/setSerie',
                data: {
                    "id": id,
                    "serie": serie,
                    },
                success: function(data){
                    $('#example1 tr:not(:first)').each(function() {
                        if($(this).find("td:first-child").html() == sku){
                            $(this).find("td:nth-child(6)").html(serie)
                        }
                    });
                },
                failure: function(data){}
            });
        });

    }

    function eliminarPieza(idt,row){
        $('#modalSeguro').modal({
            show: 'true'
        });

        $('#modalSeguro button.ok').off().on('click', function() {
            //Eliminamos del array piezas_enviadas
            for(var i = 0; i < piezas_enviadas.length; i++){
                if(piezas_enviadas[i].id == idt){
                    piezas_enviadas.splice(i,1)
                    break
                }
            }
            $("#piezas_enviadas").val(JSON.stringify(piezas_enviadas))

            sku = $(row).parent().parent().children('td').slice(0, 1).text()

            $('#example1 tr:not(:first)').each(function() {
                if($(this).find("td:first-child").html() == sku){
                    $(this).remove()
                    return false;
                }
            });
        });
        
    }



















//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//PARTE DE CONTRATO
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////

 function editarContrato(id){
     $('#modalSerie').modal({
         show: 'true'
     });

     $('#modalSerie button.ok').off().on('click', function() {
         mtto = $("#mtto_modal").val()
         fecha_inicio = $("#fecha_inicio").val()
         fecha_termino = $("#fecha_termino").val()
         $.ajax({
             type : "GET",
             url : '/portal/setContrato',
             data: {
                 "id": id,
                 "mtto": mtto,
                 "fecha_inicio":fecha_inicio,
                 "fecha_termino":fecha_termino
                 },
             success: function(data){
                 $("#btnBuscar3")[0].click()
                 //$(data.data).each(function(i,item){
                     //modalInventario(item.id)
                     
                 //});
                 //getColonias();
             },
             failure: function(data){

                 //console.log("failure");
                 // alert("Falló la llamada de Ajax");
             }
         });
     });
 }

 

 function seleccionarContrato(id,row){
    
    folio = $(row).parent().parent().children('td').slice(0, 1).text()
    cliente = $(row).parent().parent().children('td').slice(1, 2).text()
    mantenimiento = $(row).parent().parent().children('td').slice(5, 6).text()
    fechainicio = $(row).parent().parent().children('td').slice(3, 4).text()
    fechatermino = $(row).parent().parent().children('td').slice(4, 5).text()
    var id_seleccionado = id

    $("#contrato_elegido").val(folio + " - "+cliente)
    $("#id_contrato").val(folio)
    $("#contrato_elegido_cliente").val(cliente)
    $("#contrato_elegido_id").val(folio)
    $("#contrato_elegido_frecuencia").val(mantenimiento)
    $("#contrato_elegido_fechainicio").val(fechainicio)
    $("#contrato_elegido_fechatermino").val(fechatermino)

    $("#id_").val(folio)

    $("#btnBuscar3")[0].click()

    $("#id_").val("")
    

 }

 

 $(document).ready(function(){ 


   
     var TCS6 = $('#exampleContrato').DataTable({
         responsive: true,
         serverSide: true,
         //oLanguage: {
         //    sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
         //},
         processing : true,
         dom: 'lrtipB',
         lengthMenu: [ [ 10, 25, 50, -1 ], [ '10 rows', '25 rows', '50 rows', 'Show all' ] ],
         
         retrieve: true,
         retrieve: true,
         "ajax": {
             //"url": "{% url 'portal:DTContrato_Search_Codigo' %}",
             "url": '/portal/contrato/search_contrato/serverside',
             "type": "GET",
             "data": {
                 //'csrfmiddlewaretoken':"{{ csrf_token }}",
                 'test': $('#busqueda_codigo').val(),
             },                                
         },
         "columns":[
             { "data" : "id"},
             { "data" : "cliente"},
             { "data" : "tipo"},
             { "data" : "fechainicio"},
             { "data" : "fechatermino"},
             { "data" : "frecuencia"},
             { "data" : "boton"},
         ],
         "columnDefs": [ ],
         "order": []
     });

     $(".button_buscar_cs").on( 'click',function(){  

     
         var list_inputs = [];           
         $.each($('.inputs_search'), function () {
             list_inputs.push($(this).val());
         });
         
         list_inputs.push($(this).data("idx"));


         TCS6.search(list_inputs.join('|'), true, false, true).draw();
     }); 

     $("#btnBuscar3")[0].click()

     $("#btnReiniciarContrato").on( 'click',function(){  

         $("#contrato_elegido").val("")
         $("#contrato_elegido_cliente").val("")
         $("#contrato_elegido_frecuencia").val("")
         $("#contrato_elegido_fechainicio").val("")
         $("#contrato_elegido_fechatermino").val("")
         $("#contrato_elegido_id").val("")
         $("#id_contrato").val("")

         $("#nombre").val("")
         $("#razon").val("")
         $("#foliosistema").val("")

     });

     $('#datetimepicker5').datetimepicker({
         minView: 2,
         startView: 2,
         format: 'dd-mm-yyyy',
         autoclose: true
     });

     $('#datetimepicker6').datetimepicker({
         minView: 2,
         startView: 2,
         format: 'dd-mm-yyyy',
         autoclose: true
     });

     $('#datetimepicker7').datetimepicker({
         minView: 2,
         startView: 2,
         format: 'dd-mm-yyyy',
         autoclose: true
     });

     $('#datetimepicker8').datetimepicker({
         minView: 2,
         startView: 2,
         format: 'dd-mm-yyyy',
         autoclose: true
     });

     $('#datetimepicker9').datetimepicker({
         minView: 2,
         startView: 2,
         format: 'dd-mm-yyyy',
         autoclose: true
     });

     $('#datetimepicker10').datetimepicker({
         minView: 2,
         startView: 2,
         format: 'dd-mm-yyyy',
         autoclose: true
     });

     $('#form_usuarios').validate();
 $("#tele").inputmask({
     mask: "(9{1,3}) 9{1,3}-9{1,4}",
     removeMaskOnSubmit: true
 });

 getCiudades();

 $("#id_proveedor").val(41).change()

 
 });

 $("#id_estado").change(function() {
     getCiudades();
 });

 $("#id_proveedor").change(function() {
    getZonaOperativa();
 });


 $('.solonumero').keypress(function(event) {

if(event.which == 8 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46) 
 return true;

else if((event.which != 46) && (event.which < 48 || event.which > 57))
 event.preventDefault();

});

 $("#id_zona").change(function(){
     var ejemplo = almacenZona();

 });

 function getZonaOperativa() {
     $("#id_zona").empty();
     $("#id_zona:selected").removeAttr("selected");

 $.ajax({
     type : "GET",
     url : '/portal/getZonas',
     data: {
         "id_obj": $("#id_proveedor").val(),
         },
     success: function(data){
         //console.log("sucess");
         $(data.data).each(function(i,item){
             //console.log(item.id)
             if (item.nombre == "PWT MTY"){
                $("#id_zona").append("<option selected value=\""+item.id+"\">"+item.nombre+"</option>");
                $("#id_zona").trigger('change');
             }else{
                $("#id_zona").append("<option value=\""+item.id+"\">"+item.nombre+"</option>");
                $("#id_zona").trigger('change');
             }
         });
     },
     failure: function(data){
         //console.log("failure");
         // alert("Falló la llamada de Ajax");
     }
 });
 }

 function almacenZona() {
 $.ajax({
     type : "GET",
     url : '/portal/getAlmacenPorZona',
     data: {
         "id_obj": $("#id_zona").val(),
         },
     success: function(data){
        $("#almacen_zona").val(data.data[0].id)
        $("#almacen_muestra").val(data.data[0].adminpaq)

         

     },
     
     failure: function(data){

     }

 })

 }

 function getCiudades() {
     $('#id_ciudad').val(null).trigger('change');
     $('#id_ciudad').empty();
     $("#id_ciudad").trigger('change');
 $.ajax({
     type : "GET",
     url : '/portal/getNewCiudades',
     data: {
         "id_obj": $("#id_estado").val(),
         },
     success: function(data){
         //console.log("sucess");
         $(data.data).each(function(i,item){
             //console.log(item.id)
             $("#id_ciudad").append("<option  value=\""+item.id+"\">"+item.nombre+"</option>");
             $("#id_ciudad").trigger('change');
         });
     },
     failure: function(data){
         //console.log("failure");
         // alert("Falló la llamada de Ajax");
     }
 });
 }

     $(function () {
       
       $("#cmdCancel").click(function(){
           document.location = "/portal/codigo";
       });
      
     });
 