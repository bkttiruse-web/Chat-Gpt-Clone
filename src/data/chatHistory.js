export const chatHistory = {
  title: "Greeting and Check-in",

  conversation_id: "6a70f200-569c-83ea-8d18-af32ff00a7b0",

  mapping: {
    "client-created-root": {
      id: "client-created-root",
      message: null,
      parent: null,
      children: ["6a748b4a-880f-45e8-a621-8394aa34cbab"],
    },

    "6a748b4a-880f-45e8-a621-8394aa34cbab": {
      id: "6a748b4a-880f-45e8-a621-8394aa34cbab",

      message: {
        id: "6a748b4a-880f-45e8-a621-8394aa34cbab",

        author: {
          role: "user",
        },

        content: {
          content_type: "text",
          parts: ["Hi"],
        },
      },

      parent: "client-created-root",
      children: ["a291447c-0d80-4998-baf0-14aca411be06"],
    },

    "a291447c-0d80-4998-baf0-14aca411be06": {
      id: "a291447c-0d80-4998-baf0-14aca411be06",

      message: {
        id: "a291447c-0d80-4998-baf0-14aca411be06",

        author: {
          role: "assistant",
        },

        content: {
          content_type: "text",
          parts: [
            "Hi Biruck! 👋 Good to see you. How’s it going? What are you working on today?",
          ],
        },
      },

      parent: "6a748b4a-880f-45e8-a621-8394aa34cbab",
      children: [],
    },
  },
};
