const { createCustomer, createRobot, createTask } = require("./");
const client = require("./client.js");

const dropTables = async () => {
  try {
    console.log("Dropping All Tables...");
    // Drop all tables in the correct order.
    await client.query(`
    DROP TABLE IF EXISTS robot_tasks, customer_robots, tasks, robots, customers;
    `);
  } catch (err) {
    console.log(err);
  }
};

const createTables = async () => {
  try {
    console.log("Starting to build tables...");
    //create all tables in the correct order.

    await client.query(`
      CREATE TABLE customers(
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE robots(
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        model VARCHAR(50) NOT NULL,
        image VARCHAR(255) NOT NULL,
        "safeKids" BOOLEAN NOT NULL,
        company VARCHAR(50) Not Null,
        "expireDate" DATE Not Null,
        "releaseDate" DATE Not Null
      );
    `);

    await client.query(`
      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        task VARCHAR(30) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE customer_robots (
        "customerId" INTEGER REFERENCES customers(id),
        "robotsId" INTEGER REFERENCES robots(id)
      );
    `);

    await client.query(`
      CREATE TABLE robot_tasks (
        "robotsId" INTEGER REFERENCES robots(id),
        "tasksId" INTEGER REFERENCES tasks(id)
      );
    `);
  } catch (err) {
    console.log(err);
  }
};

const createInitialCustomers = async () => {
  console.log("Starting to create Customers");
  try {
    const customersToCreate = [
      { name: "JefferyJefferson", email: "jj@mymail.com" },
      { name: "MathewMcClung", email: "mm@mymail.com" },
      { name: "AlexRodriguez", email: "arod@mymail.com" },
    ];

    const customers = await Promise.all(customersToCreate.map(createCustomer));

    console.log("Customers Created:");
    console.log(customers);
    console.log("Finished Creating Customers!");
  } catch (err) {
    console.log(err);
  }
};

const createInitialRobot = async () => {
  console.log("Starting to create Robots");
  try {
    const robotsToCreate = [
      {
        name: "xr_base",
        model: "xr3000",
        image: "www.website.com",
        safeKids: false,
        company: "Teltec",
        expireDate: new Date(),
        releaseDate: new Date(),
      },
      {
        name: "pxz_base",
        model: "quantum_z100",
        image: "www.website.com",
        safeKids: true,
        company: "Velcor",
        expireDate: new Date(),
        releaseDate: new Date(),
      },
      {
        name: "Ionic_base",
        model: "zelton_400",
        image: "www.website.com",
        safeKids: true,
        company: "Astrion",
        expireDate: new Date(),
        releaseDate: new Date(),
      },
    ];

    const robots = await Promise.all(robotsToCreate.map(createRobot));
    console.log("Robots created:");
    console.log(robots);
    console.log("Finished Creating Robots");
  } catch (err) {
    console.log(err);
  }
};

const createInitialTask = async () => {
  console.log("Starting to create tasks");
  const tasksToCreate = [
    { taskName: "vacuum" },
    { taskName: "playMusic" },
    { taskName: "dishes" },
    { taskName: "massage" },
    { taskName: "motivate" },
  ];
  const tasks = await Promise.all(tasksToCreate.map(createTask));
  console.log("Tasks Created");
  console.log(tasks);
  console.log("Finished Creating Tasks");
};

const syncAndSeed = async () => {
  try {
    await client.connect();
    console.log("Connected to database");

    await dropTables();
    await createTables();
    await createInitialCustomers();
    await createInitialRobot();
    await createInitialTask();
    // await createCustomerRobot();
    // await createRobotTask();

    client.end();
  } catch (err) {
    console.log(err);
  }
};

syncAndSeed();
