import awsLambdaFastify from '@fastify/aws-lambda';
import { app as createApp } from './app.js';

let proxy: any;

export const handler = async (event: any, context: any) => {
    // Cache the proxy across warm starts for better performance
    if (!proxy) {
        const app = await createApp();
        app.addHook('onSend', (request, reply, payload, done) => {
            reply.header('Cache-Control', 'public, max-age=31536000, immutable');
            reply.header('CDN-Cache-Control', 'public, durable, s-maxage=31536000, stale-while-revalidate=604800');
            reply.header('Netlify-CDN-Cache-Control', 'public, durable, s-maxage=31536000, stale-while-revalidate=604800');
            done();
        });
        proxy = awsLambdaFastify(app);
    }
    return proxy(event, context);
};