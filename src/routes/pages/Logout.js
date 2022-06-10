import { Alert } from '@mui/material';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export default class Logout extends Component {


	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};
	};

	componentDidMount() {
		localStorage.clear();
		this.setState({redirect:true});
	};
  render() {
	return (
	  
		  this.state.redirect ? <Navigate to='/' /> : <Alert severity='info' sx={{mt:5}} className='center' > Please wait... </Alert>
	  
	);
  };
};
