import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet  , Navigate} from 'react-router-dom';
// in order to show the children of privateRoute , we use Outlet component
const PrivateRoute = () => {
    const {currentUser}=useSelector(state=>state.user)
    return  currentUser ? <Outlet/> : <Navigate to='/sign-in'/>
}

export default PrivateRoute
