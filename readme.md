Frontend: React, tailwind
<br />
Backend: Nodejs (Node version: 18.17.1)

Backend url: https://ai-bot-be.onrender.com/
<br />
Frontend url: https://effortless-sprinkles-19f01c.netlify.app/


## How to run the project

#### Frontend: 
- Run `yarn` to install dependencies.
- Run `npm run dev` to start the development server.


#### Backend: 
- Run `yarn` to install dependencies.
- Rename `.env.sample` to `.env`.
- Update `OPENAI_API_KEY` to your API key.
- Run `npm run dev` to start the development server.

## Features


### Chatbot UI
- Implement the UI for the chatbot in React. ✅
- Implement functionality to collapse and expand the chatbot modal. ✅
- Implement a keyboard shortcut to trigger the opening of the chatbot modal. ✅

### OpenAI Integration
- Integrate OpenAI's GPT-based model to handle the chat. ✅
- Implement a mechanism to call the API, send user messages, and receive AI messages. ✅

### Typing Effect
- Display a typing effect in the UI when the AI is generating a response. ✅
- AI Suggested Actions ✅
- After each interaction, provide suggested actions that a user can click on for quick replies. ✅


### Error Handling
- Implement mechanisms to deal with unrecognized or ambiguous queries. Offer the user guidance or clarification prompts as necessary. ✅

### Testing
- Create multiple test cases to validate the reliability and accuracy of your implemented chatbot feature.

### Optional
- Rate limiting for OpenAI API calls. ✅ (Showing rate limit details on the UI)
- Add support for multiple languages. ✅

