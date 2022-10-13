// import logo from './logo.svg';
import Navbar from './components/Navbar';
import Fav from './components/fav';
import { Home } from './components/Home';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/fav' element={<Fav/>} />
      </Routes>
    </Router>
  );
}

export default App;
