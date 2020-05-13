import RepositoryBaseView from 'Views/repositoryBaseView';
import template from 'Components/news/news.pug';
import { NEWS } from 'Modules/events';

/**
 * Class representing a news page view.
 * @extends RepositoryBaseView
 */
export default class RepNewsView extends RepositoryBaseView {

    /**
     * Initialize template for news page view.
     * @param {HTMLElement} root.
     * @param {EventBus} eventBus.
     */
    constructor(root, eventBus) {
        super(root, template, eventBus);
    }

    /**
     * Load information about news page.
     */
    render() {
        this.eventBusCollector.on(NEWS.render, this._onRender.bind(this));

        this.eventBus.emit(NEWS.getInfo, {});
    }

    /**
     * Render news page.
     * @param {Object} data.
     * @private
     */
    _onRender(data) {
        super.render(data);
    }
}
