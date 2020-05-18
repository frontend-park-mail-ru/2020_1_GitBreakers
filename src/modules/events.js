export const ACTIONS = {
  redirect: 'redirect',
  loadWhoAmI: 'loadWhoAmI',
  loadWhoAmIFinish: 'load Who am I finish',
  offline: 'offline',
};

export const SIGNUP = {
  submit: 'Submit : SignUp',
  valid: 'Valid : SignUp',
  success: 'Success : SignUp',
  fail: 'Fail : SignUp',
};

export const SIGNIN = {
  submit: 'Submit : SignIn',
  valid: 'Valid : SignIn',
  success: 'Success : SignIn',
  fail: 'Fail : SignIn',
  nextPage: 'nextPage : SignIn',
};

export const HEADER = {
  render: 'Render: Header',
  redirect: 'Redirect : header',
  load: 'Load: Header',
  logout: 'Logout: Header',
};

export const PROFILE = {
  load: 'load: Profile',
  render: 'render: Profile',
  loadSuccess: 'loadSuccess : Profile',
  loadFail: 'loadFail : Profile',
  nextPage: 'nextPage : Profile',
};

export const STARS = {
  load: 'load: Stars',
  render: 'render: Stars',
  loadSuccess: 'loadSuccess : Stars',
  deleteStar: 'delete star: Star',
  deleteStarSuccess: 'delete star Success: star',
  loadFail: 'loadFail : Stars',
  nextPage: 'nextPage : Stars',
};

export const SETTINGS = {
  submitAvatar: 'submitAvatar: Settings',
  submitProfile: 'submitProfile: Setting',
  submitPassword: 'submitPassword: Settings',
  changeAvatar: 'ChangeAvatar: Settings',
  passwordFail: 'passwordFail: settings',
  avatarFail: 'avatarFail: Settings',
  profileFail: 'profileFail: Settings',
  render: 'Render: Settings',
  load: 'loadProfile : Settings',
};

export const NEWREPOSITORY = {
  submit: 'submit: NewRepository',
  fail: 'fail: NewRepository',
};


export const UPLOAD = {
  notFound: 'PageNotFound',
  changePath: 'ChangePath',
};

export const TREEPAGE = {
  getBranchList: 'FileTree : Get branch list',
  getFiles: 'FileTree : Get files',
  render: 'FileTree : Render',
};

export const BRANCHESPAGE = {
  getBranchList: 'Branches : Get branch list',
  render: 'Branches : Render',
};

export const COMMITSPAGE = {
  getBranchList: 'Commits : Get branch list',
  getCommitList: 'Commits : Set commits',
  render: 'Commits : Render',
};

export const NEWBRANCH = {
  submit: 'Submit : NewBranch',
  valid: 'Valid : NewBranch',
  success: 'Success : NewBranch',
  fail: 'Fail : NewBranch',
};

export const DELETEBRANCH = {
  delete: 'Delete : DeleteBranch',
  success: 'Success : DeleteBranch',
  fail: 'Fail : DeleteBranch',
};

export const FILEVIEW = {
  loadFile: 'FileView : LoadFile',
  loadSuccess: 'FileView : LoadSuccess',
  render: 'FileView : Render',
};

export const REPOSITORY = {
  getInfo: 'Repository : Get info',
  updateStar: 'update Stars: Repository',
  updatedStar: 'updated Stars: Repository',
  loadStars: 'load Stars: Repository',
  loadStarsSuccess: 'load Stars Success: Repository',
  fork: 'fork : Repository',
};

export const ISSUES = {
  getIssueList: 'Issues : Get issue list',
  render: 'Issues : Render',
  submitNewIssue: 'Issues : Submit',
  createSuccess: 'Issues : Created',
  showMessage: 'Issues : Show message',
  submitUpdateIssue: 'Issues : Update issue',
  deleteIssue: 'Issues : Delete issue',
};

export const REPSTARS = {
  load: 'load : rep stars',
  render: 'render : rep stars',
};

export const NEWS = {
  getInfo: 'News: get info',
  render: 'News : render',
  getNewsList: 'News : Get news list',
}

export const SEARCH = {
  reload: 'Reload: search',
  loadPage: 'loadPage : Search',
  loadPageSuccess: 'loadPageSucces: Search',
  submitSearch: 'Submit Search: Search',
  submitSearchSuccess: 'Submit Search Success: Search',
}

export const PULLREQUEST = {
  render: 'Pull requests : render',
  getRequestsList : 'Pull requests : get requests list',
  getBranchList: 'Pull requests : get branch list',
  submitNewRequest: 'Pull requests : submit',
  showMessage: 'Pull requests : message',
  delete: 'Pull requests : delete',
  accept: 'Pull requests : accept',
}
