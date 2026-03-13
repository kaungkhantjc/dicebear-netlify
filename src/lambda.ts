import awsLambdaFastify from '@fastify/aws-lambda';
import { app as createApp } from './app.js';

let proxy: any;

export const handler = async (event: any, context: any) => {
    // Cache the proxy across warm starts for better performance
    if (!proxy) {
        const app = await createApp();
        proxy = awsLambdaFastify(app);
    }
    return proxy(event, context);
};