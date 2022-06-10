import Alert from '@mui/material/Alert';
import { ThemeProvider } from '@mui/material/styles';
import React, { Component } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Theme from './assets/js/Theme';
import Private from './routes/Private';
import Public from './routes/Public';
import './services/pwa_app';




export default class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: true,
			isLoaded: true,
		};
		this.handleAuthentication = this.handleAuthentication.bind(this);

		
	};
	

	handleAuthentication({value}) {
		this.setState({
			isAuthenticated: value,
		});
		this.forceUpdate();
	}

	
	render() {
		return (
			<BrowserRouter>
					<ThemeProvider theme={Theme}>
						<GoogleReCaptchaProvider reCaptchaKey="6LeS21YgAAAAANLAJzyEDB1Aa4nAyRW5fQ5hbdoJ" language="en" >
						{
							this.state.isLoaded ?  (
									this.state.isAuthenticated ?
										<Routes>
														<Route path='/dashboard/*' element={<Private />} />
														<Route path='/*' element={<Public handleAuthentication={this.handleAuthentication} />} />
														<Route path='/*' element={<Public handleAuthentication={this.handleAuthentication} />} />
										</Routes>
									:
										<Routes>
											<Route path='/*' element={<Public handleAuthentication={this.handleAuthentication} />} />
											<Route path='/*' element={<Public handleAuthentication={this.handleAuthentication} />} />
										</Routes>
							)
							:
								<Alert severity='info' sx={{mx:'auto', textAlign:'center', my:5}}> Please wait </Alert>
						}
						</GoogleReCaptchaProvider>
					</ThemeProvider>
			</BrowserRouter>
		);
	};
};
