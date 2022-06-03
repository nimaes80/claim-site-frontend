import { SendRounded } from '@mui/icons-material';
import { Button, Card, CardContent, FormControl, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import requests from '../../utils/requests';
import urls from '../../utils/urls';


function Contact() {
	const [name, setName] = useState(null);
	const [email, setEmail] = useState(null);
	const [phone, setPhone] = useState(null);
	const [text, setText] = useState(null);

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePhone = (e) => {
		setPhone(e.target.value);
	};

	const handleText = (e) => {
		setText(e.target.value);
	};


	const sendMessage = () => {
		requests.post(urls.contact, {
			name: name,
			email: email,
			phone: phone,
			text: text,
		})
			.then(response => {
				alert('ارسال شد.')
			})
			.catch(error => {
				
			})
	};
  	return (
		<Container maxWidth="xl">

			<Card sx={{my:10, boxShadow:5, borderRadius:2, p:10}}>
				<CardContent className="center">
					<Typography variant="h1" className="text-center" fontWeight={600} fontSize={60}> ارتباط با ما </Typography>
					<FormControl sx={{width:{xs:"100%", md:"75%"}}} className="center">
						<TextField onChange={handleName} type='text' sx={{my:2, }} label="نام و نام خانوادگی" fullWidth />
						<TextField onChange={handleEmail} type='email' sx={{my:2, }} label="ایمیل" fullWidth />
						<TextField onChange={handlePhone} type='tel' sx={{my:2, }} label="شماره موبایل" fullWidth />
						<TextField onChange={handleText} sx={{mt:2, mb:5 }} minRows={10} label="متن درخواست" fullWidth />
						<Button onClick={sendMessage} variant='outlined' startIcon={<SendRounded />}> ارسال </Button>
					</FormControl>

				</CardContent>
			</Card>

		</Container>
	);
};

export default Contact;