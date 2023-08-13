import React from "react";
import styles from './SearchBar.module.css';
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ keyword, onChange, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.SearchbarContainer}
        key="search-bar"
        value={keyword}
        placeholder="Search something"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={onSearch}>
        <BiSearch color="white" fontSize={'1.2rem'} />
      </button>
    </div>
  );
}

export default SearchBar;
