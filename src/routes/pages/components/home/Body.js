import { Button, Container, Paper, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';


export default class Body extends Component {


	constructor(props){
		super(props);
		this.state = {
			wallet: null,
			telegramID: null,
			error: null,
			redirect: false,

		};
		this.handleAuthentication = props.handleAuthentication;
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
		if (localStorage.getItem('ref')) {
			var data = {
				'wallet_address': this.state.wallet,
				'telegram_id': `@${this.state.wallet}`,
				'referral': localStorage.getItem('ref'),
			}
		} else {
			// eslint-disable-next-line no-redeclare
			var data = {
				'wallet_address': this.state.wallet,
				'telegram_id': `@${this.state.wallet}`
			}
		}
		if (this.state.wallet.length > 10 & this.state.telegramID.length > 4){
			// eslint-disable-next-line eqeqeq
			if (this.state.wallet[0] == 0) {
				if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '@', '/', '#', '$', '%', '^', '&', '*'].includes(this.state.telegramID[0])) {
					requests.post(
						urls.login, data,
					).then(respoense => {
						if (respoense.status === 200 & typeof(respoense.data) == 'object') {
							localStorage.setItem('access', respoense.data.access);
							localStorage.setItem('refresh', respoense.data.refresh);
							this.handleAuthentication({value:true});
							this.setState({
								redirect:true
							});
							
						};
					}).catch(error => {
						this.setState({
							error:true,
						});
					});


				}else {
					alert('Please send your telegram ID again, note you have to send it without @ ( Example: Username)')

				}
			} else {
				alert('You entered wrong wallet address, please only Use BNB ( Smart chain)')
			}
		} else {
			alert('Please fill all fields.');
		};
	};



	render() {
		return (
			<>
			{
				!this.state.redirect ? (
					<Container  maxWidth="lg" sx={{my:10, }}>
						<Paper sx={{borderRadius:10, py:5, px:{xs:5, md:20}, }} className="shadow center box-main border-purple">
							<TextField onChange={this.handleWallet} sx={{mt:5}} label="Wallet address" color='secondary' fullWidth helperText="Please enter your Smart chain wallet address." variant="standard" />
							<TextField onChange={this.handleTelegramID} sx={{mt:5, }} label="Telegram ID" color='secondary' fullWidth helperText="Enter your Telegram ID without @ here"  variant="standard" InputProps={{startAdornment: <InputAdornment position="start"> @ </InputAdornment>}} />
							<Button onClick={this.handleButtonClick} sx={{mt:5, }} variant="outlined"> Login / Register </Button>
						</Paper>
					</Container>
				)
				:
				<Navigate to='/dashboard/balance/' />
			}
			</>
		);
	};
};
