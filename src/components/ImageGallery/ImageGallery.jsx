import { useState, useEffect} from "react";
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { StartSearch } from '../messageTitle/messageTitle';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

export default function ImageGallery({imageName}) {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [totalHits, setTotalHits] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const [searchName, setSearchName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [largeImage, setLargeImage] = useState('');
    const [imageTags, setImageTags] = useState('');

    useEffect(() => {
        if (!imageName) {
            return
        }

        // якщо попереднє ім'я змінене то ставлю першу сторінку і очищую масив картинок
        if (imageName !== searchName) {
            setPage(1);
            setImages([]);
        }

        // console.log('pre', images);
        // const startSearshPage = 1; // примусово починаю з першої сторінки
        setLoader(true); // включаю лоадер
        fetch(`https://pixabay.com/api/?q=${imageName}&page=${page}&key=27124011-562ac77f1fd2864e5ddfeb16c&image_type=photo&orientation=horizontal&per_page=${perPage}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }

                    return Promise.reject (
                        new Error(`Незнайдено зображень з ім'ям ${imageName}. Перезавантажте сторінку і спробуйте ще раз!`)
                    )
                })
            .then(images => {
                // console.log('рендер');
                if (page > 1) {
                    //якщо це не перша сторнка, значить натиснута кнопка завантажити більше
                    setImages(prevImages => [...prevImages, ...images.hits]); // додаю наступні сторінки до попердніх
                    setLoader(false);
                } else {
                    setPage(1);
                    setSearchName(imageName);
                    setImages(images.hits);
                    setLoader(false); // виключаю лоадер після загрузки
                    setTotalHits(images.totalHits);  // загальна кількість картинок
                    setPerPage(images.hits.length)
                }
            })
            .catch(error =>{
                setError(error);
                setLoader(false);
            })
    },[imageName, page, perPage]);

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

        return (
            <div className="s.container">
                {!imageName && <StartSearch/>}
                {/* {totalHits === 0 && 
                    <ImageNotFound
                        name={ imageName}
                    />
                } */}
                {error && <h1 className={s.error}>{error.message}</h1>}
                {loader && <Loader/> }
                {images && !error && 
                    <ul className={s.gallery}>
                        {images.map(( image ) =>
                            <ImageGalleryItem
                                key={image.id}
                                image={image}
                                onClick={galleryItemClick}
                            />)}
                    </ul>
                }
                {page < totalHits / perPage && !loader &&
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