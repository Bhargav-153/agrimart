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
import { RouteEquipmentEdit } from "@/helpers/RouteName";

const AddEquipment = () => {
  const [filePreview, setPreview] = useState();
  const [fileBase64, setFileBase64] = useState();
  const [refreshData, setRefreshData] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Schema
  const formSchema = z.object({
    name: z.string().min(2, "Equipment name is required"),
    description: z.string().min(3, "Description is too short"),
    price: z.string().min(1, "Price is required"),
    tag: z.enum(["Tractor", "Harvester", "Irrigation", "Other"]).optional(),
    rating: z.preprocess(val => (val ? Number(val) : 0), z.number().min(0).max(5)).optional(),
    reviews: z.preprocess(val => (val ? Number(val) : 0), z.number().min(0)).optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "", price: "", tag: "", rating: "", reviews: "" },
  });

  // Convert file to base64
  const handleFileSelection = (files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => setFileBase64(reader.result);
    reader.readAsDataURL(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit
  const onSubmit = async (values) => {
    if (!fileBase64) return showToast("error", "Equipment image is required");
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, image: fileBase64 }),
      });
      const data = await response.json();
      if (!response.ok) return showToast("error", data.message);
      showToast("success", "Equipment added successfully");
      form.reset();
      setPreview(null);
      setFileBase64(null);
      setRefreshData(!refreshData);
    } catch (err) {
      showToast("error", err.message);
    }
  };

  const { data: equipmentData } = useFetch(`${API_BASE_URL}/equipment/all`, {}, [refreshData]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/equipment/delete/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) return showToast("error", data.message || "Delete failed");
      setRefreshData(!refreshData);
      showToast("success", "Equipment deleted");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Add Equipment</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Tag */}
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
            </div>

            {/* Text Fields */}
            {["name","description","price"].map(f => (
              <div className={styles.formGroup} key={f}>
                <FormField
                  control={form.control}
                  name={f}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{f.charAt(0).toUpperCase() + f.slice(1)}</FormLabel>
                      <FormControl>
                        <Input type={f==="price"?"number":"text"} placeholder={`Enter ${f}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            {/* Rating & Reviews */}
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

            {/* File Upload */}
            <div className="mb-3">
              <span className="mb-2 block">Equipment Image</span>
              <Dropzone onDrop={handleFileSelection}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed rounded">
                      {filePreview ? <img src={filePreview} alt="Preview" width="100%" /> : <span>Click to upload</span>}
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>

            <div className={styles.submitSection}>
              <Button type="submit" className={styles.submitButton}>Add Equipment</Button>
            </div>
          </form>
        </Form>
      </Card>

      {/* Equipment Table */}
      <div className={styles.container}>
        <h1 className={styles.title}>All Equipment</h1>
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
              {equipmentData?.equipments?.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{p.tag}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>₹{p.price}</TableCell>
                  <TableCell>{p.rating}</TableCell>
                  <TableCell>{p.reviews}</TableCell>
                  <TableCell>{moment(p?.createdAt).format("DD-MM-YYYY")}</TableCell>
                  <TableCell className="flex gap-3">
                    <Button variant="outline" className="w-10 hover:bg-green-500 hover:text-white" asChild>
                      <Link to={RouteEquipmentEdit(p._id)}><FaEdit /></Link>
                    </Button>
                    <Button onClick={() => handleDelete(p._id)} variant="outline" className="w-10 hover:bg-green-500 hover:text-white"><FaRegTrashAlt /></Button>
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

export default AddEquipment;
