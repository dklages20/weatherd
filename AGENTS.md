# AGENTS.md

## Development Commands

- Run the linter using: `npm run lint`
- Run the unit tests using: `npm run test`
- Start the application using `npm run start`

## Code Style

- Avoid unnecessary comments
- Use vertical slice architecture at the top-level
- Use clean architecture within a single vertical slice

### Naming Conventions

- Use descriptive names for classes, variables, functions, etc.

#### Files

- Files containing a single class, type, or interface should be named using PascalCase 
  - Example: `WeatherService.ts`
- Files containing multiple functions, types, or interfaces should be named using camelCase
  - Example: `stringUtils.ts`

#### Components

- Use nouns for types
  - Examples: `Reader`, `Formatter`, `Vehicle`
- Use adjectives for capabilities
  - Examples: `Disposable`, `Runnable`, `Printable`

## Testing

- Aim for 100% coverage with exclusions where acceptable
- Co-locate tests with files in a `tests` folder

## Research

- Write all research docs to `docs/research`
