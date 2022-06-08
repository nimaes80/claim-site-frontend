import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { Component } from 'react';
import Countdown from 'react-countdown';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';


export default class TopBar extends Component {

	constructor(props){
		super(props);
		this.state = {
			user:{},
			globals: [],

		};
		this.getUser = this.getUser.bind(this);
		this.claim = this.claim.bind(this);
	};


	componentDidMount() {
		this.getUser();
		this.getExteras();
	}

	
	claim() {
		requests.post(urls.userClaim, {}, {
			headers: { 'Authorization': `Bearer ${localStorage.getItem('access')}` }
		})
			.then( response => {
				this.getUser();
				alert('دریافت شد.')
			}
			)
			.catch(error => {
				alert('شما قبلا کلایم کرده‌اید.')
			});
	}




	getUser() {
		requests.get(urls.userProfile, {
			headers: { 'Authorization': `Bearer ${localStorage.getItem('access')}` }
		})
		.then(response => {
				if (response.status === 200 && typeof(response.data) === 'object' ) {
					this.setState({user:response.data});
				}
			})
			.catch(error => {})
	}


	getExteras() {
		requests.get(urls.globalInfo, {
			headers: { 'Authorization': `Bearer ${localStorage.getItem('access')}` }
		})
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
			<Box sx={{p:0,m:0}} maxWidth="100%">
				<Box className="topbar-body">
					<Box className='button-anim'>
						<Container className="center">
							<Button onClick={this.claim} sx={{py:2, px:5, borderRadius:4,border:2, fontSize:20, fontWeight:700, backgroundColor: '#ecdada07', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}} variant='outlined' size="large" color='white'> کلایم </Button>
							<Box sx={{borderRadius:4, border:1, width:"fit-content", py:2, px:5, mt:5, backgroundColor: '#ecdada07', mx:"auto", color:'#fff', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}}>
								<Typography variant="body2" > زمان تا کلایم بعدی </Typography>
								{
									Object.keys(this.state.user).length ?
										<Countdown date={ this.state.user.claim_datetime } />
									:
									null

								}
							</Box>

							<Grid container alignItems="center" justifyContent="center">
									{
										Object.keys(globals).map((global, i) => (
											<Grid item xs={12} md={4} key={i}>
												<Box sx={{borderRadius:4, border:1, width:"fit-content", py:2, px:5, mt:5, backgroundColor: '#ecdada07', mx:"auto", color:'#fff', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}}>
													<Typography variant="body2" > {globals[global].title} </Typography>
													<Typography variant="body2" > {globals[global].value} </Typography>
												</Box>
											</Grid>
										))
									}

							</Grid>
						</Container>

					</Box>
					<div class='light x1'></div>
					<div class='light x2'></div>
					<div class='light x3'></div>
					<div class='light x4'></div>
					<div class='light x5'></div>
					<div class='light x6'></div>
					<div class='light x7'></div>
					<div class='light x8'></div>
					<div class='light x9'></div>
				</Box>
			</Box>
		</>
		)
	}
}
