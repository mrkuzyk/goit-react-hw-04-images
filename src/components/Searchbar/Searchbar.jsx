import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css'

export default function Searchbar({onSubmit}) {
    const [imageName, setImageName] = useState('');

    const handleNameChange = (e) => {
        // стейт приймає значення з інпут
        setImageName(e.currentTarget.value.toLowerCase())
    };

    const handleSubmit = e => {
        e.preventDefault();

        // якщо пошук пустий, то помилку викидаю
        if (imageName.trim() === '') {
            alert('Ще раз таке зробиш, і я викличу поліцію');
            return
        };

        // onSubmit це назва пропсів, а не слухач подій
        onSubmit(imageName);
        // стераю стейт до пустого місця
        setImageName('');
    };

    return (
        <header className={s.searchbar}>
            <form onSubmit={ handleSubmit} className={s.searchForm}>
                    <button
                        type="submit"
                        className={s.button}
                    >
                        <span className={s.buttonLabel}>Search</span>
                    </button>

                <label>
                    <input
                        className={s.input}
                        name="imageName"
                        type="text"
                        value={imageName}
                        onChange={handleNameChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </label>
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

