    

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

    $("#btnBuscar").click(function(){

        //Busquedas del modal
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

         $(".button_buscar_cs_despachador").on( 'click',function(){
            var list_inputs = [];           
            $.each($('.inputs_search_despachador'), function () {
                list_inputs.push($(this).val());
            });
            list_inputs.push($(this).data("idx"));
            TCS2.search(list_inputs.join('|'), true, false, true).draw();
        });

        $("#btnBuscar2")[0].click();

        $('#exampleModal').modal({
            show: 'true'
        });
    });

    $(".button_buscar_cs_despachador").on( 'click',function(){

        var list_inputs = [];           
        $.each($('.inputs_search_despachador'), function () {
            list_inputs.push($(this).val());
        });

        list_inputs.push($(this).data("idx"));

        TCS2.search(list_inputs.join('|'), true, false, true).draw();
    });

    //Parte del tipo de cierre
    if( $("#tipocierre").val() != "None"){
        if( $("#tipocierre").val() == ""){
            $("#cierre").val("Terminado");
        }else{
            $("#cierre").val($("#tipocierre").val());
        }
        
    }else{
        $("#cierre").val("Terminado");
    }

    function obtenerInformacion(tipo,id,row){

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
        opciones = "<a class='btn btn-info btn-circle btn-lg m-r-5' data-toggle='tooltip' style='background-color: #23629F; padding-top: 14px; border-color: #23629F' title='Editar Serie' onclick='editarSerie("+ id+ ",this)';> <i class='ti-pencil-alt'></i></a>" +
        "<a class='btn btn-info btn-circle btn-lg m-r-5' data-toggle='tooltip' style='background-color: #23629F; padding-top: 14px; border-color: #23629F' title='Ver Pieza Anterior' onclick='verPiezaAnterior("+ id+ ",this)';> <i class='ti-exchange-vertical'></i></a>" +
        "<a class='btn btn-info btn-circle btn-lg m-r-5' data-toggle='tooltip' style='background-color: #bf3026; padding-top: 14px; border-color: #bf3026' title='Borrar' onclick='eliminarPieza(" +id + ",this)';> <i class='ti-trash'></i></a>"
        
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

        //Verificamos que el SKU no este agregado a la tabla de piezas ya existentes
        $('#piezasCodigoExistente tr td:first-child').each(function() {
            if($(this).html() == sku){
                yaExiste = true
            }
        });

        if (!yaExiste){
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
        
        }else if(!agregadoTabla){
            $('#modalExistente').modal({
                show: 'true'
            });

            $('#modalExistente button.no').off().on('click', function() {
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

            $('#modalExistente button.ok').off().on('click', function() {
                eleccion(sku)
            });
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

    function getPiezas(){
        $.ajax({
            type : "GET",
            url : '/portal/getPiezas',
            data: {
                "test": $("#equipo__id").val(),
                
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
                    opciones = "<a class='btn btn-info btn-circle btn-lg m-r-5' data-toggle='tooltip' style='background-color: #23629F; padding-top: 14px; border-color: #23629F' title='Editar Serie' onclick='editarSerie("+ item.id+ ",this)';> <i class='ti-pencil-alt'></i></a>" +
                    "<a class='btn btn-info btn-circle btn-lg m-r-5' data-toggle='tooltip' style='background-color: #23629F; padding-top: 14px; border-color: #23629F' title='Ver Monitoreos' onclick='verMonitoreos("+ item.id+ ",this)';> <i class='ti-eye'></i></a>" +
                    "<a class='btn btn-info btn-circle btn-lg m-r-5' data-toggle='tooltip' style='background-color: #bf3026; padding-top: 14px; border-color: #bf3026' title='Borrar' onclick='eliminarPieza(" +item.id + ",this)';> <i class='ti-trash'></i></a>"
                    
                    idt = item.id
                    sku = item.sku
                    nombre = item.nombre
                    unidad = item.unidad
                    modelo = item.modelo
                    tipo = item.tipo
                    serie = item.serie
                    tipocomponente = item.tipoinventario

                    if(item.serie == null){
                        serie = ""
                    }

                    $("#example1").append('<tr><td>'+sku+'</td><td>'+nombre+'</td><td>'+unidad+'</td><td>'+modelo+'</td><td>'+tipo+'</td><td id="serie">'+serie+'</td><td>'+tipocomponente+'</td><td>'+opciones+'</td></tr>')

                    piezas_existentes.push(pieza)
                    $("#piezas_existentes").val(JSON.stringify(piezas_existentes))
                });
            },
            failure: function(data){}
        });
    }

    function verMonitoreos(id){
        $('#piezasCodigoExistente tr:not(:first)').remove();
        $.ajax({
            type : "GET",
            url : '/portal/getMonitoreos',
            data: {
                "id": id,
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
                    //$("#piezas_existentes").val(JSON.stringify(piezas_existentes))
                });
            },
            failure: function(data){}
        });

        $('#modalPiezas').modal({
            show: 'true'
        });
    }

    function eleccion(sku){
        for(var i = 0; i < piezas_existentes.length; i++){
            if(piezas_existentes[i].sku == sku){

                idt = piezas_existentes[i].id
                sku = piezas_existentes[i].sku
                nombre = piezas_existentes[i].nombre
                unidad = piezas_existentes[i].unidad
                modelo = piezas_existentes[i].modelo
                tipo = piezas_existentes[i].tipo
                serie = piezas_existentes[i].serie
                tipocomponente = piezas_existentes[i].tipoinventario
                opciones = '<button type="button"onclick=intercambiar('+"idt,sku,tipocomponente"+')  class="btn btn-primary btn-blue">Seleccionar</button>'

                $("#piezasCodigo").append('<tr><td>'+sku+'</td><td>'+nombre+'</td><td>'+unidad+'</td><td>'+modelo+'</td><td>'+tipo+'</td><td id="serie">'+serie+'</td><td>'+tipocomponente+'</td><td>'+opciones+'</td></tr>')

            }
        }
        $('#modalEleccion').modal({
                show: 'true'
        });
    }

    function intercambiar(id,sku,tipocomponente){
        $('#modalEleccion').modal('hide');
        //AGREGAMOS AL ARRAY QUE SE VA A ENVIAR A BACK
        pieza = {}
        pieza['id'] = id_elegido
        pieza['sku'] = sku
        pieza['tipo'] = tipocomponente
        //GUARDAMOS LA PIEZA QUE SE VA A ELIMINAR
        pieza['anterior'] = id

        piezas_enviadas.push(pieza)
        $("#piezas_enviadas").val(JSON.stringify(piezas_enviadas))

        $("#example1").append('<tr><td>'+sku_elegido+'</td><td>'+nombre_elegido+'</td><td>'+unidad_elegido+'</td><td>'+modelo_elegido+'</td><td>'+tipo_elegido+'</td><td id="serie">'+serie_elegido+'</td><td>'+tipocomponente_elegido+'</td><td>'+opciones_elegido+'</td></tr>')
    }

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

    function verPiezaAnterior(id,row){
        $("#folio_monitoreo").val("")
        $("#sku_monitoreo").val("")
        $("#nombre_monitoreo").val("")
        $("#serie_monitoreo").val("")
        $("#tipo_monitoreo").val("")
        $("#unidad_monitoreo").val("")
        $("#familia_monitoreo").val("")
        for(var i = 0; i < piezas_enviadas.length; i++){
            if(piezas_enviadas[i].id == id){
                for(var j = 0; j < piezas_existentes.length; j++){
                    if(piezas_existentes[j].id == piezas_enviadas[i].anterior){
                        $("#folio_monitoreo").val(piezas_existentes[i].id)
                        $("#sku_monitoreo").val(piezas_existentes[i].sku)
                        $("#nombre_monitoreo").val(piezas_existentes[i].nombre)
                        $("#serie_monitoreo").val(piezas_existentes[i].serie)
                        $("#tipo_monitoreo").val(piezas_existentes[i].tipo)
                        $("#unidad_monitoreo").val(piezas_existentes[i].unidad)
                        $("#familia_monitoreo").val("")
                    }
                }
            }
        }

        $('#modalPiezaAnterior').modal({
            show: 'true'
        });
    }

    function eliminarPieza(idt,row){

        $('#modalSeguro').modal({
            show: 'true'
        });

        $('#modalSeguro button.ok').off().on('click', function() {
            //Eliminamos del array piezas_enviadas
            encontrado = false
            for(var i = 0; i < piezas_enviadas.length; i++){
                if(piezas_enviadas[i].id == idt){
                    piezas_enviadas.splice(i,1)
                    encontrado = true
                    break
                }
            }
            if (encontrado == false){
                for(var i = 0; i < piezas_existentes.length; i++){
                    if(piezas_existentes[i].id == idt){
                        piezas_existentes.splice(i,1)
                        break
                    }
                }
            }
            console.log(encontrado)
            $("#piezas_existentes").val(JSON.stringify(piezas_existentes))
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

    function mostrarPiezas(){
        $('#modalPiezas').modal({
            show: 'true'
        });
    }
    






















    /////////////////
    /////////////////
    //EDITAR CONTRATO
    /////////////////
    /////////////////

    $(document).keypress(
        function(event){
          if (event.which == '13') {
            event.preventDefault();
          }
    });



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
                },
                failure: function(data){}
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
        getPiezas()

        if($("#contrato").val() != ""){

            $("#contrato_elegido").val($("#contrato__id").val() + "-"+$("#contrato__cliente").val())
            $("#contrato_elegido_cliente").val($("#contrato__cliente").val())
            $("#contrato_elegido_frecuencia").val($("#contrato__frecuencia").val())
            $("#contrato_elegido_fechainicio").val($("#contrato__fechainicio").val())
            $("#contrato_elegido_fechatermino").val($("#contrato__fechatermino").val())
            $("#contrato_elegido_id").val($("#contrato__id").val())
            $("#id_contrato").val($("#contrato__id").val())

        }
        
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
                "url": '/portal/contrato/search_contrato/serverside',
                "type": "GET",
                "data": {
                    'csrfmiddlewaretoken':"{{ csrf_token }}",
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
            //format: 'yyyy-mm-dd',
            autoclose: true
        });

        $('#datetimepicker6').datetimepicker({
            minView: 2,
            startView: 2,
            format: 'dd-mm-yyyy',
            //format: 'yyyy-mm-dd',
            autoclose: true
        });

        $('#datetimepicker7').datetimepicker({
            minView: 2,
            startView: 2,
            format: 'dd-mm-yyyy',
            //format: 'yyyy-mm-dd',
            autoclose: true
        });

        $('#datetimepicker8').datetimepicker({
            minView: 2,
            startView: 2,
            format: 'dd-mm-yyyy',
            //format: 'yyyy-mm-dd',
            autoclose: true
        });

        $('#datetimepicker9').datetimepicker({
            minView: 2,
            startView: 2,
            format: 'dd-mm-yyyy',
            //format: 'yyyy-mm-dd',
            autoclose: true
        });

        $('#datetimepicker10').datetimepicker({
            minView: 2,
            startView: 2,
            format: 'dd-mm-yyyy',
            //format: 'yyyy-mm-dd',
            autoclose: true
        });

        $('#form_usuarios').validate();
    $("#tele").inputmask({
        mask: "(9{1,3}) 9{1,3}-9{1,4}",
        removeMaskOnSubmit: true
    });

    getZonaOperativa();

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
        //almacenZona();

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
                $("#id_zona").append("<option selected value=\""+item.id+"\">"+item.nombre+"</option>");

            });
            if( $("#zona").val() != ""){
                if ($("#id_proveedor").val() == $("#proveedor__id").val()){
                    $("#id_zona").val($("#zona").val()).change()
                }
            }
            $("#id_zona").trigger('change');

        },
        failure: function(data){}
    });
    }

    function almacenZona() {
        if ($("#id_zona").val() != null){
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
                failure: function(data){}
            })
                
        }
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
            $(data.data).each(function(i,item){
                $("#id_ciudad").append("<option  value=\""+item.id+"\">"+item.nombre+"</option>");
                $("#id_ciudad").trigger('change');
            });
        },
        failure: function(data){}
    });
    }

        $(function () {
          
          $("#cmdCancel").click(function(){
              document.location = "/portal/codigo";
          });
         
        });

        $("#mostrar").click(function(){
            $(".esconder").slideToggle("slow",function(){

            });
        });
