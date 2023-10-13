import PropTypes from 'prop-types'

function NewComment({idRecipe}) {
  return (
    <div>NewComment</div>
  )
}

NewComment.propTypes = {
    idRecipe: PropTypes.number.isRequired,
}

export default NewComment
