# Project: Angular + Firebase Authentication App

This project presents an Angular application designed to provide a secure method for users to reset their passwords and verify their email addresses for a Firebase project. It utilizes Firebase's Authentication services to ensure security and optimize performance.

## Features
- Password reset via Firebase 
- Email verification via Firebase

## Installation

### Prerequisites
Ensure the following tools are installed on your system:

- Node.js (v16.0.0 or newer)
- npm (v8.0.0 or newer)
- Angular CLI (v15.0.0 or newer)
- Firebase CLI (v11.0.0 or newer)

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/Mondieki/firebase-reset-password-verify-email.git
cd firebase-reset-password-verify-email
```

2. Install the dependencies:
```bash
npm install
```

3. Set up Firebase:
- In your Firebase console, select the project.
  - If a project has not been created yet, you can create a new one on the Firebase console.
- Ensure that email authentication is enabled.
  - If not already enabled, activate the *Email/Password* authentication under 'Authentication' > 'Sign-in method'.
- Copy your web application's Firebase configuration object.

4. Configure the environment:
- Paste the copied Firebase configuration object into `src/environments/environment.ts` as `firebaseConfig`.
```javascript
export const environment = {
  ...
  firebaseConfig: {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
  },
  ...
};
```

5. Customize the web application:
- Replace the favicons with your own. Remember to update the `src/favicon.ico` file as well.
- Swap the background image `src/assets/img/bg00.webp` with an image of your choice.
- Replace all occurrences of `site_id` with your specific site id. The site id is either 
    - `SITE_ID.web.app`
    - `SITE_ID.firebaseapp.com`
- Replace all occurrences of `project_id` with your Firebase project's ID.
  - Your project's `PROJECT_ID` can be located as the key-value pair of `projectId` in your Firebase configuration object.
- Refactor the meta tags in `src/index.html` to match your application's details.

6. Launch the application:
```bash
ng serve
```

## Usage

- The application operates on `http://localhost:4200` by default.

## Testing

Assume your Firebase link is `https://myapp.firebaseapp.com/__/auth/action` and you desire `https://auth.mydom.com/action`.

1. Create a CNAME in your domain (mydom.com) with the *name* set as `auth` and the *value* as `myapp.firebaseapp.com`.

2. Navigate to your Firebase Project -> Authentication -> Templates (Tab on top of the page) -> Click on the edit (pencil icon) button -> Select any template -> Click the 'Edit template' (pencil icon) button -> Customize action URL (at the bottom)-> Replace `https://myapp.firebaseapp.com/__/auth/action` with `https://auth.mydom.com/action`.
 - For testing in your local environment, change the action URL to `http://localhost:4200/action`.

3. Adjust the `authDomain` in the Firebase configuration object within your `src/environments/environment.prod.ts`.

## Deployment

To deploy this Angular application to Firebase hosting, execute:
```bash
ng deploy
```

## Suggestions

Consider optimizing your CSS by trimming down or removing unused styles from `src/assets/css/main.css`.

## License

This project is licensed under the MIT License - refer to the [LICENSE](https://github.com/Mondieki/firebase-reset-password-verify-email/blob/main/LICENSE) file for more details.