import type { NextPage } from "next";
import classes from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {signIn} = useContext(AuthContext);

  const handleSignIn = async(data: { email: string; password: string }) => {
   await signIn(data);
  };

  const failedSignIn = () => {
    console.log("erro");
  };
  return (
    <div className={classes["container-form"]}>
      <form
        className={classes.form}
        onSubmit={handleSubmit(handleSignIn, failedSignIn)}
      >
        <h2>Sign in to your account</h2>
        <input className={classes.input} {...register("email")} />
        <input className={classes.input} {...register("password")} />
        <div className={classes.actions}>
          <input type="checkbox" className={classes.input} />
          <p className={classes["remember-me"]}>Remember me</p>
          <p className={classes["target-password"]}>Forget your password?</p>
        </div>
        <button className={classes.button}>Sign In</button>
      </form>
    </div>
  );
};

export default Home;
