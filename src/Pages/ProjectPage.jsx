

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import UseCatagory from '../Hooks/UseCatagory'

export default function  ProjectPage() {
    const [sucess , setSucess] = React.useState()
    const [Error , setError] = React.useState()
    const [Title , setTitle] = React.useState()
    const [Description , setDescription] = React.useState()
    const [Image , setImage] = React.useState()
    const [catagory , setCatagory] = React.useState()
    const [imagelink , setImagelink] = React.useState()
    const handlefilechange=(e)=>{
        const file=e.target.files[0]
        setImage(file)
        const url = URL.createObjectURL(file);
        setImagelink(url)
    }
const mutationKey = ['add project']
const authHeader = useAuthHeader();


    const mutation = useMutation({
        mutationKey,
        mutationFn: (newPost) => {
            return axios.post(`https://app.ethiopiantheaterassociation.com/project`, newPost, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    '_auth': authHeader
                }
            })
        },
        onSuccess: (data) => {
         console.log(data.data.token)
         setSucess('data added successfully')
         setTitle('')
         setDescription('')
         setCatagory('')
         setImage('')
         setImagelink('')
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
        if(Title)formData.append('Title', Title)
        if(Description)formData.append('Description', Description)
        if(catagory)formData.append('Catagory', catagory)
        if(Image)formData.append('image', Image)
        mutation.mutate(formData)
       
    }
    const { data , isLoading , error}=UseCatagory()
  return (
    <div className='w-full h-full'>
        <div><p className='text-3xl mb-2'>Add Project Data</p></div>
        {sucess && <p className='text-green-500 text-md mx-4 font-bold'>{sucess}</p>}
        {Error && <p className='text-red-500 text-md mx-4 font-bold'>{Error}</p>}
    
        <div className='flex flex-row '>
            <div>
            <div className=' w-[500px] h-[100px] flex-col  p-3 flex'>
    <label className='text-black font-bold'>Title</label>
    <input value={Title}  onChange={(e)=>{setTitle(e.target.value)}} className=' mt-3 w-[80%] text-black h-[40px]'/>

</div>
<div className=' w-[500px] h-[100px] flex-col  p-3 flex'>
    <label className='text-black font-bold'>Description</label>
    <input  value={Description} onChange={(e)=>{setDescription(e.target.value)}}  className=' mt-3 w-[80%] text-black h-[40px]'/>

</div>
<div className=' w-full h-[200px]   flex flex-row  items-center   my-2'>
<img className=' w-[200px] h-[200px] rounded-md mt-2 ml-2' src={imagelink}/>
   <input type='file' onChange={handlefilechange}    accept='image/*' className=' w-[300px] text-black mx-4 flex justify-center bg-gray-300 items-center'/>
    </div>
            </div>
            <div>
            <div className=' w-[500px]  flex-col  p-3 flex'>
 
    <form class="max-w-sm mx-auto">
  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose A Catagory</label>
  <select value={catagory} onChange={(e)=>{setCatagory(e.target.value)}} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>choose Catagory</option>
    {data?.data.map((catagory)=>(<option value={catagory._id}>{catagory.Name}</option>))}
  
  </select>
</form>


</div>
<button onClick={handleSubmit} className=' mt-3 w-[80%] text-white h-[40px] bg-black'>Add</button>

            </div>
        </div>
   

    </div>
  )
}
