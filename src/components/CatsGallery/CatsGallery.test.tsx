import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CatsGallery from './CatsGallery';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CatsGallery />, div);
  ReactDOM.unmountComponentAtNode(div);
});
