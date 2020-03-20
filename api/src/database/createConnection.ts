import { createConnection } from "typeorm";

import { User } from "../entity/User";
import { Smartphone } from "../entity/smartphone";

export const createDatabaseConnection = () =>
  createConnection()
    .then(async connection => {
      console.log("Inserting a new smartphone into the database...");
      const smartphone = Smartphone.create({
        name: "6.1",
        brand: "Nokia",
        released: "2018-04",
        imageLink: "nokia6.1",
        design: 4,
        display: 5.5,
        length: 149,
        width: 76,
        cpu: 3,
        updates: 5
      });
      smartphone.name = "test";

      await connection.manager.save(smartphone);
      console.log("Saved a new smartphone with id: " + smartphone.id);

      console.log("Loading smartphones from the database...");
      const smartphones = await connection.manager.find(Smartphone);
      console.log("Loaded smartphones: ", smartphones);
    })
    .catch(error => console.log(error));
