import type { GetServerSideProps, NextPage } from 'next'
import { wrapper } from '../store'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Alert } from '@mui/material'

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [alert, setAlert] = useState("");

  const handleOnLogin = async (e: any) => {
    e.preventDefault();
    let body = { username: e.target[0].value, password: e.target[1].value };
    let res = await signIn("credentials", { redirect: false, callbackUrl: "/" }, body);
    if (res?.ok) {
      router.push("/")
    } else {
      setAlert("Wrong username or password!");
    }
  }

  return (
    <div className='wrapper m-auto min-h-screen flex justify-center items-center'>
      <form className="space-y-6 w-72" action="#" onSubmit={handleOnLogin} >
        <div className='text-4xl'>Login</div>
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
          <input name="username" id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input name="password" id="password" type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required />
        </div>
        {alert &&
          <Alert severity="error">{alert}</Alert>
        }
        <button type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user) {
    return {
      redirect: { destination: "/", permanent: false },
      props: {}
    }
  }

  return {
    props: {
    }
  }
});

export default LoginPage
