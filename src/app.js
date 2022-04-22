import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const connection = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function converteJSinJson() {
  try {
    const { rows } = await connection.query(
      `SELECT * FROM repositories
          WHERE "hasSponsorship" = true`
    );

    const json = JSON.stringify(rows[0]);

    fs.writeFile("sponsored-repos.json", json, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

await converteJSinJson();
