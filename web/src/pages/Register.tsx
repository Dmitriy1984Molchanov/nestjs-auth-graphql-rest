import { ApolloError } from '@apollo/client'
import { gql } from 'apollo-boost'
import { GraphQLError } from 'graphql'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setAccessToken } from '../accessToken'
import { Errors } from '../Errors'
import {
	useRegisterMutation,
	MeDocument,
	useMeQuery,
} from '../generated/graphql'
import { Welcome } from '../Welcome'

export const Register: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [fullname, setFullname] = useState('')
	const [errors, setErrors] = useState<readonly GraphQLError[] | ApolloError>()
	const { data: meData } = useMeQuery({ fetchPolicy: 'cache-only' })
	const [register, { loading }] = useRegisterMutation({
		update(cache, { data }) {
			cache.writeQuery({
				query: gql`
					${MeDocument}
				`,
				data: { me: data?.register.user },
			})
		},
		onError(err) {
			setErrors(err)
		},
	})

	const navigate = useNavigate()

	return (
		<>
			<h1>Register</h1>
			{!meData ? (
				<form
					onSubmit={async e => {
						e.preventDefault()
						const response = await register({
							variables: {
								input: {
									email,
									password,
									fullname,
								},
							},
						})

						if (response.errors) {
							setErrors(response.errors)
						} else if (response.data) {
							setAccessToken(response.data.register.accessToken)
							navigate('/')
						}
					}}
				>
					<div>
						<input
							value={email}
							placeholder='Email'
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<br />
					<div>
						<input
							type='password'
							value={password}
							placeholder='Password'
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<br />
					<div>
						<input
							value={fullname}
							placeholder='Full Name'
							onChange={e => setFullname(e.target.value)}
						/>
					</div>
					<br />
					<button type='submit'>Register</button>
					<span>&nbsp;{loading ? 'load...' : ''}</span>
					<Errors errors={errors} />
				</form>
			) : (
				<Welcome user={meData?.me} />
			)}
		</>
	)
}
