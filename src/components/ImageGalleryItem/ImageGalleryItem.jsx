import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ image:{ id, webformatURL, tags, largeImageURL}, onClick }) => {
    // console.log(image);
    // const { id, webformatURL, tags} = image;
    return (
        <li key={id} className={s.galleryItem} >
            <img src={webformatURL} alt={tags} className={ s.img} onClick={()=> onClick(largeImageURL, tags)}/>
        </li>
    );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    image: PropTypes.object.isRequired
}
