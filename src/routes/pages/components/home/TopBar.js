import { Box } from '@mui/system';
import React, { Component } from 'react';
import banner from '../../../../assets/images/lorem.webp';


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

		<div className="wave" ></div>

		</>
	);
  };
};
