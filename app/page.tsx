import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import Image from "next/image";

export default async function Home() {
  let videos: IVideo[] = [];
  let error: unknown = null;
  try {
    videos = (await apiClient.getVideos()) as IVideo[];
    // Debug log: print videos array
    // eslint-disable-next-line no-console
    console.log("Fetched videos:", videos);
  } catch (err) {
    error = err;
    // eslint-disable-next-line no-console
    console.error("Error fetching videos:", err);
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
