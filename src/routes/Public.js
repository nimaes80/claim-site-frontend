import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Error404NotFound from './Error404NotFound';
import MainHeader from './pages/components/sections/MainHeader';
import Home from './pages/Home';


function Public() {
	return (
		<>
			<MainHeader />
			<Routes>
				<Route index element={<Home />} />
				<Route path='/*' element={<Error404NotFound />} />
			
			</Routes>
		</>
	)
}

export default Public