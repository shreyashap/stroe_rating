# 🌟 Store Rating Platform

A full-stack web application for rating stores.  
Built with **React + Tailwind CSS (frontend)** and **Express + Prisma + PostgreSQL (backend)**.  

---

## ⚙️ Setup Instructions

### 1 Clone Repo

```bash
git clone https://github.com/shreyashap/stroe_rating.git
cd stroe_rating
```

### 2 Backend Setup

```bash
cd backend
npm install
```
### 3 Configure .env
Create a .env file inside backend:
```bash
DATABASE_URL="postgresql://<username>:<password>@<neon_host>/<dbname>?sslmode=require"
JWT_SECRET="supersecret"
PORT=5000
```
### 4 Push Prisma Schema
```bash
npx prisma db push
```

### 5 Seed Sample Data
```bash
npm run prisma:seed
```

Seed creates:

Admin → admin@example.com / Password@123

Store Owner → owner@example.com / Password@123

Normal Users → nina@example.com, bob@example.com / Password@123

Store: Oscar's Cafe with ratings

### 6 Start Backend
```bash
npm run dev
```

### 7 Frontend Setup
```bash
cd ../frontend
npm install
```
### 8 Start Frontend
```bash
npm run dev
```
