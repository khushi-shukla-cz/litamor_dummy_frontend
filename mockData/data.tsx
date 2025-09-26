import { Capsule } from "../types/type";

export const MOCK_CAPSULES: Capsule[] = [
  {
    id: "1",
    title: "Our First Trip Together",
    image: "https://placehold.co/400x400/C8A2C8/fff?text=Trip",
    status: "Shared with Alex",
    isPrivate: false,
    date: "In 2 Days",
    tags: ["Nostalgic", "Grateful"],
  },
  {
    id: "2",
    title: "Our First Trip Together",
    image: "https://placehold.co/400x400/87CEEB/fff?text=Trip",
    status: "Private",
    isPrivate: true,
    date: "In 2 Days",
    tags: ["Nostalgic"],
  },
  {
    id: "3",
    title: "My Birthday Party",
    image: "https://placehold.co/400x400/F08080/fff?text=Party",
    status: "Shared with Jane",
    isPrivate: false,
    date: "Locked",
    tags: ["Happy", "Memorable"],
  },
  {
    id: "4",
    title: "Graduation Day",
    image: "https://placehold.co/400x400/90EE90/fff?text=Graduation",
    status: "Private",
    isPrivate: true,
    date: "Unlocked",
    tags: ["Proud", "Excited"],
  },
];
