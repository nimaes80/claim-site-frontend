import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Alert from '@mui/material/Alert';
import { ThemeProvider } from '@mui/material/styles';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import Theme from './assets/js/Theme';
import Private from './routes/Private';
import Public from './routes/Public';
import './services/pwa_app';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


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
				<CacheProvider value={cacheRtl}>
					<ThemeProvider theme={Theme}>
						<GoogleReCaptchaProvider reCaptchaKey="6LeS21YgAAAAANLAJzyEDB1Aa4nAyRW5fQ5hbdoJ" language="fa" >
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
								<Alert severity='info' sx={{mx:'auto', textAlign:'center', my:5}}> لطفا صبر کنید... </Alert>
						}
						</GoogleReCaptchaProvider>
					</ThemeProvider>
					
				</CacheProvider>
			</BrowserRouter>
		);
	};
};
