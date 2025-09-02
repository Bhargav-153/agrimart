import React, { useState, useEffect } from "react";
import styles from "./AddSchema.module.css";
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
import { showToast } from "@/helpers/showToast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// FontAwesome options (store as string, render later)
const iconOptions = [
  { label: "Leaf", value: "faLeaf" },
  { label: "Hand Holding USD", value: "faHandHoldingUsd" },
  { label: "Credit Card", value: "faCreditCard" },
  { label: "Seedling", value: "faSeedling" },
  { label: "Shield", value: "faShieldAlt" },
  { label: "Tractor", value: "faTractor" },
  { label: "Water", value: "faWater" },
  { label: "Chart Line", value: "faChartLine" },
  { label: "Cloud Sun", value: "faCloudSun" },
  { label: "Landmark", value: "faLandmark" },
  { label: "Store", value: "faStore" },
  { label: "Shopping Cart", value: "faShoppingCart" },
];

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  details: z
    .array(z.string().min(1, "Detail cannot be empty"))
    .min(1, "At least one detail is required"),
  icon: z.string().optional(),
  linkApply: z.string().url("Enter a valid apply link"),
  linkYoutube: z.string().url("Enter a valid video link"),
});

const AddSchema = () => {
  const [schemaList, setSchemaList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      details: [""],
      icon: "",
      linkApply: "",
      linkYoutube: "",
    },
  });

  // Fetch all schemes
  const fetchSchemes = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/schemes/all`);
      const data = await res.json();
      setSchemaList(data.schemes || []);
    } catch (error) {
      showToast("error", "Failed to fetch schemes");
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [refreshData]);

  // Add scheme
  async function onSubmit(values) {
    try {
      const response = await fetch(`${API_BASE_URL}/schemes/add-schema`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message || "Add failed");
      }

      showToast("success", "Scheme added successfully");
      form.reset();
      setRefreshData(!refreshData);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  // Delete scheme
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/schemes/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        return showToast("error", data.message || "Delete failed");
      }

      setRefreshData(!refreshData);
      showToast("success", "Scheme deleted");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  // Dynamic details fields
  const details = form.watch("details");
  const addDetailField = () => form.setValue("details", [...details, ""]);
  const removeDetailField = (idx) => {
    const newDetails = details.filter((_, i) => i !== idx);
    form.setValue("details", newDetails.length ? newDetails : [""]);
  };

  return (
    <div>
      {/* add section */}
      <div className={styles.container}>
        <h1 className={styles.title}>Add Government Scheme</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className={styles.formGroup}>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      className={styles.input}
                      placeholder="Enter scheme title"
                      {...field}
                    />
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
                <FormItem className={styles.formGroup}>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      className={styles.textarea}
                      placeholder="Enter scheme description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {/* link Google */}
              <FormField
                control={form.control}
                name="linkApply"
                render={({ field }) => (
                  <FormItem className={styles.formGroup}>
                    <FormLabel>Apply Link</FormLabel>
                    <FormControl>
                      <Input
                        className={styles.input}
                        placeholder="Enter Google link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              {/* link youtube */}
              <FormField
                control={form.control}
                name="linkYoutube"
                render={({ field }) => (
                  <FormItem className={styles.formGroup}>
                    <FormLabel>Video Link</FormLabel>
                    <FormControl>
                      <Input
                        className={styles.input}
                        placeholder="Enter Youtube link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Details */}
            <div className={styles.formGroup}>
              <FormLabel>Details</FormLabel>
              {details.map((detail, idx) => (
                <div key={idx} className={styles.detailsRow}>
                  <FormField
                    control={form.control}
                    name={`details.${idx}`}
                    render={({ field }) => (
                      <FormItem style={{ width: "100%" }}>
                        <FormControl>
                          <Input
                            className={styles.input}
                            placeholder={`Detail ${idx + 1}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {details.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDetailField(idx)}
                      className={styles.removeBtn}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addDetailField}
                className={styles.addDetailBtn}
              >
                + Add Detail
              </button>
            </div>

            {/* Icon */}
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem className={styles.formGroup}>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <select {...field} className={styles.input}>
                      <option value="">Select Icon</option>
                      {iconOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className={styles.submitBtn}>
              Add Scheme
            </Button>
          </form>
        </Form>
      </div>
      {/* table section */}
      <div className={styles.tableContainer}>
        <div className="mt-10 w-full max-w-6xl">
          <h1 className={styles.titleAll}>All Schemes</h1>
          <Table>
            <TableHeader>
              <TableRow className={styles.tableHeaderRow}>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={styles.tableBody}>
              {schemaList.map((s, i) => (
                <TableRow key={i}>
                  <TableCell>{s.title}</TableCell>

                  <TableCell>
                    {moment(s?.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell className="flex gap-3">
                    <Button
                      onClick={() => handleDelete(s._id)}
                      variant="outline"
                      className="w-full hover:bg-rose-500 hover:text-white"
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
export default AddSchema;
