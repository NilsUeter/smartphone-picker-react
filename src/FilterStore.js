import {} from "mobx-react";
import { observable, action, autorun } from "mobx";

class FilterStore {
  @observable
  lightmode = true;
  @observable
  sidebarHidden = this.getSidebarHiddenInitialState();
  @observable
  country = "de";

  @observable
  activeFilterBox = "Sorting Options";

  @observable
  currentQuery = "";

  @observable
  searchQuery = "";
  @observable
  filterType = "totalscore";
  @observable
  decayFactor = 0.2;
  @observable
  isDescending = true;
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
  size_minimum_1 = 4.6;
  @observable
  size_maximum_1 = 7;

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

  @observable
  selectedBrands = [];

  @observable
  selectedFavorites = {};
  @observable
  onlyShowFavedPhones = false;
  @observable
  showBacksideDefault = false;

  getSidebarHiddenInitialState = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth > 640) {
      return false;
    }
    return true;
  };

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
  };

  @action
  toggleArrayAttribute = (name, newValue) => {
    var index = this[name].indexOf(newValue);
    if (index === -1) {
      this[name].push(newValue); // add if it doesn't exist
    } else {
      this[name].splice(index, 1); // remove if it does
    }
  };

  @action
  toggleObjectAttribute = (name, newValue) => {
    if (this[name]) {
      if (this[name][newValue] == null) {
        this[name][newValue] = newValue; // add if it doesn't exist
      } else {
        delete this[name][newValue]; // remove if it does
      }
    }
  };

  @action
  resetFilters = () => {
    for (let name in this) {
      switch (name) {
        //Define filters which aren't expected to be reset
        case "country":
        case "sidebarHidden":
        case "activeFilterBox":
        case "updateURLtoRepresentFilter": //Define methods which shouldn't be overriden for mobx reasons
        case "updateURL":
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
    // key[0] is the url key and key[1] the value, for example release_minimum=2017-01
    for (let key of searchParams) {
      // parse selectedBrands to an Array
      if (key[0] === "selectedBrands") {
        this[key[0]] = key[1].split(",");
        continue;
      }
      if (key[0] === "selectedFavorites") {
        const keys = decodeURIComponent(key[1]).split(",");
        const object = {};
        keys.forEach(element => (object[element] = element));
        this[key[0]] = object;
        continue;
      }
      this[key[0]] = key[1];
    }
  };

  updateURL = () => {
    let queryComponents = [];
    let finalquery = "";
    let key;
    for (key in this) {
      switch (key) {
        //Define filters which aren't expected to be included in the url
        case "currentQuery":
        case "country":
        case "updateURL":
        case "sidebarHidden":
        case "activeFilterBox":
        case "loadURL":
        case "updateURLtoRepresentFilter":
        case "lightmode":
        case "getMinDate":
        case "getSidebarHiddenInitialState":
          break;
        case "selectedBrands":
          if (this[key] && resetCopy && this[key].length > 0) {
            queryComponents.push(key + "=" + this[key]);
          }
          break;
        case "selectedFavorites":
          if (this[key] && resetCopy && Object.keys(this[key]).length > 0) {
            queryComponents.push(
              key + "=" + encodeURIComponent(Object.keys(this[key]))
            );
          }
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
      this.currentQuery = finalquery;
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
  sidebarHidden: false,
  country: "de",
  searchQuery: "",
  filterType: "totalscore",
  decayFactor: 0.2,
  isDescending: true,
  scaleInput: true,
  emptySmartphones: false,
  release_minimum: getMinDate(),
  release_maximum: new Date().toISOString().slice(0, 7),
  price_minimum_1: 0,
  price_maximum_1: 1200,
  size_minimum_1: 4.6,
  size_maximum_1: 7,
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
  waterproof: "",
  selectedBrands: [],
  selectedFavorites: {},
  onlyShowFavedPhones: false,
  showBacksideDefault: false
};

window.addEventListener("popstate", () => filterStore.loadURL(), false);

export default filterStore;
