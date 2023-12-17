# protect_branch_sample


## Summary:
Create code in Node.js to listen to events using GitHub Webhooks. The code protects the main branch when a repository is created and notifies the repository's issues about the protection summary.

To use the code, you need to configure a GitHub webhook and send events to the exposed URL.

## Installing Required Modules:

Install the Express and Octokit modules using the following command:

```bash
npm install express body-parser octokit
```

## Create the code:
[Sample code](https://github.com/hayatoshi-testorg/protect_branch_sample/blob/main/protect_main_branch.js)  
The source code summary is that once the Repository's created event is detected via webhook, the following two APIs are called to protect the main branch and create an Issue.  

API Documentation:   
https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28#update-branch-protection  
https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#create-an-issue  

## Running the Code:

After saving the code, start the server with the following command:

```bash
node your-filename.js
```

Here, `your-filename.js` is the name of the JavaScript file you saved.

## Configuring the Public URL:

In the Webhook settings, specify the public URL of this service (`http://your-server-ip:3000/webhook`). If you are running this service locally, you can also use tools like ngrok to expose the local server.

Now, when a repository is created on GitHub, the webhook triggers, and the service protects the main branch of the repository and notifies issues in the repository.

## Exposing a Locally Running Server using ngrok:

### Installing ngrok:
Install ngrok by downloading it from the official website ([https://ngrok.com/](https://ngrok.com/)). After downloading, extract it to the appropriate directory.

### Creating an ngrok Account:
To use ngrok, you need to create an account. Access the official website and create an account.

### ngrok Authentication:
Navigate to the directory where ngrok is extracted using the console or terminal, and authenticate ngrok by executing the following command:

```bash
./ngrok authtoken YOUR_NGROK_AUTH_TOKEN
```

`YOUR_NGROK_AUTH_TOKEN` is the authentication token obtained from the ngrok dashboard.

### Exposing the Local Server with ngrok:
Execute the following command in the console or terminal to expose the local server:

```bash
./ngrok http 3000
```

The above command assumes that the local server is running on port 3000. If the port number is different, please adjust accordingly.

After execution, ngrok will display the exposed URL. Use this URL in the Webhook settings.

### GitHub Webhook Configuration:
In the target repository on GitHub, go to Settings > Webhooks > Add webhook and configure the following settings:

- **Payload URL:** ngrok-exposed URL (e.g., `https://xxxxxx.ngrok.io/webhook`)
- **Content type:** `application/json`
- **Secret:** (if necessary)
- **SSL verification:** Uncheck (since ngrok exposes using HTTPS)

After adding or updating the webhook, GitHub events will be sent to the URL exposed by ngrok.
