import React, { useEffect, useState } from "react";
import styles from "./Schemes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faHandHoldingUsd,
  faCreditCard,
  faSeedling,
  faShieldAlt,
  faTractor,
  faWater,
  faChartLine,
  faCloudSun,
  faLandmark,
  faStore,
  faShoppingCart,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SchemaRoute } from "@/helpers/RouteName";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Map icon string to FontAwesome icon object
const iconMap = {
  faLeaf,
  faHandHoldingUsd,
  faCreditCard,
  faSeedling,
  faShieldAlt,
  faTractor,
  faWater,
  faChartLine,
  faCloudSun,
  faLandmark,
  faStore,
  faShoppingCart,
};

const schemesData = [
  {
    icon: faHandHoldingUsd,
    title: "PM-KISAN",
    description: "Direct income support of ₹6,000 per year to farmer families",
    details: [
      "Income support in three installments",
      "Direct bank transfer",
      "All landholding farmers eligible",
    ],
  },
  {
    icon: faCreditCard,
    title: "Kisan Credit Card",
    description: "Easy credit access for farmers at reduced interest rates",
    details: [
      "Flexible repayment options",
      "Coverage for multiple farming needs",
      "Insurance coverage included",
    ],
  },
  {
    icon: faSeedling,
    title: "Soil Health Card",
    description: "Free soil testing and nutrient recommendations",
    details: [
      "Detailed soil analysis",
      "Crop-specific recommendations",
      "Regular monitoring",
    ],
  },
  {
    icon: faShieldAlt,
    title: "PM Fasal Bima Yojana",
    description: "Comprehensive crop insurance scheme",
    details: [
      "Protection against crop loss",
      "Low premium rates",
      "Quick claim settlement",
    ],
  },
  {
    icon: faLeaf,
    title: "Paramparagat Krishi Vikas Yojana",
    description: "Promote organic farming practices",
    details: [
      "Financial assistance for organic conversion",
      "Marketing support for organic products",
      "Certification assistance",
    ],
  },
  {
    icon: faTractor,
    title: "Sub-Mission on Agricultural Mechanization",
    description: "Financial aid for modernizing farming equipment",
    details: [
      "Subsidies for tractor & machinery",
      "Training for efficient use",
      "Loans at reduced interest rates",
    ],
  },
  {
    icon: faWater,
    title: "Pradhan Mantri Krishi Sinchayee Yojana",
    description: "Irrigation scheme for better water use efficiency",
    details: [
      "Micro-irrigation support",
      "Water conservation projects",
      "Financial aid for irrigation equipment",
    ],
  },
  {
    icon: faChartLine,
    title: "National Agriculture Market (e-NAM)",
    description: "Online trading platform for agricultural commodities",
    details: [
      "Better price discovery",
      "Direct farmer-to-buyer sales",
      "Transparency in transactions",
    ],
  },
  {
    icon: faCloudSun,
    title: "Weather-Based Crop Insurance Scheme",
    description: "Insurance based on weather conditions",
    details: [
      "Covers losses due to climate changes",
      "Low premium rates",
      "Fast claim settlements",
    ],
  },
  {
    icon: faLandmark,
    title: "Rashtriya Krishi Vikas Yojana",
    description: "Holistic agricultural development scheme",
    details: [
      "State-specific agricultural plans",
      "Infrastructure development",
      "Research & innovation support",
    ],
  },
  {
    icon: faStore,
    title: "Gramin Bhandaran Yojana",
    description: "Storage facilities for farmers",
    details: [
      "Financial support for warehouse construction",
      "Lower interest loans",
      "Reduces post-harvest losses",
    ],
  },
  {
    icon: faShoppingCart,
    title: "Market Intervention Scheme",
    description: "Price support mechanism for farmers",
    details: [
      "Ensures fair prices",
      "Government buys surplus crops",
      "Reduces distress sales",
    ],
  },
];

const Schemes = () => {
  const [dynamicSchemes, setDynamicSchemes] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/schemes/all`)
      .then((res) => res.json())
      .then((data) => setDynamicSchemes(data.schemes || []))
      .catch(() => setDynamicSchemes([]));
  }, []);

  return (
    <div className={styles.schemesContainer}>
      <h1 className={styles.pageTitle}>Government Agricultural Schemes</h1>
      <div className="mt-4">
        <Button className={styles.addSchemeBtn}>
          <Link to={SchemaRoute}>Add Government Schemes </Link>
        </Button>
      </div>
      <div className={styles.schemesGrid}>
        {/* Static schemes */}
        {schemesData.map((scheme, index) => (
          <div key={index} className={styles.schemeCard}>
            <div className={styles.schemeIcon}>
              <FontAwesomeIcon icon={scheme.icon} />
            </div>
            <div className={styles.schemeInfo}>
              <h2>{scheme.title}</h2>
              <p>{scheme.description}</p>
              <ul className={styles.schemeDetails}>
                {scheme.details.map((detail, i) => (
                  <li key={i}>
                    <FontAwesomeIcon icon={faCheck} /> {detail}
                  </li>
                ))}
              </ul>
              <a href="#" className={styles.applyBtn}>
                Apply Now
              </a>
              <a href="#" className={styles.applyBtn}>
                Youtube
              </a>
            </div>
          </div>
        ))}
        {/* Dynamic schemes from backend */}
        {dynamicSchemes.map((scheme, index) => (
          <div key={`dynamic-${index}`} className={styles.schemeCard}>
            <div className={styles.schemeIcon}>
              {scheme.icon && iconMap[scheme.icon] && (
                <FontAwesomeIcon icon={iconMap[scheme.icon]} />
              )}
            </div>
            <div className={styles.schemeInfo}>
              <h2>{scheme.title}</h2>
              <p>{scheme.description}</p>
              <ul className={styles.schemeDetails}>
                {scheme.details.map((detail, i) => (
                  <li key={i}>
                    <FontAwesomeIcon icon={faCheck} />
                    &nbsp; {detail}
                  </li>
                ))}
              </ul>

              {/* Apply Link */}
              {scheme.linkApply && (
                <a
                  href={scheme.linkApply}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.applyBtn}
                >
                  Apply Now
                </a>
              )}
              {/* Youtube Link */}
              {scheme.linkYoutube && (
                <a
                  href={scheme.linkYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.applyBtn}
                >
                  Video
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schemes;
