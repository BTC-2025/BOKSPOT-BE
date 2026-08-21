fetch("https://bokspot-be.onrender.com/api/v1/services/2cf63fd7-6710-4ac6-a3fa-8cbda29fdc0e", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: "f3408bf4-cc64-4458-af82-5cebd0ed41ed",
    name: "Delux",
    categoryId: "b06981f6-b12b-4905-be30-d74da4b6906b",
    description: "",
    shortDescription: "",
    serviceType: "RENTAL",
    durationMinutes: 60,
    basePrice: 0,
    maxCapacity: 1,
    images: [""],
    metadata: { merchantName: "Test Merchant", listings: [] },
    isTimingEnabled: false,
    timingDetails: "",
    pricingType: "PER_HOUR",
    customAttributes: {},
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
.then(r => r.json().then(data => console.log(JSON.stringify(data, null, 2))))
.catch(console.error);
