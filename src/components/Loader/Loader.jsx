import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
    return (
        <div className={s.loader}>
            <ThreeDots color="#3f51b5" height={80} width={80} />
        </div>
    );
};

export default Loader;