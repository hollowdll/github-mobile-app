# Overview

Mobile app to view GitHub account information and repositories.

![Login screen](docs/login.JPG)

## Features

- Sign in with GitHub using OAuth2 flow
- Access GitHub API with obtained access token
- View profile information
- View repositories
- Sign out and return to login screen

Authorization uses Supabase for secure OAuth2 flow. This app has a registered GitHub OAuth App and users authorize to it.

When user has signed in, the GitHub API access token gets saved to the device as encrypted key-value pair. GitHub API requests then obtain this saved token, decrypt it, and include it in the request.

## Technologies

- TypeScript
- React Native
- Supabase (OAuth2 authorization)
- GitHub API (fetch user and repository data)
- Octokit GitHub API client (make network requests to GitHub API)
- Expo secure store (encrypted key-value pairs)
- Gluestack UI components
- React Native Elements components
