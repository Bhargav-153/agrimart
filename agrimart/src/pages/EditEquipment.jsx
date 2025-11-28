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
import { RouteEquipment } from "@/helpers/RouteName";

// Validation Schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(3, "Description is required"),
  price: z.preprocess((v) => Number(v), z.number().positive()),
  tag: z.enum(["Tractor", "Harvester", "Irrigation", "Other"]).optional(),
  rating: z.preprocess((v) => Number(v || 0), z.number().min(0).max(5)),
  reviews: z.preprocess((v) => Number(v || 0), z.number().min(0)),
});

const EditEquipment = () => {
  const { equipmentid } = useParams();
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

  // When user selects new image
  const handleFileSelect = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setBase64Image(base64);
    setFilePreview(base64);
  };

  // Fetch Equipment for Edit
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await fetch(`${baseURL}/equipment/${equipmentid}`);
        const result = await res.json();

        if (!res.ok) {
          showToast("error", "Equipment not found");
          return;
        }

        form.reset(result);

        if (result.image) {
          setFilePreview(result.image);
          setBase64Image(result.image);
        }
      } catch (err) {
        showToast("error", "Failed to load equipment");
      }
    };

    fetchEquipment();
  }, [equipmentid, baseURL]);

  // Submit Update (JSON only)
  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        image: base64Image, // base64 stored
      };

      const res = await fetch(`${baseURL}/equipment/update/${equipmentid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        showToast("error", result.message || "Update failed");
        return;
      }

      showToast("success", "Equipment updated");
      navigate(RouteEquipment);
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <h2 className={styles.title}>Edit Equipment</h2>

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
                        <option value="Tractor">Tractor</option>
                        <option value="Harvester">Harvester</option>
                        <option value="Irrigation">Irrigation</option>
                        <option value="Other">Other</option>
                      </select>
                    </FormControl>
                    <FormMessage />
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
                      <Input {...field} placeholder="Equipment Name" />
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
                      <Input {...field} placeholder="Description" />
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
                <FormLabel>Equipment Image</FormLabel>
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
                Update Equipment
              </Button>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditEquipment;
