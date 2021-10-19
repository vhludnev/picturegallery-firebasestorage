import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
 
	:root {
		--primary: #efb6b2;
		--secondary: #4e4e4e;
		--error: #ff4a4a;
		--greyDark: #9baacf;
		--greyLight: #c8d0e7;
		--light_radio_button_size: 30px; 
		--dark_radio_button_size: 28px;
		--font_family: 'Noto Serif', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  body {
		font-family: var(--font_family);
		font-size: 20px;
		color: var(--secondary);
		overflow-y: auto;
		background-color: #eee;
		transition: background 1s, color 1s;
  }

	button {
		font-family: var(--font_family);
	}
`;
