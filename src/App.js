import React from 'react';
import styled from 'styled-components';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGridComp from './comps/ImageGridComp';
import { AuthProvider } from './contexts/AuthContext';
import { UpdateProvider } from './contexts/UpdateContext';

const App = () => {
  return (
		<AuthProvider>
			<UpdateProvider>
				<AppWrapper>
					<Title />
					<UploadForm />
					<ImageGridComp />
				</AppWrapper>
			</UpdateProvider>
		</AuthProvider>
  );
}

export default App;

const AppWrapper = styled.div`
	max-width: 960px;
  margin: 0 auto;
`;