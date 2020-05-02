import RepositoryBaseView from 'Views/repositoryBaseView';
import template from 'Components/news/news.pug';
import { NEWS } from 'Modules/events';


export default class RepNewsView extends RepositoryBaseView {
    constructor(root, eventBus) {
        super(root, template, eventBus);

    }

    hide() {
        this.eventBus.off(NEWS.render, this._onRender.bind(this));
        super.hide();
    }

    render() {
        this.eventBus.on(NEWS.render, this._onRender.bind(this));

        this.eventBus.emit(NEWS.getInfo, {});
    }

    _onRender(data) {
        super.render(data);
    }
}
