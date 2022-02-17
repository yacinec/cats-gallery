import React from 'react';
import ReactDOM from 'react-dom';
import CatCard from './CatCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CatCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
