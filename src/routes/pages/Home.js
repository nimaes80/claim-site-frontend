import React from 'react';
import TopBar from './components/home/TopBar';
import Body from './components/home/Body';
import ButtomBar from './components/home/ButtomBar';

function Home(props) {

	window.screenTop = 0;
	

	return (
			<>
				<TopBar />
				<Body handleAuthentication={props.handleAuthentication} />
				<ButtomBar />
			</>
		);
};


export default Home;