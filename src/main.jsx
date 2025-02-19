import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './app/store.js';
// components
import App from './App.jsx'
// styles
import './style/index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </StrictMode>,
)
