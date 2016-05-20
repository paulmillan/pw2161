<?php

//funciones
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
	$usuario=GetSQLValueString($_POST["usuario"],"text");
	$clave=GetSQLValueString(md5($_POST["clave"]),"text");
	$respuesta=false;
		//conecto al servidor de Base de Datos
		//servidor, usuario y clave
		$conexion=mysql_connect("localhost","root","");
		//seleccionar la BD
		mysql_select_db("cursopw");
		$validar=sprintf("select usuario, clave from usuarios where usuario=%s and clave=%s limit 1",$usuario,$clave);
		$resultado=mysql_query($validar);
		//preguntamos si se trajo un registro
		if(mysql_num_rows($resultado)>0)
		{
				$respuesta=true;
		}
				
		$salidaJSON = array('respuesta' =>$respuesta);
		//devolvemos el resultado al JS
		print json_encode($salidaJSON);
		
}
function guardaUsuario()
{
	$usuario=GetSQLValueString($_POST["txtNombreUsuario"],"text");
	$clave=GetSQLValueString(md5($_POST["txtClaveUsuario"]),"text");
	$tipo=GetSQLValueString($_POST["txtTipoUsuario"],"text");
	//ojo este es entero por eso es LONG                aqui c:
	$depto=GetSQLValueString($_POST["txtDepartamento"],"long");
	$respuesta=false;
		//conecto al servidor de Base de Datos
		//servidor, usuario y clave
		$conexion=mysql_connect("localhost","root","");
		//seleccionar la BD
		mysql_select_db("cursopw");
		$guarda=sprintf("insert into usuarios values(%s,%s,%s,%d)",$usuario,$clave,$tipo,$depto);
		//ejecutamos el insert
		$resultado=mysql_query($guarda);
		//cuantos registros fueron afectados
		if(mysql_affected_rows()>0)
		{
				$respuesta=true;
		}
				
		$salidaJSON = array('respuesta' =>$respuesta);
		//devolvemos el resultado al JS
		print json_encode($salidaJSON);
}
function bajaUsuario()
{
	$usuario=GetSQLValueString($_POST["txtNombreUsuario"],"text");
	$clave=GetSQLValueString(md5($_POST["txtClaveUsuario"]),"text");
	$respuesta=false;
		//conecto al servidor de Base de Datos
		//servidor, usuario y clave
		$conexion=mysql_connect("localhost","root","");
		//seleccionar la BD
		mysql_select_db("cursopw");
		$borra=sprintf("delete from usuarios where usuario=%s and clave=%s",$usuario,$clave);
	
		$resultado=mysql_query($borra);
		//cuantos registros fueron afectados
		if(mysql_affected_rows()>0)
		{
				$respuesta=true;
		}
				
		$salidaJSON = array('respuesta' =>$respuesta);
		//devolvemos el resultado al JS
		print json_encode($salidaJSON);
}
	$accion=$_POST["accion"];
	//menu principal
	switch ($accion) {
		case 'validaEntrada':
			validaEntrada();
			break;
		case 'guardaUsuario': 
			guardaUsuario();
			# code...
			break;
		case 'bajaUsuario':
		bajaUsuario();
			# code...
			break;
		default:
			# code...
			break;
	}
?>