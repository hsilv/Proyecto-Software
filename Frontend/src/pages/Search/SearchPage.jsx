import React, { useEffect } from "react";
import styles from './SearchPage.module.css';
import NavBar from "../../components/NavBar/NavBar";
import { TbMap2, TbLayoutList, TbAlarm} from "react-icons/tb";
import { useState } from "react";
import SearchResultsList from "../../components/SearchResult/SearchResult";
import { useParams, useNavigate } from "react-router-dom"
import { useAPI } from "../../hooks/useAPI";


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
    const { fetchAPI } = useAPI();
    const [searchResults, setSearchResults] = useState([]);
    const [activeCategories, setActiveCategories] = useState([]);

    const handleCategoryClick = (value) => {
        if (activeCategories.includes(value)) {
            setActiveCategories(activeCategories.filter(category => category !== value));
        } else {
            setActiveCategories([...activeCategories, value]);
        }
    };

    const getSearchResults = async () => {
        try {
          const res = await fetchAPI({
            method: 'GET',
            route: `search?text=${search}`,
            body: null,
            log: true,
            showReply: true,
          });
          setSearchResults(res);
        } catch (error) {
          console.error("Error fetching recipes: ", error);
        }
    };

    useEffect(() => {
        getSearchResults();
    }, [])

    useEffect(() => {}, [searchResults])
    useEffect(() => {getSearchResults()},[search]) 

    const filterCategoryBuilder = ( options ) => {
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
                        <TbMap2 fontSize={'1.5rem'} />
                        <h2>Country</h2>
                    </div>
                    {filterCategoryBuilder(CountryList)}
                </div>
                <div className={styles.FiltersCountryContainer}>
                    <div className={styles.FiltersCountryContainerInfo}>
                        <TbLayoutList fontSize={'1.5rem'} />
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
                        <TbAlarm fontSize={'1.5rem'} />
                        <h2>Duration</h2>
                    </div>
                    {filterCategoryBuilder(TimeList)}
                </div>
            </div>

            <div className={styles.ResultsContainer}>
                <h1>We've found {searchResults ? searchResults.length : 'no'} results for "{search}"</h1>
                <div className={styles.ResultListContainer}>
                    <SearchResultsList data={searchResults ? searchResults : []}/>
                </div>
            </div>
          </div>
        </>
    );
};

export default SearchPage;