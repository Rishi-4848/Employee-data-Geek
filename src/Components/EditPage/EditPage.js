import React, { useState } from 'react';
import "./EditPage.css";

export default function EditPage({infoProp,onCloseProp,onSaveProp}) {

  //state to keep track of selected info
  const [editedInfo,setEditedInfo] = useState({...infoProp});


  // function to handle the input change
  const handleInputChange = (event)=>{
    const {name,value} = event.target;
    setEditedInfo((prevInfo)=>({...prevInfo,[name]:value}))
  }

  // function to save the changes and close the edit page

  const handleSaveClick = ()=>{
    onSaveProp(editedInfo);
    onCloseProp();
  }

  return (
    <div className='modal'>
    <div className='modal-content'>
     <h2>Edit INFORMATION</h2>
     <label> Name</label>
     <input type='text' name='name' value={editedInfo.name} onChange={handleInputChange}/>
     <label>Email</label>
     <input type='text' name='email' value={editedInfo.email} onChange={handleInputChange}/>
     <label>Role</label>
     <input type='text' name='role' value={editedInfo.role} onChange={handleInputChange}/>

     <div className='modal-buttons'>
       <button onClick={handleSaveClick}>Save</button>
       <button onClick={onCloseProp}>Cancel</button>
     </div>
    </div>
   </div>
  );
}
