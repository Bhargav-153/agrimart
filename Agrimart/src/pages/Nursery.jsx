import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { RouteNurseryAdd } from "@/helpers/RouteName";
import styles from "./Nursery.module.css";

const Nursery = () => {
  const [nurseries, setNurseries] = useState([]);

  useEffect(() => {
    const fetchNurseries = async () => {
      try {
        const res = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/nursery/all-nursery`
        );
        const data = await res.json();
        setNurseries(data.nursery);
      } catch (err) {
        console.error("Failed to fetch nurseries:", err);
      }
    };

    fetchNurseries();
  }, []);

  return (
    <div className={styles.nurseryContainer}>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Nursery Plants</h2>
        <h3 className="text-lg text-muted-foreground">
          Flowering & Fruit Plants
        </h3>
        <div>
          <Button asChild className={styles.addNurseryBtn}>
            <Link to={RouteNurseryAdd}>Add Nursery</Link>
          </Button>
        </div>
      </div>

      {/* Nursery Cards */}
      <div className=" grid gap-6 sm:grid-cols-2 md:grid-cols-4 mt-10">
        {nurseries.length === 0 ? (
          <p>No nursery plants available.</p>
        ) : (
          nurseries.map((n, i) => (
            <Card key={i} className="pt-5">
              <CardContent>
                {/* Image */}
                {n.plantImage && (
                  <div className="mb-3">
                    <img
                      src={n.plantImage}
                      alt={n.plantName}
                      className="rounded w-full h-48 object-cover"
                    />
                  </div>
                )}

                {/* Title and  */}
                <div className="mb-2">
                  <h3 className={styles.productName}>{n.plantName}</h3>
                  <p className={styles.productPrice}>{n.plantPrice}</p>
                </div>

                {/* Details */}

                <div className={styles.farmerInfo}>
                  <p>
                    <strong>Nursery:</strong> {n.nurseryName}
                  </p>
                  <p>
                    <strong>Address:</strong> {n.address}
                  </p>
                  <p>
                    <strong>Phone:</strong> {n.phone}
                  </p>
                </div>
                <button className={styles.addToCart}>Add to Cart</button>
                <button className={styles.buy}>Buy Now</button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Nursery;
