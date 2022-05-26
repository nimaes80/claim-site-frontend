import React from 'react';
import TopBar from './components/home/TopBar';
import Body from './components/home/Body';
import ButtomBar from './components/home/ButtomBar';

function Home() {

	window.screenTop = 0;
	

	return (
			<>
				<TopBar />
				<Body />
				<ButtomBar />
			</>
		);
};


export default Home;