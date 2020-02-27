import {Header} from './components/header/header.js';
import {Footer} from "./components/footer/footer.js";
import {Repository} from "./components/repository/repository.js";

const application = document.getElementById('application');

const header = new Header(application);
//header.userData = "smth";
header.render();

const section = document.createElement("div");
section.className = "section";
application.appendChild(section);

const footer = new Footer(application);
footer.render();

//-----------------------------------------------------

const repositoryForm = new Repository(section);

const newRepoLink = document.createElement("a");
newRepoLink.innerText = "Create new repository!";
newRepoLink.style.color = "red";
newRepoLink.href = "newRepoPage";
newRepoLink.addEventListener('click', function (e) {
    e.preventDefault();
    repositoryForm.render();

});
section.appendChild(newRepoLink);

