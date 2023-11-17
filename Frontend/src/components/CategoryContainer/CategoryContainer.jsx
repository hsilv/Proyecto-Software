import React, { useContext, useEffect, useState } from "react";
import styles from "./CategoryContainer.module.css";
import Joi from "joi";
import useForm from "../../hooks/useForm";
import CategoryItem from "./CategoryItem";
import Input from "../../components/Input/Input";

const schema = Joi.object({
    category: Joi.string().min(3).max(30).required(),
  });

function CategoryContainer({ callback }) {
    const [categories, setCategories] = useState([]);

    const form = useForm(schema, {
        category: "",
      });

    const addCategory = (newCategory) => {
        if(form.validate() && categories.length < 6){
            setCategories([...categories, newCategory]);
            form.setValue("category", "");
        };
        callback(categories);
    };

    const removeCategory = (elemId) => {
        setCategories(categories.filter((element, id) => elemId != id));
        callback(categories);
    }

    useEffect(() => {
        callback(categories)
    }, [categories]);

    return (
        <>
          <div className={styles.categoryContainer}>
            {categories.map((category, id) => {
                return (
                    <CategoryItem name={category} id={id} removeCallback={removeCategory} />
                )
            })}
            <div className={styles.formContainer}>
                <Input
                    value={form.values.category}
                    onChange={form.onChange("category")}
                    required
                    name="newCategory"
                    label="Add Category"
                    type="text"
                />
                <button
                    className={styles.addBtn}
                    disabled={!(form.values.category.length > 2)}
                    onClick={() => {addCategory(form.values.category)}}>
                    +
                </button>
            </div>
          </div>
        </>
      );
};

export default CategoryContainer;