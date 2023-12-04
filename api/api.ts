import { Octokit } from "@octokit/core";
import * as storage from "../storage/storage";
import { UserInfo } from "../types/user";
import { Repository } from "../types/repository";
import {
  GITHUB_API_VERSION,
  NO_PROVIDER_TOKEN_MSG,
  REPOS_PER_PAGE
} from "../utility/const"

const constructOctokit = async () => {
  const providerToken = await storage.getEncryptedItem(storage.githubProviderToken);
  if (providerToken === undefined) {
    throw Error(NO_PROVIDER_TOKEN_MSG);
  }

  return new Octokit({
    auth: providerToken
  })
}

// Sends GET request to GitHub API to get user info.
export const getUserInfo = async () => {
  const octokit = await constructOctokit();

  try {
    const response = await octokit.request('GET /user', {
      headers: {
        'X-GitHub-Api-Version': GITHUB_API_VERSION
      }
    });
    // console.log(response);

    return {
      id: response.data.id,
      login: response.data.login,
      name: response.data.name,
      avatarUrl: response.data.avatar_url,
      createdAt: new Date(response.data.created_at),
    } as UserInfo;

  } catch (err) {
    throw err;
  }
}

// Sends GET request to GitHub API to get user repositories by page number.
export const getUserRepositories = async (username: string, page: number) => {
  const octokit = await constructOctokit();
  const queryParams = {
    page: page,
    per_page: REPOS_PER_PAGE,
  };

  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username: username,
      ...queryParams,
      headers: {
        'X-GitHub-Api-Version': GITHUB_API_VERSION
      }
    });
    // console.log(response);

    return response.data.map(item => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        createdAt: new Date(item.created_at ?? ""),
        language: item.language,
      } as Repository
    });

  } catch (err) {
    throw err;
  }
}