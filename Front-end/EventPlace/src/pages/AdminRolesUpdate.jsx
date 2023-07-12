import React, { useState, useEffect, useContext } from 'react';
import "../styles/componentsStyles/admin/rolesAdmin/roles.scss";
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../components/utils/GlobalContext';


function AdminRolesUpdate() {
  const { endpoint } = useContext(GlobalContext);
  const [role, setRole] = useState()
  const [roleId, setRoleId] = useState(0)
  const [newRole, setNewRole] = useState(false)
  const [render, setRender] = useState(false)
  const { roleName } = useParams();
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
  useEffect(() => {

    let permissionsObj = {
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
    }
    if (role) {
      role.permissions.map((permission) => {
        if (permissions.hasOwnProperty(permission)) {
          permissionsObj[permission] = true;
        }
      });
    }
    console.log(permissionsObj)
    setPermissions(permissionsObj)

  }, [role]);
  

  const createRole = () => {
    let httpMethod = "PUT";

    const url = `http://${endpoint}:8080/roles`;
    const token = JSON.parse(localStorage.getItem("token"));

    const filteredPermissions = Object.entries(permissions)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key)
      .join(', ');
    console.log(filteredPermissions)

    let bodyFetch = {}

 
      bodyFetch = {
        id: role.id,
        name: role.name,
        description: role.description,
        permissions: filteredPermissions.split(",")
      }

    console.log(bodyFetch)
    console.log(JSON.stringify(bodyFetch));
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
        console.log(data);
        const newRoles = [...role, data];
        setRole(newRoles);
        setRender(!render)
      })
      .catch(error => {
        console.log(error);
      });

  };


  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const url = `http://${endpoint}:8080/roles/` + roleName;
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token)
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setRole(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [render]);

  useEffect(() => {
    function handleClick() {
      console.log(permissions);
    }

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  

 

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


  return (
    <>
      <div className="roles-container">
        {role &&
        <div className="main-container">
          <form onSubmit={handleSubmit} className="permissions-form">

            <div className='roles-permissions-container' >
              <div className="permissions-container" >

                <h2 style={{ fontSize: "30px" }} className="permissions-header">Update your Role:</h2>

                <div className="roles-description-container">



                  <div className="new-role-container" >
                    <div className="new-role-name">
                      <h2 style={{ marginBottom: "15px" }}>Update your current role name (Optional):</h2>

                      <input
                        className="new-role-input"
                        type="text"
                        value={role.name}
                        placeholder=".."
                        onChange={(event) => setRole({ ...role, name: event.target.value })}
                      />

                      <div className="new-role-name">
                        <h2 style={{ marginBottom: "15px" }}>Update your current role description (Optional):</h2>
                        <input
                          className="roles-description-input"
                          type="text"
                          value={role.description}
                          onChange={(event) => setRole({ ...role, description: event.target.value })}
                        />
                      </div>

                    </div>
                  </div>


                </div>

                <h2 className="permissions-header">Please select all the permissions you want to give to a update:</h2>{renderPermissions()}
                <button className="roles-button" onClick={createRole} type="submit">
                  Submit
                </button>
              </div>

            </div>
          </form>
        </div>
        }

      </div>

    </>
  );
}

export default AdminRolesUpdate;
