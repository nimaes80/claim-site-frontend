import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { Component } from 'react';
import Countdown from 'react-countdown';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';

export default class TopBar extends Component {

	constructor(props){
		super(props);
		this.state = {

		};
	};


	componentDidMount(props) {
		requests.get(urls.userProfile).then(response => {

		}).catch(error => {
			if (error.status === 401) {
				console.log('401 Error');
				console.log(error);

			}
		})
	}


	
  render() {
	return (
	  <Box className='world-map'>
				
				<Container sx={{pt:25}} className="center">
					<Button sx={{py:2, px:5, mt:5, borderRadius:4,border:2, fontSize:20, fontWeight:700, backgroundColor: '#ecdada07', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}} variant='outlined' size="large" color='white'> دریافت جایزه </Button>
					<Box sx={{borderRadius:4, border:1, width:"fit-content", py:2, px:5, mt:5, backgroundColor: '#ecdada07', mx:"auto", color:'#fff', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}}>
						<Typography variant="body2" > زمان تا کلایم بعدی </Typography>
						<Countdown date={Date.now() + 10**7} />
					</Box>

					<Grid container>
						<Grid item xs={12} md={4}>
							<Box sx={{borderRadius:4, border:1, width:"fit-content", py:2, px:5, mt:5, backgroundColor: '#ecdada07', mx:"auto", color:'#fff', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}}>
								<Typography variant="body2" > {} </Typography>
								<Typography variant="body2" > {} </Typography>
							</Box>
						</Grid>

						<Grid item xs={12} md={4}>
							<Box sx={{borderRadius:4, border:1, width:"fit-content", py:2, px:5, mt:5, backgroundColor: '#ecdada07', mx:"auto", color:'#fff', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}}>
								<Typography variant="body2" > {} </Typography>
								<Typography variant="body2" > {} </Typography>
							</Box>
						</Grid>

						<Grid item xs={12} md={4}>
							<Box sx={{borderRadius:4, border:1, width:"fit-content", py:2, px:5, mt:5, backgroundColor: '#ecdada07', mx:"auto", color:'#fff', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}}>
								<Typography variant="body2" > {} </Typography>
								<Typography variant="body2" > {} </Typography>
							</Box>
						</Grid>

					</Grid>

				
					
				</Container>
			
			</Box>
	)
  }
}
