# protect_branch_sample

## Installing Required Modules:

Install the Express and Octokit modules using the following command:

```bash
npm install express body-parser octokit
```

## Running the Code:

After saving the code, start the server with the following command:

```bash
node your-filename.js
```

Here, `your-filename.js` is the name of the JavaScript file you saved.

## Configuring the Public URL:

In the Webhook settings, specify the public URL of this service (`http://your-server-ip:3000/webhook`). If you are running this service locally, you can also use tools like ngrok to expose the local server.

Now, when a repository is created on GitHub, the webhook triggers, and the service protects the main branch of the repository and notifies issues in the repository.
