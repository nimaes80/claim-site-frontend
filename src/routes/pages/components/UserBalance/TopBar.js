import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { Component } from 'react';
import Countdown from 'react-countdown';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';

export default class TopBar extends Component {

	constructor(props){
		super(props);
		this.state = {
			user:{},
			globals: [],
			isRobot: true

		};
		this.getUser = this.getUser.bind(this);
		this.claim = this.claim.bind(this);
		this.handleVerify = this.handleVerify.bind(this);
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
				alert('Received.')
			}
			)
			.catch(error => {
				alert('You have already claimed before.')
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


	handleVerify(e) {
		this.setState({isRobot: false})
	}

	
	render() {
		const globals = this.state.globals;
		return (
		<>
			<Box sx={{p:0,m:0}} maxWidth="100%">
				<Box className="topbar-body">
					<Box className='button-anim'>
						<Container className="center">
							<GoogleReCaptcha onVerify={this.handleVerify} />
							<Button disabled={this.state.isRobot} onClick={this.claim} sx={{py:2, px:5, borderRadius:4,border:2, fontSize:20, fontWeight:700, backgroundColor: '#ecdada07', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}} variant='outlined' size="large" color='white'> Claim </Button>
							<Box sx={{borderRadius:4, border:1, width:"fit-content", py:2, px:5, mt:5, backgroundColor: '#ecdada07', mx:"auto", color:'#fff', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}}>
								<Typography variant="body2" > Time till next claim </Typography>
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
											<Grid item xs={12} key={i}>
												<Box sx={{borderRadius:4, border:1, width:"fit-content", py:2, px:5, mt:5, backgroundColor: '#ecdada07', mx:"auto", color:'#fff', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}}>
													<Typography variant="body2"> {globals[global].title} </Typography>
													<Typography variant="body2"> {globals[global].value} </Typography>
												</Box>
											</Grid>
										))
									}

							</Grid>
						</Container>

					</Box>
					<div className='light x1'></div>
					<div className='light x2'></div>
					<div className='light x3'></div>
					<div className='light x4'></div>
					<div className='light x5'></div>
					<div className='light x6'></div>
					<div className='light x7'></div>
					<div className='light x8'></div>
					<div className='light x9'></div>
				</Box>
			</Box>
		</>
		)
	}
}
