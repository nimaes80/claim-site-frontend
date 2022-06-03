import { Box, Button, FormControl, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';


export default function PersistentDrawerLeft() {
	const [claimPoint, setClaimPoint] = useState(0);
	const [subsetPoint, setSubsetPoint] = useState(0);
	const [claimPeriod, setClaimPeriod] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);

	const handlesetClaimPoint = (e) => {
		setClaimPoint(e.target.value);
	};
	const handlesetSubsetPoint = (e) => {
		setSubsetPoint(e.target.value);
	};
	const handlesetClaimPeriod = (e) => {
		setClaimPeriod(e.target.value);
	};

	const submit = () => {
		requests.patch(urls.systemSettingUpdater, {
			claim_point: claimPoint,
			subset_point: subsetPoint,
			claim_period: claimPeriod,

		}, {headers:{'Authorization': `Bearer ${localStorage.getItem('access')}`}})
			.then(response => {
				if (response.status === 200 && typeof(response.data) === 'object') {
						alert('انجام شد.');
				};
			})
			.catch(error => {
				
			});

	};

	useEffect(() => {

		requests.get(urls.systemSetting, {headers:{'Authorization': `Bearer ${localStorage.getItem('access')}`}})
			.then(response => {
				if (response.status === 200 && typeof(response.data) === 'object') {
					setClaimPoint(response.data.claim_point);
					setSubsetPoint(response.data.subset_point);
					setClaimPeriod(response.data.claim_period);
					setIsLoaded(true);
				}
			})
			.catch(error => {

			});


	}, []);


	return (
		<Box className="center">
			{
				isLoaded ?
					<FormControl fullWidth>
						<TextField defaultValue={claimPoint} onChange={handlesetClaimPoint} sx={{mt:20}} name='claim_point' label='میزان جایزه' type='number' helperText='میزان جایزه کاربر منبع رفرال را تعیین کنید.' />
						<TextField defaultValue={subsetPoint} onChange={handlesetSubsetPoint} sx={{my:2}} name='subset_point' label='میزان جایزه رفرال' type='number' helperText='میزان جایزه‌ای که به رفرال داده می‌شود.' />
						<TextField defaultValue={claimPeriod} onChange={handlesetClaimPeriod} sx={{my:2}} name='claim_period' label='دوره‌ی جایزه دهی' type='number' helperText='دوره جایزه‌دهی را بر حسب دقیقه وارد کنید.' />
					</FormControl>
				:
				null
			}
				<Button onClick={submit} sx={{px:5, py:1.5, borderRadius:2}} name="submit" type="submit" variant="outlined" size="large"> ذخیره </Button>


		</Box>
	);
}
