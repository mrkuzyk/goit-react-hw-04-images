import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

function Modal({onClick, url, alt}) {

    useEffect(() => {
        const modalCloseEsc = event => {
            // якщо натиснути еск чи клачнути на фон, то пропсами передасться функція закриття модалки
            if (event.code === 'Escape') {
                onClick();
            };
        };

        window.addEventListener('keydown', modalCloseEsc); // слухач на клавіатуру

        return () => {
            window.removeEventListener('keydown', modalCloseEsc); // вимикаю слухач щоб не висів
        }
    }, [onClick]);
    
    const modalClose = e => {
        // якщо натиснути  на фон, то пропсами передасться функція закриття модалки
        if (e.target === e.currentTarget) {
            onClick();
        }
    };

    return (
        <div className={s.overlay} onClick={modalClose}>
            <div className={s.modal}>
                <img src={url} alt={alt} />
            </div>
        </div>
    );
};

export default Modal;

Modal.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}