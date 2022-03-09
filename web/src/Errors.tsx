import { ApolloError } from '@apollo/client'
import { GraphQLError } from 'graphql'
import React from 'react'

export const processErrors = (
	errors: readonly GraphQLError[] | ApolloError | string
) => {
	const graphQLError = (errors as any)[0]?.extensions?.response.message
	const apolloError = (errors as ApolloError).message

	if (graphQLError && Array.isArray(graphQLError)) return graphQLError
	if (graphQLError) return [graphQLError]
	if (apolloError) return [apolloError]
	return [errors]
}

export const Errors: React.FC<{
	errors: readonly GraphQLError[] | ApolloError | undefined
}> = ({ errors }) =>
	errors ? (
		<ul style={{ color: 'red' }}>
			{processErrors(errors)?.map((err: string, i: number) => (
				// eslint-disable-next-line react/no-array-index-key
				<li key={i}>
					{err}
					<br />
				</li>
			))}
		</ul>
	) : null
