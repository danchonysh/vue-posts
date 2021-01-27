export default function formatting(time) {
	const date = new Date(time)

	const year = date.getFullYear()
	const month = date.getMonth() > 8 
		? date.getMonth() + 1 
		: `0${date.getMonth() + 1}`
	const day = date.getDate() > 9 
		? date.getDate() 
		: `0${date.getDate()}`

	const hour = date.getHours() > 9 
		? date.getHours() 
		: `0${date.getHours()}`
	const minute = date.getMinutes() > 9 
		? date.getMinutes() 
		: `0${date.getMinutes()}`

	const current = new Date(Date.now()) 

	const differenceMin = Math.floor((current - date)/60000)
	const differenceHour = Math.floor(differenceMin/60)
	const differenceDay = Math.floor(differenceHour/24)
	const differenceWeek = Math.floor(differenceDay/7)

	const getWord = (one, few, many, number) => {
		let word
		if (number <= 20) {
			if (number >= 2) {
				word = few
			}
			if (number >= 5) {
				word = many
			}
		} else {
			if(number%10 === 1) {
				word = one
			}
			if(number%10 > 1) {
				word = few
			}
			if(number%10 > 4 || number%10 === 0) {
				word = many
			}
		}
		return word
	}

	let minWord = getWord('минуту', 'минуты', 'минут', differenceMin)
	let hourWord = getWord('час', 'часа', 'часов', differenceHour)
	let dayWord = getWord('день', 'дня', 'дней', differenceDay)
	let weekWord = getWord('неделю', 'недели', 'недель', differenceWeek)
	
	if (differenceMin <= 5) return 'только что'
	if (differenceMin <= 59) return `${differenceMin} ${minWord} назад` 
	if (differenceHour === 1) return 'Час назад'
	if (differenceHour <= 23) return `${differenceHour} ${hourWord} назад`
	if (differenceDay === 1) return 'День назад'
	if (differenceDay <= 29) return `${differenceDay} ${dayWord} назад`
	if (differenceWeek === 1) return 'Неделю назад'
	if (differenceWeek > 1 && differenceWeek <= 3) return `${differenceWeek} ${weekWord} назад`
	if (differenceWeek > 4) return `${day}.${month}.${year} \\ ${hour}:${minute}`
}
