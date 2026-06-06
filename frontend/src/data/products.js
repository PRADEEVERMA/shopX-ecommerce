import heroBanner from '../assets/images/hero-banner.png'

// import watchImg from '../assets/images/p-watch.jpg'
// import shoesImg from '../assets/images/k-shoes.webp'
// import cameraImg from '../assets/images/p-camera.jpg'
// import headphonesImg from '../assets/images/p-headphones.jpg'


// import earbudsImg from '../assets/images/cat-electronics.jpg'
// import bagImg from '../assets/images/p-bag.jpg'
// import fashionGirlImg from '../assets/images/n-Bags.avif'
// import sunglassesImg from '../assets/images/k-glass.webp'
// import sofaImg from '../assets/images/home-sofa.webp'
// import chairImg from '../assets/images/home-chair.jpg'
// import lampImg from '../assets/images/home-lamp.jpg'
// import kitchenImg from '../assets/images/home-kitchen.webp'

import catFashionImg from '../assets/images/cat-fashion.jpg'
import catElectronicsImg from '../assets/images/p-camera.jpg'
import catHomeImg from '../assets/images/cat-home.jpg'
import catBeautyImg from '../assets/images/cat-beauty.jpg'

export const heroImage = heroBanner

export const categories = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Beauty & Health',
  'Sports & Outdoors',
  'Books & Stationery',
  'Toys & Games',
  'Automotive',
  'Jewelry & Watches',
]

// export const products = [
//   {
//     id: 1,
//     name: 'Smart Watch Series 8',
//     rating: 4.8,
//     reviews: 128,
//     price: 899.99,
//     oldPrice: 1249.99,
//     image: watchImg,
//     category: 'Electronics',
//   },
 
//   {
//     id: 2,
//     name: "Men's Sports Shoes",
//     rating: 4.6,
//     reviews: 96,
//     price: 259.99,
//     oldPrice: 299.99,
//     image: shoesImg,
//     category: 'Fashion',
//   },
//   {
//     id: 3,
//     name: 'Canon EOS 2000D',
//     rating: 4.9,
//     reviews: 74,
//     price: 14099.99,
//     oldPrice: 18049.99,
//     image: cameraImg,
//     category: 'Electronics',
//   },

//   {
//     id: 4,
//     name: 'Women’s Handbag',
//     rating: 4.7,
//     reviews: 58,
//     price: 139.99,
//     oldPrice: 159.99,
//     image: bagImg,
//     category: 'Fashion',
//   },
//   {
//     id: 5,
//     name: 'Wireless Earbuds',
//     rating: 4.5,
//     reviews: 112,
//     price: 899.99,
//     oldPrice: 1129.99,
//     image: earbudsImg,
//     category: 'Electronics',
//   },
//    {
//   id: 6,
//   name: 'Headphones',
//   rating: 4.7,
//   reviews: 95,
//   price: 1199.99,
//   oldPrice: 1999.99,
//   image: headphonesImg,
//   category: 'Electronics',
// },
// {
//   id: 7,
//   name: 'Women Fashion Collection',
//   rating: 4.9,
//   reviews: 156,
//   price: 129.99,
//   oldPrice: 179.99,
//   image: fashionGirlImg,
//   category: 'Fashion',
// },

// {
//   id: 8,
//   name: 'Classic Sunglasses',
//   rating: 4.6,
//   reviews: 88,
//   price: 149.99,
//   oldPrice: 199.99,
//   image: sunglassesImg,
//   category: 'Fashion',
// },
// {
//   id: 9,
//   name: 'Modern Sofa',
//   rating: 4.8,
//   reviews: 84,
//   price: 1399.99,
//   oldPrice: 2099.99,
//   image: sofaImg,
//   category: 'Home & Kitchen',
// },

// {
//   id: 10,
//   name: 'Wooden Chair',
//   rating: 4.6,
//   reviews: 67,
//   price: 1099.99,
//   oldPrice: 1599.99,
//   image: chairImg,
//   category: 'Home & Kitchen',
// },

// {
//   id: 11,
//   name: 'Decorative Lamp',
//   rating: 4.7,
//   reviews: 53,
//   price: 299.99,
//   oldPrice: 379.99,
//   image: lampImg,
//   category: 'Home & Kitchen',
// },

// {
//   id: 12,
//   name: 'Kitchen Essentials Set',
//   rating: 4.9,
//   reviews: 120,
//   price: 149.99,
//   oldPrice: 199.99,
//   image: kitchenImg,
//   category: 'Home & Kitchen',
// },
// ]






export const promoHighlights = [
  {
    title: 'Electronics',
    subtitle: 'Up to 40% Off',
    image: catElectronicsImg,
    link: '/shop?category=Electronics',
  },
  {
    title: 'Fashion',
    subtitle: 'New Trends',
    image: catFashionImg,
    link: '/shop?category=Fashion',
  },
  {
  
  title: 'Home & Kitchen',
  subtitle: 'Top Picks',
  image: catHomeImg,
  link: '/shop?category=Home%20%26%20Kitchen',
},
  
  {
    title: 'Beauty Products',
    subtitle: 'Fresh arrivals',
    image: catBeautyImg,
    link: '/shop?category=Beauty%20%26%20Health',
  },
]