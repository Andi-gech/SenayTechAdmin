import React, { useEffect } from 'react'
import UseFetchUserData from '../Hooks/UseFetchUserData'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

export default function HomePage() {
    const {error,data,isLoading,refetch}=UseFetchUserData()
 
    const [username, setUsername] = React.useState()
    const [password, setPassword] = React.useState()
    const [Image, setImage] = React.useState()
    const [Email, setEmail] = React.useState()
    const [Role, setRole] = React.useState()
    const [sucess, setSucess] = React.useState()
    const  [Portfolio, setPortfolio] = React.useState()
    const [Github, setGithub] = React.useState()
    const [Error, setError] = React.useState()
    const [instagram, setInstagram] = React.useState()
    const [imagelink, setImagelink] = React.useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
    const [Name, setName] = React.useState()
    useEffect(()=>{
    
        setImagelink(data?.data?.Image)
    
    },data)
    const mutationKey = ['update data']
    const handlefilechange=(e)=>{
        const file=e.target.files[0]
        setImage(file)
        const url = URL.createObjectURL(file);
        setImagelink(url)
        
    }
    const auth = useAuthUser()
    
    
    const mutation = useMutation({
        mutationKey,
        mutationFn: (newPost) => {
            return axios.put(`https://crabby-frog-swimsuit.cyclic.app//admin/${auth?._id}`, newPost, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
        },
        onSuccess: (data) => {
         console.log(data.data.token)
         setSucess('data updated successfully')
         setInterval(() => {
            setSucess(null)
         }, 2000);

    
        },
        onError: (error) => {
            console.error('Mutation failed:', error.response);
            setError(error?.response?.data)
            setInterval(() => {
                setError(null)
            }, 2000);

        }
    });
    const submit = () => {
        const formData = new FormData();
    
        // Append form data if not empty
        if (username) formData.append('username', username);
        if (Name) formData.append('Name', Name);
        if (Email) formData.append('Email', Email);
        if (Role) formData.append('Role', Role);
        if (password) formData.append('Password', password);
        if (Portfolio) formData.append('portfolio', Portfolio);
        if (Github) formData.append('githublink', Github);
        if (instagram) formData.append('instalinks', instagram);
        if (Image) formData.append('image', Image);
    
        mutation.mutate(formData);
    }
    

  return (
    <div className=' w-full h-full  overflow-y-scroll flex flex-row items-center text-white'>
<div className=' w-[600px] h-[580px] flex  flex-col items-center ml-[40px] mt-2 '>
<div className=' w-full h-[80px]  flex items-center justify-center'> <p className=' text-3xl text-black'>Edit Your Profile</p></div>
{error && <p className='bg-red-500  self-start px-[30px] py-2  rounded-full '>{error}</p>}
{sucess &&<p className='bg-green-500  self-start px-[30px] py-2  rounded-full'>{sucess}</p>}

<div className=' w-full h-[100px] flex-col  p-3 flex'>
    <label className='text-black font-bold'>Name</label>
    <input value={Name} onChange={e=>setName(e.target.value)} placeholder={data?.data?.Name} className=' mt-3 w-[80%] text-black h-[40px]'/>

</div>
<div className=' w-full h-[100px] flex-col  p-3 flex'>
    <label className='text-black font-bold '>UserName</label>
    <input value={username} onChange={e=>setUsername(e.target.value)} placeholder={data?.data?.username} className=' mt-3 w-[80%] text-black  h-[40px]'/>

</div>
<div className=' w-full h-[100px] flex-col  p-3 flex'>
    <label className='text-black font-bold'>Email</label>
    <input value={Email} onChange={e=>setEmail(e.target.value)} placeholder={data?.data?.Email} className=' mt-3 w-[80%] text-black h-[40px]'/>

</div>
<div className=' w-full h-[100px] flex-col  p-3 flex'>
    <label className='text-black font-bold'>Role </label>
    <input value={Role}  onChange={e=>setRole(e.target.value)}    placeholder={data?.data?.Role} className=' mt-3 w-[80%] text-black h-[40px]'/>

</div>

</div>

<div className=' w-[600px] h-[580px] ml-[40px] mt-2 '>
    <div className=' w-full h-[50px]  flex items-center justify-center'>
        <p className=' text-3xl text-black'>Update Pic</p>
    </div>
    <div className=' w-full h-[200px]   flex flex-row  items-center   my-2'>
<img className=' w-[200px] h-[200px] rounded-md mt-2 ml-2' src={imagelink}/>
   <input type='file'  onChange={(e)=>handlefilechange(e)}  accept='image/*' className=' w-[300px] text-black mx-4 flex justify-center bg-gray-300 items-center'/>
    </div>
    <div className=' w-full h-[40px]  items-center justify-center flex-col  p-3 flex'>
        <p className='text-black  text-[20px]'>social Links</p>
        </div>
        <div className=' w-full h-[70px]  flex-row items-center justify-center  p-3 flex'>
    <label className='text-black font-bold'>Portfolio </label>
    <input value={Portfolio} onChange={e=>setPortfolio(e.target.value)} placeholder={data?.data?.portfolio} className=' mt-3 w-[80%] text-black h-[40px]'/>

</div>
<div className=' w-full h-[70px]  flex-row items-center justify-center  p-3 flex'>
    <label className='text-black font-bold'>instagram</label>
    <input value={instagram} onChange={e=>setinstagram(e.target.value)} placeholder={data?.data?.instalinks} className=' mt-3 w-[80%] text-black h-[40px]'/>

</div>
<div className=' w-full h-[70px]  flex-row items-center justify-center  p-3 flex'>
    <label className='text-black font-bold'>Github </label>
    <input value={Github} onChange={e=>setGithub(e.target.value)} placeholder={data?.data?.githublink} className=' mt-3 w-[80%] text-black h-[40px]'/>

</div>
<div className=' w-full h-[70px]  flex-row items-center justify-center  p-3 flex'>
<button onClick={submit} className=' w-[80%] h-[40px] bg-black text-white rounded-md'>Update</button>
</div>


</div>
    </div>
  )
}
