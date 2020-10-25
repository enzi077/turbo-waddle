import React, { useEffect, useState } from 'react';
import './App.css';
import randomColor from './utils/randomColor'
import {Line} from 'react-chartjs-2';

function App() {
    const [data,setData]=useState([])
    const [countriesData,setCountriesData]=useState([])
    const tempCountry=['USA','India','Brazil','Russia','Spain']
    const fatalityRateData=[]
    const lastDays=100
    //const subdata={datasets:[]}
    
    useEffect(()=>{
        reqData()
    },[])
    
    // const reqDataForTopCountries=async()=>{
    //     const responseCountry=await fetch('https://disease.sh/v3/covid-19/countries?sort=cases')
    //     const dataCountry=await responseCountry.json()
    //     setCountriesData(dataCountry)
    //     countriesData.forEach((countryData,index)=>{
    //         if(index<5){
    //             tempCountry.push(countryData.country)
    //         }
            
    //     })
    // }
    
    const reqData=async()=>{
        const response=await 
            fetch(`https://disease.sh/v3/covid-19/historical/${tempCountry[0]}%2C%20${tempCountry[1]}%2C%20${tempCountry[2]}%2C%20${tempCountry[3]}%2C%20${tempCountry[4]}?lastdays=${lastDays}`)
        const data=await response.json()
        console.log(data);
        setData(data)
    }
    
    const genFatalityRateData=(countryName,fatalityRate,date)=>{
        fatalityRateData.push({countryName, fatalityRate, date})
        return fatalityRateData
    }
    
    const createNewDataset=(fatalityRateData)=>{
        const subdata={labels:[],datasets:[]}
        //label: fatalityRateData[i].countryName 
        for(let i =0;i<fatalityRateData.length;i=i+lastDays){
            let nthObject = {label: fatalityRateData[i].countryName,data:[],fill: false,borderColor: randomColor()};
            let fatalityRateArray = []
            for(let j=i;j<i+lastDays;j++){
                if(j<fatalityRateData.length){
                    fatalityRateArray.push(fatalityRateData[j].fatalityRate)
                }
                if (j < lastDays) {
                    subdata.labels.push(fatalityRateData[j].date);
                }
            }
            
            nthObject.data = fatalityRateArray
            subdata.datasets.push(nthObject);
        }
        return subdata
    }
    
  return (
    <div className="App">
        {
            data.forEach((country)=>{
                let cases=country.timeline.cases
                let deaths=country.timeline.deaths
                for(let i in cases){
                    for(let j in deaths){
                        if(i===j){
                            let fatalityRate=(deaths[j])/(cases[i])
                            genFatalityRateData(country.country,fatalityRate,i)
                        }
                    }
                }
            })
        }
        {
            <div>
                <Line data={createNewDataset(fatalityRateData)}/>
            </div>
        }
    </div>
  );
}

export default App;