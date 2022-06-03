import { Dashboard } from '@mui/icons-material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuIcon from '@mui/icons-material/Menu';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { AppBar, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import SvgIcon from "@mui/material/SvgIcon";
import { Container } from '@mui/system';
import React, { Component } from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();

export default class MainHeader extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			isLoaded: false,
			error: null,
			isDrawerOpen: false,
			isMenuOpen: false,
			isSocialsMenuOpen:false,
			isDialogOpen: false,
			redirectLogin: false,
			username: null,
			password: null,
			pages: [
				{
					name: "خانه",
					url: "/",
					icon: <HomeRoundedIcon />,
				},
				{
					name: "درباره ما",
					url: "/about/",
					icon: <InfoRoundedIcon />,
				},
				{
					name: "ارتباط با ما",
					url: "/contact/",
					icon: <CallRoundedIcon />,
				},
				
			],
			socials: [
				{
					name: 'فیسبوک',
					url: 'https://facebook.com',
					icon: '',
					color: '#4267B2',
				},
				{
					name: 'تلگرام',
					url: 'https://telegram.com',
					icon: '',
					color: '#229ED9',
				},
				{
					name: 'روبیکا',
					url: 'https://rubika.ir/',
					icon: `<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium muirtl-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SettingsIcon"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path></svg>`,
					color: '#000',
				},

			],
			settings: [
				{
					name: 'ورود',
					icon: <LoginRoundedIcon />,
				},
				{
					name: 'خروج',
					url: '/logout/',
					icon: <LogoutRoundedIcon />,
				},
				{
					name: 'داشبورد ادمین',
					url: '/dashboard/admin/',
					icon: <Dashboard />,
				},
				{
					name: 'بالانس',
					url: '/dashboard/balance/',
					icon: <AccountCircleRoundedIcon />,
				},
			],
		};

		this.handleDrawer = this.handleDrawer.bind(this);
		this.handleMenu = this.handleMenu.bind(this);
		this.handleSocialsMenu = this.handleSocialsMenu.bind(this);
		this.handleDialog = this.handleDialog.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		
	};


	componentDidMount(){
		if (localStorage.getItem('access') && !(new Date().getTime() >= window.atob(localStorage.getItem('access').split('.')[1]).exp * 1000)) {
			this.setState({isAuthenticated: true});
			this.setState({settings: [
				{
					name: 'خروج',
					url: '/logout/',
					icon: <LogoutRoundedIcon />,
				},
				{
					name: 'داشبورد ادمین',
					url: '/dashboard/admin/',
					icon: <Dashboard />,
				},
				{
					name: 'بالانس',
					url: '/dashboard/balance/',
					icon: <AccountCircleRoundedIcon />,
				},
			]})
		} else {
			this.setState({settings: [
				{
					name: 'ورود',
					icon: <LoginRoundedIcon />,
				},
				{
					name: 'داشبورد ادمین',
					url: '/dashboard/admin/',
					icon: <Dashboard />,
				},
				{
					name: 'بالانس',
					url: '/dashboard/balance/',
					icon: <AccountCircleRoundedIcon />,
				},
			]})
		}

		requests.get(urls.socials)
			.then(response => {

			})
			.catch(error => {

			})
	};

	
	handleDrawer() {
		this.setState({
			isDrawerOpen: !this.state.isDrawerOpen,
		});
	};

	handleMenu() {
		this.setState({
			isMenuOpen: !this.state.isMenuOpen,
		});
	};

	handleSocialsMenu() {
		this.setState({
			isSocialsMenuOpen: !this.state.isSocialsMenuOpen,
		});
	}

	handleUsername(e) {
		this.setState({username:e.target.value})
	}
	handlePassword(e) {
		this.setState({password:e.target.value})
	}

	handleDialog() {
		window.screenTop = 0;
		this.setState({
			isDialogOpen: !this.state.isDialogOpen,
		});
	};



	handleLogin() {
		const data = JSON.stringify({
			"username":this.state.username,
			"password":this.state.password
		});
		if (this.state.username.length >= 4 && this.state.password.length >= 4 ) {
			requests.post(urls.adminLogin,
				data,
				{
					headers: {
						"Authorization": null,
						"Content-Type": "application/json"
					}
				}
				)
			.then( response => {
				if (response.status === 200 && typeof(response.data === 'object')) {
					localStorage.setItem('access', response.data.access);
					localStorage.setItem('refresh', response.data.refresh);
					this.setState({redirectLogin: true});
				};
			})
			.catch(error => {
				alert('نام کاربری یا رمز عبور نادرست است.');
			})
		}
	}


  render() {
	return (
	  <>
	  	{
			!this.state.redirectLogin ?
				<AppBar position='sticky' className="bg-gradient shadow">
					<Container maxWidth="100%">
						<Toolbar disableGutters>
							<Typography variant="h6" noWrap component={Link} to='/' className="logo"
								sx={{
									ml: 2,
									display: {xs:'none', md:'flex'},
									fontWeight: 700,
									letterSpacing: '.2rem',
								}}
							> LOGO لوگو </Typography>

							<Box sx={{ flexGrow:1, display:{ xs:'flex', md:'none'} }}>
								<IconButton size="large" 
									aria-label="drawe menu"
									aria-controls="menu-drawer"
									onClick={this.handleDrawer}
									>
										<MenuIcon sx={{color:"var(--color-neutral-200);"}} />
								</IconButton>
							</Box>

							<Typography variant="h5" noWrap component={Link} to='/' className="logo"
								sx={{
									display:{xs:"flex", md:'none'},
									flexGrow: 1,
									fontWeight: 700,
									letterSpacing: '.2rem',
									fontSize: 18
								}}
							>
								LOGO لوگو
							</Typography>
							
							<Box sx={{flexGrow: 1, display: {xs:'none', md:'flex'}}}>
								{
									this.state.pages.map((page, i) => (
										<Button startIcon={page.icon} key={i} component={NavLink} to={page.url} className="main-nav-link"
											sx={{
												p:1,
												ml:{md:2.5, lg:5},
											}}>
											{page.name}
										</Button>
									))
								}						
							</Box>
							<Box sx={{mr:2, display: {xs:'none', md:'flex'}}}>
								{
									this.state.socials.length <= 3 ?
										this.state.socials.map((social, i) => (
											<Button startIcon={ htmlToReactParser.parse(social.icon) } key={i} component="a" href={social.url} target="_blank" 
												sx={{
													p:1,
													ml:{md:2.5, lg:5},
													color: 'var(--color-neutral-100);'
												}}>
												{social.name}
											</Button>
										))
									:
									<>
									<Tooltip title="شبکه‌های اجتماعی" placement="right-end">
										<IconButton onClick={this.handleSocialsMenu} >
											<PublicRoundedIcon sx={{color:"var(--color-neutral-100);"}} />
										</IconButton>
									</Tooltip>
									<Menu
										sx={{mt:'45px', mr:7, display: {xs:'none', md:'flex'}}}
										id="socials-menu-appbar"
											anchorOrigin={{ vertical:'top', horizontal:'end'}}
										
										transformOrigin={{vertical: 'top', horizontal: 'end'}}
										open={this.state.isSocialsMenuOpen}
										onClose={this.handleSocialsMenu}
									>
										{

											this.state.socials.map((social, i) => (
												<MenuItem component="a" className="main-nav-link" target="_blank" href={social.url} key={i} onClick={this.handleSocialsMenu} sx={{py:0}}>
													<Button>
														<SvgIcon sx={{color:social.color, px:1}}>{ htmlToReactParser.parse(social.icon) }</SvgIcon>
														<Typography sx={{color:"#000"}}>{social.name}</Typography>
													</Button>
												</MenuItem>
											))
										}


										
									</Menu>
									</>
								}
							</Box>

							<Box sx={{flexGrow:0}}>
								<Tooltip title="اکانت" placement='bottom-end'>
									<IconButton onClick={this.handleMenu} sx={{p:0}}>
										<Avatar alt="Profile" src={null} />
									</IconButton>
								</Tooltip>
								<Menu 
									sx={{mt:'45px', }}
									id="menu-appbar"
									anchorOrigin={{ vertical:'top', horizontal:'left'}}
									transformOrigin={{vertical: 'top', horizontal: 'left'}}
									open={this.state.isMenuOpen}
									onClose={this.handleMenu}
								>
									{

										this.state.settings.map((setting, i) => (
											setting.url ? (
												<MenuItem component={Link} to={setting.url} key={i} onClick={this.handleMenu} sx={{py:0}}>
													<Button startIcon={setting.icon} >
														{setting.name}
													</Button>
												</MenuItem>
											)
											:
											(
												<MenuItem key={i} onClick={this.handleMenu} sx={{py:0}}>
													<Button startIcon={setting.icon} onClick={this.handleDialog}>
														{setting.name}
													</Button>
												</MenuItem>
											)
										))
									}


									
								</Menu>
							</Box>


							
						</Toolbar>

						<Drawer open={this.state.isDrawerOpen} anchor="left" onClose={this.handleDrawer} sx={{display:{xs:'block', md:'none'}}} transitionDuration={300} className="opacity-90">
							<List sx={{width:300}} className="opacity-90">
								<ListItem className="center "> LOGO لوگو </ListItem>
								<Divider sx={{my:1}} />
								{
									this.state.pages.map((page, i) => (
										<ListItemButton key={i} component={NavLink} to={page.url} className="drawer-link" onClick={this.handleDrawer}>
											<ListItemIcon>{page.icon}</ListItemIcon>
											<ListItemText>{page.name}</ListItemText>
										</ListItemButton>
									))
								}
								<Divider sx={{my:1}} />
								{
									this.state.socials.map((social, i) => (
										<ListItemButton key={i} component='a' target="_blank" href={social.url}  onClick={this.handleDrawer}>
											<ListItemIcon sx={{color:social.color ? social.color : "#000"}}>{ htmlToReactParser.parse(social.icon) }</ListItemIcon>
											<ListItemText>{social.name}</ListItemText>
										</ListItemButton>
									))
								}

							</List>
							
						</Drawer>

						<Dialog open={this.state.isDialogOpen} onClose={this.handleDialog} >
							<DialogContent >
								<DialogTitle >
									<Typography fontSize={30} sx={{mb:3}} textAlign="center">ورود</Typography>
								</DialogTitle>
									<TextField onChange={this.handleUsername} sx={{mb:2}} name='username' label="نام کاربری" type="text" fullWidth  />
									<TextField onChange={this.handlePassword} sx={{mb:2}} name='password' label="گذرواژه" type="password" fullWidth  />
							</DialogContent>

							<DialogActions>
								<Button size='large' onClick={this.handleDialog}> لغو </Button>
								<Button size='large' onClick={this.handleLogin}> ورود </Button>
							</DialogActions>	

						</Dialog>
						
					</Container> 
				</AppBar>
			:
			<Navigate to='/dashboard/admin/' />
		}
	  </>
	);
  };
};
