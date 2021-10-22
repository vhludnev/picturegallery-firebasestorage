import React, { useEffect } from 'react';
import styled from "styled-components";
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';
import { useUpdate } from '../contexts/UpdateContext';

const ProgressBar = ({ file, setFile }) => {
  const { progress, url, done } = useStorage(file);
	const { resetCountA } = useUpdate();

  useEffect(() => {
    if (url) {
      setFile(null);
			done && resetCountA(0)
    }
  }, [url, setFile, done, resetCountA]);

  return (
    <Wrapper
      initial={{ width: 0 }}	/* removes progressbar jumping effect on upload */
      animate={{ width: progress + '%' }}
    ></Wrapper>
  );
} 

export default ProgressBar;

const Wrapper = styled(motion.div)`
	height: 5px;
  background: var(--primary);
  margin-top: 20px;
`;