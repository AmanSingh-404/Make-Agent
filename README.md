# Make Agent - AI Agent Builder

**Empower Ideas with Intelligent Agents. No Code.**

Make Agent is a powerful, no-code platform designed to let you build, configure, and deploy intelligent AI agents effortlessly. From advanced chatbots to task automators, design agents that understand, think, and take action—all through an intuitive visual interface.

![AI Agent Builder Banner](/public/logo.svg)

## 🚀 Key Features

*   **Visual Flow Builder**: Drag-and-drop interface to design complex agent workflows (Start, End, Conditionals, AI Nodes, API calls).
*   **No-Code Configuration**: Easily configure tools, prompts, and logic without writing a single line of code.
*   **AI Integration**: Seamlessly integrates with OpenAI and other LLM providers to power your agents.
*   **Real-time Preview**: Test your agent's behavior instantly in a built-in chat sandbox.
*   **Custom Tools**: functionality to add custom API integrations for your agents.
*   **Modern UI/UX**: Built with a premium, clean design using Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
*   **Backend & Database**: [Convex](https://convex.dev/)
*   **Authentication**: [Clerk](https://clerk.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Components**: [Shadcn UI](https://ui.shadcn.com/)
*   **Visual Flow**: [XYFlow (React Flow)](https://reactflow.dev/)
*   **Icons**: Lucide React
*   **Animations**: Framer Motion

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js 18+ installed
*   npm or yarn installed

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd ai_agent_builder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env.local` file in the root directory and add the following keys:
    ```env
    # Convex
    CONVEX_DEPLOYMENT=...
    NEXT_PUBLIC_CONVEX_URL=...

    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
    CLERK_SECRET_KEY=...

    # OpenAI (for AI Agents)
    OPENAI_API_KEY=...
    ```

4.  **Run Development Server:**
    Start the Next.js app and Convex backend concurrently:
    ```bash
    npm run dev
    # In a separate terminal, run Convex
    npx convex dev
    ```

5.  **Open the App:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```bash
├── app
│   ├── agent-builder     # Main visual builder logic
│   ├── api               # Next.js API routes
│   ├── dashboard         # User dashboard
│   ├── globals.css       # Global styles
│   └── page.tsx          # Landing page
├── components            # Reusable UI components
├── convex                # Backend functions and schema
├── public                # Static assets
└── ...
```

## 🚀 Deployment

The project is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the environment variables (`NEXT_PUBLIC_CONVEX_URL`, `OPENAI_API_KEY`, etc.) in Vercel settings.
4.  Run `npx convex deploy` to deploy your backend functions.
5.  Click **Deploy**.

For a detailed guide, check `deployment_guide.md` in the project root.

## 🤝 Contributing

Contributions are welcome! Please feel free to wait for future updates or submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
