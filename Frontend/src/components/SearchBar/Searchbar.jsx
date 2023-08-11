import React from "react";
import styles from './Searchbar.module.css';

const SearchBar = ({ keyword, onChange, onEnter }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onEnter(); 
    }
  };

  return (
    <input
      className={styles.SearchbarContainer}
      key="search-bar"
      value={keyword}
      placeholder="Search something"
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyPress} 
    />
  );
}

export default SearchBar;
