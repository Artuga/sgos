    var tablaMonitoreos = $('#piezasCodigoExistenteMonitoreos').DataTable( {
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    } );
    piezas_existentes = []
    piezas_existentes_monitoreo = []
    piezas_enviadas = []
    piezas_enviadas_monitoreo = []

    id_elegido = ""
    sku_elegido = ""
    nombre_elegido = ""
    unidad_elegido = ""
    modelo_elegido = ""
    tipo_elegido = ""
    serie_elegido = ""
    tipocomponente_elegido = ""
    opciones_elegido = ""

    monitoreo = false
    monitoreoComponente = false

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
                 "url": "/portal/componente_search_despachador_subir/serverside",
                 "type": "GET",
                 "data": {
                     'test': $("#id_almacen").val(),
                     "equipo": $("#equipo__id").val(),
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
            $("#cierre").val("Terminado").change()
        }else{
            $("#cierre").val($("#tipocierre").val()).change()
        }
        
    }else{
        $("#cierre").val("Terminado");
    }

    //Partes nueva
    if ($("#partescierre").val() != "None"){
        $("#lofo").change()
        if( $("#partescierre").val() == "" ){
            $("#lofo").val("Local").change()
        }else{
            $("#lofo").val($("#partescierre").val()).change()
        }

    }
    function obtenerInformacion(tipo,id,row){
        yaExiste = false
        yaExisteMonitoreo = false
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
        opciones_monitoreo = "<a class='btn btn-info btn-circle btn-lg m-r-5' data-toggle='tooltip' style='background-color: #bf3026; padding-top: 14px; border-color: #bf3026' title='Borrar' onclick='eliminarPieza(" +id + ",this)';> <i class='ti-trash'></i></a>"
         
        id_elegido = id
        sku_elegido = sku
        nombre_elegido = nombre
        unidad_elegido = unidad
        modelo_elegido = modelo
        tipo_elegido = tipo
        serie_elegido = serie
        tipocomponente_elegido = tipocomponente
        opciones_elegido = opciones
        opciones_elegido_monitoreo = opciones_monitoreo

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

        //Verificamos que el SKU no este agregado a la tabla de monitoreos ya existentes
        //Verificamos que el SKU no este agregado a la tabla de piezas ya existentes
        $('#piezasCodigoExistenteMonitoreos tr td:first-child').each(function() {
            if($(this).html() == sku){
                yaExisteMonitoreo = true
            }
        });

        if (!yaExiste && !yaExisteMonitoreo){
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
        
        }else if(yaExiste){
            $('#modalExistente').modal({
                show: 'true'
            });

            $('#modalExistente button.no').off().on('click', function() {
                //AGREGAMOS AL ARRAY QUE SE VA A ENVIAR A BACK
                pieza = {}
                pieza['id'] = id
                pieza['sku'] = sku
                pieza['tipo'] = tipocomponente
                pieza['monitoreo'] = false
                //GUARDAMOS LA PIEZA QUE SE VA A ELIMINAR
                pieza['anterior'] = ""
                piezas_enviadas.push(pieza)
                
                $("#piezas_enviadas").val(JSON.stringify(piezas_enviadas))

                $("#example1").append('<tr><td>'+sku+'</td><td>'+nombre+'</td><td>'+unidad+'</td><td>'+modelo+'</td><td>'+tipo+'</td><td id="serie">'+serie+'</td><td>'+tipocomponente+'</td><td>'+opciones+'</td></tr>')
            });

            $('#modalExistente button.ok').off().on('click', function() {
                eleccion(sku)
            });
        }else if(yaExisteMonitoreo){
            cantidadActual = 0
            cantidad = getCantidadMonitoreos(sku)

            $('#example1 tr td:first-child').each(function() {
                if($(this).html() == sku){
                    cantidadActual = cantidadActual + 1
                }
            });
            if(cantidad == 1){

                if(cantidadActual+1 > cantidad){
                    $('#modalMaximo').modal({
                        show: 'true'
                    });
                }else{
                    eleccionMonitoreo(sku,true)
                }

            }else if(cantidadActual+1 <= cantidad){
                eleccionMonitoreo(sku,false)
                
            }else{
                $('#modalMaximo').modal({
                    show: 'true'
                });
            }
            
        }else if(agregadoTabla){   
            $('#modalExistenteTabla').modal({
                show: 'true'
            });

            $('#modalExistenteTabla button.ok').off().on('click', function() {

                //AGREGAMOS AL ARRAY QUE SE VA A ENVIAR A BACK
                pieza = {}
                pieza['id'] = id
                pieza['sku'] = sku
                pieza['tipo'] = tipocomponente
                pieza['monitoreo'] = false
                //GUARDAMOS LA PIEZA QUE SE VA A ELIMINAR
                pieza['anterior'] = ""
                piezas_enviadas.push(pieza)
                
                $("#piezas_enviadas").val(JSON.stringify(piezas_enviadas))

                $("#example1").append('<tr><td>'+sku+'</td><td>'+nombre+'</td><td>'+unidad+'</td><td>'+modelo+'</td><td>'+tipo+'</td><td id="serie">'+serie+'</td><td>'+tipocomponente+'</td><td>'+opciones+'</td></tr>')
            });
        }

    }

    function getPiezas(){
        hayMonitoreos = false
        existentes = ""
        $.ajax({
            type : "GET",
            url : '/portal/getPiezas',
            data: {
                "test": $("#equipo__id").val(),
                "inactivo":"False"
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

                    if (item.serie == null){
                        serie = ""
                    }else{
                        serie = item.serie
                    }
                    $("#piezasCodigoExistente").append('<tr><td>'+item.sku+'</td><td>'+item.nombre+'</td><td>'+item.tipoinventario+'</td><td id="serie">'+serie+'</td><td>'+item.unidad+'</td><td>'+item.modelo+'</td><td>'+item.tipo+'</td><td>'+item.fecha+'</td></tr>')

                    piezas_existentes.push(pieza)
                    $("#piezas_existentes").val(JSON.stringify(piezas_existentes))
                });
                $(data.data2).each(function(i,item){  
                    hayMonitoreos = true
                    pieza = {}

                    existentes = existentes + ","+item.sku

                    pieza['id'] = item.id
                    pieza['sku'] = item.sku
                    pieza['nombre'] = item.nombre
                    pieza['unidad'] = item.unidad
                    pieza['modelo'] = item.modelo
                    pieza['tipo'] = item.tipo
                    pieza['serie'] = ""
                    pieza['padre'] = item.padre
                    pieza['tipoinventario'] = item.tipoinventario
                    pieza['fecha'] = item.fecha
                    pieza['ocultar'] = false
                    var tds = [];
                    tds.push('<td>'+item.sku+'</td>');
                    tds.push('<td>'+item.nombre+'</td>');
                    tds.push('<td>'+item.tipoinventario+'</td>');
                    tds.push('<td>'+item.unidad+'</td>');
                    tds.push('<td>'+item.modelo+'</td>');
                    tds.push('<td>'+item.tipo+'</td>');
                    tds.push('<td>'+item.padre+'</td>');
                    tds.push('<td>'+item.principal+'</td>');
                    tds.push('<td>'+item.nick+'</td>');
                    tds.push('<td>'+item.fecha+'</td>');
                    tablaMonitoreos.row.add(tds).draw(false);
                    //$("#piezasCodigoExistenteMonitoreos").append('<tr><td>'+item.sku+'</td><td>'+item.nombre+'</td><td>'+item.tipoinventario+'</td><td>'+item.unidad+'</td><td>'+item.modelo+'</td><td>'+item.tipo+'</td><td>'+item.padre+'</td><td>'+item.principal+'</td><td>'+item.nick+'</td><td>'+item.fecha+'</td></tr>')
                    
                    piezas_existentes_monitoreo.push(pieza)
                });
                
                monitoreoComponente = true
                $.ajax({
                    type : "GET",
                    url : '/portal/getMonitoreosEquipo',
                    data: {
                        "id": $("#equipo__id").val(),
                        "tipo": "2",
                        "existentes":existentes,
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
                            pieza['serie'] = ""
                            pieza['padre'] = item.padre
                            pieza['tipoinventario'] = item.tipoinventario
                            pieza['fecha'] = item.fecha
                            pieza['ocultar'] = false

                            var tds = [];
                            tds.push('<td>'+item.sku+'</td>');
                            tds.push('<td>'+item.nombre+'</td>');
                            tds.push('<td>'+item.tipoinventario+'</td>');
                            tds.push('<td>'+item.unidad+'</td>');
                            tds.push('<td>'+item.modelo+'</td>');
                            tds.push('<td>'+item.tipo+'</td>');
                            tds.push('<td>'+item.padre+'</td>');
                            tds.push('<td>'+item.principal+'</td>');
                            tds.push('<td>'+item.nick+'</td>');
                            tds.push('<td>'+item.fecha+'</td>');
                            tablaMonitoreos.row.add(tds).draw(false);
                            //$("#piezasCodigoExistenteMonitoreos").append('<tr><td>'+item.sku+'</td><td>'+item.nombre+'</td><td>'+item.tipoinventario+'</td><td>'+item.unidad+'</td><td>'+item.modelo+'</td><td>'+item.tipo+'</td><td>'+item.padre+'</td><td>'+item.principal+'</td><td>'+item.nick+'</td><td>'+item.fecha+'</td></tr>')
            
                            piezas_existentes_monitoreo.push(pieza)
                        });
                       
                    },
                    failure: function(data){}
                });


                
            },
            failure: function(data){}
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

    function eleccionMonitoreo(sku,unico){
        $('#piezasCodigoMonitoreo tr:not(:first)').remove();
        for(var i = 0; i < piezas_existentes_monitoreo.length; i++){
            opciones = ""
            if(piezas_existentes_monitoreo[i].sku == sku && piezas_existentes_monitoreo[i].ocultar == false){
                idt = piezas_existentes_monitoreo[i].id
                sku = piezas_existentes_monitoreo[i].sku
                nombre = piezas_existentes_monitoreo[i].nombre
                unidad = piezas_existentes_monitoreo[i].unidad
                modelo = piezas_existentes_monitoreo[i].modelo
                tipo = piezas_existentes_monitoreo[i].tipo
                serie = piezas_existentes_monitoreo[i].serie
                tipocomponente = piezas_existentes_monitoreo[i].tipoinventario
                padre = piezas_existentes_monitoreo[i].padre
                fecha = piezas_existentes_monitoreo[i].fecha
                
                if(fecha != ""){
                    monitoreoComponente = false
                }else{
                    monitoreoComponente = true
                }
                opciones = '<button type="button" onclick=intercambiarMonitoreo('+idt+',sku,tipocomponente,padre)  class="btn btn-primary btn-blue">Seleccionar</button>'
                
                $("#piezasCodigoMonitoreo").append('<tr><td>'+sku+'</td><td>'+nombre+'</td><td>'+unidad+'</td><td>'+modelo+'</td><td>'+tipo+'</td><td id="serie">'+serie+'</td><td>'+tipocomponente+'</td><td>'+fecha+'</td><td>'+opciones+'</td></tr>')
            
                if(unico){
                    //AGREGAMOS AL ARRAY QUE SE VA A ENVIAR A BACK
                    pieza = {}
                    pieza['id'] = id_elegido
                    pieza['sku'] = sku
                    pieza['tipo'] = tipocomponente
                    pieza['padre'] = padre
                    pieza['monitoreo'] = true
                    //GUARDAMOS LA PIEZA QUE SE VA A ELIMINAR
                    if (!monitoreoComponente){
                        pieza['anterior'] = idt
                    }else{
                        pieza['anterior'] = ""
                    }
                    

                    piezas_enviadas_monitoreo.push(pieza)
                    $("#piezas_enviadas_monitoreo").val(JSON.stringify(piezas_enviadas_monitoreo))

                    if (!monitoreoComponente){
                        $("#example1").append('<tr><td>'+sku_elegido+'</td><td>'+nombre_elegido+'</td><td>'+unidad_elegido+'</td><td>'+modelo_elegido+'</td><td>'+tipo_elegido+'</td><td id="serie">'+serie_elegido+'</td><td>'+tipocomponente_elegido+'</td><td>'+opciones_elegido+'</td></tr>')
                    }else{
                        $("#example1").append('<tr><td>'+sku_elegido+'</td><td>'+nombre_elegido+'</td><td>'+unidad_elegido+'</td><td>'+modelo_elegido+'</td><td>'+tipo_elegido+'</td><td id="serie">'+serie_elegido+'</td><td>'+tipocomponente_elegido+'</td><td>'+opciones_monitoreo+'</td></tr>')
                    }
                    
                    for(var i = 0; i < piezas_existentes_monitoreo.length; i++){
                        if(piezas_existentes_monitoreo[i].id == idt){
                            piezas_existentes_monitoreo[i].ocultar = true
                            break
                        }
                    }
                    //////////////////////////////////////
                }
            }
        }
        if(!unico){
            $('#modalEleccionMonitoreo').modal({
                show: 'true'
            });
        }
        
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
        console.log("anterioranterior")
        console.log("anterioranterior")
        console.log(id)
        console.log(pieza)

        piezas_enviadas.push(pieza)
        $("#piezas_enviadas").val(JSON.stringify(piezas_enviadas))

        $("#example1").append('<tr><td>'+sku_elegido+'</td><td>'+nombre_elegido+'</td><td>'+unidad_elegido+'</td><td>'+modelo_elegido+'</td><td>'+tipo_elegido+'</td><td id="serie">'+serie_elegido+'</td><td>'+tipocomponente_elegido+'</td><td>'+opciones_elegido+'</td></tr>')
    }

    function intercambiarMonitoreo(id,sku,tipocomponente,padre){
        $('#modalEleccionMonitoreo').modal('hide');
        //AGREGAMOS AL ARRAY QUE SE VA A ENVIAR A BACK
        pieza = {}
        pieza['id'] = id_elegido
        pieza['sku'] = sku
        pieza['tipo'] = tipocomponente
        pieza['padre'] = padre
        pieza['monitoreo'] = true
        //GUARDAMOS LA PIEZA QUE SE VA A ELIMINAR
        if (!monitoreoComponente){
            pieza['anterior'] = id
        }else{
            pieza['anterior'] = ""
        }
        

        piezas_enviadas_monitoreo.push(pieza)
        $("#piezas_enviadas_monitoreo").val(JSON.stringify(piezas_enviadas_monitoreo))

        if (!monitoreoComponente){
            $("#example1").append('<tr><td>'+sku_elegido+'</td><td>'+nombre_elegido+'</td><td>'+unidad_elegido+'</td><td>'+modelo_elegido+'</td><td>'+tipo_elegido+'</td><td id="serie">'+serie_elegido+'</td><td>'+tipocomponente_elegido+'</td><td>'+opciones_elegido+'</td></tr>')
        }else{
            $("#example1").append('<tr><td>'+sku_elegido+'</td><td>'+nombre_elegido+'</td><td>'+unidad_elegido+'</td><td>'+modelo_elegido+'</td><td>'+tipo_elegido+'</td><td id="serie">'+serie_elegido+'</td><td>'+tipocomponente_elegido+'</td><td>'+opciones_monitoreo+'</td></tr>')
        }
        
        for(var i = 0; i < piezas_existentes_monitoreo.length; i++){
            if(piezas_existentes_monitoreo[i].id == id){
                piezas_existentes_monitoreo[i].ocultar = true
                break
            }
        }

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

    function getCantidadMonitoreos(sku){
        cantidad = 0
        for(var j = 0; j < piezas_existentes_monitoreo.length; j++){
            if(piezas_existentes_monitoreo[j].sku == sku){
                cantidad = cantidad + 1
            }
        }
        return cantidad
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
                        break
                    }

                }
            }
        }

        for(var i = 0; i < piezas_enviadas_monitoreo.length; i++){
            if(piezas_enviadas_monitoreo[i].id == id){
                for(var j = 0; j < piezas_existentes_monitoreo.length; j++){
                    if(piezas_existentes_monitoreo[j].id == piezas_enviadas_monitoreo[i].anterior){
                        $("#folio_monitoreo").val(piezas_existentes_monitoreo[i].id)
                        $("#sku_monitoreo").val(piezas_existentes_monitoreo[i].sku)
                        $("#nombre_monitoreo").val(piezas_existentes_monitoreo[i].nombre)
                        $("#serie_monitoreo").val(piezas_existentes_monitoreo[i].serie)
                        $("#tipo_monitoreo").val(piezas_existentes_monitoreo[i].tipo)
                        $("#unidad_monitoreo").val(piezas_existentes_monitoreo[i].unidad)
                        $("#familia_monitoreo").val("")
                        break
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
                    return false;

                    if(piezas_enviadas[i].monitoreo == true){
                        for(var i = 0; i < piezas_existentes_monitoreo.length; i++){
                            if(piezas_existentes_monitoreo[i].id == piezas_enviadas[i].anterior){
                                piezas_existentes_monitoreo[i].ocultar = false
                                return false;
                            }
                        }
                    }
                }
            }

            if (encontrado == false){
                for(var i = 0; i < piezas_existentes.length; i++){
                    if(piezas_existentes[i].id == idt){
                        piezas_existentes.splice(i,1)
                        return false;
                    }
                }
            }

            if (encontrado == false){
                for(var i = 0; i < piezas_enviadas_monitoreo.length; i++){
                    if(piezas_enviadas_monitoreo[i].id == idt){

                        //VOLVEMOS A HABILITAR QUE SE MUESTRE EN LA TABLA
                        for(var j = 0; j < piezas_existentes_monitoreo.length; j++){
                            if(piezas_enviadas_monitoreo[i].anterior == piezas_existentes_monitoreo[j].id){
                                piezas_existentes_monitoreo[j].ocultar = false
                                return false;
                            }else{
                                if(monitoreoComponente && piezas_enviadas_monitoreo[i].sku == piezas_existentes_monitoreo[j].sku){
                                    piezas_existentes_monitoreo[j].ocultar = false
                                    return false;
                                }
                            }
                        }
                        piezas_enviadas_monitoreo.splice(i,1)
                        return false;
                    }
                }
            }

            $("#piezas_existentes").val(JSON.stringify(piezas_existentes))
            $("#piezas_enviadas").val(JSON.stringify(piezas_enviadas))
            $("#piezas_existentes_monitoreo").val(JSON.stringify(piezas_existentes_monitoreo))

            sku = $(row).parent().parent().children('td').slice(0, 1).text()

            $('#example1 tr:not(:first)').each(function() {
                if($(this).find("td:first-child").html() == sku){
                    $(this).remove()
                }
            });



        });
    
        

    }

    function enviarZona(){
        zona = $("#zonaoperativa").val()
        document.location = "/portal/zonaoperativa/editar/"+zona;
    }

    $("#cmdCancel").click(function(){
        document.location = "/portal/ticket";
    });

    function mostrarPiezas(){
        $('#modalPiezas').modal({
            show: 'true'
        });
    }

    $(document).ready(function(){  
        getPiezas()
        if($("#id_almacen").val() == ''){
            $("#id_almacen").val($("#id_almacen_codigo").val())
        }
        if($("#tieneCodigo").val() == "False"){
            $('#modalCodigo').modal({
                show: 'true'
            });
            $("#btnSubir").prop('disabled',true)
            $("#warningCodigo").show()
        }
        if($("#tieneAlmacen").val() == "False"){
            $('#modalAlmacen').modal({
                show: 'true'
            });
            $("#btnSubir").prop('disabled',true)
            $("#warningAlmacen").show()
        }
        if($("#tieneFechas").val() == "False"){
            $('#modalFechas').modal({
                show: 'true'
            });
            $("#btnSubir").prop('disabled',true)
            $("#warningFechas").show()
        }
        if($("#orden_serv").val() != ""){
            $("#file_1").removeAttr('required')
        }

        $('#datetimepicker5').datetimepicker({
            minView: 2,
            startView: 2,
            format: 'dd-mm-yyyy',
            //format: 'yyyy-mm-dd',
            autoclose: true
        });
    });

    



    
