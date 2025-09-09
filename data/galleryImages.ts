import { title } from "process";

export interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  quarter: string;
}

export const galleryImages2025_2026: GalleryImage[] = [
  {
    id: 1,
    title: "Nate's Party",
    imageUrl: "/gallery_photos/d1/fall/NatesHouse.png",
    link: "https://drive.google.com/drive/u/0/folders/1PISrYBWEr5MicQHQerNeuCLCrD2okz4M",
    quarter: "Fall",
  },
];