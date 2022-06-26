import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.modalClose); // слухач на клавіатуру
    };
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.modalClose); // вимикаю слухач щоб не висів
    };
    
    modalClose = event => {
        // якщо натиснути еск чи клачнути на фон, то пропсами передасться функція закриття модалки
        if (event.code === 'Escape' || event.target === event.currentTarget) {
            this.props.onClick();
        };
    };

    render() {
        // console.log(this.props);
        const { url, alt } = this.props

        return (
            <div className={s.overlay} onClick={this.modalClose}>
                <div className={s.modal}>
                    <img src={url} alt={alt} />
                </div>
            </div>
        );
    };
};

export default Modal;

Modal.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}