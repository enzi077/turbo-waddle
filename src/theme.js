import { createMuiTheme } from '@material-ui/core/styles'

const theme=createMuiTheme({
    palette:{
        // type: 'dark',
        primary:{
            main:'#263238',
            dark:'#1a2327',
            light:'#eeeeee',
        },
        secondary:{
            main:'#f50057',
            dark:'#ab003c',
            light:'#fce4ec',
        }
    },
    typography: {
        fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        ].join(','),
    },
})

export default theme
