"use client";

import { login } from "@/actions/login";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/hooks/use-register-modal";
import useLoginModal from "@/hooks/use-login-modal";
import Modal from "./modal";
import Heading from "../heading";
import Input from "../inputs/input";
import toast from "react-hot-toast";
import Button from "../button";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FieldValues) => {
    setIsLoading(true);

    login(values, "/").then((data) => {
      if (!data?.error) {
        console.log(data);
        toast.success("Logged in successfully!");
        router.refresh();
        loginModal.onClose();
      }

      if (data?.error) {
        console.log(data);
        toast.error("An error occurred. Please try again.");
      }
    });
    setIsLoading(false);
  };

  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: "/" });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        type="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required={true}
      />

      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required={true}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline={true}
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => onClick("google")}
      />
      <Button
        outline={true}
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => onClick("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>First time using Airbnb?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
