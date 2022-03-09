module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'graphql'],
	rules: {
		'import/extensions': 'off',
		'import/prefer-default-export': 'off',
		'no-unused-vars': 'warn',
		'react/function-component-definition': 'off',
		'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
		'no-return-await': 'error',
		'no-tabs': 'off',
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.ts', '.tsx'],
			},
		},
	},
}
