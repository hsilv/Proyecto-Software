import PropTypes from 'prop-types'
import styles from './Comment.module.scss'

function Comment() {
    return (
        <div className={styles.container}>
            Comentario
            <span>Alguna imagen</span>
            <span>Perfil</span>
            <span>Calificación</span>
            <span>Denunciar</span>
        </div>
    );
}

Comment.propTypes = {}

export default Comment