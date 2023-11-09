import React, { Fragment, useState } from "react";
import { main } from "../api/main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  let isCheckLogin = false;
  let email;
  let userName;
  const checkMail = localStorage.getItem("email");
  const apiKey = localStorage.getItem("apiKey");

  const [emailCheck, setEmailCheck] = useState();

  if (checkMail && apiKey) {
    isCheckLogin = true;
    const pattern = /@[a-z]{4,}\.[a-z]{2,}/;
    const result = checkMail.match(pattern);
    userName = checkMail.slice(0, checkMail.indexOf(result));
  } else {
    isCheckLogin = false;
  }
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (email) {
      const { data, response } = await main.getApiKey(email);
      console.log(data.data.apiKey);
      if (response.ok) {
        localStorage.setItem("email", JSON.stringify(email));
        localStorage.setItem("apiKey", JSON.stringify(data.data.apiKey));
      }
      setEmailCheck(email);
    } else {
      toast.error("Vui lòng nhập email");
    }
  };

  const handleInputEmail = (e) => {
    email = e.target.value;
  };
  return (
    <Fragment key={1}>
      {isCheckLogin ? (
        (toast.success(`Chào mừng ${userName}`), "")
      ) : (
        <div className="login d-flex justify-content-center align-items-center h-100 position-relative">
          <form
            onSubmit={handleSubmitEmail}
            className="email-login m-10 p-4 bg-light border rounded position-absolute z-2 top-50 start-50 translate-middle bg-secondary bg-gradient"
          >
            <label htmlFor="email-input" className="form-label fw-bold">
              Email
            </label>
            <input
              type="email"
              className="form-control p-3 mb-2"
              id="email-input"
              placeholder="name@example.com"
              onChange={handleInputEmail}
            />
            <button type="submit" className="btn btn-primary mt-2 w-100">
              Submit
            </button>
          </form>
        </div>
      )}

      <ToastContainer />
    </Fragment>
  );
}
