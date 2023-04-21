import logo from './logo.svg';
import './App.css';
import { Login } from './final project/Login';
import { Singup } from './final project/Signup';
import { Home } from './final project/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './final project/redax/store';
import {Update} from './final project/Update';
import { Helper } from './final project/Helper';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="signup" element={<Singup />} />
            <Route exact path="/home-page" element={<Home />} />
            <Route exact path="/helper" element={<Helper />} />
          </Routes>
        </BrowserRouter>
        {/* <Update></Update> */}
        </Provider> 
        
       
      </header>
    </div>
  );
}

export default App;
