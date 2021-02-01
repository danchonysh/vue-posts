const toLocal = (data, store) => localStorage.setItem(store, JSON.stringify(data))

export default toLocal