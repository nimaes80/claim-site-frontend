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


const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


export default class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			// isAuthenticated: (localStorage.getItem('refreshToken') && new Date().getTime() >=  JSON.parse(window.atob(localStorage.getItem('refreshToken').split('.')[1])).exp * 1000),
			isAuthenticated: true,
			isLoaded: true,
		};
		this.handleAuthentication = this.handleAuthentication.bind(this);

		
	};
	

	// componentDidMount(props) {
	// 	const refreshToken = localStorage.getItem('refreshToken');

	// 	const isExpired = (token) => {
	// 		try {
	// 		const jwt = JSON.parse(window.atob(token.split('.')[1]));
	// 		return Boolean(new Date().getTime() >= jwt.exp * 1000);
	// 		} catch {
	// 			return true;
	// 		};
	// 	};
	// 	if (refreshToken !== null) {
	// 		if (!isExpired(refreshToken)) {
	// 			this.setState({isAuthenticated: true});
	// 		};
	// 		this.setState({isLoaded:true});
	// 		this.forceUpdate();
	// 	} else {
	// 		this.setState({isLoaded:true});
	// 	}
		
		

	// };
	

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
						{
							this.state.isLoaded ?  (
								<Routes>
									{
										this.state.isAuthenticated ?
											<>
												<Route path='/dashboard/*' element={<Private />} />
												<Route path='/*' element={<Public handleAuthentication={this.handleAuthentication} />} />
											</>
										:
											<>
												<Route path='/*' element={<Public handleAuthentication={this.handleAuthentication} />} />
											</>
									}
								</Routes>
							)
							:
								<Alert severity='info' sx={{mx:'auto', textAlign:'center', my:5}}> لطفا صبر کنید... </Alert>
						}
						
						

					</ThemeProvider>
					
				</CacheProvider>
			</BrowserRouter>
		);
	};
};
