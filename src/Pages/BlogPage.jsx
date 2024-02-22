import React from 'react'
import UseFetchBlog from '../Hooks/UseFetchBlog'
import axios from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useNavigate } from 'react-router-dom'

export default function BlogPage() {
    const {error,data,isLoading,refetch}=UseFetchBlog()
    const [sucess , setSucess] = React.useState()
    const [Error , setError] = React.useState()
    const authHeader = useAuthHeader();
    const navigate = useNavigate()
    

    const handleDelete=(id)=>{

      axios.delete(`https://crabby-frog-swimsuit.cyclic.app//blog/${id}` ,{ headers: { _auth: authHeader} }).then((res)=>{
        setSucess('Blog Deleted')
        refetch()
      }).catch((err)=>{
        setError(err?.response?.data)
      })

    }
  return (
    <div className='flex flex-row   w-full h-full '>

        <div className='  w-1/3'>
          <div className=' bg-white w-full h-[100px] flex items-center  flex-col justify-center '>
            <h1 className='text-3xl'>Posted Blogs</h1>
            
            <p className='text-md text-red-500'> {Error}</p>
            <p className='text-md text-green-500'> {sucess}</p>
          </div>
          <div className='  bg-white h-[420px] w-full flex  items-center overflow-y-auto mb-2  flex-col'>
            {data?.data === null &&<p>You Have Not Posted Any Blog yet</p>}
            {data?.data?.map((item)=>{
                return(
                  <div className='w-[90%] shrink-0  justify-between items-center flex flex-row h-[80px] mt-2'>
                  <img className='w-[80px] h-[80px] rounded-sm' src={item?.image}/>
                             <div className='flex flex-col'>
                              <div><h1 className='text-xl line-clamp-1 px-2'>{item.Title}ddddm dddd dd d d</h1></div>
                              <div><p className='text-sm px-4 line-clamp-2 '>{item.Description}</p></div>
                             </div>
                             <div onClick={()=>handleDelete(item._id)} className='w-[100px] h-[50px] items-center justify-center bg-black  flex rounded-md'>
                       <p className='text-white'>delete</p>
                             </div>
                              </div>
                )
            })}
          
           
          </div>
          <div className=' bg-white  w-full flex items-center justify-center '>
          <button onClick={()=>navigate('addblog')} className=' bg-black w-[400px] text-white rounded-md h-[50px]'>Add New Blog</button>
       
          </div>
         
        
        </div>
        <div className='  flex items-center justify-center w-2/3'>
          <p>Blog Statics Will be here</p>
        </div>
    </div>
  )
}
