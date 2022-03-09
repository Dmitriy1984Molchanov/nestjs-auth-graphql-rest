import React from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery } from '../generated/graphql'
import { Welcome } from '../Welcome'

export const Home: React.FC = () => {
	const { data } = useMeQuery({ fetchPolicy: 'cache-only' })

	return (
		<>
			<h1>Home</h1>
			{!data ? (
				<ul>
					<li>
						<Link to='/register'>Register</Link>
					</li>
					<li>
						<Link to='/login'>Login</Link>
					</li>
				</ul>
			) : (
				<Welcome user={data.me} />
			)}
		</>
	)
}
