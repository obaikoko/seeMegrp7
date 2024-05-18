import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Particle from '../components/design.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/profile.module.css';
import { useSelector } from 'react-redux';

const ProfileSetup = () => {
  const router = useRouter();

  const { userInfo } = useSelector((state) => state.auth);

  const [user, setUser] = useState('');
  const [formData, setFormData] = useState({
    username: userInfo && userInfo.username,
  });
  const { username } = formData;

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSave = () => {
    toast.success('Profile saved');
    router.push('/addfriends');
  };

  return (
    <div className={styles['profile-container']}>
      <Particle />
      <div className={styles['profile-left-section']}>
        <div className={styles['profile-left-section-wrapper']}>
          <img
            src='https://res.cloudinary.com/duz7maquu/image/upload/v1716030525/SeeMe/Layer_3_og2nrm.svg'
            className={styles['logo-two']}
            alt='Logo'
          />
          <h1>Complete and connect!</h1>
          <div className={styles.images}>
            <img
              src='https://res.cloudinary.com/duz7maquu/image/upload/v1716030525/SeeMe/image1-removebg-preview_p69drm.png'
              alt='Welcome'
            />
          </div>
        </div>
      </div>

      <div className={styles['profile-right-section']}>
        <div className={styles['fixed-width']}>
          <div className={styles['profile-right-section-wrapper']}>
            <p>
              {`Your User ID is ${user._id}`}
              <br />
              Friends can add you through this PIN
            </p>
            <h2 className={styles['setprofiles']}>Set Up Profile</h2>
            <div className={styles['profile-image-wrapper']}>
              <img
                src='https://res.cloudinary.com/duz7maquu/image/upload/v1716037111/SeeMe/Ellipse_6_mkpxi8.png'
                alt='Avatar'
              />
            </div>
            <input
              className={styles.input}
              type='text'
              placeholder=''
              name='username'
              value={username}
              onChange={handleFormChange}
            />
            <button onClick={handleSave} className={styles.button}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
