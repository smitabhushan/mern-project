import  React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Signin from './pages/Signin';

import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './component/Header';
import PrivateRoute from './component/PrivateRoute';
import ListingCreation from './pages/ListingCreation';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header/>
          <Routes>
            
            <Route path='/' element={<Home/>}></Route>
             <Route path='/about' element={<About/>}></Route>
             <Route path='/sign-in' element={<Signin/>}></Route>
             <Route path='/sign-up' element={<SignUp/>}></Route>
             <Route element={<PrivateRoute/>}>
             <Route path='/profile' element={<Profile/>}></Route>
             <Route path='/create-listing' element={<ListingCreation/>}></Route>
             </Route>
          </Routes>
        
      </BrowserRouter>
    </div>
  )
}

export default App
