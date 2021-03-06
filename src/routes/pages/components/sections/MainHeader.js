import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuIcon from '@mui/icons-material/Menu';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { AppBar, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import SvgIcon from "@mui/material/SvgIcon";
import { Container } from '@mui/system';
import React, { Component } from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import logo from '../../../../assets/images/logo.png';
import requests from '../../../../utils/requests';
import urls from '../../../../utils/urls';
import TwitterIcon from '@mui/icons-material/Twitter';


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
					name: "Home",
					url: "/",
					icon: <HomeRoundedIcon />,
				},
				{
					name: "Contact Us",
					url: "/contact/",
					icon: <CallRoundedIcon />,
				},
				{
					name: "White Paper",
					url: "pdf",
					icon: <PictureAsPdfRoundedIcon />,
				},
				
			],
			socials: [
				{
					title: 'Facebook',
					url: 'https://facebook.com',
					icon: '',
					color: '#4267B2',
				},
				{
					title: 'Telegram',
					url: 'https://telegram.com',
					icon: '',
					color: '#229ED9',
				},
				{
					title: 'rubika',
					url: 'https://rubika.ir/',
					icon: '',
					color: '#000',
				},

			],
			f: `<svg xmlns='http://www.w3.org/2000/svg'  width='651' height='651' viewBox='0 0 800 800'>\n\t<rect fill='#1D0D33' width='800' height='800'/>\n\t<g fill='none' stroke='#2D135A'  stroke-width='1'>\n\t\t<path d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/>\n\t\t<path d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/>\n\t\t<path d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/>\n\t\t<path d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/>\n\t\t<path d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/>\n\t</g>\n\t<g  fill='#482755'>\n\t\t<circle  cx='769' cy='229' r='5'/>\n\t\t<circle  cx='539' cy='269' r='5'/>\n\t\t<circle  cx='603' cy='493' r='5'/>\n\t\t<circle  cx='731' cy='737' r='5'/>\n\t\t<circle  cx='520' cy='660' r='5'/>\n\t\t<circle  cx='309' cy='538' r='5'/>\n\t\t<circle  cx='295' cy='764' r='5'/>\n\t\t<circle  cx='40' cy='599' r='5'/>\n\t\t<circle  cx='102' cy='382' r='5'/>\n\t\t<circle  cx='127' cy='80' r='5'/>\n\t\t<circle  cx='370' cy='105' r='5'/>\n\t\t<circle  cx='578' cy='42' r='5'/>\n\t\t<circle  cx='237' cy='261' r='5'/>\n\t\t<circle  cx='390' cy='382' r='5'/>\n\t</g>\n</svg>`,
			settings: [
				{
					name: 'Login',
					icon: <LoginRoundedIcon />,
				},
				{
					name: 'Logout',
					url: '/logout/',
					icon: <LogoutRoundedIcon />,
				},
				{
					name: 'Balance',
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
					name: 'Logout',
					url: '/logout/',
					icon: <LogoutRoundedIcon />,
				},
				{
					name: 'Balacne',
					url: '/dashboard/balance/',
					icon: <AccountCircleRoundedIcon />,
				},
			]})
		} else {
			this.setState({settings: [
				{
					name: 'Login',
					icon: <LoginRoundedIcon />,
				},
				{
					name: 'Balance',
					url: '/dashboard/balance/',
					icon: <AccountCircleRoundedIcon />,
				},
			]})
		}

		requests.get(urls.globalInfo)
			.then(response => {
				if (response.status === 200 && typeof(response.data) === 'object') {
					this.setState({socials: response.data.socials});
				};
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
				alert('Username or password is incorrect');
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
							> USDZ </Typography>

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
								USDZ
							</Typography>
							
							<Box sx={{flexGrow: 1, display: {xs:'none', md:'flex'}}}>
								{
									this.state.pages.map((page, i) => (
											page.url === 'pdf' ?
												<Button startIcon={page.icon} key={i} component="a" href="/Whitepaper.pdf" className="main-nav-link"
													sx={{
														p:1,
														ml:{md:2.5, lg:5},
													}}>
													{page.name}
												</Button>
											:
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
												{social.title}</Button>
										))
									:
									<>
									<Tooltip title="Social medias" placement="right-end">
										<IconButton onClick={this.handleSocialsMenu} >
											<PublicRoundedIcon sx={{color:"var(--color-neutral-100);"}} />
										</IconButton>
									</Tooltip>
									<Menu
										sx={{mt:'45px', mr:7, display: {xs:'none', md:'flex'}}}
										id="socials-menu-appbar"
											anchorOrigin={{ vertical:'top', horizontal:'start'}}
										
										transformOrigin={{vertical: 'top', horizontal: 'start'}}
										open={this.state.isSocialsMenuOpen}
										onClose={this.handleSocialsMenu}
									>
										{

											this.state.socials.map((social, i) => (
												<MenuItem component="a" className="main-nav-link" target="_blank" href={social.url} key={i} onClick={this.handleSocialsMenu} sx={{py:0}}>
													<Button>
														<SvgIcon sx={{color:social.color, px:1}}>{ htmlToReactParser.parse(social.icon) }</SvgIcon>
														<Typography sx={{color:"#000"}}>{social.title}</Typography>
													</Button>
												</MenuItem>
											))
										}
										
									</Menu>
									</>
								}
							</Box>

							<Box sx={{flexGrow:0, mx:1}}>
								<IconButton color="white" component="a" href="https://twitter.com/usdzio/" target="_blank">
									<TwitterIcon color="white" />
								</IconButton>
							</Box>

							<Box sx={{flexGrow:0}}>
								<Tooltip title="Account" placement='bottom-end'>
									<IconButton onClick={this.handleMenu} sx={{p:0, border:1, borderColor:"#a1a3a8", boxShadow:5}}>
										<Avatar alt="Profile" src={logo} />
									</IconButton>
								</Tooltip>
								<Menu 
									sx={{mt:'45px', }}
									id="menu-appbar"
									anchorOrigin={{ vertical:'top', horizontal:'right'}}
									transformOrigin={{vertical: 'top', horizontal: 'right'}}
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
								<ListItem className="center "> USDZ </ListItem>
								<Divider sx={{my:1}} />
								{
									this.state.pages.map((page, i) => (
										page.url === 'pdf' ?
										<ListItemButton key={i} component="a" href="/Whitepaper.pdf" className="drawer-link" onClick={this.handleDrawer}>
											<ListItemIcon>{page.icon}</ListItemIcon>
											<ListItemText>{page.name}</ListItemText>
										</ListItemButton>
										:
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
											<ListItemIcon sx={{color:social.color ? social.color : "#000",}}>{ htmlToReactParser.parse(social.icon) }</ListItemIcon>
											<ListItemText>{social.title}</ListItemText>
										</ListItemButton>
									))
								}

							</List>
							
						</Drawer>

						<Dialog open={this.state.isDialogOpen} onClose={this.handleDialog} >
							<DialogContent >
								<DialogTitle >
									<Typography fontSize={30} sx={{mb:3}} textAlign="center">Login</Typography>
								</DialogTitle>
									<TextField onChange={this.handleUsername} sx={{mb:2}} name='username' label="Username" type="text" fullWidth  />
									<TextField onChange={this.handlePassword} sx={{mb:2}} name='password' label="Password" type="password" fullWidth  />
							</DialogContent>

							<DialogActions>
								<Button size='large' onClick={this.handleDialog}> Cancel </Button>
								<Button size='large' onClick={this.handleLogin}> Login </Button>
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
