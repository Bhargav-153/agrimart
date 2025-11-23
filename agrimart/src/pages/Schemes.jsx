import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { useSelector } from "react-redux";
import { translateProductName } from "@/helpers/productTranslations";

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
  const { t, i18n } = useTranslation();
  const [dynamicSchemes, setDynamicSchemes] = useState([]);
  const user = useSelector((state) => state.user?.user);
  const isAdmin = user?.role === 'admin';
  const currentLanguage = i18n.language || 'en';

  useEffect(() => {
    fetch(`${API_BASE_URL}/schemes/all`)
      .then((res) => res.json())
      .then((data) => setDynamicSchemes(data.schemes || []))
      .catch(() => setDynamicSchemes([]));
  }, []);

  return (
    <div className={styles.schemesContainer}>
      <h1 className={styles.pageTitle}>{t("govSchemes")}</h1>
      <div className="mt-4">
      {isAdmin && (
        <div className={styles.addSchemesWrapper}>
          <Button asChild className={styles.addSchemeBtn}>
            <Link to={SchemaRoute}>{t("addProduct")} - {t("govSchemes")}</Link>
          </Button>
        </div>
      )}
      </div>
      <div className={styles.schemesGrid}>
        
        {/* Dynamic schemes from backend */}
        {dynamicSchemes.map((scheme, index) => {
          const translatedTitle = translateProductName(scheme.title, currentLanguage);
          const translatedDesc = translateProductName(scheme.description, currentLanguage);
          return (
            <div key={`dynamic-${index}`} className={styles.schemeCard}>
              <div className={styles.schemeIcon}>
                {scheme.icon && iconMap[scheme.icon] && (
                  <FontAwesomeIcon icon={iconMap[scheme.icon]} />
                )}
              </div>
              <div className={styles.schemeInfo}>
                <h2>{translatedTitle}</h2>
                <p>{translatedDesc}</p>
                <ul className={styles.schemeDetails}>
                  {scheme.details.map((detail, i) => {
                    const translatedDetail = translateProductName(detail, currentLanguage);
                    return (
                      <li key={i}>
                        <FontAwesomeIcon icon={faCheck} />
                        &nbsp; {translatedDetail}
                      </li>
                    );
                  })}
                </ul>

                {/* Apply Link */}
                {scheme.linkApply && (
                  <a
                    href={scheme.linkApply}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.applyBtn}
                  >
                    {t("applyNow")}
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
                    {t("video")}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schemes;
