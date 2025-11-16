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

// ✅ Validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(3, "Description is required"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().positive("Price must be greater than 0")
  ),
  tag: z.enum(["Fertilizer", "Pesticide", "Compost", "Other"]).optional(),
  rating: z
    .preprocess((val) => (val ? Number(val) : 0), z.number().min(0).max(5))
    .optional(),
  reviews: z
    .preprocess((val) => (val ? Number(val) : 0), z.number().min(0))
    .optional(),
});

const EditOrganic = () => {
  const { organicid } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const baseURL = getEnv("VITE_API_BASE_URL");

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

  // ✅ Fetch organic product for editing
  useEffect(() => {
  const fetchOrganic = async () => {
    try {
      const res = await fetch(`${baseURL}/organic/${organicid}`, {
        method: "GET",
        credentials: "include", // if your API needs cookies
      });

      const data = await res.json();
      if (!res.ok) {
        return showToast("error", data.message || "Failed to fetch organic product");
      }

      const organic = data.organic || data; // adjust if backend wraps response

      form.reset({
        name: organic.name || "",
        description: organic.description || "",
        price: organic.price || "",
        tag: organic.tag || "",
        rating: organic.rating || 0,
        reviews: organic.reviews || 0,
      });

      if (organic.image) {
        const previewURL = organic.image.startsWith("http")
          ? organic.image
          : `${baseURL.replace("/api", "")}${organic.image}`;
        setFilePreview(previewURL);
      }
    } catch (error) {
      showToast("error", "Failed to fetch organic product data");
    }
  };

  if (organicid) fetchOrganic();
}, [organicid, baseURL, form]);


  // ✅ Submit update
  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key] || "");
      });
      if (file) {
        formData.append("image", file);
      }

      const res = await fetch(`${baseURL}/organic/update/${organicid}`, {
        method: "PUT",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        showToast("error", result.message || "Failed to update organic product");
        return;
      }

      showToast("success", result.message || "Organic product updated successfully");
      navigate(RouteOrganic);
    } catch (err) {
      showToast("error", err.message || "Something went wrong");
    }
  };

  const handleFileSelect = (acceptedFiles) => {
    const selected = acceptedFiles[0];
    setFile(selected);
    setFilePreview(URL.createObjectURL(selected));
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <h2 className={styles.title}>Edit Organic Product</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
              {/* ✅ Tag */}
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded p-2">
                        <option value="">Select Tag</option>
                        <option value="Fertilizer">Fertilizer</option>
                        <option value="Pesticide">Pesticide</option>
                        <option value="Compost">Compost</option>
                        <option value="Other">Other</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Organic Product Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Organic Product Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="Enter price" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Rating */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Reviews */}
              <FormField
                control={form.control}
                name="reviews"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reviews</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Image Upload */}
              <div className={styles.formGroup}>
                <FormLabel>Organic Product Image</FormLabel>
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
                        <p>Click or drag to upload image</p>
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
