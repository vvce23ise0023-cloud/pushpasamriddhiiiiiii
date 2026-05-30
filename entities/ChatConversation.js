export const ChatConversationSchema = {
  name: "ChatConversation",
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Conversation title"
    },
    messages: {
      type: "array",
      items: {
        type: "object",
        properties: {
          role: {
            type: "string"
          },
          content: {
            type: "string"
          },
          timestamp: {
            type: "string"
          },
          image_url: {
            type: "string"
          }
        }
      }
    },
    last_message: {
      type: "string"
    }
  },
  required: [
    "title"
  ]
};