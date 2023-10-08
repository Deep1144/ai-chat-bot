import { Request, Response } from "express";
import { openai } from "../core/openAI";
import { stringToResponseOptions } from "../core/helpers";
import { ChatCompletion } from "openai/resources/chat";

export async function chatController(req: Request, res: Response) {

  const { chats = [] } = req.body;

  let gptResponse: {
    data: ChatCompletion;
    response: globalThis.Response;
  };
  try {
    gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a AI design partner. You can help with crafting layouts from scratch to generating original content.",
        },
        ...chats,
      ],
    }).withResponse();
    console.log('gptResponse', gptResponse.response.headers)
  } catch (error) {
    return res.status(500).json({
      error: error?.message,
      message: 'Something went wrong'
    })
  }


  let quickReplies = []
  try {
    const result2 = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that can generate quick replies.",
        },
        ...chats,
        {
          role: 'assistant',
          content: gptResponse.data['choices'][0]['message']['content'],
        },
        {
          role: "user",
          content: `What are some quick replies to the last response from assistant, that I can use as quick reply? use lang from last response`,
        },
      ],
    });

    quickReplies = stringToResponseOptions(result2.choices[0].message.content);
  } catch (error) {
    console.log('Error quick reply', error)
  }

  const headers = gptResponse.response.headers;

  const response = {
    output: gptResponse?.data?.choices?.[0],
    quick_replies: quickReplies.slice(0, 2),
  }

  if(headers) { 
    response['ratelimit']= {
      'x-ratelimit-limit-requests': headers.get('x-ratelimit-limit-requests'),
      'x-ratelimit-limit-tokens': headers.get('x-ratelimit-limit-tokens'),
      'x-ratelimit-remaining-requests': headers.get('x-ratelimit-remaining-requests'),
      'x-ratelimit-remaining-tokens': headers.get('x-ratelimit-remaining-tokens'),
    }
  }
  return res.json(
    response
  );
}
