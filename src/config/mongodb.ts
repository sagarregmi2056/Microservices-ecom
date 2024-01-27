import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

class Database {
  conn: any = null;
  constructor() {
    mongoose.connection.on("connected", function () {
      console.log("Mongoose connected  successfully");
    });

    // When the connection is disconnected
    mongoose.connection.on("disconnected", function () {
      console.log("Mongoose connection disconnected");
    });
    // process.on("SIGINT", function () {
    //     mongoose.connection.close(function () {
    //       console.log("Mongoose connection close");
    //       process.exit(0);
    //     });
    //   });
  }

  async connect() {
    try {
      console.log(
        "mongoose connection state => " + mongoose.connection.readyState
      );
      if (mongoose && mongoose.connection.readyState == 1 && this.conn)
        return this.conn;

      const url = MONGODB_URI;

      if (url === undefined) {
        console.error("MongoDB URI is not defined.");
        return false;
      }

      if (this.conn == null) {
        this.conn = mongoose
          .connect(url, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 100,
            maxConnecting: 1000,
          })
          .then(() => mongoose);

        // `await`ing connection after assigning to the `conn` variable
        // to avoid multiple function calls creating new connections
        await this.conn;
      }
      return this.conn;
    } catch (e) {
      console.log((e as Error).message);
      throw e;
    }
  }
}

export default Database;
