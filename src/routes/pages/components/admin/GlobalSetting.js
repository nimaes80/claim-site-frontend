import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Button, FormControl, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { Component } from 'react';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';


export default class GlobalSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			value: null,
			globals: {},


		};
		this.handleTitle = this.handleTitle.bind(this);
		this.handleValue = this.handleValue.bind(this);
		this.addGlobal = this.addGlobal.bind(this);
		this.removeGlobal =this.removeGlobal.bind(this);
		
	};


	componentDidMount() {
		requests.get(urls.globalInfo)
			.then(response => {
				if (response.status === 200 && typeof(response.data) === 'object'){
					this.setState({
						globals:response.data.extra
					});
				}
			})
			.catch(error => {})
	}


	handleTitle(e) {
		this.setState({ title: e.target.value });
	};
	handleValue(e) {
		this.setState({ value: e.target.value });
	};


	addGlobal() {
		let globals = this.state.globals;
		globals[`${Object.keys(globals).length + 1}-${Math.random(1).toString(16).slice(2)}`] = {title: this.state.title, value: this.state.value}
		requests.patch(urls.updateGlobalInfo, {
			extra: globals
		}, {headers: {'Authorization': `Bearer ${localStorage.getItem('access')}`}})
			.then(response => {
				if (response.status === 200 && typeof(response.data.data) === 'object' ) {
					this.setState({
						globals: globals
					})
				}
			})
			.catch(error => {})
	}


	removeGlobal(gIndex){
		let globals = this.state.globals;
		delete globals[gIndex]
		requests.patch(urls.updateGlobalInfo,
			{
				extra:globals
			},
			{headers:{'Authorization': `Bearer ${localStorage.getItem('access')}`}})
			.then( response => {
				this.setState({globals: globals});
			})
			.catch(error => {
				if (error.status === 404) {
					this.setState({globals: globals});
				}
			})
	}


	render() {
		const globals = this.state.globals;
		return (
			<Box className="center">
					<TableContainer sx={{width:"100%"}}>
						<FormControl fullWidth >
							<TextField sx={{my:1}} label='عنوان' type='text' onChange={this.handleTitle} />
							<TextField sx={{my:1}} label='مقدار' type="text" onChange={this.handleValue} />
							<Button onClick={this.addGlobal} className="center" variant="contained" component="label" sx={{my:"5px !important", width:{sx:'100%', md:'25%'}}}> ذخیره </Button>
						</FormControl>
						<Table sx={{width:"100%"}}>
							<TableHead>
								<TableRow>
									<TableCell sx={{width:"5%"}} className='center'> کد </TableCell>	
									<TableCell sx={{width:"25%"}} className='center'> نام </TableCell>	
									<TableCell sx={{width:"65%"}} className='center'> مقدار </TableCell>	
									<TableCell sx={{width:"5%"}} className='center'>  </TableCell>	
								</TableRow>
							</TableHead>

							<TableBody>
								{
									Object.keys(globals).map((global, i) => (
										<TableRow key={i}> 
											<TableCell sx={{width:"5%"}} className='center'>{ global }  </TableCell>
											<TableCell sx={{width:"25%"}} className='center'>{ globals[global].title }  </TableCell>
											<TableCell sx={{width:"65%"}} className='center'>{ globals[global].value }  </TableCell>
											<TableCell sx={{width:"5%"}} className='center'>
												<IconButton onClick={() => {this.removeGlobal(global)}} color="error"> <DeleteRoundedIcon /> </IconButton>
											</TableCell>
										</TableRow>
									))
								}
								



							</TableBody>



						</Table>
					</TableContainer>


			</Box>
		)
	}
}
