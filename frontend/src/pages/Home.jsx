/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import '../pageStyles/Home.css';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/Product';
import PageTitle from '../components/PageTitle';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, removeErrors } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import bannerh from '../assets/bannerh1.png';
// // DUMMY DATA
// const products = [
//   {
//     "_id": "687f21e9c0e1cdac6481de07",
//     "name": "Hair Grow",
//     "description": "Product desc",
//     "price": 100,
//     "ratings": 2,
//     "images": [
//       {
//         "public_id": "This is test id1",
//         "url": "This is test url1",
//         "_id": "687f21e9c0e1cdac6481de08"
//       }
//     ],
//     "category": "Grow",
//     "stock": 1,
//     "numOfReviews": 1,
//     "reviews": [
//       {
//         "user": "687f21e9c0e1cdac6481de09",
//         "name": "John Doe",
//         "rating": 4,
//         "comment": "Great product!",
//         "_id": "687f21e9c0e1cdac6481de0a"
//       }
//     ],
//     "createdAt": "2025-07-22T05:30:17.293Z",
//     "__v": 0
//   },
//   {
//     "_id": "687f21f4c0e1cdac6481de0a",
//     "name": "Face Glow",
//     "description": "Product desc",
//     "price": 12200,
//     "ratings": 3.5,
//     "images": [
//       {
//         "public_id": "This is test id1",
//         "url": "This is test url1",
//         "_id": "687f21f4c0e1cdac6481de0b"
//       }
//     ],
//     "category": "Glow",
//     "stock": 1,
//     "numOfReviews": 0,
//     "reviews": [],
//     "createdAt": "2025-07-22T05:30:28.326Z",
//     "__v": 0
//   },
//   {
//     "_id": "687f21f4c0e1cdac6481de0a",
//     "name": "Lungs Clean",
//     "description": "Product desc",
//     "price": 99200,
//     "ratings": 4,
//     "images": [
//       {
//         "public_id": "This is test id1",
//         "url": "This is test url1",
//         "_id": "687f21f4c0e1cdac6481de0b"
//       }
//     ],
//     "category": "Lungs",
//     "stock": 1,
//     "numOfReviews": 0,
//     "reviews": [],
//     "createdAt": "2025-07-22T05:30:28.326Z",
//     "__v": 0
//   },
// ]


function Home() {

  const { loading, error, products, productCount } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct({keyword:""}));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  

  return (
    <>

      {loading ?
        (<Loader />)
        : (
          <>
            <PageTitle title="OrraHealthyCure Home" />
            <Navbar />
            <ImageSlider />
            <div className="home-container">
              <h2 className='home-heading'>Trending Now</h2>
              <div className="home-product-container">
                {products.map((product, index) => (

                  <Product product={product} key={index} />
                ))
                }
              </div>
            </div>
            <Footer />

          </>
        )}
    </>

  );
}

export default Home