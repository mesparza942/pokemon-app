import LoginForm from "../components/modules/auth/LoginForm";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image
        src="/pokemon-logo.webp"
        alt="Pokemon Logo"
        width={500}
        height={500}
        priority
      />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
