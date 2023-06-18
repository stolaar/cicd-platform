export const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
export const gitlabClientId = process.env.NEXT_PUBLIC_GITLAB_CLIENT_ID

export const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=user:email,repo`

const gitlabRedirectUri =
  process.env.NEXT_PUBLIC_GITLAB_REDIRECT_URI ??
  "http://localhost:3000/settings"
const gitlabAuthScopes = [
  "api",
  "read_api",
  "read_user",
  "read_repository",
  "write_repository",
  "openid",
  "profile",
]
export const gitlabAuthUrl = `https://gitlab.com/oauth/authorize?client_id=${gitlabClientId}&redirect_uri=${gitlabRedirectUri}&response_type=code&scope=${gitlabAuthScopes.join(
  "+",
)}`
