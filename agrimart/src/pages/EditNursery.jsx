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
import styles from "./EditNursery.module.css";
import { RouteNursery } from "@/helpers/RouteName";

// Validation
const formSchema = z.object({
  plantName: z.string().min(2, "Plant name is required"),
  plantPrice: z.string().min(1, "Price is required"),
  nurseryName: z.string().min(3, "Nursery name is required"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(10, "Contact number is required"),
  plantImage: z.string().optional(),
});

const EditNursery = () => {
  const { nurseryid } = useParams();
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState(null);

  const baseURL = getEnv("VITE_API_BASE_URL");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plantName: "",
      plantPrice: "",
      nurseryName: "",
      address: "",
      phone: "",
      plantImage: "",
    },
  });

  // Fetch data and prefill form
  useEffect(() => {
    const fetchNursery = async () => {
      try {
        const res = await fetch(`${baseURL}/nursery/show/${nurseryid}`);
        const n = await res.json();

        if (res.ok && n) {
          form.reset({
            plantName: n.plantName,
            plantPrice: n.plantPrice,
            nurseryName: n.nurseryName,
            address: n.address,
            phone: n.phone,
            plantImage: n.plantImage, // base64 saved earlier
          });

          setFilePreview(n.plantImage); // base64 to preview
        } else {
          showToast("error", n.message || "Nursery not found");
        }
      } catch (error) {
        showToast("error", "Failed to fetch nursery data");
      }
    };

    fetchNursery();
  }, [nurseryid, form, baseURL]);

  // File selection to base64
  const handleFileSelect = (files) => {
    const file = files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      form.setValue("plantImage", base64String); // store base64
      setFilePreview(base64String);
    };

    reader.readAsDataURL(file);
  };

  // Submit updated data
  const onSubmit = async (values) => {
  try {
    const res = await fetch(`${baseURL}/nursery/update/${nurseryid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), // sending JSON only!
    });

    const result = await res.json();


      if (!res.ok) {
        showToast("error", result.message || "Failed to update");
        return;
      }

      showToast("success", "Nursery updated successfully");
      navigate(RouteNursery);
    } catch (err) {
      showToast("error", err.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <h2 className={styles.title}>Edit Nursery</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
              <FormField
                control={form.control}
                name="plantName"
                render={({ field }) => (
                  <FormItem className={styles.formGroup}>
                    <FormLabel>Plant Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plantPrice"
                render={({ field }) => (
                  <FormItem className={styles.formGroup}>
                    <FormLabel>Plant Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nurseryName"
                render={({ field }) => (
                  <FormItem className={styles.formGroup}>
                    <FormLabel>Nursery Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className={styles.formGroup}>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className={styles.formGroup}>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <div className={styles.formGroup}>
                <FormLabel>Plant Image</FormLabel>

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
                Update
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditNursery;
