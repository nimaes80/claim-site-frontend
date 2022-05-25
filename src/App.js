import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import Theme from './assets/js/Theme';
import Public from './routes/Public';
import Private from './routes/Private';


const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


export default class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			isLoaded: false,
		};

	};
	

	componentDidMount(props) {
		
	};
	



	
	render() {
		return (
			<BrowserRouter>
				<CacheProvider value={cacheRtl}>
					<ThemeProvider theme={Theme}>
						<Routes>
							{
								this.state.isAuthenticated ?
									<>
										<Route path='/dasboard/*' element={<Private />} />
										<Route path='/*' element={<Public />} />
									</>
								:
									<>
										<Route path='/*' element={<Public />} />
									</>
							}


						</Routes>


					</ThemeProvider>
					
				</CacheProvider>
			</BrowserRouter>
		);
	};
};
