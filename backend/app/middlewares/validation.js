const Joi = require('joi');

const schemas = {
    register: Joi.object({
        firstName: Joi.string().required().trim(),
        lastName: Joi.string().required().trim(),
        email: Joi.string().email().required().trim(),
        mobileNumber: Joi.string().pattern(/^[0-9]{10}$/).optional(),
        password: Joi.string().min(6).required()
    }),
    
    login: Joi.object({
        email: Joi.string().email().required().trim(),
        password: Joi.string().required()
    }),

    updateStudent: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        mobileNumber: Joi.string().pattern(/^[0-9]{10}$/),
        dateOfBirth: Joi.date(),
        gender: Joi.string(),
        linkedinProfile: Joi.string().uri(),
        githubProfile: Joi.string().uri(),
    }).or( 'firstName', 'lastName', 'email', 'mobileNumber', 'dateOfBirth', 'gender', 'linkedinProfile', 'githubProfile' ),

    updateRecruiter: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        mobileNumber: Joi.string().pattern(/^[0-9]{10}$/),
        companyName: Joi.string(),
        linkedinProfile: Joi.string().uri(),
    }).or( 'firstName', 'lastName', 'email', 'mobileNumber', 'companyName', 'linkedinProfile' ),

};

const validateRequest = (schemaName) => {
    return (req, res, next) => {
        const schema = schemas[schemaName];    
        if (!schema) {
        return res.status(500).json({
            message: `No validation schema found for ${schemaName}`
        });
        }

        const { error, value } = schema.validate(req.body, {
        abortEarly: false, 
        stripUnknown: true,
        allowUnknown: false
        });

        if (error) {
        const errorMessage = error.details
            .map(detail => detail.message)
            .join(', ');
            
        return res.status(400).json({
            message: 'Validation error',
            errors: errorMessage
        });
        }

        req.body = value;
        next();
    };
};

module.exports = { validateRequest };