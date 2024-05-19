import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Particle from '../components/design';
import styles from '../styles/addfriends.module.css';
import { useGetUsersQuery } from '@/src/features/auth/userApiSlice';
import Loader from '@/components/Loader';

function AddFriends() {
  const router = useRouter();
  const [requestStatus, setRequestStatus] = useState({});
  const [clicked, setClicked] = useState({});

  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const handleRequestButton = (userId) => {
    setClicked((prev) => ({ ...prev, [userId]: true }));
    setTimeout(() => {
      setRequestStatus((prev) => ({ ...prev, [userId]: !prev[userId] }));
      setClicked((prev) => ({ ...prev, [userId]: false }));
    }, 1000);
  };

  const handleSkipButton = () => {
    router.push('/call');
  };

  // const users = [
  //   {
  //     id: 1,
  //     name: 'okerekechukwu',
  //     imgSrc:
  //       'https://res.cloudinary.com/duz7maquu/image/upload/v1716044355/SeeMe/Ellipse_1_lpkgls.svg',
  //   },
  //   {
  //     id: 2,
  //     name: 'okerekechukwu',
  //     imgSrc:
  //       'https://res.cloudinary.com/duz7maquu/image/upload/v1716044355/SeeMe/Ellipse_1_lpkgls.svg',
  //   },
  //   {
  //     id: 3,
  //     name: 'okerekechukwu',
  //     imgSrc:
  //       'https://res.cloudinary.com/duz7maquu/image/upload/v1716044355/SeeMe/Ellipse_1_lpkgls.svg',
  //   },
  //   {
  //     id: 4,
  //     name: 'okerekechukwu',
  //     imgSrc:
  //       'https://res.cloudinary.com/duz7maquu/image/upload/v1716044355/SeeMe/Ellipse_1_lpkgls.svg',
  //   },
  //   {
  //     id: 5,
  //     name: 'okerekechukwu',
  //     imgSrc:
  //       'https://res.cloudinary.com/duz7maquu/image/upload/v1716044355/SeeMe/Ellipse_1_lpkgls.svg',
  //   },
  //   {
  //     id: 6,
  //     name: 'okerekechukwu',
  //     imgSrc:
  //       'https://res.cloudinary.com/duz7maquu/image/upload/v1716044355/SeeMe/Ellipse_1_lpkgls.svg',
  //   },
  //   {
  //     id: 7,
  //     name: 'okerekechukwu',
  //     imgSrc:
  //       'https://res.cloudinary.com/duz7maquu/image/upload/v1716044355/SeeMe/Ellipse_1_lpkgls.svg',
  //   },
  //   {
  //     id: 8,
  //     name: 'okerekechukwu',
  //     imgSrc:
  //       'https://res.cloudinary.com/duz7maquu/image/upload/v1716044355/SeeMe/Ellipse_1_lpkgls.svg',
  //   },
  //   {
  //     id: 9,
  //     name: 'okerekechukwu',
  //     imgSrc:
  //       'https://res.cloudinary.com/duz7maquu/image/upload/v1716044355/SeeMe/Ellipse_1_lpkgls.svg',
  //   },
  // ];

  return (
    <>
      <Particle />
      <div className={styles.containerAddfriend}>
        <div className={styles['parent-div2']}>
          <h1>Add Friends</h1>
        </div>
        <div className={styles['parent-div']}>
          <div className={styles.cally}>
            <h3 className={styles.header}>Suggested</h3>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {' '}
                {users.map((user) => (
                  <div key={user.id}>
                    <img src={user.image?.url || user.iamge} alt='' width={50} height={50} />
                    {user.username}{' '}
                    {/* <button
                      onClick={() => handleRequestButton(user.id)}
                      className={
                        requestStatus[user._id] ? styles.requestSent : ''
                      }
                      style={
                        requestStatus[user.id]
                          ? {
                              backgroundColor: 'rgba(8, 72, 125, 0.5)',
                              color: 'white',
                            }
                          : {}
                      }
                      disabled={clicked[user.id]}
                    >
                      {clicked[user._id]
                        ? 'Sending...'
                        : requestStatus[user._id]
                        ? 'Request sent'
                        : 'Add'}
                    </button> */}
                  </div>
                ))}
              </>
            )}
          </div>

          <div className={styles.josh}>
            <div className={styles.con1}>
              <h3>Add by Username or ID</h3>
              <label>
                <input type='number' placeholder='' required />
              </label>
              {/* <button
                onClick={() => handleRequestButton(users._id)}
                className={requestStatus[users._id] ? styles.requestSent : ''}
                style={
                  requestStatus[users._id]
                    ? {
                        backgroundColor: 'rgba(8, 72, 125, 0.5)',
                        color: 'white',
                      }
                    : {}
                }
                disabled={clicked[users.id]}
              >
                {clicked[users.id]
                  ? 'Sending...'
                  : requestStatus[users.id]
                  ? 'Request sent'
                  : 'Add'}
              </button> */}
            </div>
            <div className={styles.con2}>
              <img src='https://res.cloudinary.com/duz7maquu/image/upload/v1716041164/SeeMe/Layer_2_rzzmxu.svg' />
              <a href='#'>Continue</a>
              <button onClick={handleSkipButton}>Skip</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddFriends;
