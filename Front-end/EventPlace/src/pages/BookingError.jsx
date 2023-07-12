import React from 'react'
import '../styles/componentsStyles/bookingError/BookingError.css'
import mercadoPago from '../images/mercadoPago.png'
import logo from '../images/Logo.png'

const BookingError = () => {
    
    return (
        <section className='booking_error'>
            <article className='booking_error_container'>
                <h1>
                    Transaction Failed!
                </h1>
                <article>Try booking again</article>

                <article className='booking_error_logos'>
                    <img src={mercadoPago} alt="Mercado Pago Logo" />
                    <img className='booking_error_logo2' src={logo} alt="EventPlace logo" />
                </article>
            </article>

        </section>
    )
}

export default BookingError
