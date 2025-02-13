import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css'
import App from './App.jsx'
import CounterContextProvider from './Context/CounterContext.jsx';
import TokenContextProvider from './Context/TokenContext.jsx';
import CartProvider from './Context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CounterContextProvider>
      <CartProvider>
        <TokenContextProvider>
          <App />
        </TokenContextProvider>
      </CartProvider>
    </CounterContextProvider>
  </StrictMode>,
)
