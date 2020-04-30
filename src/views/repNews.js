import RepositoryBaseView from 'Views/repositoryBaseView';
import template from 'Components/news/news.pug';
import { NEWS } from 'Modules/events';


export default class RepNewsView extends RepositoryBaseView {
    constructor(root, eventBus) {
        super(root, template, eventBus);

        this.eventBus.on(NEWS.render, this._onRender.bind(this));
    }

    render() {
        this.eventBus.emit(NEWS.getInfo, {});
    }

    _onRender(data) {
        super.render(data);
    }
}