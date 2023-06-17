export class GitlabError extends Error {
  status: string | number
  constructor(message: string, status: string | number) {
    super(message)
    this.name = "GitlabError"
    this.status = status
  }
}
