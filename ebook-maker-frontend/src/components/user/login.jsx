import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CancelButton from '../cancelButton';

const UserLoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    const bodyData = {
      email: email,
      password: password,
    };

    fetch("http://localhost:8090/api/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
})
.then((response) => response.json())
.then((resultData) => {
    if (resultData.message === 'Login success') {
        alert("login sucess");
        navigate('/user-home');
    } else {
        alert('Invalid Credentails');
    }
})
.catch((error) => {
    console.error('Error during login:', error);
    alert('An unexpected error occurred');
});
};


  return (
    <section className="vh-100 bg-image-al">

      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
              <CancelButton/>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">User Login</h2>

                  <form onSubmit={login} className="ng-form">
                    <div className="form-group">
                      <label htmlFor="email">Email<span className="text-danger">*</span></label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        required
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                      />
                      </div>

                    <div className="form-group">
                      <label htmlFor="password">Password<span className="text-danger">*</span></label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        required
                      />
                    </div>

                    <br />

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-success">Login</button>
                    </div>
                    <p className="text-center text-muted mt-3">
                      <a href="/forgotpassword" className="fw-bold text-body">Forgot login details?</a>
                    </p>

                    <p className="text-center text-muted mt-5 mb-0">Don't have an account? <a href="/register" className="fw-bold text-body"><u>Register here</u></a></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserLoginComponent;
