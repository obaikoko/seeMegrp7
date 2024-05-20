import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { RecoveryContext } from "../components/recoverycontext";
import Particle from "../components/design";
import styles from "../styles/otp.module.css";

const OTP = () => {
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const router = useRouter();

  const resendOTP = async () => {
    if (disable) return;
    try {
      await axios.post("#", { OTP: otp, recipient_email: email });
      setDisable(true);
      alert("A new OTP has successfully been sent to your email.");
      setTimer(60);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = () => {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setDisable(false);
        }
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className={styles["password-main-container"]} id="container">
      <Particle />
      <div className={styles["password-container"]}>
        <div className={styles["password-toggle-panel"]}>
          <div className={styles["write-up"]}>
            <img
              src="https://res.cloudinary.com/duz7maquu/image/upload/v1716030525/SeeMe/Layer_3_og2nrm.svg"
              alt="Layer 3"
            />
            <h2>Chill, we've got you!</h2>
          </div>
          <div className={styles.image}>
            <img
              src="https://res.cloudinary.com/duz7maquu/image/upload/v1716030525/SeeMe/image4-removebg-preview_1_bkbo0e.png"
              alt="Remove Background Preview"
            />
          </div>
        </div>

        <div className={styles["password-form-container"]}>
          <form className={styles["password-form-content"]}>
            <div className={styles["forget-text"]}>
              <div className={styles.icon}>
                <img
                  src="https://res.cloudinary.com/duz7maquu/image/upload/v1716030522/SeeMe/arrow-left_y1wsd8.svg"
                  alt="Arrow Left"
                />
              </div>
              <h1>Enter the OTP</h1>
            </div>

            <div className={styles["otp-text"]}>
              <p>
                We've sent you an OTP to your gmail address example10@gmail.com
              </p>
            </div>
            <div className={styles["otp-input"]}>
              {OTPinput.map((_, index) => (
                <div key={index}>
                  <input
                    maxLength="1"
                    type="text"
                    onChange={(e) => {
                      const newOTPinput = [...OTPinput];
                      newOTPinput[index] = e.target.value;
                      setOTPinput(newOTPinput);
                    }}
                  />
                </div>
              ))}
            </div>

            <button type="button" className={styles.verify} onClick={verifyOTP}>
              Verify
            </button>
            <div className={styles["input-box"]}>
              <input type="email" placeholder="Email Verification" required />
            </div>
            <button
              type="button"
              className={styles.cancel}
              onClick={resendOTP}
              disabled={disable}
            >
              Resend OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;
