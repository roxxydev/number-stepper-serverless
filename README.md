A Google cloud function that sends email when a certain condition set occured.

### Prerequisite
- Google Firebase Project
- Mailgun account (with whitelisted recipient email added for testing)
- Mailgun Sending API key

### Setup

- Install firebase CLI in your machine
```
npm install firebase-functions@latest firebase-admin@latest --save
```
and
```
npm install -g firebase-tools
```
- Login to your Firebase CLI by running `firebase login`.
- Now in your Firebase Console, go to Firestore Database and create a collection named `Number`.
- Add document and create following field:
  ```
  field: name
  type: string
  value: number

  field: value
  type: number
  value: 0
  ```
- Once done, you'll have to setup the firebase config the cloud function will use. Run
```sh
firebase functions:config:set numberservice.mailgun_api_key="your mailgun sending api key" numberservice.mailgun_domain="your mailgun domain" numberservice.mailgun_recipient="your whitelisted mailgun recipient"
```

### Deployment

To deploy your changes in your cloud function, you can run the command
```
firebase deploy --only functions
```

### Running

To manually test the cloud function, you can try updating number value of the document by multiple of 10 in Firestore and check the Cloud Function log to see event. You can also check your inbox or spam of the added whitelisted email in Mailgun to check for any email sent by the cloud function.
