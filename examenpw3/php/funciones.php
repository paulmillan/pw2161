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
function guardaAlmacen()
{
  $idAlmacen=GetSQLValueString($_POST["txtidAlmacen"],"long");
  $Nombre=GetSQLValueString($_POST["txtNombre"],"text");
  $Direccion_1=GetSQLValueString($_POST["txtDireccion_1"],"text");
  $Direccion_2=GetSQLValueString($_POST["txtDireccion_2"],"text");
  $CP=GetSQLValueString($_POST["txtCP"],"text");
  $Localidad=GetSQLValueString($_POST["txtLocalidad"],"text");
  $Provincia=GetSQLValueString($_POST["txtProvincia"],"text");
  $respuesta=false;
  //Conecto al servidor de BD
  //Servidor, usuario, clave
  $conexion =mysql_connect("localhost","root","");
  //Seleccionar la BD
  mysql_select_db("examenpw");
  $guarda = sprintf("insert into almacenes values (%d,%s,%s,%s,%s,%s,%s)",$idAlmacen,$Nombre,$Direccion_1,$Direccion_2,$CP,$Localidad,$Provincia);
  mysql_query($guarda);
  if(mysql_affected_rows()>0){
    $respuesta=true;
  }
  $salidaJSON = array('respuesta' => $respuesta);
  //Devolvemos el resultado al JS
  print json_encode($salidaJSON);
}

$accion = $_POST["accion"];
//Menu principal
switch ($accion) {
  case 'guardaAlmacen':
    guardaAlmacen();
  break;
  default:
    # code...
  break;
}
?>