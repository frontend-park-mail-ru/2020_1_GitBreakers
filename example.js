import {Header} from './components/header/header.js';
import {Footer} from "./components/footer/footer.js";

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

const page_content = document.createElement("div");
page_content.className = "section__main";
page_content.textContent = "Something very cool";

section.appendChild(page_content);