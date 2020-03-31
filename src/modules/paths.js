const paths = {
  main: /^\/$/,
  signup: /^\/signup$/i,
  signin: /^\/signin$/i,
  new_repository: /^\/new$/i,
  profile: /^\/[\w-_]+$/,
  user_repositories: /^\/[\w-_]+\?tab=repositories$/i,
  user_settings: /^\/[\w-_]+\?tab=settings$/i,
  repository_settings: /^\/[\w-_]+\/[\w-_]+\/settings$/i,
  commits: /^\/[\w_]+-[\w_]+-commits-[\w_]+$/i,
  repository: /^\/[\w_]+-[\w_]+$/,
  branch: /^\/[\w_]+-[\w_]+-branch-[\w_]+$/i,
  repository_branches: /^\/[\w_]+-[\w_]+-branches$/i,

  // repository: /^\/[\w-_]+\/[\w-_]+$/,
  // branch: /^\/[\w-_]+\/[\w-_]+\/branch\/[\w-_]+$/i,
  // repository_branches: /^\/[\w-_]+\/[\w-_]+\/branches$/i,
  // commits: /^\/[\w-_]+\/[\w-_]+\/commits\/[\w-_]+$/i,
};

export default paths;
