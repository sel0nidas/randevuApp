//import logo from './logo.svg';
import './Login.css';
import Login from './Login'
// Required imports from the example.
import React, { useContext, useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import GlobalContext from './GlobalContext';

import {FormControl, Input, FormHelperText, InputLabel} from '@mui/material';

function App() {
   
   const navigate = useNavigate();
   const [UserName, setUserName] = React.useState('');
   const [Password, setPassword] = React.useState('');
   
   const {userId, setUserId} = useContext(GlobalContext);
   const {userType, setUserType} = useContext(GlobalContext);

   const [formData, setFormData] = useState({
      name: '',
      password: ''
   })


   const handleInputChange = (e) =>{
      const {name, value} = e.target;

      setFormData((formData)=>({
         ...formData,
         [name]: value,
      }))

   }

   
   console.log(localStorage.getItem('formData'));

   useEffect(() => {
      if(localStorage.getItem('formData') != null){
         navigate("/calendar");
      }
   }, []);



  useEffect(() => {
   fetch('http://localhost:52463/api/user/',{
      method: 'get'
   })
      .then((res) => res.json())
      .then((data) => {
         console.log(data);   
      })
      .catch((err) => {
         console.log(err.message);
      });
   }, []);

   async function HandleSubmit (e) {
      e.preventDefault();
      console.log("submit is triggered...")
      const url = "http://localhost:52463/api/user/login"

      setUserName(document.getElementById("username").value);
      setPassword(document.getElementById("password").value);

      /*
         headers: {
            'Content-Type': 'application/json'
         },
      */
     try {
      console.log(UserName)
      var checkForEmpty = 0;
      if(document.getElementById("username").value.length == 0){
         checkForEmpty = 1;
         alert("Fill the username field properly! Username field cannot be empty");
         throw new Error('Fill the username field properly!');
      }
      if(document.getElementById("password").value.length == 0){
         checkForEmpty = 1;
         alert("Fill the password field properly! Password field cannot be empty");
         throw new Error('Fill the username field properly!');
      }

         const datatoSend = {
            "name": document.getElementById("username").value,
            "password": document.getElementById("password").value
         }
         const response =  await fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(datatoSend)
         })

         const jsonData = await response.json();
         console.log(jsonData);
         console.log(UserName);
         
         localStorage.setItem('formData', JSON.stringify({id: jsonData.id, userType: jsonData.userType}));
         
         if(jsonData.userType === "doctor"){
            localStorage.setItem('appointmentGiver', jsonData.id);
         }

         // setUserId(jsonData.id);
         // setUserType(jsonData.userType);

         navigate("/choose");

     } catch (error) {
      if(checkForEmpty != 1){
         console.error(error);
         alert("Hata: Giriş yapılamadı!");
      }
     }
   }
  return (
    <div className="loginMain">
        <div style={{width: '100dvw', height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <form className='innerLoginBloque' onSubmit={HandleSubmit}>
               <h2 className='text-xl font-bold'>LOGIN</h2>
            <FormControl className='mt-3'>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" aria-describedby="my-helper-text" required />
            </FormControl>
            
            <FormControl className='mt-3'>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" aria-describedby="my-helper-text" required />
            </FormControl>

            <Button className="mt-3" variant="contained" onClick={HandleSubmit}>Log in</Button> 
            {/* <Link to="/calendar">Home</Link> */}
            <Link className="mt-2" to="/register">Register</Link>
            </form>
         </div>
    </div>
  );
}
export default App;

// onClick={LoginAuthentication}
//value={UserName} onChange={(event) => {setUserName(event.target.value); console.log(UserName); }}