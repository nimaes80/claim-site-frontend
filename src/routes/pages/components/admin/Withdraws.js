import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Alert, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import * as moment from 'jalali-moment';
import React, { Component } from 'react';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';



moment.locale('fa');

export default class Withdraws extends Component {

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
		this.getUsers = this.getUsers.bind(this);
		this.getPages = this.getPages.bind(this);
		this.payPayments = this.payPayments.bind(this);
	};


	componentDidMount() {
		this.getPages();

	};



	getPages() {
		let listUsers = this.state.users;
		requests.get(`${urls.user}?page_size=100&page=1`, {headers:{'Authorization': `Bearer ${localStorage.getItem('access')}`}} )
			.then(response => {
				if (response.status ===200 && typeof(response.data) === 'object' ) {
					for (let i = 1; i <= response.data.num_of_pages; i++)  {
						this.getUsers({page_number:i})
							// eslint-disable-next-line no-loop-func
							.then(data => {
								data.forEach(element => {
									listUsers.push(element);
								});
								}
							)
							.catch(error => {

							})
							// eslint-disable-next-line no-loop-func
							.finally( () => {
								listUsers = this.filterWithdraw(listUsers);
								this.setState({users:listUsers, searchedUsers:listUsers});
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

	getUsers({page_number=1}) {

		return requests.get(`${urls.user}?page_size=100&page=${page_number}`, {headers:{'Authorization': `Bearer ${localStorage.getItem('access')}`}})
			.then(response => {
				if (response.status ===200 && typeof(response.data.data) === 'object' ) {
					return response.data.data
				};
			})
			.catch(error => {
			})
		
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
					if(user[key].includes(searchText) && user.last_withdraw > 0){
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



	filterWithdraw(data){
		let searchedUsers = data.filter(user => {
			if (user.last_withdraw > 0) {
				return true
			}
			return false
		});
		return searchedUsers
		

	}


	payPayments(user_id, i, user) {
		requests.post(urls.pay, {user_id:user_id}, {headers:{'Authorization': `Bearer ${localStorage.getItem('access')}`}})
			.then(() => {
				this.getPages();
			})
			.catch(()=> {})
	}


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
									<TableCell className='center'> کل موجودی </TableCell>	
									<TableCell className='center'> مبلغ برداشتی </TableCell>	
									<TableCell className='center'>  </TableCell>	
								</TableRow>
							</TableHead>

							<TableBody>
								{
									this.state.searchedUsers.map((user, i) => (
										<TableRow key={i}> 
											<TableCell className='center'> { user.telegram_id } </TableCell>
											<TableCell className='center'> { user.claim_point + user.subset_point - user.total_withdraw } </TableCell>
											<TableCell className='center'> { user.last_withdraw } </TableCell>
											<TableCell className='center'> 
											<Button onClick={(e) => {navigator.clipboard.writeText(user.wallet_address)}} > کپی ولت آدرس </Button>
											<Button onClick={() => {this.payPayments(user.id, i, user)}} > پرداخت شد </Button>
											
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
