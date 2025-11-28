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
import { RouteSeeds } from "@/helpers/RouteName";

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(3),
  price: z.preprocess((v) => Number(v), z.number().positive()),
  unit: z.enum(["kg", "g", "piece", "packet"]),
  category: z.enum(["Grain Seeds", "Vegetable Seeds", "Fruit Seeds", "Spice Seeds"]),
  tag: z.string().optional(),
  rating: z.preprocess((v) => Number(v || 0), z.number().min(0).max(5)),
  reviews: z.preprocess((v) => Number(v || 0), z.number().min(0)),
});

const EditSeeds = () => {
  const { seedid } = useParams();
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
      unit: "",
      category: "",
      tag: "",
      rating: "",
      reviews: "",
    },
  });

  // Convert uploaded image → Base64
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

  // Fetch Seed Data
  useEffect(() => {
    const fetchSeed = async () => {
      try {
        const res = await fetch(`${baseURL}/seeds/${seedid}`);
        const result = await res.json();

        if (!res.ok) {
          showToast("error", "Seed not found");
          return;
        }

        form.reset(result);

        if (result.image) {
          setFilePreview(result.image);
          setBase64Image(result.image);
        }
      } catch (err) {
        showToast("error", "Failed to fetch data");
      }
    };

    fetchSeed();
  }, [seedid, baseURL]);

  // SUBMIT UPDATE (BASE64 only)
  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        image: base64Image, 
      };

      const res = await fetch(`${baseURL}/seeds/update/${seedid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        showToast("error", result.message);
        return;
      }

      showToast("success", "Seed updated successfully");
      navigate(RouteSeeds);
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <h2 className={styles.title}>Edit Seed</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
              
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border p-2 rounded">
                        <option value="">Select Category</option>
                        <option value="Grain Seeds">Grain Seeds</option>
                        <option value="Vegetable Seeds">Vegetable Seeds</option>
                        <option value="Fruit Seeds">Fruit Seeds</option>
                        <option value="Spice Seeds">Spice Seeds</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        <option value="Bestseller">Bestseller</option>
                        <option value="Organic">Organic</option>
                        <option value="New">New</option>
                        <option value="Premium">Premium</option>
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
                      <Input {...field} placeholder="Seed Name" />
                    </FormControl>
                    <FormMessage />
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
                      <Input {...field} placeholder="Describe seed" />
                    </FormControl>
                    <FormMessage />
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
                      <Input type="number" {...field} placeholder="Price" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Unit */}
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border p-2 rounded">
                        <option value="">Select Unit</option>
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="piece">Piece</option>
                        <option value="packet">Packet</option>
                      </select>
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
                <FormLabel>Seed Image</FormLabel>
                <Dropzone onDrop={handleFileSelect}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className={styles.dropzoneWrapper}>
                      <input {...getInputProps()} />
                      {filePreview ? (
                        <img src={filePreview} alt="" className={styles.previewImage} />
                      ) : (
                        <p>Click or drag image here</p>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <Button type="submit" className={styles.submitButton}>
                Update Seed
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditSeeds;
