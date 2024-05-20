import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Particle from '../components/design';
import styles from '../styles/addfriends.module.css';
import { useGetUsersQuery } from '@/src/features/auth/userApiSlice';
import Loader from '@/components/Loader';
// import AddFriendBtn from '@/components/AddFriendBtn';
import { useAddFriendMutation } from '@/src/features/auth/friendsApiSlice';
import { toast } from 'react-toastify';

function AddFriends() {
  const router = useRouter();

  const [addFriend, { isLoading: loadingAddFriend, error: addFriendError }] =
    useAddFriendMutation();
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const handleSkipButton = () => {
    router.push('/call');
  };
  const handleRequestBtn = async (id) => {
    try {
      const res = await addFriend({ recipient: id }).unwrap();
      toast.success('Request sent successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
            {isLoading && <Loader />}

            <>
              {users &&
                users.map((user) => (
                  <div key={user._id}>
                    <img
                      src={user.image?.url || user.iamge}
                      alt=''
                      width={50}
                      height={50}
                    />
                    {user.username}{' '}
                    <button onClick={() => handleRequestBtn(user._id)}>
                      ADD
                    </button>
                  </div>
                ))}
            </>
          </div>

          <div className={styles.josh}>
            <div className={styles.con1}>
              <h3>Add by Username or ID</h3>
              <label>
                <input type='number' placeholder='' required />
              </label>
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
