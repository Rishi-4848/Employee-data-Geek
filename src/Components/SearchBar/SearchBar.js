import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import"./SearchBar.css";
import axios from 'axios';


export default function SearchBar({setSearchDataProp}) {

  //state to handle the input in the searchbar
  const[input,setInput] = useState("");

  // function to fetch data and filter it based on the input given in searchbar
  const performSearch= async(value)=>{
    try{
      
      const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      
      const employeeData = response.data;

      const updatedData = employeeData.filter((employee)=>
        
        employee.name.toLowerCase().includes(value)  ||
        employee.role.toLowerCase().includes(value)  ||
        employee.role.toLowerCase().includes(value)
      )
       
      setSearchDataProp(updatedData);

      console.log("updated data",updatedData)
      
    }catch(err){
      console.log(err);
    }
  }

  //function to record the input and initialise the function perform search
  const handleChange =(value)=>{
    setInput(value);
    performSearch(value);
  }

  

  return (

    // search bar div
    <div  className='searchbar-container'>
        <TextField className='searchbar' id="outlined-basic" value={input}  label="Search by name ,email or role" variant="outlined" onChange={(event)=>{handleChange(event.target.value)}} />
    
    </div>
  );
}
