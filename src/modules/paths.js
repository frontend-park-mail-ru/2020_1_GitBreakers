const paths = {
  profileSettings: '/settings',
  mewRepository: '/new',
  main: /^\/$/,
  signup: /^\/signup$/i,
  signin: /^\/signin$/i,
  newRepository: /^\/new$/i,
  profile: /^\/profile\/[\w-_]+$/,
  userRepositories: /^\/[\w-_]+\?tab=repositories$/i,
  userSettings: /^\/[\w-_]+\?tab=settings$/i,
  repositorySettings: /^\/[\w-_]+\/[\w-_]+\/settings$/i,

  commits: /^\/[\w-_]+\/[\w-_]+\/commits\/[\w-_]+$/i,
  repository: /^\/[\w-_]+\/[\w-_]+$/,
  branch: /^\/[\w-_]+\/[\w-_]+\/branch(\/([\w-_]+))+$/i,
  repositoryBranches: /^\/[\w-_]+\/[\w-_]+\/branches$/i,
  fileView: /^\/[\w-_]+\/[\w-_]+\/file(\/([\w-_.]+))+$/i,

  upload: /^\/[\w-_]+\/[\w-_]+\/upload\/[\w-_]+$/i,
};

export default paths;
