import React from "react";
import HeroBanner from "../components/Banner";
import BuyMembership from "../components/BuyMembership";
import Footer from "../components/Footer";
import Calendar from "../components/Calendar";
const Home = () =>{
  return (
   <>
   <HeroBanner />
   <BuyMembership />
   <Calendar />
   <Footer />
   </>
  );
}

export default Home;
