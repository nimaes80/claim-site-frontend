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


	removeSocials(e) {
		e.preventDefault();
		const sIndex = e.target.parentElement.parentElement.getAttribute('data-index');
		let socials = this.state.socials;
		socials.pop(sIndex);
		if (sIndex) {
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
	}
	
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
												<IconButton data-index={i} color="error" onClick={this.removeSocials}> <DeleteRoundedIcon /> </IconButton>
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
