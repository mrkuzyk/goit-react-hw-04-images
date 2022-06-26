import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css'

export default class Searchbar extends Component {
    state = {
        imageName: '',
    }

    handleNameChange = (e) => {
        this.setState({
            // стейт приймає значення з інпут
            imageName: e.currentTarget.value.toLowerCase()
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        // якщо пошук пустий, то помилку викидаю
        if (this.state.imageName.trim() === '') {
            alert('Ще раз таке зробиш, і я викличу поліцію');
            return
        };

        // onSubmit це назва пропсів, а не слухач подій
        this.props.onSubmit(this.state.imageName);
        // стераю стейт до пустого місця
        this.setState({ imageName: ''});
    };

    render() {
        return (
            <header className={s.searchbar}>
                <form onSubmit={ this.handleSubmit} className={s.searchForm}>
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
                            value={this.state.imageName}
                            onChange={this.handleNameChange}
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />
                    </label>
                </form>
            </header>
        );
    };
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

