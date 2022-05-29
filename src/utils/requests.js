import axios from "axios";
import urls from "./urls";


const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

const requests = axios.create({
	baseURL: urls.baseURL,

});



const isExpired = (token) => {
	try {
	const jwt = JSON.parse(window.atob(token.split('.')[1]));
	return Boolean(new Date().getTime() >= jwt.exp * 1000);
	} catch {
		return true;
	};
};


if (refreshToken !== null) {
	if (Boolean(!isExpired(refreshToken))){
		if (accessToken !== null) {
			if (!isExpired(accessToken)){
				requests.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
				

			} else {
				console.log('Authorizaton added');
				localStorage.clear('accessToken');
				requests.post(
					urls.refreshToken, {
						'refresh': refreshToken
					}
					).then( (response) => {
						localStorage.setItem('accessToken', response.data.access);
						requests.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
					}).catch( (err) => {
						console.log('Access token & refresh token is not valid.');
					});
			};
		} else {
			requests.post(
				urls.refreshToken, {
					'refresh': refreshToken
				}
				).then( (response) => {
					localStorage.setItem('accessToken', response.data.access);
					requests.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
				}).catch( (err) => {
					console.log('Access token & refresh token is not valid.');
				});
			};
		} else {
			localStorage.clear('accessToken');
			localStorage.clear('refreshToken');
	}
};





requests.defaults.headers.common['Content-Type'] = 'application/json';

export default requests;