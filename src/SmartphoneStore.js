import { observable, computed, action } from "mobx";
import FilterStore from "./FilterStore.js";
import { monthDiff } from "./helperFunctions";

class SmartphoneStore {
  obj = [];

  @observable
  hasLoaded = false;

  constructor(props) {
    this.loadJSON();
  }

  @action
  init = responseText => {
    this.obj = responseText;
    // Set variable to show it finished loading
    this.hasLoaded = true;
  };

  loadJSON = () => {
    fetch("https://api.smartphone-picker.com/v1/Smartphone.php")
      .then(r => r.json())
      .then(data => this.init(data));
  };

  @computed
  get listOfFilteredObjects() {
    let listOfFilteredObjects = [];
    if (!this.hasLoaded) {
      return listOfFilteredObjects;
    }
    let obj = JSON.parse(JSON.stringify(this.obj)); // deep copy
    let phone;
    for (let key in obj) {
      phone = obj[key];
      if (FilterStore.onlyShowFavedPhones) {
        if (
          FilterStore.selectedFavorites[phone.brand + " " + phone.name] == null
        ) {
          continue;
        }
      } else {
        if (FilterStore.searchQuery !== "") {
          //searchQuery
          const lowerCaseName = (phone.brand + " " + phone.name).toLowerCase();
          if (!lowerCaseName.includes(FilterStore.searchQuery.toLowerCase())) {
            continue;
          }
        }

        //release-date
        if (
          FilterStore.release_minimum > phone.released ||
          FilterStore.release_maximum < phone.released
        ) {
          continue;
        }

        //display
        if (
          FilterStore.size_minimum_1 > phone.display ||
          FilterStore.size_maximum_1 < phone.display
        ) {
          continue;
        }

        //length
        if (
          FilterStore.size_minimum_2 > phone.length ||
          FilterStore.size_maximum_2 < phone.length
        ) {
          continue;
        }

        //width
        if (
          FilterStore.size_minimum_3 > phone.width ||
          FilterStore.size_maximum_3 < phone.width
        ) {
          continue;
        }

        //design
        if (phone.design < FilterStore.design) {
          continue;
        }

        //processor
        if (phone.cpu < FilterStore.cpu) {
          continue;
        }

        //software updates
        if (phone.updates < FilterStore.updates) {
          continue;
        }

        //camera
        if (phone.camera < FilterStore.camera) {
          continue;
        }

        //battery
        if (phone.battery < FilterStore.battery) {
          continue;
        }

        //waterproof
        if (FilterStore.waterproof !== "") {
          if (phone.waterproof < FilterStore.waterproof) {
            continue;
          }
        }

        //headphonejack
        if (FilterStore.headphoneJack && phone.headphoneJack === 0) {
          continue;
        }

        //simCardInput
        if (FilterStore.simCards && phone.simCards === 1) {
          continue;
        }

        //sdSLot
        if (FilterStore.sdSlot && phone.sdSlot === 0) {
          continue;
        }

        //notch
        if (FilterStore.notch && phone.notch === 1) {
          continue;
        }

        //brands
        if (
          FilterStore.selectedBrands.length > 0 &&
          FilterStore.selectedBrands.indexOf(phone.brand) === -1
        ) {
          continue;
        }

        for (let t = 0; t < phone.models.length; t++) {
          //storage
          if (phone.models[t].storage < FilterStore.storage) {
            phone.models.splice(t, 1);
            t--;
            continue;
          }
          for (let c = 0; c < phone.models[t].types.length; c++) {
            //price
            if (
              FilterStore.price_minimum_1 > phone.models[t].types[c].price ||
              FilterStore.price_maximum_1 < phone.models[t].types[c].price
            ) {
              if (phone.models[t].types.length === 1) {
                phone.models.splice(t, 1);
                t--;
                break;
              } else {
                phone.models[t].types.splice(c, 1);
                c--;
              }
            }
          }
        }

        if (phone.models.length < 1) {
          continue;
        }
      }
      phone.totalscore = this.calculateScore(phone, FilterStore.decayFactor);
      listOfFilteredObjects.push(phone);
    }
    return listOfFilteredObjects;
  }

  calculateScore = (smartphone, decay) => {
    return (
      Math.round(
        (smartphone.design +
          smartphone.cpu +
          smartphone.updates +
          smartphone.camera +
          smartphone.battery -
          monthDiff(new Date(smartphone.released), new Date()) * decay) *
          10
      ) / 10
    );
  };

  @computed
  get listOfFilteredAndScoredObjects() {
    let listOfFilteredAndScoredObjects = this.listOfFilteredObjects.slice(0);

    switch (FilterStore.filterType) {
      case "price":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareFunctionLowest(a, b, "price");
        });

      case "totalscore":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareFunctionNormal(a, b, "totalscore");
        });

      case "length":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareFunctionNormal(a, b, "length");
        });

      case "display":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareFunctionNormal(a, b, "display");
        });
      case "released":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareDates(a, b, "released");
        });

      default:
        console.log("Case not defined.");
        return [];
    }
  }

  getUniqueBrands() {
    var unique = [];
    if (!this.hasLoaded) {
      return unique;
    }
    this.obj.forEach(element => {
      if (unique.indexOf(element.brand) === -1) {
        unique.push(element.brand);
      }
    });

    unique.sort();
    return unique;
  }

  compareDates(a, b, attribute) {
    return FilterStore.isDescending
      ? b[attribute] > a[attribute]
        ? 1
        : -1
      : a[attribute] > b[attribute]
      ? 1
      : -1;
  }

  compareFunctionNormal(a, b, attribute) {
    return FilterStore.isDescending
      ? b[attribute] - a[attribute]
      : a[attribute] - b[attribute];
  }

  compareFunctionLowest(a, b, attribute) {
    return FilterStore.isDescending
      ? b.models[0].types[0][attribute] - a.models[0].types[0][attribute]
      : a.models[0].types[0][attribute] - b.models[0].types[0][attribute];
  }
}

const smartphoneStore = new SmartphoneStore();

export default smartphoneStore;
