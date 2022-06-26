import s from './messageTitle.module.css'

export const StartSearch = () => {
    return (
        <h1 className={s.title}>Почніть пошук</h1>
    );
};

export const ImageNotFound = ({name }) => {
    return (
        <h1 className={s.title}>Не знайдено зображень з ім'ям <span className={s.name}>{name}</span></h1>
    )
}
