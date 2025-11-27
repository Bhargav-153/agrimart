import React, { useState, useEffect } from "react";
import styles from "./AddNursery.module.css";
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
import { RouteNurseryEdit } from "@/helpers/RouteName";

// ---------------------------
// Convert File to Base64
// ---------------------------
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const AddNursery = () => {
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const [nurseryList, setNurseryList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const formSchema = z.object({
    plantName: z.string().min(2, "Plant name is required"),
    plantPrice: z.string().min(1, "Price is required"),
    nurseryName: z.string().min(3, "Nursery name is too short"),
    address: z.string().min(5, "Address is required"),
    phone: z.string().min(10, "Contact number is required"),
  });

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

  const fetchNurseries = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/nursery/all-nursery`);
      const data = await res.json();
      setNurseryList(data.nursery);
    } catch (error) {
      console.error("Fetch failed", error);
    }
  };

  useEffect(() => {
    fetchNurseries();
  }, []);

  async function onSubmit(values) {
  try {
    if (!filePreview) {
      return showToast("error", "Plant image is required");
    }

    const payload = {
      plantName: values.plantName,
      plantPrice: values.plantPrice,
      nurseryName: values.nurseryName,
      address: values.address,
      phone: values.phone,
      plantImage: filePreview,  // send base64 directly
    };

    const response = await fetch(`${API_BASE_URL}/nursery/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return showToast("error", data.message);
    }

    showToast("success", "Nursery added successfully");
    form.reset();
    setFile(null);
    setPreview(null);
    fetchNurseries();

  } catch (error) {
    showToast("error", error.message);
  }
}


  // -----------------------
  // File Selection
  // -----------------------
  const handleFileSelection = async (files) => {
    const selectedFile = files[0];
    setFile(selectedFile);

    const base64 = await convertToBase64(selectedFile); // convert to base64
    setPreview(base64); // show preview
  };

  const { data: nurseyData, error } = useFetch(
    `${API_BASE_URL}/nursery/all-nursery`,
    {
      method: "GET",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/nursery/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        return showToast("error", data.message || "Delete failed");
      }

      setRefreshData(!refreshData);
      showToast("success", "Nursery deleted");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card1}>
        <h1 className={styles.title}>Add Nursery & Plant Details</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {["plantName", "plantPrice", "nurseryName", "address", "phone"].map(
              (field) => (
                <div className={styles.formGroup} key={field}>
                  <FormField
                    control={form.control}
                    name={field}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel>
                          {field.replace(/([A-Z])/g, " $1")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type={
                              field === "plantPrice" || field === "phone"
                                ? "number"
                                : "text"
                            }
                            placeholder={`Enter ${field}`}
                            {...f}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )
            )}

            <div className="mb-3">
              <span className="mb-2 block">Plant Image</span>
              <Dropzone onDrop={handleFileSelection}>
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
                Add Nursery
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      <div className={styles.container}>
        <h1 className={styles.title}>All Nursery Plants</h1>

        <div className="mt-10 w-full max-w-6xl">
          <Table className="border-separate border-spacing-x-6 border-spacing-y-3 w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Plant</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Nursery</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nurseryList.map((n, i) => (
                <TableRow key={i}>
                  <TableCell>{n.plantName}</TableCell>
                  <TableCell>₹{n.plantPrice}</TableCell>
                  <TableCell>{n.nurseryName}</TableCell>
                  <TableCell>{n.address}</TableCell>
                  <TableCell>
                    {moment(n?.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell className="flex gap-3">
                    <Button
                      variant="outline"
                      className="w-10 hover:bg-green-500 hover:text-white"
                      asChild
                    >
                      <Link to={RouteNurseryEdit(n._id)}>
                        <FaEdit />
                      </Link>
                    </Button>
                    <Button
                      onClick={() => handleDelete(n._id)}
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

export default AddNursery;
