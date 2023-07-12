import React, { useState, useEffect , useRef, useContext} from 'react';
import SearchBar from "../components/SearchBar";
import "../styles/componentsStyles/main/home/Home.scss"
import Card from '../components/Card';
import "../styles/componentsStyles/card/cardAnimation/cardAnim.css"
import { Link } from 'react-router-dom';
import { routes } from "../Routes";
import "../styles/componentsStyles/card/cardAnimation/cardAnim.js"
import axios from "axios"
import "../styles/componentsStyles/main/home/categoriesDraggable/Draggable.css"
import bg from "../images/mobileBg.png"
import video from "../../../../videos/bgVideo.mp4"
import { GlobalContext } from '../components/utils/GlobalContext';



const Home = () => {
  const { endpoint } = useContext(GlobalContext);
  const [places, setPlaces] = useState([]);
  const [productsByDates, setProductsByDates] = useState([])
  const [productsByDates2, setProductsByDates2] = useState([])
  const [productsByCategory, setProductsByCategory] = useState([])
  const [categoriesEmpty, setCategoriesEmpty] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [booleano, setBooleano] = useState(true)
  const [isLeftVisible, setIsLeftVisible] = useState(false);
const [isRightVisible, setIsRightVisible] = useState(true);

  let renderPageNumbers;


  const [selectedCity, setSelectedCity] = useState({})

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };


const carouselRef = useRef(null);
const firstImgRef = useRef(null);
const arrowIconsRef = useRef([]);

