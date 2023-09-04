import { useState } from "react";

function useLocalStorage(itemName, initialValue, isText = false) {
  const localStorageItem = localStorage.getItem(itemName);

  let parsedItem;

  if (!localStorageItem) {
    if (isText) {
      localStorage.setItem(itemName, initialValue);
    } else {
      localStorage.setItem(itemName, JSON.stringify(initialValue));
    }
    parsedItem = initialValue;
  } else {
    if(isText){
        parsedItem = localStorageItem;
    }else{
        parsedItem = parsedItem = JSON.parse(localStorageItem);
    }
  }

  const [item, setItem] = useState(parsedItem);

  const saveItem = (newItem) => {
    if(isText){
        localStorage.setItem(itemName, newItem);
        setItem(localStorage.getItem(itemName))
    }else{
        localStorage.setItem(itemName, JSON.stringify(newItem));
        setItem(JSON.parse(localStorage.getItem(itemName)));
    }
  };

  const deleteItem = () => {
    localStorage.removeItem(itemName);
    setItem(localStorage.getItem(itemName));
  };

  return { item, saveItem, deleteItem };
}

export { useLocalStorage };
