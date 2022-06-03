import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Button, FormControl, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';


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
			this.setState({ file: f});
			this.setState({fileSelected: true})
		} else {

		};

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
									accept='.svg'
								/>
							</Button>
							{
								this.state.fileSelected ? <Typography variant='caption'> فایل انتخاب شد. </Typography> : null
							}
							<Button className="center" variant="contained" component="label" sx={{my:"5px !important", width:{sx:'100%', md:'25%'}}}> ذخیره </Button>
						</FormControl>
						<Table sx={{width:"100%"}}>
							<TableHead>
								<TableRow>
									<TableCell sx={{width:'5%'}} className='center'> کد </TableCell>	
									<TableCell sx={{width:'35%'}} className='center'> نام </TableCell>	
									<TableCell sx={{width:'55%'}} className='center'> آدرس </TableCell>	
									<TableCell sx={{width:'5%'}} className='center'>  </TableCell>	
								</TableRow>
							</TableHead>

							<TableBody>
								{
									this.state.socials.map(social => (
										<TableRow> 
											<TableCell sx={{width:'5%'}} className='center'> { social.id } </TableCell>	
											<TableCell sx={{width:'35%'}} className='center'>{ social.title }  </TableCell>
											<TableCell sx={{width:'55%'}} className='center'>{ social.url }  </TableCell>
											<TableCell sx={{width:'5%'}} className='center'>
												<IconButton color="error"> <DeleteRoundedIcon /> </IconButton>
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
