import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setCredentials } from '@/src/features/auth/authSlice';
import styles from '../styles/auth.module.css';
import { toast } from 'react-toastify';
const GoogleSign = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const handleGooglBtn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
        );
        const userProfile = res.data;

        console.log(userProfile);
        const response = await axios.post(
          'https://seeme-nga3.onrender.com/api/users',
          {
            email: userProfile.email,
            username: userProfile.family_name,
            password: process.env.NEXT_PUBLIC_PASSWORD,
            picture: userProfile.picture,
            accessToken: access_token,
          }
        );
        const user = response.data;
        console.log(user);
        router.push('/call');

        //dispatch(setCredentials(user))

        // if (response.status === 201){
        //     router.push('/profile');
        //     toast.success(`Welcome ${response.name}`)
        // }else{
        //     router.push('/call');
        // toast.success(`Welcome back ${response.name}`);
        // }
      } catch (error) {
        console.error(error);
      }
    },
    onError: (error) => console.log(error),
  });
  return (
    <button
      type='button'
      className={styles['google-btn']}
      onClick={() => handleGooglBtn()}
    >
      <img
        src='https://res.cloudinary.com/duz7maquu/image/upload/v1716030524/SeeMe/Group_cdzfut.svg'
        alt='Google'
      />
      Google
    </button>
  );
};

export default GoogleSign;
