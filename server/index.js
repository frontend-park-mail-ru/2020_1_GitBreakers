
const express = require('express');
const fallback = require('express-history-api-fallback');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const opn = require('opn');

const app = express();
const rootPath = path.resolve(__dirname, '..', 'src');

//= ===========================================================


const branchCommits = {
  iv_master: { // ветка
    commits: {
      a1a1: {
        title: 'firstcommit',
        author: 'IvanProba',
        date: 'December, 1',
      },
      b2b2: {
        title: 'secondcommit',
        author: 'IvanProba',
        date: 'December, 2',
      },
    },

  },

  sh_master: {
    commits: {
      c3c3: {
        title: 'changenumber1',
        author: 'User2',
        date: 'December, 1',
      },
      d4d4: {
        title: 'changenumber1',
        author: 'Friend',
        date: 'December, 1',
      },
      e5e5: {
        title: 'changenumber3',
        author: 'User2',
        date: 'January, 15',
      },
    },
  },
};

const branches = {
  IvanProba_11111: {
    master: {
      branchName: 'Master',
      updateDate: 'December 1',
    },
    branch2: {
      branchName: 'branch2',
      updateDate: 'December 6',
    },
  },

  User2_22222: {
    master: {
      branchName: 'master',
      updateDate: 'May, 5',
    },
  },
};


//= ========================================


app.use(morgan('dev'));
app.use(express.static(rootPath));
app.use(body.json());
app.use(cookie());


app.get('/IvanProba_Repa1_branches', (req, res) => {
  res.json(branches.IvanProba_11111);
});

app.get('/IvanProba_Repa1_branch_master', (req, res) => {
  const data = {
    folders: {
      folder: {
        title: 'folder',
        commit: 'Add something',
        update: 'today',
      },
      fff2: {
        title: 'fff2',
        commit: 'Delete something',
        update: 'yesterday',
      },
    },
    files: {
      faaa: {
        title: 'faaa',
        commit: 'Add something',
        update: '1 minute ago',
      },
      fbbb: {
        title: 'fbbb',
        commit: 'Delete something',
        update: 'yesterday',
      },
    },
    info: 'info about master Ivan',
  };
  res.json(data);
});

app.get('/IvanProba_Repa1_branch_dev', (req, res) => {
  const data = {
    folders: {
      ffaa: {
        title: 'ffaa',
        commit: 'Add something',
        update: 'today',
      },
      ffbb: {
        title: 'ffbb',
        commit: 'Delete something',
        update: 'yesterday',
      },
    },
    files: {},
    info: 'info about dev Ivan',
  };
  res.json(data);
});

app.get('/IvanProba_Repa1_branch_master_folder', (req, res) => {
  const data = {
    folders: {
      aaaaaaa: {
        title: 'aaaaaaa',
        commit: 'Add something',
        update: 'today',
      },
    },
    files: {
      f1: {
        title: 'f1',
        commit: 'Add something',
        update: '1 minute ago',
      },
      f2: {
        title: 'f2',
        commit: 'Delete something',
        update: 'yesterday',
      },
      f3: {
        title: 'f3',
        commit: 'Delete something',
        update: 'now',
      },
    },
    info: 'info about master/folder Ivan',
  };
  res.json(data);
});

app.get('/IvanProba_Repa1_branch_master_folder-aaaaaaa', (req, res) => {
  const data = {
    folders: {},
    files: {},
    info: {},
  };
  res.json(data);
});

app.get('/IvanProba_Repa1_commits_master', (req, res) => {
  res.json(branchCommits.iv_master);
});

app.get('/User2_Repa2_commits_master', (req, res) => {
  res.json(branchCommits.sh_master);
});


app.use(fallback('index.html', { root: rootPath }));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
  opn('http://localhost:3000/index.html');
});
