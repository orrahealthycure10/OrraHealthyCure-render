import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import { v2 as cloudinary } from "cloudinary";


// 1️⃣Creating Products

//new code
// 1️⃣Creating Products
export const createProducts = handleAsyncError(async (req, res, next) => {
  let image = [];

  // 🧠 Convert single or multiple images to an array
  if (typeof req.body.images === "string") {
    image.push(req.body.images);
  } else {
    image = req.body.images;
  }

  const imageLinks = [];

  // 📤 Upload each image to Cloudinary
  for (let i = 0; i < image.length; i++) {
    const result = await cloudinary.uploader.upload(image[i], {
      folder: "products",
    });
    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  // ✅ FIXED: assign to correct key expected by schema
  req.body.images = imageLinks;

  req.body.user = req.user.id;

  // 🛠️ Create the product with images field
  const product = await Product.create(req.body);

  // 📦 Send response
  res.status(201).json({
    success: true,
    product,
  });
});
//old code
// export const createProducts = handleAsyncError(async (req, res, next) => {
//   let image = [];
//   if (typeof req.body.image === "string") {
//     image.push(req.body.image);
//   } else {
//     image = req.body.image;
//   }

//   const imageLinks = [];
//   for (let i = 0; i < image.length; i++) {
//     const result = await cloudinary.uploader.upload(image[i], {
//       folder: "products",
//     });
//     imageLinks.push({
//       public_id: result.public_id,
//       url: result.secure_url,
//     });
//   }

//   req.body.images = imageLinks;
//   req.body.user = req.user.id;
//   const product = await Product.create(req.body);
//   res.status(201).json({
//     success: true,
//     product,
//   });
// });


// 2️⃣Get all products


export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage = 9;
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter();

  //    Getting filtered query before pagination
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();

  // Calculate totalPages based on filtered count
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;

  if (page > totalPages && productCount > 0) {
    return next(new HandleError("This page doesn't exist", 404));
  }

  //Apply pagination
  apiFeatures.pagination(resultsPerPage);
  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new HandleError("No Product Found", 404));
  }
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    totalPages,
    currentPage: page,
  });
});

// 3️⃣ Update Product
export const updateProduct = handleAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  let images = [];

  if (typeof req.body.image === "string") {
    images.push(req.body.image);
  } else if (Array.isArray(req.body.image)) {
    images = req.body.image;
  }

  if (images.length > 0) {
    // 🧼 Destroy old images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }

    // ☁️ Upload new images to Cloudinary
    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });
      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imageLinks;
  }

  // 🛠️ Update the product in DB
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});


// 4️⃣Delete Product

export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }
  res.status(200).json({
    success: true,
    message: "Product Deleted successfully",
  });
});

// 5️⃣Accessing Single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//6️⃣ Creating and Updating Review
export const createReviewForProduct = handleAsyncError(
  async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    if (!product) {
      return next(new HandleError("Product not found", 400));
    }
    const reviewExists = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString()
    );
    if (reviewExists) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user.id.toString()) {
          (review.rating = rating), (review.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
    }
    product.numOfReviews = product.reviews.length;
    let sum = 0;
    product.reviews.forEach((review) => {
      sum += review.rating;
    });
    product.ratings =
      product.reviews.length > 0 ? sum / product.reviews.length : 0;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      product,
    });
  }
);

// 7️⃣Getting reviews
export const getProductReviews = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// 8️⃣Deleting Reviews
export const deleteReview = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const ratings = reviews.length > 0 ? sum / reviews.length : 0;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });
});

// 9️⃣Admin - Getting all products
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
 



////////////////////////  THIS IS MY CODE BELOW ////////////////////////




// import Product from '../models/productModel.js';
// import handleAsyncError from '../middleware/handleAsyncError.js';
// import APIFunctionality from '../utils/apiFunctionality.js';
// import HandleError from '../utils/handleError.js';

// // http://localhost:8000/api/v1/product/687b918a3a9cdf194ebafe40?keyword=shirt

// // 1 Creating Products
// export const createProducts = handleAsyncError(async (req, res, next) => {
//     req.body.user = req.user.id;
//     console.log(req.user);

//     const product = await Product.create(req.body);
//     res.status(201).json({
//         success: true,
//         product
//     });
// })

// // 2 GET ALL PRODUCTS
// export const getAllProducts = handleAsyncError(async (req, res, next) => {
//     const resultsPerPage = 4; // You can make this dynamic later [cant go less than 3 rn]
//     const apiFeatures = new APIFunctionality(Product.find(), req.query)
//         .search()
//         .filter();

