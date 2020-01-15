$(window).on('load', function() {
    switch (window.location.pathname){
        case '/portal/ticket/':
            $('#1').addClass('active');
            $('#1').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/ticket/bancomer/preventivo/':
            $('#2').addClass('active');
            $('#2').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/ticket/bancomer/correctivo/':
            $('#3').addClass('active');
            $('#3').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/ticket/bancomer/arapida/':
            $('#4').addClass('active');
            $('#4').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/ticket/otros/preventivo/':
            $('#5').addClass('active');
            $('#5').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/ticket/otros/correctivo/':
            $('#6').addClass('active');
            $('#6').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/reportes/':
            $('#7').addClass('active');
            $('#7').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active')
            console.log('si se aplico');
            break;
        case '/portal/reportesdia/':
            $('#8').addClass('active');
            $('#8').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').attr("class","");
            break;
        case '/portal/reportes_abiertos/':
            $('#9').addClass('active');
            $('#9').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/reportesdia_abiertos/':
            $('#10').addClass('active');
            $('#10').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/reportes_vencidos/':
            $('#11').addClass('active');
            $('#11').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/reportes_vencidos_dia/':
            $('#12').addClass('active');
            $('#12').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/componente/':
            $('#13').addClass('active');
            $('#13').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/almacen/':
            $('#14').addClass('active');
            $('#14').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/proveedor/':
            $('#15').addClass('active');
            $('#15').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/traspasos/':
            $('#16').addClass('active');
            $('#16').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/proveedordeservicio/':
            $('#17').addClass('active');
            $('#17').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menuinventario').removeClass();
            $('#menuinventario').addClass("nav nav-second-level collapse");
            $('#menuinventario').attr('aria-expanded','false');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/cliente/':
            $('#18').addClass('active');
            $('#18').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/contrato/':
            $('#19').addClass('active');
            $('#19').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/codigo/':
            $('#20').addClass('active');
            $('#20').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/zonaoperativa/':
            $('#21').addClass('active');
            $('#21').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/estados/':
            $('#22').addClass('active');
            $('#22').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/ciudad/':
            $('#23').addClass('active');
            $('#23').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/usuarios/':
            $('#24').addClass('active');
            $('#24').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/roles/':
            $('#25').addClass('active');
            $('#25').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/tipocontacto/':
            $('#26').addClass('active');
            $('#26').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/tipoalmacen/':
            $('#27').addClass('active');
            $('#27').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/tipocomponente/':
            $('#28').addClass('active');
            $('#28').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/tipocontrato/':
            $('#29').addClass('active');
            $('#29').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/tipoticket/':
            $('#30').addClass('active');
            $('#30').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/tipoadvertencia/':
            $('#31').addClass('active');
            $('#31').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/tipoproveedor/':
            $('#32').addClass('active');
            $('#32').attr('style', 'color: #ffffff; font-weight: 500;')
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#33,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/statuscomponente/':
            $('#33').addClass('active');
            $('#33').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#34,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/statusticket/':
            $('#34').addClass('active');
            $('#34').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#35,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/statuscomercial/':
            $('#35').addClass('active');
            $('#35').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#36,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/statusoperativo/':
            $('#36').addClass('active');
            $('#36').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#menucatalogos').removeClass();
            $('#menucatalogos').addClass("nav nav-second-level collapse in");
            $('#menucatalogos').attr('aria-expanded','true');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#37,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/compras':
            $('#37').addClass('active');
            $('#37').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#38,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/proveedor':
            $('#38').addClass('active');
            $('#38').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#39,#40,#41,#42').removeClass('active');
            break;
        case '/portal/almacen':
            $('#39').addClass('active');
            $('#39').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#40,#41,#42').removeClass('active');
            break;
        case '/portal/traspasos':
            $('#40').addClass('active');
            $('#40').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#41,#42').removeClass('active');
            break;
        case '/portal/componente':
            $('#41').addClass('active');
            $('#41').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#42').removeClass('active');
            break;
        case '/portal/equipo':
            $('#42').addClass('active');
            $('#42').attr('style', 'color: #ffffff; font-weight: 500;');
            $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19,#20,#21,#22,#23,#24,#25,#26,#27,#28,#29,#30,#31,#32,#33,#34,#35,#36,#37,#38,#39,#40,#41').removeClass('active');
            break;
    }
   });