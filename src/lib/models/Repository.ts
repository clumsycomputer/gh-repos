export interface Repository {
  id: string
  fullName: string
  name: string
  description: string
  homepageUrl: string | null
  starCount: number
  forkCount: number
  openIssuesCount: number
  language: string | null
  license: string | null
  createdAt: string
  pushedAt: string
  ownerName: string
  ownerAvatarUrl: string
}
