import React, { useState } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import '../styles/componentsStyles/mercadoPagoPayment/MercadoPagoPayment.css'
import { Link, useParams } from 'react-router-dom';
import { routes } from '../Routes';

const MercadoPagoPayment = () => {
    
    initMercadoPago('TEST-*');

    const { preferenceId } = useParams()

    return (
        <section className='MercadoPagoPayment'>
            <article>
                <h2>Choose a payment method</h2>
                <div>We are almost there, complete the payment to reserve with EventPlace</div>
                <div className="MercadoPagoPayment_policies_text">
                    When you accept a booking request or receive a booking confirmation through the EventPlace Platform, you are entering into a contract directly with the User and are responsible for delivering the Host Service under the terms and at the price specified in your Listing.
                    <div style={{ color: "black", fontWeight: "700", fontSize:"1.5vw" }}>When you book a place, you just have 24 hours to cancel the reserve.</div> Additionally, by accepting a booking, you agree to pay all applicable fees, including EventPlace's service fee and any applicable taxes, for each booking.
                    Before proceeding, please ensure that you have thoroughly reviewed the Privacy Statement, as well as the Rules and Restrictions and Terms of Use, and acknowledge your acceptance of these terms by clicking the button below.
                    <Link to={routes.termsAndConditions}>
                        <div>Terms and conditions</div>
                    </Link>
                </div>
                {preferenceId &&
                    <Wallet initialization={{ preferenceId }} />
                }
            </article>
        </section>
    )
}

export default MercadoPagoPayment
