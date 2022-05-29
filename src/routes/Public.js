import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Error404NotFound from './Error404NotFound';
import About from './pages/About';
import MainHeader from './pages/components/sections/MainHeader';
import Contact from './pages/Contact';
import Home from './pages/Home';


function Public(props) {
	return (
		<>
			<MainHeader />
			<Routes>
				<Route index element={<Home handleAuthentication={props.handleAuthentication} />} />
				<Route path='/about/' element={<About />} />
				<Route path='/contact/' element={<Contact />} />
				<Route path='/*' element={<Error404NotFound />} />
			
			</Routes>
		</>
	)
}

export default Public