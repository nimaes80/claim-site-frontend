import AutoFixNormalRoundedIcon from '@mui/icons-material/AutoFixNormalRounded';
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
			isLoaded: false,
			update: false,
			idx: 0,
		};

		this.addQuestion = this.addQuestion.bind(this);
		this.handleUpdateQuestion = this.handleUpdateQuestion.bind(this);
		this.removeQuestion = this.removeQuestion.bind(this);
		this.getQuestions = this.getQuestions.bind(this);
		this.handleQuestion = this.handleQuestion.bind(this);
		this.handleAnswer = this.handleAnswer.bind(this);
		this.getPages = this.getPages.bind(this);
		this.handelIdx = this.handelIdx.bind(this);
		this.updateQuestion = this.updateQuestion.bind(this);
		
	};



	componentDidMount() {
		this.getPages();
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

	handelIdx(e) {
		this.setState({
			idx: e.target.value,
		})
	}


	addQuestion() {
		requests.post(urls.faq,
			{
				question:this.state.question,
				answer:this.state.answer,
			},
			{headers:{'Authorization': `Bearer ${localStorage.getItem('access')}`}}
			
			).then(response => {
				if (response.status === 201 ) {
					this.getPages();
					this.forceUpdate();
				};
			})
			.catch(error => {
				
			})
	};

	handleUpdateQuestion(e) {
		e.preventDefault();
		const qId = e.target.parentElement.parentElement.getAttribute('data-id');
		const qIndex = e.target.parentElement.parentElement.getAttribute('data-index');
		if (qId && qIndex) {
			let q = this.state.questions[qIndex]
			this.setState({
				question:q.question,
				answer:q.answer,
				idx: qId,
				update: true,
			});

		};
	};


	updateQuestion(){

		requests.put(`${urls.faq}${this.state.idx}/`, {
			question:this.state.question,
			answer:this.state.answer,
		},
		{headers:{'Authorization': `Bearer ${localStorage.getItem('access')}`}})
				.then( response => {
					this.getPages();
					this.setState({update:false, question:null, answer:null, idx:0});
				})
				.catch(error => {
					this.getPages();
					this.setState({update:false, question:null, answer:null, idx:0});
				});
			
			
		const inputs = document.getElementsByTagName('input');
		inputs.forEach(input => {
			input.value = '';
		});
		const textareas = document.getElementsByTagName('textarea');
		textareas.forEach(textarea => {
			textarea.value = '';
		});
		alert('ویرایش شد.')
	};



	removeQuestion(e) {
		e.preventDefault();
		const qId = e.target.parentElement.parentElement.getAttribute('data-id');
		const qIndex = e.target.parentElement.parentElement.getAttribute('data-index');
		if (qId && qIndex) {
			requests.delete(`${urls.faq}${qId}/`, {headers:{'Authorization': `Bearer ${localStorage.getItem('access')}`}})
				.then( response => {
					let q = this.state.questions;
					q.pop(qIndex);
					this.setState({questions: q});
				})
				.catch(error => {
					if (error.status === 404) {
						let q = this.state.questions;
						q.pop(qIndex);
						this.setState({questions: q});
					}
				})
			}
	};


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
				<FormControl fullWidth>
					<input hidden name="idx" id="idx" value={this.state.idx} onChange={this.handelIdx} />
					<TextField defaultValue={this.state.question} onChange={this.handleQuestion} multiline sx={{my:1}} label='سوال' id='question' />
					<TextField defaultValue={this.state.answer} onChange={this.handleAnswer} multiline sx={{my:1}} label='جواب' id='answer' />
					{
						this.state.update ?
							<Button hidden={true} variant="outlined" onClick={this.updateQuestion} className="center" sx={{my:3, width:{md:"25%"}, py:1.5, }} size="large" endIcon={<AutoFixNormalRoundedIcon />} color="success"> ویرایش </Button>
						:
							<Button variant="outlined" onClick={this.addQuestion} className="center" sx={{my:3, width:{md:"25%"}, py:1.5, }} size="large" endIcon={<SaveRoundedIcon />} color="success"> ذخیره </Button>

					}

					
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

							{
								this.state.isLoaded ? <>
									<TableBody>
										{
											this.state.questions.map((question, i) => (
												<TableRow key={i}>
													<TableCell sx={{width:'5%'}} className='center'> { question.id } </TableCell>	
													<TableCell sx={{width:'80%'}} className='center'> { question.question } </TableCell>
													<TableCell sx={{width:'15%'}} className='center'>
														<Tooltip title='ویرایش'><IconButton data-id={question.id} data-index={i} onClick={this.handleUpdateQuestion} color='info'><EditRoundedIcon /> </IconButton></Tooltip>
														<Tooltip title='حذف'><IconButton data-id={question.id} data-index={i} onClick={this.removeQuestion} color='error'><DeleteRoundedIcon /> </IconButton></Tooltip>
													</TableCell>
													
												</TableRow>
											))
										}
									</TableBody>
								</>
								:
								null
							}

						</Table>
					</TableContainer>


			</Box>
		);
	};
};

