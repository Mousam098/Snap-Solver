
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, useCallback } from "react";

import { SWATCHES } from "@/constants";
import { calculatorAPI } from "@/Services/api";
import { useAuth } from "@/contexts/AuthContext";
import { MenuIcon } from "lucide-react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";

import Slider from "@mui/material/Slider";
import { FaPencilAlt } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";
import toast from "react-hot-toast";

interface GeneratedResult {
  expression: string;
  answer: string;
}

interface Response {
  expr: string;
  result: string;
  assign: boolean;
}

// MathJax type definitions
declare global {
  interface MathJaxConfig {
    tex2jax: {
      inlineMath: [string, string][];
    };
  }

  interface MathJaxHub {
    Config: (config: MathJaxConfig) => void;
    Queue: (args: (string | unknown[])[]) => void;
    Typeset: (element?: HTMLElement | null) => void;
  }

  interface Window {
    MathJax: {
      Hub: MathJaxHub;
    };
  }
}

export default function Home() {
  const { user, logout } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("rgb(255, 255, 255)");
  const [reset, setReset] = useState(false);
  const [dictOfVars, setDictOfVars] = useState({});
  const [result, setResult] = useState<GeneratedResult>();

  const [latexExpression, setLatexExpression] = useState<Array<string>>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [penSize, setPenSize] = useState<number>(3);
  const [eraserSize, seteraserSize] = useState<number>(1);
  const [eraserSelected, seteraserSelecetd] = useState(false);
  const previousPositionRef = useRef<{ x: number; y: number } | null>(null);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [lastTap, setLastTap] = useState(0);


  useEffect(() => {
    if (result) {
      renderLatexToCanvas(result.expression, result.answer);
    }
  }, [result]);

  useEffect(() => {
    if (reset) {
      resetCanvas();
      setLatexExpression([]);
      setResult(undefined);
      setDictOfVars({});
      setPenSize(3);
      seteraserSize(1);
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
      }
    }

    const handleResize = () => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          ctx.putImageData(imageData, 0, 0);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = penSize;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = penSize;
      }
    }
  }, [penSize]);

  useEffect(() => {
    const initMathJax = (): HTMLScriptElement => {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML";
      script.async = true;

      script.onload = () => {
        if (window.MathJax) {
          const config: MathJaxConfig = {
            tex2jax: {
              inlineMath: [
                ["$", "$"],
                ["\$$", "\$$"],
              ],
            },
          };
          window.MathJax.Hub.Config(config);
        }
      };

      document.head.appendChild(script);
      return script;
    };

    const script = initMathJax();
    return () => {
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (latexExpression.length > 0 && window.MathJax) {
      const typesetArg: [string, unknown] = ["Typeset", window.MathJax.Hub];
      setTimeout(() => {
        window.MathJax.Hub.Queue([typesetArg]);
      }, 0);
    }
  }, [latexExpression]);

  const renderLatexToCanvas = (expression: string, answer: string) => {
    const latex = `${expression} = ${answer}`;
    setLatexExpression([...latexExpression, latex]);

    // Clear the main canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const getCoordinates = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    }
    return { x: 0, y: 0 };
  }, []);

  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.background = "black";
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        const { x, y } = getCoordinates(e);
        ctx.moveTo(x, y);
        setIsDrawing(true);
        previousPositionRef.current = { x, y };
      }
    }
  }, [getCoordinates]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const { x, y } = getCoordinates(e);
        if (eraserSelected) {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.beginPath();
          ctx.arc(x, y, eraserSize / 2, 0, Math.PI * 2, false);
          ctx.fill();
        } else {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = color;
          ctx.beginPath();
          if (previousPositionRef.current) {
            ctx.moveTo(previousPositionRef.current.x, previousPositionRef.current.y);
          } else {
            ctx.moveTo(x, y);
          }
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        previousPositionRef.current = { x, y };
      }
    }
  }, [isDrawing, eraserSelected, eraserSize, color, getCoordinates]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    previousPositionRef.current = null;
  }, []);

  const runRoute = async () => {
    const canvas = canvasRef.current;

    if (canvas) {
      try {
        const toastId = toast.loading('Processing your equation...');
        
        const response = await calculatorAPI.processImage(
          canvas.toDataURL("image/png"), 
          dictOfVars
        );

        toast.success('Solution found! 🎯', {
          id: toastId,
          duration: 3000,
        });

        const resp = response.data;
        console.log("Response", resp);
        resp.data.forEach((data: Response) => {
          if (data.assign === true) {
            setDictOfVars({
              ...dictOfVars,
              [data.expr]: data.result,
            });
          }
        });
        const ctx = canvas.getContext("2d");
        const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
        let minX = canvas.width,
          minY = canvas.height,
          maxX = 0,
          maxY = 0;

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const i = (y * canvas.width + x) * 4;
            if (imageData.data[i + 3] > 0) {
              minX = Math.min(minX, x);
              minY = Math.min(minY, y);
              maxX = Math.max(maxX, x);
              maxY = Math.max(maxY, y);
            }
          }
        }


        resp.data.forEach((data: Response) => {
          setTimeout(() => {
            setResult({
              expression: data.expr,
              answer: data.result,
            });
          }, 1000);
        });
      } catch (error: any) {
        console.error('Error processing image:', error);
        toast.error(error.response?.data?.message || 'Error processing equation. Please try again.');
      }
    }
  };

  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleOpenChange = (open: boolean) => {
    setIsMenuOpen(open);
  };

  const sliderChangeHandler = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      if (eraserSelected) {
        seteraserSize(newValue);
      } else {
        setPenSize(newValue);
      }
    }
  };

  const handleTouchStart = () => {
    setTouchStartTime(Date.now());
  };

  const handleTouchEnd = (id:number) => {
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration > 500) {  // Long press: more than 500ms
      handleDelete(id);
    }
  };

  const handleDoubleTap = (id:number) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      handleDelete(id);
    }
    setLastTap(now);
  };

  const handleDelete = (id:number) => {
    //Implementation to delete latex expression at index id
    console.log("Delete item at index:", id);
    //Example implementation:  setLatexExpression(latexExpression.filter((_, index) => index !== id));
  };


  return (
    <>
      {/* Modern Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/95 via-slate-800/90 to-gray-900/95 backdrop-blur-xl border-b border-emerald-500/30 shadow-2xl">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
              <img 
                src="/logo.svg" 
                alt="SnapSolver Logo" 
                className="w-full h-full rounded-xl"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 text-transparent bg-clip-text">
                SnapSolver Canvas
              </h1>
              <p className="text-xs text-emerald-200/60 hidden md:block">Draw your equations and get instant solutions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="text-white font-medium text-sm">{user?.name || 'User'}</span>
            </div>
            
            <Link 
              to="/" 
              className="group p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105 shadow-lg"
              title="Back to Home"
            >
              <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      <Sheet onOpenChange={handleOpenChange}>
        <SheetTrigger>
          <Button variant="outline" className="hidden" ref={openRef}>
            Open
          </Button>
        </SheetTrigger>

        <SheetContent side={"left"} className="bg-gradient-to-b from-gray-900 via-slate-900/50 to-gray-900 border-r border-emerald-500/30">
          <SheetHeader className="space-y-6">
            <SheetTitle>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div>
                  <div className="font-bold text-2xl bg-gradient-to-r from-emerald-300 to-teal-300 text-transparent bg-clip-text text-start">
                    SnapSolver
                  </div>
                  <div className="text-emerald-200/60 text-sm text-left">Canvas Tools</div>
                </div>
              </div>
            </SheetTitle>
            <SheetDescription>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-white font-medium">Welcome, {user?.name || 'User'}!</p>
                    <p className="text-emerald-200/60 text-sm">{user?.email}</p>
                  </div>
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="w-full mt-3 text-red-400 border-red-400/50 hover:bg-red-400 hover:text-white hover:border-red-400 transition-all duration-300"
                >
                  Logout
                </Button>
              </div>
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-8">
            {/* Action Buttons */}
            <div className="space-y-3">
              <SheetClose>
                <Button
                  onClick={() => {
                    setReset(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="mr-2">🗑️</span>
                  Reset Canvas
                </Button>
              </SheetClose>
              <SheetClose>
                <Button
                  onClick={() => {
                    runRoute();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="mr-2">🚀</span>
                  Calculate
                </Button>
              </SheetClose>
            </div>

            {/* Drawing Tools Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <span className="mr-2">🎨</span>
                Drawing Tools
              </h3>
              
              {/* Tool Selection */}
              <div className="flex gap-3 mb-4">
                <button
                  className={`flex-1 p-3 rounded-xl transition-all duration-300 ${
                    !eraserSelected
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                  }`}
                  onClick={() => seteraserSelecetd(false)}
                >
                  <FaPencilAlt size={18} className="mx-auto" />
                  <div className="text-xs mt-1">Pen</div>
                </button>
                <button
                  className={`flex-1 p-3 rounded-xl transition-all duration-300 ${
                    eraserSelected
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                  }`}
                  onClick={() => seteraserSelecetd(true)}
                >
                  <FaEraser size={18} className="mx-auto" />
                  <div className="text-xs mt-1">Eraser</div>
                </button>
              </div>

              {/* Color Palette */}
              <div className="mb-4">
                <h4 className="text-emerald-200 text-sm font-medium mb-3">Colors</h4>
                <div className="grid grid-cols-4 gap-2">
                  {SWATCHES.map((swatch) => (
                    <div
                      key={swatch}
                      className={`w-12 h-12 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 ${
                        color === swatch 
                          ? "ring-3 ring-white/70 ring-offset-2 ring-offset-gray-900 shadow-xl scale-105" 
                          : "hover:ring-2 hover:ring-white/40"
                      }`}
                      style={{ backgroundColor: swatch }}
                      onClick={() => setColor(swatch)}
                    />
                  ))}
                </div>
              </div>

              {/* Size Slider */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4">
                <h4 className="text-emerald-200 text-sm font-medium mb-3 flex items-center justify-between">
                  <span>{eraserSelected ? "Eraser" : "Pen"} Size</span>
                  <span className="text-xs bg-emerald-500/20 px-2 py-1 rounded-lg">
                    {eraserSelected ? eraserSize : penSize}px
                  </span>
                </h4>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                    {eraserSelected ? <FaEraser size={14} className="text-white" /> : <FaPencilAlt size={14} className="text-white" />}
                  </div>
                  <Slider
                    className="flex-1"
                    aria-label="pen size"
                    orientation="horizontal"
                    valueLabelDisplay="auto"
                    defaultValue={eraserSelected ? 1 : 3}
                    min={1}
                    max={10}
                    step={1}
                    onChange={sliderChangeHandler}
                    sx={{
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#a855f7',
                        '&:hover': {
                          boxShadow: '0px 0px 0px 8px rgba(168, 85, 247, 0.16)',
                        },
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: '#a855f7',
                      },
                      '& .MuiSlider-rail': {
                        backgroundColor: '#4b5563',
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <SheetFooter>
            <SheetClose>
              <Button
                onClick={() => setIsMenuOpen(false)}
                ref={closeRef}
                className="mt-10"
              >Done</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Modern Floating Toolbar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-4">
        <div className="bg-gray-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 shadow-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="text-white text-sm font-medium mb-2">
              {eraserSelected ? "Eraser" : "Pen"} Size
            </div>
            <Slider
              style={{ height: "180px" }}
              aria-label="pen size"
              orientation="vertical"
              valueLabelDisplay="auto"
              defaultValue={eraserSelected ? 1 : 3}
              min={1}
              max={10}
              step={1}
              onChange={sliderChangeHandler}
              sx={{
                '& .MuiSlider-thumb': {
                  backgroundColor: '#a855f7',
                  '&:hover': {
                    boxShadow: '0px 0px 0px 8px rgba(168, 85, 247, 0.16)',
                  },
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#a855f7',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#4b5563',
                },
              }}
            />
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
              {eraserSelected ? <FaEraser size={16} className="text-white" /> : <FaPencilAlt size={16} className="text-white" />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="fixed top-20 right-6 z-40 lg:hidden">
        <div
          className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 shadow-2xl"
          onClick={() => {
            if (isMenuOpen) {
              closeRef?.current?.click();
            } else {
              openRef?.current?.click();
            }
          }}
        >
          <MenuIcon className="text-white w-6 h-6" />
        </div>
      </div>
      {/* Modern Bottom Toolbar for Desktop */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-6 bg-gray-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-3xl px-8 py-4 shadow-2xl">
        {/* Reset Button */}
        <Button
          onClick={() => setReset(true)}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="mr-2">🗑️</span>
          Reset
        </Button>

        {/* Drawing Tools Section */}
        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
          {/* Pen Tool */}
          <button
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
              !eraserSelected
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => seteraserSelecetd(false)}
            title="Pen Tool"
          >
            <FaPencilAlt size={18} />
          </button>

          {/* Color Swatches */}
          <div className="flex items-center gap-2 mx-2">
            {SWATCHES.map((swatch) => (
              <div
                key={swatch}
                className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 ${
                  color === swatch 
                    ? "ring-4 ring-white/70 ring-offset-2 ring-offset-gray-900 shadow-xl" 
                    : "hover:ring-2 hover:ring-white/40 hover:ring-offset-1 hover:ring-offset-gray-900"
                }`}
                style={{ backgroundColor: swatch }}
                onClick={() => setColor(swatch)}
                title={`Color: ${swatch}`}
              />
            ))}
          </div>

          {/* Eraser Tool */}
          <button
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
              eraserSelected
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => seteraserSelecetd(true)}
            title="Eraser Tool"
          >
            <FaEraser size={18} />
          </button>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={runRoute}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="mr-2">🚀</span>
          Calculate
        </Button>
      </div>
      {/* Enhanced Canvas - Full Screen Drawing Area */}
      <canvas
        ref={canvasRef}
        id="canvas"
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      {/* Centered Result Display */}
      {latexExpression &&
        latexExpression.map((latex, index) => (
          <div
            key={index}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 text-white rounded-2xl shadow-2xl bg-gradient-to-r from-gray-900/95 to-slate-900/95 backdrop-blur-xl border border-emerald-500/30 max-w-[90vw] md:max-w-[600px] break-words z-40"
            style={{
              maxHeight: '60vh',
              overflowY: 'auto'
            }}
            onTouchStart={() => handleTouchStart()}
            onTouchEnd={() => handleTouchEnd(index)}
            onClick={() => handleDoubleTap(index)}
          >
            <div className="latex-content text-lg md:text-xl lg:text-2xl text-center whitespace-normal bg-black/30 rounded-xl p-4 border border-emerald-500/20 backdrop-blur-sm">
              {latex}
            </div>
          </div>
        ))}
    </>
  );
}