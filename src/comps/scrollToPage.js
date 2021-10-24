import React from 'react'
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useUpdate } from '../contexts/UpdateContext';
import useDemo from '../hooks/useDemo';

const ScrollToPage = () => {
	const { currentUser } = useAuth();
	const { count, countA, handleNumChange, docsFilter } = useUpdate();
	const { elemsTotal, elemsPage } = useDemo(count);

	const pages = !currentUser 
								? [...Array(Math.ceil(elemsTotal/elemsPage)).keys()] 
								: [...Array(Math.ceil(docsFilter.length/(elemsPage/2))).keys()]

	let value = !currentUser ? (count+elemsPage)/elemsPage : (countA + elemsPage / 2)/(elemsPage/2)

	return (
		<Wrapper className="scroll" value={value-1} onChange={handleNumChange} >
			{pages.length > 0 && pages.map((item, i) => {
				return (
					<option key={i} value={i}>{item+1}</option>
				)
			})}
		</Wrapper>
	)
}

export default ScrollToPage;

const Wrapper = styled.select`
	cursor: pointer;
	min-width: 50px;
	font-family: var(--font_family);
	font-weight: 700;
	display: block;
	padding: 5px 0;
	border-color: var(--primary);
	border-radius: 5px;
	margin: 40px auto 60px;
	appearance: none;
	outline: none;
	overflow-y: auto;
	::-webkit-scrollbar {
    display:none;
	}
	:focus {
		outline: none;
	}
	option {
		text-align: center;
	}
`