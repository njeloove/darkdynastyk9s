import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, Upload, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ImageUploadHelp from "@/components/image-upload-help";
import type { Puppy, InsertPuppy } from "@shared/schema";

interface PuppyFormData {
  name: string;
  breed: string;
  age: string;
  weight: string;
  gender: string;
  price: string;
  color: string;
  description: string;
  images: string[];
}

export default function Admin() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPuppy, setEditingPuppy] = useState<Puppy | null>(null);
  const [formData, setFormData] = useState<PuppyFormData>({
    name: "",
    breed: "American Pit Bull Terrier",
    age: "",
    weight: "",
    gender: "",
    price: "",
    color: "",
    description: "",
    images: []
  });

  const { data: puppies, isLoading } = useQuery<Puppy[]>({
    queryKey: ["/api/puppies"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertPuppy) => {
      const response = await fetch("/api/puppies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create puppy");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/puppies"] });
      setIsModalOpen(false);
      resetForm();
      toast({ title: "Success", description: "Puppy added successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add puppy", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Puppy> }) => {
      const response = await fetch(`/api/puppies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update puppy");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/puppies"] });
      setIsModalOpen(false);
      resetForm();
      toast({ title: "Success", description: "Puppy updated successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update puppy", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/puppies/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete puppy");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/puppies"] });
      toast({ title: "Success", description: "Puppy deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete puppy", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      breed: "American Pit Bull Terrier",
      age: "",
      weight: "",
      gender: "",
      price: "",
      color: "",
      description: "",
      images: []
    });
    setEditingPuppy(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (puppy: Puppy) => {
    setEditingPuppy(puppy);
    setFormData({
      name: puppy.name,
      breed: puppy.breed,
      age: puppy.age,
      weight: puppy.weight,
      gender: puppy.gender,
      price: puppy.price.toString(),
      color: puppy.color,
      description: puppy.description || "",
      images: puppy.images
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const puppyData: InsertPuppy = {
      name: formData.name,
      breed: formData.breed,
      age: formData.age,
      weight: formData.weight,
      gender: formData.gender,
      price: parseInt(formData.price),
      color: formData.color,
      description: formData.description || null,
      images: formData.images,
      isAvailable: true,
      healthStatus: "100% Healthy",
      isVaccinated: true,
      isInsured: true,
      freeDelivery: true,
    };

    if (editingPuppy) {
      updateMutation.mutate({ id: editingPuppy.id, data: puppyData });
    } else {
      createMutation.mutate(puppyData);
    }
  };

  const handleImageAdd = () => {
    const imageUrl = prompt("Enter image URL or path (e.g., /attached_assets/image.jpg):");
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl]
      }));
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm p-8">
        <div className="container mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">DarkDynastyK9s Admin</h1>
          <Button onClick={openAddModal} className="bg-green-500 hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            Add New Puppy
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {puppies?.map((puppy) => (
            <Card key={puppy.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{puppy.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(puppy)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(puppy.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {puppy.images.length > 0 && (
                  <img
                    src={puppy.images[0]}
                    alt={puppy.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                )}
                <div className="space-y-1 text-sm">
                  <p><strong>Breed:</strong> {puppy.breed}</p>
                  <p><strong>Age:</strong> {puppy.age}</p>
                  <p><strong>Price:</strong> ${puppy.price.toLocaleString()}</p>
                  <p><strong>Images:</strong> {puppy.images.length}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPuppy ? "Edit Puppy" : "Add New Puppy"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    value={formData.breed}
                    onChange={(e) => setFormData(prev => ({...prev, breed: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({...prev, age: e.target.value}))}
                    placeholder="e.g., 8 weeks old"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight *</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({...prev, weight: e.target.value}))}
                    placeholder="e.g., 12 lbs"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData(prev => ({...prev, gender: e.target.value}))}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Male & Female">Male & Female</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                    placeholder="3000"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="color">Color *</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({...prev, color: e.target.value}))}
                  placeholder="e.g., Brindle and Black with White"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  rows={3}
                  placeholder="Beautiful puppy with excellent temperament..."
                />
              </div>

              {/* Images Section */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Images ({formData.images.length})</Label>
                  <Button type="button" onClick={handleImageAdd} variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <img src={image} alt={`Preview ${index + 1}`} className="w-12 h-12 object-cover rounded" />
                      <span className="flex-1 text-sm truncate">{image}</span>
                      <Button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        variant="destructive"
                        size="sm"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                {formData.images.length === 0 && (
                  <div className="text-sm text-gray-500 p-4 border-2 border-dashed rounded text-center">
                    No images added yet. Click "Add Image" to upload photos.
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingPuppy ? "Update Puppy" : "Add Puppy"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Help Section */}
        <ImageUploadHelp />
      </div>
    </div>
  );
}