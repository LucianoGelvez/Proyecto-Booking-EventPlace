import React, { useContext, useEffect, useRef, useState } from 'react'
import '../styles/componentsStyles/header/Header.css';
import profilePic from '../images/profilePic.svg'
import Logo from '../images/Logo.png';
import Twitter from '../images/twitter.svg';
import Facebook from '../images/facebook.svg';
import Whatsapp from '../images/whatsapp.svg';
import { Link, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { routes } from '../Routes';
import { string } from 'yup';
import share from '../images/share.svg'
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { GlobalContext } from './utils/GlobalContext';

const Header = () => {
  const { endpoint } = useContext(GlobalContext);
  const [socialMedia, setSocialMedia] = useState(false)
  const [url, setUrl] = useState('')
  const socialMediaRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);
  const buttonRef3 = useRef(null);
  const mediaRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);


  const iniciales = convertirIniciales();
  function convertirIniciales() {
    if (localStorage.getItem('iniciales') == string) {
      return localStorage.getItem('iniciales').toUpperCase();
    } else {
      return localStorage.getItem('iniciales');
    }

  }

  const handleDocumentClick2 = (event) => {
    if (
      mediaRef.current &&
      !mediaRef.current.contains(event.target) &&
      !buttonRef2.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick2);

    return () => {
      document.removeEventListener('click', handleDocumentClick2);
    };
  }, []);

  const name = nameToConvert();
  function nameToConvert() {
    if (localStorage.getItem('name') == string) {
      return localStorage.getItem('name');
    } else {
      return localStorage.getItem('name');
    }

  }

  const currentRole = localStorage.getItem("userType");


  const logOut = () => {
    localStorage.clear()
    window.location.href = '/';
  };
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  function handleBurgerMenu() {
    setBurgerMenuOpen(!burgerMenuOpen)
  }

  const handleDocumentClick = (event) => {
    if (
      socialMediaRef.current &&
      !socialMediaRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target) &&
      !buttonRef3.current.contains(event.target)
    ) {
      setSocialMedia(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);



  const handleShareButtonClick = () => {
    setSocialMedia((prevState) => !prevState);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 100);
  };


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
          city: data.city || { nameCity: '', state: '', country: '' }
        };
        setProfileData(updatedData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [profileData.profileImage]);


  return (
    <div className={`header ${isScrolled ? 'transparentHeader' : ''}`}>      <div className='header_logo' >
      <Link to={routes.home}>
        <img src={Logo} alt="Logo de la aplicacion" />
      </Link>
    </div>
      <div ref={buttonRef3} onClick={handleShareButtonClick} className='header_share'><img className='header_share__net' src={share} alt="share" /></div>
      <div className='burgerMenu'>
        {currentRole != null ? (
          <div className='userBurgerMenu'>
            {socialMedia && !url.startsWith(`http://${endpoint}:8080/details`) &&

              <div ref={socialMediaRef} className='burgerMenu_userBurgerMenu_share'>
                <FacebookShareButton url='http://eventplace-equipo4-bucket.s3-website.us-east-2.amazonaws.com/' quote={'Need a place for events and parties? Visit EventPlace and reserve in 5 minutes!'} hashtag={"#EventPlace"}>
                  <img src={Facebook} alt="Facebook logo" style={{ width: "6vw", margin: "0" }} />
                </FacebookShareButton>
                <WhatsappShareButton url='http://eventplace-equipo4-bucket.s3-website.us-east-2.amazonaws.com/' title={'Need a place for events and parties? Visit EventPlace and reserve in 5 minutes!'} separator={'\n\n'}>
                  <img src={Whatsapp} alt="Whatsapp logo" style={{ width: "6vw", margin: "0" }} />
                </WhatsappShareButton>
                <TwitterShareButton url='http://eventplace-equipo4-bucket.s3-website.us-east-2.amazonaws.com/' title={'Need a place for events and parties? Visit EventPlace and reserve in 5 minutes!'} hashtags={["EventPlace", "PartyVenue"]}>
                  <img src={Twitter} alt="Twitter logo" style={{ width: "6.5vw", margin: "0" }} />
                </TwitterShareButton>
              </div>
            }
            <div onClick={handleBurgerMenu}>
              <FontAwesomeIcon className='burgerIcon' icon={faBars} style={{ color: "#ee5d1a", }} />
            </div>

            {burgerMenuOpen && (
              <div className='logIn'>
                <nav>
                  <ul>
                  <li className='divider'><p>{name}</p> </li>
                    {currentRole === "BASIC" || currentRole === "OWNER" ? (<Link to={`/chat/${localStorage.getItem("id")}${JSON.parse(localStorage.getItem("name"))}/0/${localStorage.getItem("id")}${JSON.parse(localStorage.getItem("name"))}`}><li type="none">Chat</li></Link>) : null}
                    {currentRole === "OWNER" ? (<Link onClick={handleBurgerMenu} to={routes.addProduct}><li type="none">Add Product</li></Link>) : null}
                    {currentRole === "ADMIN" || currentRole === "OWNER" ? (<Link onClick={handleBurgerMenu} to={routes.controlAdmin}><li type="none"> Products</li></Link>) : null}
                    {currentRole === "ADMIN" && <Link onClick={handleBurgerMenu} to={routes.adminCategories}><li type="none">Categories</li></Link>}
                    {currentRole === "ADMIN" && <Link onClick={handleBurgerMenu} to={routes.rolesList}><li type="none" >Roles</li></Link>}
                    {currentRole === "ADMIN" ? (<Link to={routes.userProfile}><li type="none">Profile</li></Link>) : null}
                    {currentRole === "BASIC" ? (<Link to={routes.userProfile}><li type="none">Profile</li></Link>) : null}
                    {currentRole === "OWNER" ? (<Link to={routes.userProfile}><li type="none">Profile</li></Link>) : null}
                    {currentRole === "ADMIN" || currentRole === "OWNER" ? (<Link to={routes.favorites}><li type="none">Favorites</li></Link>) : null}
                    {currentRole === "BASIC" ? (<Link to={routes.favorites}><li type="none">Favorites</li></Link>) : null}
                    {currentRole === "BASIC" ? (<Link to={routes.basicToOwner}><li type="none">Register your EventPlace</li></Link>) : null}
                    {currentRole === "ADMIN" && <Link onClick={handleBurgerMenu} to={routes.editUsers}><li type="none" >Users</li></Link>}
                    <li className='logOut' onClick={logOut}>Log out</li>
                  </ul>
                </nav>

              </div>)}

          </div>

        ) :
          <div className='userBurgerMenu'>
            <div onClick={handleBurgerMenu}>
            {socialMedia && !url.startsWith(`http://${endpoint}:8080/details`) &&

            <div ref={socialMediaRef}>
              <FacebookShareButton url='http://eventplace-equipo4-bucket.s3-website.us-east-2.amazonaws.com/' quote={'Need a place for events and parties? Visit EventPlace and reserve in 5 minutes!'} hashtag={"#EventPlace"}>
                <img src={Facebook} alt="Facebook logo" style={{ width: "8vw", margin: "0" }} />
              </FacebookShareButton>
              <WhatsappShareButton url='http://eventplace-equipo4-bucket.s3-website.us-east-2.amazonaws.com/' title={'Need a place for events and parties? Visit EventPlace and reserve in 5 minutes!'} separator={'\n\n'}>
                <img src={Whatsapp} alt="Whatsapp logo" style={{ width: "8vw", margin: "0" }} />
              </WhatsappShareButton>
              <TwitterShareButton url='http://eventplace-equipo4-bucket.s3-website.us-east-2.amazonaws.com/' title={'Need a place for events and parties? Visit EventPlace and reserve in 5 minutes!'} hashtags={["EventPlace", "PartyVenue"]}>
                <img src={Twitter} alt="Twitter logo" style={{ width: "8.5vw", margin: "0" }} />
              </TwitterShareButton>
            </div>
            }
              <FontAwesomeIcon className='burgerIcon' icon={faBars} style={{ color: "#ee5d1a", }} />
            </div>
            {burgerMenuOpen && (
              <div className='logIn'>
                <Link onClick={handleBurgerMenu} to={"/signup"}><button style={{padding: "10px", width: "30vw", fontSize: "2vh"}}>Sing up</button></Link>
                <Link onClick={handleBurgerMenu} to={"/login"}><button style={{padding: "10px", width: "30vw", fontSize: "2vh"}}>Log in</button></Link>
              </div>)}
          </div>
        }

      </div>
      <div className='menuDesk'>

      <nav className='menuDesk_links'>
          <ul>
            {currentRole === "BASIC" || currentRole === "OWNER" ? (<Link to={`/chat/${localStorage.getItem("id")}${JSON.parse(localStorage.getItem("name"))}/0/${localStorage.getItem("id")}${JSON.parse(localStorage.getItem("name"))}`}><li type="none">Chat</li></Link>) : null}
            {currentRole === "OWNER" ? (<Link to={routes.addProduct}><li type="none">Add Product</li></Link>) : null}
            {currentRole === "ADMIN" || currentRole === "OWNER" ? (<Link to={routes.controlAdmin}><li type="none">Products</li></Link>) : null}
            {currentRole === "ADMIN" && (<Link to={routes.cities}><li type="none">Cities</li></Link>)}
            {currentRole === "ADMIN" && <Link to={routes.rolesList}><li type="none">Roles</li></Link>}
            {currentRole === "ADMIN" && <Link onClick={handleBurgerMenu} to={routes.editUsers}><li type="none">Users</li></Link>}
            {currentRole === "ADMIN" && <Link to={routes.adminCategories}><li type="none">Categories</li></Link>}
            {currentRole === "BASIC" || currentRole === "OWNER" ? (<Link to={routes.bookingHistory}> <li type="none">Your Booking</li></Link>) : null}
          </ul>
        </nav>

        {socialMedia && !url.startsWith(`http://${endpoint}:8080/details`) &&
          <div ref={socialMediaRef} className='menuDesk_links_shareDesk'>
            <FacebookShareButton url='http://eventplace-equipo4-bucket.s3-website.us-east-2.amazonaws.com/' quote={'Need a place for events and parties? Visit EventPlace and reserve in 5 minutes!'} hashtag={"#EventPlace"}>
              <img src={Facebook} alt="Facebook logo" style={{ width: "2vw", margin: "0" }} />
            </FacebookShareButton>
            <WhatsappShareButton url='http://eventplace-equipo4-bucket.s3-website.us-east-2.amazonaws.com/' title={'Need a place for events and parties? Visit EventPlace and reserve in 5 minutes!'} separator={'\n\n'}>
              <img src={Whatsapp} alt="Whatsapp logo" style={{ width: "2vw", margin: "0" }} />
            </WhatsappShareButton>
            <TwitterShareButton url='http://eventplace-equipo4-bucket.s3-website.us-east-2.amazonaws.com/' title={'Need a place for events and parties? Visit EventPlace and reserve in 5 minutes!'} hashtags={["EventPlace", "PartyVenue"]}>
              <img src={Twitter} alt="Twitter logo" style={{ width: "2.2vw", margin: "0" }} />
            </TwitterShareButton>
          </div>
        }

        {currentRole == null && (
          <div className='logInDesk'>
            <Link to={"/signup"}><button>Sign up</button></Link>
            <Link to={"/login"}><button>Log in</button></Link>
          </div>
        )}
        {currentRole != null && (
          <div className='manageUserDesk'>

            <nav className="navbar">

              <button ref={buttonRef2} className="navbar__toggle" onClick={toggleMenu}>
                <div ref={mediaRef} className='manageUserDesk'>
                    {profileData.profileImage != null && profileData.profileImage != '' ?
          <div className='profile_image'>
            <img src={profileData.profileImage} />
          </div> :
          <div className='profile_image'>
            <img src={profilePic} /> 
          </div>
        }
                </div>
              </button>
              <div ref={buttonRef} onClick={handleShareButtonClick} className='share'><img src={share} alt="share" /></div>

              <ul ref={mediaRef} className={`navbar__menu ${isOpen ? 'navbar__menu_open' : ''}`}>
                <li className='divider'><p>{name}</p> </li>

                  {currentRole === "ADMIN" || currentRole === "BASIC" || currentRole === "OWNER" ? (<Link to={routes.userProfile}><li className="navbar__link" type="none">Profile</li></Link>) : null}
            
                  {currentRole === "ADMIN" || currentRole === "OWNER"  ? (<Link to={routes.favorites}><li className="navbar__link" type="none">Favorites</li></Link>) : null}
                

                  {currentRole === "BASIC" ? (<Link to={routes.favorites}><li className="navbar__link" type="none">Favorites</li></Link>) : null}
              
          
                  {currentRole === "BASIC" ? (<Link to={routes.basicToOwner}><li className="navbar__link" type="none">Register your EventPlace</li></Link>) : null}
              
                <div className="navbar__item">
                  <button className='logOutDesk' onClick={logOut}>Log out </button>
                </div>

              </ul>
            </nav>


          </div>
        )}
      </div>
    </div>
  )
}

export default Header
