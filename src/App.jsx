import  React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Signin from './pages/Signin';

import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        
          <Routes>
            
            <Route path='/' element={<Home/>}></Route>
             <Route path='/about' element={<About/>}></Route>
             <Route path='/sign-in' element={<Signin/>}></Route>
             <Route path='/sign-up' element={<SignUp/>}></Route>
             <Route path='/profile' element={<Profile/>}></Route>
         
          </Routes>
        
      </BrowserRouter>
    </div>
  )
}

export default App
