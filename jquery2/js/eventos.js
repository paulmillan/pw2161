
var iniciaApp=function()
{
	var validarEntrada=function()
	{
		console.log("Se disparo el submit");
		var usuario= $("#txtUsuario").val();  //extraer valor del input
		var clave=$("#txtClave").val(); 
		if(usuario=="")
		{
			
			alert("Teclee usuario");
			$("#txtUsuario").focus();
		}

		if(clave=="")
		{
			
			alert("Teclee clave");
			$("#txtClave").focus();
		}
	}
	$("#frmValidaEntrada").on("submit",validarEntrada);
}
$(document).on("ready",iniciaApp);