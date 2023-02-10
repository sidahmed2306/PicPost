import './SplashScreen.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/img/Logo.svg';
import Loader from '../../components/SplashScreen/Loader';

export default function Splashscreen() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/sign-up");
        }, 3000);
        // eslint-disable-next-line
    }, []);

    return (
        <div className='splashscreen'>
            <Logo />
            <Loader />

        </div>
    );
}
