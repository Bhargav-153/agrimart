import express from "express";
import {
  addSchema,
  deleteSchema,
  getAllSchemas,
  showSchema,
  updateSchema,
} from "../controllers/SchemaDetails.controller.js";

const SchemaRoute = express.Router();

// Create a new scheme
SchemaRoute.post("/add-schema", addSchema);

// Get all schemes
SchemaRoute.get("/all", getAllSchemas);

// Get a single scheme by ID
SchemaRoute.get("/show/:schemeid", showSchema);

// Update a scheme by ID
SchemaRoute.put("/update/:schemeid", updateSchema);

// Delete a scheme by ID
SchemaRoute.delete("/delete/:schemeid", deleteSchema);

export default SchemaRoute;
