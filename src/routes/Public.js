import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainHeader from './pages/components/sections/MainHeader';
import Home from './pages/Home';


function Public() {
	return (
		<>
			<MainHeader />
			<Routes>
				<Route path="/" index element={<Home />} />
			
			</Routes>
		</>
	)
}

export default Public