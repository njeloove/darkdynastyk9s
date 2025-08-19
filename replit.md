# DarkDynastyK9s Puppy Website

## Overview

This is a complete full-stack web application for DarkDynastyK9s, a professional puppy breeder specializing in American Pit Bull Terriers. The application features a responsive puppy showcase with organized listings, detailed puppy information with image carousels, social media integration, and a comprehensive admin panel for managing puppy listings. Built with React/TypeScript frontend, Express.js backend, and designed for professional puppy breeding business operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI design
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing with admin and home pages
- **UI Components**: Comprehensive shadcn/ui component system with Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation integration for admin forms

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API with CRUD operations for puppy management
- **Data Storage**: In-memory storage with interface for future database integration
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot reload with Vite integration for full-stack development

### Data Storage
- **Current Implementation**: In-memory storage with organized puppy data
- **Schema**: Drizzle ORM with PostgreSQL schema definitions ready for database integration
- **Database Ready**: Drizzle configuration set up for Neon PostgreSQL database
- **Data Models**: Complete puppy entities with all attributes (name, breed, age, price, images, health status, etc.)

### Key Features Implemented
- **Puppy Organization**: Specific grouping as requested - first 4 images as 2 individual puppies (twins), next 6 images as 1 puppy, last 4 images as 1 puppy
- **Social Media Integration**: TikTok, Telegram, and Signal contact buttons with proper branding
- **Admin Panel**: Complete CRUD operations for puppy management with image upload support
- **Image Management**: Multi-image carousel with support for both local and web-hosted images
- **Professional Design**: Dog breeding business aesthetic with warm color palette

### UI/UX Design Decisions
- **Design System**: Professional pet business aesthetic with warm color palette
- **Image Handling**: Multi-image carousel with automatic rotation for puppy photos
- **Responsive Design**: Mobile-first approach with grid layouts
- **Interactive Elements**: Modal dialogs for detailed puppy information
- **Loading States**: Skeleton loaders for better user experience
- **Admin Interface**: User-friendly forms with image upload guidance

### Development Workflow
- **Monorepo Structure**: Client, server, and shared code in organized directories
- **TypeScript**: End-to-end type safety across frontend and backend
- **Build Process**: Vite for frontend bundling, ESBuild for server compilation
- **Development Server**: Integrated development with hot reload and error overlay

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless database client
- **drizzle-orm**: Modern TypeScript ORM with PostgreSQL support
- **drizzle-kit**: Database migrations and schema management

### Frontend UI Libraries
- **@radix-ui/***: Comprehensive accessible component primitives
- **@tanstack/react-query**: Server state management and data fetching
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant styling
- **lucide-react**: Icon library for consistent iconography

### Development Tools
- **vite**: Frontend build tool and development server
- **tsx**: TypeScript execution for Node.js development
- **wouter**: Lightweight React routing library
- **@replit/vite-plugin-***: Replit-specific development enhancements

### Form and Validation
- **react-hook-form**: Performant form library
- **@hookform/resolvers**: Form validation resolvers
- **zod**: TypeScript-first schema validation

The application is structured as a modern full-stack TypeScript application with a focus on type safety, developer experience, and professional presentation for a dog breeding business.