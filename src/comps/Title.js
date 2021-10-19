import React from 'react';
import Login from './Login';
import UpdateProfile from './Update';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUpdate } from '../contexts/UpdateContext';

const Title = () => {
	const { currentUser, logout } = useAuth()
	const { openPopup, openPopup2 } = useUpdate();

  return (
    <Wrapper>
			<div style={{gridTemplateColumns: currentUser ? "1fr 1fr 1fr" : "auto auto auto"}} className="header">
				<h1>Picture gallery</h1>
				<div>
					{currentUser && <>
					 <p>Logged in as: {currentUser.displayName ? <b>{currentUser.displayName}</b> : currentUser.email}</p>
					 <motion.button whileHover={{ scale: 1.1 }} className="update" onClick={openPopup2}>Update Profile</motion.button> </>}
				</div>
				<motion.button whileHover={{ scale: 1.1 }} onClick={currentUser ? logout : openPopup}>
					{currentUser ? 'Logout' : 'Login'}
				</motion.button>
			</div>  		
			<UpdateProfile />   
			<Login />
      <h2>Your Pictures </h2>
			<br/>
      {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
    </Wrapper>
  )
}

export default Title;

const Wrapper = styled.div`
	text-align: center;
  .header {
		padding-top: 1rem;
		display: grid;
		justify-items: center;
	}
	.header h1, .header button {
		color: var(--primary);
		font-size: 1em;
		letter-spacing: 2px;
		font-weight: normal;
		height: fit-content;
		@media (max-width: 992px) {
			font-size: .8em;
			letter-spacing: 1px;
		}
	}
	.header button, button.update {
		border: none;
		background-color: transparent;
		cursor: pointer;
	}
	button.update {
		display: block;
		margin: .8rem auto auto;
		font-size: .8em;
		@media (max-width: 992px) {
			margin-top: .4rem;
			font-size: .6em;
		}
	}
	h1 {
		padding: 0 1rem;
	}
	h2, p{
		text-align: center;
	}
	h2{
		margin: 60px auto 20px;
		font-size: 1.8em;
		@media (max-width: 992px) {
			margin: 45px auto 10px;
			font-size: 1.4em;
		}
	}
	@media (max-width: 992px) {
		p{
			font-size: .8em;
		}
	}
`;