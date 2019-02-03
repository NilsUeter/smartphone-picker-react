import {} from "mobx-react";
import { observable, action, autorun } from "mobx";

class FilterStore {
  @observable
  lightmode = true;
  @observable
  showAbout = false;
  @observable
  sidebarHidden = false;
  @observable
  country = "de";

  @observable
  activeFilterBox = "Sorting Options";

  @observable
  searchQuery = "";
  @observable
  filterTemplate = "";
  @observable
  filterType = "price";
  @observable
  isDescending = false;
  @observable
  scaleInput = true;
  @observable
  emptySmartphones = false;
  @observable
  release_minimum = this.getMinDate();

  @observable
  release_maximum = new Date().toISOString().slice(0, 7);

  @observable
  price_minimum_1 = 0;
  @observable
  price_maximum_1 = 1200;

  @observable
  size_minimum_1 = 4.7;
  @observable
  size_maximum_1 = 6.4;

  @observable
  size_minimum_2 = 135;
  @observable
  size_maximum_2 = 163;

  @observable
  size_minimum_3 = 65;
  @observable
  size_maximum_3 = 78;

  @observable
  design = "1";
  @observable
  processor = "1";
  @observable
  updates = "1";
  @observable
  camera = "1";
  @observable
  battery = "1";

  @observable
  storage = 16;
  @observable
  headphoneJack = false;
  @observable
  simCards = false;
  @observable
  sdSlot = false;
  @observable
  notch = false;
  @observable
  waterproof = "";

  getMinDate = () => {
    const date = new Date();
    date.setMonth(new Date().getMonth() - 16);
    return date.toISOString().slice(0, 7);
  };

  @action
  toggleAttribute = name => {
    this[name] = !this[name];
  };

  @action
  changeAttribute = (name, newValue) => {
    this[name] = newValue;

    if (name === "filterTemplate") {
      this.setFilterTemplate();
    }
  };

  @action
  setFilterTemplate = () => {
    this.resetFilters();
    switch (this.filterTemplate) {
      case "justGood":
        this.design = "3";
        this.processor = "3";
        this.updates = "4";
        this.camera = "3";
        this.battery = "3";
        break;
      case "small":
        this.size_maximum_2 = 150;
        break;
      case "big":
        this.size_minimum_2 = 150;
        break;
      case "cheap":
        this.price_maximum_1 = 200;
        break;
      default:
        break;
    }
  };

  @action
  resetFilters = () => {
    for (let name in this) {
      switch (name) {
        case "filterTemplate": //Define filters which aren't expected to be reset
        case "country":
        case "sidebarHidden":
        case "activeFilterBox":
        case "updateURLtoRepresentFilter": //Define methods which shouldn't be overriden for mobx reasons
        case "updateURL":
        case "searchQuery":
        case "lightmode":
          break;
        default:
          if (this[name] !== resetCopy[name]) {
            this[name] = resetCopy[name];
          }
          break;
      }
    }
  };

  @action
  loadURL = () => {
    const searchParams = new URLSearchParams(window.location.search);

    for (let key of searchParams) {
      this[key[0]] = key[1];
    }
  };

  updateURL = () => {
    let queryComponents = [];
    let finalquery = "";
    let key;
    for (key in this) {
      switch (key) {
        case "filterTemplate": //Define filters which aren't expected to be included in the url
        case "country":
        case "updateURL":
        case "sidebarHidden":
        case "activeFilterBox":
        case "loadURL":
        case "updateURLtoRepresentFilter":
        case "lightmode":
        case "getMinDate":
          break;
        default:
          if (this[key] && resetCopy && resetCopy[key] !== this[key]) {
            queryComponents.push(key + "=" + this[key]);
          }

          break;
      }
    }
    finalquery = "?" + queryComponents.join("&");
    if (finalquery === "?") {
      finalquery = "";
    }
    if (resetCopy && window.location.search !== finalquery) {
      const newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        finalquery;

      window.history.pushState({ path: newurl }, "", newurl);
    }
  };

  updateURLtoRepresentFilter = autorun(() => {
    if (resetCopy === undefined) {
      this.loadURL();
    }
    this.updateURL();
  });
}

const filterStore = new FilterStore();

const getMinDate = () => {
  const date = new Date();
  date.setMonth(new Date().getMonth() - 16);
  return date.toISOString().slice(0, 7);
};

const resetCopy = {
  showAbout: false,
  sidebarHidden: false,
  country: "de",
  filterTemplate: "",
  filterType: "price",
  isDescending: false,
  scaleInput: true,
  emptySmartphones: false,
  release_minimum: getMinDate(),
  release_maximum: new Date().toISOString().slice(0, 7),
  price_minimum_1: 0,
  price_maximum_1: 1200,
  size_minimum_1: 4.7,
  size_maximum_1: 6.4,
  size_minimum_2: 135,
  size_maximum_2: 163,
  size_minimum_3: 65,
  size_maximum_3: 78,
  design: "1",
  processor: "1",
  updates: "1",
  camera: "1",
  battery: "1",
  storage: 16,
  headphoneJack: false,
  simCards: false,
  sdSlot: false,
  notch: false,
  waterproof: ""
};

window.addEventListener("popstate", () => filterStore.loadURL(), false);

export default filterStore;
