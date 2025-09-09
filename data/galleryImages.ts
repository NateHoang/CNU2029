import { title } from "process";

export interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
  link?: string;
  quarter: string;
}

export const galleryImages2025_2026: GalleryImage[] = [
  {
    id: 1,
    title: "First Exam Distressor",
    imageUrl: "/gallery_photos/d1/fall/NatesHouse.png",
    quarter: "Fall",
  },
  {
    id: 2,
    title: "Whiteman's Annual BBQ",
    imageUrl: "/gallery_photos/d1/fall/WhitemansBBQ.png",
    link: "https://photos.app.goo.gl/M7i1heYFUyd889ku8",
    quarter: "Fall",
  }
];