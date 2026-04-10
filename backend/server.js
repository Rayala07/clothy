import app from "./src/app.js";
import "dotenv/config";
import { connectToDB } from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Connected to PORT: ${PORT}`);
});

connectToDB();
