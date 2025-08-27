"use client";
import { useState } from "react";
import FileUpload from "../components/FileUpload";
import { apiClient } from "@/lib/api-client";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  // Called after video is uploaded to ImageKit
  type ImageKitUploadResponse = {
    url: string;
    thumbnailUrl?: string;
    [key: string]: unknown;
  };
  const handleVideoUpload = (res: unknown) => {
    const data = res as ImageKitUploadResponse;
    setVideoUrl(data.url);
    setThumbnailUrl(data.thumbnailUrl || data.url || "");
    setProgress(100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setError("");
    setSuccess("");
    try {
      if (!title || !description || !videoUrl) {
        setError("All fields are required and video must be uploaded.");
        setUploading(false);
        return;
      }
      await apiClient.createVideo({
        title,
        description,
        videoUrl,
        thumbnailUrl: thumbnailUrl || videoUrl, // fallback if no thumbnail
      });
      setSuccess("Video uploaded and saved!");
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to save video");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a001a",
      }}
    >
      <div
        style={{
          width: 400,
          background: "#181028",
          borderRadius: 18,
          boxShadow: "0 4px 24px #0006",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#a259ff",
            fontWeight: 700,
            fontSize: 28,
            marginBottom: 18,
          }}
        >
          Upload a Video
        </h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="title" style={{ color: "#fff", fontWeight: 500 }}>
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: 4,
                marginBottom: 8,
                padding: 8,
                borderRadius: 8,
                border: "1px solid #a259ff",
                background: "#12082b",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="description"
              style={{ color: "#fff", fontWeight: 500 }}
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: 4,
                marginBottom: 8,
                padding: 8,
                borderRadius: 8,
                border: "1px solid #a259ff",
                background: "#12082b",
                color: "#fff",
                minHeight: 60,
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="video-upload"
              style={{ color: "#fff", fontWeight: 500 }}
            >
              Video File
            </label>
            <div id="video-upload" style={{ marginTop: 4 }}>
              <FileUpload
                fileType="video"
                onSuccess={handleVideoUpload}
                onProgress={(p) => {
                  if (progress === 0 && p > 0) setProgress(1); // show bar immediately
                  setProgress(p);
                }}
              />
              {progress > 0 && progress < 100 && (
                <div
                  style={{
                    width: "100%",
                    height: 8,
                    background: "#2d174d",
                    borderRadius: 4,
                    marginTop: 8,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      background: "#a259ff",
                      borderRadius: 4,
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              )}
              {videoUrl && progress === 100 && !uploading && (
                <p style={{ color: "#4fff8f", marginTop: 4 }}>
                  Video uploaded!
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={uploading || !videoUrl}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              background: uploading ? "#a259ff88" : "#a259ff",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              border: "none",
              marginTop: 8,
              cursor: uploading || !videoUrl ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {uploading ? "Saving..." : "Save Video"}
          </button>
          {error && <p style={{ color: "#ff4f4f", marginTop: 8 }}>{error}</p>}
          {success && (
            <p style={{ color: "#4fff8f", marginTop: 8 }}>{success}</p>
          )}
        </form>
      </div>
    </div>
  );
}
