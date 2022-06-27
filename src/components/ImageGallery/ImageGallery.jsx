import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { StartSearch, ImageNotFound } from '../messageTitle/messageTitle';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

export default function ImageGallery({imageName}) {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [totalHits, setTotalHits] = useState(null);
    const [page, setPage] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [largeImage, setLargeImage] = useState('');
    const [imageTags, setImageTags] = useState('');

    const perPage = 12;

    useEffect(() => {
        if (!imageName) {
            return
        }

        // console.log('pre', page);
        const startSearshPage = 1; // примусово починаю з першої сторінки
        setLoader(true); // включаю лоадер
        setImages([]);
        fetch(`https://pixabay.com/api/?q=${imageName}&page=${startSearshPage}&key=27124011-562ac77f1fd2864e5ddfeb16c&image_type=photo&orientation=horizontal&per_page=${perPage}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }

                    return Promise.reject (
                        new Error(`Незнайдено зображень з ім'ям ${imageName}`)
                    )
                })
                .then(images => {
                    // console.log(images);
                    setPage(1); // кожен новий пошук починається з 1 сторінки
                    setSearchName(imageName);
                    setImages(images.hits);
                    setLoader(false); // виключаю лоадер після загрузки
                    setTotalHits(images.totalHits);  // загальна кількість картинок
                    // console.log('post', page);
                })
            .catch(error =>{
                setError(error);
                setLoader(false);
            })
    },[imageName]);
    

    useEffect(() => {
        if (!searchName) {
            return
        }
        setLoader(true); //включаю лоадер

        console.log('pre-page', page);
        fetch(`https://pixabay.com/api/?q=${searchName}&page=${page + 1}&key=27124011-562ac77f1fd2864e5ddfeb16c&image_type=photo&orientation=horizontal&per_page=${perPage}`)
            .then(response => {
                return response.json()
            })
            .then(images => {
                setImages(prevImages => [...prevImages, ...images.hits]); // додаю наступні сторінки до попердніх
                setLoader(false);
            })
            .catch(error => {
                setError(error);
                setLoader(false);
            })
    }, [page, searchName]);

    const morePageClick = () => {
        setPage(prevPage => prevPage + 1); // записую нову сторінку в стейдж
    };

    const galleryItemClick = (largeImage, imageTags) => {
        // console.log(imageTags);
        setLargeImage(largeImage);
        setImageTags(imageTags);

        toggleModal()
    }
    
    const toggleModal = () => {
        setShowModal(prevShowModal => !prevShowModal);
    }
        // const { imageName } = this.props;
    // const pages = totalHits / perPage; //рахую кількість сторінок

        return (
            <div className="s.container">
                {!imageName && <StartSearch/>}
                {totalHits === 0 && 
                    <ImageNotFound
                        name={ imageName}
                    />
                }
                {error && <h1>{error.message}</h1>}
                {loader && <Loader/> }
                {images && 
                    <ul className={s.gallery}>
                        {images.map(( image ) =>
                            <ImageGalleryItem
                                key={image.id}
                                image={image}
                                onClick={galleryItemClick}
                            />)}
                    </ul>
                }
                {page < totalHits / perPage &&
                    <Button
                        onClick={morePageClick}
                    />
                }
                {showModal &&
                    <Modal
                        url={largeImage}
                        alt={imageTags}
                        onClick={toggleModal}
                    />
                }
            </div>
        )
};

ImageGallery.propTypes = {
    images: PropTypes.array
}