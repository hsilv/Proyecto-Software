import React from "react";
import styles from './SearchPage.module.css';
import NavBar from "../../components/NavBar/NavBar";
import { GrMapLocation, GrList, GrAlarm } from "react-icons/gr";
import { useState } from "react";
import SearchResultsList from "../../components/SearchResult/SearchResult";
import { useParams, useNavigate } from "react-router-dom"


// Backend logic
const CountryList = [
    {value: "Italia", label:"Italia"},
    {value: "Argentina", label:"Argentina"},
    {value: "Tailandia", label:"Tailandia"},
    {value: "Cuba", label:"Cuba"},
]

const CategoryList = [
    {value: "Postres", label:"Postres"},
    {value: "Ensaladas", label:"Ensaladas"},
    {value: "Bebidas", label:"Bebidas"},
    {value: "Aperitivos", label:"Aperitivos"},
]

// Esta es fija
const TimeList = [
    {value: "Short", label:"< 0-5min"},
    {value: "Medium", label:"5-30min"},
    {value: "Long", label:"> 1hrs"},
]


function SearchPage() {
    let { search } = useParams();
    const [activeCategories, setActiveCategories] = useState([]);

    const handleCategoryClick = (value) => {
        if (activeCategories.includes(value)) {
            setActiveCategories(activeCategories.filter(category => category !== value));
        } else {
            setActiveCategories([...activeCategories, value]);
        }
    };

    const filterCategory = ( options ) => {
        return (
            <div className={styles.CountryOptions}>
                    {options.map((x,i) => <label key={i}>
                        <input
                        type="checkbox"
                        name="lang"
                        value={x.value}
                        /> {x.label}
                    </label>)}
            </div>
        )
    }

    return(
        <>
          <NavBar />
          <div className={styles.SearchPageContainer}>
            <div className={styles.FiltersContainer}>
                <h1>Filters</h1>
                <div className={styles.FiltersCountryContainer}>
                    <div className={styles.FiltersCountryContainerInfo}>
                        <GrMapLocation fontSize={'1.5rem'} />
                        <h2>Country</h2>
                    </div>
                    {filterCategory(CountryList)}
                </div>
                <div className={styles.FiltersCountryContainer}>
                    <div className={styles.FiltersCountryContainerInfo}>
                        <GrList fontSize={'1.5rem'} />
                        <h2>Category</h2>
                    </div>
                    <div className={styles.CountryOptions}>
                        {CategoryList.map((x, i) => (
                            <label key={i}>
                                <button
                                    className={activeCategories.includes(x.value) ? styles.activeButton : ''}
                                    onClick={() => handleCategoryClick(x.value)}
                                >
                                    {x.label}
                                </button>
                            </label>
                        ))}
                    </div>
                </div>
                <div className={styles.FiltersCountryContainer}>
                    <div className={styles.FiltersCountryContainerInfo}>
                        <GrAlarm fontSize={'1.5rem'} />
                        <h2>Time</h2>
                    </div>
                    {filterCategory(TimeList)}
                </div>
            </div>

            <div className={styles.ResultsContainer}>
                <h1>We've found xx results for "{search}"</h1>
                <div className={styles.ResultListContainer}>
                    <SearchResultsList />
                </div>
            </div>
          </div>
        </>
    );
};

export default SearchPage;