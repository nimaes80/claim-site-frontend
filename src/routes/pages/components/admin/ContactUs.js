import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Box } from '@mui/system'
import React, { Component } from 'react'

export default class ContactUs extends Component {
  render() {
	return (
	  <Box className="center">
		  <TableContainer sx={{width:"100%"}}>
			  <Table sx={{width:"100%"}}>
				<TableHead >
					<TableRow>
						<TableCell> کد </TableCell>
						<TableCell> نام و نام خانوادگی </TableCell>
						<TableCell> ایمیل </TableCell>
						<TableCell> تلفن </TableCell>
						<TableCell>  </TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						
					}
					<TableRow>
						<TableCell>  </TableCell>
						<TableCell>  </TableCell>
						<TableCell>  </TableCell>
						<TableCell>  </TableCell>
						<TableCell>  </TableCell>
					</TableRow>
				</TableBody>
			</Table>
		  </TableContainer>
	  </Box>
	)
  }
}
