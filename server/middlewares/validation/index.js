import { body, validationResult } from 'express-validator';


//let { firstName, lastName, email, phone, password } = req.body

function signupValidation() {

    return [
        body('firstName', 'FirstName does not blank').notEmpty(),
        body('lastName', 'LastName does not blank').notEmpty(),
        body('email', 'email is invalid').isEmail(),
        body('phone', 'Phone number is invalid').notEmpty().isLength({ min: 13, max: 13 }),
        body('password', 'password is not strong').notEmpty().isStrongPassword()
    ]
}

function loginValidation() {

    return [
        body('email', 'email is invalid').isEmail(),
        body('password', 'password is missing').notEmpty(),

    ]
}


function taskNameValidation() {

    return [
        body('taskName', 'TasktName does not blank').notEmpty(),
        body('taskDeadLine',).custom(value => {
            // // Validate the date format using a regular expression
            // if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            //     throw new Error('Invalid date format. Please use YYYY-MM-DD.');
            // }

            let taskDeadLine = new Date(value);
            let presentDay = new Date();
            let difference = taskDeadLine - presentDay;
            let differenceMin = difference / 60000;
            let differencDay = differenceMin / (60 * 24);
            if (taskDeadLine == "Invalid Date") {
                throw new Error('Invalid date format ');

            }

            if (taskDeadLine < presentDay) {
                throw new Error('date can not be back dated ');

            }

            // if (differenceMin < 30 || differencDay > 30) {
            //     throw new Error('date should be greater than 30 mins and less than 30 days ');

            // }

            else {
                return true;

            }

        }),

    ]
}
function validationErrors(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    res.status(401).send({ errors: result.array() });
}
export {
    loginValidation, validationErrors, signupValidation, taskNameValidation
}