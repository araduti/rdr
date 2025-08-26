import { LandingPage } from "@/components/landing-page";
import { HydrateClient } from "@/trpc/server";

export default function Home() {
  return (
    <HydrateClient>
      <LandingPage />
    </HydrateClient>
  );
}
