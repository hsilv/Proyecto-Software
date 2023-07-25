import { useState } from "react";

function useLocalStorage(itemName, initialValue) {

    const localStorageItem = localStorage.getItem(itemName);

    let parsedItem;

    if(!localStorageItem){
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItem = initialValue;
    } else {
        parsedItem = JSON.parse(localStorageItem);
    }

    const [item, setItem] = useState(parsedItem);

    const saveItem = (newItem) => {
        localStorage.setItem(itemName, JSON.stringify(newItem));
        setItem(JSON.parse(localStorage.getItem(itemName)));
    }

    const deleteItem = () => {
        localStorage.removeItem(itemName);
        setItem(localStorage.getItem(itemName));
    }

    return {item, saveItem, deleteItem};
}

export { useLocalStorage };