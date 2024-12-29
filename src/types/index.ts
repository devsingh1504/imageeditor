// Types for the application
export interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  opacity: number;
  rotation: number;
  fontWeight: number | string;
}

export interface EditorState {
  image: string | null;
  textLayers: TextLayer[];
  selectedLayerId: string | null;
}

export interface User {
  id: string;
  email: string;
  stars: number;
  editsRemaining: number;
}

// Plans for star purchases
export interface Plan {
  id: string;
  name: string;
  stars: number;
  price: number;
}