import {Link, React, useState} from '../export'

const Nav = () => {
  const [login, setLogin] = useState(true)
  const navigationMenu = [
    {path:"/", name:"Beranda"},
    {path:"/profile", name:"Profile"},
    {path:"/posting", name:"Buat Postingan"},
  ]
  return (
    <div className='nav left-5 bg-gray-300 py-10'>
      {!login &&(
        <div className="nav-btn-container">
          <Link to={"/register"} className='btn-stroke px-3 text-center text-xs lg:text-sm lg:px-10'>sign up</Link>
          <Link to={"/login"} className='btn-primary px-3 text-center text-xs lg:text-sm lg:px-10'>login</Link>
        </div>
      )}

      {login &&(
        <div className='flex items-center gap-10'>
          {navigationMenu.map((element, index) => (
            <Link key={index} to={element.path} className='text-secondary text-sm font-bold font-inter hover:text-secondary/60 transition-all duration-300'>{element.name}</Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Nav
