export interface UserInfo {
    id: number,
    login: string,
    name: string,
    avatarUrl: string,
    createdAt: Date,
    followers: number,
    following: number,
    publicRepos: number,
}