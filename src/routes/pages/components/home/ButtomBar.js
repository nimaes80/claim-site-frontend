import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Container, Paper, Typography } from '@mui/material';
import React, { Component } from 'react';

export default class ButtomBar extends Component {
	
	constructor(props) {
		super(props);
		this.state = {

		};
	};

	componentDidMount(){

	};
	
	
	render() {
		return (
			<Container className="shadow border" sx={{p:10, mb:5, }}>
				<Paper>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header"
						>
							<Typography variant='h3' fontSize={20}>
								TITLE
							</Typography>
						</AccordionSummary>
						
						<AccordionDetails>
							<Typography variant='body'>
								Desctiption
							</Typography>
						</AccordionDetails>

					</Accordion>
				</Paper>
				



			</Container>
		);
	};
};
