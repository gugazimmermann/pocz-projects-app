import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { MenuProvider } from './context';
import './index.css';

ReactDOM.render(
  <StrictMode>
    <Router>
      <MenuProvider>
        <App />
      </MenuProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);
