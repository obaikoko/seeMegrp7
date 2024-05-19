import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Particle from '../components/design.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useProfileMutation } from '@/src/features/auth/userApiSlice.js';
import Loader from '@/components/Loader.jsx';
import { setCredentials } from '@/src/features/auth/authSlice.js';
const ProfileSetup = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { userInfo } = useSelector((state) => state.auth);

  const [user, setUser] = useState('');
  const [image, setImage] = useState('');
  const [formData, setFormData] = useState({
    username: userInfo && userInfo.username,
  });
  const { username } = formData;

  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };
  const handleSave = async () => {
    // toast.success('Profile saved');
    // router.push('/addfriends');

    try {
      const res = await updateProfile({
        username,
        image: image ? image : user.image.url,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      router.push('/addfriends')
      toast.success('Profile updated successfully');

    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
                src={user.image ? user.image.url || user.image : ''}
                alt='Avatar'
              />
            </div>
            <input
              className={styles.input}
              type='file'
              onChange={handleImageChange}
            />
            <input
              className={styles.input}
              type='text'
              placeholder=''
              name='username'
              value={username}
              onChange={handleFormChange}
            />
            {isLoading ? (
              <Loader />
            ) : (
              <button onClick={handleSave} className={styles.button}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
