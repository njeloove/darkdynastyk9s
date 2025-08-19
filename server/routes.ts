import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
