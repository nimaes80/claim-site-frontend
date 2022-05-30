import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Alert, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import * as moment from 'jalali-moment';
import React, { Component } from 'react';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';



moment.locale('fa');

export default class UserList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchText: null,
			users: [],
			searchedUsers: [],
			error: null
			
		};
		this.handleSearchText = this.handleSearchText.bind(this);
		this.doSearch = this.doSearch.bind(this);
	};


	componentDidMount() {
		requests.get(urls.user, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('access')}`
			}
		})
			.then(response => {
				if (response.status === 200 && typeof(response.data) === 'object' ) {
					this.setState({
						users: response.data.data,
						searchedUsers: response.data.data,
					});
				}
			})
			.catch(error => {
				this.setState({
					error: error.data
				});
			});
	};


	handleSearchText(e) {
		this.setState({searchText:e.target.value});
	};


	doSearch() {
		const searchText = this.state.searchText;
		let searchedUsers = this.state.users.filter(user => {
			let isFiltered = false;
			for(let key in user){
				try {
					if(user[key].includes(searchText)){
					isFiltered = true;
				};
				}
				catch {
					return isFiltered;
				};
				
			};
			return isFiltered;
		});
		this.setState({searchedUsers : searchedUsers})

	};


	render() {
		return (
			<Box>
					<TextField onChange={this.handleSearchText} label='جست و جو' />
					<Button sx={{mx:2, my:1}} onClick={this.doSearch} endIcon={<SearchRoundedIcon />} variant='text' size="large" > جست و جو </Button>
					{
						this.state.error ? <Alert severity='error' sx={{my:2, p:1}} > شما دسترسی لازم برای دیدن این بخش را ندارید. </Alert> : null
					}
					<TableContainer sx={{width:"100%"}}>
						<Table sx={{width:"100%"}}>
							<TableHead>
								<TableRow>
									<TableCell className='center'> آی‌دی تلگرام </TableCell>	
									<TableCell className='center'> آخرین کلایم </TableCell>	
									<TableCell className='center'> جایزه </TableCell>	
									<TableCell className='center'> رفرال </TableCell>	
									<TableCell className='center'> جایزه‌ی رفرال </TableCell>	
									<TableCell className='center'> دریافتی </TableCell>	
								</TableRow>
							</TableHead>

							<TableBody>
								{
									this.state.searchedUsers.map((user, i) => (
										<TableRow key={i}> 
											<TableCell className='center'> { user.telegram_id } </TableCell>
											<TableCell className='center'> { moment.from(user.claim_datetime , 'en').local('fa').format('YYYY/MM/DD HH:mm:ss') } </TableCell>
											<TableCell className='center'> { user.claim_point } </TableCell>
											<TableCell className='center'> { user.referral } </TableCell>
											<TableCell className='center'> { user.subset_point } </TableCell>
											<TableCell className='center'> { user.withdraw } </TableCell>
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
