const axios = require('axios');

const baseUrl = process.env.BASE_URL;
const username = process.env.API_KEY;
const password = process.env.SECRET_KEY;

const callApi = async ({ endpoint, method, headers = {}, params = {}, body = {} }) => {
  try {
    const url = `${baseUrl}/${endpoint}`;
    const options = {
      url,
      method,
      headers,
      params,
      data: body,
    };
    options.auth = { username, password };

    console.log(options);

    const response = await axios(options);
    return response;
  } catch (error) {
    console.error(`Error calling API: ${error.message}`);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Status code:', error.response.status);
    }
    throw error;
  }
};

module.exports = { callApi };
