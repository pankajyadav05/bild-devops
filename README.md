<div align="center">
	<a target="_blank" href="https://gitforcetalent.com">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://gitforcetalent.com/_next/image?url=%2Fimages%2Flogo-light.png&w=1920&q=75">
            <source media="(prefers-color-scheme: light)" srcset="https://gitforcetalent.com/_next/image?url=%2Fimages%2Flogo.png&w=1920&q=75">
            <img alt="https://gitforcetalent.com" src="https://gitforcetalent.com/_next/image?url=%2Fimages%2Flogo.png">
        </picture>
	</a>
    <br />
    <br />
</div>

---

---

# Deploy Serverless Authentication API using AWS CDK and SST

Create and deploy a simple AWS infrastructure using AWS CDK and SST. The task involves:

1. Define the DynamoDB table

2. Create Lambda functions

3. Set up API Gateway:

   - Define the API Gateway
   - Create routes for the Lambda functions

4. Deploy the first stack:

   - Configure & Deploy the first stack in the SST & CDK configuration file

5. Create the second stack:

   - Create a new stack file
   - Retrieve the API URL from the first stack's output
   - Store the API URL in an environment variable named `API_URL`

6. Deploy the second stack:
   - Configure & Deploy the second stack in the SST & CDK configuration file

## Features

- User signup
- User login
- JWT-based authentication

## Prerequisites

- Node.js (v14 or later)
- AWS CLI & CDK configured with appropriate credentials
- SST CLI (`npm install -g sst`)

## Setup

1. Clone the repository:

   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```
   npm install
   ```

## Project Structure

```
project-root/
├── bin/
│   └── cdk.js
├── src/
│   ├── auth.js
│   ├── signup.js
│   ├── login.js
│   └── utils.js
├── lib/
│   └── cdk-stack.js
├── stacks/
│   └── MyStack.js
├── package.json
├── cdk.json
├── sst.config.js
└── .env
```

## Usage

After deployment, you'll receive an API endpoint. Use this to make requests:

- Signup: `POST /signup`
- Login: `POST /login`

Example:

```
curl -X POST https://your-api-endpoint/signup -d '{"username":"user1","password":"password123"}'
```
