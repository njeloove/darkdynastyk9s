import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPuppySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all puppies
  app.get("/api/puppies", async (req, res) => {
    try {
      const puppies = await storage.getAllPuppies();
      res.json(puppies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch puppies" });
    }
  });

  // Get single puppy
  app.get("/api/puppies/:id", async (req, res) => {
    try {
      const puppy = await storage.getPuppy(req.params.id);
      if (!puppy) {
        return res.status(404).json({ message: "Puppy not found" });
      }
      res.json(puppy);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch puppy" });
    }
  });

  // Create new puppy
  app.post("/api/puppies", async (req, res) => {
    try {
      const validatedData = insertPuppySchema.parse(req.body);
      const puppy = await storage.createPuppy(validatedData);
      res.status(201).json(puppy);
    } catch (error) {
      console.error("Create puppy error:", error);
      res.status(400).json({ message: "Failed to create puppy" });
    }
  });

  // Update puppy
  app.patch("/api/puppies/:id", async (req, res) => {
    try {
      const puppy = await storage.updatePuppy(req.params.id, req.body);
      res.json(puppy);
    } catch (error) {
      console.error("Update puppy error:", error);
      if (error instanceof Error && error.message === "Puppy not found") {
        return res.status(404).json({ message: "Puppy not found" });
      }
      res.status(500).json({ message: "Failed to update puppy" });
    }
  });

  // Delete puppy
  app.delete("/api/puppies/:id", async (req, res) => {
    try {
      await storage.deletePuppy(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Delete puppy error:", error);
      if (error instanceof Error && error.message === "Puppy not found") {
        return res.status(404).json({ message: "Puppy not found" });
      }
      res.status(500).json({ message: "Failed to delete puppy" });
    }
  });

  // Submit inquiry (placeholder for contact form)
  app.post("/api/inquiries", async (req, res) => {
    try {
      // In a real application, this would save to database and send email
      const inquiry = req.body;
      console.log("New inquiry received:", inquiry);
      res.json({ message: "Inquiry submitted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit inquiry" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
