import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar'
import s from './App.module.css'

export class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({imageName})
  };

  render() {
    return (
      <div className={s.App}>
          <Searchbar
            // onSubmit це пропси, а не слухач подій
            onSubmit={this.handleFormSubmit}
          />
        <ImageGallery imageName={ this.state.imageName} />
      </div>
    )
  };
};
