# Project Title

A brief description of what this project does and who it's for.

## Description

Provide a more detailed introduction to the project including its functionality, the technologies it uses, and the motivation behind it. This section can also include screenshots or other media to help understand the project better.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

node.js
npm or yarn


### Installing

A step by step series of examples that tell you how to get a development environment running.

Clone the repository:

Navigate to the project directory:

### Install dependencies:

npm install or yarn install

### Start the development server:

npm start or yarn start


Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

## Usage

Instructions on how to use the app, including any configurations necessary to get the full functionality.

## Authors

* **Pylypenko Vasyl** - *Initial work* - (https://github.com/SoulOfDarknes)

## License

This project is licensed under the [MIT License](LICENSE.md) - see the file for details.

## Configuration

Before starting the project, you need to configure the environment variables required for the application to run properly.

### Environment Variables

This project uses environment variables for configuration. To set up your environment variables:

1. Rename the `.env.example` file to `.env` in the root directory of the project.
   
   cp .env.example .env

   
2. Open the `.env` file and fill in the variables with your own values. The `.env.example` file includes a list of all the necessary environment variables with example values or placeholders. For instance:


3. Make sure not to commit your `.env` file to version control. This file contains sensitive information and should be kept private. The `.gitignore` file in this project is already set up to exclude `.env`.

### Important Note on `.env` Files

- Environment variables defined in the `.env` file will be statically included in the build when you compile your project. Therefore, you need to set the environment variables before building your project.
- If you change any environment variables after starting your development server, you will need to restart the server to reflect those changes.

