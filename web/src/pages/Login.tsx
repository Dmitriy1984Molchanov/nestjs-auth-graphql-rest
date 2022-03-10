import { ApolloError } from '@apollo/client'
import { gql } from 'apollo-boost'
import { GraphQLError } from 'graphql'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setAccessToken } from '../accessToken'
import { Errors } from '../Errors'
import { MeDocument, useLoginMutation, useMeQuery } from '../generated/graphql'
import { Welcome } from '../Welcome'

export const Login: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState<readonly GraphQLError[] | ApolloError>()
	const navigate = useNavigate()
	const { data: meData } = useMeQuery({ fetchPolicy: 'cache-only' })
	const [login, { loading }] = useLoginMutation({
		update(cache, { data }) {
			cache.writeQuery({
				query: gql`
					${MeDocument}
				`,
				data: {
					me: data?.login.user,
				},
			})
		},
		onError(err) {
			setErrors(err)
		},
	})

	return (
		<>
			<h1>Login</h1>
			{!meData ? (
				<form
					onSubmit={async e => {
						e.preventDefault()
						const response = await login({
							variables: {
								input: {
									email,
									password,
								},
							},
						})
						if (response.errors) {
							setErrors(response.errors)
						} else if (response.data) {
							setAccessToken(response.data.login.accessToken)
							await navigate('/')
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
					<button type='submit'>Login</button>
					<span>
						&nbsp;
						{loading ? 'load...' : ''}
					</span>
					<Errors errors={errors} />
				</form>
			) : (
				<Welcome user={meData?.me} />
			)}
		</>
	)
}
