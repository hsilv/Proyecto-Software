import React, { useContext, useEffect, useState } from "react";
import styles from "./CategoryContainer.module.css";
import Joi from "joi";
import useForm from "../../hooks/useForm";
import CategoryItem from "./CategoryItem";
import Input from "../../components/Input/Input";

const schema = Joi.object({
    category: Joi.string().min(3).max(30).required(),
  });

function CategoryContainer({ callback, categoriesApi }) {
    const [categories, setCategories] = useState([]);

    const form = useForm(schema, {
        category: "",
      });

    const addCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
        callback(categories);
    };

    const removeCategory = (elemId) => {
        setCategories(categories.filter((element, id) => elemId != id));
        callback(categories);
    }

    useEffect(() => {
        callback(categories)
    }, [categories]);

    const [selected, setSelected] = useState(null);

    const handleChange = (selectedOption) => {
      setSelected(selectedOption.target.value);
      addCategory(selectedOption.target.value)
    };

    return (
        <>
          <div className={styles.categoryContainer}>
            {categories.map((category, id) => {
                return (
                    <CategoryItem name={category} id={id} removeCallback={removeCategory} />
                )
            })}
            <div className={styles.formContainer}>
            <label style={{fontFamily: "League Spartan, sans-serif"}} for="categories">Choose a category:&nbsp;</label>
            {categoriesApi && (<select style={{fontFamily: "League Spartan, sans-serif"}} onChange={handleChange} autoFocus={true} name="categories" id="categories">
                {categoriesApi.map((category) => {
                    if(!categories.includes(category.categoria)){   
                        return(<option value={category.categoria}>{category.categoria}</option>)
                    }
                })}
            </select>)}
            </div>
          </div>
        </>
      );
};

export default CategoryContainer;