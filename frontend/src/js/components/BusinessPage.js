import React from "react";
import BusinessPageContent from "./BusinessPage/BusinessPageContent";
import BusinessPageLander from "./BusinessPage/BusinessPageLander";
import Vestege from "./BusinessPage/Vestege";

function BusinessPage() {
  return (
    <div>
      <BusinessPageLander />
      <BusinessPageContent />
      <Vestege />
    </div>
  );
}

export default BusinessPage;
