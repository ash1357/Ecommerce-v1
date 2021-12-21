import React,{useContext,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import { UserContext } from '../../App';

const Logout = () => {

    const {state,dispatch}=useContext(UserContext);

    const history=useNavigate();

    useEffect(()=>{
        fetch('/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:"USER",payload:false})
            // history.push('/login',{replace:true});
            localStorage.clear()
            if(res.status != 200){
                const error=new Error(res.error)
                throw error;
            }
            history('/Userlogin');
        }).catch((err)=>{
            console.log(err);
        })
    })

    return (
        <>
        </>
    )
}

export default Logout