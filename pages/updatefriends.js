import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Particle from '../components/design';
import styles from '../styles/addfriends.module.css';
import { useGetUsersQuery } from '@/src/features/auth/userApiSlice';
import Loader from '@/components/Loader';
import {
  useGetFriendQuery,
  useUpdateFriendsRequestMutation,
} from '@/src/features/auth/friendsApiSlice';
import { toast } from 'react-toastify';

function UpdateFriends() {
  const router = useRouter();

  const { data: usersFriends, refetch, isLoading, error } = useGetFriendQuery();
  console.log(usersFriends);
  const [
    updateFriendsRequest,
    {
      // isLoading: loadingUpdateFriendsRequest,
      // error: updateFriendsRequestError,
    },
  ] = useUpdateFriendsRequestMutation();

  const acceptRequestBtn = async (id) => {
    try {
      const res = await updateFriendsRequest({
        sender: id,
        status: 'accepted',
      }).unwrap();
      refetch();
      toast.success(res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const rejectRequestBtn = async (id) => {
    try {
      const res = await updateFriendsRequest({
        sender: id,
        status: 'rejected',
      }).unwrap();
      refetch();
      toast.success(res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Particle />
      <div className={styles.containerAddfriend}>
        <div className={styles['parent-div2']}>
          <h1>Friend Request</h1>
        </div>
        <div className={styles['parent-div']}>
          <div className={styles.cally}>
            <h3 className={styles.header}>Pending Request</h3>
            {isLoading && <Loader />}

            <>
              {usersFriends &&
                usersFriends.map((user) => (
                  <div key={user._id}>
                    <img
                      className={styles.userImg}
                      src={user.sender.image?.url || user.sender.image}
                      alt=''
                    />
                    {user.sender.username}{' '}
                    <button onClick={() => acceptRequestBtn(user.sender)}>
                      {user.status === 'accepted' ? 'accepted' : 'Accept'}
                    </button>
                    <button onClick={() => rejectRequestBtn(user.sender)}>
                      Reject
                    </button>
                  </div>
                ))}
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateFriends;
