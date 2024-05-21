import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Particle from "../components/design";
import styles from "../styles/update.module.css";
import { useGetUsersQuery } from "@/src/features/auth/userApiSlice";
import Loader from "@/components/Loader";
import {
  useGetFriendQuery,
  useUpdateFriendsRequestMutation,
} from "@/src/features/auth/friendsApiSlice";
import { toast } from "react-toastify";

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
        status: "accepted",
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
        status: "rejected",
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
        <div className={styles["parent-div2"]}>
          <img
            src="https://res.cloudinary.com/duz7maquu/image/upload/v1716030522/SeeMe/arrow-left_y1wsd8.svg"
            width={30}
            height={30}
          />
          <h1>Friend Request</h1>
          <img
            src="https://res.cloudinary.com/duz7maquu/image/upload/v1716041164/SeeMe/Layer_2_rzzmxu.svg"
            className={styles.logo}
          />
        </div>
        <div className={styles["parent-div"]}>
          <div className={styles.cally}>
            <p className={styles.header}>Friend Requests {<span>{}</span>}</p>
            {isLoading && <Loader />}

            <>
              {usersFriends &&
                usersFriends.map((user) => (
                  <div key={user._id}>
                    {/* <img
                      src={user.image?.url || user.iamge}
                      alt=''
                      width={50}
                      height={50}
                    /> */}
                    {user.username}{" "}
                    <button
                      onClick={() => acceptRequestBtn(user.sender)}
                      className={styles.accept}
                    >
                      {user.status === "Accepted" ? "Accepted" : "Accept"}
                    </button>
                    <button
                      onClick={() => rejectRequestBtn(user.sender)}
                      className={styles.reject}
                    >
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
