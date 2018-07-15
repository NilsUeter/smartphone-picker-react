import { observable, computed, action } from "mobx";

import FilterStore from "./FilterStore.js";

class SmartphoneStore {
  @observable todos = [];
  @observable obj = [];
  @observable listOfFilteredAndScoredObjects = [];

  constructor(props) {
    this.init();
  }

  init = () => {
    console.log("init");
    this.loadJSON(this.init2);
  };

  @action
  init2 = responseText => {
    // Parse JSON string into object
    this.obj = JSON.parse(responseText);
    this.calculateAllScores();
    this.findLowestPriceForAllSmartphones();
  };

  loadJSON = callback => {
    console.log("loading data");
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "./data/smartphones.json", true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = () => {
      if (xobj.readyState === 4 && xobj.status === 200) {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  };

  findLowestPriceForAllSmartphones = () => {
    for (var i = 0; i < this.obj.smartphones.length; i++) {
      this.obj.smartphones[
        i
      ].smallestPrice = this.findLowestPriceForOneSmartphones(
        this.obj.smartphones[i]
      );
    }
  };

  findLowestPriceForOneSmartphones = smartphone => {
    var lowest = 0;
    for (var i = 1; i < smartphone["price"][FilterStore.country].length; i++) {
      if (
        smartphone["price"][FilterStore.country][i][0] <
          smartphone["price"][FilterStore.country][lowest][0] &&
        smartphone["price"][FilterStore.country][i][0] !== 0
      ) {
        lowest = i;
      } else if (smartphone["price"][FilterStore.country][lowest][0] === 0) {
        lowest = i;
      }
    }
    return lowest;
  };

  calculateAllScores() {
    for (var i = 0; i < this.obj.smartphones.length; i++) {
      this.obj.smartphones[i].totalscore = this.calculateScore(
        this.obj.smartphones[i]
      );
    }
  }

  calculateScore(smartphone) {
    return (
      smartphone.design +
      smartphone.processor +
      smartphone.updates +
      smartphone.camera +
      smartphone.battery
    );
  }

  @computed
  get listOfFilteredObjects() {
    var xListOfFilteredObjects = [];
    if (this.obj.smartphones == null) {
      return xListOfFilteredObjects;
    }
    for (var i = 0; i < this.obj.smartphones.length; i++) {
      //prize not 0
      if (
        this.obj.smartphones[i]["price"][FilterStore.country][
          this.obj.smartphones[i].smallestPrice
        ] == null ||
        this.obj.smartphones[i]["price"][FilterStore.country][
          this.obj.smartphones[i].smallestPrice
        ][0] === 0
      ) {
        continue;
      }

      //prize minimum
      if (FilterStore.price_minimum_1 !== "") {
        if (
          this.obj.smartphones[i]["price"][FilterStore.country][
            this.obj.smartphones[i].smallestPrice
          ][0] < FilterStore.price_minimum_1
        ) {
          continue;
        }
      }

      //prize maximum
      if (FilterStore.price_maximum_1 !== "") {
        if (
          this.obj.smartphones[i]["price"][FilterStore.country][
            this.obj.smartphones[i].smallestPrice
          ][0] > FilterStore.price_maximum_1
        ) {
          continue;
        }
      }

      //display minimum
      if (FilterStore.size_minimum_1 !== "") {
        if (this.obj.smartphones[i].display < FilterStore.size_minimum_1) {
          continue;
        }
      }
      //display maximum
      if (FilterStore.size_maximum_1 !== "") {
        if (this.obj.smartphones[i].display > FilterStore.size_maximum_1) {
          continue;
        }
      }

      //length minimum
      if (FilterStore.size_minimum_2 !== "") {
        if (this.obj.smartphones[i].length < FilterStore.size_minimum_2) {
          continue;
        }
      }
      //length maximum
      if (FilterStore.size_maximum_2 !== "") {
        if (this.obj.smartphones[i].length > FilterStore.size_maximum_2) {
          continue;
        }
      }

      //width minimum
      if (FilterStore.size_minimum_3 !== "") {
        if (this.obj.smartphones[i].width < FilterStore.size_minimum_3) {
          continue;
        }
      }
      //width maximum
      if (FilterStore.size_maximum_3 !== "") {
        if (this.obj.smartphones[i].width > FilterStore.size_maximum_3) {
          continue;
        }
      }

      //design
      if (document.querySelector('input[name="design-input-1"]:checked')) {
        if (
          this.obj.smartphones[i].design <
          document.querySelector('input[name="design-input-1"]:checked').value
        ) {
          continue;
        }
      }
      //processor
      if (document.querySelector('input[name="processor-input-1"]:checked')) {
        if (
          this.obj.smartphones[i].processor <
          document.querySelector('input[name="processor-input-1"]:checked')
            .value
        ) {
          continue;
        }
      }
      //software updates
      if (document.querySelector('input[name="updates-input-1"]:checked')) {
        if (
          this.obj.smartphones[i].updates <
          document.querySelector('input[name="updates-input-1"]:checked').value
        ) {
          continue;
        }
      }
      //camera
      if (document.querySelector('input[name="camera-input-1"]:checked')) {
        if (
          this.obj.smartphones[i].camera <
          document.querySelector('input[name="camera-input-1"]:checked').value
        ) {
          continue;
        }
      }
      //battery
      if (document.querySelector('input[name="battery-input-2"]:checked')) {
        if (
          this.obj.smartphones[i].battery <
          document.querySelector('input[name="battery-input-2"]:checked').value
        ) {
          continue;
        }
      }

      //storage
      if (FilterStore.storageInput !== "") {
        if (this.obj.smartphones[i].storage < FilterStore.storageInput) {
          continue;
        }
      }

      //waterproofing
      if (FilterStore.waterproofInput !== "") {
        if (this.obj.smartphones[i].waterproof < FilterStore.waterproofInput) {
          continue;
        }
      }

      //headphonejack
      if (
        FilterStore.jackInput === "checked" &&
        this.obj.smartphones[i].headphonejack === 0
      ) {
        continue;
      }

      //simCardInput
      if (
        FilterStore.simCardInput === "checked" &&
        this.obj.smartphones[i].simcards === 1
      ) {
        continue;
      }

      //sdSLot
      if (
        FilterStore.sdSlotInput === "checked" &&
        this.obj.smartphones[i].sdslot === 0
      ) {
        continue;
      }

      //notch
      if (
        FilterStore.notchInput === "checked" &&
        this.obj.smartphones[i].notch === 1
      ) {
        continue;
      }

      xListOfFilteredObjects.push(this.obj.smartphones[i]);
    }
    return xListOfFilteredObjects;
  }

  @computed
  get listOfFilteredAndScoredObjects() {
    switch (FilterStore.filterType) {
      case "price":
        return this.sortBy(
          this.getLowestParameter,
          "price",
          this.getNormalParameter,
          "totalscore",
          FilterStore.isDescending
        );

      case "totalscore":
        return this.sortBy(
          this.getNormalParameter,
          "totalscore",
          this.getLowestParameter,
          "price",
          FilterStore.isDescending
        );

      case "length":
        return this.sortBy(
          this.getNormalParameter,
          "length",
          this.getNormalParameter,
          "width",
          FilterStore.isDescending
        );

      case "display":
        return this.sortBy(
          this.getNormalParameter,
          "display",
          this.getNormalParameter,
          "length",
          FilterStore.isDescending
        );

      default:
        return null;
    }
  }

  getNormalParameter(json, i, type) {
    return json[i][type];
  }

  getLowestParameter(json, i, type) {
    return json[i][type][FilterStore.country][json[i].smallestPrice][0];
  }

  sortBy(getMethod1, first, getMethod2, second, isDescending) {
    var listOfFilteredAndScoredObjects = [];

    //first score stuff
    for (var i = 0; i < this.listOfFilteredObjects.length; i++) {
      //then sort it into listOfFilteredAndScoredObjects
      for (var e = 0; e < this.listOfFilteredObjects.length; e++) {
        if (listOfFilteredAndScoredObjects.length === 0) {
          listOfFilteredAndScoredObjects.push(this.listOfFilteredObjects[i]);
          break;
        } else if (e === listOfFilteredAndScoredObjects.length) {
          listOfFilteredAndScoredObjects.splice(
            listOfFilteredAndScoredObjects.length,
            0,
            this.listOfFilteredObjects[i]
          );
          break;
        } else if (
          getMethod1(this.listOfFilteredObjects, i, first) >
            getMethod1(listOfFilteredAndScoredObjects, e, first) &&
          FilterStore.isDescending
        ) {
          listOfFilteredAndScoredObjects.splice(
            e,
            0,
            this.listOfFilteredObjects[i]
          );
          break;
        } else if (
          getMethod1(this.listOfFilteredObjects, i, first) <
            getMethod1(listOfFilteredAndScoredObjects, e, first) &&
          !FilterStore.isDescending
        ) {
          listOfFilteredAndScoredObjects.splice(
            e,
            0,
            this.listOfFilteredObjects[i]
          );
          break;
        } else if (
          getMethod1(this.listOfFilteredObjects, i, first) ===
            getMethod1(listOfFilteredAndScoredObjects, e, first) &&
          getMethod2(this.listOfFilteredObjects, i, second) <
            getMethod2(listOfFilteredAndScoredObjects, e, second)
        ) {
          listOfFilteredAndScoredObjects.splice(
            e,
            0,
            this.listOfFilteredObjects[i]
          );
          break;
        }
      }
    }
  }

  getTodos = () => {
    return this.todos;
  };

  getFilteredAndSortedSmartphones = () => {
    return this.listOfFilteredAndScoredObjects;
  };

  getTodo = id => {
    return this.todos.find(todo => todo.id === id);
  };

  addTodo = (text, id) => {
    this.todos.push({ id: Date.now(), text });
  };

  removeTodo = id => {
    this.todos = this.todos.filter(todo => todo.id !== id);
  };
}

const smartphoneStore = new SmartphoneStore();

export default smartphoneStore;
