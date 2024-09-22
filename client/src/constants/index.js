import hero from "../assets/salon.png";
//image on services page
import HairImage from "../assets/CopperHair.jpg";
//images for stylist profiles
import portfolio1 from "../assets/Stylist1.jpg";
import portfolio2 from "../assets/Stylist2.jpg";
import portfolio3 from "../assets/Stylist3.jpg";
//images for lightbox
import slide1 from "../assets/MeganHairOne.jpg";
import slide2 from "../assets/hair1.jpg";
import slide3 from "../assets/CopperHair.jpg";
import slide4 from "../assets/hair2.jpg";
import slide5 from "../assets/hair3.jpg";
import slide6 from "../assets/hair4.jpg";
import slide7 from "../assets/hair5.jpg";
import slide8 from "../assets/hair6.jpg";
import slide9 from "../assets/hair7.jpg";
import slide10 from "../assets/hair8.jpg";


export const LINKS = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Book appointment",
    link: "/booking",
  },
  {
    name: "Services",
    link: "/services",
  },
  {
    name: "Stylists",
    link: "#portfolio",
  },
  {
    name: "Our Work",
    link: "#OurWork",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Reviews",
    link: "#reviews",
  },
  {
    name: "Contact",
    link: "#contact",
  },
  {
    name: "Sign In",
    link: "#sign-in",
  },
  {
    name: "Sign Out",
    link: "#sign-out",
  },
];

export const SLIDES_CONTENT = [
  {
    image: slide1,
    alt: "Megan hair",
  },
  {
    image: slide2,
    alt: "hair1",
  },
  {
    image: slide3,
    alt: "copper",
  },
  {
    image: slide4,
    alt: "hair2",
  },
  {
    image: slide5,
    alt: "hair3",
  },
  {
    image: slide6,
    alt: "hair4",
  },
  {
    image: slide7,
    alt: "hair5",
  }, {
    image: slide8,
    alt: "hair6",
  },
  {
    image: slide9,
    alt: "hair7",
  },
  {
    image: slide10,
    alt: "hair8",
  },
];


export const HERO_CONTENT = {
  title: "Hair & Co",
  subtitle: "Hair & Company delivers a salon experience that will leave you looking stylish and beautiful while feeling relaxed and pampered.",
  image: hero,
};


export const SERVICES_CONTENT = [
  {
    image: HairImage,
    alt: "Cuts (a la cart)",
  },
];


export const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    name: "Megan",
    description:
    "Click to view profile",
    image: portfolio1,
    link: "/meganPortfolio",
  },
  {
    id: 2,
    name: "Mallory",
    description:
    "Click to view profile",
    image: portfolio2,
    link: "/malloryPortfolio",
  },
  {
    id: 3,
    name: "Kayla",
    description:
      "Click to view profile",
    image: portfolio3,
    link: "/kaylaPortfolio",
  },
];


export const REVIEWS = {
  text: "Hear what our clients have to say about their experiences with Hair & Co. We take pride in our work and are committed to delivering top-notch services.",
  reviews: [
    {
      name: "Shelley Houston Crenshaw",
      review:
        "LOVE Hair & Company...and Lorin is a fabulous addition to the team!! She cut my hair yesterday and is so great!! Sweet too, I enjoyed simply meeting her!!",
    },
    {
      name: "Karen Gregory",
      review:
      "Hair and Company is a wonderful place to get you hair cut. Not only are the hairstylists very professional and do an excellent job, but there is such a positive atmosphere filled with love. I always leave happier than when I arrived.",
    },
    {
      name: "Brittany Pantello",
      review:
      "The experience was top notch and my hair looks great",
    },
    {
      name: "Laura Simons Murphy",
      review:
      "Love me some Megan Pitts! Beautiful person inside and out! Great at what she does!",
    },
    {
      name: "Donna Davis",
      review:
      "Love Hair and Company Jennifer does fantastic with color and cut!  I always leave feeling beautiful because of her talent and knowledge of knowing what is best for my hair!",
    },
    {
      name: "Kammy Miller",
      review:
      "Holly has cut my hair since I was 17 back in 1992!!!! Now she cuts my kids hair too. She is a wonderful godly woman",
    },
  ],
};


export const CONTACT_INFO = {
  text: "Have questions or need more information? Get in touch with us, and we ll be happy to assist you.",
  phone: {
    label: "Phone",
    value: "(601) 939-2720",
  },
  email: {
    label: "Email",
    value: "info@hairandco.com",
  },
  address: {
    label: "Address",
    value: "5647 Highway 80 E, Pearl, MS, United States, Mississippi",
  },
};
