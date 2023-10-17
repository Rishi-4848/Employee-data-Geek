import React, { useEffect, useState } from 'react';
import axios from "axios";
import {AiFillDelete} from "react-icons/ai";
import {AiFillEdit} from "react-icons/ai";
import {BsFastForwardFill} from "react-icons/bs";
import {AiFillBackward} from "react-icons/ai";
import {IoCaretBackOutline} from "react-icons/io5";
import {IoCaretForwardSharp} from "react-icons/io5";
import "./EmployeeTable.css";
import EditPage from '../EditPage/EditPage';


export default function EmployeeTable({searchDataProp}) {

  
  

 
  //state for the data to be displayed
  const [employeeData,setEmployeeData] = useState([]);
  
  // state to keep track of current page
  const [currentPage,setCurrentPage] = useState(1);

  //state to keep track of selected rows
 const [selectedRows,setSelectedRows] = useState([]);

 //state to keep track of selected employee to edit

 const [editingInfo,setEditingInfo] = useState(null);

 //state to open and close edit page of employee

 const [editPage,setEditPage] = useState(false);

//variable  to display data after search results
 const displayData = applySearch (searchDataProp);


 //function to apply search data

 function applySearch (searchDataProp){

  const searchData = [...searchDataProp];
  if(searchData.length !== 0){
    return searchData;
  }else{
    return employeeData;
  }
  
 }



  //items per page is fixed

  const itemsPerPage = 10 ;

  //total pages  depends on length of employee data

  const totalPages = Math.ceil(displayData.length/itemsPerPage);

  //start index of current page

  const startIndex= (currentPage-1)*itemsPerPage;

  //end index of current page

  const endIndex = startIndex+ itemsPerPage;

  //variable to check whether all rows of the current page are selected or not
  
  const isAllChecked = selectedRows.length === itemsPerPage ;


  //functions to handle pagination

  //function for 1st page
  const handleFirstPage = ()=>{
   setCurrentPage(1);
  } 


  // function for last page

  const handleLastPage = ()=>{
    setCurrentPage(totalPages);
  }

  // function for next page

  const handleNextPage = ()=>{
   setCurrentPage(currentPage+1);
  }

  // function for previous page

  const handlePrevPage = ()=>{
   setCurrentPage(currentPage-1);
  }

  //function to handle page buttons

  const handlePage = (page)=>{
    setCurrentPage(page);
  }


  //function to determine no of pages to be shown as buttons
  const getPageNumbers = ()=>{
    let pageNumbers = [];
    for(let i=1;i<= totalPages;i++){
      pageNumbers.push(i)
    }
    return pageNumbers ;
  }

  const pageNumbers = getPageNumbers();


  //function to handle check boxes

  const handleRowCheckBox = (event,id)=>{
    const isChecked = event.target.checked;
    if(isChecked){
      setSelectedRows([...selectedRows,id])
    }else{
       setSelectedRows(selectedRows.filter((item)=> item!== id));
    }
  }

  const handleAllSelectCheckBox = (event,displayData)=>{
     const isChecked = event.target.checked ;
    if(isChecked){

      const startIndex= (currentPage-1)*itemsPerPage;
      const endIndex = startIndex+ itemsPerPage;
       
      //creating empty array
      let rowsSelected=[];

      for(let i=startIndex;i<endIndex;i++){
         if(i<displayData.length){

       // pushing  id of selected rows
          rowsSelected.push(displayData[i].id);

         }else{
              // this will take care if items per page is less 10 it will give random numbers as id
          rowsSelected.push(Math.random());
         }
      }
     setSelectedRows(rowsSelected);
    }else{
      setSelectedRows([]);
    }
  }

   
  //function to delete employee data

  const handleDelete = (id)=>{
     
    //filtering out the selected employee id from data

    const updatedData = displayData.filter((employee)=>employee.id !== id);

    setEmployeeData(updatedData);
    setSelectedRows([]);

  }

  const handleAllDelete = ()=>{

    //filtering out the multiple selected employees id from data

   const updatedData = displayData.filter((employee)=>!selectedRows.includes(employee.id));

   setEmployeeData(updatedData);
   setSelectedRows([]);
  }


  //function to edit the employee data

  const handleEdit = (employee)=>{
   setEditingInfo(employee);
   setEditPage(true);
  }

  // function to save the edited information

  const handleEditSave =(editingInfo)=>{
   
    const updatedData = [...displayData];

    const indexToBeFind = updatedData.findIndex((employee)=>employee.id === editingInfo.id);

    if(indexToBeFind !== -1){
      updatedData[indexToBeFind] = editingInfo;

      setEmployeeData(updatedData);
   
    }
    setEditingInfo(null);
  }
   
  // function to close the edit page

  const handleEditClose = ()=>{
  setEditPage(false);
  setEditingInfo(null);
  }


  //fetching data from the link
  const fetchData = async ()=>{

    try{
        
      const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
       
       let data = response.data;
       console.log("data",data)
      setEmployeeData(data);
    }catch(err){
        console.log(err)
    }
  }

  
  useEffect(()=>{
    fetchData();
  },[])


  
  return (
    <div className='table-container'>

      {/* employee table */}
      <table>
       <thead>
        <tr className='table-row'>
          <th>
            <input type='checkbox' checked={isAllChecked} onChange={(event)=>{handleAllSelectCheckBox(event,displayData
              
              )}}/>
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
       </thead>
       
          <tbody>
            {displayData.slice(startIndex,endIndex).map((employee,index)=>(           
              
              <tr key={employee.id} className='table-row'>
               <td>
           <input type='checkbox' checked={selectedRows.includes(employee.id)} onChange={(event)=>{handleRowCheckBox(event,employee.id)}}/>
               </td>
               <td className='employee-name'>
                {employee.name}
               </td>
               <td className='employee-email'>
                {employee.email}
               </td>
               <td className='employee-role'>
                {employee.role}
               </td>
               <td className='table-actions'>
               <AiFillEdit onClick={()=>{handleEdit(employee)}}/>
               <AiFillDelete onClick={()=>{handleDelete(employee.id)}}/>
             
               </td>
             </tr>
            ))}
         
        </tbody>
       
        
       
      </table>


      {/* table footer */}
    <div className='table-footer-container'>

      <button className='Multi-delete-button' onClick={handleAllDelete}>Delete Selected</button>

      <div className='pagination-container'>

        <button className='button-operations' onClick={handleFirstPage} disabled={currentPage === 1}><AiFillBackward/></button>

        <button className='button-operations' onClick={handlePrevPage} disabled={currentPage===1}><IoCaretBackOutline/></button>

       {pageNumbers.map((page,index)=>(

         <button className={page === currentPage ? 'currentPage':"normalPage"} key={index} onClick={()=>{handlePage(page)}}>{page}</button>
       ))}

       <button className='button-operations' onClick={handleNextPage} disabled={currentPage === totalPages}><IoCaretForwardSharp/></button>

       <button className='button-operations' onClick={handleLastPage} disabled={currentPage === totalPages}><BsFastForwardFill/></button>
      </div>
    </div>

    
    {/*  using conditional rendering we restricted the editing page */}

  {editPage &&
  <EditPage infoProp = {editingInfo} onCloseProp = {handleEditClose} onSaveProp = {handleEditSave}/>
  }
    
    </div>
  );
}
