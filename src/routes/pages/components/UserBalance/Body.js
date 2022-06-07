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
				alert('انجام شد.');

			})
			.catch(error => {
				alert('موجودی کافی نیست');
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
										<Typography variant="h6"> موجودی فعلی </Typography>
										<Typography variant="body"> {this.state.user.claim_point + this.state.user.subset_point - this.state.user.total_withdraw } </Typography>
									</Card>

									<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
										<Typography variant="h6"> کل مقدار کلایم شده تا امروز </Typography>
										<Typography variant="body"> { this.state.user.claim_point } </Typography>
									</Card>

									<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
										<Typography variant="h6"> جایزه‌ی رفرل تا امروز </Typography>
										<Typography variant="body"> { this.state.user.subset_point } </Typography>
									</Card>

									<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
										<Typography variant="h6"> کل برداشتی </Typography>
										<Typography variant="body"> {  this.state.user.total_withdraw } </Typography>
									</Card>


									<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
										<Typography variant="h6"> رفرال </Typography>
										<Accordion>
											<AccordionSummary>
												<Typography color="primary" className="center" > دعوت </Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>این کد مخصوص شماست، این کد را به دوستان خود بفرستید تا مقداری از جایزه‌های آن‌ها را دریافت کنید. </Typography>
												<Chip sx={{my:1}} label={`http://localhost:3000/referral/${this.state.user.uuid}`} />
												<br />
												<Button onClick={this.copyRef}> کپی کد دعوت </Button>
												<Snackbar open={this.state.isCopy} autoHideDuration={3000} message="کپی شد" className='border shadow rounded-1'>
													<Alert severity="success" >
														کپی شد
													</Alert>
												</Snackbar>
											</AccordionDetails>
										</Accordion>

									</Card>


									<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
										<TextField type="number" onChange={this.handleWithdraw} label="میزان برداشت" /> <br />
										<Button size="large" onClick={this.handleDialog}> برداشت </Button>
									</Card>
								</CardContent>



								

								<Dialog open={this.state.isDialogOpen} onClose={this.state.handleDialog}>
									<DialogTitle>
										برداشت از حساب
									</DialogTitle>
									<DialogContent>
										<DialogContentText sx={{my:1}}>
											آیا از برداشت {this.state.withdraw} از موجودی خود مطمئن هستید؟
											<br />
											موجودی فعلی شما {this.state.user.claim_point + this.state.user.subset_point - this.state.user.total_withdraw} می‌باشد.
										</DialogContentText>
										<Button size="large" onClick={this.withdraw}> بله </Button>
										<Button size="large" onClick={this.handleDialog}> خیر </Button>
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
