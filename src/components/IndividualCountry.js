import { Typography } from '@material-ui/core'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import randomColor from '../utils/randomColor'

const IndividualCountry=({countryName,cases,deaths,recovered})=>{
    const createNewDataset=()=>{
        const subdata={labels:['Cases','Deaths','Recovered'],datasets:[]}
        let thisObj={data:[],backgroundColor:[randomColor(),randomColor(),randomColor()],borderWidth:1}
        let tempArray=[]
        tempArray[0]=cases
        tempArray[1]=deaths
        tempArray[2]=recovered
        thisObj.data=tempArray
        subdata.datasets.push(thisObj)
        
        return subdata
    }
    return (
        <div>
            <Typography variant='h5'>{countryName}</Typography>
            <Doughnut data={createNewDataset}/>
        </div>
    )
}

export default IndividualCountry
