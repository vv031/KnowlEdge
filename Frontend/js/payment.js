document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('payment-form');
    const orderIdElement = document.getElementById('order-id');
    const courseIdElement = document.getElementById('course-id');
    const amountElement = document.getElementById('amount');
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    const courseId = urlParams.get('courseId');
    const userID = localStorage.getItem('userID');
    let course;

    // Display order and course IDs
    orderIdElement.textContent = orderId;
    courseIdElement.textContent = courseId;

    // Fetch course details to get the price
    fetch(`http://localhost:3000/api/courses/${courseId}`)
        .then(response => response.json())
        .then(courseData => {
            course = courseData;
            if (course && course.price !== undefined) {
                amountElement.textContent = `₹${(course.price - (course.price * (course.discount / 100))).toFixed(2)}`;
            } else {
                alert('Error fetching course price');
            }
        })
        .catch(error => {
            console.error('Error fetching course:', error);
            alert('Error fetching course price');
        });

    // Handle payment method selection
    const creditCardForm = document.getElementById('credit-card-form');
    const debitCardForm = document.getElementById('debit-card-form');
    const upiForm = document.getElementById('upi-form');
    const payButton = document.getElementById('pay-button');

    function showForm(paymentMethod) {
        creditCardForm.style.display = 'none';
        debitCardForm.style.display = 'none';
        upiForm.style.display = 'none';
        payButton.style.display = 'none';

        removeRequiredAttributes();

        if (paymentMethod === 'Credit Card') {
            creditCardForm.style.display = 'block';
            addRequiredAttributes(creditCardForm);
        } else if (paymentMethod === 'Debit Card') {
            debitCardForm.style.display = 'block';
            addRequiredAttributes(debitCardForm);
        } else if (paymentMethod === 'UPI') {
            upiForm.style.display = 'block';
            addRequiredAttributes(upiForm);
        }

        payButton.style.display = 'block';
    }

    function addRequiredAttributes(form) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.setAttribute('required', 'required');
        });
    }

    function removeRequiredAttributes() {
        const forms = [creditCardForm, debitCardForm, upiForm];
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.removeAttribute('required');
            });
        });
    }

    document.querySelectorAll('input[name="payment-method"]').forEach((input) => {
        input.addEventListener('change', () => {
            showForm(input.value);
        });
    });

    // Handle payment form submission
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const paymentDetails = {
            payments_user_id: userID,
            payments_course_id: course.id,
            amount: (course.price - (course.price * (course.discount / 100))).toFixed(2),
            paymentMethod: document.querySelector('input[name="payment-method"]:checked').value,
            cardNumber: document.getElementById('card-number') ? document.getElementById('card-number').value : '',
            cardExpiry: document.getElementById('card-expiry') ? document.getElementById('card-expiry').value : '',
            cardCvv: document.getElementById('card-cvv') ? document.getElementById('card-cvv').value : '',
            upiId: document.getElementById('upi-id') ? document.getElementById('upi-id').value : ''
        };

        fetch('http://localhost:3000/api/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentDetails)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Payment processed successfully') {
                    alert('A verification code has been sent to your email for this purchase.');
                    document.getElementById('verification-section').style.display = 'block';
                } else {
                    alert('Error processing payment. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error processing payment:', error);
                alert('Error processing payment. Please try again.');
            });
    });

    // Handle verification form submission
    const verificationForm = document.getElementById('verification-form');
    if (verificationForm) {
        verificationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // const verificationCode = document.getElementById('verification-code').value;

            fetch(`http://localhost:3000/api/purchases/verify`, {
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Verification successful') {
                        alert('Verification successful! Thank you for your purchase.');
                        window.location.href = `../html/thankyou.html`;
                    } else {
                        alert('Error verifying code. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error verifying code:', error);
                    alert('Error verifying code. Please try again.');
                });
        });
    }
});
