import { Card, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const useStyles=makeStyles(theme=>({
    header__gridContainer:{
        display:'flex',
        justifyContent:'center',
        marginTop:'20px',
        marginBottom:'20px'
    },
    header__card:{
        padding:'20px',
        display:'flex',
        justifyContent:'center',
        margin:'0 20px'
    },
    header__text:{
        color:theme.palette.secondary.dark
    },
    header__textNumber:{
        color:theme.palette.primary.dark
    }
}))
const Header=()=>{
    const [globalData,setGlobalData]=useState({})
    useEffect(()=>{
        reqGlobalData()
    },[])
    
    const reqGlobalData=async()=>{
        const response=await fetch('https://disease.sh/v3/covid-19/all')
        const data=await response.json()
        setGlobalData(data)
    }
    
    const {cases,deaths,recovered}=globalData
    const classes=useStyles()
    return (
        <Grid container spacing={3} className={classes.header__gridContainer}>
            <Grid item xs={12} md={6} lg={3}>
                <Card className={classes.header__card}>
                    <Typography variant='h6' className={classes.header__text}>Cases: 
                    <span className={classes.header__textNumber}> {cases}</span></Typography>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Card className={classes.header__card}>
                    <Typography variant='h6' className={classes.header__text}>Deaths: 
                    <span className={classes.header__textNumber}> {deaths}</span></Typography>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Card className={classes.header__card}>
                    <Typography variant='h6' className={classes.header__text}>Recovered: 
                    <span className={classes.header__textNumber}> {recovered}</span></Typography>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Header