//     // Getting Filtered Query Before Pagination
//     const filteredQuery = apiFeatures.query.clone();
//     const productCount = await filteredQuery.countDocuments();


//     // Calculate Totalpages baded on filtered count
//     const totalPages = Math.ceil(productCount / resultsPerPage);
//     const page = Number(req.query.page) || 1;
//     if (page > totalPages && productCount > 0) {
//         return next(new HandleError("This Page Doesn't Exist", 404)); // I Use HandleError for consistent error handling
//     }

//     //Apply Pagination
//     apiFeatures.pagination(resultsPerPage);
//     // Execute the query
//     const products = await apiFeatures.query;
//     if (!products || products.length === 0) {
//         return next(new HandleError('No Products Found', 404)); // I Use HandleError for consistent error handling
//     }
//     res.status(200).json({
//         success: true,
//         products,
//         productCount,
//         resultsPerPage,
//         totalPages,
//         currentPage: page
//     });
// })

// // 3 UPDATE PRODUCTS
// export const updateProduct = handleAsyncError(async (req, res, next) => {

//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });
//     if (!product) {
//         return next(new HandleError('Product Not Found', 404)); // Use HandleError for consistent error handling
//     }
//     res.status(200).json({
//         success: true,
//         product
//     });
// })

// // 4 DELETE PRODUCTS

// export const deleteProduct = handleAsyncError(async (req, res, next) => {

//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) {
//         return next(new HandleError('Product Not Found', 404)); // Use HandleError for consistent error handling

//     }
//     res.status(200).json({
//         success: true,
//         message: 'Product Deleted Successfully'
//     });


// });

// // 5 ACCESSING SINGLE PRODUCT

// export const getSingleProduct = handleAsyncError(async (req, res, next) => {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//         return next(new HandleError('Product Not Found', 404)); // Use HandleError for consistent error handling

//     }
//     res.status(200).json({
//         success: true,
//         product
//     });
// });

// // 6 CREATING AND UPDATING REVIEWS
// export const createReviewForProduct = handleAsyncError(async (req, res, next) => {
//     const { rating, comment, productId } = req.body;
//     const review = {
//         user: req.user._id,
//         name: req.user.name,
//         rating: Number(rating),
//         comment
//     }
//     const product = await Product.findById(productId);
//     const reviewExists = product.reviews.find(review =>
//         review.user.toString() === req.user.id);
//     if (reviewExists) {
//         product.reviews.forEach(review => {
//             if (review.user.toString() === req.user.id.toString()) {
//                 review.rating = rating;
//                 review.comment = comment;
//             }
//         });
//     } else {
//         product.reviews.push(review);
//     }
//     product.numOfReviews = product.reviews.length;
//     let sum = 0;
//     product.reviews.forEach(review => {
//         sum += review.rating;
//     });
//     product.ratings = product.reviews.length > 0 ? sum / product.reviews.length : 0;
//     await product.save({ validateBeforeSave: false });
//     res.status(200).json({
//         success: true,
//         product
//     });
// });


// // 7 GETTING REVIEWS
// export const getProductReview = handleAsyncError(async (req, res, next) => {
//     const product = await Product.findById(req.query.id);
//     if (!product) {
//         return next(new HandleError('Product Not Found', 400));
//     }
//     res.status(200).json({
//         success: true,
//         reviews: product.reviews
//     });
// });


// // 8 DELETING REVIEWS
// export const deleteReview = handleAsyncError(async (req, res, next) => {
//     const product = await Product.findById(req.query.productId);
//     if (!product) {
//         return next(new HandleError('Product Not Found', 400));
//     }
//     const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
//     let sum = 0;
//     reviews.forEach(review => {
//         sum += review.rating;
//     });
//     const ratings = reviews.length > 0 ? sum / reviews.length : 0;
//     const numOfReviews = reviews.length;
//     await Product.findByIdAndUpdate(req.query.productId, {
//         reviews,    
//         ratings,
//         numOfReviews    
//     }, {
//         new: true,
//         runValidators: true
//     });
//     res.status(200).json({
//         success: true,
//         message: 'Review Deleted Successfully'
//     }); 
// });


// // 9  ADMIN GETTING ALL PRODUCTS
// export const getAdminProducts = handleAsyncError(async (req, res, next) => {
//     const products = await Product.find();
//     res.status(200).json({
//         success: true,
//         products
//     });
// })