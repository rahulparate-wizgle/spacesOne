const VenueListdata = [
  {
    id: 1,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/74/1b/64/exterior.jpg?w=1100&h=-1&s=1",
    title: "Radission Blu Hotel, Nagpur",
    company: "Wardha Rd Nagpur, Maharashtra 440015",
    price: "25,000",
    hotel: "Hotel",
    conferenceHall: "Conference Hall",
    lawn: "Lawn",
    serviceProvide: [
      {
        type: "Hotel",
        class: "success",
      },
      {
        type: "Conference Hall",
      },
      {
        type: "Lawn",
      },
    ]
  },
  {
    id: 2,
    image:
      "https://media.radissonhotels.net/image/radisson-blu-hotel-mumbai-international-airport/exterior/16256-126778-f72696257_3xl.jpg?impolicy=Card",
    title: "Radisson Blu Mumbai International Airport",
    company:
      "Marol Maroshi Road near Marol Metro Station, Andheri East, Mumbai, 400059, India",
    price: "55,000",
    serviceProvide: [
      {
        type: "Hotel",
        class: "success",
      },
      {
        type: "Conference Hall",
      },
      {
        type: "Lawn",
      },
    ]


  },
  {
    id: 3,
    image:
      "https://media.radissonhotels.net/image/radisson-blu-hotel-pune-kharadi/exteriorview/16256-114064-f63762239_3xl.jpg?impolicy=HomeHero",
    title: "Radisson Blu Hotel, Pune Kharadi",
    company: "Nagar Bypass Road, Kharadi, Pune, 411014, India",
    price: "33,350",
    serviceProvide: [
      {
        type: "Hotel",
        class: "success",
      },
      {
        type: "Conference Hall",
      },
      {
        type: "Lawn",
      },
    ]

  },
  {
    id: 4,
    image:
      "https://media.radissonhotels.net/image/park-inn-by-radisson-new-delhi-ip-extension/lobbyview/16256-114828-f63774260_3xl.jpg?impolicy=HomeHero",
    title: "Park Inn by Radisson New Delhi IP Extension",
    company: "Plot No. 6A, New Delhi, 110092, India",
    price: "45,000",
    serviceProvide: [
      {
        type: "Hotel",
        class: "success",
      },
      {
        type: "Conference Hall",
      },
      {
        type: "Lawn",
      },
    ]

  },
  {
    id: 5,
    image:
      "https://media.radissonhotels.net/image/radisson-blu-hotel-spa-nashik/guest-room/16256-126780-f72591213_3xl.jpg?impolicy=Card",
    title: "Radisson Blu Hotel & Spa, Nashik",
    company: "289/2 Pathardi Phata, Nashik, Maharashtra, 422010, India",
    price: "78,000",
    serviceProvide: [
      {
        type: "Hotel",
        class: "success",
      },
      {
        type: "Conference Hall",
      },
      {
        type: "Lawn",
      },
    ]

  },
  {
    id: 6,
    image:
      "https://media.radissonhotels.net/image/radisson-resort-and-spa-lonavala/exterior/16256-138817-f72250178_3xl.jpg?impolicy=Card",
    title: "Radisson Resort & Spa Lonavala",
    company:"Plot Nos.19-21 & 27-29, Gold Valley, Sector-D, Tungarli, Lonavala, 410401, India",
    price: "27,500",
    serviceProvide: [
      {
        type: "Hotel",
        class: "success",
      },
      {
        type: "Conference Hall",
      },
      {
        type: "Lawn",
      },
    ]

  },
  {
    id: 7,
    image:
      "https://media.radissonhotels.net/image/park-plaza-jodhpur/lobbyview/16256-114944-f63613574_3xl.jpg?impolicy=Card",
    title: "Park Plaza Jodhpur",
    company: "Jhalamand House, Airport Road, Jodhpur, India",
    price: "46,500",
    serviceProvide: [
      {
        type: "Hotel",
        class: "success",
      },
      {
        type: "Conference Hall",
      },
      {
        type: "Lawn",
      },
    ]

  },
  {
    id: 8,
    image:
      "https://media.radissonhotels.net/image/radisson-blu-hotel-indore/exteriorview/16256-116514-f64878639_3xl.jpg?impolicy=Card",
    title: "Radisson Blu Hotel Indore",
    company: "12, Scheme No 94 C, Indore, 452010, India",
    price: "35,000",
    serviceProvide: [
      {
        type: "Hotel",
        class: "success",
      },
      {
        type: "Conference Hall",
      },
      {
        type: "Lawn",
      },
    ]

  },
  {
    id: 9,
    image:
      "https://media.radissonhotels.net/image/radisson-blu-plaza-hotel-hyderabad-banjara-hills/poolview/16256-114052-f65459725_3xl.jpg?impolicy=Card",
    title: "Radisson Blu Plaza Hotel Hyderabad Banjara Hills",
    company: "8-2-409 Road No. 6, Banjara Hills, Hyderabad, 500034, India",
    price: "42,000",
    serviceProvide: [
      {
        type: "Hotel",
        class: "success",
      },
      {
        type: "Conference Hall",
      },
      {
        type: "Lawn",
      },
    ]

  },
  {
    id: 10,
    image:
      "https://media.radissonhotels.net/image/country-inn-suites-by-radisson-goa-candolim/exteriorview/16256-114456-f63668230_3xl.jpg?impolicy=Card",
    title: "Country Inn & Suites by Radisson, Goa Candolim",
    company: "Bamon Vaddo, Goa, 403515, India",
    price: "36,000",
    serviceProvide: [
      {
        type: "Hotel",
        class: "success",
      },
      {
        type: "Conference Hall",
      },
      {
        type: "Lawn",
      },
    ]
  },
  {
    id: 11,
    image:
      "https://media.radissonhotels.net/image/radisson-hotel-bhopal/exterior/16256-126784-f72235915_3xl.jpg?impolicy=Card",
    title: "Radisson Hotel Bhopal",
    company:
      "Opp Savoy Complex, Gulmohar Colony, E 8 Extention Bhopal, Madhya Pradesh, Bhopal, 462039, India",
    price: "89,400",
    serviceProvide: [
      {
        type: "Hotel",
        class: "success",
      },
      {
        type: "Conference Hall",
      },
      {
        type: "Lawn",
      },
    ]

  },
  {
    id: 12,
    image:
      "https://images.jdmagicbox.com/comp/nagpur/m5/0712px712.x712.180613182501.r5m5/catalogue/ambika-farms-katol-road-nagpur-resorts-h7y94.jpg",
    title: "Radisson Blu Hotel Ahmedabad",
    company: "Near Panchvati Cross Roads, Ahmedabad, 380006, India",
    price: "30,000",
    serviceProvide: [
      {
        type: "Hotel",
        class: "success",
      },
      {
        type: "Conference Hall",
      },
      {
        type: "Lawn",
      },
    ]

  },
];

export { VenueListdata };
