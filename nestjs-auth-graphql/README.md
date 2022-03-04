<p align="center">
  <a href="https://jenyus.web.app/" target="blank"><img src="https://avatars.githubusercontent.com/u/71438996?s=200&v=4" width="200" alt="Jenyus Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript example with PassportJS authentication, GraphQL and Rest API support.

## Setup

- Uses code-first GraphQL
- Uses TypeORM for entities and migrations
- Properly configures `ormconfig.ts` for runtime synchronization and migrations
- Uses PassportJS and JWT for authentication
- Custom Prettier and ESLint config

### Configuration Files

#### Environment Variables

`.env`

```env
JWT_KEY=<your-jwt-key-here>
TYPEORM_SYNCHRONIZE=<typeorm-synchronize-option-here>
```

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

### Documentation
http://localhost:3000/api/

http://localhost:3000/graphql

## License

This boilerplate remains true to Nest and is [MIT licensed](LICENSE).
