import React, { useRef, useEffect, useState } from 'react';
import { TextLayer } from '../types';

interface CanvasProps {
  image: string | null;
  textLayers: TextLayer[];
  selectedLayerId: string | null;
  onLayerClick: (id: string) => void;
  onPositionChange: (x: number, y: number) => void;
}

export function Canvas({ 
  image, 
  textLayers, 
  selectedLayerId, 
  onLayerClick,
  onPositionChange 
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Initialize canvas with image
  useEffect(() => {
    if (image && !imageRef.current) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        imageRef.current = img;
        renderCanvas();
      };
    }
  }, [image]);

  // Render function for canvas
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !imageRef.current) return;

    // Set canvas dimensions to match image
    canvas.width = imageRef.current.width;
    canvas.height = imageRef.current.height;

    // Draw background image
    ctx.drawImage(imageRef.current, 0, 0);

    // Draw text layers
    textLayers.forEach((layer) => {
      ctx.save();
      
      // Configure text properties
      ctx.font = `${layer.fontWeight} ${layer.fontSize}px ${layer.fontFamily}`;
      ctx.fillStyle = layer.color;
      ctx.globalAlpha = layer.opacity;
      
      // Apply transformations
      ctx.translate(layer.x, layer.y);
      ctx.rotate((layer.rotation * Math.PI) / 180);
      
      // Draw text
      ctx.fillText(layer.text, 0, 0);
      ctx.restore();
    });
  };

  // Update canvas when layers or selection changes
  useEffect(() => {
    renderCanvas();
  }, [textLayers, selectedLayerId]);

  // Mouse event handlers for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedLayerId) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked layer
    const clickedLayer = textLayers.findLast((layer) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;

      ctx.font = `${layer.fontWeight} ${layer.fontSize}px ${layer.fontFamily}`;
      const metrics = ctx.measureText(layer.text);
      
      return (
        x >= layer.x &&
        x <= layer.x + metrics.width &&
        y >= layer.y - layer.fontSize &&
        y <= layer.y
      );
    });

    if (clickedLayer) {
      setIsDragging(true);
      onLayerClick(clickedLayer.id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedLayerId) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    onPositionChange(x, y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="max-w-full h-auto border border-gray-700 rounded-lg cursor-move"
    />
  );
}