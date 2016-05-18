'use strict';

const Joi = require('joi');


exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: false,
            handler: (request, reply) => {

                // This should be censored

                request.server.log(['info'], { id: 'some-uuid', password: 'supersecret' });

                return reply({ ver: process.env.npm_package_version });
            },
            validate: {
                options: {
                    abortEarly: false,
                    stripUnknown: true
                },
                payload: false
            },
            response: {
                schema: {
                    ver: Joi.string().regex(/[0-9]+(\.[0-9]+)*/).required()
                },
                modify: true,
                options: {
                    stripUnknown: true
                }
            }
        }
    });

    return next();
};


exports.register.attributes = {
    name: 'info'
};
