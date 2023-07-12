import React, { useContext, useEffect, useRef, useState } from 'react';
import '../styles/componentsStyles/admin/categories.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import close from '../images/close.svg'
import { GlobalContext } from '../components/utils/GlobalContext';
function AdminCategoriesManagement() {
  const { endpoint } = useContext(GlobalContext);
  const [categoryName, setCategoryName] = useState('');
  const [render, setRender] = useState(false);
  const [image, setImage] = useState();
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [sureToDelete, setSureToDelete] = useState(false);
  const [loading, setLoading] = useState(false)
  const deleteRef = useRef(null);
  const buttonRef = useRef(null);


  const handleDocumentClick = (event) => {
    if (
      deleteRef.current &&
      !deleteRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
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

  useEffect(() => {
    const url = `http://${endpoint}:8080/categories/allCategories`;

    const token = JSON.parse(localStorage.getItem("token"));
    fetch(url, {
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
        setCategories(data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [render]);

  const handleDeleteCategory = (id) => {

    const url = `http://${endpoint}:8080/categories/deleteCategory/${id}`;
    const token = JSON.parse(localStorage.getItem("token"));
    setSureToDelete(false)


    fetch(url, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          setRender(!render)
        } else {
          throw new Error("Failed to delete category");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };


  const handleCreateCategory = () => {

    setLoading(true)
    const newCategory = {
      title: categoryName,
      description: categoryDescription,
    };

    const url = `http://${endpoint}:8080/categories/addCategory`;
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(url, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCategory)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create category");
        }
      })
      .then(data => {
        const categoryId = data;

        const formData = new FormData();
        formData.append('file', image);
        formData.append('id', categoryId);

        fetch(`http://${endpoint}:8080/categories/images`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })
          .then(response => {
            if (response.ok) {
              setRender(!render)
              setCategoryName('')
              setCategoryDescription('')
              setImage(null)
              setLoading(false)
              setPreviewImage(null)
        
            } else {
              throw new Error("Failed to add image");
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  function deletePreview() {
    setPreviewImage(null)
    setImage(null)
  }

  function handleDeleteCategory2(index) {
    localStorage.setItem("indexToDelete", index);
    setSureToDelete(true)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "250px" }}>
      <div className="categories-container">

        <h1 >Add new categories for different locations.</h1>
        <div className="categories-container_input">
          <label className="categories-container_label">Category name:</label>
          <input
            className="categories-container_input-field"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="categories-container_input">
          <label className="categories-container_label">Category description:</label>
          <textarea
            className="categories-container_input-field"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="categories-container_input">
          <label className="categories-container_label">Category image:</label>
          <input
            className="categories-container_input-field"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {previewImage &&
          <article className='categories_image_preview_container'>
            <img onClick={() => deletePreview()} src={close} />
            <img className='categories_image_preview' src={previewImage} />
          </article>
        }
        <button className="categories-container_button" onClick={handleCreateCategory}>
          Create
        </button>
      </div>

      {
        loading &&
        <div className='categories_loading'>
          Loading
        </div>
      }

      {sureToDelete &&
        <article ref={deleteRef} className='categories_sure_to_delete'>
          <div>Are your sure you want to delete? All eventPlaces associated to this category will be deleted.</div>
          <button onClick={() => handleDeleteCategory(localStorage.getItem("indexToDelete"))}>Delete</button>
        </article>
      }

      <section className="current-categories-container" >
        {categories.map((category, index) => (

          <div ref={buttonRef} className="cardWrap" key={index}>

            <div className="card" style={{
              borderRadius: "25px",
              position: "relative",

            }}>
              <div className="delete-icon" onClick={() => handleDeleteCategory2(category.id)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </div>
              <div className="cardBg" style={{ backgroundImage: `url(${category.urlImage})` }}>   </div>
              <div className="cardInfo" >
                <h3 className="cardTitle">{category.title}</h3>
                <p>{category.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}

export default AdminCategoriesManagement;