   $(document).keypress(
        function(event){
          if (event.which == '13') {
            event.preventDefault();
          }
    });

    objetosDespachador = []
    objetosFiltracion = []
    objetosTanques = []
    objetosAccesorios = []

    componentes_existentes = []
    objetoComponentes = []

    var almacen = 0

    var TCS = ""
    var TCS2 = ""
    var TCS3 = ""
    var TCS4 = ""
    var TCS5 = ""

    var TCS_PARTES2 = ""
    var TCS_PARTES3 = ""
    var TCS_PARTES4 = ""
    var TCS_PARTES5 = ""

    var partesDespachador = false
    var partesFiltracion = false
    var partesTanques = false
    var partesAccesorios = false

    function agregarSeleccionado(tipo,id,row){  
        $(row).parent().css('background-color', "#D6D5C3");

        almacen = id

        $("#id_almacen").val(id)

        if(row){
            $("#sku_busqueda1").val($(row).parent().parent().children('td').slice(0, 1).text())


            $("#sku_busqueda1").val("")
        }

        $(".button_buscar_cs_despachador").prop( "disabled", false )
        $(".button_buscar_cs3").prop("disabled",false)
        $(".button_buscar_cs4").prop("disabled",false)
        $("#botonReiniciar").prop("disabled",false)


        

        


    }

    function tablaDespachador(id){
        console.log("si1")
        /*
            TABLA DE DESPACHADOR
        */
        $("#example2").show()

        //console.log("###")
        //console.log(id)
        $("#example2").DataTable().destroy();
        TCS2 = $('#example2').DataTable({
            pageLength: 5,
            responsive: true,
            serverSide: true,
            oLanguage: {
                sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
            },
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
                "url": "{% url 'portal:DTComponente_Search_Despachador' %}",
                "type": "POST",
                "data": {
                    'csrfmiddlewaretoken':"{{ csrf_token }}",
                    'test': id,
                },                                
            },
            "columns":[
                { "data" : "sku"},
                { "data" : "nombre"},
                { "data" : "unidad"},
                { "data" : "modelo"},
                { "data" : "tipo"},
                { "data" : "serie"},
                { "data" : "opciones"},
            ],
            "columnDefs": [ ],
            "order": []
        });

        $("#btnBuscar2")[0].click();
    }

    function tablaDespachadorComponente(id){
        /*
            TABLA DE DESPACHADOR
        */
        $("#example2").show()
        $("#example2").DataTable().destroy();
        TCS2 = $('#example2').DataTable({
            pageLength: 5,
            responsive: true,
            serverSide: true,
            oLanguage: {
                sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
            },
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
                "url": "{% url 'portal:DTComponente_Search_Despachador_Componente' %}",
                "type": "POST",
                "data": {
                    'csrfmiddlewaretoken':"{{ csrf_token }}",
                    'test': id,
                },                                
            },
            "columns":[
                { "data" : "sku"},
                { "data" : "nombre"},
                { "data" : "unidad"},
                { "data" : "modelo"},
                { "data" : "tipo"},
                { "data" : "serie"},
                { "data" : "opciones"},
            ],
            "columnDefs": [ ],
            "order": []
        });

        $("#btnBuscar2")[0].click();
    }



    function tablaFiltracion(id){
        console.log("si2")
        /*
            TABLA DE FILTRACIÓN
        */
        
        $("#example3").show()
        $("#example3").DataTable().destroy();
        TCS3 = $('#example3').DataTable({
            pageLength: 5,
            responsive: true,
            serverSide: true,
            oLanguage: {
                sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
            },
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
                "url": "{% url 'portal:DTComponente_Search_Filtracion' %}",
                "type": "POST",
                "data": {
                    'csrfmiddlewaretoken':"{{ csrf_token }}",
                    'test': id,
                },                                
            },
            "columns":[
                { "data" : "sku"},
                { "data" : "nombre"},
                { "data" : "unidad"},
                { "data" : "modelo"},
                { "data" : "tipo"},
                { "data" : "serie"},
                { "data" : "opciones"},
            ],
            "columnDefs": [ ],
            "order": []
        });

        $("#btnBuscar3")[0].click();
    }
    function tablaFiltracionComponente(id){
        /*
            TABLA DE FILTRACIÓN
        */
        $("#example3").show()
        $("#example3").DataTable().destroy();
        TCS3 = $('#example3').DataTable({
            pageLength: 5,
            responsive: true,
            serverSide: true,
            oLanguage: {
                sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
            },
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
                "url": "{% url 'portal:DTComponente_Search_Filtracion_Componente' %}",
                "type": "POST",
                "data": {
                    'csrfmiddlewaretoken':"{{ csrf_token }}",
                    'test': id,
                },                                
            },
            "columns":[
                { "data" : "sku"},
                { "data" : "nombre"},
                { "data" : "unidad"},
                { "data" : "modelo"},
                { "data" : "tipo"},
                { "data" : "serie"},
                { "data" : "opciones"},
            ],
            "columnDefs": [ ],
            "order": []
        });

        $("#btnBuscar3")[0].click();
    }

    function tablaTanques(id){
        console.log("si3")
        /*
            TABLA DE TANQUES
        */
        
        $("#example4").show()
        $("#example4").DataTable().destroy();
        TCS4 = $('#example4').DataTable({
            pageLength: 5,
            responsive: true,
            serverSide: true,
            oLanguage: {
                sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
            },
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
                "url": "{% url 'portal:DTComponente_Search_Tanques' %}",
                "type": "POST",
                "data": {
                    'csrfmiddlewaretoken':"{{ csrf_token }}",
                    'test': id,
                },                                
            },
            "columns":[
                { "data" : "sku"},
                { "data" : "nombre"},
                { "data" : "unidad"},
                { "data" : "modelo"},
                { "data" : "tipo"},
                { "data" : "serie"},
                { "data" : "opciones"},
            ],
            "columnDefs": [ ],
            "order": []
        });

        $("#btnBuscar4")[0].click();

    }
    function tablaTanquesComponente(id){
        /*
            TABLA DE TANQUES
        */
        $("#example4").show()
        $("#example4").DataTable().destroy();
        TCS4 = $('#example4').DataTable({
            pageLength: 5,
            responsive: true,
            serverSide: true,
            oLanguage: {
                sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
            },
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
                "url": "{% url 'portal:DTComponente_Search_Tanques_Componente' %}",
                "type": "POST",
                "data": {
                    'csrfmiddlewaretoken':"{{ csrf_token }}",
                    'test': id,
                },                                
            },
            "columns":[
                { "data" : "sku"},
                { "data" : "nombre"},
                { "data" : "unidad"},
                { "data" : "modelo"},
                { "data" : "tipo"},
                { "data" : "serie"},
                { "data" : "opciones"},
            ],
            "columnDefs": [ ],
            "order": []
        });

        $("#btnBuscar4")[0].click();

    }
    function agregarAccesorio(){   
        var componente_elegido = $( "#id_sku option:selected" ).val()
        //console.log(componente_elegido)
        //console.log("--------------------")
        for(var i = 0; i < componentes_existentes.length; i++){
            //console.log(componentes_existentes[i].id)
            if (componentes_existentes[i].id == componente_elegido){
                var sku = componentes_existentes[i].sku
                var nombre = componentes_existentes[i].nombre
                var unidad = componentes_existentes[i].unidad
                var modelo = componentes_existentes[i].modelo
                var tipo = componentes_existentes[i].tipo

                if(sku == "None"){
                    sku = ""
                }
                if(nombre == "None"){
                    nombre = ""
                }
                if(unidad == "None"){
                    unidad = ""
                }
                if(modelo == "None"){
                    modelo = ""
                }
                if(tipo == "None"){
                    tipo = ""
                }
                //si son null o none, colocar comillas vacías


                $( "#1-carta" ).after( "<div class='col-md-3 primera-carta pull-left'><div class='thumbnail'><div class='caption'><div class='col-lg-12'><span class='glyphicon glyphicon glyphicon-wrench pull-right'></span></div>"+
                "<div class='col-lg-12 well well-add-card'><h5>"+sku+" ---- "+nombre+"</h5></div><div class='col-lg-12'><p>"+" </p> <p>Unidad:"+unidad+" </p><p>Modelo: "+modelo+" </p><p>Familia: "+tipo+" </p></div>"+
                "<button type='button' onclick=eliminar(this,"+componentes_existentes[i].id+"); class='btn btn-primary btn-xs btn-update btn-add-card ' style='background-color: #2cabe3;''>Eliminar</button></div></div></div>" );
        
                item = {}
                item['id'] = componentes_existentes[i].id
                //asignar valores a enviar

                objetoComponentes.push(item)   
                //$("#id_sku option[value='"+componentes_existentes[i].id+"']").remove().change();

            }
        }
        $("#componentes_enviados").val(JSON.stringify(objetoComponentes))

    }
    function eliminar(valor,id){

        $(valor).parent().parent().parent().remove()
        for(var i = 0; i < objetoComponentes.length; i++){
            if(objetoComponentes[i].id == id){
                objetoComponentes.splice(i,1)
                //$("#id_sku").append("<option selected value=\""+componentes_existentes[i].id+"\">"+componentes_existentes[i].nombre+"-"+componentes_existentes[i].sku+"</option>").change();
                break
                
            }
        }
        $("#componentes_enviados").val(JSON.stringify(objetoComponentes))

    }
    function tablaAccesorios(id){
        console.log("si4")
        /*
            TABLA DE TANQUES
        */
        $.ajax({
            type : "GET",
            url : '/portal/getInventarioAccesorios',
            data: {
                "test": $("#almacen_zona").val(),
                },
            success: function(data){
                $(data.data).each(function(i,item){
                    $("#id_sku").append("<option selected value=\""+item.id+"\">"+item.nombre+"-"+item.sku+"</option>").change();

                    inventario = {}
                    inventario['id'] = item.id
                    inventario['nombre'] = item.sku
                    inventario['unidad'] = item.nombre
                    inventario['modelo'] = item.modelo
                    inventario['tipo'] = item.tipo

                    componentes_existentes.push(item) 
                });

                
                //getColonias();
            },
            failure: function(data){

                //console.log("failure");
                // alert("Falló la llamada de Ajax");
            }
           
            
        });

    }

    function tablaAccesoriosComponente(id){
        /*
            TABLA DE TANQUES
        */
        $.ajax({
            type : "GET",
            url : '/portal/getInventarioAccesoriosComponente',
            data: {
                "test": $("#almacen_zona").val(),
                },
            success: function(data){
                $(data.data).each(function(i,item){
                    $("#id_sku").append("<option selected value=\""+item.id+"\">"+item.nombre+"-"+item.sku+"</option>").change();

                    inventario = {}
                    inventario['id'] = item.id
                    inventario['nombre'] = item.sku
                    inventario['unidad'] = item.nombre
                    inventario['modelo'] = item.modelo
                    inventario['tipo'] = item.tipo

                    componentes_existentes.push(item) 
                });

                
                //getColonias();
            },
            failure: function(data){

                //console.log("failure");
                // alert("Falló la llamada de Ajax");
            }
           
            
        });

    }
    function obtenerInformacion(tipo,id,row){

        
        //$(row).parent().css('background-color', "#D6D5C3");
        
        /*
            TABLA COMPONENTES PARA DESPACHADOR
        */
        if(tipo == 1){



            $("#despachador_elegido_sku").val($(row).parent().parent().children('td').slice(0, 1).text())
            $("#despachador_elegido_nombre").val($(row).parent().parent().children('td').slice(1, 2).text())
            $("#despachador_elegido_tipo").val($(row).parent().parent().children('td').slice(4, 5).text())

            $("#despachador_elegido_serie_mostrar").show()
            $("#despachador_elegido_serie").val($(row).parent().parent().children('td').slice(5, 6).text())

            partesDespachador = true
            $("#id_despachador").val(id)
            //$("#rowPartes").show()

            $("#rowPartes").show()  
            
            TCS_PARTES2 = $('#examplePartes').DataTable({
                pageLength: 5,
                responsive: true,
                serverSide: true,
                oLanguage: {
                    sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
                },
                processing : true,
                dom: 'lrtipB',
                lengthMenu: [ [ 10, 25, 50, -1 ], [ '10 rows', '25 rows', '50 rows', 'Show all' ] ],
                retrieve: true,
                retrieve: true,
                "ajax": {
                    "url": "{% url 'portal:DTComponente_Search_Partes' %}",
                    "type": "POST",
                    "data": {
                        'csrfmiddlewaretoken':"{{ csrf_token }}",
                        'test': $("#id_almacen").val(),
                        'test2': id,
                        'test3': 1,
                    },                                
                },
                "columns":[
                    { "data" : "sku"},
                    { "data" : "nombre"},
                    { "data" : "meses"},
                ],
                "columnDefs": [ ],
                "order": []
            });

            TCS_PARTES2.draw()
        
            
        }else if(tipo == 2){
            partesFiltracion = true
            $("#id_filtracion").val(id)

            $("#filtracion_elegido_sku").val($(row).parent().parent().children('td').slice(0, 1).text())
            $("#filtracion_elegido_nombre").val($(row).parent().parent().children('td').slice(1, 2).text())
            $("#filtracion_elegido_tipo").val($(row).parent().parent().children('td').slice(4, 5).text())

            $("#filtracion_elegido_serie_mostrar").show()
            $("#filtracion_elegido_serie").val($(row).parent().parent().children('td').slice(5, 6).text())

            $("#rowPartes2").show()
        
            TCS_PARTES3 = $('#examplePartes2').DataTable({
                pageLength: 5,
                responsive: true,
                serverSide: true,
                oLanguage: {
                    sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
                },
                processing : true,
                dom: 'lrtipB',
                lengthMenu: [ [ 10, 25, 50, -1 ], [ '10 rows', '25 rows', '50 rows', 'Show all' ] ],
                retrieve: true,
                retrieve: true,
                "ajax": {
                    "url": "{% url 'portal:DTComponente_Search_Partes' %}",
                    "type": "POST",
                    "data": {
                        'csrfmiddlewaretoken':"{{ csrf_token }}",
                        'test': $("#id_almacen").val(),
                        'test2': id,
                        'test3': 2,
                    },                                
                },
                "columns":[
                    { "data" : "sku"},
                    { "data" : "nombre"},
                    { "data" : "meses"},
                ],
                "columnDefs": [ ],
                "order": []
            });

            TCS_PARTES3.draw()


        }else if(tipo == 3){
            partesTanques = true
            $("#id_tanque").val(id)

            $("#tanque_elegido_sku").val($(row).parent().parent().children('td').slice(0, 1).text())
            $("#tanque_elegido_nombre").val($(row).parent().parent().children('td').slice(1, 2).text())
            $("#tanque_elegido_tipo").val($(row).parent().parent().children('td').slice(4, 5).text())

            $("#tanque_elegido_serie_mostrar").show()
            $("#tanque_elegido_serie").val($(row).parent().parent().children('td').slice(5, 6).text())

            $("#rowPartes3").show()
        
            TCS_PARTES4 = $('#examplePartes3').DataTable({
                pageLength: 5,
                responsive: true,
                serverSide: true,
                oLanguage: {
                    sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
                },
                processing : true,
                dom: 'lrtipB',
                lengthMenu: [ [ 10, 25, 50, -1 ], [ '10 rows', '25 rows', '50 rows', 'Show all' ] ],
                retrieve: true,
                retrieve: true,
                "ajax": {
                    "url": "{% url 'portal:DTComponente_Search_Partes' %}",
                    "type": "POST",
                    "data": {
                        'csrfmiddlewaretoken':"{{ csrf_token }}",
                        'test': $("#id_almacen").val(),
                        'test2': id,
                        'test3': 3,
                    },                                
                },
                "columns":[
                    { "data" : "sku"},
                    { "data" : "nombre"},
                    { "data" : "meses"},
                ],
                "columnDefs": [ ],
                "order": []
            });

            TCS_PARTES4.draw()

      

        }else{
            partesAccesorios = true
            $("#id_accesorio").val(id)
     
        }

    }

    function obtenerInformacionComponente(tipo,id,row){

        
        //$(row).parent().css('background-color', "#D6D5C3");
        
        /*
            TABLA COMPONENTES PARA DESPACHADOR
        */

        if(tipo == 1){



            $("#despachador_elegido_sku").val($(row).parent().parent().children('td').slice(0, 1).text())
            $("#despachador_elegido_nombre").val($(row).parent().parent().children('td').slice(1, 2).text())
            $("#despachador_elegido_tipo").val($(row).parent().parent().children('td').slice(4, 5).text())

            $("#despachador_elegido_serie_mostrar").show()
            $("#despachador_elegido_serie").val($(row).parent().parent().children('td').slice(5, 6).text())

            partesDespachador = true
            $("#id_despachador").val(id)
            //$("#rowPartes").show()

            $("#rowPartes").show()
            
            TCS_PARTES2 = $('#examplePartes').DataTable({
                pageLength: 5,
                responsive: true,
                serverSide: true,
                oLanguage: {
                    sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
                },
                processing : true,
                dom: 'lrtipB',
                lengthMenu: [ [ 10, 25, 50, -1 ], [ '10 rows', '25 rows', '50 rows', 'Show all' ] ],
                retrieve: true,
                retrieve: true,
                "ajax": {
                    "url": "{% url 'portal:DTComponente_Search_Partes_Componente' %}",
                    "type": "POST",
                    "data": {
                        'csrfmiddlewaretoken':"{{ csrf_token }}",
                        'test': $("#id_almacen").val(),
                        'test2': id,
                        'test3': 1,
                    },                                
                },
                "columns":[
                    { "data" : "sku"},
                    { "data" : "nombre"},
                    { "data" : "meses"},
                ],
                "columnDefs": [ ],
                "order": []
            });

            TCS_PARTES2.draw()
        
            
        }else if(tipo == 2){
            partesFiltracion = true
            $("#id_filtracion").val(id)

            $("#filtracion_elegido_sku").val($(row).parent().parent().children('td').slice(0, 1).text())
            $("#filtracion_elegido_nombre").val($(row).parent().parent().children('td').slice(1, 2).text())
            $("#filtracion_elegido_tipo").val($(row).parent().parent().children('td').slice(4, 5).text())

            $("#filtracion_elegido_serie_mostrar").show()
            $("#filtracion_elegido_serie").val($(row).parent().parent().children('td').slice(5, 6).text())

            $("#rowPartes2").show()
        
            TCS_PARTES3 = $('#examplePartes2').DataTable({
                pageLength: 5,
                responsive: true,
                serverSide: true,
                oLanguage: {
                    sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
                },
                processing : true,
                dom: 'lrtipB',
                lengthMenu: [ [ 10, 25, 50, -1 ], [ '10 rows', '25 rows', '50 rows', 'Show all' ] ],
                retrieve: true,
                retrieve: true,
                "ajax": {
                    "url": "{% url 'portal:DTComponente_Search_Partes_Componente' %}",
                    "type": "POST",
                    "data": {
                        'csrfmiddlewaretoken':"{{ csrf_token }}",
                        'test': $("#id_almacen").val(),
                        'test2': id,
                        'test3': 2,
                    },                                
                },
                "columns":[
                    { "data" : "sku"},
                    { "data" : "nombre"},
                    { "data" : "meses"},
                ],
                "columnDefs": [ ],
                "order": []
            });

            TCS_PARTES3.draw()


        }else if(tipo == 3){
            partesTanques = true
            $("#id_tanque").val(id)

            $("#tanque_elegido_sku").val($(row).parent().parent().children('td').slice(0, 1).text())
            $("#tanque_elegido_nombre").val($(row).parent().parent().children('td').slice(1, 2).text())
            $("#tanque_elegido_tipo").val($(row).parent().parent().children('td').slice(4, 5).text())

            $("#tanque_elegido_serie_mostrar").show()
            $("#tanque_elegido_serie").val($(row).parent().parent().children('td').slice(5, 6).text())

            $("#rowPartes3").show()
        
            TCS_PARTES4 = $('#examplePartes3').DataTable({
                pageLength: 5,
                responsive: true,
                serverSide: true,
                oLanguage: {
                    sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
                },
                processing : true,
                dom: 'lrtipB',
                lengthMenu: [ [ 10, 25, 50, -1 ], [ '10 rows', '25 rows', '50 rows', 'Show all' ] ],
                retrieve: true,
                retrieve: true,
                "ajax": {
                    "url": "{% url 'portal:DTComponente_Search_Partes_Componente' %}",
                    "type": "POST",
                    "data": {
                        'csrfmiddlewaretoken':"{{ csrf_token }}",
                        'test': $("#id_almacen").val(),
                        'test2': id,
                        'test3': 3,
                    },                                
                },
                "columns":[
                    { "data" : "sku"},
                    { "data" : "nombre"},
                    { "data" : "meses"},
                ],
                "columnDefs": [ ],
                "order": []
            });

            TCS_PARTES4.draw()

      

        }else{
            partesAccesorios = true
            $("#id_accesorio").val(id)
     
        }

    }

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
                    $("#btnBuscar")[0].click()
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

    $("#incluir_despachador").change(function() {

        if(this.checked) {
           $("#puntoUno").show()
            if ($("#id_statuscomercial option:selected").text() == "SUBARRENDADO EQUIPO EXTERNO"){
                
                tablaDespachadorComponente($("#almacen_zona").val())
            }else{
                tablaDespachador($("#almacen_zona").val())
            }
        }else{
            $("#puntoUno").hide()
        }
    });
    $("#incluir_filtracion").change(function() {
        if(this.checked) {
           $("#puntoDos").show()
            if ($("#id_statuscomercial option:selected").text() == "SUBARRENDADO EQUIPO EXTERNO"){
                tablaFiltracionComponente($("#almacen_zona").val())
            }else{
                tablaFiltracion($("#almacen_zona").val())
            }
        }else{
            $("#puntoDos").hide()
        }
    });
    $("#incluir_tanque").change(function() {
        if(this.checked) {
           $("#puntoTres").show()
           if ($("#id_statuscomercial option:selected").text() == "SUBARRENDADO EQUIPO EXTERNO"){
                tablaTanquesComponente($("#almacen_zona").val())
            }else{
                tablaTanques($("#almacen_zona").val())
            }
        }else{
            $("#puntoTres").hide()
        }
    });

    $("#incluir_accesorios").change(function() {
        if(this.checked) {
           $("#puntoCuatro").show()
            if ($("#id_statuscomercial option:selected").text() == "SUBARRENDADO EQUIPO EXTERNO"){
                tablaAccesoriosComponente($("#almacen_zona").val())
            }else{
                tablaAccesorios($("#almacen_zona").val())
            }
        }else{
            $("#puntoCuatro").hide()
        }
    });

    function seleccionarContrato(id){
        var id_seleccionado = id
        {% for x in contratos %}
            if("{{x.id}}" == id_seleccionado){
                $("#contrato_elegido").val("{{x.id}} - {{x.cliente}}")
                $("#contrato_elegido_cliente").val("{{x.cliente}}")
                $("#contrato_elegido_frecuencia").val("{{x.frecuencia}}")
                $("#contrato_elegido_fechainicio").val("{{x.fechainicio|date:'Y-m-d'}}")
                $("#contrato_elegido_fechatermino").val("{{x.fechatermino|date:'Y-m-d'}}")
                $("#contrato_elegido_id").val("{{x.id}}")
                $("#id_contrato").val("{{x.id}}")

                $("#id_").val("{{x.id}}")

                $("#btnBuscar")[0].click()

                $("#id_").val("")


            }
        {% endfor %}


    }

    

    $(document).ready(function(){ 

        $("#puntoUno").hide()
        $("#puntoDos").hide()
        $("#puntoTres").hide()
        $("#puntoCuatro").hide()

        $("#rowPartes").hide()
        $("#rowPartes2").hide()
        $("#rowPartes3").hide()
        $("#example2").hide()
        $("#example3").hide()
        $("#example4").hide()
        $("#example5").hide()
        $(".button_buscar_cs_despachador").prop( "disabled", true )
        $(".button_buscar_cs3").prop("disabled",true)
        $(".button_buscar_cs4").prop("disabled",true)

        $(".button_buscar_cs_despachador").on( 'click',function(){

            var list_inputs = [];           
            $.each($('.inputs_search_despachador'), function () {
                list_inputs.push($(this).val());
            });

            list_inputs.push($(this).data("idx"));

            TCS2.search(list_inputs.join('|'), true, false, true).draw();
        });

        $(".button_buscar_cs3").on( 'click',function(){

            var list_inputs = [];           
            $.each($('.inputs_search_filtracion'), function () {
                list_inputs.push($(this).val());
            });

            list_inputs.push($(this).data("idx"));

            TCS3.search(list_inputs.join('|'), true, false, true).draw();
        });

        $(".button_buscar_cs4").on( 'click',function(){

            var list_inputs = [];           
            $.each($('.inputs_search_filtracion'), function () {
                list_inputs.push($(this).val());
            });

            list_inputs.push($(this).data("idx"));

            TCS4.search(list_inputs.join('|'), true, false, true).draw();
        });

        $(".button_buscar_cs5").on( 'click',function(){

            var list_inputs = [];           
            $.each($('.inputs_search_tanque'), function () {
                list_inputs.push($(this).val());
            });

            list_inputs.push($(this).data("idx"));

            TCS5.search(list_inputs.join('|'), true, false, true).draw();
        });


        var TCS6 = $('#exampleContrato').DataTable({
            responsive: true,
            serverSide: true,
            oLanguage: {
                sProcessing: '<img src="{% static "images/Preloader.gif" %}" alt="">'
            },
            processing : true,
            dom: 'lrtipB',
            lengthMenu: [ [ 10, 25, 50, -1 ], [ '10 rows', '25 rows', '50 rows', 'Show all' ] ],
            
            retrieve: true,
            retrieve: true,
            "ajax": {
                "url": "{% url 'portal:DTContrato_Search_Codigo' %}",
                "type": "POST",
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

        $("#btnBuscar")[0].click()

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
            format: 'yyyy-mm-dd',
            autoclose: true
        });

        $('#datetimepicker6').datetimepicker({
            minView: 2,
            startView: 2,
            format: 'yyyy-mm-dd',
            autoclose: true
        });

        $('#datetimepicker7').datetimepicker({
            minView: 2,
            startView: 2,
            format: 'yyyy-mm-dd',
            autoclose: true
        });

        $('#datetimepicker8').datetimepicker({
            minView: 2,
            startView: 2,
            format: 'yyyy-mm-dd',
            autoclose: true
        });

        $('#datetimepicker9').datetimepicker({
            minView: 2,
            startView: 2,
            format: 'yyyy-mm-dd',
            autoclose: true
        });

        $('#datetimepicker10').datetimepicker({
            minView: 2,
            startView: 2,
            format: 'yyyy-mm-dd',
            autoclose: true
        });

        $('#form_usuarios').validate();
    $("#tele").inputmask({
        mask: "(9{1,3}) 9{1,3}-9{1,4}",
        removeMaskOnSubmit: true
    });

    getCiudades();
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
                $("#id_zona").trigger('change');
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
            //console.log("sucess");
            $("#almacen_zona").val(data.data[0].id)

            $("#sku_busqueda1").val(data.data[0].adminpaq).change()
            $("#nombre_busqueda1").val(data.data[0].nombre).change()
            $("#unidad_busqueda1").val(data.data[0].direccion).change()
            $("#modelo_busqueda1").val(data.data[0].ciudad).change()

        },
        
        failure: function(data){

        }

    }).done(function() {
        agregarSeleccionado(2,$("#almacen_zona").val())
    });

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