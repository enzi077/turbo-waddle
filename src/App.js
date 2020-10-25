import React, { useEffect, useState } from 'react';
import './App.css';
import DashboardGraph from './components/DashboardGraph';

function App() {
    const [countriesData,setCountriesData]=useState([])
    const tempCountry=[]
    const lastDays=100
    
    useEffect(()=>{
        reqDataForTopCountries()
    },[])
    
    const reqDataForTopCountries=async()=>{
        const responseCountry=await fetch('https://disease.sh/v3/covid-19/countries?sort=cases')
        const dataCountry=await responseCountry.json()
        setCountriesData(dataCountry)
    }
    
    return(
        <div>
            {
                countriesData.forEach((country,index)=>{
                    if(index<5){
                        tempCountry.push(country.country)
                    }
                })
            }
            <DashboardGraph countries={tempCountry} lastDays={lastDays}/>
        </div>
    )
}

export default App;