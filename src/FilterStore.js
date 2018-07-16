import {} from "mobx-react";
import { observable, action } from "mobx";

class FilterStore {
  @observable country = "de";

  @observable filterTemplate = "";
  @observable filterType = "price";
  @observable isDescending = false;
  @observable scaleInput = true;

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
      case "":
        break;
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

  resetFilters = () => {};
}

const filterStore = new FilterStore();

export default filterStore;
