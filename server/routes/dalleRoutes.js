import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
// import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const options = {
        method: 'POST',
        url: 'https://text-to-image-dalle.p.rapidapi.com/generate/reality',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPIDAPI_API_KEY,
          'X-RapidAPI-Host': 'text-to-image-dalle.p.rapidapi.com'
        },
        data: {text_query: prompt}
      };


    const response = await axios.request(options);
    
    console.log(response.data);

    const image = response.data;

    console.log(image);
    res.status(200).json({ photo: image });
  } 
  catch (error) {
    console.error(error);
    res.status(500).send(
        error?.response.data.error.message || 'Something went wrong'
    );
  }
});

export default router;