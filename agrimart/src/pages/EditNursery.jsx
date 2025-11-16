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

// ✅ Validation Schema
const formSchema = z.object({
  plantName: z.string().min(2, "Plant name is required"),
  plantPrice: z.string().min(1, "Price is required"),
  nurseryName: z.string().min(3, "Nursery name is too short"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(10, "Contact number is required"),
});

const EditNursery = () => {
  const { nurseryid } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
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
    },
  });

  // Fetch & Pre-fill form
  useEffect(() => {
    const fetchNursery = async () => {
      try {
        const res = await fetch(`${baseURL}/nursery/show/${nurseryid}`);
        const result = await res.json();

        if (res.ok && result) {
          const n = result;
          form.reset({
            plantName: n.plantName,
            plantPrice: n.plantPrice,
            nurseryName: n.nurseryName,
            address: n.address,
            phone: n.phone,
          });

          // Set image preview from server
          const previewURL = `${baseURL.replace("/api", "")}/uploads/${n.image}`;
          setFilePreview(previewURL);
        } else {
          showToast("error", result.message || "Nursery not found");
        }
      } catch (error) {
        showToast("error", "Failed to fetch nursery data");
      }
    };

    fetchNursery();
  }, [nurseryid, form, baseURL]);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch(`${baseURL}/nursery/update/${nurseryid}`, {
        method: "PUT",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        showToast("error", result.message || "Failed to update");
        return;
      }

      showToast("success", result.message || "Updated successfully");
      navigate(RouteNursery);
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
