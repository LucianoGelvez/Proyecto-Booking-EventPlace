import React, { useContext, useEffect, useRef, useState } from 'react'
import '../styles/componentsStyles/userProfile/UserProfile.css';
import profilePic from '../images/profilePic.svg'
import close from '../images/close.svg'
import { GlobalContext } from '../components/utils/GlobalContext';

const UserProfile = () => {
  const { endpoint } = useContext(GlobalContext);
  const [userDeleted, setUserDeleted] = useState(false)
  const [userUpdated, setUserUpdated] = useState(false)
  const [sureToDelete, setSureToDelete] = useState(false)
  const [changeImage, setChangeImage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [possibleCities, setPossibleCities] = useState([]);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);
  const deleteRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: '',
    lastName: '',
    username: '',
    password: '',
    nationalID: '',
    profileImage: '',
    location: {
      street: '',
      number: '',
    },
    city: {
      nameCity: '',
      state: '',
      country: ''
    }
  });

  const handleDocumentClick = (event) => {
    if (
      imageRef.current &&
      !imageRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setChangeImage(false);
    }

    if (
      deleteRef.current &&
      !deleteRef.current.contains(event.target) &&
      !buttonRef2.current.contains(event.target)
    ) {
      setSureToDelete(false);
    }

  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleVaccineSelection = (event) => {
    const selectedValue = event.target.value;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      vaccines: selectedValue,
    }));
  };

  const handleCityChange = (cityObj) => {
    if (cityObj != undefined) {
      setProfileData((prevPlace) => ({
        ...prevPlace,
        city: {
          ...prevPlace.city,
          nameCity: cityObj.nameCity,
          state: cityObj.state,
          country: cityObj.country,
        },
      }));
    }
  };


  useEffect(() => {
    fetch(`http://${endpoint}:8080/user/` + localStorage.getItem("id"), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const updatedData = {
          ...data,
          city: data.city || { nameCity: '', state: '', country: '' },
          location: data.location || { street: '', number: ''},
          nationalID: data.nationalID || ""
        };
        setProfileData(updatedData);
        console.log(profileData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);



  function update() {
    setLoading(true)
    setUserUpdated(false)
    console.log(profileData)
    fetch(`http://${endpoint}:8080/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
      body: JSON.stringify(profileData),
    })
      .then(response => {
        if (response.ok) {
          setLoading(false)
          setUserUpdated(true);

        } else {
          console.error('Error en la actualización:', response.status);
        }
      })
      .catch(error => {
        console.error('Error en la actualización:', error);
      });
  }


  const handleInputChange = e => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };


  function del() {
    const url = `http://${endpoint}:8080/user/deleteUserById/` + localStorage.getItem("id");

    fetch(url, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    })
      .then(response => {
        if (response.ok) {
          setUserDeleted(true)
          setTimeout(function () {
            window.location.href = "/";
          }, 2000);

        } else {
          console.log("Error al eliminar el elemento");
        }
      })
      .catch(error => {
        console.log("Error en la solicitud:", error);
      });
  }

  function sureDel() {
    setSureToDelete(false)
    del()
  }


  useEffect(() => {
    const urlCities = `http://${endpoint}:8080/cities/allCities`;
    const token = JSON.parse(localStorage.getItem("token"))

    fetch(urlCities, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then(data => {
        console.log(data);
        setPossibleCities(data);
        console.log(possibleCities)
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setFilePreview(URL.createObjectURL(file));
  };

  const handleSaveChanges = () => {
    const formData = new FormData();
    const token = JSON.parse(localStorage.getItem("token"))
    const userId = localStorage.getItem('id');
    formData.append('file', selectedImage);
    formData.append('id', userId);


    fetch(`http://${endpoint}:8080/user/uploadImage`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          window.location.reload()
          console.log('Image uploaded successfully');
        } else {
          console.error('Error uploading image');
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  function deleteImage() {
    const url = `http://${endpoint}:8080/user/deleteImage/` + localStorage.getItem("id")
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token"))
      }
    })
      .then(response => {
        if (response.ok) {
          setChangeImage(false)
          return response.json()
        } else {
          throw new Error('Error en la solicitud DELETE');
        }
      })
      .then(data => {
        console.log(data);
        const updatedData = {
          ...data,
          city: data.city || { nameCity: '', state: '', country: '' },
          location: data.location || { street: '', number: ''},
          nationalID: data.nationalID || ""
        };
        setProfileData(updatedData);
        console.log(profileData);
      })
      .catch(error => {
        console.error(error);
      });

  }

  const handleNationalIDSelection = (event) => {
    const selectedValue = event.target.value;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      nationalID: selectedValue,
    }));
  };


  return (
    <section className="profile">
      <div className={sureToDelete ? "profile__content" : ""}>

        <h1 class="profile__title">Edit Profile</h1>
        {profileData.profileImage != null && profileData.profileImage != '' ?
          <div className='profile_image'>
            <img src={profileData.profileImage} />
            <button ref={buttonRef} onClick={() => setChangeImage(true)}>Change image</button>
          </div> :
          <div className='profile_image'>
            <img src={profilePic} />
            <button ref={buttonRef} onClick={() => setChangeImage(true)}>Change image</button>
          </div>
        }
        {changeImage && (
          <div className='profile_change_pic'>
            {(profileData.profileImage != null && profileData.profileImage !== '') || selectedImage != null ? (
              <div ref={imageRef}>
                {
                  selectedImage == null ?
                    <img src={profileData.profileImage} />
                    :
                    <img src={filePreview} />
                }
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <article>
                  <button className='profile_change_pic_delete' onClick={deleteImage}>Delete Image</button>
                  <button onClick={handleSaveChanges}>Save changes</button>
                </article>
              </div>
            ) : (
              <div ref={imageRef}>
                <img src={profilePic} />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <article>
                  <button onClick={handleSaveChanges}>Save changes</button>
                </article>
              </div>
            )}
          </div>
        )}


        <article className="profile_from_group">
          <form className="profile__form">
            <label htmlFor="name" class="profile__label">Name:</label>
            <input type="text" id="name" name="name" className="profile__input" value={profileData.name} onChange={handleInputChange} required />

            <label htmlFor="lastName" class="profile__label">Last Name:</label>
            <input type="text" id="lastName" name="lastName" className="profile__input" value={profileData.lastName} onChange={handleInputChange} required />

            <label htmlFor="lastName" class="profile__label">Location: </label>
            <select
              className="profile__input" id="city"
              onChange={(e) => { const selectedCity = possibleCities.find(
                  (city) => city.nameCity === e.target.value );
                handleCityChange(selectedCity); }} value={profileData.city.nameCity} >
              {profileData.city.nameCity != '' ?
                <option value="">
                  {profileData.city.nameCity} {profileData.city.state} {profileData.city.country}
                </option>
                :
                <option>
                  Select a city
                </option>
              }
              {possibleCities.map((city, index) => (
                city.nameCity !== profileData.city.nameCity && (
                  <option key={index} value={city.nameCity}>
                    {city.nameCity} {city.state} {city.country}
                  </option>
                )
              ))}
            </select>
          </form>
          <form class="profile__form">
              
            <label className="profile__label" htmlFor="">National ID </label>
            <input className="profile__input" onChange={handleNationalIDSelection} value={profileData.nationalID} />

            <label htmlFor="street" className="profile__label">
              Street:
            </label>
            <input type="text" id="street" name="location.street" className="profile__input" value={profileData.location.street} onChange={e => setProfileData(prevProfileData => ({ ...prevProfileData, location: { ...prevProfileData.location, street: e.target.value, }, }))} required />

            <label htmlFor="number" className="profile__label">
              Number:
            </label>
            <input type="text" id="number" name="location.number" className="profile__input" value={profileData.location.number} onChange={e => setProfileData(prevProfileData => ({ ...prevProfileData, location: { ...prevProfileData.location, number: e.target.value, }, }))} required />

          </form>
        </article>
        <div class="profile_email">
        <label for="username" class="profile__label__email">Email:</label>
        </div>
        <div class="profile_email">
        <input type="text" id="username" name="username"  value={profileData.username} onChange={handleInputChange} required />
        </div>
      </div>
      {sureToDelete &&
        <article ref={deleteRef} className='profile_sure_to_delete'>
          <div>Are your sure you want to delete?</div>
          <button onClick={sureDel}>Delete</button>
        </article>
      }
      {userDeleted && <div className='profile__changes_succes'>The user was deleted succesfully!</div>}
      {loading && <div className='loading'>Loading</div>}
      {userUpdated && <div className='profile__changes_succes'>The user was updated succesfully, if you changed the email you will need to verify it again!</div>}
      <div className={sureToDelete ? "profile__content" : ""}>

        <div className='profile_change_buttons'>
          <button ref={buttonRef2} onClick={() => setSureToDelete(true)} type="submit" name="deleteAccount" className="profile__button profile__button--delete">Delete Account</button>
          <button onClick={update} type="submit" name="save" class="profile__button profile__button--save">Save Changes</button>
        </div>
      </div>

    </section>

  )
}

export default UserProfile