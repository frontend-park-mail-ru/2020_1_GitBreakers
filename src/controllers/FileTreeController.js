import RepositoryController from "./RepositoryController.js";
import RepFilesView from "../views/repFiles.js";

export default class FileTreeController extends RepositoryController {
    constructor(root, eventBus, router) {
        super(root, eventBus, router);
        this.view = new RepFilesView(root, eventBus);
    }

    open() {
        this.setRepositoryName();
        this.setBranchName();
        this.loadBranch().then((res)=> {
            if (!res) {return;}
            this.content.branch = res;

            const data = {
                author: this.author,
                repName: this.repository,
                branchName: this.branchName,
            };
            super.open(data);
        });
    }
}
