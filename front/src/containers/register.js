import React from 'react';

import SignUp from '../components/register_form';
import Background from '../assets/background.svg';

const RegisterContainer = () => {
    return (
        <div style={{
            overflow: 'auto',
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <SignUp />
        </div>
    )
}

export default RegisterContainer;