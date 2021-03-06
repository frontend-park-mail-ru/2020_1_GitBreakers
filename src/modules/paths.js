/** Regular expressions for routing */
const paths = {
  profileSettings: /^\/settings$/i,
  newRepository: /^\/new$/i,
  search: /^\/search\/[\w-_]+(|\/[\w-_]+)$/i,
  main: /^\/$/,
  signup: /^\/signup$/i,
  signin: /^\/signin$/i,
  profile: /^\/profile\/[\w-_]+$/,
  stars: /^\/profile\/[\w-_]+\/stars$/,
  repositorySettings: /^\/[\w-_]+\/[\w-_]+\/settings$/i,

  news: /^\/[\w-_]+\/[\w-_]+\/news$/i,
  issues: /^\/[\w-_]+\/[\w-_]+\/issues$/i,
  commits: /^\/[\w-_]+\/[\w-_]+\/commits\/[\w-_]+$/i,
  repository: /^\/[\w-_]+\/[\w-_]+$/,
  repoStars: /^\/[\w-_]+\/[\w-_]+\/stargazers$/,
  branch: /^\/[\w-_]+\/[\w-_]+\/branch(\/([\w-_.]+))+$/i,
  repositoryBranches: /^\/[\w-_]+\/[\w-_]+\/branches$/i,
  fileView: /^\/[\w-_]+\/[\w-_]+\/file(\/([\w-_.]+))+$/i,

  pullRequest: /^\/user\/[\w-_]+\/pull_requests$/i,
  pullRequestTo: /^\/user\/[\w-_]+\/pull_requests\/to$/i,
  pullRequestFrom: /^\/user\/[\w-_]+\/pull_requests\/from$/i,
  newPullRequest: /^\/user\/[\w-_]+\/pull_requests\/repository\/[\w-_]+\/new$/i,
  onePullRequest: /^\/user\/[\w-_]+\/pull_request\/[\d]+$/i,

  upload: /^\/[\w-_]+\/[\w-_]+\/upload\/[\w-_]+$/i,
};

export default paths;
