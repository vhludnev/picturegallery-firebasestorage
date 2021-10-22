import React, { Suspense }  from 'react';
//import Spinner from './Spinner';

const WithSuspense = WrappedComponent => (props) => {
	const style = {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)'
	}
	
  return (
    <Suspense fallback={<p style={style}>Loading...</p>}>
			<WrappedComponent {...props} />
		</Suspense>
  );
}

export default WithSuspense;