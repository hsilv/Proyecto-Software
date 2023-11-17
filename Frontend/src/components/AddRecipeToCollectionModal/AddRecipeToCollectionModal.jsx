import React from "react";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";

function AddRecipeToCollectionModal({show, setCloseState}) {

    
  /*   const { userInfo } = useContext(SessionContext); */

  /*   const { getCollectionsByUser, resultCollectionsByUser } =
    useCollectionsByUser();

  const { postRecipeToColl } = useCollectionsByUser(); */

  
  /*   useEffect(() => {
    if (userInfo) {
      getCollectionsByUser(userInfo.idUser);
    }
  }, [userInfo]); */

    /*   const handleAddRecipe = (idColl, recipeID) => {
    postRecipeToColl(idColl, recipeID);
  }; */
  return <Modal show={show} title="Añadir a colección" setCloseState={setCloseState}></Modal>;
}

AddRecipeToCollectionModal.propTypes = {
  setCloseState: PropTypes.func,
  show: PropTypes.bool,
};

AddRecipeToCollectionModal.defaultProps = {
  setCloseState: () => {},
  show: false,
};

export default AddRecipeToCollectionModal;
