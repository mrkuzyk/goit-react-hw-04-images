import { useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar'
import s from './App.module.css'

export function App() {
  const [imageName, setImageName] = useState('');

  const handleFormSubmit = imageName => {
    setImageName(imageName);
  };

  return (
    <div className={s.App}>
      <Searchbar
        // onSubmit це пропси, а не слухач подій
        onSubmit={handleFormSubmit}
      />
      <ImageGallery imageName={imageName} />
    </div>
  );
};
