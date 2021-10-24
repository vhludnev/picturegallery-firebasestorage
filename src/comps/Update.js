import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUpdate } from '../contexts/UpdateContext';

const UpdateProfile = () => {
	const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
	const modal_Ref = useRef();
	const nameRef = useRef();
	const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail, updateProfile } = useAuth();
	const { showModal2, setShowModal2 } = useUpdate();

  const handleSubmit = (e) => {
    e.preventDefault()

    const promises = []
    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
		if (nameRef.current.value !== currentUser.displayName) {
      promises.push(updateProfile(nameRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    Promise.all(promises)
      .then(() => {
				setShowModal2(false);
      })
      .catch(() => {
        setError('Failed to update account')
      })
      .finally(() => {
				setError('')	
        setLoading(false)
      })
  };

	const cleanFields = () => {
		return (
			setShowModal2(false),
			setError('')
		)
	};

	const closeModal = (e) => {
    if (modal_Ref.current === e.target) {
      cleanFields()
    }
  };

	const keyPress = useCallback(e => {
      if (e.key === 'Escape' && showModal2) {
        setShowModal2(false);
      }
    },
    [showModal2, setShowModal2]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
			{showModal2 && (
				<FormContainer onClick={closeModal} ref={modal_Ref} >
					<motion.div initial={{ y: '-100vh' }} animate={{ y: '40vh' }} transition={{ type: 'spring', duration: 0.65 }}>
						<FormWrapper onSubmit={handleSubmit} >
							<CloseModalButton
										aria-label='Close modal'
										onClick={() => cleanFields()}
							/>
							<Title>Update Profile</Title>
							{error && <p>{error}</p>}
							<Input placeholder='Email' 
										id='email'
										type='email'
										ref={emailRef}
										required
										defaultValue={currentUser.email}
										readOnly
							/>
							<Input placeholder='Display name' 
										id='name'
										type='text'
										ref={nameRef}
										maxLength='15'
										defaultValue={currentUser.displayName ? currentUser.displayName : null}
							/>
							<Input placeholder='Password (can leave blank)'
										id='password'
										type='password'
										ref={passwordRef}
										readOnly
							/>
							<Input placeholder='Password confirm (can leave blank)'
										id='password-confirm'
										type='password'
										ref={passwordConfirmRef}
										readOnly
							/>
							<Button disabled={loading} type='submit'>Update</Button>
						</FormWrapper>
					</motion.div>
				</FormContainer> )
			 } 
		</>
  )
}

export default UpdateProfile;

const FormContainer = styled.div`
	z-index: 2;
	position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const FormWrapper = styled.form`
  display: grid;
  justify-content: center;
  gap: 20px;
	position: absolute;
	left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
	padding: 50px;
  background-color: lightgrey;
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 48px;
  color: #000;
  text-align: center;
`;

const Input = styled.input`
  border-radius: 30px;
  padding: 10px 20px;
  background-blend-mode: overlay;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 20px 40px rgba(31, 47, 71, 0.25),
    0px 1px 5px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(250, 250, 250, 0.4);
	text-align: center;
  :focus {
    outline: none;
		background: rgba(255, 255, 255, 0.95);
		::placeholder {
			text-align: center;
			opacity: .5;
		}
  }
	::placeholder {
		text-align: left;
	}
`;

const Button = styled.button`
  background: linear-gradient(91.4deg, #2fb8ff 0%, #9eecd9 100%);
  padding: 12px 0;
  width: 200px;
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  font-family: 'Noto Serif', 'Segoe UI', sans-serif;
  cursor: pointer;
	margin: 0 auto;
  :focus {
    outline: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
	fill: black;
	opacity: 0.7;
`;