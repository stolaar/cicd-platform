export interface ICommit {
  id: string
  message: string
  branch: string
  sha: string
  link: string
  author: string
}

export interface IPipelineCard {
  id: string
  name: string
  status: string
  lastCommit: ICommit
}
