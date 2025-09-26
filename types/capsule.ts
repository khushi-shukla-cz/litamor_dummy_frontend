import { ImagePickerAsset } from "expo-image-picker";

export interface CreateCapsuleState {
  step: number;
  memoryName: string;
  captureMethod:
    | "Text note"
    | "Voice note"
    | "Photo / Video"
    | "Mixed (combination)"
    | null;
  emotions: string;
  mediaFiles: Array<{ id: number; caption: string; uri?: string }>;
  unlockDate: Date | null;
  unlockTime: { hour: string; minute: string; period: "AM" | "PM" };
  futureMessage: string;
  visibility: "Public" | "Private" | "Partner Only";
  isSurprise: boolean;

  // This will hold the array of images/videos selected from the media library.
  attachedMedia?: ImagePickerAsset[];
  // This will store the URI of the recorded audio file.
  audioRecordingUri?: string | null;
}

export interface StepProps {
  state: CreateCapsuleState;
  setState: React.Dispatch<React.SetStateAction<CreateCapsuleState>>;
  onNext: () => void;
  onBack: () => void;
}
