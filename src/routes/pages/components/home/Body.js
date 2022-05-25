import { Container, Paper, TextField, Button } from '@mui/material'
import React, { Component } from 'react'
import InputAdornment from '@mui/material/InputAdornment';

export default class Body extends Component {


	constructor(props){
		super(props);
		this.state = {
			wallet: null,
			telegramID: null,

		};
		this.handleWallet = this.handleWallet.bind(this);
		this.handleTelegramID = this.handleTelegramID.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
	};


	handleWallet (event) {
		this.setState({
			wallet: event.target.value,
		});
	};
	handleTelegramID (event) {
		this.setState({
			telegramID: event.target.value,
		});
	};

	handleButtonClick() {
		// eslint-disable-next-line eqeqeq
		if (this.state.wallet[0] == 0 & this.state.wallet.length > 10 & this.state.telegramID.length > 4){
			// requests
		};
	};



	render() {
		return (
			<>
			<Container  maxWidth="lg" sx={{my:20, }}>
				<Paper sx={{borderRadius:10, py:5, px:{xs:5, md:20}, }} className="shadow border border-3 center box-main">
					<TextField onChange={this.handleWallet} sx={{mt:5}} label="آدرس والت" color='secondary' fullWidth helperText="آدرس والت اسمارت چین خود را وارد کنید." variant="standard" />
					<TextField onChange={this.handleTelegramID} sx={{mt:5, }} label="آی‌دی تلگرام" color='secondary' fullWidth helperText="آی‌دی تلگرام خود را بدون @ وارد کنید.."  variant="standard" InputProps={{endAdornment: <InputAdornment position="start"> @ </InputAdornment>}} />
					<Button onClick={this.handleButtonClick} sx={{mt:5, }} variant="outlined"> ورود/ثبت نام </Button>
				</Paper>
			</Container>
			</>
		);
	};
};
