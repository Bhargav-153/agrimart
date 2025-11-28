import React, { useState } from "react";
import styles from "./AddSeeds.module.css";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import { showToast } from "@/helpers/showToast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/useFetch";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { RouteSeedsEdit } from "@/helpers/RouteName";

const AddSeeds = () => {
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const [refreshData, setRefreshData] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Schema for Seeds
 const formSchema = z.object({
  name: z.string().min(2, "Seed name is required"),
  description: z.string().min(3, "Description is too short"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  unit: z.enum(["kg", "g", "piece", "packet"], {
    required_error: "Unit is required",
  }),
  tag: z.enum(["Bestseller", "Organic", "New", "Premium"]).optional(),
  rating: z.preprocess(
    (val) => (val ? Number(val) : 0),
    z.number().min(0).max(5)
  ).optional(),
  reviews: z.preprocess(
    (val) => (val ? Number(val) : 0),
    z.number().min(0)
  ).optional(),
});



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

  // ✅ Submit new seed
  const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

async function onSubmit(values) {
  try {
    if (!file) return showToast("error", "Seed image is required");

    const base64Image = await toBase64(file);

    const payload = {
      ...values,
      image: base64Image, // ✅ key must match backend
    };

    const response = await fetch(`${API_BASE_URL}/seeds/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) return showToast("error", data.message);

    showToast("success", "Seed added successfully");
    form.reset();
    setFile(null);
    setPreview(null);
    setRefreshData(!refreshData);
  } catch (error) {
    showToast("error", error.message);
  }
}



  // ✅ File handling
  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };

  // ✅ Fetch all seeds
  const { data: seedsData } = useFetch(
    `${API_BASE_URL}/seeds/all`,
    {
      method: "GET",
      credentials: "include",
    },
    [refreshData]
  );

  // ✅ Delete seed
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/seeds/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        return showToast("error", data.message || "Delete failed");
      }

      setRefreshData(!refreshData);
      showToast("success", "Seed deleted");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Add Seeds</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* ✅ Type Dropdown */}
            
            {/* ✅ Category Dropdown */}
            <div className={styles.formGroup}>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded p-2" required>
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
            </div>

            {/* ✅ Tag Dropdown */}
            <div className={styles.formGroup}>
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
            </div>

            {/* ✅ Text Fields */}
            {["name", "description", "price"].map((field) => (
              <div className={styles.formGroup} key={field}>
                <FormField
                  control={form.control}
                  name={field}
                  render={({ field: f }) => (
                    <FormItem>
                      <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                      <FormControl>
                        <Input
                          type={field === "price" ? "number" : "text"}
                          placeholder={`Enter ${field}`}
                          {...f}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            {/* ✅ Unit Dropdown */}
            <div className={styles.formGroup}>
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded p-2" required>
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
            </div>

            {/* ✅ Rating Input */}
            <div className={styles.formGroup}>
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (1–5)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ✅ Reviews Input */}
            <div className={styles.formGroup}>
              <FormField
                control={form.control}
                name="reviews"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reviews Count</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>



            {/* ✅ File upload */}
            <div className="mb-3">
              <span className="mb-2 block">Seed Image</span>
              <Dropzone onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed rounded">
                      {filePreview ? (
                        <img src={filePreview} alt="Preview" width="100%" />
                      ) : (
                        <span>Click to upload</span>
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>

            <div className={styles.submitSection}>
              <Button type="submit" className={styles.submitButton}>
                Add Seed
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      {/* ✅ Seeds Table */}
      <div className={styles.container}>
        
          <h1 className={styles.title}>All Seeds</h1>
        

        <div className="mt-10 w-full max-w-6xl">
          <Table className="border-separate border-spacing-x-6 border-spacing-y-3 w-full">
  <TableHeader>
    <TableRow>
      <TableHead>Category</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Unit</TableHead>
      <TableHead>Rating</TableHead>
      <TableHead>Reviews</TableHead>
      <TableHead>Date</TableHead>
      <TableHead>Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {seedsData?.seeds?.map((s, i) => (
      <TableRow key={i}>
        <TableCell>{s.category}</TableCell>
        <TableCell>{s.name}</TableCell>
        <TableCell>₹{s.price}</TableCell>
        <TableCell>{s.unit}</TableCell>
        <TableCell>{s.rating}</TableCell>
        <TableCell>{s.reviews}</TableCell>
        <TableCell>{moment(s?.createdAt).format("DD-MM-YYYY")}</TableCell>
        <TableCell className="flex gap-3">
          <Button
            variant="outline"
            className="w-10 hover:bg-green-500 hover:text-white"
            asChild
          >
            <Link to={RouteSeedsEdit(s._id)}>
              <FaEdit />
            </Link>
          </Button>
          <Button
            onClick={() => handleDelete(s._id)}
            variant="outline"
            className="w-10 hover:bg-green-500 hover:text-white"
          >
            <FaRegTrashAlt />
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

        </div>
      </div>
    </div>
  );
};

export default AddSeeds;
