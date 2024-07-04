import axios from "axios";

export async function handler(event) {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) throw new Error("API_URL environment variable is not set");

  const credentials = {
    username: "bild",
    password: "123456",
  };

  try {
    const response = await axios.post(`${apiUrl}/login`, credentials);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Login successful",
        token: response.data.token,
        userId: response.data.userId,
      }),
    };
  } catch (error) {
    const status = error.response?.status || 500;
    const message = axios.isAxiosError(error)
      ? "Login failed"
      : "Internal server error";
    const errorData = error.response?.data || "Unknown error occurred";

    return {
      statusCode: status,
      body: JSON.stringify({
        message,
        error: errorData,
      }),
    };
  }
}
