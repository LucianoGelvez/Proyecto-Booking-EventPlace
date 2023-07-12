import React, { useContext } from 'react';
import '../styles/componentsStyles/basicToOwner/BasicToOwner.css';
import { GlobalContext } from '../components/utils/GlobalContext';
const ChangeBasicToOwner = () => {
    const { endpoint } = useContext(GlobalContext);
    const currentRole = localStorage.getItem("userType");


    function changeRole() {
        const url = `http://${endpoint}:8080/user/changeRole`;
        const token = JSON.parse(localStorage.getItem("token"));

        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (response.ok) {
                    localStorage.setItem("userType", "OWNER")
                    window.location.href = "/";
                } else {
                    throw new Error('Error en la solicitud');
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    return (
        <div className='changeRoleMessage'>
            <p>Increase your user role to Owner and start renting out your spaces on EventPlace.</p>
            <button onClick={changeRole}>Become an Owner User</button>
        </div>
    );
};

export default ChangeBasicToOwner;