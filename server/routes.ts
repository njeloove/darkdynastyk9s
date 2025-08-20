import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPuppySchema, insertVisitorSchema } from "@shared/schema";

// Helper function to get visitor info
const getVisitorInfo = (req: Request) => {
  const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] as string || 'Unknown';
  const userAgent = req.get('User-Agent') || null;
  return { ip, userAgent };
};

// Helper function to get location from IP (simplified)
const getLocationFromIP = async (ip: string) => {
  try {
    // Using a free IP geolocation service
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    return {
      country: data.country || null,
      city: data.city || null
    };
  } catch (error) {
    return { country: null, city: null };
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Track visitor middleware
  app.use(async (req, res, next) => {
    try {
      const { ip, userAgent } = getVisitorInfo(req);
      const { country, city } = await getLocationFromIP(ip);
      
      await storage.createVisitor({
        ipAddress: ip,
        userAgent,
        country,
        city,
        pageVisited: req.path,
      });
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
    next();
  });

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

  // Get all visitors (admin only)
  app.get("/api/visitors", async (req, res) => {
    try {
      const visitors = await storage.getAllVisitors();
      res.json(visitors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch visitors" });
    }
  });

  // Delete visitor (admin only)
  app.delete("/api/visitors/:id", async (req, res) => {
    try {
      await storage.deleteVisitor(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Visitor not found") {
        return res.status(404).json({ message: "Visitor not found" });
      }
      res.status(500).json({ message: "Failed to delete visitor" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
