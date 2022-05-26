import { Card, CardContent, FormControl, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';



function Contact() {
  return (
	<Container maxWidth="xl">

		<Card sx={{my:10, boxShadow:5, borderRadius:2, p:10}}>
			<CardContent className="center">
				<Typography variant="h1" className="text-center" fontWeight={600} fontSize={60}> ارتباط با ما </Typography>
				<FormControl sx={{width:{xs:"100%", md:"75%"}}} className="center">
					<TextField type='text' sx={{my:2, }} label="نام و نام خانوادگی" fullWidth />
					<TextField type='email' sx={{my:2, }} label="ایمیل" fullWidth />
					<TextField type='tel' sx={{my:2, }} minRows label="شماره موبایل" fullWidth />
					<TextField sx={{mt:2, mb:5 }} minRows={10} label="متن درخواست" fullWidth />

				</FormControl>

			</CardContent>
		</Card>

	</Container>
  );
};

export default Contact;