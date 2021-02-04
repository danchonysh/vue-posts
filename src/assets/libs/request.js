async function request(url, method = 'GET', data = null) {
	try {
		const headers = {}
		let body

		if (data) {
			headers['Content-Type'] = 'application/json'
			body = JSON.stringify(data)
		}

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