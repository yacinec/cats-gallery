import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CatDetails from './CatDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CatDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});
