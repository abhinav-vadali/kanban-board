# Kanban Board

A modern, real-time Kanban board application built with Next.js, GraphQL, and Nhost.

## Features

- Create and manage multiple columns
- Add, edit, and delete cards
- Assign cards to team members
- Real-time updates using GraphQL subscriptions
- Clean, responsive UI with Tailwind CSS
- Built with Next.js 16 and Turbopack

## Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Backend:** Nhost (PostgreSQL + GraphQL)
- **State Management:** Apollo Client
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Package Manager:** pnpm

## Prerequisites

- Node.js 20 or higher
- pnpm 10 or higher
- Nhost account and project

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <https://github.com/abhinav-vadali/kanban-board.git>
   cd kanban-board
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_NHOST_SUBDOMAIN=your-subdomain
   NEXT_PUBLIC_NHOST_REGION=your-region
   ```

4. **Generate GraphQL types**
   ```bash
   pnpm graphql-codegen
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm graphql-codegen` - Generate GraphQL types from schema

## Project Structure

```
kanban-board/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── graphql/          # GraphQL queries and mutations
│   └── lib/              # Utility functions and configurations
├── public/               # Static assets
└── ...config files
```

## Database Schema

The application uses the following main tables:

- **boards** - Kanban boards that represent different workflows
- **columns** - Kanban columns (To Do, In Progress, Done, etc.)
- **cards** - Individual task cards
- **users** - Team members who can be assigned to cards

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Backend powered by [Nhost](https://nhost.io/)
- Icons and UI components from [Tailwind CSS](https://tailwindcss.com/)
