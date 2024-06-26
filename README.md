# SS Music

SS Music is a web application for music streaming where users can upload songs, listen to them, and manage their playlists. The project is built using Vite, React, and Firebase.

## Features

- **User authentication**: Users can sign up, log in, and log out securely using Firebase authentication.
- **Song upload**: Authenticated users can upload their songs along with relevant information such as song name, artist name, and description.
- **Music streaming**: Users can listen to uploaded songs directly on the website.
- **Responsive design**: The application is designed to work seamlessly across various devices, including desktops, tablets, and mobile phones.

## Technologies Used

- **Vite**: A fast build tool for modern web development, used for setting up the project.
- **React**: A JavaScript library for building user interfaces, used for developing the frontend of the application.
- **Firebase**: A comprehensive platform provided by Google for building web and mobile applications, used for user authentication, database storage, and file storage.

![SS Music Homepage](ssmusic-homepage.png)


## Getting Started

To get started with SS Music, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd ssmusic
## Install dependencies:

    ```bash
    npm install 
    ```
    
## Set up Firebase:

- Create a Firebase project in the Firebase Console.
- Enable Authentication, Firestore, and Storage services.
- Copy your Firebase configuration (apiKey, authDomain, projectId, etc.) from the Firebase Console.
- Create a .env file at the root of the project and add your Firebase configuration:
    ```bash
    VITE_FIREBASE_API_KEY=your-api-key
    VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
    VITE_FIREBASE_PROJECT_ID=your-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    VITE_FIREBASE_APP_ID=your-app-id

Once you've completed these steps, you're ready to launch SS Music and enjoy the ultimate music streaming experience!

**Hosted Address:** [SS Music on Firebase](https://ss-music-test.firebaseapp.com/)


## Contribution
Contributions to SS Music are welcome! If you have any suggestions, feature requests, or bug reports, please feel free to create an issue or submit a pull request.

## License
This project is licensed under the MIT License.