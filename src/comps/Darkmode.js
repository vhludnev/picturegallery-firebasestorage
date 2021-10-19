import React from 'react';
import styled from 'styled-components';
import { useUpdate } from '../contexts/UpdateContext';

const Darkmode = () => {
	const { btnState, setBtnState } = useUpdate();

	let size = getComputedStyle(document.body).getPropertyValue('--light_radio_button_size').split("px")[0]
	
	const myStyle1 = {
		opacity: "0.9",
		left: (size*.87)+"px",
		cursor: 'pointer'
  };

	const myStyle2 = {
    opacity: "0",
		left: "0px",
		cursor: 'unset'
  };

const handleClick = () => {
	setBtnState(prev => !prev);
  if (btnState) {
    document.body.style.background = 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/782173/dark_grain.png")';
		document.body.style.color = 'lightgrey';
  } else {
    document.body.style.background = 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/782173/light_grain.png")';
		document.body.style.color = 'var(--secondary)';
  }
}

	return (
		<Wrapper id="light_dark_radio_button_container" onClick={handleClick} >
			<div id="dark_radio_button" className="light_dark_radio_button" style={!btnState ? myStyle1 : myStyle2} ></div>
			<div id="light_radio_button" className="light_dark_radio_button"></div>
		</Wrapper>
	)
}

export default Darkmode;

const Wrapper = styled.div`
	position: absolute;
	top: -1px;
	right: 20px;
	width: calc(var(--light_radio_button_size)*3 );
	@media (max-width: 992px) {
		right: 0;
		transform: translateX(-50%);
	}

	.light_dark_radio_button {
		position: relative;
		border-radius: 100%;
		top: 1px;	
		width: var(--light_radio_button_size); 
		height: var(--light_radio_button_size);
		display: inline-block;
		:hover {filter: brightness(115%);}
	}

	#light_radio_button {
		cursor: pointer;
		width: var(--light_radio_button_size); 
		background-color: #dbd300;
		box-shadow: 0px 0px 2px 1px lightgrey;
	}

	#dark_radio_button {
		background-color: #111;
		top: 0px;
		left: 0px;
		width: var(--dark_radio_button_size); 
		height: var(--dark_radio_button_size); 
		z-index: 1;
		opacity: 0;
		transition: opacity 2.7s, left .7s;
	}
`;