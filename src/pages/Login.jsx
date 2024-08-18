import { useRef } from "react";
import { axiosClient } from "../utils/axiosClient";

import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
function Login() {
  const loginRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const handlesubmit = (e) => {
    e.preventDefault();

    axiosClient.post("/auth/login", {
        username: loginRef.current.value,
        password: passwordRef.current.value,
      }).then((data) => dispatch (login(data.data)))
      .catch((error) => console.log(error))
    
  };
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div>
          <input type="text" ref={loginRef} />
        </div>
        <div>
          <input type="text" ref={passwordRef} />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;
