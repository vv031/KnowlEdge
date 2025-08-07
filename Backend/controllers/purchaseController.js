const db = require('../db');

// select courses for purchase
const selectCourse = (req, res) => {
    /*
        // not created purchases table
        const { userId, courseIds } = req.body; // courseIds should be an array of Course IDs here
        const query = 'INSERT INTO purchases (user_id, course_id) VALUES (?, ?)';
    
        courseIds.forEach(courseId => {
            db.execute(query, [userId, courseId], (err, result) => {
                if (err) {
                    console.error('Error selecting course:', err);
                    res.status(500).send({ message: 'Error selecting course' });
                }
            });
        });
        res.status(200).send({ message: 'Courses selected successfully' });
        */
    res.status(200).send({ message: 'Course selected successfully' });
};

// payment page (dummy)
const dummyPaymentPage = (req, res) => {
    res.status(200).send({ message: 'This is a dummy payment page' });
};

// two-step verification (dunno what I'm doing)
const twoStepVerification = (req, res) => {
    const { userId, verificationCode } = req.body;
    // let's assume that verification code is always correct
    res.status(200).send({ message: 'Verification successful' });
};

module.exports = { selectCourse, dummyPaymentPage, twoStepVerification };
