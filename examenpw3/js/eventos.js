var iniciaApp=function()
{

var AltaAlmacenes=function()
{
	event.preventDefault();
	
		var datos=$("#frmAltaAlmacenes").serialize();
		var parametros="accion=guardaAlmacen&"+datos+"&id="+Math.random();
		$.ajax({
			beforeSend:function(){
				console.log("Guardar al almacen");
			},
			cache:false,
			type:"POST",
			dataType:"json",
			url:"php/funciones.php",
			data:parametros,
			success:function(response){
				if(response.respuesta){
					alert("Almacen dado de alta correctamente");
					$("#txtidAlmacen").val("");
					$("#txtNombre").val("");
					$("#txtDireccion_1").val("");
					$("#txtDireccion_2").val("");
					$("#txtCP").val("");
					$("#txtLocalidad").val("");
					$("#txtProvincia").val("");
				}else{
					alert("No se pudo dar de alta el almacen");
					$("#txtidAlmacen").val("");
					$("#txtNombre").val("");
					$("#txtDireccion_1").val("");
					$("#txtDireccion_2").val("");
					$("#txtCP").val("");
					$("#txtLocalidad").val("");
					$("#txtProvincia").val("");
				}
			},
			error:function(xhr,ajaxOptions,thrownError){
				console.log("Algo salió mal");
			}
		});
}

var Alta=function()
{
	
	$("#altaAlmacen").show("slow");
}

$("#frmAltaAlmacenes").on("submit",AltaAlmacenes);
$("#btnAltas").on("click",Alta);

 }
$(document).on("ready",iniciaApp);
