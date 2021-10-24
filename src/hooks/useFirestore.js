import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
	//const [isLoading, setIsLoading] = useState(true)
	//const [error, setError] = useState(false)
	
  useEffect(() => {
    const unsub = projectFirestore.collection(collection)
      .orderBy('createdAt', 'desc')	// newest first
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id}); // createdAt, url and id from FB Firestore
        });
        setDocs(documents);
				//setIsLoading(false)
      })

    return () => unsub();	 // this is a cleanup function that react will run when a component using the hook unmounts
  }, [collection]);

  return { docs/* , isLoading */ /* error */};
}

export default useFirestore;