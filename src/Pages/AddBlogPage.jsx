import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

export default function AddBlogPage() {
    const [sucess , setSucess] = React.useState()
    const [Error , setError] = React.useState()
    const [Title , setTitle] = React.useState()
    const [Description , setDescription] = React.useState()
    const [Image , setImage] = React.useState()
    const [Content , setContent] = React.useState()
    const [imagelink , setImagelink] = React.useState()
    const handlefilechange=(e)=>{
        const file=e.target.files[0]
        setImage(file)
        const url = URL.createObjectURL(file);
        setImagelink(url)
    }
const mutationKey = ['add data']
const authHeader = useAuthHeader();


    const mutation = useMutation({
        mutationKey,
        mutationFn: (newPost) => {
            return axios.post(`http://localhost:3000/blog`, newPost, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    '_auth': authHeader
                }
            })
        },
        onSuccess: (data) => {
         console.log(data.data.token)
         setSucess('data added successfully')
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
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('Title', Title)
        formData.append('Description', Description)
        formData.append('content', Content)
        formData.append('image', Image)
        mutation.mutate(formData)
        setTitle('')
        setDescription('')
        setContent('')
        setImage('')
        setImagelink('')
    }
  return (
    <div className='w-full h-full'>
        <div><p className='text-3xl mb-2'>Add Blog Data</p></div>
        {sucess && <p className='text-green-500 text-md mx-4 font-bold'>{sucess}</p>}
        {Error && <p className='text-red-500 text-md mx-4 font-bold'>{Error}</p>}
    
        <div className='flex flex-row '>
            <div>
            <div className=' w-[500px] h-[100px] flex-col  p-3 flex'>
    <label className='text-black font-bold'>Title</label>
    <input  onChange={(e)=>{setTitle(e.target.value)}} className=' mt-3 w-[80%] text-black h-[40px]'/>

</div>
<div className=' w-[500px] h-[100px] flex-col  p-3 flex'>
    <label className='text-black font-bold'>Description</label>
    <input  onChange={(e)=>{setDescription(e.target.value)}}  className=' mt-3 w-[80%] text-black h-[40px]'/>

</div>
<div className=' w-full h-[200px]   flex flex-row  items-center   my-2'>
<img className=' w-[200px] h-[200px] rounded-md mt-2 ml-2' src={imagelink}/>
   <input type='file' onChange={handlefilechange}    accept='image/*' className=' w-[300px] text-black mx-4 flex justify-center bg-gray-300 items-center'/>
    </div>
            </div>
            <div>
            <div className=' w-[500px]  flex-col  p-3 flex'>
    <label className='text-black font-bold'>content</label>
    <textarea  onChange={(e)=>{setContent(e.target.value)}}  className=' mt-3 w-full text-black h-[350px]'/>

</div>
<button onClick={handleSubmit} className=' mt-3 w-[80%] text-white h-[40px] bg-black'>Add</button>

            </div>
        </div>
   

    </div>
  )
}
