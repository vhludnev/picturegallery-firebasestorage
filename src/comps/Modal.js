import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MdDeleteForever } from 'react-icons/md';
import { projectFirestore, projectStorage } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useUpdate } from '../contexts/UpdateContext';

const Modal = () => {
	const { currentUser } = useAuth();
	const { selectedImg, setSelectedImg, selectedImgUid } = useUpdate();

  const handleClick = (e) => {
    if (e.target.classList.contains('wrapper')) {	// closes only if clicked outside the image
      ModalClosure();
    }
  };

	const handleDelete = () => {
		projectFirestore.collection('images').get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				if(doc.data().url === selectedImg && doc.data().uid === currentUser.uid) {
					const imgIdToDelete = doc.id,
								storageRefUrl = projectStorage.refFromURL(doc.data().url);
					projectFirestore.collection('images').doc(imgIdToDelete).delete().then(() => console.log(imgIdToDelete, ' has been erased')).catch(err => console.log('there was an error: ', err));
					projectStorage.ref(storageRefUrl.fullPath).delete().then(() => console.log(storageRefUrl.name, ' deleted')).catch(err => console.log('there was an error: ', err));
				}
				ModalClosure();
			});
		})
	};

	const ModalClosure = () => {
		setSelectedImg(null);
		document.body.style.overflow = 'auto';
		document.body.style.paddingRight = '0px';
	};
	
  return (
		<>
			{selectedImg && (
				<BackdropWrapper onClick={handleClick}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>	<div className='wrapper'>
						{currentUser && selectedImgUid === currentUser.uid && <DeleteModalButton onClick={handleDelete} ></DeleteModalButton>}
						<img className='modalimage' src={selectedImg} alt='enlarged pic' />	
					</div>
				</BackdropWrapper>
			)}
  	</>
	)
}

export default Modal;

const BackdropWrapper = styled(motion.div)`
	position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
	z-index: 2;
	.wrapper {
		position: relative;
		display: grid;
		grid-template-rows: 1fr 1fr;
		img{
			display: block;
			max-width: 90%;
			max-height: 90vmin;
			margin: 60px auto;
			box-shadow: 3px 5px 7px rgba(0,0,0,0.5);
			border: 3px solid white;
			@media (max-width: 992px) {
				max-height: 90vmax;
			}
		}
	}
`;

const DeleteModalButton = styled(MdDeleteForever)`
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15vw;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
	&:hover {
		color: salmon;
	}
	path {
		pointer-events: none;
	}
	@media (max-width: 992px) {
		right: 0;
	}
`;