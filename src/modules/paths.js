const paths = {
  profileSettings: /^\/settings$/i,
  newRepository: /^\/new$/i,
  main: /^\/$/,
  signup: /^\/signup$/i,
  signin: /^\/signin$/i,
  profile: /^\/profile\/[\w-_]+$/,
  stars: /^\/profile\/[\w-_]+\/stars$/,
  repositorySettings: /^\/[\w-_]+\/[\w-_]+\/settings$/i,

  issues: /^\/[\w-_]+\/[\w-_]+\/issues$/i,
  news: /^\/[\w-_]+\/[\w-_]+\/news$/i,
  commits: /^\/[\w-_]+\/[\w-_]+\/commits\/[\w-_]+$/i,
  repository: /^\/[\w-_]+\/[\w-_]+$/,
  repoStars: /^\/[\w-_]+\/[\w-_]+\/stargazers$/,
  branch: /^\/[\w-_]+\/[\w-_]+\/branch(\/([\w-_.]+))+$/i,
  repositoryBranches: /^\/[\w-_]+\/[\w-_]+\/branches$/i,
  fileView: /^\/[\w-_]+\/[\w-_]+\/file(\/([\w-_.]+))+$/i,

  upload: /^\/[\w-_]+\/[\w-_]+\/upload\/[\w-_]+$/i,
};

export default paths;
