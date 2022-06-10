import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Box, Container, Grid, Paper } from '@mui/material';
import React, { Component } from 'react';
import banner from '../../../../assets/images/bannerak.webp';
import svg from '../../../../assets/images/svg.png';


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
			<Box sx={{display:{xs:'none', lg:'block', xl:"none"}}}>
				<img src={banner} alt="banner" className='banner' style={{width:"100%", height:"700px", zIndex:1}} />
			</Box>
			<Box sx={{display:{xs:'none', xl:'block', xxl:"none"}}}>
				<img src={banner} alt="banner" className='banner' style={{width:"100%", height:"750px", zIndex:1}} />
			</Box>
			<Box sx={{display:{xs:'none', xxl:'block'}}}>
				<img src={banner} alt="banner" className='banner' style={{width:"100%", height:"800px", zIndex:1}} />
			</Box>

			<img src={svg} alt={svg} className="img-wave" />

			<Container maxWidth="sm" sx={{mt:13}}>
				<Paper sx={{borderRadius:10, p:4, boxShadow:4}} className="border-purple center" >
					<Grid container rowSpacing={2}>
						<Grid item xs={6}>
							<a title="Our official Telegram channel " target='_blank' href="/" >
								<TelegramIcon /> <br />
								Our official Telegram channel 
							</a>
						</Grid>
						<Grid item xs={6}>
							<a title="Our advertiser channel" target='_blank' href="/" >
								<RocketLaunchRoundedIcon /> <br />
								Our advertiser channel
							</a>
						</Grid>
						<Grid item xs={12}>
							<p>Before Registering or Login on this website it’s mandatory that you join Telegram channels above (Click on each banner to join) </p>
						</Grid>

					</Grid>
						

						
				</Paper>
			</Container>



		</>
	);
  };
};
