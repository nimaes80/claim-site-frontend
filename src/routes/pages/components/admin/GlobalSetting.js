import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Button, FormControl, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { Component } from 'react';

export default class GlobalSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			value: null,
			globals: [],


		};
		this.handleTitle = this.handleTitle.bind(this);
		this.handleValue = this.handleValue.bind(this);
	};


	handleTitle(e) {
		this.setState({ title: e.target.value });
	};
	handleValue(e) {
		this.setState({ value: e.target.value });
	};

	render() {
		return (
			<Box className="center">
					<TableContainer sx={{width:"100%"}}>
						<FormControl fullWidth >
							<TextField sx={{my:1}} label='عنوان' type='text' onChange={this.handleTitle} />
							<TextField sx={{my:1}} label='مقدار' type="text" onChange={this.handleValue} />
							<Button className="center" variant="contained" component="label" sx={{my:"5px !important", width:{sx:'100%', md:'25%'}}}> ذخیره </Button>
						</FormControl>
						<Table sx={{width:"100%"}}>
							<TableHead>
								<TableRow>
									<TableCell className='center'> کد </TableCell>	
									<TableCell className='center'> نام </TableCell>	
									<TableCell className='center'> مقدار </TableCell>	
									<TableCell className='center'>  </TableCell>	
								</TableRow>
							</TableHead>

							<TableBody>
								{
									this.state.globals.map(global => (
										<TableRow> 
											<TableCell className='center'> { global.id } </TableCell>	
											<TableCell className='center'>{ global.title }  </TableCell>
											<TableCell className='center'>{ global.value }  </TableCell>
											<TableCell className='center'>
												<IconButton color="error"> <DeleteRoundedIcon /> </IconButton>
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
