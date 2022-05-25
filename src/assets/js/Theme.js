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
		}

	},
	



});



export default Theme;