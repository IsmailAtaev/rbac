// import { ZodError } from 'zod';

// export class ZodValidationException extends Error {
//     public statusCode: number;
//     // public errors: ZodError['errors'];

//     constructor(errors: ZodError['errors']) {
//         super('Validation failed');
//         this.name = 'ZodValidationException';
//         this.statusCode = 400;
//         this.errors = errors;

//         Object.setPrototypeOf(this, ZodValidationException.prototype);
//     }
// }

import createHttpError from 'http-errors';
import { ZodError } from 'zod';

export const err = createHttpError;

export const zodValidationErrorHandler = (error: unknown) => {
    if (error instanceof ZodError) {
        const message = error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
        throw err.BadRequest(message || 'Validation failed');
    }
    throw error;
};

export const errorUtil = {
    err,
    zodValidationErrorHandler,
};
