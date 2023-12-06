const client = require("./client");

const createRobot = async ({
  name,
  model,
  image,
  safeKids,
  company,
  expireDate,
  releaseDate,
}) => {
  try {
    const {
      rows: [robot],
    } = await client.query(
      `
      INSERT INTO robots(name, model, image, "safeKids", company, "expireDate", "releaseDate")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, name, model, image, "safeKids", company, "expireDate", "releaseDate"
    `,
      [name, model, image, safeKids, company, expireDate, releaseDate]
    );
    return robot;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createRobot,
};
