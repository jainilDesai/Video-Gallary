import { apiClient } from "@/lib/api-client";

export default async function Home() {
  // ...existing code...
  try {
    await apiClient.getVideos();
  } catch {
    // error handling
  }
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
        AI Video Gallery
      </h1>
      <VideoGallery />
    </main>
  );
}
import VideoGallery from "./components/VideoGallery";
