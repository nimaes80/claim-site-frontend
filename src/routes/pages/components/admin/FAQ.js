import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Box, Button, Divider, FormControl, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import React, { Component } from 'react';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';

export default class FAQ extends Component {


	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			question: null,
			answer: null,
		};

		this.addQuestion = this.addQuestion.bind(this);
		this.updateQuestion = this.updateQuestion.bind(this);
		this.removeQuestion = this.removeQuestion.bind(this);
		this.getQuestions = this.getQuestions.bind(this);
	};



	componentDidMount() {
		this.getQuestions();
	};


	handleQuestion(e) {
		this.setState({
			question:e.target.value, 
		});
	};
	handleAnswer(e) {
		this.setState({
			answer:e.target.value, 
		});
	};


	addQuestion() {
		requests.post(urls.faq,
			{
				question:this.state.question,
				answer:this.state.answer,
			},
			{
				'Authorization': `Bearer ${localStorage.getItem('access')}`,

			}
			
			).then(response => {
				if (response.status ===200 && typeof(response.data.data) === 'object' ) {
					this.getQuestions();
				};
			})
			.catch(error => {
				
			})
	};

	updateQuestion() {

	};
	removeQuestion(e) {
		console.log(e)
	};


	getQuestions() {
		requests.get(urls.faq)
			.then(response => {
				if (response.status ===200 && typeof(response.data.data) === 'object' ) {
					this.setState({questions: response.data.data})
				};
			})
			.catch(error => {
				
			})
	};
	
	render() {
		return (
			<Box className="center">
				<FormControl fullWidth>

					<TextField onChange={this.handleQuestion} sx={{my:1}} label='سوال' id='question' />
					<TextField onChange={this.handleAnswer} sx={{my:1}} label='جواب' id='answer' />
					<Button variant="outlined" onClick={this.addQuestion} className="center" sx={{my:3, width:{md:"25%"}, py:1.5, }} size="large" endIcon={<SaveRoundedIcon />} color="success"> ذخیره </Button>
					<Divider sx={{my:3}} />

				</FormControl>
					<TableContainer sx={{width:"100%"}}>
						<Table sx={{width:"100%"}}>
							<TableHead>
								<TableRow>
									<TableCell sx={{width:'5%'}} className='center'> کد </TableCell>	
									<TableCell sx={{width:'80%'}} className='center'> سوال </TableCell>	
									<TableCell sx={{width:'15%'}} className='center'>  </TableCell>	
								</TableRow>
							</TableHead>

							<TableBody>
								{
									this.state.questions.map((question, i) => (
										<TableRow key={i}>
											<TableCell sx={{width:'5%'}} className='center'> { question.id } </TableCell>	
											<TableCell sx={{width:'80%'}} className='center'> { question.text } </TableCell>
											<TableCell sx={{width:'15%'}} className='center'>
												<Tooltip title='ویرایش'><IconButton onClick={this.updateQuestion} color='info'><EditRoundedIcon /> </IconButton></Tooltip>
												<Tooltip title='حذف'><IconButton id={question.id} onClick={this.removeQuestion} color='error'><DeleteRoundedIcon /> </IconButton></Tooltip>
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

