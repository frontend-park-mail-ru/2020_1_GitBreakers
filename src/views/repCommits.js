import RepositoryBaseView from "./repositoryBaseView.js";
import template from "../components/commits/commits.pug";

export default class RepCommitsView extends RepositoryBaseView {
    constructor(root, eventBus) {
        super(root, template, eventBus);
    }

    render(data) {
        super.render(data);
    }
}
