import React, { useEffect } from 'react';
import styled from "styled-components";
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

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