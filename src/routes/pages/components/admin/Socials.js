import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Button, FormControl, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';


export default class Socials extends Component {

	
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			url: null,
			file: null,
			fileSelected: false,
			socials: [],

		};
		this.handleTitle = this.handleTitle.bind(this);
		this.handleURL = this.handleURL.bind(this);
		this.handleFile = this.handleFile.bind(this);
		this.addSocials = this.addSocials.bind(this);
		this.removeSocials = this.removeSocials.bind(this);
		this.getPages = this.getPages.bind(this);
		

	};


	componentDidMount() {
		requests.get(urls.globalInfo)
			.then(response => {
				if (response.status === 200 && typeof(response.data) === 'object') {
					this.setState({socials:response.data.socials})
				};
			})
			.catch(error => {});
	};


	handleTitle(e) {
		this.setState({ title: e.target.value });
	};
	handleURL(e) {
		this.setState({ url: e.target.value });
	};
	handleFile(e) {
		const f =  e.target.files[0];
		if (f.type.includes('svg') && f.name.includes('svg')) {
			const reader = new FileReader();
			reader.readAsText(f, "UTF-8");;
			reader.onload = (evt) => {
				this.setState({ file: evt.target.result});
				this.setState({fileSelected: true})
			}
		}
	};


	addSocials() {
		let socials = this.state.socials;
		socials.push({
			title: this.state.title,
			url: this.state.url,
			icon: this.state.file,
		})
		requests.patch(urls.updateGlobalInfo, {
			socials:socials,

		}, {headers:{'Authorization': `Bearer ${localStorage.getItem('access')}`}})
			.then(response => {
				this.setState({socials:socials});
			})
			.catch(error => {
			})
	};


	removeSocials(sIndex) {
		let socials = this.state.socials;
		socials.pop(sIndex);
		requests.patch(urls.updateGlobalInfo,
			{
				socials:socials
			},
			{headers:{'Authorization': `Bearer ${localStorage.getItem('access')}`}})
			.then( response => {
				this.setState({socials: socials});
			})
			.catch(error => {
				if (error.status === 404) {
					this.setState({socials: socials});
				}
			})
	}
	


	getPages() {
		let listQuestions = this.state.questions;
		requests.get(`${urls.faq}?page_size=100&page=1`, )
			.then(response => {
				if (response.status ===200 && typeof(response.data) === 'object' ) {
					for (let i = 1; i <= response.data.num_of_pages; i++)  {
						this.getQuestions({page_number:i})
							.then(data => {
								data.forEach(element => {
									listQuestions.push(element);
									this.setState({questions:listQuestions});
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

	getQuestions({page_number=1}) {

		return requests.get(`${urls.faq}?page_size=100&page=${page_number}`, )
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
						<FormControl fullWidth >
							<TextField sx={{my:1}} label='عنوان' type='text' onChange={this.handleTitle} />
							<TextField sx={{my:1}} label='آدرس' type="url" onChange={this.handleURL} />
							<Button endIcon={<AddAPhotoRoundedIcon />} className="center" variant="contained" component="label" sx={{my:"5px !important", width:{sx:'100%', md:'25%'}}} > انتخاب لوگو
								<input onChange={this.handleFile}
									type="file"
									hidden
									accept='image/svg+xml'
								/>
							</Button>
							{
								this.state.fileSelected ? <Typography variant='caption'> فایل انتخاب شد. </Typography> : null
							}
							<Button onClick={this.addSocials} className="center" variant="contained" component="label" sx={{my:"5px !important", width:{sx:'100%', md:'25%'}}}> ذخیره </Button>
						</FormControl>
						<Table sx={{width:"100%"}}>
							<TableHead>
								<TableRow>
									<TableCell sx={{width:'30%'}} className='center'> نام </TableCell>	
									<TableCell sx={{width:'60%'}} className='center'> آدرس </TableCell>	
									<TableCell sx={{width:'10%'}} className='center'>  </TableCell>	
								</TableRow>
							</TableHead>

							<TableBody>
								{
									this.state.socials.map((social, i) => (
										<TableRow key={i}>
											<TableCell sx={{width:'30%'}} className='center'>{ social.title }  </TableCell>
											<TableCell sx={{width:'60%'}} className='center'>{ social.url }  </TableCell>
											<TableCell sx={{width:'10%'}} className='center'>
												<IconButton color="error" onClick={() => (this.removeSocials(i))}> <DeleteRoundedIcon /> </IconButton>
											</TableCell>
										</TableRow>
									))
								} 
								



							</TableBody>



						</Table>
					</TableContainer>


			</Box>
		);
  }
}
