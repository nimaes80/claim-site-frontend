import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserBalance from './pages/UserBalance';
import Admin from './pages/Admin';


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
