const login = 'AntonElagin';

const application = document.getElementById('root');
const headerRoot = document.getElementById('header')

const header = new Header(headerRoot);
header.render();


const routes = {
  profile: createProfile,
  activity: createActivity,
  updateProfile: createUpdateProfile,
  profilePage: createProfilePage,
  loadImage: loadImage,
  loadUpdateProfile: loadUpdateProfile,
};


application.addEventListener('click', (evt) => {
  const {target} = evt;

  if (typeof (target.dataset.setction) === 'function') {


    if (target instanceof HTMLAnchorElement) {
      evt.preventDefault();
      routes[target.dataset.section]();
    }
    if (target instanceof HTMLButtonElement) {
      evt.preventDefault();
      routes[target.dataset.section]();
    }
  }
});

createProfilePage(login);
const root = document.getElementById("root");
const newRepoLink = document.createElement("a");
newRepoLink.innerText = "Create new repository!";
newRepoLink.style.color = "red";
newRepoLink.href = "newRepoPage";
root.appendChild(newRepoLink);
newRepoLink.addEventListener('click', function (e) {
  e.preventDefault();
  const form = document.createElement('form');

  const repositoryInput = createInput('text', 'Repository name', 'name');
  const descriptionInput = createInput('text', 'Description', 'description');
  const radioInput = document.createElement('div');
  const privateInput = createInput('radio', 'private', 'private');
  const publicInput = createInput('radio', 'public', 'private');
  const readmeDivInput = document.createElement('div');
  const readmeInput = createInput('checkbox', 'Initialize with a readme', 'readme');

  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'Create repo!';


  radioInput.innerText = "choice type of repository(left public, right private) ";
  publicInput.checked = true;
  radioInput.appendChild(publicInput);
  radioInput.appendChild(privateInput);


  readmeDivInput.innerText = "Initialize with readme";
  readmeDivInput.appendChild(readmeInput);

  form.appendChild(repositoryInput);
  form.appendChild(descriptionInput);
  form.appendChild(radioInput);
  form.appendChild(readmeDivInput);
  form.appendChild(submitBtn);
  root.appendChild(form);

  // repositoryForm.render();
  function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    let formData = {};
    formData["name"] = form.elements["name"].value;
    formData["description"] = form.elements["description"].value;
    formData["private"] = form.elements["private"].checked;
    formData["readme"] = form.elements["readme"].checked;


    fetch('http://localhost:8080/new/repository', {
      method: 'POST',
      body:
        JSON.stringify(formData)
    })
      .then((res) => res.json()).then((res) => {
      alert("добавлено");
    })
      .catch((err) => {
        alert(err);
      });
  };
});

