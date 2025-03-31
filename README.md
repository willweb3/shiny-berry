### Bolttedex

MVP for a Pokémon data page using PokeAPI.

![Demo](demo.gif)

## Tech Stack

- **Backend**: Node.js, Express.js, Redis
- **Frontend**: React.js
- **Testing**: Mocha, Chai, Jest, Testing Library

## Dependencies

### Backend

- `express`: Web framework for Node.js
- `axios`: HTTP client for API requests
- `redis`: Caching layer for improved performance
- `chai` and `chai-http`: Assertion library for testing
- `mocha`: Test framework

### Frontend

- `react`: UI library
- `react-dom`: React rendering
- `axios`: HTTP client for API requests
- `react-infinite-scroll-component`: Infinite scrolling
- `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`: Testing utilities
- `jest`: Test framework

## How to Run the Project

This project requires three terminals to run:

1. **Start Redis**:
   redis-server

2. **Start Backend API**:
   cd api
   npm install
   npm start

3. **Start Frontend Client**:
   cd client
   npm install
   npm start

## You can Run the tests

1. **Backend Tests (mocha/chai)**:
   cd api
   npm test

1. **Fronend Tests (jest)**:
   cd client
   npm test

### Author

Willian Almeida
Thank you for reviewing!
