import React from "react";
import { TextLayer } from "../types";
import { Slider } from "./Slider";

interface TextControlsProps {
  layer: TextLayer;
  onUpdate: (updates: Partial<TextLayer>) => void;
}

// Extended font families list
const fontFamilies = [
  "Inter",
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
];

export function TextControls({ layer, onUpdate }: TextControlsProps) {
  return (
    <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Text
        </label>
        <input
          type="text"
          value={layer.text}
          onChange={(e) => onUpdate({ text: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
        />
      </div>

      <Slider
        label="X Position"
        value={layer.x}
        min={0}
        max={2000}
        onChange={(value) => onUpdate({ x: value })}
      />

      <Slider
        label="Y Position"
        value={layer.y}
        min={0}
        max={2000}
        onChange={(value) => onUpdate({ y: value })}
      />

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Font Family
        </label>
        <select
          value={layer.fontFamily}
          onChange={(e) => onUpdate({ fontFamily: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
        >
          {fontFamilies.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Color
        </label>
        <input
          type="color"
          value={layer.color}
          onChange={(e) => onUpdate({ color: e.target.value })}
          className="w-full h-10 rounded-md cursor-pointer"
        />
      </div>

      <Slider
        label="Font Size"
        value={layer.fontSize}
        min={8}
        max={400}
        onChange={(value) => onUpdate({ fontSize: value })}
      />

      <Slider
        label="Opacity"
        value={layer.opacity}
        min={0}
        max={1}
        step={0.01}
        onChange={(value) => onUpdate({ opacity: value })}
      />

      <Slider
        label="Rotation"
        value={layer.rotation}
        min={0}
        max={360}
        onChange={(value) => onUpdate({ rotation: value })}
      />

      <Slider
        label="Font Weight"
        value={Number(layer.fontWeight)}
        min={100}
        max={900}
        step={100}
        onChange={(value) => onUpdate({ fontWeight: value })}
      />
    </div>
  );
}
