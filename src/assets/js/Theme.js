import { deepPurple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import '../css/style.css';



const Theme = createTheme({
   
	direction:"rtl",


	palette: {

		primary: {
			light: deepPurple[800],
			main: deepPurple[900],
			dark: deepPurple["A700"],
		},
		white: {
			light: '#fff',
			main: '#fff',
			dark: '#fff',
		},
		black: {
			light: '#000',
			main: '#000',
			dark: '#000',
		},

	},
	



});



export default Theme;