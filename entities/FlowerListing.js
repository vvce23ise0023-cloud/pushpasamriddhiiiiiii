export const FlowerListingSchema = {
  name: "FlowerListing",
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Listing title"
    },
    flower_type: {
      type: "string",
      description: "Type of flower"
    },
    description: {
      type: "string",
      description: "Listing description"
    },
    price: {
      type: "number",
      description: "Price per unit in INR"
    },
    unit: {
      type: "string",
      enum: [
        "kg",
        "bunch",
        "piece",
        "quintal"
      ],
      "default": "kg"
    },
    quantity_available: {
      type: "number",
      description: "Available quantity"
    },
    listing_type: {
      type: "string",
      enum: [
        "sell",
        "buy"
      ],
      "description": "Whether user wants to sell or buy"
    },
    location: {
      type: "string",
      description: "Seller location"
    },
    image_url: {
      type: "string",
      description: "Flower image"
    },
    status: {
      type: "string",
      enum: [
        "active",
        "sold",
        "cancelled"
      ],
      "default": "active"
    },
    contact_phone: {
      type: "string"
    },
    seller_name: {
      type: "string"
    }
  },
  required: [
    "title",
    "flower_type",
    "price",
    "listing_type"
  ]
};