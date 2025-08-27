"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import Image from "next/image";
import { Video as IKVideo } from "@imagekit/next";

export default function VideoGallery() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .getVideos()
      .then((data) => setVideos(data as IVideo[]))
      .catch(() => setError("Failed to load videos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      {videos.length === 0 && <p>No videos found.</p>}
      {videos.map((video) => (
        <div
          key={video._id ? video._id.toString() : video.videoUrl}
          style={{
            width: 300,
            border: "1px solid #eee",
            borderRadius: 18,
            padding: 12,
            background: "#18181b",
            color: "#fff",
            boxShadow: "0 2px 8px #0002",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            aspectRatio: "9/16",
            minHeight: 480,
            maxHeight: 540,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "9/16",
              marginBottom: 10,
              position: "relative",
              borderRadius: 14,
              overflow: "hidden",
              background: "#222",
              minHeight: 430,
              maxHeight: 480,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {video.thumbnailUrl && !video.thumbnailUrl.endsWith(".mp4") ? (
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                style={{ objectFit: "cover", borderRadius: 14 }}
              />
            ) : (
              <IKVideo
                urlEndpoint="https://ik.imagekit.io/jainil"
                src={"/" + video.videoUrl.split("/").slice(4).join("/")}
                controls
                width={270}
                height={480}
                style={{
                  borderRadius: 14,
                  background: "#222",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <h2
            style={{
              fontSize: 18,
              margin: "8px 0 0",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            {video.title}
          </h2>
        </div>
      ))}
    </div>
  );
}
