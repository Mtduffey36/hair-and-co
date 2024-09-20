import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto border-b-2 mt-16 px-4 lg:px-6" id="about">
      <h2 className="text-xl lg:text-3xl font-semibold tracking-tight text-center uppercase mb-10">
        About Hair & Co.
      </h2>
      <div className="flex flex-col items-center lg:space-x-8 mb-16">
        <div className="text-base lg:text-lg font-normal leading-relaxed max-w-4xl text-center lg:text-left mt-6 lg:mt-0 indent-6">
          <p className="mb-5">
            Welcome to Hair & Co, your go-to destination for exceptional hair care and styling in the heart of Mississippi. We believe your hair is an expression of your individuality, and our mission is to help you feel confident and beautiful, inside and out. We pride ourselves on creating a welcoming atmosphere where every client feels valued and pampered. Our talented stylists stay up-to-date with the latest trends to ensure you receive the highest quality service. Whether you’re looking for a fresh cut, vibrant color, or a style transformation, we’re here to bring your vision to life.
          </p>
          
          <p className="mb-5">
            From the moment you step through our doors, you’ll experience the warmth and hospitality that sets us apart. We listen to your needs, understand your style, and create a look that perfectly suits you. Hair & Co. is more than just a salon—it’s a place to relax, unwind, and leave feeling rejuvenated. We use only the finest products to nourish and protect your hair because healthy hair is beautiful hair. Our commitment to excellence extends beyond the chair; we strive to provide a personalized experience that leaves you inspired and confident.
          </p>
          
          <p className="mb-5">
            Whether you’re preparing for a special occasion or simply looking to refresh your everyday style, Hair & Co. is here to make you look and feel your best. Book your appointment today and discover why our clients keep coming back. We can’t wait to welcome you to the Hair & Co. family!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
