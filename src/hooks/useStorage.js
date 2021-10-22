import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp, auth } from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
	const [done, setDone] = useState(false);
	//const [size, setSize] = useState(0);

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref('images/' + file.name);
    const collectionRef = projectFirestore.collection('images');
		//collectionRef.get().then(snap => setSize(snap.size))
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
     /*  snap.totalBytes <= 5 * 1024 * 1024 && */ setProgress(percentage);
		 snap.bytesTransferred === snap.totalBytes && setDone(true)
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
			const uid = auth.currentUser.uid;
      await collectionRef.add({ uid, url, createdAt });
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error, done };
}

export default useStorage;