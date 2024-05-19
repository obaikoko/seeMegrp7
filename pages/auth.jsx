import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import Particle from '../components/design.jsx';
import { setCredentials } from '../src/features/auth/authSlice';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../src/features/auth/userApiSlice';
import styles from '../styles/auth.module.css';
import Loader from '@/components/Loader.jsx';

const Auth = () => {
  const [login, { isLoading: loadingLogin }] = useLoginMutation();
  const [register, { isloading: loadingRegister }] = useRegisterMutation();
  const [isActive, setIsActive] = useState(false);
  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = userInput;
  const [messageIndex, setMessageIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const messages = [
    {
      src: 'https://res.cloudinary.com/duz7maquu/image/upload/v1716030525/SeeMe/image3-removebg-preview_cmlzf0.png',
      text: 'No more waiting or dialing, just talk',
    },
    {
      src: 'https://res.cloudinary.com/duz7maquu/image/upload/v1716030523/SeeMe/Frame_120_oeewqw.svg',
      text: 'Seamless conversations, anytime, anywhere',
    },
    {
      src: 'https://res.cloudinary.com/duz7maquu/image/upload/v1716030524/SeeMe/image2-removebg-preview_go9h1c.png',
      text: 'Connecting you, wherever you roam!',
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
      setImageIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegisterButton(e);
  };

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleRegisterButton = async (e) => {
    e.preventDefault();
    const userInfo = { username, email, password };
    try {
      const res = await register(userInput).unwrap();
      console.log(userInput);
      router.push('/setup');
      dispatch(setCredentials({ ...res }));
      toast.success(`Welcome ${res.username}!`);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleLoginButton = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      router.push('/profile');
      dispatch(setCredentials({ ...res }));
      toast.success(`Welcome back ${res.username}`);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div
      className={`${styles.container} ${isActive ? styles.active : ''}`}
      id='container'
    >
      <Particle />
      <div className={styles['container-content']}>
        <div className={`${styles['form-container']} ${styles['sign-up']}`}>
          <form onSubmit={handleSubmit} className={styles['form-content']}>
            <h1 className={styles.header}>Create Account</h1>
            <input
              type='text'
              name='username'
              placeholder='Username'
              onChange={handleChange}
              required
              autoComplete='name'
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              onChange={handleChange}
              required
              autoComplete='email'
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
              required
              autoComplete='new-password'
            />
            <div className={styles.agree}>
              <input type='checkbox' className={styles.checkBox} />
              <span className={styles.terms}>
                I agree to the terms and services and privacy policy
              </span>
            </div>
            <button type='submit' onClick={handleRegisterButton}>
              {loadingRegister ? 'loading...' : 'Sign Up'}
            </button>
            <div className={styles.sign}>
              <div className={styles.line}></div>
              <span className={styles['txt-li']}>Or</span>
              <div className={styles.line}></div>
            </div>
            <p className={styles.continue}>Continue With</p>
            <Link href={'/auth/google'}>
              <button type='button' className={styles['google-btn']}>
                <img
                  src='https://res.cloudinary.com/duz7maquu/image/upload/v1716030524/SeeMe/Group_cdzfut.svg'
                  alt='Google'
                />
                Google
              </button>
            </Link>

            <div className={styles.account}>
              <span>Already have an account? </span>
              <p className={styles.sign} onClick={handleLoginClick}>
                Sign In
              </p>
            </div>
          </form>
        </div>

        <div className={`${styles['form-container']} ${styles['sign-in']}`}>
          <form onSubmit={handleSubmit}>
            <h1 className={styles['sign-text']}>Sign In</h1>
            <input
              type='email'
              placeholder='Email'
              name='email'
              required
              onChange={handleChange}
              autoComplete='email'
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              required
              onChange={handleChange}
              autoComplete='current-password'
            />
            <a href='#' className={styles['forget-pswd']}>
              Forgot Password?
            </a>
            <button
              type='submit'
              className={styles['sign-btn']}
              onClick={handleLoginButton}
            >
              {loadingLogin ? <Loader/> : 'Sign in'}
            </button>
            <div className={styles.sign}>
              <div className={styles.line}></div>
              <span className={styles['txt-li']}>Or</span>
              <div className={styles.line}></div>
            </div>
            <p className={styles.continue}>Continue With</p>
            <Link href={'/auth/google'}>
              <button type='button' className={styles['google-btn']}>
                <img
                  src='https://res.cloudinary.com/duz7maquu/image/upload/v1716030524/SeeMe/Group_cdzfut.svg'
                  alt='Google'
                />
                Google
              </button>
            </Link>
            <div className={styles.account}>
              <span className={styles['txt-ac']}>Don't have an account? </span>
              <p className={styles.sign} onClick={handleRegisterClick}>
                Sign Up
              </p>
            </div>
          </form>
        </div>

        <div className={styles['toggle-container']}>
          <div className={styles.toggle}>
            <div
              className={`${styles['toggle-panel']} ${styles['toggle-right']}`}
            >
              <div className={styles['write-up']}>
                <img
                  src='https://res.cloudinary.com/duz7maquu/image/upload/v1716030525/SeeMe/Layer_3_og2nrm.svg'
                  alt='Welcome Back'
                />
                <h2>Welcome Back</h2>
              </div>
              <div className={styles.image}>
                <img
                  src='https://res.cloudinary.com/duz7maquu/image/upload/v1716030530/SeeMe/poieeie_1-removebg-preview_k5azag.png'
                  alt='Welcome Back'
                />
              </div>
            </div>

            <div
              className={`${styles['toggle-panel']} ${styles['toggle-left']}`}
            >
              <div className={styles['write-up']}>
                <img
                  src='https://res.cloudinary.com/duz7maquu/image/upload/v1716030525/SeeMe/Layer_3_og2nrm.svg'
                  alt='Welcome'
                />
                <p>{messages[messageIndex].text}</p>
              </div>
              <div className={styles.image}>
                <img src={messages[imageIndex].src} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
