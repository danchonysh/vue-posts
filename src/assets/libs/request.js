async function request(url, method = 'GET', data = null, headers = {'Content-Type': 'application/json'}) {
	try {
		const body = data ? JSON.stringify(data) : null
		const response = await fetch(url, {
			method,
			headers,
			body
		})
		const result = await response.json()
		return await result
	} catch(e) {
		console.warn('Error: ', e)
	}
}

export default request