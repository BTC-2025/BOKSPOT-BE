fetch("https://bokspot-be.onrender.com/api/v1/services/8fb83f4b-62aa-3a5b-3e42-074005378435", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: "a1234567-89ab-cdef-0123-456789abcdef",
    name: "Delux Hotel Test",
    categoryId: "b06981f6-b12b-4905-be30-d74da4b6906b",
    description: "test description",
    shortDescription: "test description",
    serviceType: "RENTAL",
    durationMinutes: 60,
    basePrice: 0,
    maxCapacity: 1,
    images: [""],
    metadata: { merchantName: "Grand Hotel", listings: [] },
    isTimingEnabled: false,
    timingDetails: "",
    isCapacityEnabled: false,
    participantCapacity: 0,
    isAddonsEnabled: false,
    addOns: [],
    isTipsEnabled: false,
    tipsAndGuidelines: "",
    isRestrictionsEnabled: false,
    restrictions: "",
    isOffersEnabled: false,
    offersAndDiscounts: "",
    isInstructionsEnabled: false,
    specialInstructions: "",
    latitude: undefined,
    longitude: undefined
  })
})
.then(r => r.json().then(data => ({ status: r.status, data })))
.then(console.log)
.catch(console.error);
