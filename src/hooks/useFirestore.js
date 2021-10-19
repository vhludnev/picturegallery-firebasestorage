import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

	//const [loading, setLoading] = useState(true)
	//const [error, setError] = useState(false)


	// const onError = () => {
  //   setError(true);
	// 	setLoading(false);
  // };
	
  useEffect(() => {
    const unsub = projectFirestore.collection(collection)
      .orderBy('createdAt', 'desc')	// newest first
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id}); // createdAt, url and id from FB Firestore
        });
        setDocs(documents);
				//setLoading(false)
      })

    return () => unsub();	 // this is a cleanup function that react will run when a component using the hook unmounts
  }, [collection]);

  return { docs, /* error,  loading */};
}

export default useFirestore;