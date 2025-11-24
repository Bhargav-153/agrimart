import React from "react";
import Orders from "@/pages/Orders";
import styles from "./OrderPurchaseSettings.module.css";

const OrderPurchaseSettings = () => (
  <section>
  <div className={styles.listWrapper}> 
        <Orders/>
      </div>

  </section>
);

export default OrderPurchaseSettings;