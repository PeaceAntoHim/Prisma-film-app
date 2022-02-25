## How create next app with prisma and mongo
    1. First you have to write "npm i -D prisma" to install all prisma dependencies.
    2. Second you have install reguler dependencies for prisma client you have wrote this in cli "npm i @prisma/client"
    3. Third you have to initialize you project with write "npx prisma init"

## Step working with prisma, next and mongodb
    1. First you have to create schema collection database in your schema.prisma and you have create mode your_example_table to create database.
    2. For mongodb you have to write this " id String @id @default(dbgenerated()) @map("_id") @db.ObjectId" to generate id automaticly
    3. After made schema model you have to write this in cli "npx prisma dev --preview-feature" but this commnd just for relational database if you use mongo you have write "npx prisma generate" to generate data

## Step Working with prisma, next and mysql
    1. First you have create schema table in mysql database so you than to migrate the data you have to write "npx prisma migrate dev"
    2 After that enter for new migration is "first_migrations"
    3 Than you can write "npx prisma studio" to get good visual representation

## Model data you can make use prisma

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

        model Category {
          id        Int      @id @default(autoincrement())
          name      String   @unique @db.VarChar(150)
          createdAt DateTime @default(now()) @map("created_at")
          updatedAt DateTime @updatedAt @map("updated_at")
          products Product[]
          @@map("categories")
        }

        model Tag {
          id        Int      @id @default(autoincrement())
          name      String   @unique @db.VarChar(150)
          createdAt DateTime @default(now()) @map("created_at")
          updatedAt DateTime @updatedAt @map("updated_at")
          productTags ProductTag[]
          @@map("tags")
        }

        enum Visibility {
          VISIBLE
          HIDDEN
          FEATURED
          DEAL
        }

        model Product {
          id          Int        @id @default(autoincrement())
          name        String     @unique @db.VarChar(200)
          slug        String     @unique @db.VarChar(200)
          reference   String     @unique @default(uuid()) @db.VarChar(50)
          description String?    @db.Text
          price       Float      @db.Float
          isAvailable Boolean    @default(true) @map("is_available") @db.TinyInt
          viewCount   Int        @default(0) @map("view_count") @db.Int
          visibility  Visibility @default(VISIBLE)
          pictures    Json
          extras      Json       @db.Json
          createdAt   DateTime   @default(now()) @map("created_at")
          updatedAt   DateTime   @updatedAt @map("updated_at")
          category    Category   @relation(fields: [categoryId], references: [id])
          categoryId  Int        @map("category_id")
          productTags ProductTag[]
          @@map("products")
        }

        model ProductTag {
          product   Product @relation(fields: [productId], references: [id])
          productId Int     @map("product_id")
          tag       Tag     @relation(fields: [tagId], references: [id])
          tagId     Int     @map("tag_id")
          @@id([productId, tagId])
          @@map("products_tags")
        }

        @default
        @map
        Native types, such as @db.ObjectId
        The following attributes are not supported:

        @unique
        @id
        @relation
        @ignore
        @updatedAt
        @createdAt


        ## How to CRUD use prisma 

            findMany
            findUnique
            create
            update
            upsert
            delete
            updateMany
            deleteMany



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
