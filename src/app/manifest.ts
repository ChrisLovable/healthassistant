import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MyMedic — Health Navigation for South Africa",
    short_name: "MyMedic",
    description: "Multilingual health information and AI chatbot for South Africa.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F7F4EE",
    theme_color: "#F7F4EE",
    icons: [
      {
        src: "/192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
