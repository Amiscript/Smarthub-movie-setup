import "dotenv/config";
import pg from "pg";

const url = process.env.DATABASE_URL;
console.log("URL loaded:", url ? "yes" : "NO (.env not found)");

const client = new pg.Client({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  const r = await client.query("select current_user, version()");
  console.log("CONNECTED:", r.rows[0]);
  await client.end();
} catch (e) {
  console.log("ERROR:", e.code, "-", e.message);
}