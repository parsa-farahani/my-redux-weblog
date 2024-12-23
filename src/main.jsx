import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// components
import App from './App.jsx';
// rrd
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.jsx';
// Redux
import { Provider } from 'react-redux';
import store from './app/store.js';
// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
