# slash-ourbot
Code and instructions for creating a Slash slash command with AWS Lambda

Go to the AWS Lambda page.

Click the "Create a Lambda function" button.

Select the "slack-echo-command" (Node.js 4.3) blueprint.

In the "Configure triggers" section, AWS offers to set up an API Gateway.  Set API name to something like "slack_bot".  Set Security to "Open".  You'll get a message, "Warning: Your API endpoint will be publicly available and can be invoked by all users," which is expected.

In the "Configure function" section, set the function name to something that refers to your slash command, like "slack_echo".

See the `index.js` file for the modified function source.

Set Handler to "index.handler".

For Role, choose "Create new role from template(s)" (unless you have an appropriate Lambda role already).

For Role name, enter something like "lambda-execute".

Leave "Policy templates" blank.

Go to the API Gateway page.

Click on your "slack_bot" API.

In the "/slack_echo" resource, delete the "ANY" method, then create a "POST" method.

Choose Integration type = "Lambda Function", Use Lambda Proxy integration = checked, and Lambda Region = same region as your function.  Set Lambda Function to your "slack_echo" name.

If you did not check "Use Lambda Proxy integration", your "Method Execution" layout will show a live link for "Integration Response", with "HTTP status pattern" and "Output passthrough: Yes" in the box.  To fix this, click "Integration Request" and check "Use Lambda Proxy integration".  Confirm that you you want to switch to a Lambda Proxy integration.

In your Slack management page, go to Build, then Make a Custom Integration, then Slash Commands.  Set up your command, something like "/echo".

Copy the API URL root from the API Dashboard page in AWS, append the resource name, and post in the "URL" box on the Slack page.

Leave the Slack Method as "POST".

Copy the Token, and add it to the Lambda function.

Deploy the API.  YOU HAVE TO DO THIS EVERY TIME YOU MAKE CHANGES TO THE API GATEWAY SETTINGS, or they won't be made live.