const [isDragStart, setDragStart] = useState(false);
const [isDragging, setDragging] = useState(false);
const [prevPageX, setPrevPageX] = useState(0);
const [prevScrollLeft, setPrevScrollLeft] = useState(0);
const [positionDiff, setPositionDiff] = useState(0);
const cardRecommendationsRef = useRef(null);

  useEffect(() => {

    const url = `http://${endpoint}:8080/eventPlace/`;
    axios
      .get(url)
      .then((res) => {
        setPlaces(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    setProductsByDates(places.slice(indexOfFirstProduct, indexOfLastProduct));
    setAllProducts(places.slice(indexOfFirstProduct, indexOfLastProduct));
    console.log(places.slice(indexOfFirstProduct, indexOfLastProduct));
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(places.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }

    renderPageNumbers = pageNumbers.map((number) => {
      const isActive = number === currentPage;

      const paginationStyle = {
        color: isActive ? "red" : "blue",
        display: "flex",
        flexDirection: "row",
        fontSize: "18px",
        alignItems: "center",
      };
      return (
        <div
          className="pagination"
          style={paginationStyle}
          key={number}
          id={number}
          onClick={(e) => setCurrentPage(Number(e.target.id))}
        >
          {number}
        </div>
      );
    });

  }, [places])


  useEffect(() => {

    const url = `http://${endpoint}:8080/categories/allCategories`;
    axios
      .get(url)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  const searchBarFilter = () => {
    console.log(productsByDates)
    console.log(selectedCity)
    setCategoriesEmpty(false)
    const filterByLocation = (products) => {
      if (!selectedCity.id) {
        return products;
      }
      return products.filter((product) => product.city.id === selectedCity.id);
    };

    const filterByDates = (products) => {
      if (startDate == '' || endDate == '') {
        return products;
      }

      return products.filter((product) => {
        const bookingList = product.bookingList;
        const hasOverlap = bookingList.some((booking) => {
          const bookingStartDate = new Date(booking.startDate);
          const bookingEndDate = new Date(booking.endDate);
          const bookingStartDate2 = new Date(startDate);
          const bookingEndDate2 = new Date(endDate);
          console.log(bookingStartDate, bookingEndDate);
          return bookingEndDate2 <= bookingEndDate && bookingStartDate2 >= bookingStartDate;
        });

        return !hasOverlap;
      });
    };

    const filteredProducts = filterByDates(filterByLocation(allProducts));
    console.log(filteredProducts)

    setProductsByDates(filteredProducts)
    setProductsByCategory([])
  };

  useEffect(() => {
    if (selectedCategory != "") {
      setProductsByCategory(productsByDates.filter((product) => product.categories.title === selectedCategory));
      if (productsByDates.filter((product) => product.categories.title === selectedCategory).length <= 0) {
        console.log("está vacío")
        setCategoriesEmpty(true)
      }
    }

  }, [selectedCategory, categoriesEmpty]);


  const handleSearch = (location, startDate2, endDate2) => {
    console.log(location, startDate2, endDate2);
  };


  console.log(selectedCity)



const showHideIcons = () => {
  const carousel = carouselRef.current;
  const scrollWidth = carousel.scrollWidth;
  const clientWidth = carousel.clientWidth;
  const scrollLeft = carousel.scrollLeft;

  setIsLeftVisible(scrollLeft > 0);
  setIsRightVisible(scrollLeft + clientWidth < scrollWidth);
};


const handleArrowIconClick = (direction) => {
  const carousel = carouselRef.current;
  const cardWidth = carousel.querySelector('.cardCategory').offsetWidth;
  const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
  carousel.scrollBy({
    left: scrollAmount,
    behavior: 'smooth',
  });
};



const autoSlide = () => {
  const carousel = carouselRef.current;
  if (
    carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
    carousel.scrollLeft <= 0
  ) {
    return;
  }

  let valDifference = firstImgRef.current.clientWidth + 14 - Math.abs(positionDiff);
  const scrollLeft = carousel.scrollLeft;
  if (scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft += positionDiff > firstImgRef.current.clientWidth / 3 ? valDifference : -positionDiff);
  }
  carousel.scrollLeft -= positionDiff > firstImgRef.current.clientWidth / 3 ? valDifference : -positionDiff;
};



const handleDragStart = (e) => {
  setDragStart(true);
  setPrevPageX(e.pageX || e.touches[0].pageX);
  setPrevScrollLeft(carouselRef.current.scrollLeft);
};

const handleDragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  setDragging(true);
  carouselRef.current.classList.add('dragging');
  setPositionDiff((e.pageX || e.touches[0].pageX) - prevPageX);
  carouselRef.current.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const handleDragStop = () => {
  setDragStart(false);
  carouselRef.current.classList.remove('dragging');

  if (!isDragging) return;
  setDragging(false);
  autoSlide();
};

const handleSearchButtonClick = () => {

  cardRecommendationsRef.current.scrollIntoView({ behavior: 'smooth' });
};
  return (
    <>
      <div className='bg-image-home-scroll parallax_wrapper'>
        <section className='HomeInBody'>
           
        <video className='Home-bg-video' src={video}
    autoPlay
    muted
    loop
  
  />
        <div className='Home-bg-video' style={{ height: "100vh", width: "100vw", position: "absolute",zIndex: "-320"}}>hola</div>
          <div  className="HomeInBody_titles-container">
            <h2 className='HomeInBody_titleH2'>Reserve a place and services for your event in minutes</h2>
            <p className='HomeInBody_subTitleP'>Plan and reserve a place with their services for your special event</p>
          </div>
          <div className='HomeInBody_mobileTitle'   >
            <h4 >Search for a location:</h4>
          </div>
          <SearchBar onSearch={handleSearch} changeSelectedCity={setSelectedCity} handleSearchButtonClick={handleSearchButtonClick} setStartDate={setStartDate} endpoint={endpoint}
            setEndDate={setEndDate}

            searchBarFilter={searchBarFilter}
          />

          <div className='card-category-container'>
       
<div  className="wrapper">
<i
  className="fas fa-arrow-left"
  onClick={() => handleArrowIconClick('left')}
  ref={ref => (arrowIconsRef.current[0] = ref)}
/>
            <div className='HomeInBody_CardsCategories carousel' 
    ref={carouselRef}
    onMouseDown={handleDragStart}
          onMouseMove={handleDragging}
          onMouseUp={handleDragStop}
          onMouseLeave={handleDragStop}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragging}
          onTouchEnd={handleDragStop}

    >

              {categories.map((category) => (
                <div  >
                  <div className="card cardCategory" onClick={() => handleFilterClick(category.title)}>
                    <div className="cardBg cardCategoryBg" style={{ backgroundImage: `url(${category.urlImage})` }}></div>
                    <div className="card-category-title_container">
                      <h3 className="card-category-title">
                        {category.title}
                      </h3>
                      <p style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "normal",
                       display: "-webkit-box", WebkitLineClamp: 8, WebkitBoxOrient: "vertical",
                        maxHeight: "4.6em", width: "80%",
                       display: "flex", justifyContent: 'center', alignSelf: 'center'
                        }}>{category.description}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <i
  className="fas fa-arrow-right"
  onClick={() => handleArrowIconClick('right')}
  ref={ref => (arrowIconsRef.current[1] = ref)}
/>
          </div>
    
</div>
          <div>
            <section className='HomeInBody_CardRecommendations' ref={cardRecommendationsRef}>
<h3 className='HomeInBody_CardRecommendations_Title'>Navigate through our Eventplaces:</h3>
              <div className='home-container__hotel-grid cardAnimContainer'>
                {productsByDates && console.log(productsByDates)}
                {productsByCategory.length <= 0 && !categoriesEmpty ? productsByDates.map((place, i) => <Card key={i} place={place} />) : productsByCategory.map((place, i) => <Card key={i} place={place} />)}

              </div>
              <div className='home-container__hotel-grid cardAnimContainer_subContainer'>
                <Link to={"/"} onClick={(e) => setCurrentPage(Number(1))}> Start</Link>

                <ul id="page-numbers">
                  {renderPageNumbers}
                </ul>
                <Link to={"/"} onClick={(e) => setCurrentPage(Number(5))} > End</Link>

              </div>
            </section>
          </div>

        </section>

      </div>
    </>
  )
}

export default Home;