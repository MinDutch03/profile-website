# Profile Website

A comprehensive personal portfolio website built with Express.js, TypeScript, MongoDB, and Pug templates. This application allows you to showcase your projects and achievements with a clean, responsive interface and a fully functional REST API.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Frontend Views](#frontend-views)
- [Customization](#customization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive Design**: Clean, modern interface that works on desktop, tablet, and mobile devices
- **Project Portfolio**: Create, view, update, and delete projects
- **Achievement Tracking**: Record and display your personal or professional achievements
- **Dual Interface**: Browser-friendly HTML views and API endpoints for programmatic access
- **MongoDB Integration**: Persistent data storage with MongoDB
- **RESTful API**: Full CRUD operations for both projects and achievements
- **Content Negotiation**: Serves HTML or JSON based on request type

## Technology Stack

- **Backend**:
  - Node.js (v14+)
  - Express.js (web framework)
  - TypeScript (type-safe JavaScript)
  - Mongoose (MongoDB ODM)
  
- **Frontend**:
  - Pug (template engine)
  - CSS (styling)
  - JavaScript (client-side functionality)
  
- **Database**:
  - MongoDB (document database)
  
- **Development Tools**:
  - Yarn (package manager)
  - ts-node (TypeScript execution)
  - Morgan (HTTP request logger)

## Project Structure

```
profile-website/
├── src/                           # Source code directory
│   ├── config/                    # Configuration files
│   │   └── db.ts                  # MongoDB connection setup
│   │
│   ├── controllers/               # Request handlers
│   │   ├── projectController.ts   # Project CRUD operations
│   │   └── achievementController.ts # Achievement CRUD operations
│   │
│   ├── middleware/                # Express middleware
│   │   ├── errorHandler.ts        # Error handling middleware
│   │   └── logger.ts              # Request logging middleware
│   │
│   ├── models/                    # Database models
│   │   ├── project.ts             # Project schema and model
│   │   └── achievement.ts         # Achievement schema and model
│   │
│   ├── routes/                    # API routes
│   │   ├── index.ts               # Main/landing page routes
│   │   ├── projects.ts            # Project routes
│   │   └── achievements.ts        # Achievement routes
│   │
│   ├── views/                     # Pug templates
│   │   ├── layout.pug             # Main layout template
│   │   ├── index.pug              # Home page
│   │   ├── projects.pug           # Projects listing
│   │   ├── projectDetail.pug      # Project details
│   │   ├── achievements.pug       # Achievements listing
│   │   ├── achievementDetail.pug  # Achievement details
│   │   └── error.pug              # Error page
│   │
│   └── index.ts                   # Application entry point
│
├── public/                        # Static assets
│   ├── css/                       # Stylesheets
│   │   └── style.css              # Main CSS file
│   │
│   ├── js/                        # Client-side JavaScript
│   │   └── main.js                # Main JavaScript file
│   │
│   └── images/                    # Image assets
│
├── node_modules/                  # Dependencies (generated)
├── dist/                          # Compiled TypeScript (generated)
├── .env                           # Environment variables (create this)
├── .gitignore                     # Git ignore file
├── package.json                   # Project metadata and dependencies
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or newer)
- **Yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (optional, for version control)

## Installation

1. **Clone the repository** (or download and extract the ZIP file):
   ```bash
   git clone https://github.com/yourusername/profile-website.git
   cd profile-website
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Create environment file**:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/profile-website
   NODE_ENV=development
   ```

## Configuration

### Database Configuration

The application is set up to connect to MongoDB. You can configure the connection in `src/config/db.ts`.

The default connection string is:
```
mongodb://localhost:27017/profile-website
```

If you're using MongoDB Atlas or another hosted MongoDB service, update the URI in your `.env` file:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/profile-website
```

### Port Configuration

By default, the application runs on port 8000. You can change this in your `.env` file:
```
PORT=3000
```

## Running the Application

### Development Mode

To run the application in development mode with live reloading:

```bash
yarn dev
```

The server will start at `http://localhost:8000` (or whatever port you configured).

### Production Build

To build and run the application for production:

```bash
# Build TypeScript to JavaScript
yarn build

# Start the production server
yarn start
```

## API Documentation

The application provides a RESTful API for projects and achievements.

### Project Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/projects` | List all projects | N/A | JSON array of projects |
| GET | `/projects/:id` | Get project details | N/A | JSON object with project details |
| POST | `/projects` | Create a new project | Project data | JSON with created project |
| PUT | `/projects/:id` | Update a project | Updated project data | JSON with updated project |
| DELETE | `/projects/:id` | Delete a project | N/A | JSON with success message |

### Achievement Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/achievements` | List all achievements | N/A | JSON array of achievements |
| GET | `/achievements/:id` | Get achievement details | N/A | JSON object with achievement details |
| POST | `/achievements` | Create a new achievement | Achievement data | JSON with created achievement |
| PUT | `/achievements/:id` | Update an achievement | Updated achievement data | JSON with updated achievement |
| DELETE | `/achievements/:id` | Delete an achievement | N/A | JSON with success message |

### Content Negotiation

The API supports content negotiation:
- Requests from browsers will receive HTML responses
- Requests with `Accept: application/json` header will receive JSON responses
- Requests from Postman will receive JSON responses

### Example Requests

#### Create a Project

```
POST /projects
Content-Type: application/json

{
  "title": "My Awesome Project",
  "description": "This is a description of my awesome project",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "technologies": ["JavaScript", "Express", "MongoDB"],
  "projectUrl": "https://github.com/username/awesome-project"
}
```

#### Create an Achievement

```
POST /achievements
Content-Type: application/json

{
  "title": "Certification Completed",
  "description": "Completed the full-stack web development certification",
  "dateAchieved": "2023-06-15",
  "timeOfAchievement": "14:30"
}
```

## Database Models

### Project Model

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| title | String | Project title | Yes |
| description | String | Detailed description | Yes |
| startDate | Date | Project start date | Yes |
| endDate | Date | Project end date | No |
| technologies | [String] | Technologies used | No |
| projectUrl | String | Link to the project | No |
| createdAt | Date | Record creation timestamp | Auto |
| updatedAt | Date | Record update timestamp | Auto |

### Achievement Model

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| title | String | Achievement title | Yes |
| description | String | Detailed description | Yes |
| dateAchieved | Date | Date of achievement | Yes |
| timeOfAchievement | String | Time of achievement | Yes |
| createdAt | Date | Record creation timestamp | Auto |
| updatedAt | Date | Record update timestamp | Auto |

## Frontend Views

The application provides the following views for browser access:

- **Home Page**: Displays recent projects and achievements
- **Projects List**: Shows all projects with brief details
- **Project Detail**: Shows complete information about a specific project
- **Achievements List**: Shows all achievements with brief details
- **Achievement Detail**: Shows complete information about a specific achievement
- **Error Page**: Displayed when errors occur

## Customization

### Styling

You can customize the application's appearance by modifying:
- `public/css/style.css` for site-wide styling
- Individual Pug templates in the `src/views` directory

### Adding New Features

To add new features:
1. Create new model(s) in `src/models/`
2. Create new controller(s) in `src/controllers/`
3. Create new route file(s) in `src/routes/`
4. Add the routes to `src/index.ts`
5. Create new view templates in `src/views/`

## Testing

### API Testing with Postman

1. **Install [Postman](https://www.postman.com/downloads/)**
2. **Set up a new request**:
   - Method: Choose appropriate HTTP method
   - URL: Enter the endpoint URL
   - Headers: Add `Accept: application/json`
   - Body: For POST/PUT, select "raw" and "JSON" and enter your data

3. **Send the request** and check the response

### UI Testing

Test the website through your browser by accessing:
- `http://localhost:8000` for the home page
- `http://localhost:8000/projects` for the projects list
- `http://localhost:8000/achievements` for the achievements list

## Deployment

### Deploying to Heroku

1. **Create a Heroku account** and install the Heroku CLI
2. **Create a new Heroku app**:
   ```bash
   heroku create your-app-name
   ```
3. **Set up environment variables**:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   ```
4. **Deploy the application**:
   ```bash
   git push heroku main
   ```

### Deploying to DigitalOcean, AWS, or Other Platforms

The application can be deployed to any platform that supports Node.js. Consult the platform's documentation for specific deployment instructions.

## Troubleshooting

### Common Issues

#### Database Connection Issues
- Ensure MongoDB is running
- Check your connection string in the `.env` file
- Look for errors in the server logs

#### API Returns HTML Instead of JSON
- Make sure to include the `Accept: application/json` header
- For Postman, verify the headers are correctly set

#### Server Won't Start
- Check for port conflicts
- Ensure all dependencies are installed
- Look for syntax errors in the code

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add an amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.