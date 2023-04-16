import logo from './logo.svg';
import './App.css';
import { Login } from './final project/Login';
import { Singup } from './final project/Signup';
import { Home } from './final project/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './final project/redax/store';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="Signup" element={<Singup />} />
            <Route exact path="/home/:index" element={<Home />} />
          </Routes>
        </BrowserRouter>
        </Provider>
       
      </header>
    </div>
  );
}

export default App;
