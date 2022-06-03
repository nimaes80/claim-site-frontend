import { DeleteForeverRounded, RemoveRedEyeRounded } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { Component } from 'react';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';


export default class ContactUs extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			isDialogOpen: false,
			dialogMessage: null
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleDialog = this.handleDialog.bind(this);
		this.handleShow = this.handleShow.bind(this);
	};


	componentDidMount() {
		requests.get(urls.contact, {headers: {'Authorization': `Bearer ${localStorage.getItem('access')}`}})
			.then(response => {
				if (response.status=== 200 && typeof(response.data.data) === 'object') {
					this.setState({messages: response.data.data})
				};
			})
			.catch(error => {
			});
	};


	handleDelete(e) {
		e.preventDefault();
		const cID = e.target.parentElement.parentElement.getAttribute('data-id');
		const cIndex = e.target.parentElement.parentElement.getAttribute('data-index');
		if (cID) {
			requests.delete(`${urls.contact}${cID}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('access')}`}})
				.then(response => {
					const m = this.state.messages;
					m.pop(cIndex);
					this.setState({messages: m});
				})
				.catch(error => {
					if (error.status === 404) {
						const m = this.state.messages;
						m.pop(cIndex);
						this.setState({messages: m});
					};
				});
		};

	}

	handleShow(e) {
		e.preventDefault();
		const cID = e.target.parentElement.parentElement.getAttribute('data-index');
		if (cID) {
			this.setState({
				dialogMessage: this.state.messages[cID].text
			})
			this.handleDialog()
		}

	}


	handleDialog() {
		this.setState({isDialogOpen: !this.state.isDialogOpen})
	}

  	render() {
		return (
		<Box className="center">
			<TableContainer sx={{width:"100%"}}>
				<Table sx={{width:"100%"}}>
					<TableHead >
						<TableRow>
							<TableCell className="center" sx={{width:"10%"}} > کد </TableCell>
							<TableCell className="center" sx={{width:"27%"}} > نام و نام خانوادگی </TableCell>
							<TableCell className="center" sx={{width:"26%"}} > ایمیل </TableCell>
							<TableCell className="center" sx={{width:"26%"}} > تلفن </TableCell>
							<TableCell className="center" sx={{width:"10%"}} >  </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>

						{
							this.state.messages.map((message, i) => (
								<TableRow key={i}>
									<TableCell title="کد" className="center" sx={{width:"10%"}} > { message.id } </TableCell>
									<TableCell title="نام و نام خانوادگی" className="center" sx={{width:"27%"}} > { message.name } </TableCell>
									<TableCell title="ایمیل" className="center" sx={{width:"26%"}} > { message.email } </TableCell>
									<TableCell title="تلفن" className="center" sx={{width:"26%"}} > { message.phone } </TableCell>
									<TableCell className="center" sx={{width:"10%"}} >
										<IconButton data-id={ message.id } data-index={i} onClick={this.handleShow} color='primary'> <RemoveRedEyeRounded /> </IconButton>
										<IconButton data-id={ message.id } data-index={i} onClick={this.handleDelete} color='error'> <DeleteForeverRounded /> </IconButton>
									</TableCell>
								</TableRow>
							))
						}

					</TableBody>
				</Table>
			</TableContainer>
			<Dialog
				open={this.state.isDialogOpen}
				onClose={this.handleDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				>
				<DialogTitle id="alert-dialog-title">
					متن پیام
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
					{ this.state.dialogMessage }
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleDialog} autoFocus>
						بازگشت
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
		);
	};
};
