import React, { useContext, useEffect, useState } from "react";
import styles from "./CreateRecipe.module.css";
import Joi from "joi";
import CategoryContainer from "../../components/CategoryContainer/CategoryContainer";
import Input from "../../components/Input/Input";
import useForm from "../../hooks/useForm";
import { SessionContext } from "../../context/sessionContext";
import IngredientsContainer from "../../components/IngredientsContainer/IngredientsContainer";
import StepsContainer from "../../components/StepsContainer/StepsContainer";
import AnyButton from "../../components/AnyButton/AnyButton";

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
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [recipeImage, setRecipeImage] = useState(null);
  const [validForm, setValidForm] = useState(false);

  const form = useForm(schema, {
    title:"",
    desc: "",
    country:"",
    time: "",
    portions: "",
    calories: "",
  });

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    setValidForm(form.validate());
  }, [form.values])

  const postRecipe = () => {
    const date = new Date();
    //post
  }

  return (
    <>
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
            className={styles.fileInput}
            onChange={(event) => {setRecipeImage(event.target.files[0])}}
          />

          <label htmlFor="descInput" className={styles.descLabel}><span className={styles.descLabelSpan}>Description*</span></label>
          <textarea
            name="descInput"
            id="descInput"
            rows="5"
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
          />

          <h1 className={styles.sectionHeader}>Nutrition Facts</h1>
          <Input
            value={form.values.portions}
            onChange={form.onChange("portions")}
            name="portions"
            label="portions"
            type="number"
            required
          />
          <Input
            value={form.values.calories}
            onChange={form.onChange("calories")}
            name="calories"
            label="calories per portion"
            type="number"
            required
          />

          <h1 className={styles.sectionHeader}>Categories</h1>
          <CategoryContainer callback={setCategories} />

          <h1 className={styles.sectionHeader}>Ingredients</h1>
          <IngredientsContainer callback={setIngredients} />

          <h1 className={styles.sectionHeader}>Steps</h1>
          <StepsContainer callback={setSteps} />
        </div>

        <button
          className={styles.publishBtn}
          disabled={validForm && categories.length > 0 && ingredients.length > 0 && steps.length > 0 && recipeImage != null}
          onClick={() => {postRecipe()}}>
            Publish Recipe
        </button>

      </div>
    </>
  );
}

export default CreateRecipe;