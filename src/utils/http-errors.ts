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