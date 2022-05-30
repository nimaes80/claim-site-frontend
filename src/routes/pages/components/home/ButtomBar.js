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
		};
	};

	componentDidMount(){
		requests.get(urls.faq)
			.then(response => {
				if (response.status === 200 && typeof(response.data.data) === 'object') {
					this.setState({questions:response.data.data});
				}
			})
	};
	
	
	render() {
		return (
			<Container className="border box-main border-3" sx={{p:10, mb:5, borderRadius:7}}>
				<Paper>
					<Typography variant="h2" align='center'	fontWeight={500} sx={{my:2}}> سوالات متداول </Typography>
					{
						this.state.questions.map((question, i) => (
							<Accordion key={i}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1bh-content"
									id="panel1bh-header"
								>
									<Typography variant='h3' fontSize={20}>
										{ question.text }
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
				



			</Container>
		);
	};
};
