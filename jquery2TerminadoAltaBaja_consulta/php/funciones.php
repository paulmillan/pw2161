<?php
//Funciones

	function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
	{
	  $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;

	  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

	  switch ($theType) {
	    case "text":
	      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
	      break;    
	    case "long":
	    case "int":
	      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
	      break;
	    case "double":
	      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
	      break;
	    case "date":
	      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
	      break;
	    case "defined":
	      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
	      break;
	  }
	  return $theValue;
	}
	
	function validaEntrada()
	{
		$usuario = GetSQLValueString($_POST["usuario"], "text");
		$clave   = GetSQLValueString(md5($_POST["clave"]), "text");
		$respuesta = false;
		
		$conexion = mysql_connect("localhost", "root", "");
		//Conectarse a la BD
		mysql_select_db("cursopw");
		$validar = sprintf("select usuario, clave from usuarios where usuario=%s and clave=%s limit 1",$usuario,$clave); 
	
		$resultado = mysql_query($validar);
	
		if(mysql_num_rows($resultado) > 0)
		{
			$respuesta = true;
		} 
		$salidaJSON = array('respuesta' => $respuesta );
		
		print json_encode($salidaJSON);

	}


	function existe($usuario, $clave)
	{
	
		$respuesta = false;
		
		$conexion = mysql_connect("localhost", "root", "");
		mysql_select_db("cursopw");
		$validar = sprintf("select usuario, clave from usuarios where usuario=%s and clave=%s limit 1",$usuario,$clave); 
		
		$resultado = mysql_query($validar);
		
		if(mysql_num_rows($resultado) > 0)
		{
			$respuesta = true;

		} 
		return $respuesta;

	}

	function guardaUsuario() 
	{

		$usuario = GetSQLValueString($_POST["txtNombreUsuario"], "text");
		$clave   = GetSQLValueString(md5($_POST["txtClaveUsuario"]), "text");
		$tipo    = GetSQLValueString($_POST["txtTipoUsuario"], "text");
		$depto   = GetSQLValueString($_POST["txtDepartamento"], "long");
		$real=existe($usuario, $clave);
		$respuesta = false;	
		if(!($real))
		{
			
			$conexion = mysql_connect("localhost", "root", "");	
			mysql_select_db("cursopw");
			$guardar = sprintf("insert into usuarios values(%s,%s,%s,%d)",$usuario,$clave,$tipo,$depto);	
			mysql_query($guardar);
			if(mysql_affected_rows() > 0) {
				$respuesta = true;
										}
		
		}
		
		$salidaJSON = array('respuesta' => $respuesta);
		print json_encode($salidaJSON);
	}

	function bajaUsuario() 
	{
		$usuario = GetSQLValueString($_POST["txtNombreUsuario"], "text");
		
		//$real=existe($usuario, $clave);
		$respuesta = false;	
		//if(!($real))
		//{
		
		$conexion = mysql_connect("localhost", "root", "");
		mysql_select_db("cursopw");
		$borrar= sprintf("delete from usuarios where usuario=%s limit 1",$usuario);
		//$borrar= sprintf("update usuarios set tipoUsuario='baja' where usuario=%s",$usuario);
		mysql_query($borrar);
		if(mysql_affected_rows() > 0) {
			$respuesta = true;
		}
//	}
		$salidaJSON = array('respuesta' => $respuesta);
		print json_encode($salidaJSON);
	}

function consultas()
{
	$respuesta=false;
	mysql_connect("localhost","root","");
	mysql_select_db("cursopw");
	$consulta="select * from usuarios order by usuario";
	$resultado=mysql_query($consulta);
	$tabla="";
	if(mysql_num_rows($resultado)>0)
	{
		$respuesta=true;
		$tabla.="<tr>";
		$tabla.="<th>Usuario</th>";
		$tabla.="<th>Tipo Usuario</th>";
		$tabla.="<th>Departamento</th>";
		$tabla.="<th>Acciones</th>";
		$tabla.="</tr>";
		//$registro=mysql_fetch_array(resultado);
		while ( $registro=$registro=mysql_fetch_array($resultado)) 
		{
				$tabla.="<tr>"; 
				$tabla.="<td>".$registro["usuario"]."</td>";
				$tabla.="<td>".$registro["tipousuario"]."</td>";
				$tabla.="<td>".$registro["departamento"]."</td>";
				$tabla.="<td><button id='".$registro["usuario"]."' class='btn btn-danger' value='Baja'>Baja</button></td>";
				$tabla.="</tr>";
		}
	}
	$salidaJSON = array('respuesta' => $respuesta,
						'tabla'     => $tabla );
	print json_encode($salidaJSON);
}

	$accion = $_POST["accion"];
	//Menu Principal
	switch ($accion) {
		case 'validarEntrada':
			validaEntrada();
			# code...
			break;
		case 'guardaUsuario':
			guardaUsuario();
			# code...
			break;
		case 'bajaUsuario':
		bajaUsuario();
			# code...
			break;
		case 'consultas':
		consultas();
			# code...
			break;
		default:
			# code...
			break;
	}
?>