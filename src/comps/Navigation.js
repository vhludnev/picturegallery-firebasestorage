import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useUpdate } from '../contexts/UpdateContext';
import useDemo from '../hooks/useDemo';

const Navigation = () => {
	const { currentUser } = useAuth();
	const { count, countA, LeftClick, RightClick, disabled, setDisabled, docsFilter } = useUpdate();
	const { elemsTotal, elemsPage } = useDemo(count);

	const Func = useCallback((count, elemsPage, elemsTotal) => {
		const firstNumber = (count+elemsPage)/elemsPage,
					secondNumber = Math.ceil(elemsTotal/elemsPage);
		return <div>{firstNumber}/{secondNumber}</div>
	},[]);

	useEffect(() => {
		if (!currentUser && (count === 0 || count > (elemsTotal - elemsPage))) {
			return setDisabled(false)
		} else if (currentUser && (countA === 0 || countA > (docsFilter.length - elemsPage / 2 ))) {
			return setDisabled(false)
		}
	});

	return (
		<Wrapper className="navigation">
			<button disabled={disabled} onClick={LeftClick} id='left'>Left</button>
			{currentUser ? Func(countA, elemsPage / 2, docsFilter.length) : Func(count, elemsPage, elemsTotal)}
			<button disabled={disabled} onClick={RightClick} id='right'>Right</button>
		</Wrapper>
	)
}

export default Navigation;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: auto auto auto;
	place-content: center;
	grid-column-gap: 20px;
	margin: 40px 0;
	button {
		cursor: pointer;
		min-width: 50px;
		/* padding: 0 10px; */
		background: var(--primary);
		border: none;
		border-radius: 10%;
		font-weight: 700;
		:disabled {
			color: black;
		}
	}
`