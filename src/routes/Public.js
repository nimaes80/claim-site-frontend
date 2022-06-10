import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Error404NotFound from './Error404NotFound';
import MainHeader from './pages/components/sections/MainHeader';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Logout from './pages/Logout';
import Referral from './pages/Referral';


function Public(props) {
	return (
		<>
			<MainHeader />
			<Routes>
				<Route index element={<Home handleAuthentication={props.handleAuthentication} />} />
				<Route path='/contact/' element={<Contact />} />
				<Route path='/logout/' element={<Logout />} />
				<Route path='/referral/:uuid' element={<Referral />} />
				<Route path='/*' element={<Error404NotFound />} />
			
			</Routes>
		</>
	)
}

export default Public