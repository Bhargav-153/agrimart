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
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RouteOrganicEdit } from "@/helpers/RouteName";

const AddOrganic = () => {
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const [refreshData, setRefreshData] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Schema for Organic
  const formSchema = z.object({
    name: z.string().min(2, "Organic product name is required"),
    description: z.string().min(3, "Description is too short"),
    price: z.string().min(1, "Price is required"),
    tag: z.enum(["Fertilizer", "Pesticide", "Compost", "Other"]).optional(),
    unit: z.enum(["kg", "g", "piece", "packet", "liter"], {
        required_error: "Unit is required",
      }),
    rating: z
      .preprocess((val) => (val ? Number(val) : 0), z.number().min(0).max(5))
      .optional(),
    reviews: z
      .preprocess((val) => (val ? Number(val) : 0), z.number().min(0))
      .optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      unit: "",
      tag: "",
      rating: "",
      reviews: "",
    },
  });

  // ✅ Submit new organic product
  async function onSubmit(values) {
  if (!filePreview) return showToast("error", "Organic product image is required");

  try {
    const payload = {
      ...values,
      image: filePreview, // base64 string
    };

    const response = await fetch(`${API_BASE_URL}/organic/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) return showToast("error", data.message);

    showToast("success", "Organic product added successfully");
    form.reset();
    setFile(null);
    setPreview(null);
    setRefreshData(!refreshData);
  } catch (err) {
    showToast("error", err.message);
  }
}


  // ✅ File handling
  const handleFileSelection = (files) => {
  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setPreview(reader.result); // base64 string used for submission & preview
  };
  reader.onerror = () => {
    showToast("error", "Failed to read file");
  };
};


  // ✅ Fetch all organics
  const { data: organicData } = useFetch(
    `${API_BASE_URL}/organic/all`,
    { method: "GET", credentials: "include" },
    [refreshData]
  );

  // ✅ Delete organic product
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/organic/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        return showToast("error", data.message || "Delete failed");
      }

      setRefreshData(!refreshData);
      showToast("success", "Organic product deleted");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Add Organic Product</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>

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
            </div>

            {/* ✅ Text Fields */}
            {["name", "description", "price"].map((field) => (
              <div className={styles.formGroup} key={field}>
                <FormField
                  control={form.control}
                  name={field}
                  render={({ field: f }) => (
                    <FormItem>
                      <FormLabel>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </FormLabel>
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
                                    <option value="liter">Liter</option>
                                    <option value="piece">Piece</option>
                                    <option value="packet">Packet</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

            {/* ✅ Rating & Reviews */}
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
              <span className="mb-2 block">Organic Product Image</span>
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
                Add Organic
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      {/* ✅ Organic Table */}
      <div className={styles.container}>
       
          <h1 className={styles.title}>All Organic Products</h1>
        

        <div className="mt-10 w-full max-w-6xl">
          <Table className="border-separate border-spacing-x-6 border-spacing-y-3 w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Tag</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Reviews</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organicData?.organics?.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{p.tag}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>₹{p.price}</TableCell>
                  <TableCell>{p.rating}</TableCell>
                  <TableCell>{p.reviews}</TableCell>
                  <TableCell>{moment(p?.createdAt).format("DD-MM-YYYY")}</TableCell>
                  <TableCell className="flex gap-3">
                    <Button variant="outline" className="w-10 hover:bg-green-500 hover:text-white">
                        <Link to={RouteOrganicEdit(p._id)}>
                            <FaEdit />
                        </Link>
                      
                    </Button>
                    <Button
                      onClick={() => handleDelete(p._id)}
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

export default AddOrganic;
