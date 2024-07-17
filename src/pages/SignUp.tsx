import { useEffect, useState } from "react";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postData, postState] = usePost("http://localhost:3000/api/sign-up");
  const navigate = useNavigate();

  

  useEffect(()=> {
    if (postState.response.message === "Success") navigate("/home");
  }, [postState.response])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await postData({ username: name, email, password });
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center ">
      <h1>Sign Up</h1>
      <form
        onSubmit={submit}
        className=" flex flex-col justify-center items-center "
      >
        <input
          value={name}
          className="border"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Username"
          type="text"
        />
        <input
          value={email}
          className="border"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          type="email"
        />
        <input
          value={password}
          className="border"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          type="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
