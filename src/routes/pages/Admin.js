import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Settings from './components/admin/Settings';
import GroupIcon from '@mui/icons-material/Group';
import SourceIcon from '@mui/icons-material/Source';
import PublicIcon from '@mui/icons-material/Public';





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
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const datas = [ 
		{text: 'تنظیمات سایت', url:'settings/', icon: <SettingsIcon />},
		{text: 'کاربران', url:'/users', icon: <GroupIcon />},
		{text: 'سوالات متداول', url:'/faq', icon:<SourceIcon />},
		{text: 'شبکه‌های اجتماعی', url:'/socials', icon:<PublicIcon />}	,
		{text: '', url:'', icon:''},
		{text: '', url:'', icon:''},
		{text: '', url:'', icon:''},
	];

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
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
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{ datas.map((data, index) => (
						<ListItem key={index} disablePadding>
							<ListItemButton component={NavLink} to={data.url}>
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
						<Route path="/settings/" element={<Settings />} />
						<Route path="/users/" element={<Settings />} />
						<Route path="/faq/" element={<Settings />} />
						<Route path="/faq/update/:id/" element={<Settings />} />
						<Route path="/socials/" element={<Settings />} />
						<Route path="/socials/update/:id/" element={<Settings />} />


				</Routes>



			</Main>

		</Box>
	);
}
