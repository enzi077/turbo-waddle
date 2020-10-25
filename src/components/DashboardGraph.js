import React, { useEffect,useState } from 'react'
import randomColor from '../utils/randomColor'
import {Line} from 'react-chartjs-2';

const DashboardGraph=({countries,lastDays})=>{
    const [data,setData]=useState([])
    const fatalityRateData=[]
    
    useEffect(()=>{
        reqData()
    },[countries])
    
    const reqData=async()=>{
        const response=await 
            fetch(`https://disease.sh/v3/covid-19/historical/${countries[0]}%2C${countries[1]}%2C${countries[2]}%2C${countries[3]}%2C${countries[4]}?lastdays=${lastDays}`)
        const dataFromApi=await response.json()
        setData(dataFromApi)
    }
    
    const genFatalityRateData=(countryName,fatalityRate,date)=>{
        fatalityRateData.push({countryName, fatalityRate, date})
        return fatalityRateData
    }
    
    const createNewDataset=(fatalityRateData)=>{
        const subdata={labels:[],datasets:[]}
        for(let i =0;i<fatalityRateData.length;i=i+lastDays){
            let nthObject = {label: fatalityRateData[i].countryName,data:[],fill: false,borderColor: randomColor(),pointRadius:0.9};
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
    
    const options={
        responsive: true,
    }
    
    return (
        <div>
            {data.forEach(country=>{
                if(country.message!=="Country not found or doesn't have any historical data"){
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
                }
            })}
            
            {
                <div>
                    <Line 
                        data={createNewDataset(fatalityRateData)}
                        options={options}
                    />
                </div>
            }
        </div>
    )
}

export default DashboardGraph
