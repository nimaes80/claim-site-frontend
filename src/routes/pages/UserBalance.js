import { Box, Button, Card, CardContent, Container, Divider, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import Countdown from 'react-countdown';
import MainHeader from './components/sections/MainHeader';


export default function UserBalance() {
	
	const MeteorStyle = {
		position: 'absolute',
		width: '100%',
		height: 700,
		zIndex: -1,
		borderRadius: '100px',
		

	}
	
	
	return (
		<>
			<MainHeader />



			<Box className='world-map'>
				
				<Container sx={{pt:25}} className="center">
					<Button sx={{py:2, px:5, mt:5, borderRadius:4,border:2, fontSize:20, fontWeight:700, backgroundColor: '#ecdada07', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}} variant='outlined' size="large" color='white'> دریافت جایزه </Button>
					<Box sx={{borderRadius:4, border:1, width:"fit-content", py:2, px:5, mt:5, backgroundColor: '#ecdada07', mx:"auto", color:'#fff', transition:'all 0.4s ease','&:hover':{border:3, boxShadow:10, borderRadius:10}}}>
						<Typography variant="body2" > زمان تا کلایم بعدی </Typography>
						<Countdown date={Date.now() + 10**7} />
					</Box>
				</Container>
			
			</Box>


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
			





	  </>
  );
};
