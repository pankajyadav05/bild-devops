const cdk = require("aws-cdk-lib");
const { CdkStack } = require("../lib/cdk-stack");

const app = new cdk.App();
new CdkStack(app, "CdkStack", {
  env: {
    region: process.env.AWS_REGION,
  },
});
