import watchImg from "../assets/images/p-watch.jpg";
import shoesImg from "../assets/images/k-shoes.webp";
import cameraImg from "../assets/images/p-camera.jpg";
import headphonesImg from "../assets/images/p-headphones.jpg";
import earbudsImg from "../assets/images/cat-electronics.jpg";
import bagImg from "../assets/images/p-bag.jpg";
import fashionGirlImg from "../assets/images/n-Bags.avif";
import sunglassesImg from "../assets/images/sunglasses.webp";
import sofaImg from "../assets/images/home-sofa.webp";
import chairImg from "../assets/images/home-chair.jpg";
import lampImg from "../assets/images/home-lamp.jpg";
import kitchenImg from "../assets/images/home-kitchen.webp";

export const imageMap = {
  watchImg,
  shoesImg,
  cameraImg,
  headphonesImg,
  earbudsImg,
  bagImg,
  fashionGirlImg,
  sunglassesImg,
  sofaImg,
  chairImg,
  lampImg,
  kitchenImg,
  "p-watch.jpg": watchImg,
  "k-shoes.webp": shoesImg,
  "p-camera.jpg": cameraImg,
  "p-headphones.jpg": headphonesImg,
  "cat-electronics.jpg": earbudsImg,
  "p-bag.jpg": bagImg,
  "n-Bags.avif": fashionGirlImg,
  "sunglasses.webp": sunglassesImg,
  "home-sofa.webp": sofaImg,
  "home-chair.jpg": chairImg,
  "home-lamp.jpg": lampImg,
  "home-kitchen.webp": kitchenImg,
};

export const getImageSrc = (image) => imageMap[image] || image;
