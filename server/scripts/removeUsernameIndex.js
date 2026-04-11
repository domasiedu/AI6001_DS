const mongoose =
  require("mongoose");

async function fixIndex() {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/chessdb"
    );

    const db =
      mongoose.connection.db;

    const collection =
      db.collection("users");

    const indexes =
      await collection.indexes();

    console.log(
      "Existing indexes:",
      indexes
    );

    try {
      await collection.dropIndex(
        "username_1"
      );

      console.log(
        "username_1 index removed"
      );
    } catch (err) {
      console.log(
        "username_1 index not found"
      );
    }

    process.exit();
  } catch (error) {
    console.error(
      "Index removal failed:",
      error
    );

    process.exit(1);
  }
}

fixIndex();
