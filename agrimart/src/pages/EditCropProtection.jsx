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
import { RouteCropProtection } from "@/helpers/RouteName";

// VALIDATION
const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(3),
  price: z.preprocess((v) => Number(v), z.number().positive()),
  tag: z.string().optional(),
  rating: z.preprocess((v) => Number(v), z.number().min(0).max(5)).optional(),
  reviews: z.preprocess((v) => Number(v), z.number().min(0)).optional(),
});

const EditCropProtection = () => {
  const { protectionid } = useParams();
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

  // Convert image → BASE64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // Handle image upload
  const handleFileSelect = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const base64 = await fileToBase64(file);
    setBase64Image(base64);
    setFilePreview(base64);
  };

  // Fetch existing product
  useEffect(() => {
    const fetchProtection = async () => {
      try {
        const res = await fetch(`${baseURL}/crop-protection/${protectionid}`);
        const result = await res.json();

        if (!res.ok) {
          showToast("error", result.message);
          return;
        }

        form.reset(result);

        if (result.image) {
          setFilePreview(result.image);
          setBase64Image(result.image);
        }
      } catch (err) {
        showToast("error", "Failed to load product");
      }
    };

    fetchProtection();
  }, []);

  // Submit update (BASE64 only)
  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        image: base64Image,
      };

      const res = await fetch(
        `${baseURL}/crop-protection/update/${protectionid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        showToast("error", result.message);
        return;
      }

      showToast("success", "Product updated successfully");
      navigate(RouteCropProtection);
    } catch (err) {
      showToast("error", "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <h2 className={styles.title}>Edit Crop Protection Product</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
              
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border p-2 rounded">
                        <option value="">Select Tag</option>
                        <option value="Bestseller">Bestseller</option>
                        <option value="Organic">Organic</option>
                        <option value="New">New</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className={styles.formGroup}>
                <FormLabel>Product Image</FormLabel>
                <Dropzone onDrop={handleFileSelect}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className={styles.dropzoneWrapper}>
                      <input {...getInputProps()} />
                      {filePreview ? (
                        <img src={filePreview} className={styles.previewImage} />
                      ) : (
                        <p>Drop or select image</p>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <Button className={styles.submitButton} type="submit">
                Update Product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCropProtection;
