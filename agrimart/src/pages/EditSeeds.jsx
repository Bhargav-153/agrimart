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

// ✅ Validation Schema for Seeds
// ✅ Validation Schema for Seeds
const formSchema = z.object({
  name: z.string().min(2, "Seed name is required"),
  description: z.string().min(3, "Description is required"),
  price: z.preprocess((val) => Number(val), z.number().positive("Price must be greater than 0")),
  unit: z.enum(["kg", "g", "piece", "packet"], {
    required_error: "Unit is required",
  }),
  category: z.enum(
    ["Grain Seeds", "Vegetable Seeds", "Fruit Seeds", "Spice Seeds"],
    { required_error: "Category is required" }
  ),
  tag: z.enum(["Bestseller", "Organic", "New", "Premium"]).optional(),
  rating: z.preprocess((val) => (val ? Number(val) : 0), z.number().min(0).max(5)).optional(),
  reviews: z.preprocess((val) => (val ? Number(val) : 0), z.number().min(0)).optional(),
});


const EditSeeds = () => {
  const { seedid } = useParams();
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
      unit: "",
      category: "",
      tag: "",
      rating: "",
      reviews: "",
    },
  });

  // ✅ Fetch seed data for editing
  useEffect(() => {
    const fetchSeed = async () => {
      try {
        const res = await fetch(`${baseURL}/seeds/${seedid}`);

        const result = await res.json();

        if (res.ok && result) {
          form.reset({
            name: result.name,
            description: result.description,
            price: result.price,
            unit: result.unit,
            category: result.category,
            tag: result.tag,
            rating: result.rating,
            reviews: result.reviews,
          });

          if (result.seedImage) {
            const previewURL = `${baseURL.replace("/api", "")}/uploads/${result.seedImage}`;
            setFilePreview(previewURL);
          }
        } else {
          showToast("error", result.message || "Seed not found");
        }
      } catch (error) {
        showToast("error", "Failed to fetch seed data");
      }
    };

    fetchSeed();
  }, [seedid, baseURL, form]);

  // ✅ Submit update
  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key] || "");
      });
      if (file) {
        formData.append("seedImage", file);
      }

      const res = await fetch(`${baseURL}/seeds/update/${seedid}`, {
        method: "PUT",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        showToast("error", result.message || "Failed to update seed");
        return;
      }

      showToast("success", result.message || "Seed updated successfully");
      navigate(RouteSeeds);
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
          <h2 className={styles.title}>Edit Seed</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
              {/* ✅ Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded p-2">
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
                        <option value="Bestseller">Bestseller</option>
                        <option value="Organic">Organic</option>
                        <option value="New">New</option>
                        <option value="Premium">Premium</option>
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
                      <Input {...field} placeholder="Seed Name" />
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
                      <Input {...field} placeholder="Seed Description" />
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

              {/* ✅ Unit */}
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded p-2">
                        <option value="">Select Unit</option>
                        <option value="kg">Kilogram</option>
                        <option value="g">Gram</option>
                        <option value="piece">Piece</option>
                        <option value="packet">Packet</option>
                      </select>
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
                <FormLabel>Seed Image</FormLabel>
                <Dropzone onDrop={handleFileSelect}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className={styles.dropzoneWrapper}>
                      <input {...getInputProps()} />
                      {filePreview ? (
                        <img src={filePreview} alt="Preview" className={styles.previewImage} />
                      ) : (
                        <p>Click or drag to upload seed image</p>
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
