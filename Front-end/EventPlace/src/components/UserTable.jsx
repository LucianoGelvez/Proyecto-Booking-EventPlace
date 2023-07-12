import React, { useState, useEffect, useContext } from 'react';
import "../styles/componentsStyles/admin/userTable/UserTable.css"
import { GlobalContext } from './utils/GlobalContext';

const UserTable = () => {
  const { endpoint } = useContext(GlobalContext);
  const [users, setUsers] = useState([])
  const [sureToDelete, setSureToDelete] = useState(false)
  const [roles, setRoles] = useState([])
  const [filteredUsers, setFilteredUsers] = useState("")
  const [updated, setUpdated] = useState(false)
  const [render, setRender] = useState(false)



  useEffect(() => {
    const url = `http://${endpoint}:8080/user`;
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setUsers(data);

        if (Array.isArray(data)) {
          if (filteredUsers == "") {
            setUsers(data);
          } else {
            const filtered = data.filter(user => user.name === filteredUsers);
            setUsers(filtered);
          }
        } else {
          console.log("Error: Data is not an array");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [filteredUsers]);


  useEffect(() => {
    const url = `http://${endpoint}:8080/roles/allRole`;
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
        setRoles(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [render]);

  const handleInputChange2 = (e) => {
    setFilteredUsers(e.target.value);
  };


  const handleUpdateUser = (id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const userToUpdate = users.find(user => user.id == id);
    userToUpdate.role = {
      name: userToUpdate.role
    }
    console.log(userToUpdate)

    if (userToUpdate) {
      fetch(`http://${endpoint}:8080/user`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userToUpdate)
      })
        .then(response => {
          if (response.ok) {
            setUpdated(true)
            setTimeout(() => {
              setUpdated(false);
            }, 6000);
          }
          return response.json();
        })
        .then(data => {
        })
        .catch(error => {
        });
    }
  };

  function sureDel() {
    setSureToDelete(false)
    const id = localStorage.getItem("deleteId")
    handleDeleteUser(id)
  }





  const handleDeleteUser = (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(id)

    fetch(`http://${endpoint}:8080/user/deleteUserById/` + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          window.location.reload();
        } else {
          console.error('Error al realizar el DELETE');
        }
      })
      .catch(error => {
        console.error('Error de red:', error);
      });

  };

  const handleInputChange = (e, userId, field) => {
    const value = e.target.value;
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          return { ...user, [field]: value };
        }
        return user;
      });
    });
  };

  return (
    <div className="user-table_container" >
      {users != [] &&






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

              <h1>Registered users</h1>
              <div className="input-group">
                <input className='input-style'
                  type="search"
                  placeholder="Search Data..."
                  value={filteredUsers}
                  onChange={(e) => setFilteredUsers(e.target.value)}
                />
              </div>
            </section>
            {updated &&
              <div style={{ backgroundColor: "#e74d11", width: "50vw", height: "5vh", color: "white", borderRadius: "0.5vw", display: "flex", justifyContent: "center", alignItems: "center" }}>User updated, remember that if you changed email the user will need to verify it again!</div>
            }
            <section className="table__body">
              <table>
                <thead>
                  <tr>
                    <th className='tableleftCorner'>Username</th>
                    <th>Name</th> 
                    <th>Last name</th> 
                    <th>Password</th>
                    <th>National ID</th>
                    <th>User Type</th>
                    <th className='tableRightCorner'></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>
                        <input className='input-style'
                          type="text"
                          value={user.username}
                          onChange={e => handleInputChange(e, user.id, 'username')}
                        />
                      </td>
                      <td>
                      <input className='input-style'
                          type="text"
                          value={user.name}
                          onChange={e => handleInputChange(e, user.id, 'name')}
                        />
                      </td>
                      <td>
                      <input className='input-style'
                          type="text"
                          value={user.lastName}
                          onChange={e => handleInputChange(e, user.id, 'lastName')}
                        />
                      </td>
                      <td>
                      <input className='input-style'
                          type="password"
                          value={user.password}
                          onChange={e => handleInputChange(e, user.id, 'password')}
                        />
                      </td>
                      <td>
                      <input className='input-style'
                          type="text"
                          value={user.nationalID}
                          onChange={e => handleInputChange(e, user.id, 'nationalID')}
                        />
                      </td>
                      <td>
                        <select className='roles-select'
                          type="text"
                          onChange={e => handleInputChange(e, user.id, 'role')}
                          value={user.role.name}
                        >
                          {roles.map(rol => (
                            <option key={rol.id} value={rol.name}>
                              {rol.name}
                            </option>
                          ))}
                        </select>

                      </td>
                      <td>
                        <button 
                          className="status delivered update-delete_roles-buttons"
                          onClick={() => handleUpdateUser(user.id)}
                        >
                          Update
                        </button>
                        <button
                          className="status cancelled update-delete_roles-buttons"
                          onClick={() => {
                            setSureToDelete(true);
                            localStorage.setItem('deleteId', user.id);
                          }}
                        >
                          Delete
                        </button>

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

export default UserTable;