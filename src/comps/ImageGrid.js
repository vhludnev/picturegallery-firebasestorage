import React from 'react';
import { useUpdate } from '../contexts/UpdateContext';
import useDemo from '../hooks/useDemo';
import Images from './Images';

const ImageGrid = () => {
	const { count } = useUpdate();
	const { images } = useDemo(count);

  return (
    <>
			{images && images.map(image => {
				return (
					<React.Fragment key={image.id}>
						<Images src={image.preview_url} clickData={image} imgAlt={`pic${image.id}`} />
					</React.Fragment>
				)
			})}
    </>
  )
}

export default ImageGrid;