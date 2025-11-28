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
import { RouteOrganic } from "@/helpers/RouteName";

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(3),
  price: z.preprocess((v) => Number(v), z.number().positive()),
  tag: z.enum(["Fertilizer", "Pesticide", "Compost", "Other"]).optional(),
  rating: z.preprocess((v) => Number(v || 0), z.number().min(0).max(5)),
  reviews: z.preprocess((v) => Number(v || 0), z.number().min(0)),
});

const EditOrganic = () => {
  const { organicid } = useParams();
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

  // Convert image → Base64
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

  // Fetch organic product
  useEffect(() => {
    const fetchOrganic = async () => {
      try {
        const res = await fetch(`${baseURL}/organic/${organicid}`);
        const data = await res.json();

        if (!res.ok) {
          showToast("error", "Organic product not found");
          return;
        }

        const organic = data.organic || data;

        form.reset({
          name: organic.name,
          description: organic.description,
          price: organic.price,
          tag: organic.tag,
          rating: organic.rating,
          reviews: organic.reviews,
        });

        if (organic.image) {
          setFilePreview(organic.image);
          setBase64Image(organic.image);
        }
      } catch {
        showToast("error", "Failed to load organic product");
      }
    };

    fetchOrganic();
  }, [organicid, baseURL]);

  // Submit Base64 update
  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        image: base64Image,
      };

      const res = await fetch(`${baseURL}/organic/update/${organicid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        showToast("error", result.message);
        return;
      }

      showToast("success", "Organic product updated successfully");
      navigate(RouteOrganic);

    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <h2 className={styles.title}>Edit Organic Product</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>

              {/* Tag */}
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border p-2 rounded">
                        <option value="">Select Tag</option>
                        <option value="Fertilizer">Fertilizer</option>
                        <option value="Pesticide">Pesticide</option>
                        <option value="Compost">Compost</option>
                        <option value="Other">Other</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Organic product name" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Description" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="Enter price" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Rating */}
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

              {/* Reviews */}
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

              {/* Image Upload */}
              <div className={styles.formGroup}>
                <FormLabel>Organic Product Image</FormLabel>
                <Dropzone onDrop={handleFileSelect}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className={styles.dropzoneWrapper}>
                      <input {...getInputProps()} />
                      {filePreview ? (
                        <img
                          src={filePreview}
                          alt=""
                          className={styles.previewImage}
                        />
                      ) : (
                        <p>Click or drag an image</p>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <Button type="submit" className={styles.submitButton}>
                Update Organic Product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditOrganic;
