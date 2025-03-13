const express = require("express");
const app = express();

app.use(express.json());
const users = [
  { id: 1, username: "wardaw", password: "wardaw123" },
  { id: 2, username: "nur", password: "nur123" },
];
let events = [];
app.get("/", (req, res) => {
  res.send("event planner is live");
});
app.listen(3000, () => console.log(`server on port ${3000}`));

//login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
    res.json({ message: "login successful", user: user });
  }
  if (!user) {
    res.json({ message: "username not found" });
  }
});
//
//create an event
app.post("/events", (req, res) => {
  const { name, desc, date, time, category, userid } = req.body;
  if (!users.find((user) => user.id === userid)) {
    return res.status(400).send("user not found");
  }
  const event = {
    id: events.length + 1,
    name,
    desc,
    date,
    time,
    category,
    userid,
  };
  events.push(event);
  res.send(event);
});
//view event, sorted by date and category
app.get("/events", (req, res) => {
  const { category, sortBy } = req.query;
  let filteredEvents = events;
  if (category) {
    filteredEvents = filteredEvents.filter(
      (event) => event.category === category
    );
  }
  if (sortBy === "date") {
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  res.json(filteredEvents);
});
