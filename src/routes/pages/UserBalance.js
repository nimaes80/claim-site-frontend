import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
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


				<Card>

					<CardContent >

						
					</CardContent>


				</Card>


			</Container>
			





	  </>
  );
};
