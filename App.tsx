
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeType, Language, GenerationResult, SlotMachineState } from './types';
import { 
  TIME_TRAVEL_OPTIONS, 
  PAINTING_OPTIONS, 
  MORPH_PATHS, 
  SLOT_OPTIONS, 
  PROMPT_TEMPLATES,
  LOADING_MESSAGES,
  UI_STRINGS
} from './constants';
import { generateTransformedImage } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import Logo from './components/Logo';
import Button from './components/Button';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [activeTheme, setActiveTheme] = useState<ThemeType>(ThemeType.TIME_TRAVEL);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [lastPromptValue, setLastPromptValue] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const t = UI_STRINGS[lang];

  // Randomize initial slot state
  const [slotState, setSlotState] = useState<SlotMachineState>(() => ({
    occupation: SLOT_OPTIONS.occupations[0],
    outfit: SLOT_OPTIONS.outfits[0],
    action: SLOT_OPTIONS.actions[0]
  }));

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      const msgs = LOADING_MESSAGES[lang];
      setLoadingMsg(msgs[0]);
      interval = setInterval(() => {
        setLoadingMsg(msgs[Math.floor(Math.random() * msgs.length)]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isGenerating, lang]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullScreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const downloadImage = (url: string) => {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = `magic-morph-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTransform = useCallback(async (value: string) => {
    if (!userImage) return;
    setIsGenerating(true);
    setError(null);
    setResult(null);
    setLastPromptValue(value);

    const aspectRatio: any = activeTheme === ThemeType.FAMOUS_PAINTING ? "3:4" : "16:9";
    const promptTemplate = PROMPT_TEMPLATES[activeTheme];
    const prompt = (promptTemplate as any)(value);

    try {
      const generatedUrl = await generateTransformedImage(userImage, prompt, aspectRatio);
      if (generatedUrl) {
        setResult({ imageUrl: generatedUrl, promptUsed: prompt });
        // Automatically save to local machine immediately after generation
        setTimeout(() => {
          downloadImage(generatedUrl);
        }, 500);
      } else {
        setError(lang === 'en' ? "Failed to generate image." : "生成图像失败。");
      }
    } catch (err: any) {
      console.error("Transformation error:", err);
      setError(err.message || (lang === 'en' ? "Unexpected error." : "发生未知错误。"));
    } finally {
      setIsGenerating(false);
    }
  }, [userImage, activeTheme, lang]);

  const rollSlotMachine = () => {
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setSlotState({
        occupation: SLOT_OPTIONS.occupations[Math.floor(Math.random() * SLOT_OPTIONS.occupations.length)],
        outfit: SLOT_OPTIONS.outfits[Math.floor(Math.random() * SLOT_OPTIONS.outfits.length)],
        action: SLOT_OPTIONS.actions[Math.floor(Math.random() * SLOT_OPTIONS.actions.length)]
      });
      count++;
      if (count > 20) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      {/* Full Screen Modal */}
      {isFullScreen && result && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setIsFullScreen(false)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl transition-colors"><i className="fa-solid fa-circle-xmark"></i></button>
          <img src={result.imageUrl} alt="Result" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm font-medium">{t.fullScreen}</div>
        </div>
      )}

      {/* Navigation / Lang Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <div className="flex bg-slate-900/80 backdrop-blur-md p-1 rounded-full border border-slate-700/50 shadow-xl">
          <button onClick={() => setLang('en')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}>EN</button>
          <button onClick={() => setLang('zh')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'zh' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}>中文</button>
        </div>
      </div>

      {/* Header */}
      <header className="py-12 px-4 flex flex-col items-center gap-4">
        <Logo />
        <p className="text-indigo-400/80 font-medium tracking-widest text-sm uppercase animate-pulse">{t.tagline}</p>
      </header>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
        {/* Left Column */}
        <div className="space-y-10">
          <ImageUploader onImageReady={(base64) => { setUserImage(base64); setResult(null); }} currentImage={userImage || undefined} lang={lang} />

          {userImage && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 shadow-inner overflow-x-auto no-scrollbar">
                {[ThemeType.TIME_TRAVEL, ThemeType.FAMOUS_PAINTING, ThemeType.CRAZY_IDENTITY, ThemeType.MORPHING].map((theme) => (
                  <button key={theme} onClick={() => { setActiveTheme(theme); setResult(null); }} 
                    className={`flex-1 min-w-[100px] py-3 px-2 rounded-xl text-xs font-bold transition-all duration-300 ${activeTheme === theme ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}>
                    {lang === 'en' ? theme.replace('_', ' ') : 
                     theme === ThemeType.TIME_TRAVEL ? '时光穿梭' : 
                     theme === ThemeType.FAMOUS_PAINTING ? '名画显灵' : 
                     theme === ThemeType.CRAZY_IDENTITY ? '疯狂身份' : '英雄变身'}
                  </button>
                ))}
              </div>

              <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/50 backdrop-blur-sm min-h-[440px]">
                {activeTheme === ThemeType.TIME_TRAVEL && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-comic text-indigo-300">{t.chooseEra}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {TIME_TRAVEL_OPTIONS.map((opt) => (
                        <Button key={opt.id} variant="secondary" onClick={() => handleTransform(opt.value)} className="h-20 flex-col py-2">
                          <span className="text-sm font-bold">{lang === 'en' ? opt.labelEn : opt.labelZh}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTheme === ThemeType.FAMOUS_PAINTING && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-comic text-amber-300">{t.artGallery}</h3>
                    <p className="text-slate-500 text-xs italic">{t.artTip}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {PAINTING_OPTIONS.map((opt) => (
                        <Button key={opt.id} variant="secondary" onClick={() => handleTransform(opt.value)} className="h-20 flex-col py-2 border-amber-900/20">
                          <span className="text-sm font-bold">{lang === 'en' ? opt.labelEn : opt.labelZh}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTheme === ThemeType.CRAZY_IDENTITY && (
                  <div className="space-y-8 text-center">
                    <h3 className="text-2xl font-comic text-rose-300">{t.identityRoulette}</h3>
                    <div className="flex flex-col gap-4 py-6 bg-slate-950/40 rounded-3xl border border-slate-800 shadow-inner">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-1">{t.occupation}</div>
                        <div className="text-xl font-bold font-comic text-indigo-400">{lang === 'en' ? slotState.occupation.en : slotState.occupation.zh}</div>
                      </div>
                      <div className="text-slate-700 text-xs font-comic">穿着 / WEARING</div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-1">{t.outfit}</div>
                        <div className="text-xl font-bold font-comic text-rose-400">{lang === 'en' ? slotState.outfit.en : slotState.outfit.zh}</div>
                      </div>
                      <div className="text-slate-700 text-xs font-comic">正在 / WHILE</div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-1">{t.action}</div>
                        <div className="text-xl font-bold font-comic text-amber-400">{lang === 'en' ? slotState.action.en : slotState.action.zh}</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Button variant="secondary" size="lg" onClick={rollSlotMachine} disabled={isSpinning} className="w-full">
                        <i className={`fa-solid fa-shuffle mr-3 ${isSpinning ? 'animate-spin' : ''}`}></i> {t.shuffle}
                      </Button>
                      <Button variant="accent" size="lg" onClick={() => handleTransform(`${slotState.occupation.en} in ${slotState.outfit.en} while ${slotState.action.en}`)}>
                        {t.generate}
                      </Button>
                    </div>
                  </div>
                )}

                {activeTheme === ThemeType.MORPHING && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-comic text-emerald-400">{t.evolution}</h3>
                      <span className="text-[10px] text-slate-600 uppercase tracking-widest bg-slate-950/50 px-2 py-1 rounded">Marvel & DC Editions</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto pr-2 no-scrollbar">
                      {MORPH_PATHS.map((opt) => (
                        <button 
                          key={opt.id} 
                          onClick={() => handleTransform(opt.value)} 
                          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-emerald-600/20 hover:border-emerald-500/50 transition-all group"
                        >
                          <span className="text-xs font-bold text-slate-300 group-hover:text-emerald-300 text-center leading-tight">
                            {lang === 'en' ? opt.labelEn : opt.labelZh}
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-center text-slate-600 italic mt-2">More characters coming soon... / 更多角色即将上线...</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Result */}
        <div className="relative">
          <div className="lg:sticky lg:top-12 bg-slate-900/60 rounded-[3rem] border-2 border-slate-800 shadow-2xl overflow-hidden min-h-[600px] flex flex-col backdrop-blur-md">
            {isGenerating ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="relative mb-12">
                  <div className="w-40 h-40 border-[12px] border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
                  <i className="fa-solid fa-wand-magic-sparkles absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-indigo-400 animate-pulse"></i>
                </div>
                <h3 className="text-3xl font-comic text-white mb-4">{t.morphing}</h3>
                <p className="text-slate-400 font-medium">{loadingMsg}</p>
              </div>
            ) : result ? (
              <div className="flex-1 flex flex-col p-6 animate-fade-in">
                <div className="flex-1 relative rounded-[2.5rem] overflow-hidden bg-black group shadow-2xl border border-slate-700/50">
                  <img src={result.imageUrl} alt="Result" className="w-full h-full object-contain cursor-zoom-in" onClick={() => setIsFullScreen(true)} />
                  <button onClick={() => setIsFullScreen(true)} className="absolute top-6 right-6 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"><i className="fa-solid fa-expand text-xl"></i></button>
                </div>
                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="accent" className="col-span-1 sm:col-span-2 shadow-amber-500/30" onClick={() => lastPromptValue && handleTransform(lastPromptValue)}>
                    <i className="fa-solid fa-rotate mr-2"></i> {t.regenerate}
                  </Button>
                  <Button onClick={() => downloadImage(result.imageUrl)}>
                    <i className="fa-solid fa-download mr-2"></i> {t.save}
                  </Button>
                  <Button variant="secondary" onClick={() => { setResult(null); setLastPromptValue(null); }}>
                    <i className="fa-solid fa-arrow-left mr-2"></i> {t.back}
                  </Button>
                </div>
              </div>
            ) : error ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center gap-6">
                <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center"><i className="fa-solid fa-triangle-exclamation text-5xl text-rose-500"></i></div>
                <h3 className="text-2xl font-bold">{t.cameraError}</h3>
                <p className="text-slate-400 text-sm max-w-xs">{error}</p>
                <Button variant="danger" onClick={() => setError(null)}>RESET</Button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-600 gap-8">
                <div className="relative group">
                   <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                   <i className="fa-solid fa-image-polaroid text-[120px] opacity-10 group-hover:opacity-20 transition-all group-hover:rotate-6"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-comic text-slate-500">{t.previewTitle}</h3>
                  <p className="mt-2 text-sm text-slate-600">{t.previewDesc}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-32 py-12 text-center border-t border-slate-900/50">
        <div className="flex items-center justify-center gap-4 text-indigo-500/30 font-comic tracking-widest text-lg opacity-50 mb-4">
          <i className="fa-solid fa-sparkle"></i> NANO BANANA POWERED <i className="fa-solid fa-sparkle"></i>
        </div>
        <p className="text-slate-600 text-xs font-medium uppercase">© 2024 MAGIC MORPH LABS • {t.footer}</p>
      </footer>
    </div>
  );
};

export default App;
