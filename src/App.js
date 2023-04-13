import logo from './logo.svg';
import './App.css';
import { Login } from './final project/Login';
import { Singup } from './final project/Signup';
import { Home } from './final project/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Home></Home> */}
        {/* <Singup></Singup> */}
        {/* <Login></Login> */}

        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
