import { Card, CardContent, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

function About() {
  return (
	<Container maxWidth="xl">

		<Card sx={{my:5, boxShadow:5, borderRadius:2, p:5}}>
			<CardContent>
				<Typography variant="h1" className="text-center" fontWeight={600} fontSize={60}> درباره‌‌ی ما </Typography>
				<Typography className="text-justify">


				</Typography>

			</CardContent>
		</Card>

	</Container>
  )
}

export default About;