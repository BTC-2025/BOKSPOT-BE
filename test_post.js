fetch("https://bokspot-be.onrender.com/api/v1/services/2cf63fd7-6710-4ac6-a3fa-8cbda29fdc0e", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Delux",
    description: "test description",
    price: 0,
    duration: 30,
    categoryId: "b06981f6-b12b-4905-be30-d74da4b6906b", // Hotel Booking Prod ID
    isActive: true,
    city: "Chennai",
    rating: 5,
    bookingsCount: 0
  })
})
.then(r => r.json().then(data => ({ status: r.status, data })))
.then(console.log)
.catch(console.error);
