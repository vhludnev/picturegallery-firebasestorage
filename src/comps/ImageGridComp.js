import React from 'react';
import styled from 'styled-components';
import ImageGrid from './ImageGrid';
import ImageGridAuth from './ImageGridAuth';
import { useAuth } from '../contexts/AuthContext';
import Modal from './Modal';
import Navigation from './Navigation';
import ScrollToPage from './scrollToPage';

const ImageGridComp = () => {
	const { currentUser } = useAuth();

	return (
		<>
			<Navigation/>
			<Wrapper>
			{!currentUser ? <ImageGrid /> : <ImageGridAuth />}
			<Modal />
			</Wrapper>
			<ScrollToPage/>		
		</>
	)
}

export default ImageGridComp;

const Wrapper = styled.div`
	margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
	z-index: 1;
	@media (max-width: 992px) {
		padding: 0 .5rem;
		grid-template-columns: 1fr 1fr;
		grid-gap: .5rem;
	}
`;
