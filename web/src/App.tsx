import { ApolloProvider } from '@apollo/react-hooks'
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist'
import React, { useEffect, useState } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { Router } from './Router'
import { getAccessToken } from './accessToken'
import config from './config'

export const App: React.FC = () => {
	const [client, setClient] = useState<any>()
	const cache = new InMemoryCache({})

	useEffect(() => {
		async function init() {
			const persistor = new CachePersistor({
				cache,
				storage: new LocalStorageWrapper(window.localStorage),
			})
			await persistor.restore()

			const apolloClient = new ApolloClient({
				link: ApolloLink.from([
					onError(({ graphQLErrors, networkError }) => {
						// example of common errors processing
						// eslint-disable-next-line no-console
						if (graphQLErrors) console.error(graphQLErrors)
						// eslint-disable-next-line no-console
						if (networkError) console.error(networkError)
					}),
					new ApolloLink((operation, forward) => {
						const accessToken = getAccessToken()
						if (accessToken) {
							operation.setContext({
								headers: {
									authorization: `Bearer ${accessToken}`,
								},
							})
						}
						return forward(operation)
					}),
					new HttpLink({
						uri: `${config.serverUrl}/graphql`,
					}),
				]) as any,
				cache,
				defaultOptions: {
					mutate: { errorPolicy: 'all' },
				},
			})

			apolloClient.onResetStore(async () => {
				await persistor.purge()
			})

			setClient(apolloClient)
		}
		init()
	}, [])

	return !client ? (
		<h2>Initializing app...</h2>
	) : (
		<ApolloProvider client={client}>
			<Router />
		</ApolloProvider>
	)
}
