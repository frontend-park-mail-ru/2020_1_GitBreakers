import View from '../modules/view.js';

export default class RepositoryBaseView extends View {
    constructor(root, template, eventBus) {
        super(root, template, eventBus);
    }

    render(data) {
        super.render(data);

        const button_code = document.getElementById("code");
        button_code.addEventListener('click', (event) => {
            event.preventDefault();
            let code_path;
            if (data.branchName === "master") {
                code_path = `/${data.author}-${data.repName}`;
            } else {
                code_path = `/${data.author}-${data.repName}-branch-${data.branchName}`;
            }
            button_code.dataset.section = code_path;
        });

        const button_branches = document.getElementById("branches");
        button_branches.addEventListener('click', (event) => {
            event.preventDefault();
            const branches_path = `/${data.author}-${data.repName}-branches`;
            button_branches.dataset.section = branches_path;
        });

        const button_commits = document.getElementById("commits");
        button_commits.addEventListener('click', (event) => {
            event.preventDefault();
            const commits_path = `/${data.author}-${data.repName}-commits-${data.branchName}`;
            button_commits.dataset.section = commits_path;
        });

    }
}
