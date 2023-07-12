import React, { useState, useEffect, useContext } from 'react';
import "../styles/componentsStyles/admin/rolesAdmin/roles.scss";
import UserTable from '../components/UserTable';
import axios from 'axios';
import { GlobalContext } from '../components/utils/GlobalContext';

function AdminRolesManagement() {
  const { endpoint } = useContext(GlobalContext);
  const [roles, setRoles] = useState([])
  const [roleToUpdate, setRoleToUpdate] = useState("ADMIN")
  const [roleId, setRoleId] = useState(0)
  const [description, setDescription] = useState('');
  const [newRole, setNewRole] = useState(false)
  const [render, setRender] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [permissions, setPermissions] = useState({
    READ_EVENTS: false,
    CREATE_EVENTS: false,
    UPDATE_EVENTS: false,
    DELETE_EVENTS: false,
    READ_USERS: false,
    CREATE_USERS: false,
    UPDATE_USERS: false,
    DELETE_USERS: false,
    READ_ROLE: false,
    CREATE_ROLE: false,
    UPDATE_ROLE: false,
    DELETE_ROLE: false,
    READ_CATEGORY: false,
    DELETE_CATEGORY: false,
    UPDATE_CATEGORY: false,
    CREATE_CATEGORY: false,
    CREATE_CITY: false,
    UPDATE_CITY: false,
    DELETE_CITY: false,
    READ_CITY: false,
    READ_BOOKING: false,
    UPDATE_BOOKING: false,
    DELETE_BOOKING: false,
    READ_BOOKING: false
  });


  const createRole = () => {

    let httpMethod = "POST";

    const url = `http://${endpoint}:8080/roles`;
    const token = JSON.parse(localStorage.getItem("token"));

    const filteredPermissions = Object.entries(permissions)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key)
      .join(', ');

    let bodyFetch = {
      name: name,
      description: description,
      permissions: filteredPermissions.split(", ")
    }
    
    fetch(url, {
      method: httpMethod,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyFetch)
    })
      .then(response => response.json())
      .then(data => {
        setRender(!render)
      })
      .catch(error => {
        console.log(error);
      });

  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const renderPermissions = () => {
    const handlePermissionChange = (e) => {
      const { name, checked } = e.target;
      console.log(name)
      console.log(checked)
      setPermissions((prevPermissions) => ({
        ...prevPermissions,
        [name]: checked,
      }));
    };

    const categories = {
      EVENTS: ["READ", "UPDATE", "CREATE", "DELETE"],
      USERS: ["READ", "UPDATE", "CREATE", "DELETE"],
      BOOKING: ["READ", "UPDATE", "CREATE", "DELETE"],
      ROLE: ["READ", "UPDATE", "CREATE", "DELETE"],
      CATEGORY: ["READ", "UPDATE", "CREATE", "DELETE"],
      CITY: ["READ", "UPDATE", "CREATE", "DELETE"]
    };

    return (
      <div className='checkbox-container'>

        {Object.entries(categories).map(([category, permissions2 ], index) => (
          <div className='roles-permissions__checkbox-container-bg'>
            <div className='roles-permissions__checkbox-container'
              key={category}
            >
              <div className="roles-permissions__title">{category}</div>
              {permissions2.map((permission) => (
                <div className="checkbox-aligner" key={permission} >
                  <label className="checkbox-btn">
                    {permission}
                    <label htmlFor="checkbox"></label>
                    <input
                      id="checkbox"
                      type="checkbox"
                      name={`${permission}_${category}`}
                      checked={permissions[permission + "_" + category]}
                      onChange={handlePermissionChange}

                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  };


  useEffect(() => {
    console.log(permissions);

    if (permissions != null && permissions != undefined) {
      roles.map((rol, i) => {
        if (rol.name === roleToUpdate) {
          setDescription(rol.description)
          setRoleId(rol.id)
          const updatedPermissions = { ...permissions };
          Object.keys(updatedPermissions).forEach(permissionKey => {
            if (rol.permissions.includes(permissionKey)) {
              updatedPermissions[permissionKey] = true;
            } else {
              updatedPermissions[permissionKey] = false;
            }
          });
          setPermissions(prevPermissions => ({ ...prevPermissions, ...updatedPermissions }));
        }
      });
    }
    console.log(permissions);
  }, [roleToUpdate, roles]);



  return (
    <>
        <div className="roles-container">

          <div className="main-container">
            <form onSubmit={handleSubmit} className="permissions-form">

              <div className='roles-permissions-container'>
                <div className="permissions-container">

                  <h2 style={{ fontSize: "30px" }} className="permissions-header">Roles Creation and Permissions</h2>

                  <div className="roles-description-container">



                    <div className="new-role-container">
                      <div className="new-role-name">
                        <h2>Create new role name:</h2>

                        <input
                          className="new-role-input"
                          type="text"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                    </div>

                    <h2>Description:</h2>

                    <input
                      className="roles-description-input"
                      type="text"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </div>
                  <h2 className="permissions-header">Please select all the permissions you want to give to a Role:</h2>{renderPermissions()}
                  <button className="roles-button" onClick={createRole} type="submit">
                    Submit
                  </button>
                </div>

              </div>
            </form>

          </div>
        </div>

    </>
  );
}

export default AdminRolesManagement;
