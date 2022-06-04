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
		this.getPages = this.getPages.bind(this);
	};


	componentDidMount() {
		this.getPages()
	};


	handleDelete(cID, cIndex) {
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

	}

	handleShow(cID) {
		this.setState({
			dialogMessage: this.state.messages[cID].text
		})
		this.handleDialog()
	}


	handleDialog() {
		this.setState({isDialogOpen: !this.state.isDialogOpen})
	}





	getPages() {
		let listMessages = this.state.messages;
		requests.get(`${urls.contact}?page_size=100&page=1`, {headers: {'Authorization': `Bearer ${localStorage.getItem('access')}`}})
			.then(response => {
				if (response.status ===200 && typeof(response.data) === 'object' ) {
					for (let i = 1; i <= response.data.num_of_pages; i++)  {
						this.getContacts({page_number:i})
							.then(data => {
								data.forEach(element => {
									listMessages.push(element);
									this.setState({messages:listMessages});
								});
								}
							)
							.catch(error => {

							});
					};
					

				};
			})
			.catch(error => {
				console.log(error)
			});
		this.setState({isLoaded: true, });
		this.forceUpdate();

	};

	getContacts({page_number=1}) {

		return requests.get(`${urls.contact}?page_size=100&page=${page_number}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('access')}`}})
			.then(response => {
				if (response.status ===200 && typeof(response.data.data) === 'object' ) {
					return response.data.data
				};
			})
			.catch(error => {
			})
		
	};




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
										<IconButton onClick={() => {this.handleShow(message.id, i)}} color='primary'> <RemoveRedEyeRounded /> </IconButton>
										<IconButton onClick={() => {this.handleDelete(message.id, i)}} color='error'> <DeleteForeverRounded /> </IconButton>
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
