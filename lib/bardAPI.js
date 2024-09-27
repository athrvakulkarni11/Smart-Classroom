import { BardAPI } from 'bard-api-node';


async function Assistant(message) {
  try {
    const bard = new BardAPI();
    const apiKey = 'Place_Your_API_KEY_HERE'; // Replace with your actual API key

    await bard.initializeChat(apiKey);
    const response = await bard.getBardResponse(message);

    return response.text;
  } catch (error) {
    console.error('Error:', error);
    if (error.message.includes('429')) {
      return 'The API quota has been exhausted. Please try again later.';
    }
    return 'An error occurred while processing the request.';
  }
}

export { Assistant };
