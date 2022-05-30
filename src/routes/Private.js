import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
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
					

				</Routes>
			</>
		);
	};
};
