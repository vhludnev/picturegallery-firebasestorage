import React from 'react';
import { useUpdate } from '../contexts/UpdateContext';
import useFirestore from '../hooks/useFirestore';
import Images from './Images';

const ImageGridAuth = () => {
	const { countA, docsFilter } = useUpdate();
  const { docs } = useFirestore('images');

	let docsToRender = [...docsFilter.slice(countA, countA > docs.length - 12 ? docs.length : countA + 12)];

  return (
    <> 
      {docs && docsToRender.map(doc => (
				<React.Fragment key={doc.id}>
					<Images src={doc.url} clickData={doc} imgAlt={'uploaded pic'} />
				</React.Fragment>
      ))}
    </>
  )
}

export default ImageGridAuth;