import { useApolloClient } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { deleteAccessToken } from './accessToken'

type User = {
	id: number
	email: string
	fullname: string
}

export const Welcome: React.FC<{
	user: User
}> = ({ user }) => {
	const client = useApolloClient()
	return (
		<div>
			Welcome <b>{user.fullname}</b>! To logout click&nbsp;
			<Link
				to='/'
				onClick={async e => {
					e.preventDefault()
					deleteAccessToken()
					await client.resetStore()
				}}
			>
				here
			</Link>
		</div>
	)
}
