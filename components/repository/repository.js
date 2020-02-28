export class Repository {

    constructor(parent = document.body) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = 'Repository creation form';
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
        this.parent.appendChild(form);

        form.onsubmit = async (e) => {
            e.preventDefault();
            let formData = {};
            formData["name"]=form.elements["name"].value;
            formData["description"]=form.elements["description"].value;
            formData["private"]=form.elements["private"].checked;
            formData["readme"]=form.elements["readme"].checked;
            // let jsonObject = {};
            //
            // for (const [key, value] of formData.entries()) {
            //     jsonObject[key] = value
            // }

            fetch('http://89.208.198.186:8080/new/repository', {
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
        }
        ;
    }


}

function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

