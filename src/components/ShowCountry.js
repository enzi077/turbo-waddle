import { Grid,Card, CardActionArea, CardContent, makeStyles } from '@material-ui/core'
import React from 'react'
import IndvidualCountry from './IndividualCountry'

const useStyles=makeStyles(theme=>({
    showCountry__individualCountry:{
        display: 'flex',
        justifyContent: 'center'
    }
}))
const ShowCountry=({countryName,cases,deaths,recovered})=>{
    const classes=useStyles()
    return (
        <Grid item xs={12} md={6} lg={3}>
            <CardActionArea>
                <Card>
                    <CardContent>
                        <IndvidualCountry
                            countryName={countryName}
                            cases={cases}
                            deaths={deaths}
                            recovered={recovered}
                            className={classes.showCountry__individualCountry}
                        />
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    )
}

export default ShowCountry
