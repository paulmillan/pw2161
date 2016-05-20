
var iniciaApp = function()
{
	var validarEntrada = function()
	{
	
		event.preventDefault();
		var usuario = $("#txtUsuario").val();
		var clave = $("#txtClave").val();

		if(usuario == "")
		{
			alert("Usuario Vacio");
			$("#txtUsuario").focus();
		}
		if(clave == "")
		{
			alert("Contraseña Vacia");
			$("#txtContraseña").focus();
		}
		
		var parametros="accion=validarEntrada"+
						"&usuario="+usuario+"&clave="+clave+
						"&id="+Math.random();
		$.ajax({
			beforeSend:function(){
				console.log("Validar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta){
					$("#datosUsuario").hide();
					$("nav").show("slow");
				}
				else{
					alert("Usuario/Contraseña incorrecto(s)");
					document.getElementById('txtUsuario').value = "";
					document.getElementById('txtClave').value = "";
					$("#txtUsuario").focus();
				}
			},
			error: function(xhr, ajaxOptionx, thrownError){
				console.log("Algo salió mal");
			},

		});
		console.log("Se disparó el submit");
	}

	var Altas = function() {
		
		$("#altaUsuarios").show("slow");
		$("#bajaUsuarios").hide();
	}

	var bajas = function() {
		
		$("#bajaUsuarios").show("slow");
		$("#altaUsuarios").hide();

	}

	var AltaUsuario = function() {

		event.preventDefault();

		var datos = $("#frmAltaUsuarios").serialize();
		var parametros = "accion=guardaUsuario&"+datos+"&id="+Math.random();

		$.ajax({
			beforeSend:function(){
				console.log("Guardar Usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response) {
				if(response.respuesta) {
					alert("Usuario registrado correctamente");
					document.getElementById('txtNombreUsuario').value = "";
					document.getElementById('txtClaveUsuario').value = "";
					document.getElementById('txtTipoDepartamento').value = "";
				}
				else {
					alert("No se pudo guardar la información");
					document.getElementById('txtNombreUsuario').value = "";
					document.getElementById('txtClaveUsuario').value = "";
					document.getElementById('txtTipoDepartamento').value = "";

				}
			},
			error: function(xhr,ajax,thrownError) {
				console.log("Algo salió mal");
			}
		});
	}


	var bajaUsuario = function() {

		event.preventDefault();

		var datos = $("#frmbajaUsuarios").serialize();
		var parametros = "accion=bajaUsuario&"+datos+"&id="+Math.random();

		$.ajax({
			beforeSend:function(){
				console.log("Borrar Usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response) {
				if(response.respuesta) {
					alert("Usuario borrado correctamente");
					document.getElementById('txtNombreUsuario').value = "";
					document.getElementById('txtClaveUsuario').value = "";
					document.getElementById('txtTipoDepartamento').value = "";
				}
				else {
					alert("No se pudo borrar la información");
					document.getElementById('txtNombreUsuario').value = "";
					document.getElementById('txtClaveUsuario').value = "";
					document.getElementById('txtTipoDepartamento').value = "";
				}
			},
			error: function(xhr,ajax,thrownError) {
				console.log("Algo salió mal :c");
			}
		});
	}

	$("#frmValidaEntrada").on("submit",validarEntrada);
	$("#btnAltas").on("click",Altas);
	$("#frmAltaUsuarios").on("submit",AltaUsuario);

	$("#btnbajas").on("click",bajas);
	$("#frmbajaUsuarios").on("submit",bajaUsuario);
}

$(document).on("ready", iniciaApp);







