import { AppBar, Card, CardActionArea, CardContent, Hidden, makeStyles,
Toolbar, Typography, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useState } from 'react';
import Country from './components/Country';
import DashboardGraph from './components/DashboardGraph';
import SimpleDialog from './utils/SimpleDialog'

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
    }
}))

const App=()=> {
    const [countriesData,setCountriesData]=useState([])
    const [totalsForCountries,setTotalsForCountries]=useState([])
    const [open, setOpen] = useState(false);
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
                            Covid-19 Tracker
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