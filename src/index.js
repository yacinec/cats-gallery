import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import CatsGallery from './components/CatsGallery/CatsGallery';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CatDetails from './components/CatDetails/CatDetails';
import { AppProvider } from './context';

ReactDOM.render(
  <AppProvider>
    <div className='title'>
      <h1>Cats gallery</h1>
    </div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CatsGallery />} />
        <Route path='/cat/:catId' element={<CatDetails />} />
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>Error 404</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </AppProvider>,
  document.getElementById('root')
);
