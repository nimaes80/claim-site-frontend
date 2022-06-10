import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Container, Paper, Typography } from '@mui/material';
import React, { Component } from 'react';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';

export default class ButtomBar extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			questions:[],
			isLoaded: false,
		};

		this.getPages = this.getPages.bind(this);
		this.getQuestions = this.getQuestions.bind(this);

	};

	componentDidMount(){
		// requests.get(urls.faq)
		// 	.then(response => {
		// 		if (response.status === 200 && typeof(response.data.data) === 'object') {
		// 			this.setState({questions:response.data.data});
		// 		}
		// 	})
		this.getPages();

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

	};

	getQuestions({page_number=1}) {
		return requests.get(`${urls.faq}?page_size=100&page=${page_number}`, )
			.then(response => {
				if (response.status ===200 && typeof(response.data.data) === 'object' ) {
					return response.data.data
				};
			})
			.catch(error => {
			});
	};
	
	
	render() {
		return (
			<Container className="border box-main border-3" sx={{p:10, mb:5, borderRadius:7}}>
				{
					this.state.isLoaded ?
						<Paper>
							<Typography variant="h2" align='center'	fontWeight={500} sx={{my:2}}> FAQ </Typography>
							{
								this.state.questions.map((question, i) => (
									<Accordion key={i}>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1bh-content"
											id="panel1bh-header"
										>
											<Typography variant='h3' fontSize={20}>
												{ question.question }
											</Typography>
										</AccordionSummary>
										
										<AccordionDetails>
											<Typography variant='body'>
												{question.answer}
											</Typography>
										</AccordionDetails>

									</Accordion>
								))
							}
							
						</Paper>
					:
					null
				}



			</Container>
		);
	};
};
