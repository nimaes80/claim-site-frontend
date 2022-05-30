import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function UserList() {
	

	return (
		<Box className="center">
				<TableContainer sx={{width:"100%"}}>
					<Table sx={{width:"100%"}}>
						<TableHead>
							<TableRow>
								<TableCell className='center'> کد </TableCell>	
								<TableCell className='center'> آی‌دی تلگرام </TableCell>	
								<TableCell className='center'> آخرین کلایم </TableCell>	
								<TableCell className='center'> جایزه </TableCell>	
								<TableCell className='center'> رفرال </TableCell>	
								<TableCell className='center'> جایزه‌ی رفرال </TableCell>	
							</TableRow>
						</TableHead>

						<TableBody>
							<TableRow> 
							<TableCell className='center'> کد </TableCell>	
								<TableCell className='center'>  </TableCell>
								<TableCell className='center'>  </TableCell>
								<TableCell className='center'>  </TableCell>
								<TableCell className='center'>  </TableCell>
								<TableCell className='center'>  </TableCell>
							</TableRow>



						</TableBody>



					</Table>
				</TableContainer>


		</Box>
	);
}
