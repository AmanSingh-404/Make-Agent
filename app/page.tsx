import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <h1>AI Agent</h1>
    <p>Build your own AI Agent Simply by Drag And Drop</p>
    <Button>Get Started</Button>
    <UserButton />
   </div>
  );
}
