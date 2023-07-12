import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import LogoImage from "../images/Logo.png";
import "../styles/componentsStyles/bookingToHistory/BookingToHistory.css";
import { GlobalContext } from "./utils/GlobalContext";
import DatePicker from "react-datepicker"
import { subDays, addDays, eachDayOfInterval } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faPenToSquare, faCircle  } from '@fortawesome/free-solid-svg-icons';



const BookingToHistory = () => {
  const { endpoint } = useContext(GlobalContext);
  const [sortedBookings, setSortedBookings] = useState([]);
  const [editableData, setEditableData] = useState({});
  const [notAvailableDates, setNotAvailableDates] = useState([]);
  const [amountOfPeople, setAmountOfPeople] = useState()
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const currentDate = new Date();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const idUser = JSON.parse(localStorage.getItem("id"));

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(
        `http://${endpoint}:8080/booking/findAllBookingUsers/${idUser}`,
        requestOptions
      )
      .then((response) => {
        const data = response.data;
        const sortedBookings = sortBookings(data);
        setSortedBookings(sortedBookings);
        console.log(sortedBookings);
      })
      .catch((error) => {
        console.error("Error al obtener las reservas:", error);
      });
  }, []);

  const formatUTC = (dateString) => {
    let date = new Date(dateString)
    const offsetDate = new Date();
    offsetDate.setTime(date.getTime() + date.getTimezoneOffset() * 60000)
    return offsetDate
  }

  function configureNotAvailableDates() {
    let rangeDates = [];

    notAvailableDates.map((date) => {
      rangeDates.push({ start: formatUTC(date.startDate), end: formatUTC(date.endDate) })
    })

    return rangeDates;
  }

  const sortBookings = (bookings) => {
    const sortedBookings = [...bookings];

    sortedBookings.sort((a, b) => {
      const startDateA = new Date(a.startDate);
      const startDateB = new Date(b.startDate);
      const diffA = startDateA - currentDate;
      const diffB = startDateB - currentDate;

      if (getBookingStatus(a.startDate, a.endDate) === "Happening Now") {
        return -1;
      } else if (getBookingStatus(b.startDate, b.endDate) === "Happening Now") {
        return 1;
      } else if (getBookingStatus(a.startDate, a.endDate) === "Next Event") {
        return -1;
      } else if (getBookingStatus(b.startDate, b.endDate) === "Next Event") {
        return 1;
      } else {
        return startDateA - startDateB;
      }
    });

    return sortedBookings;
  };

  const getBookingStatus = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (currentDate > end) {
      return "Old reservations";
    } else if (currentDate >= start && currentDate <= end) {
      return "Happening Now";
    } else {
      return "Next Event";
    }
  };

  const updateBooking = async (bookingId, eventPlaceId) => {
    const requestBody = {
      eventPlace_id: eventPlaceId,
      user_id: JSON.parse(localStorage.getItem("id")),
      id: bookingId,
      amountOfPeople:
        amountOfPeople,
      startDate:
        startDate,
      endDate: endDate,
    };
    console.log(requestBody)

    if (startDate != null) {

      try {
        const token = JSON.parse(localStorage.getItem("token"));

        requestBody.bookingcancellation = true;

        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        };

        const response = await fetch(
          `http://${endpoint}:8080/booking/updateBooking/${bookingId}`,
          requestOptions
        );
        const data = await response.json();
        console.log(data)
        setSortedBookings(data)
        setAmountOfPeople(null)
        setStartDate(null)
        setEndDate(null)
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
      }
    }
  };

  const toggleEditMode = async (bookingId, evetPlaceId, startDate2, endDate2, amount, bookingEditable) => {
    const newStartDate = new Date(startDate2)
    const newEndDate = new Date(endDate2)

    setStartDate(newStartDate)
    setEndDate(newEndDate)
    setAmountOfPeople(amount)

    fetch(`http://${endpoint}:8080/booking/notAvailableDates/${evetPlaceId}`)
      .then(response => {

        if (response.ok) {
          return response.json();
        } else {
          console('Error en la solicitud');
        }
      })
      .then(data => {
        setNotAvailableDates(data);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    const updatedBookings = sortedBookings.map((booking) =>
      booking.id === bookingId
        ? { ...booking, editable: !booking.editable }
        : booking
    );

    setSortedBookings(() => updatedBookings);

  };

  const handleAmountOfPeopleChange = (event, bookingId) => {
    const newAmountOfPeople = parseInt(event.target.value);
    setAmountOfPeople(newAmountOfPeople)
  };

  const handleStartDateChange = (event, bookingId) => {
    const newStartDate = event.target.value;
    if (newStartDate !== editableData[bookingId]?.startDate) {
      setEditableData((prevData) => ({
        ...prevData,
        [bookingId]: { ...prevData[bookingId], startDate: newStartDate },
      }));
    }
  };

  const handleEndDateChange = (event, bookingId) => {
    const newEndDate = event.target.value;
    if (newEndDate !== editableData[bookingId]?.endDate) {
      setEditableData((prevData) => ({
        ...prevData,
        [bookingId]: { ...prevData[bookingId], endDate: newEndDate },
      }));
    }
  };


  const cancelBooking = async (bookingId, userId, eventPlaceId, startDate2, endDate2) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const booking = sortedBookings.find(
        (booking) => booking.id === bookingId
      );

      const requestBody = {
        amountOfPeople: booking.amountOfPeople,
        startDate: startDate2,
        endDate: endDate2,
        bookingcancellation: false,
        user_id: userId,
        eventPlace_id: eventPlaceId
      };

      console.log(requestBody)

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      };
      swal({
        title: "!Attention!",
        text:
          "If you decide to delete your reservation, the cancellation policies of the event will apply.\n" +
          "Please keep these policies in mind before proceeding with the cancellation.\n" +
          "If you have any questions or need additional assistance, please do not hesitate to contact us.",
        icon: "warning",

        buttons: {
          cancel: "I don't want to cancel my reservation yet",
          confirm: "I confirm that I have read the cancellation policies",
        },
        className: "swal-Warning",
      }).then(async (confirm) => {
        if (confirm) {
          const response = await fetch(
            `http://${endpoint}:8080/booking/updateBooking/${bookingId}`,
            requestOptions
          );
          const data = await response.json();
          setSortedBookings(data)
          console.log("Reserva cancelada:", data);
          console.log("Reserva cancelada correctamente");


        }
      });
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
    }
  };

  function configureNotAvailableDates() {
    let rangeDates = [];

    notAvailableDates.map((date) => {
      rangeDates.push({ start: formatUTC(date.startDate), end: formatUTC(date.endDate) })
    })

    return rangeDates;
  }

  const onChange = (dates) => {
    console.log(notAvailableDates)
    const [start, end] = dates;

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    };

    const formattedStartDate = start ? formatDate(start) : null;
    const formattedEndDate = end ? formatDate(end) : null;

    console.log(formattedStartDate);
    console.log(formattedEndDate);

    let nearestStartDate;
    let amountDaysDifference = 100;

    notAvailableDates.map((date) => {
      const startDate2 = new Date(date.startDate);
      const formattedStartDate2 = new Date(formattedStartDate);

      const differenceInMilliseconds = startDate2.getTime() - formattedStartDate2.getTime();
      const differenceInDays = differenceInMilliseconds / 86400000;

      console.log(differenceInDays)
      if (differenceInDays > 0 && differenceInDays < amountDaysDifference) {
        amountDaysDifference = differenceInDays;
        nearestStartDate = startDate2
      }
    });
    console.log(amountDaysDifference)
    console.log(nearestStartDate)

    const nearestStartDate2 = new Date(nearestStartDate)
    const formattedEndDate2 = new Date(formattedEndDate)

    if (notAvailableDates != null && notAvailableDates != undefined && notAvailableDates != [] && notAvailableDates.length > 0 && formattedEndDate != null && nearestStartDate != undefined) {
      if (nearestStartDate2 > formattedEndDate2) {

        if (start && end) {
          setStartDate(start);
          setEndDate(end);
        } else if (start && !end) {
          if (startDate) {
            setStartDate(null);
            setEndDate(null);
          } else {
            setStartDate(start);
          }
        }

        localStorage.setItem("startDate2", formattedStartDate);
        localStorage.setItem("endDate2", formattedEndDate);
      }

    }
    else {
      if (start && end) {
        setStartDate(start);
        setEndDate(end);
      } else if (start && !end) {
        if (startDate) {
          setStartDate(null);
          setEndDate(null);
        } else {
          setStartDate(start);
        }
      }

      localStorage.setItem("startDate2", formattedStartDate);
      localStorage.setItem("endDate2", formattedEndDate);
    }

  };


  return (
    <div className="mainContainer">
      {sortedBookings.length > 0 &&
        sortedBookings.map((booking) => (
          <div
            key={booking.id}
            className={`mainContainer_cardContainer ${getBookingStatus(booking.startDate, booking.endDate) ===
              "Next Event"
              ? "editable"
              : ""
              } ${getBookingStatus(booking.startDate, booking.endDate) ===
                "Old reservations"
                ? "opaqueCard"
                : ""
              } ${getBookingStatus(booking.startDate, booking.endDate) ===
                "Happening Now"
                ? "happeningNow"
                : ""
              }`}
          >
            {
              booking.bookingcancellation &&
              <p
                className={`mainContainer_cardContainer_status ${getBookingStatus(booking.startDate, booking.endDate) ===
                  "Old reservations"
                  ? "Old "
                  : getBookingStatus(booking.startDate, booking.endDate) ===
                    "Happening Now"
                    ? "Happening"
                    : "Next"
                  }`}
              >
                {getBookingStatus(booking.startDate, booking.endDate)}
              </p>}
              <div className="info">
                <section className="sectionContainer">
                  <div className="firstContainer_mainContainer_cardContainer_dates_grl">
                    <p className="firstContainer_mainContainer_cardContainer_dates">
                      <span>Event Place:</span> {booking.eventPLace_name}
                    </p>
                    <p className="firstContainer_mainContainer_cardContainer_dates">
                    <span>Location:</span>{" "}
                      {booking.cityDTO.nameCity +
                        ", " +
                        booking.cityDTO.state +
                        ", " +
                        booking.cityDTO.country}
                    </p>
                    <p className="firstContainer_mainContainer_cardContainer_dates">
                    <span>Address:</span> {booking.location.street + " " + booking.location.number}
                    </p>
                    
                  </div>
                  {booking.editable ? (
                    <>
                      <div className="secondContainer_mainContainer_cardContainer_Edit">
                        <label>Amount of people:</label>
                        <input
                          className="secondContainer_mainContainer_cardContainer_Editdates"
                          type="number"
                          
                          value={
                            amountOfPeople
                          }
                          onChange={(event) =>
                            handleAmountOfPeopleChange(event, booking.id)
                          }
                        />

                      {notAvailableDates && notAvailableDates !== null &&
                        <DatePicker
                          minDate={currentDate}
                          calendarType="month"
                          monthsShown={2}
                          excludeDateIntervals={configureNotAvailableDates()}
                          open={true}
                          inline={true}
                          startDate={startDate}
                          endDate={endDate}
                          selected={startDate}
                          selectsRange
                          onChange={onChange}
                        />
                      }
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="secondContainer_mainContainer_cardContainer_dates">
                        <p className="secondContainer_mainContainer_mainContainer_cardContainer_dates">
                        <span>Amount of people:</span> {booking.amountOfPeople}
                        </p>
                        <p className="secondContainer_mainContainer_mainContainer_cardContainer_dates">
                        <span>Start date:</span> {booking.startDate}
                        </p>
                        <p className="secondContainer_mainContainer_mainContainer_cardContainer_dates">
                        <span>Finish Date:</span> {booking.endDate}
                        </p>
                      
                      </div>

                    </>

    )}
                </section>
                <ol  className="secondContainer_list_mainContainer_cardContainer_dates"><h2>Services:</h2>
                          {booking.services.length > 0 ? (
                            booking.services.map((service) => (
                              <li type="none" className="secondContainer_list_accountant_mainContainer_cardContainer_dates" key={service.id}>
                                <FontAwesomeIcon icon={faCircle} className="circleIcon" />{service.name}  ${service.price}
                              </li>
                            ))
                          ) : (
                            <li className="secondContainer_list_uncountable_mainContainer_cardContainer_dates">No service selected</li>
                          )}
                </ol>
              </div>
            <div className="mainContainer_BottomContainer">
              {getBookingStatus(booking.startDate, booking.endDate) ===
                "Next Event" &&

                <>
                  {booking.editable && booking.bookingcancellation && (
                    <button className="mainContainer_BottomContainer_Bottom-cards" onClick={() => {
                      toggleEditMode(booking.id, booking.eventPlace_id, booking.startDate, booking.endDate, booking.amountOfPeople, booking.editable);
                      updateBooking(booking.id, booking.eventPlace_id);
                    }}>
                      Save
                    </button>
                  )}
                  {!booking.editable && booking.bookingcancellation && (
                    <div>
                      <button className="mainContainer_BottomContainer_Bottom-cards" onClick={() => cancelBooking(booking.id, booking.user_id, booking.eventPlace_id, booking.startDate, booking.endDate)}>
                      <FontAwesomeIcon icon={faTrash} className="icon"/>Cancel
                      </button>
                      <button className="mainContainer_BottomContainer_Bottom-cards" onClick={() => toggleEditMode(booking.id, booking.eventPlace_id, booking.startDate, booking.endDate, booking.amountOfPeople, booking.editable)}>
                      <FontAwesomeIcon icon={faPenToSquare} className="icon"/>Edit
                      </button>
                    </div>
                  )}
                </>
              } </div>
            {!booking.bookingcancellation &&
              <p className="mainContainer_textCancelled">
                !Your reservation has been cancelled!
              </p>


            }
          </div>
        ))}
    </div>
  );
};

export default BookingToHistory;