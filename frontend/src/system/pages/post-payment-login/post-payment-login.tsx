// pages/PostPaymentLogin.tsx
import { useEffect } from "react";

import Spinner from "@/system/components/spinner/spinner";
import usePostPaymentLogin from "./usePostPaymentLogin";

export default function PostPaymentLogin() {
  const { makePostPaymentLogin } = usePostPaymentLogin();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      makePostPaymentLogin(token);
    }
  }, []);

  return <Spinner />;
}
