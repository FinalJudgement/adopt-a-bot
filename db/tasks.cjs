const client = require("./client");

const createTask = async ({ taskName }) => {
  try {
    const {
      rows: [task],
    } = await client.query(
      `
      INSERT INTO tasks (task)
      VALUES ($1)
      RETURNING *
    `,
      [taskName]
    );
    return task;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createTask,
};
