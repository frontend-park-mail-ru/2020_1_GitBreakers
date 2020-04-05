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

  commits: /^\/[\w_]+-[\w_]+-commits-[\w_]+$/i,
  repository: /^\/[\w_]+-[\w_]+$/,
  branch: /^\/[\w_]+-[\w_]+-branch(-([\w_]+))+$/i,
  repositoryBranches: /^\/[\w_]+-[\w_]+-branches$/i,

  upload: /^\/[\w_]+-[\w_]+-upload-[\w_]+$/i,
  fileView: /^\/[\w_]+-[\w_]+-file(-([\w_.]+))+$/i,

  // repository: /^\/[\w-_]+\/[\w-_]+$/,
  // branch: /^\/[\w-_]+\/[\w-_]+\/branch\/[\w-_]+$/i,
  // repositoryBranches: /^\/[\w-_]+\/[\w-_]+\/branches$/i,
  // commits: /^\/[\w-_]+\/[\w-_]+\/commits\/[\w-_]+$/i,
};

export default paths;
