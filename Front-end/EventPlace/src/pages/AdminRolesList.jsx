import React, { useState, useEffect, useContext } from 'react';
import "../styles/componentsStyles/admin/userTable/UserTable.css"
import { Link } from 'react-router-dom';
import { GlobalContext } from '../components/utils/GlobalContext';

const AdminRolesList = () => {
  const { endpoint } = useContext(GlobalContext);
  const [sureToDelete, setSureToDelete] = useState(false)
  const [roles, setRoles] = useState([])
  const [filteredUsers, setFilteredUsers] = useState("")
  const [updated, setUpdated] = useState(false)
  const [render, setRender] = useState(false)

  useEffect(() => {
    const url = `http://${endpoint}:8080/roles/allRole`;
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setRoles(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [render]);




  return (
    <div className="user-table_container" >
      {roles != [] &&

      <div className='registered-users_container'>
        <main className="table">
          {sureToDelete &&
                  <article class='table_sure_to_delete'>
                    <div>Are your sure you want to delete?</div>
                    <button onClick={() => sureDel()}>Delete</button>
                  </article>
                }
          <div className={sureToDelete ? "profile__content" : ""}>

            <section className="table__header">

              <h1>Roles table</h1>
              <div className="input-group">
                <Link to="/rolesManagement">
              <button className='roles-select'>CREATE ROLE</button>
              </Link>
              </div>
            </section>
            {updated &&
              <div style={{ backgroundColor: "#e74d11", width: "50vw", height: "5vh", color: "white", borderRadius: "0.5vw", display: "flex", justifyContent: "center", alignItems: "center" }}>User updated, remember that if you changed email the user will need to verify it again!</div>
            }
            <section className="table__body">
              <table>
                <thead>
                  <tr>
                    <th className='tableleftCorner'>Role Name</th>
                   
                    <th>Description</th> 
                
                    <th ></th>
                    <th className='tableRightCorner'></th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map(role => (
                    <tr key={role.id}>
                    
                      <td>
                      <div className='input-style'>{role.name}</div>
                      </td>
                      <td>
                      <div className='input-style'>{role.description}</div>
                      </td>
                      <td>
                      <Link to={`/rolesUpdate/${role.name}`}>
                        <button 
                          className="status delivered update-delete_roles-buttons"
                        >
                          Update
                        </button>
                        </Link>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </main>
        </div>
        
    
      }
      
    </div>

  );
};

export default AdminRolesList;