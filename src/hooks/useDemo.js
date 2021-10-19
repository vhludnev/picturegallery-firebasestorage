import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useDemo = (count, elemsTotal = 1085, elemsPage = 24) => {
  const [images, setImages] = useState([]);
	//const [error, setError] = useState(false);
	//const [loading, setLoading] = useState(true);

	const ax = async(url) => {
		try {
			const picsData = await axios(url)
				/* setLoading(false);
				setError(false); */
				return {
					id: +picsData.data.id,
					url_full: picsData.data.url,
					download_url: picsData.data.download_url,
					url: `https://picsum.photos/id/${picsData.data.id}/300`
				}
		} catch (err) {/* setError(err.message); setLoading(false) */}
	}

	const replacedUndefined = useCallback(() => {	
		return	{	
			id: Math.floor(Math.random() * (1250 - elemsTotal + 1)) + elemsTotal,
			url_full: 'https://storage.googleapis.com/orchestra-cafe-7jp1kqsp/uploads/sites/47/2018/06/IMG_1791-768x624.jpg',
			download_url: 'https://storage.googleapis.com/orchestra-cafe-7jp1kqsp/uploads/sites/47/2018/06/IMG_1791-768x624.jpg',
			url: 'https://www.noahubs.de/media/image/7b/71/ba/SorryNoPicQ2RbvqidfEJGI.jpg'	
		}
	},[elemsTotal])

	useEffect(() => {
		const ids = [...Array(elemsTotal).keys()]
		const requests = ids.slice(count, count > ids.length - elemsPage ? ids.length : count + elemsPage).map(async id => {
			let abc = `https://picsum.photos/id/${id}/info`
			return await ax(abc)
		})
		return Promise.all(requests).then( data => setImages(data.map(item => item === undefined ? replacedUndefined() : item))	); // remove 'undefined' 
	}, [count, elemsPage, elemsTotal, replacedUndefined]); 
	
	return { images, elemsTotal, elemsPage/* , error, loading */ };
}

export default useDemo;