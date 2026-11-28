# AGENTS.md

## Development Principals

- Prefer simplicity and readability
- Avoid creation premature abstractions
- Limit functions and classes to a single responsibility
- Reuse existing functionality
- Identify root causes instead of symptoms when addressing bugs

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
- Nest utility functions under a `utils` folder and group by likeness

#### Components

- Use nouns for types
  - Examples: `Reader`, `Formatter`, `Vehicle`
- Use adjectives for capabilities
  - Examples: `Disposable`, `Runnable`, `Printable`

## Typescript Conventions

### DO

- Prefer strong typing
- Avoid unsafe assertions
- Avoid non-null assertions
- Use `const` unless re-assignment is truly necessary
- Use `import type` for type only imports
- Prefer early returns over nested conditionals
- Prefer abstracting over multiple conditionals

### DO NOT

- Suppress typescript errors
- Use `any`; Use `unknown` when type is unknown

## Testing

### DO

- Aim for 100% coverage with justified exclusions
- Co-locate tests in a `tests` folder
- Group tests by function
- Use explicit, minimal, self-contained test data that clearly conveys intent
- Construct test data directly rather than deriving it from other fixtures or using nested object spreads
- Limit tests to a single assertion

### DO NOT 

- Test error messages

## Research

- Write all research docs to `docs/research`
