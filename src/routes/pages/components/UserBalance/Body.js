import React, { Component } from 'react'
import { Card, CardContent, Container, Divider, List, ListItem, Typography } from '@mui/material';

export default class Body extends Component {
  render() {
	return (
		<Container>


		<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>

			<CardContent className="center" >
				<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
					<Typography variant="h6"> بالانس </Typography>
					<Typography variant="body"> ۱۲۳۴۰۰۰ </Typography>
				</Card>

				<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
					<Typography variant="h6"> رفرال </Typography>
					<Typography variant="body"> ۱۲۳۴۰۰۰ </Typography>
				</Card>

				<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
					<Typography variant="h6"> جایزه </Typography>
					<Typography variant="body"> ۱۲۳۴۰۰۰ </Typography>
				</Card>
				
			</CardContent>


		</Card>


		<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5, }}>

			<CardContent className="center" >
				<Card sx={{boxShadow:5, borderRadius:5, my:5, p:5}}>
					<Typography variant="h6"> لیست برداشت‌ها </Typography>
					<List className="center text-center">
						<ListItem className="center text-center" > 1 </ListItem>
						<Divider />
						<ListItem className="center text-center" > 2 </ListItem>
						<Divider />
						<ListItem className="center text-center" > 3 </ListItem>
						<Divider />
						<ListItem className="center text-center" > 4 </ListItem>
						<Divider />
						<ListItem className="center text-center" > 5 </ListItem>


					</List>
				</Card>

				
				
			</CardContent>


		</Card>


	</Container>
	)
  }
}
