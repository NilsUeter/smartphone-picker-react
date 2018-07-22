import {} from "mobx-react";
import { observable, action } from "mobx";

class FilterStore {
  @observable showAbout = false;
  @observable sidebarHidden = true;
  @observable country = "de";

  @observable filterTemplate = "";
  @observable filterType = "price";
  @observable isDescending = false;
  @observable scaleInput = true;
  @observable emptySmartphones = true;

  @observable price_minimum_1 = "";
  @observable price_maximum_1 = "";

  @observable size_minimum_1 = "";
  @observable size_maximum_1 = "";

  @observable size_minimum_2 = "";
  @observable size_maximum_2 = "";

  @observable size_minimum_3 = "";
  @observable size_maximum_3 = "";

  @observable design = "1";
  @observable processor = "1";
  @observable updates = "1";
  @observable camera = "1";
  @observable battery = "1";

  @observable storage = 16;
  @observable headphoneJack = false;
  @observable simCards = false;
  @observable sdSlot = false;
  @observable notch = false;
  @observable waterproof = "";

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
        break;
      default:
        break;
    }
  };

  @action
  resetFilters = () => {
    for (var name in this) {
      switch (name) {
        case "filterTemplate": //Define filters which aren't expected to be reset
        case "country":
        case "sidebarHidden":
          break;
        default:
          if (this[name] !== resetCopy[name]) {
            console.log(name);
            this[name] = resetCopy[name];
          }
          break;
      }
    }
  };
}

const filterStore = new FilterStore();

const resetCopy = createBackup();
function createBackup() {
  const da = new FilterStore();
  for (var name in filterStore) {
    da[name] = filterStore[name];
  }
  return da;
}

export default filterStore;
