import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CatCard from './CatCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <CatCard name='Toto' picturePath='https://picsum.photos/200' />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
