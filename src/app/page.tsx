'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  return (
    <div className="mainContainer">
      <Button onClick={() => router.push("/game")}>Start game</Button>
      <Button>Settings</Button>
    </div>
  )
}
