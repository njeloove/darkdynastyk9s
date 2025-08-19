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
    // Initialize with the 3 puppies as specified by user requirements
    const puppyData: InsertPuppy[] = [
      {
        name: "Thunder & Storm Twins",
        breed: "American Pit Bull Terrier",
        age: "8 weeks old",
        weight: "10-12 lbs",
        gender: "Male & Female",
        price: 3000,
        color: "Brindle and Black with White",
        description: "Beautiful twin puppies with excellent temperament. Fully vaccinated and health guaranteed. Two adorable puppies available - each puppy is priced individually.",
        images: [
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.36.29_a97b3215_1755596301642.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.40.37_6e57a7e1_1755596454818.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.40.44_bad6bad0_1755596456728.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.40.51_77057677_1755596460289.jpg"
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
        color: "Blue/Gray with White",
        description: "Energetic male puppy with exceptional bloodlines. Perfect for active families. This handsome boy has amazing coloring and temperament.",
        images: [
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.41.55_6b139999_1755596569113.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.42.13_26aa9a3d_1755596574424.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.42.18_68c77f53_1755596576549.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.42.18_be5e52b7_1755596581297.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.42.25_21cc9215_1755596583565.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.42.40_7378bbb8_1755596585832.jpg"
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
        description: "Gentle female puppy with calm temperament. Perfect for families with young children. Beautiful markings and sweet personality.",
        images: [
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.44.51_be685c89_1755596711580.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.44.56_baf1be46_1755596718671.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.45.01_9951a6ab_1755596714454.jpg",
          "/attached_assets/WhatsApp Image 2025-08-19 at 10.45.05_f36728b0_1755596721270.jpg"
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
      const fullPuppy: Puppy = { 
        ...puppy, 
        id,
        description: puppy.description || null
      };
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
    const puppy: Puppy = { 
      ...insertPuppy, 
      id,
      description: insertPuppy.description || null
    };
    this.puppies.set(id, puppy);
    return puppy;
  }
}

export const storage = new MemStorage();
