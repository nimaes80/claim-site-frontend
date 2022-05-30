import { Box, Button, FormControl, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function PersistentDrawerLeft() {
	const [claimPoint, setClaimPoint] = useState(null);
	const [subsetPoint, setSubsetPoint] = useState(null);
	const [claimPeriod, setClaimPeriod] = useState(null);

	const handlesetClaimPoint = (e) => {
		setClaimPoint(e.target.value);
	}
	const handlesetSubsetPoint = (e) => {
		setSubsetPoint(e.target.value);
	}
	const handlesetClaimPeriod = (e) => {
		setClaimPeriod(e.target.value);
	}


	const submit = () => {

	};

	useEffect(() => {

	}, [])


	return (
		<Box className="center">
				<FormControl fullWidth>
					<TextField defaultValue={claimPoint} onChange={handlesetClaimPoint} sx={{mt:20}} name='claim_point' label='میزان جایزه' type='number' helperText='میزان جایزه کاربر منبع رفرال را تعیین کنید' />
					<TextField defaultValue={subsetPoint} onChange={handlesetSubsetPoint} sx={{my:2}} name='subset_point' label='میزان جایزه رفرال' type='number' helperText='میزان جایزه‌ای که به رفرال داده می‌شود' />
					<TextField defaultValue={claimPeriod} onChange={handlesetClaimPeriod} sx={{my:2}} name='claim_period' label='دوره‌ی جایزه دهی' type='number' helperText='دوره جایزه‌دهی را بر حسب دقیقه وارد کنید.' />
				</FormControl>
				
				<Button onClick={submit} sx={{px:5, py:1.5, borderRadius:2}} name="submit" type="submit" variant="outlined" size="large"> ذخیره </Button>


		</Box>
	);
}
