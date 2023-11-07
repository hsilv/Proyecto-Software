import React, { useContext, useEffect, useState } from "react";
import styles from "./CreateRecipe.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { SessionContext } from "../../context/sessionContext";

function CreateRecipe() {
  const { checkSession, userInfo } = useContext(SessionContext);

  useEffect(() => {
    checkSession();
  }, []);

  //TODO:
  //titulo
  //desc
  //categorias -> revisar si categorias ingresadas ya existen y obtener sus IDs
    //Si no existen, crear una entrada en la tabla de categorias y obtener sus IDs
    //Crear entradas para cada categoria ingresada en tabla de receta_categoria (recetaID, categoriaID)
  //imagen (url)
  //Pais
  //tiempo
  //porciones
  //calorias/porcion
  //ingredientes { nombre, cantidad }
  //pasos [ paso {url, desc} ] -> se deben enumerar los pasos automaticamente a la hora de crear la receta
  //Fecha de creación

  return (
    <>
      <NavBar />
      <div className={styles.createRecipeContainer}>
        <div className={styles.formContainer}></div>
      </div>
    </>
  );
}

export default CreateRecipe;