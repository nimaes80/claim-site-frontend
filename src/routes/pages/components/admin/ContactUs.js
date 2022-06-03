import { DeleteForeverRounded, RemoveRedEyeRounded } from '@mui/icons-material';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';

export default class ContactUs extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messages: [],

		};
		this.handleDelete = this.handleDelete.bind(this);
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

	handelDialog() {
		
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
									<TableCell title="تنظیمات" className="center" sx={{width:"10%"}} >
										<IconButton title='مشاهده' color='primary'> <RemoveRedEyeRounded /> </IconButton>
										<IconButton data-id={ message.id } data-index={i} onClick={this.handleDelete}  title='حذف' color='error'> <DeleteForeverRounded /> </IconButton>
									</TableCell>
								</TableRow>
							))
						}

					</TableBody>
				</Table>
			</TableContainer>
		</Box>
		);
	};
};
