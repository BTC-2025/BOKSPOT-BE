fetch("https://bokspot-be.onrender.com/api/v1/services/categories")
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d, null, 2)))
  .catch(console.error);
