# Overview

Mobile app to view GitHub account information and repositories.

## Features

- Sign in with GitHub using OAuth2 flow
- Access GitHub API with obtained access token
- View your profile information
- View your repositories
- Sign out and return to login screen

Authorization uses Supabase for secure OAuth2 flow. This app has a registered GitHub OAuth App and users authorize to it.

## Technologies

- TypeScript
- React Native
- Supabase
- GitHub API
- Octokit GitHub API client
- Expo secure store (encrypted key-value pairs)
- Gluestack UI components
- OAuth2
