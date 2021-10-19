import React, { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUpdate } from '../contexts/UpdateContext';

const Images = ({ img }) => {
	const { currentUser } = useAuth();
	const { handleClick, setDisabled } = useUpdate();

	useEffect(() => {
		setDisabled(false)
	}, [setDisabled])

	return (
		<ImageWrapper
			layout /* animates the appearing of a block of newly added image */
			whileHover={{ opacity: 1 }}
			onClick={() => { currentUser ? handleClick(img.url, img.uid) : handleClick(img.download_url) }}
		>
			<Image src={img.url} alt={currentUser ? 'uploaded pic' : `pic${img.id}`} /* adding fadein effect for the appearing of new images */
				effect='blur'
				height='300'
				width='300'
			/>
		</ImageWrapper> 
	)
}

export default Images;

const ImageWrapper = styled(motion.div)`
	overflow: hidden;
  height: 0;
  padding: 50% 0;
  position: relative;
  opacity: 0.8;
`;

const Image = styled(LazyLoadImage)`
	object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 150%;
  position: absolute;
  top: 0;
  left: 0;
`;