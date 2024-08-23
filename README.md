

# Project Setup

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### 1. Clone the Repository

```bash
git clone [repository-url]
cd [repository-directory]
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```env
NEXTAUTH_SECRET="your-nextauth-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
NEXTAUTH_URL=http://localhost:3000
DIRECT_URL="your-database-url" # Get this URL from your Prisma Accelerate console
DATABASE_URL="your-prisma-accelerate-database-url" # Replace this with the URL from Prisma Accelerate
```

Replace the placeholders with your actual credentials and URLs. To get the `DATABASE_URL` from Prisma Accelerate, log in to your Prisma Accelerate console and follow the instructions to obtain the URL for your database.

### 3. Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 4. Start the Development Server

Run the development server with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

Check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

### Notes:
- **Environment Variables**: Ensure your `.env.local` file is not committed to version control for security reasons. Use `.gitignore` to exclude it.
- **Database URL**: You need to get the database URL from your Prisma Accelerate console and set it in your `.env.local` file.

