export const ArticleSchema = {
  name: "Article",
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Article title"
    },
    title_hi: {
      type: "string",
      description: "Title in Hindi"
    },
    title_kn: {
      type: "string",
      description: "Title in Kannada"
    },
    title_ta: {
      type: "string",
      description: "Title in Tamil"
    },
    title_mr: {
      type: "string",
      description: "Title in Marathi"
    },
    content: {
      type: "string",
      description: "Article content in English"
    },
    content_hi: {
      type: "string",
      description: "Content in Hindi"
    },
    summary: {
      type: "string",
      description: "Brief summary"
    },
    category: {
      type: "string",
      enum: [
        "cultivation",
        "pest_management",
        "government_scheme",
        "organic_farming",
        "seasonal_tips",
        "disease_prevention",
        "news"
      ],
      "description": "Article category"
    },
    flower_type: {
      type: "string",
      description: "Related flower type (rose, marigold, jasmine, etc.)"
    },
    image_url: {
      type: "string",
      description: "Cover image URL"
    },
    is_featured: {
      type: "boolean",
      default: false
    },
    is_news: {
      type: "boolean",
      default: false
    },
    tags: {
      type: "array",
      items: {
        type: "string"
      }
    }
  },
  required: [
    "title",
    "category"
  ]
};