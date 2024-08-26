
---

# URL Shortener Microservice

This project is a URL Shortener Microservice built using Node.js and Express.js. It allows users to submit a URL, which will be shortened and stored. Users can then use the shortened URL to be redirected to the original URL. This microservice is part of the freeCodeCamp curriculum, demonstrating how to handle URL validation, storage, and redirection using a RESTful API.

## Features

- **URL Shortening**: Submit a valid URL to receive a shortened URL that can be used to access the original link.
- **Redirection**: Enter a shortened URL to be redirected to the original URL.
- **Validation**: Only accepts properly formatted URLs that can be resolved using DNS.
- **Error Handling**: Provides appropriate error messages for invalid URLs or when a shortened URL cannot be found.

## Endpoints

### 1. POST `/api/shorturl`

- **Description**: Accepts a URL to be shortened and returns a JSON object containing the original URL and a short URL.
- **Request Body**: Must include a form field named `url` with the URL to be shortened.
- **Response**: Returns a JSON object:
  - On success: `{ "original_url": "https://example.com", "short_url": 1 }`
  - On error (invalid URL): `{ "error": "invalid url" }`

### 2. GET `/api/shorturl/:short_url`

- **Description**: Redirects to the original URL associated with the given short URL.
- **Response**:
  - On success: Redirects the user to the original URL.
  - On error (short URL not found): `{ "error": "No short URL found for the given input" }`

### 3. GET `/api/hello`

- **Description**: A simple test endpoint to ensure the API is working correctly.
- **Response**: Returns a JSON object: `{ "greeting": "hello API" }`

## How to Use

1. **Submit a URL for Shortening**: Send a POST request to `/api/shorturl` with the URL you want to shorten.
2. **Get the Shortened URL**: Receive a JSON response containing the original and shortened URLs.
3. **Access the Original URL**: Use the shortened URL (e.g., `/api/shorturl/1`) to be redirected to the original link.

## Project Structure

- **`index.js`**: Main application file that sets up the Express server, routes, and middleware.
- **`public/`**: Directory for static files (e.g., CSS, client-side JavaScript).
- **`views/`**: Directory containing the HTML files served by the server.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- npm (Node Package Manager) to install dependencies.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/url-shortener-microservice.git
    cd url-shortener-microservice
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of your project and set the PORT variable (optional):

    ```plaintext
    PORT=3000
    ```

4. Start the server:

    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000` to see the application.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the API.
- **CORS**: Middleware for enabling CORS (Cross-Origin Resource Sharing).
- **body-parser**: Middleware for parsing request bodies.
- **dotenv**: Module to load environment variables from a `.env` file.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgments

- This project is part of the freeCodeCamp curriculum.
- Thanks to the freeCodeCamp community for their guidance and support.

---

