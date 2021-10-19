import React  from 'react';
import useFirestore from '../hooks/useFirestore';
import { useUpdate } from '../contexts/UpdateContext';
import Images from './Images';

const ImageGridAuth = () => {
  const { docs } = useFirestore('images');
	const { countA, docsFilter } = useUpdate();

	let docsToRender = [...docsFilter.slice(countA, countA > docs.length - 12 ? docs.length : countA + 12)]

  return (
    <>
      {docs && docsToRender.map(doc => (
				<React.Fragment key={doc.id}>
					<Images img={doc} />
				</React.Fragment>
      ))}
    </>
  )
}

export default ImageGridAuth;