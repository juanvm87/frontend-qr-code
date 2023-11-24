import React from "react";
import "./StatCard.css";

const StatCard = (props) => {
  const { title, body } = props;

  return (
    <div className="container88 pt-5">
      <div className="row3 align-items-stretch">
        <div className="c-dashboardInfo col-lg-3 col-md-6">
          <div className="wrap">
            <h4 className="heading1 heading2 hind-font medium-font-weight c-dashboardInfo__title">
              {title}
            </h4>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
