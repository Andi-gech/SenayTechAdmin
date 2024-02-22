
import axios from 'axios'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const signIn = useSignIn();
    const navigate = useNavigate();
 

    const mutationKey = ['auth']
    
    const mutation = useMutation({
        mutationKey,
        mutationFn: (newPost) => {
            return axios.post('https://crabby-frog-swimsuit.cyclic.app/auth/signin', newPost)
        },
        onSuccess: (data) => {
         console.log(data.data.token)
         signIn({
            auth: {
                token: data.data.token,
                type: 'Jwt'
            },
            
            userState: {
                isAuth: true,
                username: data.data.username,
                _id: data.data._id
              
            }
        })
        navigate('/')
    
        },
        onError: (error) => {
            console.error('Mutation failed:', error.response);
            setError(error?.response?.data)

        }
    });

    const submit=()=>{
        mutation.mutate({username:username,Password:password})
  



    }
    
  return (
    <div className=' text-white'>
        <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <p className=' text-red-500 line-clamp-1 '>{error}</p>
              <div class="space-y-4 md:space-y-6" >
                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">user name</label>
                      <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johndoe" required=""/>
                  </div>
                  <div>
                      <label for="password"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" onClick={submit} class="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" class="font-medium text-gray-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </div>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}
