const { promisify } = require('util');
const ENV = require('../../config/ENV');
// Load the SDK for JavaScript
const AWS = require('aws-sdk');

const {
  AWS_REGION,
  AWS_KEY_ID,
  AWS_SECRET,
  AWS_DYNAMO_API_VERSION,
} = ENV;

// Set the region
AWS.config.update({
  accessKeyId: AWS_KEY_ID, secretAccessKey: AWS_SECRET, region: AWS_REGION,
});

class VideoDao {
  constructor() {
    this.dynamoDb = new AWS.DynamoDB({ apiVersion: AWS_DYNAMO_API_VERSION });
    this.dynamoDb.promiseScan = promisify(this.dynamoDb.scan);
  }

  async findAll() {
    const params = {
      TableName: 'bennutv-vod-poc',
      FilterExpression: 'workflowStatus = :status',
      ExpressionAttributeValues: {
        ':status': {
          S: 'complete',
        },
      },
      ProjectionExpression: 'guid, srcVideo, hlsUrl, dashUrl',
      // ExpressionAttributeNames: {
      //   // guid: 'guid',
      //   srcVideo: 'srcVideo',
      //   hlsUrl: 'hlsUrl',
      //   dashUrl: 'dashUrl',
      // },
    };
    const results = await this.dynamoDb.promiseScan(params);
    console.log('results=', results);
    return this.convertItems(results.Items);
  }

  convertItems(items = []) {
    return items.map((i) => {
      const newItem = {};
      Object.entries(i).forEach(([key, val]) => {
        newItem[key] = val.S;
      });
      return newItem;
    });
  }
}

module.exports = new VideoDao();
