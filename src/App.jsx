
import './App.css'
import { Route,Routes, useLocation} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import Header from './component/Header'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import BlogPage from './Pages/BlogPage'
import AddBlogPage from './Pages/AddBlogPage'
import ProjectPage from './Pages/ProjectPage'
function App() {
  const location = useLocation()  
  const isLoginPage = location.pathname === "/login"

  return (
   <div className='min-h-screen overflow-hidden min-w-screen bg-gray-100'>
 {!isLoginPage && <Header/> }
<Routes>
<Route path='/login' element={<LoginPage/>}/>
<Route element={<AuthOutlet fallbackPath='/login' />}>
<Route path='/' index element={<HomePage/>}/>
<Route path='/blog' element={<BlogPage/>}/>
<Route path='/blog/addblog' element={<AddBlogPage/>}/>
<Route path='/project' element={<ProjectPage/>}/>
</Route>

</Routes>
   </div>
  )
}

export default App
