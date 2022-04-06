# Superfic Frontend

## Pre Setup

1. [Install Node.js](https://nodejs.org/en/download/)

2. [Install Yarn](https://yarnpkg.com/en/docs/install)

3. Rename `.env.local.sample` to `.env.local`, and change the credentials in `.env.local` to your own.

## Local Development

Run `yarn install` to install all dependencies.

### With Docker Compose

> Follow the instructions in the [README.md]() file.

### With Hot Reloading

To hot reload the frontend in development, simply run:

    yarn dev

### View the website

Visit http://localhost:3000/ in your browser.

## Deployment

### To Vercel

1. [Sign in to Vercel](https://vercel.com/login)

2. [Create a new project](https://vercel.com/new)

3. Connect your GitHub repository of this project to the project you created on Vercel.

4. Add new environment variable `NEXT_PUBLIC_BACKEND_URL` to your project, with the URL of the backend application, e.g. `https://superfic-backend.herokuapp.com`.

5. Make any changes to the frontend application.

6. Any push to the `main` branch will automatically deploy the latest version of the frontend application to Vercel.

7. You can then view the website with the URL given by Vercel.

### Live deployment on Vercel

You can find my Vercel deployment of this project [here](https://superfic-frontend.vercel.app/).