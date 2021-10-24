import React from 'react'
import styled from 'styled-components';
import { useUpdate } from '../contexts/UpdateContext';

const Filter = () => {
	const { handleChange, checked } = useUpdate();

	return (
		<Wrapper>
			<div className="segmented-control">     
				<input type="radio" name="radio2" onChange={handleChange} id="tab-1" defaultChecked={checked} />
				<label htmlFor="tab-1" className= "segmented-control__1">
					<p>All</p>
				</label>     
				<input type="radio" name="radio2" onChange={handleChange} id="tab-2" defaultChecked={!checked} />
				<label htmlFor="tab-2" className="segmented-control__2">
					<p>Mine</p>
				</label>     
				<div className="segmented-control__color"></div>
			</div>
		</Wrapper>
	)
}

export default Filter;

const Wrapper = styled.div`
	.segmented-control {
		position: absolute;
		left: 20px;
		top: -1px;
		width: 7.4rem;
		height: 2rem;
		box-shadow: 0rem .1rem .5rem var(--greyLight),0rem -.1rem .5rem lightgrey;
		border-radius: .5rem;
		display: flex;
		align-items: center;

		input { display: none; }
		> input:checked + label {
			transition: all .5s ease;
			color: var(--primary);
			}
		input + label {
			border: none;
		}
		label {
			font-weight: bold;
		}
		label:hover{
			background: transparent;
		}
		&__1, &__2 {
			width: 2rem;
			height: 2.4rem;
			font-size: .7rem;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			color: var(--greyDark);
			transition: all .5s ease;

			&:hover { color: var(--primary); }
		}

		&__color {
			position: absolute;
			height: 1.6rem;
			width: 3.4rem;
			margin-left: .2rem;
			border-radius: .3rem;
			box-shadow: inset .2rem .2rem .5rem var(--greyLight), 
									inset -.2rem -.2rem .5rem white;
			pointer-events: none;
		}

		#tab-1:checked ~ .segmented-control__color {
			transform: translateX(0);
			transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
		}
		#tab-2:checked ~ .segmented-control__color {
			transform: translateX(3.6rem);
			transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
		}
	}
`;



