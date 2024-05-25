import React from 'react';
import styles from '../styles/forgetpassword.module.css';
import Particle from '../components/design';

const ForgetPassword = () => {
  return (
    <>
      <div className={styles['password-main-container']} id='container'>
        <Particle />
        <div className={styles['password-container']}>
          <div className={styles['password-toggle-panel']}>
            <div className={styles['write-up']}>
              <img
                src='https://res.cloudinary.com/duz7maquu/image/upload/v1716030525/SeeMe/Layer_3_og2nrm.svg'
                alt='Layer 3'
              />
              <h2>Chill, we've got you !</h2>
            </div>
            <div className={styles.image}>
              <img
                src='https://res.cloudinary.com/duz7maquu/image/upload/v1716030525/SeeMe/image4-removebg-preview_1_bkbo0e.png'
                alt='Remove Background Preview'
              />
            </div>
          </div>

          <div className={styles['password-form-container']}>
            <form className={styles['password-form-content']}>
              <div className={styles['forget-text']}>
                <div className={styles.icon}>
                  <img
                    src='https://res.cloudinary.com/duz7maquu/image/upload/v1716030522/SeeMe/arrow-left_y1wsd8.svg'
                    alt='Arrow Left'
                  />
                </div>
                <h1>Forgot your password?</h1>
              </div>

              <div className={styles.text}>
                <p>
                  Enter your registered Email & we'll send you an OTP to reset
                  your password
                </p>
              </div>

              <div className={styles['box-icon']}>
                <img
                  src='https://res.cloudinary.com/duz7maquu/image/upload/v1716030530/SeeMe/sms_qjdq2o.svg'
                  alt='SMS Icon'
                />
              </div>
              <div className={styles['email-input']}>
                <input type='email' placeholder='Email' autoComplete='email' />
              </div>

              <button type='submit' className={styles.submit}>
                Send OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
