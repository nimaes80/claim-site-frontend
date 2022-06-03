import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Error404NotFound from './Error404NotFound';
import Admin from './pages/Admin';
import UserBalance from './pages/UserBalance';


export default class Private extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		};
	};

	render() {
		return (
			<>
				<Routes>
					<Route path='/balance/' element={<UserBalance />} />
					<Route path='/admin/*' element={<Admin />} />
					<Route path='/*' element={<Error404NotFound />} />
					

				</Routes>
			</>
		);
	};
};
