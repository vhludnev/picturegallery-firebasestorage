import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUpdate } from '../contexts/UpdateContext';

const Login = () => {
	const [error, setError] = useState('');
	const modalRef = useRef();
	const { login, loading, setLoading } = useAuth();
	const { showModal, setShowModal } = useUpdate();

	const handleSubmit = async (e) => {
    e.preventDefault()

    try {  
      await login('example@mail.com', 'testtest')
			setLoading(true)
			setError('')
			setShowModal(false);	
    } catch {
      setError('Failed to log in');
		} 
    setLoading(false);
  };

	const cleanFields = () => {
		return (
			setShowModal(false),
			setError('')
		)
	};
	
	const closeModal = (e) => {
    if (modalRef.current === e.target) {
      cleanFields();
    }
  };

	const keyPress = useCallback(e => {
      if (e.key === 'Escape' && showModal) {
				setShowModal(false);
      }
    },
    [showModal, setShowModal]
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
			{showModal && (
				<FormContainer onClick={closeModal} ref={modalRef} >
					<motion.div initial={{ y: '-100vh' }} animate={{ y: '40vh' }} transition={{ type: 'spring', duration: 0.65 }} >
						<FormWrapper onSubmit={handleSubmit} >
							<CloseModalButton
										aria-label='Close modal'
										onClick={() => cleanFields()}
							/>
							<Title>Sign in</Title>
							{error && <p>{error}</p>}
							<Input placeholder='Email' 
										type='text'
										readOnly
										defaultValue="example@mail.com"
							/>
							<Input placeholder='Password' 
										type='password' 
										readOnly
										defaultValue="testtest"
							/>
							<Button disabled={loading} type='submit'>Sign in</Button>
						</FormWrapper>
					</motion.div>
				</FormContainer> )
			 }
		</>
  );
}

export default Login;

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
  background: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 10px 20px;
  background-blend-mode: overlay;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 20px 40px rgba(31, 47, 71, 0.25),
    0px 1px 5px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(250, 250, 250, 0.4);

  :focus {
    outline: none;
		background: rgba(255, 255, 255, 0.95);
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
  font-family: 'Segoe UI', sans-serif;
  cursor: pointer;
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