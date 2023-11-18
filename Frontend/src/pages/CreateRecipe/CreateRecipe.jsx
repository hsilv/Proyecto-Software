import React, { useContext, useEffect, useState } from "react";
import styles from "./CreateRecipe.module.css";
import Joi from "joi";
import CategoryContainer from "../../components/CategoryContainer/CategoryContainer";
import Input from "../../components/Input/Input";
import useForm from "../../hooks/useForm";
import { SessionContext } from "../../context/sessionContext";
import IngredientsContainer from "../../components/IngredientsContainer/IngredientsContainer";
import StepsContainer from "../../components/StepsContainer/StepsContainer";
import Button from "../../components/Button/Button";
import { useAPI } from "../../hooks/useAPI";
import { useCategories } from "../../hooks/api/useCategories";

const schema = Joi.object({
  title: Joi.string().min(3).max(60).required(),
  desc: Joi.string().min(3).max(400).required(),
  country: Joi.string().min(3).max(50).required(),
  time: Joi.number().integer().positive().min(1).required(),
  portions: Joi.number().integer().positive().min(1).required(),
  calories: Joi.number().integer().positive().min(1).required(),
});

function CreateRecipe() {
  const { checkSession, userInfo } = useContext(SessionContext);
  const { fetchAPI, error, loading, result } = useAPI();
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [recipeImage, setRecipeImage] = useState(null);
  const [validForm, setValidForm] = useState(false);
  const { getCategories, resultCategories: categoriesApi } = useCategories();

  const form = useForm(schema, {
    title:"",
    desc: "",
    country:"",
    time: "",
    portions: "",
    calories: "",
  });

  const createRecipe = async () => {
    console.log("post")
    const res = await fetchAPI({
        method: 'POST',
        route: 'recipe/postRecipe',
        body: JSON.stringify({
            authorId: userInfo.idUser,
            name: form.values.title,
            desc: form.values.desc,
            country: form.values.country,
            time: form.values.time,
            ingredients: ingredients.map((ingredient) => "(" + ingredient[0] + ", " + ingredient[1] + ")"),
            portions: form.values.portions,
            calories: form.values.calories,
            steps: steps,
            categories: categories,
            // imagen?
        }),
        log: true,
        showReply: true,
    });

    
  }

  useEffect(() => {
    checkSession();
    console.table(userInfo)
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    console.log(categoriesApi)
  }, [categoriesApi])

  useEffect(() => {
    setValidForm(form.validate());
  }, [form.values]);

  const postRecipe = () => {
    console.log("post");
    createRecipe();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.createRecipeContainer}>
        <div className={styles.formContainer}>
          <h1 className={styles.sectionHeader}>Recipe Overview</h1>
          <Input
            value={form.values.title}
            onChange={form.onChange("title")}
            name="title"
            label="Recipe Name"
            type="text"
            required
          />

          <label htmlFor="recipeImg" className={styles.descLabel}><span className={styles.descLabelSpan}>Set image*</span></label>
          <input
            type="file"
            id="recipeImg"
            name="recipeImg"
            required
            className={styles.fileInput}
            onChange={(event) => {setRecipeImage(event.target.files[0])}}
          />

          <label htmlFor="descInput" className={styles.descLabel}><span className={styles.descLabelSpan}>Description</span></label>
          <textarea
            name="descInput"
            id="descInput"
            rows="5"
            required
            value={form.values.desc}
            onChange={form.onChange("desc")}
            className={styles.descInput}
            maxLength={400}
          />
          <Input
            value={form.values.country}
            onChange={form.onChange("country")}
            name="country"
            label="Country of Origin"
            type="text"
            required
          />
          <Input
            value={form.values.time}
            onChange={form.onChange("time")}
            name="time"
            label="Time (minutes)"
            type="number"
            required
            min="1"
          />

          <h1 className={styles.sectionHeader}>Nutrition Facts</h1>
          <Input
            value={form.values.portions}
            onChange={form.onChange("portions")}
            name="portions"
            label="portions"
            type="number"
            required
            min="1"
          />
          <Input
            value={form.values.calories}
            onChange={form.onChange("calories")}
            name="calories"
            label="calories per portion"
            type="number"
            required
            min="0"
          />

          <h1 className={styles.sectionHeader}>Categories</h1>
          <CategoryContainer categoriesApi={categoriesApi} callback={setCategories} />

          <h1 className={styles.sectionHeader}>Ingredients</h1>
          <IngredientsContainer callback={setIngredients} />

          <h1 className={styles.sectionHeader}>Steps</h1>
          <StepsContainer callback={setSteps} />
        </div>

        <Button
          className={styles.publishBtn}
          disabled={!form.values.title || 
            !form.values.desc || 
            !form.values.country || 
            !form.values.time || 
            !form.values.portions || 
            !form.values.calories ||
            recipeImage == null}
          onClick={() => {
            postRecipe();
          }}
        >
          Publish Recipe
        </Button>
      </div>
    </div>
  );
}

export default CreateRecipe;
