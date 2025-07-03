import React from "react";
import { plansData } from "../data/plansData";
import { Barbell } from "phosphor-react";
import "./Offer.css";

const icons = {
  Barbell: Barbell,
};

const Offer = () => {
  return (
    <div className="plans-container">
      <div className="plans">
        {plansData.map((plan, i) => (
          <div key={i} className="plan">

            {React.createElement(icons[plan.icon], { size: 30 })}
            <h2>{plan.name}</h2>
            <p>${plan.price}</p>

            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <div>
              <span>See more benefits ↓</span>
            </div>
            <button className="btn">Join us</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
