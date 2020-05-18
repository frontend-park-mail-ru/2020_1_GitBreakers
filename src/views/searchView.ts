import View from "../modules/view";
import { IEventBus } from "../modules/eventBus";
import template from "../components/search/search.pug";
import repositoryCard from "../components/search/repoItem.pug";
import userCard from "../components/search/userItem.pug";
import { SEARCH } from "../modules/events";

export default class SearchView extends View {
  data: object;
  constructor(root: HTMLElement, eventBus: IEventBus) {
    super(root, template, eventBus);

    this.eventBus.on(SEARCH.loadPageSuccess, this.onReander.bind(this));
  }

  render(data: object) {
    this.eventBus.emit(SEARCH.loadPage, {});
  }

  private onReander(data: {
    mode: string;
    allUsers: {}[];
    allRepo: {}[];
    myRepo: {}[];
    starredRepo: {}[];
  }) {
    super.render(data);

    let setReloadFunc = (event: Event) => {
      this.eventBus.emit(SEARCH.reload, {});
    };

    document
      .querySelector(".search__menu")
      .addEventListener("click", setReloadFunc);

    this.eventCollector.addEvent(
      document.querySelector(".search__menu"),
      "click",
      setReloadFunc
    );

    const content = document.querySelector(".search__content");
    let html = "";
    switch (data.mode) {
      case "all":
      case "allrepo":
        if (data.allRepo) {
          data.allRepo.forEach((item) => {
            html += repositoryCard({ item });
          });
        }
        content.innerHTML = html || "Репозитории не найдены!";
        document
          .querySelector(".search__menu__item:nth-child(1)")
          .classList.add("open");
        break;
      case "allusers":
        if (data.allUsers) {
          data.allUsers.forEach((item) => {
            html += userCard({ item });
          });
        }
        content.innerHTML = html || "Пользователи не найдены!";
        document
          .querySelector(".search__menu__item:nth-child(2)")
          .classList.add("open");
        break;
      case "myrepo":
        if (data.myRepo) {
          data.myRepo.forEach((item) => {
            html += repositoryCard({ item });
          });
        }
        content.innerHTML = html || "Репозитории не найдены!";
        document
          .querySelector(".search__menu__item:nth-child(3)")
          .classList.add("open");
        break;
      case "starredrepo":
        if (data.starredRepo) {
          data.starredRepo.forEach((item) => {
            html += repositoryCard({ item });
          });
        }
        content.innerHTML = html || "Репозитории не найдены!";
        document
          .querySelector(".search__menu__item:nth-child(4)")
          .classList.add("open");
        break;
    }
  }
}
