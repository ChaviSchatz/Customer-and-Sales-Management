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
import { EditInventory } from './final project/EditInventory';
import { UpdateItem } from './final project/UpdateItem';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <EditInventory></EditInventory> */}
        {/* <UpdateItem prop = {{description:"snood",code:"123",price:"111",colors:["red","black"]}}></UpdateItem> */}
        <Provider store={store}>
        <BrowserRouter>
          <Routes>
          <Route exact path="/edit-inventory" element={<EditInventory />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="signup" element={<Singup />} />
            <Route exact path="/home-page" element={<Home />} />
            <Route exact path="/helper/:comp" element={<Helper />} />

          </Routes>
        </BrowserRouter>
        {/* <Update></Update> */}
        </Provider> 
        
       
      </header>
    </div>
  );
}

export default App;
