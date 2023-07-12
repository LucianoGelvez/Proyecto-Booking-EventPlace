import React, { useCallback, useContext, useEffect, useState } from 'react'
import '../styles/componentsStyles/bookingSucces/BookingSucces.css'
import { Link, useParams } from 'react-router-dom'
import bookingCheck from '../images/bookingOk.svg'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { GlobalContext } from '../components/utils/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


const BookingSucces = () => {
    const { endpoint } = useContext(GlobalContext);
    const params = useParams()
    const startDate = new Date(params.startDate);
    const endDate = new Date(params.endDate);

    var stompClient = null;


    console.log(params)
    
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    const formattedServices = params.services.replace(/=/g, ":").replace(/'/g, '"').replace(/([{,])(\w+)([:=])/g, '$1"$2"$3');

    console.log(formattedServices)
  
    
    
    const [booking, setBooking] = useState({
      eventPlace_id: JSON.parse(params.eventPlaceId),
      user_id: JSON.parse(localStorage.getItem("id")),
      amountOfPeople: JSON.parse(params.amountOfPeople),
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      services: JSON.parse(formattedServices)
    });

    useEffect(()=>{
      const token = JSON.parse(localStorage.getItem("token"));
      const url = `http://${endpoint}:8080/booking/addBooking`;
      console.log(booking)

      fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(booking)
    })
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Request failed');
            }
        })
        .then(data => {
        })
        .catch(error => {
            console.error(error);
        });
    }, [])

    useEffect(()=>{
      let Sock = new SockJS(`http://${endpoint}:8080/ws`);
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
    }, [])

    const userJoin = () => {
      let chatMessage = {
        senderName: localStorage.getItem("id") + JSON.parse(localStorage.getItem("name")),
        receiverName: params.ownerId + params.ownerName,
        status: "JOIN"
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    };

    const onConnected = () => {
      stompClient.subscribe('/user/' + localStorage.getItem("id") + JSON.parse(localStorage.getItem("name")) + '/private', onPrivateMessage);
      userJoin();
    };

    const onPrivateMessage = useCallback((payload) => {
      let payloadData = JSON.parse(payload.body);
      if (payload != undefined) {
        let chatMessage = {
          senderName: localStorage.getItem("id")  + JSON.parse(localStorage.getItem("name")),
          receiverName: params.ownerId + "/" + params.ownerName,
          message: "",
          status: "JOIN",
          imageUrl: ""
        };
        console.log(payload.body)
  
        if (payloadData.status === "MESSAGE") {
          setChats((prevChats) => [...prevChats, chatMessage]);
        }
      }
    }, []);

    const onError = (err) => {
      console.log(err);
    };

    function handleButtonSuccesClick()
    {
      window.location.href = '/'
    }

  return (
    <section className='booking_succes'>
                <div className='booking_ok'>
                  <div className='check-icon-box'>
                    <FontAwesomeIcon icon={faCheck} className='check-icon' />
                  </div>
                    <article>
                        <h1>Event booked successfully! </h1>
                        <div className='booking_ok_date'>Date: <span>{localStorage.getItem("startDate2")}</span></div>
                        <div className='booking_ok_place'>At: <span>{params.eventPlaceName}</span></div>
                    </article>
                    <Link to={`/chat/${localStorage.getItem("id")}${JSON.parse(localStorage.getItem("name"))}/${params.ownerId}${params.ownerName}/${localStorage.getItem("id")}${JSON.parse(localStorage.getItem("name"))}`}>
                        <button>Chat with the owner!</button>
                    </Link>
                    <button onClick={handleButtonSuccesClick}>Ok!</button>
                </div>
    </section>
  )
}

export default BookingSucces