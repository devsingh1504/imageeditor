import React, { useState } from 'react';
import { Upload, Plus, Download } from 'lucide-react';
import { TextLayer, EditorState, User, Plan } from './types';
import { Canvas } from './components/Canvas';
import { TextControls } from './components/TextControls';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { PricingModal } from './components/PricingModal';
import { PaymentSuccess } from './components/PaymentSuccess';
import { processPayment } from './services/payment';
import { AuthService } from './services/auth';

export function App() {
  // State management
  const [state, setState] = useState<EditorState>({
    image: null,
    textLayers: [],
    selectedLayerId: null,
  });

  const [user, setUser] = useState<User | null>(null);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login',
  });
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<{
    show: boolean;
    transactionId?: string;
    stars?: number;
  }>({ show: false });

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setState((prev) => ({
          ...prev,
          image: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Text layer management
  const addNewTextLayer = () => {
    if (!user || user.editsRemaining <= 0) {
      setIsPricingOpen(true);
      return;
    }

    const newLayer: TextLayer = {
      id: crypto.randomUUID(),
      text: 'TEXT',
      x: 100,
      y: 100,
      fontSize: 120,
      fontFamily: 'Arial',
      color: '#ffffff',
      opacity: 1,
      rotation: 0,
      fontWeight: 700,
    };

    setUser((prev) => prev ? {
      ...prev,
      editsRemaining: prev.editsRemaining - 1
    } : null);

    setState((prev) => ({
      ...prev,
      textLayers: [...prev.textLayers, newLayer],
      selectedLayerId: newLayer.id,
    }));
  };

  // Layer update handler
  const updateTextLayer = (updates: Partial<TextLayer>) => {
    setState((prev) => ({
      ...prev,
      textLayers: prev.textLayers.map((layer) =>
        layer.id === prev.selectedLayerId ? { ...layer, ...updates } : layer
      ),
    }));
  };

  // Position change handler
  const handlePositionChange = (x: number, y: number) => {
    updateTextLayer({ x, y });
  };

  // Authentication handlers
  const handleAuth = (email: string, password: string) => {
    // Mock authentication
    setUser({
      id: '1',
      email,
      stars: 0,
      editsRemaining: 5,
    });
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  // Star purchase handler
  const handlePurchase = async (plan: Plan) => {
    try {
      const auth = AuthService.getInstance();
      auth.requireAuth();

      const result = await processPayment(plan, user?.id || '');
      
      if (result.success) {
        setUser((prev) => prev ? {
          ...prev,
          stars: prev.stars + plan.stars,
          editsRemaining: prev.editsRemaining + plan.stars,
        } : null);
        
        setPaymentSuccess({
          show: true,
          transactionId: result.transactionId,
          stars: plan.stars
        });
      }
      
      setIsPricingOpen(false);
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle payment failure
    }
  };

  // Download handler
  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'image-with-text.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar
        user={user}
        onLogin={() => setAuthModal({ isOpen: true, mode: 'login' })}
        onSignup={() => setAuthModal({ isOpen: true, mode: 'signup' })}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      <main className="flex-1 container mx-auto p-4 flex gap-4">
        <div className="flex-1">
          {!state.image ? (
            <label className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-800">
              <Upload className="w-12 h-12 mb-2" />
              <span>Upload Image</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <div className="space-y-4">
              <Canvas
                image={state.image}
                textLayers={state.textLayers}
                selectedLayerId={state.selectedLayerId}
                onLayerClick={(id) =>
                  setState((prev) => ({ ...prev, selectedLayerId: id }))
                }
                onPositionChange={handlePositionChange}
              />
              <button
                onClick={handleDownload}
                className="w-full px-4 py-2 bg-green-600 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                Download Image
              </button>
            </div>
          )}
        </div>

        <div className="w-80">
          <button
            onClick={addNewTextLayer}
            className="w-full mb-4 px-4 py-2 bg-blue-600 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Text Layer
          </button>

          {state.selectedLayerId && (
            <TextControls
              layer={state.textLayers.find(
                (layer) => layer.id === state.selectedLayerId
              )!}
              onUpdate={updateTextLayer}
            />
          )}
        </div>
      </main>

      <Footer />

      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        onSubmit={handleAuth}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onPurchase={handlePurchase}
      />

      {paymentSuccess.show && (
        <PaymentSuccess
          transactionId={paymentSuccess.transactionId!}
          stars={paymentSuccess.stars!}
          onClose={() => setPaymentSuccess({ show: false })}
        />
      )}
    </div>
  );
}

export default App;