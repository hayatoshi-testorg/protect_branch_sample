import express from 'express';
import bodyParser from 'body-parser';
import { Octokit, App } from "octokit";

const app = express();
const port = 3000; // Change the port number as needed

app.use(bodyParser.json());

// Set GitHub API token
const githubToken = ''; // Set your GitHub personal access token

// Create Octokit client
const octokit = new Octokit({ auth: githubToken });

app.post('/webhook', async (req, res) => {
    const data = req.body;

    // Detect repository creation event
    if (data && data.action === 'created' && data.repository) {
        const repositoryName = data.repository.name;
        const mainBranchName = 'main'; // Main branch name (default is 'main')
        try {
            await notifyRepositoryIssueBefore(repositoryName, mainBranchName);
 
            // Protect the Main Branch
            await protectMainBranch(repositoryName, mainBranchName);

            await notifyRepositoryIssue(repositoryName, mainBranchName);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
            return;
        }
    }

    res.status(200).send('Webhook received successfully from index.js');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

async function notifyRepositoryIssueBefore(repositoryName, mainBranchName) {
    // Create the notification message
    const message = `Main branch '${mainBranchName}' will start to be protected`;

    // Send a request to GitHub API to add a comment to the issue
    await octokit.request("POST /repos/{owner}/{repo}/issues", {
        owner: "<set owner>", // Set your owner
        repo: repositoryName,
        title: 'notifyRepositoryIssue',
        body: message
    });
}

async function notifyRepositoryIssue(repositoryName, mainBranchName) {
    // Create the notification message
    const message = `Main branch '${mainBranchName}' has been protected.`;

    // Send a request to GitHub API to add a comment to the issue
    await octokit.request('POST /repos/{owner}/{repo}/issues/1/comments', {
        owner: "<set owner>", // Set your owner
        repo: repositoryName,
        title: 'notifyRepositoryIssue',
        body: message
    });
}

async function protectMainBranch(repositoryName, mainBranchName) {
    // Send a request to GitHub API to protect the Main Branch
    await octokit.request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
        owner: "hayatoshi-testorg",
        repo: repositoryName,
        branch: mainBranchName,
        headers: {
            'Accept': 'application/vnd.github.luke-cage-preview+json' // Preview header for the required_pull_request_reviews parameter
        },
        required_status_checks: null,
        enforce_admins: true,
        required_pull_request_reviews: null,
        restrictions: null
    });
}
