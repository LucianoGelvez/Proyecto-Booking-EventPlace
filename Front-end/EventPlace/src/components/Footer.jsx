import React from 'react'
import '../styles/componentsStyles/footer/Footer.css'
import Logo from '../images/Logo.png'
import  Instagram from '../images/icons/instagram.png'
import  Facebook from '../images/icons/facebook.png'
import  Twitter from '../images/icons/twitter.png'
import  Linkedin from '../images/icons/linkedin.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer_logo'>
        <img src={Logo} alt="" className='footer_logo__img' />
      </div>
      <div className='footer_copyright'>
        <h5 className='footer_copyright_text'>© 2023 Copyright Digital House</h5>
      </div>
      <div className='footer_icons'>
        <div className='footer_icons_icon'>
        <img src={Facebook} alt=""  />
        <img src={Instagram} alt="" />
        <img src={Linkedin} alt=""  />
        <img src={Twitter} alt=""  />
        </div>
        </div>
    </div>
  )
}

export default Footer