import { Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';

export default class Body extends Component {


	constructor(props) {
		super(props);
		this.state = {
			user: {},
			amount: 0
		};


		this.getUser = this.getUser.bind(this);
		this.copyRef = this.copyRef.bind(this);
		this.handleWithdraw = this.handleWithdraw.bind(this);
		this.withdraw = this.withdraw.bind(this);
		
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
				this.setState({user:response.data})
			}
		})
		.catch(error => {
			alert('لطفا از اکانت خود خارج و سپس دوباره وارد شوید.');
		})
	}


	copyRef(){
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
		this.setState({amount:e.target.value})
	};


  render() {
	return (
		<Container>


		<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>

			<CardContent className="center" >
				<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
					<Typography variant="h6"> بالانس </Typography>
					<Typography variant="body"> {this.state.user.withdraw} </Typography>
				</Card>

				<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
					<Typography variant="h6"> رفرال </Typography>
					<Button onClick={this.copyRef}> کپی کد دعوت </Button>
				</Card>

				<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
					<Typography variant="h6"> جایزه </Typography>
					<Typography variant="body"> {  this.state.user.claim_point } </Typography>
				</Card>

				<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
					<TextField type="number" onChange={this.handleWithdraw} label="میزان برداشت" /> <br />
					<Button size="large" onClick={this.withdraw}> برداشت </Button>
				</Card>
				
			</CardContent>


		</Card>



	</Container>
	)
  }
}
