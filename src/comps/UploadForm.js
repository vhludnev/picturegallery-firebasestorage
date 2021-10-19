import React, { useState } from 'react';
import styled from 'styled-components';
import { MdFileUpload } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import ProgressBar from './ProgressBar';
import Filter from './Filter';
import Darkmode from './Darkmode';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
	const { currentUser } = useAuth();

  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  return (		
		<>	
			<Wrapper style={{gridTemplateColumns: currentUser ? "auto auto auto" : "1fr auto"}} className='options'>
				{currentUser && <Filter/>}
				<motion.label whileHover={{ scale: 1.2 }} >
					{currentUser && <input type='file' onChange={handleChange} />}
					<span className='tooltip'><MdFileUpload/>
						{!currentUser && <span className='tooltiptext'>To upload your pictures, please, login first !!!</span>}
					</span>
				</motion.label>
				<Darkmode/>
			</Wrapper>	
			{currentUser && ( 
				<Output>
					{ error && <div className='error'>{ error }</div>}
					{ file && <div>{ file.name }</div> }
					{ file && <ProgressBar file={file} setFile={setFile} /> }
				</Output>	
			)}			 
		</> 	
  );
}

export default UploadForm;

const Wrapper = styled.form`
  text-align: center;
	position: relative;
	display: grid;
	margin-bottom: 50px;
	label input{
		height: 0;
		width: 0;
		opacity: 0;
	}
	label{
		display: block;
		width: 30px;
		height: 30px;
		border: 1px solid var(--primary);
		border-radius: 50%;
		margin: 0 auto;
		color: var(--primary);
		font-weight: bold;
		font-size: 20px;
		:hover{
			background: var(--primary);
			color: white;
		}
		:hover .tooltip .tooltiptext {
			visibility: visible;
		}
		
		.tooltip {
			position: relative;
			display: inline-block;
			cursor: pointer;
			padding-top: 2px;
			.tooltiptext {
				visibility: hidden;
				font-size: 0.6em;;
				width: max-content;
				color: var(--primary);
				text-align: center;
				border-radius: 6px;
				padding-top: 12px;
				position: absolute;
				z-index: 10;

				left: 50%;
				top: 100%;
				transform: translateX(-50%);
				@media (max-width: 992px) {
					padding-top: 15px;
				}
			}
		}
	}
`;

const Output = styled.div`
	text-align: center;
	max-height: 60px;
	font-size: 0.8rem;
	.error{
		color: var(--error);
	}
`;
