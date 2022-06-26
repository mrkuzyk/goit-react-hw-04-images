import PropTypes from 'prop-types';
import s from './Button.module.css'

const Button = ({onClick}) => {
    return (
        <button
            type="button"
            id="load-more"
            onClick={onClick}
            className={s.btn}
        >
            Load more
        </button>
    );
};

export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired
};