import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, Card, CardContent, Chip, Container, Dialog, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';

export default class Body extends Component {


	constructor(props) {
		super(props);
		this.state = {
			user: {},
			amount: 0,
			redirect:false, 
			isLoaded:false,
			isDialogOpen: false,
			isCopy: false
		};


		this.getUser = this.getUser.bind(this);
		this.copyRef = this.copyRef.bind(this);
		this.handleWithdraw = this.handleWithdraw.bind(this);
		this.withdraw = this.withdraw.bind(this);
		this.handleDialog = this.handleDialog.bind(this);
		
	}


	componentDidMount() {
		this.getUser();
	}

	getUser() {
		requests.get(urls.userProfile, {
			headers: { 'Authorization': `Bearer ${localStorage.getItem('access')}` }
		})
		.then(response => {
			if (response.status === 200 && typeof(response.data) === 'object' ) {
				this.setState({
					user:response.data,
					redirect:false,
					isLoaded:true,
				})
				
			}
		})
		.catch(error => {
			this.setState({redirect:true, isLoaded:true})
		})
	}


	copyRef(){
		this.setState({isCopy: true})
		navigator.clipboard.writeText(`http://localhost:3000/referral/${this.state.user.uuid}/`);
	}

	withdraw() {
		requests.post(urls.withdraw, {amount:this.state.amount}, {headers:{'Authorization': `Bearer ${localStorage.getItem('access')}`}})
			.then(response => {
				alert('Done');

			})
			.catch(error => {
				alert('Account balance is not enough');
			})
	};

	handleWithdraw(e) {
		this.setState({amount:e.target.value});
	};


	handleDialog (e) {
		this.setState({isDialogOpen:!this.state.isDialogOpen});
	}

  render() {
	return (
		<Container>
			{
				this.state.isLoaded ?
					(
						!this.state.redirect ?
							<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
								<CardContent className="center" >
									<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
										<Typography variant="h6"> Current balance </Typography>
										<Typography variant="body"> {this.state.user.claim_point + this.state.user.subset_point - this.state.user.total_withdraw } </Typography>
									</Card>

									<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
										<Typography variant="h6"> Total claimed amount till today </Typography>
										<Typography variant="body"> { this.state.user.claim_point } </Typography>
									</Card>

									<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
										<Typography variant="h6"> Total rewards from referrals  </Typography>
										<Typography variant="body"> { this.state.user.subset_point } </Typography>
									</Card>

									<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
										<Typography variant="h6"> Total withdrawal from this account </Typography>
										<Typography variant="body"> {  this.state.user.total_withdraw } </Typography>
									</Card>


									<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
										<Typography variant="h6"> Referrals </Typography>
										<Accordion>
											<AccordionSummary>
												<Typography color="primary" className="center" > Invitation </Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography> The link below is your referral link , share your link with other people and you will earn 30% each time any of your referrals click on claim! </Typography>
												<Chip sx={{my:1}} label={`http://localhost:3000/referral/${this.state.user.uuid}`} />
												<br />
												<Button onClick={this.copyRef}> Copy referral link </Button>
												<Snackbar open={this.state.isCopy} autoHideDuration={3000} message="Copied" className='border shadow rounded-1'>
													<Alert severity="success" >
														Copied
													</Alert>
												</Snackbar>
											</AccordionDetails>
										</Accordion>

									</Card>


									<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
										<TextField type="number" onChange={this.handleWithdraw} label="Withdraw amount" /> <br />
										<Button size="large" onClick={this.handleDialog}> Withdraw </Button>
									</Card>
								</CardContent>



								

								<Dialog open={this.state.isDialogOpen} onClose={this.state.handleDialog}>
									<DialogTitle>
										Withdraw from account
									</DialogTitle>
									<DialogContent>
										<DialogContentText sx={{my:1}}>
										Are you sure you want to withdraw {this.state.withdraw} from your inventor?
										<br />
										Your total current balance is {this.state.user.claim_point + this.state.user.subset_point - this.state.user.total_withdraw}										
										</DialogContentText>
										<Button size="large" onClick={this.withdraw}> Yes </Button>
										<Button size="large" onClick={this.handleDialog}> No </Button>
									</DialogContent>
									
								</Dialog>
							</Card>
						:
						<Navigate to="/" />
					)
					:
					null
  			}
	</Container>
	)
  }
}
