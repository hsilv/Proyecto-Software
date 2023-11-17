import React, { useContext, useEffect, useState } from "react";
import styles from "./IngredientsContainer.module.css";
import Joi from "joi";
import useForm from "../../hooks/useForm";
import IngredientItem from "./IngredientItem";
import Input from "../../components/Input/Input";

const schema = Joi.object({
    ingredientName: Joi.string().min(3).max(30).required(),
    ingredientAmount: Joi.string().min(1).max(15).required(),
  });

function IngredientsContainer({ callback }) {
    const [ingredients, setIngredients] = useState([]);

    const form = useForm(schema, {
        ingredientName: "",
        ingredientAmount: "",
      });

    const addIngredient = (newIngredient) => {
        if(form.validate()){
            setIngredients([...ingredients, newIngredient]);
            form.setValue("ingredientName", "");
            form.setValue("ingredientAmount", "");
        };
        callback(ingredients);
        console.log(ingredients)
    };

    const removeIngredient = (elemId) => {
        setIngredients(ingredients.filter((element, id) => elemId != id));
        callback(ingredients);
    }

    return (
        <>
          <div className={styles.ingredientsContainer}>
            {ingredients.map((ingredient, id) => {
                return (
                    <IngredientItem ingredient={ingredient} id={id} removeCallback={removeIngredient} />
                )
            })}
            <div className={styles.formContainer}>
                <Input
                    value={form.values.ingredientName}
                    onChange={form.onChange("ingredientName")}
                    name="ingredientName"
                    label="Ingredient"
                    type="text"
                    required
                />
                <div style={{marginLeft: "1rem"}}></div>
                <Input
                    value={form.values.ingredientAmount}
                    onChange={form.onChange("ingredientAmount")}
                    name="ingredientAmount"
                    label="Amount"
                    type="text"
                    required
                />
                <button
                    className={styles.addBtn}
                    disabled={!(form.values.ingredientName.length > 2 && form.values.ingredientAmount.length > 1)}
                    onClick={() => {addIngredient([form.values.ingredientName, form.values.ingredientAmount])}}>
                    +
                </button>
            </div>
          </div>
        </>
      );
};

export default IngredientsContainer;