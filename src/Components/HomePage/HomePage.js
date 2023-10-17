import React from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import EmployeeTable from '../EmployeeTable/EmployeeTable';
import { useState } from 'react';

export default function HomePage() {
 
  // state to keep track of data related to the input given in search bar
  
  const [searchData,setSearchData] = useState([]);

  

  return (
    <div>
      {/* page contains three components  header , searchbar ,employee table*/}

      <Header/>
      <SearchBar setSearchDataProp={setSearchData}/>
      <EmployeeTable  searchDataProp ={searchData} />
    </div>
  );
}
