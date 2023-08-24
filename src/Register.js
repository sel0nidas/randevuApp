//import logo from './logo.svg';
import './Login.css';
import Login from './Login'
// Required imports from the example.
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import {FormControl, Input, FormHelperText, InputLabel, MenuItem, Select} from '@mui/material';

function App() {
   
   const navigate = useNavigate();
   const [UserName, setUserName] = useState("")
   const [userType, setuserType] = React.useState('user');
   const [doctorType, setDoctorType] = React.useState('');
   const [gender, setGender] = React.useState('');

   const handleChangeUserType = (event) => {
     setuserType(event.target.value);
   };

   const handleChangeDoctorType = (event) => {
      setDoctorType(event.target.value);
    };
    

    
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



//   useEffect(() => {
//    fetch('http://localhost:52463/api/user/',{
//       method: 'get'
//    })
//       .then((res) => res.json())
//       .then((data) => {
//          console.log(data);   
//       })
//       .catch((err) => {
//          console.log(err.message);
//       });
// }, []);

   async function HandleSubmit (e) {
      e.preventDefault();
      console.log("submit is triggered...")
      const url = "http://localhost:52463/api/user/register"

      /*
        headers: {
           'Content-Type': 'application/json'
        },
      */
     try {
         const datatoSend = {
            "name": document.getElementById("username").value,
            "password": document.getElementById("password").value,
            "UserType": userType,
            "doctorType": doctorType,
            "gender": gender
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
         //localStorage.setItem('formData', JSON.stringify(jsonData));
         HandleSubmit2(e);
         navigate("/login");
         

     } catch (error) {
      console.error(error);
     }

     
      

   }

   async function HandleSubmit2 (e) {
      e.preventDefault();
      console.log("submit is triggered...")
      const url = "http://localhost:52463/api/doctor/register"

      /*
        headers: {
           'Content-Type': 'application/json'
        },
      */
     try {
         const datatoSend = {
            "name": document.getElementById("username").value,
            "doctorType": doctorType,
            "workdays": ""
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
         // //localStorage.setItem('formData', JSON.stringify(jsonData));
         // navigate("/login");
         

     } catch (error) {
      console.error(error);
     }

     
      

   }
   /*
   function LoginAuthentication() {
         
      var usernameInput = document.getElementById("username");
      var passwordInput = document.getElementById("password");

      console.log(usernameInput.value);
      
   useEffect(() => {
      const requestOptions = {
           method: 'POST',
           mode:'cors',
           headers: { 'Content-Type': 'application/json' },
           body: [
            {
               name: usernameInput,
               password: passwordInput
            }
           ] 
       };
      fetch('http://localhost:52463/api/user/login', requestOptions)
           .then(response => response.json())
           .then(data => {
            console.log(data)
         });
         
      }, []);
      
   }
   */
  return (

    
    <div className="loginMain">
        <div style={{width: '100dvw', height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            
            <form className='innerLoginBloque'>
               <h2 className='text-xl font-bold'>REGISTER</h2>
               <FormControl className='mt-3'>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input id="username" aria-describedby="my-helper-text" />
               </FormControl>
               
               <FormControl className='mt-3'>
                 <InputLabel htmlFor="password">Password</InputLabel>
                 <Input id="password" aria-describedby="my-helper-text" value={UserName} onChange={(event) => {setUserName(event.target.value); console.log(UserName); }} />
               </FormControl>
               
               <FormControl className='mt-3 w-100'>
               <InputLabel id="demo-simple-select-label">Gender</InputLabel>
               <Select
                 labelId="demo-simple-select-label"
                 id="demo-simple-select"
                 value={gender}
                 label="gender"
                 onChange={(e)=>{setGender(e.target.value)}}
               >
                 <MenuItem value={"E"}>Male</MenuItem>
                 <MenuItem value={"K"}>Female</MenuItem>
               </Select>
               </FormControl>

               <FormControl className='mt-3 w-100'>
               <InputLabel id="demo-simple-select-label">Doctor Type</InputLabel>
               <Select
                 labelId="demo-simple-select-label"
                 id="demo-simple-select"
                 value={userType}
                 label="userType"
                 onChange={handleChangeUserType}
               >
                 <MenuItem value={"user"}>User</MenuItem>
                 <MenuItem value={"doctor"}>Doctor</MenuItem>
               </Select>
               </FormControl>

               {userType == "doctor" &&
               <FormControl className='mt-3 w-100'>
               <InputLabel id="demo-simple-select-label">User Type</InputLabel>
               <Select
                 labelId="demo-simple-select-label"
                 id="demo-simple-select"
                 value={doctorType}
                 label="userType"
                 onChange={handleChangeDoctorType}
               >
                 <MenuItem value={"KBB"}>KBB Doktoru</MenuItem>
                 <MenuItem value={"Göz"}>Göz Doktoru</MenuItem>
               </Select>
               </FormControl>
               } 

               <Button className="mt-3" variant="contained" onClick={HandleSubmit}>REGISTER</Button> 
               <Link className='mt-2' to="/login">Login</Link>
            </form>
         </div>
    </div>
  );
}
// onClick={LoginAuthentication}
export default App;
