/* eslint-disable */
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
}

export type LoginUserInput = {
	email: Scalars['String']
	password: Scalars['String']
}

export type LoginUserPayload = {
	__typename?: 'LoginUserPayload'
	accessToken: Scalars['String']
	user: User
}

export type Mutation = {
	__typename?: 'Mutation'
	login: LoginUserPayload
	register: RegisterUserPayload
}

export type MutationLoginArgs = {
	input: LoginUserInput
}

export type MutationRegisterArgs = {
	input: RegisterUserInput
}

export type Query = {
	__typename?: 'Query'
	me: User
}

export type RegisterUserInput = {
	email: Scalars['String']
	fullname: Scalars['String']
	password: Scalars['String']
}

export type RegisterUserPayload = {
	__typename?: 'RegisterUserPayload'
	accessToken: Scalars['String']
	user: User
}

export type User = {
	__typename?: 'User'
	email: Scalars['String']
	fullname: Scalars['String']
	id: Scalars['Int']
}

export type LoginMutationVariables = Exact<{
	input: LoginUserInput
}>

export type LoginMutation = {
	__typename?: 'Mutation'
	login: {
		__typename?: 'LoginUserPayload'
		accessToken: string
		user: { __typename?: 'User'; id: number; email: string; fullname: string }
	}
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
	__typename?: 'Query'
	me: { __typename?: 'User'; id: number; email: string; fullname: string }
}

export type RegisterMutationVariables = Exact<{
	input: RegisterUserInput
}>

export type RegisterMutation = {
	__typename?: 'Mutation'
	register: {
		__typename?: 'RegisterUserPayload'
		accessToken: string
		user: { __typename?: 'User'; id: number; email: string; fullname: string }
	}
}

export const LoginDocument = gql`
	mutation login($input: LoginUserInput!) {
		login(input: $input) {
			user {
				id
				email
				fullname
			}
			accessToken
		}
	}
`
export type LoginMutationFn = Apollo.MutationFunction<
	LoginMutation,
	LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
	baseOptions?: Apollo.MutationHookOptions<
		LoginMutation,
		LoginMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
		LoginDocument,
		options
	)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
	LoginMutation,
	LoginMutationVariables
>
export const MeDocument = gql`
	query me {
		me {
			id
			email
			fullname
		}
	}
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
	baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const RegisterDocument = gql`
	mutation register($input: RegisterUserInput!) {
		register(input: $input) {
			user {
				id
				email
				fullname
			}
			accessToken
		}
	}
`
export type RegisterMutationFn = Apollo.MutationFunction<
	RegisterMutation,
	RegisterMutationVariables
>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
	baseOptions?: Apollo.MutationHookOptions<
		RegisterMutation,
		RegisterMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
		RegisterDocument,
		options
	)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
	RegisterMutation,
	RegisterMutationVariables
>
