import { Component } from "react";
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { StartSearch, ImageNotFound } from '../messageTitle/messageTitle';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

export default class ImageGallery extends Component{
    state = {
        images: [],
        error: null,
        loader: false,
        totalHits: null,
        page: 1,
        perPage: 12,
        searchName: '',
        showModal: false,
        largeImage: '',
        imageTags: '',
    }

    componentDidUpdate(prevProps, prevState) {
        const {perPage} = this.state;
        const prevName = prevProps.imageName; // значення попереднього пошуку
        const nextName = this.props.imageName; // значення теперішнього пошуку
        const startSearshPage = 1; // примусово починаю з першої сторінки

        
        // якщо попередній пошук відрізняється він наступного то ми шукаємо
        if (prevName !== nextName) {
            // this.setState({status: 'pending'}) //включаю лоадер
            this.setState({
                loader: true, // включаю лоадер
                images: [], // очищую масив картинок
            })
            fetch(`https://pixabay.com/api/?q=${nextName}&page=${startSearshPage}&key=27124011-562ac77f1fd2864e5ddfeb16c&image_type=photo&orientation=horizontal&per_page=${perPage}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }

                    return Promise.reject (
                        new Error(`Незнайдено зображень з ім'ям ${nextName}`)
                    )
                })
                .then(images => {
                    // console.log(images);
                    this.setState(prevState => ({
                        searchName: nextName,
                        images: images.hits,
                        // status: 'resolved',
                        loader: false, // виключаю лоадер після загрузки
                        totalHits: images.totalHits, // загальна кількість картинок
                        page: 1 // кожен новий пошук починається з 1 сторінки

                        }))
                })
                .catch(error => this.setState({
                    error,
                    // status: 'rejected',
                    loader: false
                }))
        };
    };

    morePageClick = () => {
        const {searchName, page, perPage} = this.state;
        
        // this.setState({ status: 'pending' }) 
        this.setState({loader: true}) //включаю лоадер
        
        fetch(`https://pixabay.com/api/?q=${searchName}&page=${page +1}&key=27124011-562ac77f1fd2864e5ddfeb16c&image_type=photo&orientation=horizontal&per_page=${perPage}`)
            .then(response => {
                    return response.json()
            })
            .then(images => {
                this.setState(prevState => ({
                    images: [...prevState.images, ...images.hits], // додаю наступні сторінки до попердніх
                    // status: 'resolved',
                    loader: false,
                    page: prevState.page +1 // записую нову сторінку в стейдж
                }))
            })
            .catch(error => this.setState({
                error,
                // status: 'rejected'
                loader: false
            }))
    };

    galleryItemClick = (largeImage, imageTags) => {
        // console.log(imageTags);
        this.setState({
            largeImage, //приймаю і записую велику картинку
            imageTags //приймаю і записую опис
        })
        this.toggleModal()
    }
    
    toggleModal = () => {
        this.setState(state => ({
            showModal: !state.showModal
        }))
    }

    render() {
        const { imageName } = this.props;
        const { error, images, totalHits, perPage, page, loader, showModal, largeImage, imageTags} = this.state;
        const pages = totalHits / perPage; //рахую кількість сторінок

        return (
            <div className="s.container">
                {!imageName && <StartSearch/>}
                {totalHits === 0 && 
                    <ImageNotFound
                        name={ this.props.imageName}
                    />
                }
                {error && <h1>{error.message}</h1>}
                {loader && <Loader/> }
                {this.state.images && 
                    <ul className={s.gallery}>
                        {images.map(( image ) =>
                            <ImageGalleryItem
                                key={image.id}
                                image={image}
                                onClick={this.galleryItemClick}
                            />)}
                    </ul>
                }
                {page < pages &&
                    <Button
                        onClick={this.morePageClick}
                    />
                }
                {showModal &&
                    <Modal
                        url={largeImage}
                        alt={imageTags}
                        onClick={this.toggleModal}
                    />
                }
            </div>
        )
    };
};

ImageGallery.propTypes = {
    images: PropTypes.array
}