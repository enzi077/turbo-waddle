import React from 'react'
import {Dialog,DialogTitle,Link,makeStyles} from '@material-ui/core'
import chartjsLogo from '../assets/chartjsLogo.svg'
import materialLogo from '../assets/materialLogo.png'
import reactLogo from '../assets/reactLogo.png'

const useStyles=makeStyles((theme)=>({
    simpleDialog__link:{
        textDecoration:'none'
    },
    simpleDialog__div:{
        color:theme.palette.primary.dark,
        marginLeft:'20px',
        marginRight: '20px'
    },
    simpleDialog__divTechStack:{
        marginBottom:'20px',
        display:'flex',
        justifyContent:'space-around'
    },
}))

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose()
  }
  
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Additional Information</DialogTitle>
        <div className={classes.simpleDialog__div}>
            <p>Created with <span aria-label='heart' role='img'>❤️</span> by <Link href='https://github.com/enzi077/turbo-waddle' className={classes.simpleDialog__link}><strong>pulsating_photon</strong></Link></p>
            <p>For additional visualization, switch to medium/large scale devices or to landscape mode (width 580px and up)</p>
            <p>Data sourced from <Link href="https://disease.sh/docs/#/" className={classes.simpleDialog__link}><strong>https://disease.sh/docs/#/ </strong></Link>
            which has had a "notable mentions" tag for Covid-19 related data from
            <Link href='https://postman-toolboxes.github.io/covid-19/#featured-collections' className={classes.simpleDialog__link}><strong> Postman</strong></Link></p>
        </div>
        <div className={classes.simpleDialog__divTechStack}>
            <a href="https://reactjs.org/" style={{textDecoration:"none"}}>
                <img 
                    src={reactLogo} 
                    alt="React Logo"
                    style={{
                        height:"24px",
                        width:"24px"
                    }}
                />
            </a>
            <a href="https://material-ui.com/" style={{textDecoration:"none"}}>
                <img 
                    src={materialLogo} 
                    alt="Material Ui Logo"
                    style={{
                        height:"20px",
                        width:"26px"
                    }}
                 />
            </a>
            <a href="https://www.chartjs.org/" style={{textDecoration:"none"}}>
                <img 
                    src={chartjsLogo} 
                    alt="Chart JS Logo"
                    style={{
                        height:"28px",
                        width:"38px"
                    }}
                />
            </a>
        </div>
    </Dialog>
  );
}

export default SimpleDialog