import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker"
import axios from 'axios';
import '../styles/componentsStyles/booking/Booking.css'
import bookingCheck from '../images/bookingOk.svg'
import { subDays, addDays, eachDayOfInterval } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLocationDot, faTimes, faSwimmingPool, faArrowLeft, faSnowflake, faCar, faMicrophone, faWifi, faTree, faSuitcaseMedical, faHouseCircleCheck, faGlasses, faPortrait } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import MercadoPagoPayment from './MercadoPagoPayment';
// import GlobalContext from '../components/utils/GlobalContext';




const Booking = () => {
    const { eventPlaceId } = useParams();
    const [notAvailableDates, setNotAvailableDates] = useState([]);
    const [amountDays, setAmountDays] = useState(0);
    const [servicesPrice, setServicesPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [preferenceId, setPreferenceId] = useState(null);
    const [startDate, setStartDate] = useState((() => {
        const startDateString = localStorage.getItem("startDateSearch");
        if (startDateString) {
            const startDate = new Date(startDateString);
            startDate.setDate(startDate.getDate() + 1);
            return startDate;
        } else {
            return null;
        }
    })());

    const [endDate, setEndDate] = useState((() => {
        const endDateString = localStorage.getItem("endDateSearch");
        if (endDateString) {
            const endDate = new Date(endDateString);
            endDate.setDate(endDate.getDate() + 1);
            return endDate;
        } else {
            return null;
        }
    })());

    const [amountError, setAmountError] = useState(false);
    const [personalInfoError, setPersonalInfoError] = useState(false);
    const [bookingInfoError, setBookingInfoError] = useState(false);
    const [emptyError, setEmptyError] = useState(false);
    const [bookingOk, setBookingOk] = useState(false);
    const [startDateAfterError, setStartDateAfterError] = useState(false);
    const [images, setImages] = useState([]);
    const [bookingList, setBookingList] = useState([]);
    let currentDate = new Date();
    const [product, setProduct] = useState([]);
    const [possibleCities, setPossibleCities] = useState([]);
    const [loading, setLoading] = useState(false)
    initMercadoPago('TEST-64f47916-3f33-411b-adca-47d78938cb0d');
    const [booking, setBooking] = useState
        ({
            eventPlace_id: eventPlaceId,
            user_id: localStorage.getItem("id"),
            amountOfPeople: '',
            startDate: '',
            endDate: '',
            services: [],
            description: '',
            price: '',
            quantity: 1,

        })

    const [profileData, setProfileData] = useState({
        name: '',
        lastName: '',
        username: '',
        password: '',
        nationalID: '',
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
    

    const handleNationalIDSelection = (event) => {
        const selectedValue = event.target.value;
        setProfileData((prevProfileData) => ({
            ...prevProfileData,
            nationalID: selectedValue,
        }));
    };

    const handleAmountChange = (event) => {
        setBooking((prevBooking) => ({
            ...prevBooking,
            amountOfPeople: event.target.value,
        }));

        const inputValue = parseFloat(event.target.value);
        if (!isNaN(inputValue) && inputValue > 0 && inputValue <= product.maxCapacity && inputValue >= product.minCapacity) {
            setAmountError(false);
        } else {
            setAmountError(true);
        }
    };


    useEffect(() => {
 
        const startMoment = moment(startDate, 'YYYY-MM-DD');
        const endMoment = moment(endDate, 'YYYY-MM-DD');

        const days = endMoment.diff(startMoment, 'days');
        if (isNaN(endMoment) || days == 0) {
            setAmountDays(1)
        }
        else {
            setAmountDays(days + 1);
        }
        if(startDate != '' && startDate != null && booking.amountOfPeople != '' && booking.amountOfPeople != null)
        {
            setBookingInfoError(false)
        }

        if(startDate != '' && startDate != null && booking.amountOfPeople != '' && booking.amountOfPeople != null && profileData.city.nameCity != '' && profileData.city.state != '' && profileData.city.country != '' && profileData.location.street != '' && profileData.location.number != '')
        {
            setEmptyError(false)
            setPersonalInfoError(false)
        }

    }, [startDate, endDate, booking]);


    useEffect(() => {
        const url = `http://3.135.182.10:8080/booking/findBookingByUser/` + localStorage.getItem("id") + "/" + eventPlaceId;
        fetch(url, {
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        })
            .then(response =>

                response.json())
            .then(data => {
                console.log(data);
                setBookingList(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    useEffect(() => {
        if (product.listImages != []) {
            setImages(product.listImages)
        }
    }, [product.listImages])


    useEffect(() => {
        const url = `http://3.135.182.10:8080/eventPlace/${eventPlaceId}`;
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                console.log(response.data)
                setProduct(response.data);
                localStorage.setItem("description", response.data.description)
                localStorage.setItem("imageUrl", response.data.listImages[0].url)
                localStorage.setItem("lat", response.data.location.lat)
                localStorage.setItem("lng", response.data.location.lng)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const urlCities = `http://3.135.182.10:8080/cities/allCities`;
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
                setPossibleCities(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])


    useEffect(() => {
        setBooking((prevBooking) => ({
            ...prevBooking,
            startDate: startDate,
            endDate: endDate
        }));
    }, [startDate, endDate])



    useEffect(() => {
        const url = `http://3.135.182.10:8080/booking/notAvailableDates/${eventPlaceId}`;
        const token = JSON.parse(localStorage.getItem("token"));

        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Not available dates:")
                setNotAvailableDates(data);
            })
            .catch(error => {
                console.log(error);
            });

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Not available dates:")
                setNotAvailableDates(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    function configureReservedDates() {
        let highlightedDates = [];

        if (bookingList != undefined && bookingList != null && bookingList != []) {

            bookingList.map((date) => {
                const start = subDays(new Date(date.startDate), -1);
                const end = subDays(new Date(date.endDate), -1);

                const datesInRange = eachDayOfInterval({ start, end });

                highlightedDates.push(...datesInRange);
            });

            return highlightedDates;

        }
    }



    useEffect(() => {
        configureReservedDates()
    }, [bookingList, notAvailableDates])


    useEffect(() => {
        fetch(`http://3.135.182.10:8080/user/` + localStorage.getItem("id"), {
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
                    location: data.location || { street: '', number: '' }
                }
                setProfileData(updatedData);
       
            })
            .catch(error => {
                console.error('Error:', error);
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

    const onChange = (dates) => {

        const [start, end] = dates;

        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();

            return `${year}-${month}-${day}`;
        };

        const formattedStartDate = start ? formatDate(start) : null;
        const formattedEndDate = end ? formatDate(end) : null;

        let nearestStartDate;
        let amountDaysDifference = 100;
        
        notAvailableDates.map((date) => {
          const startDate2 = new Date(date.startDate);
          const formattedStartDate2 = new Date(formattedStartDate);
        
          const differenceInMilliseconds = startDate2.getTime() - formattedStartDate2.getTime();
          const differenceInDays = differenceInMilliseconds / 86400000;

          if(differenceInDays > 0 && differenceInDays < amountDaysDifference)
          {
              amountDaysDifference = differenceInDays;
              nearestStartDate = startDate2
          }
        });

        const nearestStartDate2 = new Date(nearestStartDate)
        const formattedEndDate2 = new Date(formattedEndDate)
        
        if(notAvailableDates != null && notAvailableDates != undefined && notAvailableDates != [] && notAvailableDates.length > 0 && formattedEndDate != null && nearestStartDate != undefined)
        {
            if(nearestStartDate2 > formattedEndDate2 )
            {
                setStartDateAfterError(false)
    
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
            else
            {
              setStartDateAfterError(true)
            }
        }
        else
        {
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

    const handleChange = (event) => {
        const { name, value } = event.target;

        setProfileData((prevState) => ({
            ...prevState,
            location: {
                ...prevState.location,
                [name]: value,
            },
        }));
    };

    useEffect(() => {
        if (booking.endDate == '' || booking.endDate == null) {
            setBooking((prevState) => ({
                ...prevState,
                endDate: prevState.startDate
            }));
        }
    }, [booking.startDate])


    const handleButtonClick = () => {
        const token = JSON.parse(localStorage.getItem("token"));
        const url = `http://3.135.182.10:8080/pay`;
        const url2 = `http://3.135.182.10:8080/user`;
   

        if (profileData.city.nameCity == '' || profileData.city.state == '' || profileData.city.country == '' || profileData.location.street == '' || profileData.location.number == '') {
            setPersonalInfoError(true)
            setEmptyError(true)
        }
        else if(booking.amountOfPeople == '' || booking.startDate == '' || startDate == null)
        {
           setBookingInfoError(true)
           setEmptyError(true)
           setPersonalInfoError(false)
        }
        else {
            setLoading(true)
            setPersonalInfoError(false)
            setEmptyError(false)
            setBookingInfoError(false)
            fetch(url2, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            })
                .then(response => {
                    if (response.ok) {
                    } else {
                        throw new Error('Request failed');
                    }
                })
                .catch(error => {
                    console.error(error);
                });



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
                        setLoading(false)
                        setBookingOk(true)
                        return response.json()
                    } else {
                        throw new Error('Request failed');
                    }
                })
                .then(data => {
                    setPreferenceId(data.id)
                    window.location.href = '/payment/' + data.id
                    console.log(data.id)
                })
                .catch(error => {
                    console.error(error);
                });

        }

    };

    function handleButtonSuccesClick() {
        setBookingOk(false)
        window.location.href = '/'
    }

    const getFacilityIcon = (facility) => {
        switch (facility) {
            case "pool":
                return <FontAwesomeIcon icon={faSwimmingPool} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />;
            case "ac":
                return <FontAwesomeIcon icon={faSnowflake} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />;
            case "parkingLot":
                return <FontAwesomeIcon icon={faCar} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />;
            case "stage":
                return <FontAwesomeIcon icon={faMicrophone} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />;
            case "wifi":
                return <FontAwesomeIcon icon={faWifi} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />;
            case "outDoorAreas":
                return <FontAwesomeIcon icon={faTree} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />;
            default:
                return null;
        }
    };

    const handleCheckboxChange = (event) => {
        const serviceId = event.target.id;

        if (event.target.checked) {
            setBooking((prevBooking) => ({
                ...prevBooking,
                services: [...prevBooking.services, { id: serviceId }]
            }));
        } else {
            setBooking((prevBooking) => ({
                ...prevBooking,
                services: prevBooking.services.filter((service) => service.id !== serviceId)
            }));
        }
    };

    useEffect(() => {

        let totalServicesPrice = 0;

        console.log(booking.services);
        booking.services.map((service) => {
            product.basicServices.filter((service2) => {
                console.log(service2);
                parseInt(service.id) === service2.id && (totalServicesPrice += service2.price);
            });
        });

        setServicesPrice(totalServicesPrice)
        if(booking.services.length === 0)
        {
            setServicesPrice(0)
        }

    }, [booking.services]);

    useEffect(()=>{
        console.log(amountDays)

        if(amountDays != 0)
        {
            console.log(product.pricePerDay * amountDays + servicesPrice)
            setTotalPrice(product.pricePerDay * amountDays + servicesPrice)
        }
    }, [amountDays, servicesPrice, product.pricePerDay])


    useEffect(() => {

        if (amountDays != 0 && !isNaN(amountDays)) {
            setBooking((prevBooking) => ({
                ...prevBooking,
                price: product.pricePerDay * amountDays + servicesPrice
            }));
        }
        setBooking((prevBooking) => ({
            ...prevBooking,
            description: product.name,
        }));
    }, [booking, startDate, endDate])


    return (
        <section className='booking'>
            <article className='booking_title'>
                <h1>{product.name}</h1>
                <h4>Plan and book your perfect event!</h4>
            </article>

            <article className='booking_price'>
                <h2>Total price:</h2>
                <div>{amountDays != 0 && !isNaN(amountDays) && !isNaN(totalPrice)? totalPrice : 0}</div>
            </article>

            <h2 className='booking_calendar_guests_title'>Event's information. Dates not availble will be shwon in a gray, the selected ones in dark blue, and the already reserved ones by you will be shown in green.</h2>
            <article className='booking_calendar_guests'>
                {amountError &&
                    <div className='booking_calendar_guests_error'>Amount of people must be a positive number between the maximum and minimun.</div>
                }
                {startDateAfterError &&
                    <div className='booking_calendar_guests_error'>Your end date can not be after the next not available startDate</div>
                }
                {bookingInfoError &&
                    <div className='booking_calendar_guests_error'>You must fill all booking information</div>
                }
                <h2 className='booking_calendar_guests_left_title'>Click the event's start date, and then click end's date</h2>
                <h2 className='booking_calendar_guests_right_title'>Type the stimated amount of people that will attend to the event</h2>
                <h2 className='booking_calendar_guests_left_title2'>Price per day: {product.pricePerDay}$</h2>
                <article>
                    <DatePicker
                        minDate={currentDate}
                        calendarType="month"
                        monthsShown={2}
                        highlightDates={configureReservedDates()}
                        excludeDateIntervals={configureNotAvailableDates()}
                        open={true}
                        inline={true}
                        startDate={startDate}
                        endDate={endDate}
                        selected={startDate}
                        selectsRange
                        onChange={onChange}
                    />
                    <section>

                        <form>
                            <div className='booking_calendar_guests_decoration'>.
                                <div>
                                    .
                                </div>
                            </div>
                            <div className='input_group'>
                                <div>Minimun: {product.minCapacity} Maximum: {product.maxCapacity}</div>
                                <label htmlFor="">Amount of guests</label>
                                <input type="text" id="guests" placeholder="Guests..." value={booking.amountOfPeople} onChange={handleAmountChange} />
                            </div>
                        </form>
                        <h2>Select services(Optional)</h2>
                        <form className='form2'>
                            <div className='booking_calendar_guests_decoration'>.
                                <div>
                                    .
                                </div>
                            </div>
                            <div className='input_group2'>
                                {product.basicServices != undefined && product.basicServices != null && product.basicServices.length > 0 ? product.basicServices.map((service, index) => (
                                    <div key={index}>
                                        <label htmlFor={service.id}>
                                            Service: {service.name} <br />
                                            Price: {service.price}
                                        </label>
                                        <input
                                            type="checkbox"
                                            id={service.id}
                                            onChange={handleCheckboxChange}
                                        />
                                    </div>
                                ))
                                    :
                                    <div style={{ fontSize: "2.5vw", width: "100%" }}>No basic services currently available for this eventPlace</div>
                                }
                            </div>
                        </form>
                    </section>
                </article>
            </article>
            <h2 className='booking_personal_info_title'>We need this information to know if your will be able to attend to the place, and  to offer your the best user experience!</h2>
            <h2 className='booking_personal_info_title2'>Place information!</h2>
            <section className='booking_big_section'>

                <article className='booking_personal_info'>
                    <div className='booking_personal_info_decoration'>.
                        <div>.</div>
                    </div>
                    <h3>Your personal data!</h3>
                    {personalInfoError &&
                        <div className='booking_personal_info_error'>To make a reserve, you need to provide all info, including amount of people, personal info, and dates of the event.</div>
                    }
                    <article className='booking_personal_info_form_group'>
                        <form action="" className='booking_personal_info_form'>
                            <div>
                                <label htmlFor="">Location *</label>
                                <select
                                    id="city"
                                    onChange={(e) => {
                                        const selectedCity = possibleCities.find(
                                            (city) => city.nameCity === e.target.value
                                        );
                                        handleCityChange(selectedCity);
                                    }}
                                    value={profileData.city.nameCity}
                                >
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

                            </div>

                            <article>
                                <label htmlFor="">Document Id</label>
                                <input onChange={handleNationalIDSelection} value={profileData.nationalID}>
                                </input>
                            </article>
                        </form>


                        <form action="" className='booking_personal_info_form'>
                            <div>
                                <label htmlFor="street">Street *</label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    placeholder='Street...'
                                    value={profileData.location.street}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="number">Number *</label>
                                <input
                                    type="text"
                                    id="number"
                                    name="number"
                                    placeholder='Number...'
                                    value={profileData.location.number}
                                    onChange={handleChange}
                                />
                            </div>

                        </form>

                    </article>

                </article>

                <div className="productOverviewBody" >
                    <h3 className="productOverviewBody__subtitle" style={{ margin: "20px" }}>Overview</h3>
                    <div className="productOverviewBody__description" style={{ marginBottom: "50px" }} >
                        {product.description}
                    </div>
                    <div className="facilities">
                        <h1>Top Facilites</h1>
                        <ul style={{ marginTop: "8px", listStyleType: "none", columns: "2", columnGap: "1em" }}>
                            {product.characteristics != undefined && Object.entries(product.characteristics).map(([key, value]) => (
                                key !== "id" && (
                                    <li key={key} style={{ padding: "5px" }}>
                                        {getFacilityIcon(key)}<span style={{ marginLeft: "5px" }}>{key}</span>
                                        <FontAwesomeIcon icon={value ? faCheck : faTimes} className="facility-icon" />

                                    </li>
                                )
                            ))
                            }
                        </ul>
                    </div>

                </div>
            </section>

            <div className="booking_policyBlock">
                <h1>What you need to know about this place before renting it</h1>
                <div className="subtitlesBlock">
                    <div className="policySection">
                        <div className="policyTitle"><div><FontAwesomeIcon icon={faHouseCircleCheck} className="policy-icon" /></div>Rules of the place:</div>
                        <div className="policyInfo">{product.rulesOfThePlace}</div>
                    </div>
                    <div className="policySection">
                        <div className="policyTitle"> <div><FontAwesomeIcon icon={faSuitcaseMedical} className="policy-icon" /></div>Health and security</div>
                        <div className="policyInfo">{product.healthAndSecurity}</div>
                    </div>
                    <div className="policySection">
                        <div className="policyTitle"><div><FontAwesomeIcon icon={faGlasses} className="policy-icon" /></div>Cancellation policies:</div>
                        <div className="policyInfo">{product.cancelationPolicies}</div>
                        <div />
                    </div>
                </div>
            </div>

            {
                loading &&
                <div className='booking_loading'>
                    Loading
                </div>
            }
            {
                emptyError &&
                <div className='booking_empty_error'>Some fields are empty!</div>
            }
            <button onClick={handleButtonClick} className='booking_submit_button'>Start Booking!</button>

        </section>
    )
}

export default Booking