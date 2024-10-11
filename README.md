# Yash's Chatapp

<p align="center">
  <a href="https://github.com/Yash456k/SocketIO-MERN-chatApp">
    <img src="https://github.com/user-attachments/assets/08063af3-f8ec-4156-8755-4a965683fc56" alt="ChatApp Logo" width="660" height="280">
  </a>

  <h3 align="center">Yash's Chatapp</h3>

  <p align="center">
    A real-time chat application built with the MERN stack and Socket.IO
    <br />
    <br />
    <br />
    <a href="https://socket-io-mern-chat-app.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/Yash456k/SocketIO-MERN-chatApp/issues">Report Bug</a>
    ·
    <a href="https://github.com/Yash456k/SocketIO-MERN-chatApp/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Demo Screenshots](#demo-screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About The Project



SocketIO-MERN-ChatApp is a modern, real-time chat application built using the MERN (MongoDB, Express, React, Node.js) stack and Socket.IO. It allows users to communicate instantly. This is a project I made to just understand how to make and deploy fullstack applications. If you find any bugs feel free to approach me on any social media platform. I know the code is a bit messy 😅 but any feedback is welcome.


Please check it out and message me by following the instructions mentioned here : [Usage](#usage)
### Built With

* [MongoDB](https://www.mongodb.com/)
* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/)
* [Socket.IO](https://socket.io/)
* [Vite](https://vitejs.dev/)
* [Firebase](https://firebase.google.com/)
* [Google Gemini API](https://ai.google.dev/)

## Features

* Real-time messaging with other users using Socket.IO
* User authentication with JWT
* Google OAuth 2.0 for signup / login
* Clean interface for chatting, with realtime sidebar updates and message updates
* Chat with Google Gemini API within the chat's interface
* Firebase integration for authenticating users ( login / signup only )

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* MongoDB (Make sure you have MongoDB installed and running on your machine)
* Google Gemini API key
* Firebase project setup

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Yash456k/SocketIO-MERN-chatApp.git
   ```
2. Install NPM packages for both server and client
   ```sh
   cd SocketIO-MERN-chatApp
   npm install
   cd client
   npm install
   ```
3. Create `.env` files in both the root directory and the client directory. Add your environment variables:

   For the backend (root directory):
   ```
   PORT=4000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

   For the frontend (client directory):
   ```
   VITE_GEMINI_API=your_gemini_api_key
   VITE_FIREBASE_API=your_firebase_api_key
   VITE_FIREBASE_DOMAIN=your_firebase_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

4. Start the development server
   ```sh
   npm run dev
   ```

## Usage


Follow these steps to get started with the project:

1. **Registration and Login**
   - Visit the [website](https://socket-io-mern-chat-app.vercel.app/).
   - Either register by creating a new account or use google OAuth to login via google ( recommended )

2. **Adding a Contact**
   - After logging in, you'll see your chat dashboard.
   - Look for the "Add / Find user" button.
<br/>

![image](https://github.com/user-attachments/assets/0a984f5a-6351-48b3-b09b-aa65e042c880)
   - Enter the username "yash456k" or the email "yash456k@gmail.com" in the search field.
   - Click on the search result to add me as a contact.


3. **Starting a Conversation**
   - From your contacts list, find and click on "yash456k" ( with the email "yash456k@gmail.com" ).
   - This will open the chat with me on the right side of the sidebar.
   - Type your message in the chat input field and press enter or click the send button.
   - You should see your message appear in the chat window in real-time.

4. **Testing Real-Time Messaging**
   - If I am online, you may receive a response. In the mean time you can test it out with google gemini.

5. **Using the Gemini AI Interface**
   - Look for a special chat option or button labeled "Gemini AI" or similar.
   - Click on this to start a conversation with the Gemini AI interface.
   <br>

   ![image](https://github.com/user-attachments/assets/c10008cf-a1d3-434c-a019-453c072e04c1)

   - Type your questions or prompts as you would in a normal chat.
   - The Gemini AI will respond, demonstrating its capabilities.

> [!WARNING]  
> Due to the gemini model being powered by the free tier provided in the API, you may not get a response sometimes. This is because of the message quota being exhausted.

   


## Demo Screenshots

![image](https://github.com/user-attachments/assets/e1bfcd05-dc0b-4447-9071-fa14aafe6e67)
![image](https://github.com/user-attachments/assets/84019a7f-59e6-4cef-89b2-15e4f2ed024c)
![image](https://github.com/user-attachments/assets/3b15937a-b18e-4eab-99b1-708f280c68d6)

## Contributing

Any contributions to this project are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License . See [LICENSE](https://github.com/Yash456k/SocketIO-MERN-chatApp/blob/main/LICENSE) for more information.

## Contact

Contact me - [Twitter](https://x.com/yash654k) - yash456k@gmail.com

Project Link: [https://github.com/Yash456k/SocketIO-MERN-chatApp](https://github.com/Yash456k/SocketIO-MERN-chatApp)

## Acknowledgements

Me - I made this shit brick by brick
