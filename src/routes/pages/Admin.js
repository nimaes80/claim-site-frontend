import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import SourceIcon from '@mui/icons-material/Source';
import { Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { useEffect, useState } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import requests from '../../utils/requests';
import urls from '../../utils/urls';
import Error404NotFound from '../Error404NotFound';
import ContactUs from './components/admin/ContactUs';
import FAQ from './components/admin/FAQ';
import GlobalSetting from './components/admin/GlobalSetting';
import Settings from './components/admin/Settings';
import Socials from './components/admin/Socials';
import UserList from './components/admin/UserList';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	}),
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));





export default function PersistentDrawerLeft() {
	const [open, setOpen] = useState(true);
	const datas = [ 
		{text: 'تنظیمات سایت', url:'settings/', icon: <SettingsIcon />},
		{text: 'کاربران', url:'users', icon: <GroupIcon />},
		{text: 'سوالات متداول', url:'faq', icon:<SourceIcon />},
		{text: 'شبکه‌های اجتماعی', url:'socials', icon:<ConnectWithoutContactRoundedIcon />}	,
		{text: 'متغیرات عمومی', url:'globals', icon:<PublicRoundedIcon />},
		{text: 'پیغام‌ها', url:'contact', icon:<EmailRoundedIcon />},
	];
	const [redirect, setRedirect] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		requests.get(urls.userProfile, {
			headers: { 'Authorization': `Bearer ${localStorage.getItem('access')}` }
		})
		.then(response => {
			if (response.status === 200 && typeof(response.data) === 'object' ) {
				setIsLoaded(true);
				setRedirect(false);
			}
		})
		.catch(error => {
			setIsLoaded(true);
			setRedirect(true);
		})
	});

	return (
		<>
			{
				isLoaded ? 
					!redirect ? <Box sx={{ display: 'flex' }}>
						<CssBaseline />
						<AppBar position="fixed" open={open}>
							<Toolbar>
								<IconButton
									color="inherit"
									aria-label="open drawer"
									onClick={handleDrawerOpen}
									edge="start"
									sx={{ mr: 2, ...(open && { display: 'none' }) }}
								>
									<MenuIcon />
								</IconButton>
								<Typography variant="h6" noWrap component="div">
									LOGO
								</Typography>
							</Toolbar>
						</AppBar>
						<Drawer
							sx={{
								width: drawerWidth,
								flexShrink: 0,
								'& .MuiDrawer-paper': {
									width: drawerWidth,
									boxSizing: 'border-box',
								},
							}}
							variant="persistent"
							anchor="left"
							open={open}
						>
							<DrawerHeader>
								<IconButton onClick={handleDrawerClose}>
								<ChevronRightIcon />
								</IconButton>
							</DrawerHeader>
							<Divider />
							<List>
								{ datas.map((data, index) => (
									<ListItem key={index} disablePadding>
										<ListItemButton component={NavLink} className="drawer-link" to={data.url}>
											<ListItemIcon>
												{data.icon}
											</ListItemIcon>
											<ListItemText primary={data.text} />
										</ListItemButton>
										<Divider />
									</ListItem>
								))}
							</List>
							
						</Drawer>
						<Main open={open}>
							<DrawerHeader />
							
							<Routes>
									<Route path="/" element={<></>} />
									<Route path="/settings/" element={<Settings />} />
									<Route path="/users/" element={<UserList />} />
									<Route path="/faq/" element={<FAQ />} />
									<Route path="/socials/" element={<Socials />} />
									<Route path="/globals/" element={<GlobalSetting />} />
									<Route path="/contact/" element={<ContactUs />} />
									<Route path="/contact/:id" element={<ContactUs />} />
									
									
									<Route path='/*' element={<Error404NotFound />} />
									
			
							</Routes>
			
			
			
						</Main>
			
						</Box>
					:
						<Navigate to='/' />
				:
				null

			}
		
		</>
		
	);
}
