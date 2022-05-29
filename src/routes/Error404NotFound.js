import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Alert, Button, Card, CardContent, Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Error404NotFound() {
  return (
    <Container>
      <Card sx={{my: 10, p:10, boxShadow:3}}>
        <CardContent sx={{textAlign:'center'}}>
            <Alert sx={{my:2, p:2,}} severity='warning'> صفحه مورد نظر شما یافت نشد. </Alert>
            <Button sx={{my:2, p:2,}} size="large" variant='contained' component={Link} to='/' startIcon={<HomeRoundedIcon />}> بازگشت به خانه </Button>
        </CardContent>
        
      </Card>
    </Container>
  )
}

export default Error404NotFound