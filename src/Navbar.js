import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useUserAuth } from "./context/UserAuthContext";
import {Dropdown, Avatar, Navbar} from "flowbite-react"

function NavBar({handleLogout}) {

  const {user} = useUserAuth();

  const [activePage, setActivePage] = useState("explore");

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (

    <>
    <Navbar
  fluid={true}
  rounded={true}
>
  <Navbar.Brand>
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      streetwear-bc
    </span>
  </Navbar.Brand>
  <div className="flex md:order-2">
  <Dropdown
      arrowIcon={true}
      inline={true}
      label={<Avatar alt="User settings" img={user.photoURL} rounded={true}/>} 
    >
      <Dropdown.Header>
        <span className="block text-sm">
          {user.displayName}
        </span>
        <span className="block truncate text-sm font-medium">
          {user.email}
        </span>
      </Dropdown.Header>
      <Dropdown.Item>
        <Link to="setting" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>
        <a onClick={()=>handleLogout()}href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
      </Dropdown.Item>
</Dropdown>
    <Navbar.Toggle />
  </div>
  <Navbar.Collapse>
    <Navbar.Link
      active={activePage === "explore"}
      onClick={() => handlePageChange("explore")}
    >
      <Link to="/explore" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Explore</Link>
    </Navbar.Link>
    <Navbar.Link
      active={activePage === "profile"}
      onClick={() => handlePageChange("profile")}
    >
      <Link to="profile" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</Link>
    </Navbar.Link>
  </Navbar.Collapse>
</Navbar>

    </>

  )
}

export default NavBar