import { endPoint } from "@/constant/api";
import { VARIABLE } from "@/constant/common";
import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'

const useSignUp = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const signUp = async (name: string) => {
    try {
      const response = await fetch(`${endPoint.SIGN_UP}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      console.log('response', response)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const signUpResponse = await response.json();
      const signUpData = {
        name,
        token: signUpResponse?.message?.token?.access_token
      }

      // time end of date
      // const timeEOD = new Date()
      const timeEOD = new Date(new Date().setHours(23, 59, 59))

      Cookies.set(VARIABLE.COOKIE_USER, JSON.stringify(signUpData), { 
        expires: timeEOD,
        sameSite: 'strict'
      })

      router.push(callbackUrl)
      
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  return {
    signUp
  };
};

export default useSignUp;
