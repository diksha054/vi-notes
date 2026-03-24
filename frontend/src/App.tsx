import Signup from './components/signup'
import Login from './components/login'
import Notes from './components/notes'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path = '/login' element = {<Login />} />   
        <Route path = '/notes' element={<Notes />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
