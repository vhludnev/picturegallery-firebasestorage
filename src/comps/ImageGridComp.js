import React, { lazy } from 'react';
import styled from 'styled-components';
import ImageGrid from './ImageGrid';
// import ImageGridAuth from './ImageGridAuth';
import { useAuth } from '../contexts/AuthContext';
//import Modal from './Modal';
import Navigation from './Navigation';
import ScrollToPage from './scrollToPage';
//import Spinner from './Spinner';
import WithSuspense from './withSuspense';

//const ImageGrid = WithSuspense(lazy(() => import('./ImageGrid')));
const ImageGridAuth = WithSuspense(lazy(() => import('./ImageGridAuth')));
const Modal = WithSuspense(lazy(() => import('./Modal')));

const ImageGridComp = () => {
	const { currentUser } = useAuth();

	return (
		<>
			<Navigation/>
			<Wrapper>
			{!currentUser 
				? <ImageGrid /> 
				: <ImageGridAuth />}
			<Modal />
			</Wrapper>
			<ScrollToPage/> 
		</>
	)
}

export default ImageGridComp;

const Wrapper = styled.div`
	position: relative;
	min-height: 300px;
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
