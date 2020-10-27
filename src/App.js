import { AppBar, Card,  CardContent, makeStyles,
Toolbar, Typography, IconButton} from '@material-ui/core';
import './App.css'
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useState } from 'react';
import Country from './components/Country';
import DashboardGraph from './components/DashboardGraph';
import SimpleDialog from './utils/SimpleDialog'
import Header from './components/Header'

const useStyles=makeStyles((theme)=>({
    root:{
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.light
    },
    app__card:{
        padding: '10px',
        margin: '20px 20px 80px 20px',
    },
    app__typographyCreator:{
        position: 'absolute',
        right:'20px',
        paddingTop:'5px'
    },
    app__reload:{
        textDecoration:'none',
        color:'white'
    },
}))

const App=()=> {
    const [countriesData,setCountriesData]=useState([])
    const [open, setOpen] = useState(false);
    const tempCountry=[]
    const lastDays=100
    const classes=useStyles()
    
    useEffect(()=>{
        reqDataForTopCountries()
    },[])
    
    const reqDataForTopCountries=async()=>{
        const responseCountry=await fetch('https://disease.sh/v3/covid-19/countries?sort=cases')
        const dataCountry=await responseCountry.json()
        setCountriesData(dataCountry)
        alert("If on mobile devices, switch to landscape mode for additional visualization")
    }
    
    const openPopUp=()=>{
        setOpen(true)
    }
    
    const closePopUp = () => {
        setOpen(false)
    };
    
    const setReload=()=>{
        window.location.reload()
        return false
    }
    
    return(
        <div className={classes.root}>
            <AppBar position='sticky' color='primary'>
                <Toolbar>
                    <Typography variant='h6'>
                        <a href="/" onClick={setReload} className={classes.app__reload}>
                            COVID-19 Tracker
                        </a>
                    </Typography>
                    <IconButton onClick={openPopUp} color='inherit' className={classes.app__typographyCreator} aria-label='menu'>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SimpleDialog open={open} onClose={closePopUp} />
                {   countriesData &&
                    countriesData.forEach((country,index)=>{
                        if(index<5){
                            tempCountry.push(country.country)
                        }
                    })
                }
                <Header/>
                <div className='app__divGraph'>
                    <Card className={classes.app__card}>
                        <CardContent>
                            <DashboardGraph countries={tempCountry} lastDays={lastDays}/>
                        </CardContent>
                    </Card>
                </div>
                <Country/>
        </div>
    )
}

export default App;