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
                  className={styles.videoBtn}
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
