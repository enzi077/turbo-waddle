import { AppBar, Card, CardActionArea, CardContent, Hidden, makeStyles,
Toolbar, Typography, Link} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Country from './components/Country';
import DashboardGraph from './components/DashboardGraph';

const useStyles=makeStyles((theme)=>({
    root:{
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.light
    },
    app__card:{
        padding: '10px',
        margin: '20px',
    },
    app__link:{
        color:'white',
        textDecoration:'none'
    },
    app__typographyCreator:{
        position: 'absolute',
        right:'20px',
        paddingTop:'5px'
    }
}))

const App=()=> {
    const [countriesData,setCountriesData]=useState([])
    const [totalsForCountries,setTotalsForCountries]=useState([])
    const tempCountry=[]
    const lastDays=100
    const classes=useStyles()
    
    useEffect(()=>{
        reqDataForTopCountries()
        totalsForCountriesData()
    },[])
    
    const reqDataForTopCountries=async()=>{
        const responseCountry=await fetch('https://disease.sh/v3/covid-19/countries?sort=cases')
        const dataCountry=await responseCountry.json()
        setCountriesData(dataCountry)
    }
    
    const totalsForCountriesData=async()=>{
        const response=await fetch('https://disease.sh/v3/covid-19/countries?sort=cases&allowNull=0')
        const data=await response.json()
        setTotalsForCountries(data)
        alert('For a seamless experience on smaller devices, rotate to landscape mode!')
    }
    
    return(
        <div className={classes.root}>
            <AppBar position='sticky' color='primary'>
                <Toolbar>
                    <Typography variant='h6'>
                        Covid-19 Tracker
                    </Typography>
                    <Typography variant='subtitle2' className={classes.app__typographyCreator}>
                        Created with love by <Link href='https://github.com/enzi077/turbo-waddle' className={classes.app__link}><strong>pulsating_photon</strong></Link>
                    </Typography>
                </Toolbar>
            </AppBar>
                {   countriesData &&
                    countriesData.forEach((country,index)=>{
                        if(index<5){
                            tempCountry.push(country.country)
                        }
                    })
                }
                <Hidden smDown>
                    <Card className={classes.app__card}>
                        <CardActionArea>
                            <CardContent>
                                <DashboardGraph countries={tempCountry} lastDays={lastDays}/>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Hidden>
                {
                    totalsForCountries &&
                    <Country data={totalsForCountries}/>
                }
        </div>
    )
}

export default App;