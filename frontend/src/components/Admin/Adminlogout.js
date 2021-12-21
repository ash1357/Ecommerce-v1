import React from 'react';
import {useNavigate} from 'react-router-dom';
import Adminlogin from './Adminlogin'

const Adminlogout = () => {

    const navigate=useNavigate()

    navigate('/Adminlogin')

    return (
        <div>
            
        </div>
    )
}

export default Adminlogout
