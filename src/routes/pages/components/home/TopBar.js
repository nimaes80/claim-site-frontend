import React, { Component } from 'react';
import banner from '../../../../assets/images/lorem.webp';


export default class TopBar extends Component {
  render() {
	return (
		<>
		
		<img src={banner} alt="banner"  style={{width:"100%", height:"600px", zIndex:1}} />
		<div className="wave" ></div>

		</>
	);
  };
};
