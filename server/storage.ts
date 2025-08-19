import { type Puppy, type InsertPuppy } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  getAllPuppies(): Promise<Puppy[]>;
  getPuppy(id: string): Promise<Puppy | undefined>;
  createPuppy(puppy: InsertPuppy): Promise<Puppy>;
}

export class MemStorage implements IStorage {
  private users: Map<string, any>;
  private puppies: Map<string, Puppy>;

  constructor() {
    this.users = new Map();
    this.puppies = new Map();
    this.initializePuppies();
  }

  private initializePuppies() {
    // Initialize with the 4 puppies as specified by user requirements
    const puppyData: InsertPuppy[] = [
      {
        name: "Thunder",
        breed: "American Pit Bull Terrier",
        age: "8 weeks old",
        weight: "12 lbs",
        gender: "Male",
        price: 3200,
        color: "Gray with White",
        description: "Beautiful gray pitbull puppy with excellent temperament. Fully vaccinated and health guaranteed.",
        images: [
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.42.40_7378bbb8_1755596585832.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.44.51_be685c89_1755596711580.jpg"
        ],
        isAvailable: true,
        healthStatus: "100% Healthy",
        isVaccinated: true,
        isInsured: true,
        freeDelivery: true,
      },
      {
        name: "Storm",
        breed: "American Pit Bull Terrier",
        age: "8 weeks old",
        weight: "11 lbs",
        gender: "Female",
        price: 3000,
        color: "Brown and White",
        description: "Sweet female puppy with beautiful markings. Great with children and other pets.",
        images: [
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.44.56_baf1be46_1755596718671.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.45.01_9951a6ab_1755596714454.jpg"
        ],
        isAvailable: true,
        healthStatus: "100% Healthy",
        isVaccinated: true,
        isInsured: true,
        freeDelivery: true,
      },
      {
        name: "Blaze",
        breed: "American Pit Bull Terrier",
        age: "9 weeks old",
        weight: "13 lbs",
        gender: "Male",
        price: 3500,
        color: "Brown and White",
        description: "Energetic male puppy with exceptional bloodlines. Perfect for active families.",
        images: [
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.44.51_be685c89_1755596711580.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.44.56_baf1be46_1755596718671.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.45.01_9951a6ab_1755596714454.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.45.05_f36728b0_1755596721270.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.42.40_7378bbb8_1755596585832.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.44.51_be685c89_1755596711580.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.44.56_baf1be46_1755596718671.jpg"
        ],
        isAvailable: true,
        healthStatus: "100% Healthy",
        isVaccinated: true,
        isInsured: true,
        freeDelivery: true,
      },
      {
        name: "Scout",
        breed: "American Pit Bull Terrier",
        age: "7 weeks old",
        weight: "10 lbs",
        gender: "Female",
        price: 2800,
        color: "Brown and White",
        description: "Gentle female puppy with calm temperament. Perfect for families with young children.",
        images: [
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.45.05_f36728b0_1755596721270.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.42.40_7378bbb8_1755596585832.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.44.51_be685c89_1755596711580.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.44.56_baf1be46_1755596718671.jpg"
        ],
        isAvailable: true,
        healthStatus: "100% Healthy",
        isVaccinated: true,
        isInsured: true,
        freeDelivery: true,
      }
    ];

    puppyData.forEach(puppy => {
      const id = randomUUID();
      const fullPuppy: Puppy = { ...puppy, id };
      this.puppies.set(id, fullPuppy);
    });
  }

  async getUser(id: string): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = randomUUID();
    const user: any = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllPuppies(): Promise<Puppy[]> {
    return Array.from(this.puppies.values());
  }

  async getPuppy(id: string): Promise<Puppy | undefined> {
    return this.puppies.get(id);
  }

  async createPuppy(insertPuppy: InsertPuppy): Promise<Puppy> {
    const id = randomUUID();
    const puppy: Puppy = { ...insertPuppy, id };
    this.puppies.set(id, puppy);
    return puppy;
  }
}

export const storage = new MemStorage();
