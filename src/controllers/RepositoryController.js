import Controller from '../modules/controller.js';
import RepositoryModel from "../models/repositoryModel.js";

export default class RepositoryController extends Controller {
    constructor(root, eventBus, router) {
        super(root, eventBus, router);

        this.root = root;
        this.content = {
            repository: null,
            branch: null,
        };
        this.repositoryModel = new RepositoryModel(this.root, eventBus);
        this.eventBus.on ('NotFound', ((msg)=>{console.log(msg); this.eventBus.emit("Change path", "/404")})); //показать 404.html
    }


    setRepositoryName() { //достать имя репозитория (юзер+название) из урла
        const path = window.location.pathname;
        const reg = /[\w_]+/g; //const reg = /[\w_-]+/g;

        this.author = path.match(reg)[0];
        this.repository = path.match(reg)[1];
        this.repositoryName = `${this.author}_${this.repository}`; //this.repName = `${user}/${repository}`;
    }

   /* loadRepositoryFileTree() {
        return this.repositoryModel.getRepository(this.repositoryName)
            .then((res) => {
                if (res.error) {
                    console.log(res.error);
                    return;
                }
                return res;
            }, () => {
                //console.log("something wrong with json");
                this.eventBus.emit('NotFound', "rep not found");
            });
    }*/


    setBranchName(){
        const path = window.location.pathname;

        if (path.match(/^\/[\w_]+-[\w_]+$/)) //fix /^\/[\w-_]+\/[\w-_]+$/
        {
            this.branchName = "master";
            return;
        }
        const reg = /(?<=-(branch|commits)-)[\w_]+/; // /(?<=\/branch\/)[\w_-]+/;
        this.branchName = path.match(reg)[0];
    }

    loadBranch() {
        return this.repositoryModel.getBranch(this.repositoryName, this.branchName)
            .then((res) => {
                if (res.error) {
                    console.log(res.error);
                    return;
                }
                return res;
            }, () => {
                this.eventBus.emit('NotFound', "branch not found");
            });
    }

    loadBranchList() {
        return this.repositoryModel.getBranchList(this.repositoryName)
            .then((res) => {
                if (res.error) {
                    console.log(res.error);
                    return;
                }
                return res;
            }, () => {
                this.eventBus.emit('NotFound', "branchlist not found");
            });

    }

    loadCommitList() {
        return this.repositoryModel.getCommitList(this.repositoryName, this.branchName)
            .then((res) => {
                if (res.error) {
                    console.log(res.error);
                    return;
                }
                return res;
            }, () => {
                //console.log("something wrong with json");
                this.eventBus.emit('NotFound', "commits not found");
            });
    }

    open(data) {
        super.open(data);
    }
}

