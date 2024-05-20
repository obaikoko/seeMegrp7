import React from "react";
import styles from "../styles/changepassword.module.css";
import Particle from "../components/design";

const ChangePassword = () => {
  return (
    <>
      <div className={styles["password-main-container"]} id="container">
        <Particle />
        <div className={styles["password-container"]}>
          <div className={styles["password-toggle-panel"]}>
            <div className={styles["write-up"]}>
              <img src="https://res.cloudinary.com/duz7maquu/image/upload/v1716030525/SeeMe/Layer_3_og2nrm.svg" alt="Logo" />
              <h2>Chill, we've got you!</h2>
            </div>
            <div className={styles.image}>
              <img
                src="https://res.cloudinary.com/duz7maquu/image/upload/v1716030525/SeeMe/image4-removebg-preview_1_bkbo0e.png"
                alt="Decorative"
              />
            </div>
          </div>

          <div className={styles["password-form-container"]}>
            <form className={styles["password-form-content"]}>
              <div className={styles["forget-text"]}>
                <h1>Change Password</h1>
              </div>

              <div className={styles["change-password-input"]}>
                <input
                  type="password"
                  placeholder="New Password"
                  autoComplete="password"
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  autoComplete="password"
                  required
                />
              </div>

              <button className={styles.submit}>Submit</button>
              <button className={styles.cancel}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
