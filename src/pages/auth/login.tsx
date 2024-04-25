import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context/auth/AuthContext";
import StarWars from "../../utils/Icons/StarWars";

interface LoginProps {
  email_address: string;
  password: string;
}

const schema = yup.object().shape({
  email_address: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).*$/,
      "Password must contain at least one letter and one number"
    )
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const authState = React.useContext(AuthContext);

  // React hook form values
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleLogin = async () => {
    const token = "user is logged in";
    localStorage.setItem("token", token);
    authState?.setToken(token);
    navigate("/");
  };

  return (
    <>
      <div className="p-5 max-h-screen h-svh block md:flex">
        <div className="bg-primary hidden md:basis-1/4 md:h-full md:rounded-md p-14 md:flex md:flex-col md:justify-center md:gap-y-8 md:relative">
          <div className="text-white flex justify-center">
            <StarWars />
          </div>
        </div>
        <div className="md:basis-3/4 h-full flex flex-col md-[500px]:flex-row items-center justify-center relative md:pl-5 min-[900px]:pl-0">
          <div className="h-auto min-[1000px]:w-[auto] md:w-full">
            <div className="border border-[#A4A7B7] rounded-r8 border-opacity-30 px-48 py-24 ">
              <div className="flex flex-col justify-center items-center">
                <form
                  className="flex flex-col gap-y-4"
                  id="login"
                  name="login"
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <div className="mb-32">
                    <h1 className="font-semibold text-[2.4rem] text-textgray">
                      Login
                    </h1>
                    <p className="text-[#737373] font-normal text-base pt-4 mb-[20px]">
                      Kindly enter your details to log in
                    </p>
                  </div>
                  <div className="mb-32">
                    <Input
                      {...register("email_address")}
                      label="Email Address"
                      hasError={!!errors.email_address}
                      errorText={errors.email_address?.message}
                      isRequired
                      type="text"
                    />
                  </div>
                  <div className="mb-24">
                    <Input
                      {...register("password")}
                      label="Password"
                      type="password"
                      hasError={!!errors.password}
                      errorText={errors.password?.message}
                      isRequired
                    />
                  </div>
                  <Button aria-label="submit btn" type="submit" form="login">
                    Log in
                  </Button>
                  <div className="text-center mt-6">
                    <p className="text-blue font-normal text-sm">
                      Forgot password?
                    </p>
                  </div>
                  <div className="text-smm font-normal text-darkgary text-center mt-[64px]">
                    <span className="underline">Privacy Policy</span>
                    <span className="text-[#B0B9C8]"> and</span>{" "}
                    <span className="underline"> Terms of services</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
