import { Card, Grid, CardContent, CardActionArea, makeStyles, Button } from '@material-ui/core'
import React, { useState } from 'react'
import IndvidualCountry from './IndividualCountry'

const useStyles=makeStyles((theme)=>({
    country__mainDiv:{
        margin: '10px 20px'
    },
    country__gridContainer:{
        marginTop: '10px'
    },
    country__form:{
        display: 'flex',
        margin: '10px auto',
        justifyContent: 'center'
    },
    country__formInput:{
        borderRadius: '5px 0 0 5px',
        border: 'none',
        outline:'none',
        minHeight: '20px',
        width: '50%',
        padding: '5px'
    },
    country__formButton:{
        borderRadius: '0 5px 5px 0'
    },
    country__individualCountry:{
        display: 'flex',
        justifyContent: 'center'
    }
}))
const Country=({data})=> {
    const [search,setSearch]=useState('')
    const [query,setQuery]=useState('')
    
    const searchCountry=(e)=>{
        e.preventDefault()
        setQuery(search)
        setSearch('')
    }
    
    const updateSearch=(e)=>{
        setSearch(e.target.value)
    }
    
    const classes=useStyles()
    
    return (
        <div className={classes.country__mainDiv}>
            <form onSubmit={searchCountry} className={classes.country__form}>
                <input 
                    onChange={updateSearch}
                    value={search}
                    placeholder='Search country...'
                    className={classes.country__formInput}
                />
                <Button 
                    type='submit'
                    variant='contained'
                    color='secondary'
                    disableElevation
                    className={classes.country__formButton}
                >
                    Search
                </Button>
            </form>
            <Grid container spacing={3} className={classes.country__gridContainer}>
            {
                query ? (
                    data.map((eachCountry,index)=>(
                        eachCountry.country.toLowerCase().includes(query.toLowerCase()) &&
                        <Grid item xs={12} md={6} lg={3} key={index}>
                            <CardActionArea>
                                <Card>
                                    <CardContent>
                                        <IndvidualCountry
                                            // key={index}
                                            //key={eachCountry.countryInfo.iso2}
                                            countryName={eachCountry.country}
                                            cases={eachCountry.cases}
                                            deaths={eachCountry.deaths}
                                            recovered={eachCountry.recovered}
                                            className={classes.country__individualCountry}
                                        />
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Grid>
                    ))
                ) : (
                    data.map((eachCountry,index)=>(
                        <Grid item xs={12} md={6} lg={3} key={index}>
                            <CardActionArea>
                                <Card>
                                    <CardContent>
                                        <IndvidualCountry
                                            // key={index}
                                            //key={eachCountry.countryInfo.iso2}
                                            countryName={eachCountry.country}
                                            cases={eachCountry.cases}
                                            deaths={eachCountry.deaths}
                                            recovered={eachCountry.recovered}
                                            className={classes.country__individualCountry}
                                        />
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Grid>
                    ))
                )
            }
            </Grid>
        </div>
    )
}

export default Country