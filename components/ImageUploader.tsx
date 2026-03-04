
import React, { useRef, useState, useEffect } from 'react';
import Button from './Button';
import { Language } from '../types';
import { UI_STRINGS } from '../constants';

interface ImageUploaderProps {
  onImageReady: (base64: string) => void;
  currentImage?: string;
  lang: Language;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageReady, currentImage, lang }) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStreamReady, setIsStreamReady] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = UI_STRINGS[lang];

  useEffect(() => {
    if (activeStream && videoRef.current && isCameraActive) {
      videoRef.current.srcObject = activeStream;
    }
  }, [activeStream, isCameraActive]);

  const startCamera = async () => {
    setCameraError(null);
    setIsStreamReady(false);
    setIsStarting(true);
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(lang === 'en' ? "HTTPS required for camera access." : "相机访问需要使用 HTTPS 协议。");
      setIsStarting(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
        audio: false 
      });
      setIsCameraActive(true);
      setActiveStream(stream);
    } catch (err: any) {
      setIsStarting(false);
      setIsCameraActive(false);
      setCameraError(err.name === 'NotAllowedError' ? (lang === 'en' ? "Permission Denied" : "权限被拒绝") : (err.message || "Error"));
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && isStreamReady) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0);
        onImageReady(canvas.toDataURL('image/png'));
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (activeStream) activeStream.getTracks().forEach(t => t.stop());
    setActiveStream(null);
    setIsCameraActive(false);
    setIsStreamReady(false);
    setIsStarting(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-2xl w-full max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-indigo-400 font-comic uppercase tracking-wider">{t.step1Title}</h2>
        <p className="text-slate-400 text-sm mt-1">{t.step1Desc}</p>
      </div>
      
      <div className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-700/50 flex items-center justify-center group shadow-inner">
        {isStarting && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-md">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-indigo-400 font-bold animate-pulse">{t.initializing}</p>
          </div>
        )}

        {isCameraActive ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted
            onCanPlay={() => { setIsStreamReady(true); setIsStarting(false); }}
            className={`w-full h-full object-cover transition-opacity duration-700 ${isStreamReady ? 'opacity-100' : 'opacity-0'}`}
            style={{ transform: 'scaleX(-1)' }}
          />
        ) : currentImage ? (
          <img src={currentImage} alt="User" className="w-full h-full object-contain" />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-700 gap-4 p-12 text-center opacity-40">
            <i className="fa-solid fa-camera text-7xl"></i>
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
        
        {cameraError && (
          <div className="absolute inset-0 bg-slate-900/95 flex items-center justify-center p-8 text-center z-50">
            <div className="max-w-md">
              <i className="fa-solid fa-triangle-exclamation text-4xl text-rose-500 mb-4"></i>
              <h4 className="text-xl font-bold text-white mb-2">{t.cameraError}</h4>
              <p className="text-slate-400 text-sm mb-6">{cameraError}</p>
              <div className="flex gap-3 justify-center">
                <Button variant="secondary" size="sm" onClick={() => setCameraError(null)}>{t.close}</Button>
                <Button variant="primary" size="sm" onClick={startCamera}>{t.retry}</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 w-full">
        {isCameraActive ? (
          <>
            <Button variant="accent" onClick={capturePhoto} className="flex-1 min-w-[180px]" disabled={!isStreamReady}>
              <i className="fa-solid fa-camera mr-2"></i> {t.takePhoto}
            </Button>
            <Button variant="danger" onClick={stopCamera} className="px-6">
              <i className="fa-solid fa-xmark"></i>
            </Button>
          </>
        ) : (
          <>
            <Button onClick={startCamera} className="flex-1 min-w-[200px] shadow-indigo-500/20">
              <i className="fa-solid fa-video mr-3"></i> {t.openCamera}
            </Button>
            <Button variant="secondary" onClick={() => fileInputRef.current?.click()} className="flex-1">
              <i className="fa-solid fa-file-arrow-up mr-2"></i> {t.upload}
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => onImageReady(reader.result as string);
                reader.readAsDataURL(file);
              }
            }} />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
