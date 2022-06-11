import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import React, { Component } from 'react';
import banner from '../../../../assets/images/bannerak.webp';
import svg from '../../../../assets/images/svg.png';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';


export default class TopBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			globals: [],
		};
		this.getExteras = this.getExteras.bind(this);
	};

	componentDidMount() {
		this.getExteras();
	}

	getExteras() {
		requests.get(urls.globalInfo)
		.then(response => {
				if (response.status === 200 && typeof(response.data.extra) === 'object' ) {
					this.setState({globals:response.data.extra});
				}
			})
			.catch(error => {})
	}
  render() {
	const globals = this.state.globals;
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

			<Container maxWidth="sm" sx={{mt:9}}>

				<Paper sx={{px:0, py:3, mb:5, borderRadius:15}} className="border-purple">
					<Grid container alignItems="center" justifyContent="center">
							{
								Object.keys(globals).map((global, i) => (
									<Grid item xs={12} md={4} key={i}>
										<Box className="center" sx={{borderRadius:10, width:"fit-content", py:2, px:5, mt:5, mx:"auto", color:"primary.main", transition:'all 0.4s ease'}}>
											<Typography width="100%" variant="body" fontSize={20} > {globals[global].title} </Typography>
											<br />
											<Typography width="100%" variant="body" fontSize={20} > {globals[global].value} </Typography>
										</Box>
									</Grid>
								))
							}
					</Grid>
				</Paper>




				<Paper sx={{borderRadius:10, p:4, boxShadow:4}} className="border-purple center" >
					<Grid container rowSpacing={2}>
						<Grid item xs={6}>
							<a title="Our official Telegram channel " target='_blank' href="https://t.me/Stablefarm" >
								<TelegramIcon /> <br />
								Our official Telegram channel 
							</a>
						</Grid>
						<Grid item xs={6}>
							<a title="Our advertiser channel" target='_blank' href="https://t.me/airdrop_crypto_pro" >
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
