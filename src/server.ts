import { connect } from "mongoose";
import app from "./app";
import config from "./config/index";

async function mainFunc() {
  try {
    await connect(config.database_url as string);
    console.log("Successfully connected database 🚀");

    app.listen(config.port, () => {
      console.log(
        `Book catalog system application is listening on port ${config.port} 🖥️`
      );
    });
  } catch (error) {
    console.log("Failed to connect database 🥹", error);
  }
}

mainFunc();
