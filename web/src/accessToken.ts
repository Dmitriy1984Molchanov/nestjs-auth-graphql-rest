export const setAccessToken = (accessToken: string) => {
	localStorage.setItem('accessToken', accessToken)
}

export const getAccessToken = () => localStorage.getItem('accessToken')

export const deleteAccessToken = () => {
	localStorage.removeItem('accessToken')
}
