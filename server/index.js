
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

const repositories = {
  IvanProba_11111: {
    title: 'Название репы 11111',
  },
  User2_22222: {
    title: 'Название репы 22222',
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


app.get('/IvanProba_Repa1', (req, res) => { // получить информацию по репозиторию
  res.json(repositories.IvanProba_11111);
});
app.get('/User2_Repa2', (req, res) => {
  res.json(repositories.User2_22222);
});//-----------------------------------------------------

app.get('/IvanProba_Repa1_branches', (req, res) => {
  res.json(branches.IvanProba_11111); // вернёт ветки указанной репы
});
//--------------------------------------------------------
app.get('/IvanProba_Repa1_branch_master', (req, res) => {
  res.json('инфа по ветке ивана Мастер');
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
