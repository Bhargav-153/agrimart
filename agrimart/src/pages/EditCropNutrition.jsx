import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Dropzone from "react-dropzone";
import { useParams, useNavigate } from "react-router-dom";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import styles from "./EditSeeds.module.css";
import { RouteCropNutrition } from "@/helpers/RouteName";

// -------------------------------
// Validation Schema
// -------------------------------
const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(3),
  price: z.preprocess((v) => Number(v), z.number().positive()),
  tag: z.enum(["Organic", "Mineral", "Liquid", "Premium"]).optional(),
  rating: z.preprocess((v) => Number(v || 0), z.number().min(0).max(5)),
  reviews: z.preprocess((v) => Number(v || 0), z.number().min(0)),
});

const EditCropNutrition = () => {
  const { nutritionid } = useParams();
  const navigate = useNavigate();
  const baseURL = getEnv("VITE_API_BASE_URL");

  const [filePreview, setFilePreview] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      tag: "",
      rating: "",
      reviews: "",
    },
  });

  // -----------------------------------
  // Convert File → Base64
  // -----------------------------------
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleFileSelect = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setBase64Image(base64);
    setFilePreview(base64);
  };

  // -----------------------------------
  // Fetch product data
  // -----------------------------------
  useEffect(() => {
    const fetchNutrition = async () => {
      try {
        const res = await fetch(`${baseURL}/crop-nutrition/${nutritionid}`);
        const result = await res.json();

        if (!res.ok) {
          showToast("error", "Product not found");
          return;
        }

        form.reset({
          name: result.name || "",
          description: result.description || "",
          price: result.price || "",
          tag: result.tag || "",
          rating: result.rating || 0,
          reviews: result.reviews || 0,
        });

        if (result.image) {
          // If it's base64 keep as it is
          if (result.image.startsWith("data:image")) {
            setFilePreview(result.image);
            setBase64Image(result.image);
          } else {
            // If image stored as path
            const url = `${baseURL.replace("/api", "")}${result.image}`;
            setFilePreview(url);
            setBase64Image(url);
          }
        }
      } catch (err) {
        showToast("error", "Failed to fetch data");
      }
    };

    fetchNutrition();
  }, [nutritionid, baseURL]);

  // -----------------------------------
  // Submit Update
  // -----------------------------------
  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        image: base64Image, // IMPORTANT
      };

      const res = await fetch(
        `${baseURL}/crop-nutrition/update/${nutritionid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        showToast("error", result.message || "Update failed");
        return;
      }

      showToast("success", "Crop nutrition product updated successfully");
      navigate(RouteCropNutrition);
    } catch (err) {
      showToast("error", err.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <h2 className={styles.title}>Edit Crop Nutrition Product</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>

              {/* TAG */}
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border p-2 rounded">
                        <option value="">Select Tag</option>
                        <option value="Organic">Organic</option>
                        <option value="Mineral">Mineral</option>
                        <option value="Liquid">Liquid</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NAME */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Product Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* DESCRIPTION */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Product Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PRICE */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="Price" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* RATING */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="5" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* REVIEWS */}
              <FormField
                control={form.control}
                name="reviews"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reviews</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* IMAGE */}
              <div className={styles.formGroup}>
                <FormLabel>Product Image</FormLabel>
                <Dropzone onDrop={handleFileSelect}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className={styles.dropzoneWrapper}>
                      <input {...getInputProps()} />
                      {filePreview ? (
                        <img
                          src={filePreview}
                          alt="Preview"
                          className={styles.previewImage}
                        />
                      ) : (
                        <p>Click or drag image here</p>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <Button type="submit" className={styles.submitButton}>
                Update Product
              </Button>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCropNutrition;
