# Full-Stack Web Application Template

This project is a template for quickly setting up a full-stack web application with Google Authentication. It's designed to serve as a starting point for hackathons, startup ideas, or MVP development, allowing you to focus on building your core features rather than spending time on initial setup.

## Features

- Backend API built with Node.js and Express
- Frontend service using vanilla JavaScript
- Google Authentication integration
- PostgreSQL database with Sequelize ORM
- Docker setup for easy deployment
- Basic user and note management functionality

## Project Structure

- `backend/`: Contains the Node.js Express server
- `frontend/`: Houses the frontend service
- `docker-compose.yml`: Defines the multi-container Docker application
- `.env_example`: Example environment variables file

## Prerequisites

- Node.js (v14 or later recommended)
- Docker and Docker Compose
- A Google Cloud Platform account for OAuth credentials

## Setup

1. Clone the repository:
   ```
   git clone git@github.com:bkasymov/js-template-repo.git
   cd js-template-repo
   ```

2. Set up environment variables:
   - Copy `.env_example` to `.env`
   - Fill in the necessary values, including your Google OAuth credentials

3. Install dependencies:
   ```
   cd backend && npm install
   cd ../frontend && npm install
   ```

4. Start the application using Docker Compose:
   ```
   docker-compose up --build
   ```

5. Access the application:
   - Frontend: http://localhost:4000
   - Backend API: http://localhost:3000

## Development

- Backend development:
  ```
  cd backend
  npm run dev
  ```

- Frontend development:
  ```
  cd frontend
  npm start
  ```


## API Endpoints

- `GET /auth/google`: Initiates Google OAuth flow
- `GET /auth/status`: Checks authentication status
- `POST /auth/logout`: Logs out the current user
- `GET /users`: Retrieves all users (for demonstration purposes)
- `POST /users`: Creates a new user
- `GET /notes`: Retrieves notes for the authenticated user
- `POST /notes`: Creates a new note for the authenticated user

## Customization

This template provides a basic structure. To build your application:

1. Modify the data models in `backend/models/`
2. Add new routes in `backend/routes/`
3. Enhance the frontend in `frontend/public/`
4. Adjust authentication as needed in `backend/auth.js`

## Deployment

The provided Docker setup can be used for deployment. Ensure you set the appropriate environment variables for production use.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source and available under the [MIT License](LICENSE).