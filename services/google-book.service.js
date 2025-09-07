
export function query(filterBy) {
	// minimal implementation: search by title (q)
	const q = (filterBy).trim();
	if (!q) return Promise.resolve([]);

	const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(q)}&maxResults=5`;

	return fetch(url)
		.then(res => {
			if (!res.ok) throw new Error('Google Books API error');
			return res.json();
		})
		.then(data => (data.items || []))
		.catch(err => {
			console.error('google-book.service: query failed', err);
			return [];
		});
}