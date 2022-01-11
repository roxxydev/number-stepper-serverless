A Google cloud function that sends email when number is a multiple of 10.

### Prerequisite
- Google Firebase Project
- Web app project in the created Google Firebase Project
- Mailgun account (with whitelisted recipient email added for testing)
- Mailgun Sending API key

### Setup
- Create account in Mailgun
- Enable Cloud Firestore API through the [Cloud API Manager](https://console.cloud.google.com/projectselector/apis/api/firestore.googleapis.com/overview)
- Create `.env` file under `app` folder which contains the following environment name and the [Firebase config object](https://firebase.google.com/docs/web/learn-more#config-object) values in your Firebase web app project under [Project Settings](https://support.google.com/firebase/answer/7015592).
```env
API_KEY
AUTH_DOMAIN
PROJECT_ID
STORAGE_BUCKET
MESSAGING_SENDER_ID
PROJECT_ID
```
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
or you can simply create a file named `env.json` under `functions` folder with the following object fields
```json
{
  "numberservice": {
    "mailgun_domain": "your mailgun domain here",
    "mailgun_recipient": "your whitelisted mailgun recipient",
    "mailgun_api_key": "your mailgun sending api key"
  }
}
```
then run
```
firebase functions:config:set numberservice="$(cat env.json)"
```

### Deployment

To deploy your changes in your cloud function, you can run the command
```
firebase deploy --only functions
```

### Running

To manually test the cloud function, you can try updating number value of the document by multiple of 10 in Firestore and check the Cloud Function log to see event. You can also check your inbox or spam of the added whitelisted email in Mailgun to check for any email sent by the cloud function.

To run the web app, you can simply run `npm start` command under `app` folder.
