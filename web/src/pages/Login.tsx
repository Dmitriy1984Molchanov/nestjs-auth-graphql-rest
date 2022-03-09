import { ApolloError } from '@apollo/client'
import { gql } from 'apollo-boost'
import { GraphQLError } from 'graphql'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setAccessToken } from '../accessToken'
import { Errors } from '../Errors'
import { MeDocument, useLoginMutation } from '../generated/graphql'

export const Login: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState<readonly GraphQLError[] | ApolloError>()
	const navigate = useNavigate()
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
				<button type='submit'>Login</button>
				<span>
					&nbsp;
					{loading ? 'load...' : ''}
				</span>
				<Errors errors={errors} />
			</form>
		</>
	)
}
