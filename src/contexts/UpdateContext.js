import React, { useContext, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useFirestore from '../hooks/useFirestore';
import useDemo from '../hooks/useDemo';

const UpdateContext = React.createContext()

export const useUpdate = () => useContext(UpdateContext)

export const UpdateProvider = ({ children }) => {
	const [selectedImg, setSelectedImg] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showModal2, setShowModal2] = useState(false);
	const [checked, setChecked] = useState(true);
	const [selectedImgUid, setSelectedImgUid] = useState(null);
	const [btnState, setBtnState] = useState(true);
	const [count, setCount] = useState(0);
	const [countA, setCountA] = useState(0);
	const { elemsTotal, elemsPage } = useDemo(count);
	const { docs } = useFirestore('images');
	const [ disabled, setDisabled ] = useState(false);
	const { currentUser } = useAuth();

	const docsFilter = currentUser && docs.filter(doc => checked ? doc : doc.uid === currentUser.uid)

	const LeftClick = () => {
		if(!disabled) {
			if(!currentUser) {
				count >= elemsPage ? setCount(count - elemsPage) : setCount(0);
			} else {
				countA >= elemsPage/2 ? setCountA(countA - elemsPage/2) : setCountA(0);
			}
			setDisabled(true)
		}
		
	}

	const RightClick = () => {
		if(!disabled) {
			if(!currentUser) {
				count <= elemsTotal - elemsPage ? setCount(count + elemsPage) && setDisabled(true) : setCount(count);
			} else {
				countA < docsFilter.length - elemsPage/2 ? setCountA(countA + elemsPage/2) && setDisabled(true) : setCountA(countA);
			}
			setDisabled(true)
		}		
		
	}

	const handleChange = () => {
    setChecked(prev => !prev);
		currentUser && setCountA(0)
  };

	const handleNumChange = (e) => {
    !currentUser ? setCount(e.target.value * elemsPage) : setCountA(e.target.value * elemsPage/2);;
  };

	let padding = (window.innerWidth - document.body.clientWidth) + 'px';

	const handleClick = (doc, uid = null) => {
    document.body.style.overflow = 'hidden'; 
		document.body.style.paddingRight = padding;
		setSelectedImg(doc);
		setSelectedImgUid(uid);
  }

	const openPopup = () => {
    setShowModal(prev => !prev);
  };

	const openPopup2 = () => {
    setShowModal2(prev => !prev);
  };

	useEffect(() => {
		return () => { setCount(0); setCountA(0) }
	}, [currentUser])

	const value = {
    selectedImg,
		setSelectedImg,
		handleClick,
		openPopup, openPopup2,
		showModal, setShowModal,
		showModal2, setShowModal2, LeftClick, RightClick, count, countA, disabled, setDisabled, handleNumChange, docsFilter,
		handleChange, checked, selectedImgUid, btnState, setBtnState
  }

	return (
		<UpdateContext.Provider value={value}>
			{children}
		</UpdateContext.Provider>
	)

}