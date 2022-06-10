import { Box, Container, Paper } from '@mui/material';
import React, { Component } from 'react';
import banner from '../../../../assets/images/bannerak.png';
import telegram from '../../../../assets/images/telegram.png';


export default class TopBar extends Component {
  render() {
	return (
		<>
		<Box sx={{display:{xs:'block', md:'none'}}}>
			<img src={banner} alt="banner" className='banner' style={{width:"100%",  zIndex:1}} />
		</Box>
		<Box sx={{display:{xs:'none', md:'block', lg:'none'}}}>
			<img src={banner} alt="banner" className='banner' style={{width:"100%", height:"600px", zIndex:1}} />
		</Box>
		<Box sx={{display:{xs:'none', lg:'block'}}}>
			<img src={banner} alt="banner" className='banner' style={{width:"100%", height:"700px", zIndex:1}} />
		</Box>

		<div className="wave" id="wave"></div>


		<Container maxWidth="sm" sx={{mt:13}}>
			<Paper sx={{borderRadius:10, p:4, boxShadow:4}} className="border-purple center" >
					<a target='_blank' href="/" >
						<img style={{borderRadius:20}} width="150" src={telegram} alt="Join telegram channel" title="Join telegram channel" />
					</a>
					<br />
					Before Registering or Login on this website it’s mandatory that you join Telegram channels below (Click on each banner to join) 
			</Paper>
		</Container>



		</>
	);
  };
};
