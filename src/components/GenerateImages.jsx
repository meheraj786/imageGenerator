import React, { useState } from "react";
import {
  Sparkles,
  Download,
  RefreshCw,
  Wand2,
  ImageIcon,
  Palette,
} from "lucide-react";
import SplitText from "../effects/SplitText";

const GenerateImages = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("realistic");


  const styleOptions = [
    {
      id: "realistic",
      name: "Realistic",
      prompt:
        "photorealistic, high quality, detailed, 4k resolution, professional photography",
      icon: "📷",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      id: "cartoon",
      name: "Cartoon",
      prompt:
        "cartoon style, colorful, fun, animated style, disney pixar style, cheerful",
      icon: "🎨",
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      id: "anime",
      name: "Anime",
      prompt:
        "anime style, manga style, japanese animation, vibrant colors, detailed anime art",
      icon: "🌸",
      gradient: "from-pink-500 to-purple-600",
    },
    {
      id: "comics",
      name: "Comics",
      prompt:
        "comic book style, superhero style, bold colors, comic art, graphic novel style",
      icon: "💥",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      id: "oil_painting",
      name: "Oil Painting",
      prompt:
        "oil painting style, classical art, renaissance style, artistic brushstrokes, fine art",
      icon: "🖼️",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      id: "watercolor",
      name: "Watercolor",
      prompt:
        "watercolor painting, soft colors, artistic, painted texture, traditional art style",
      icon: "🎭",
      gradient: "from-teal-500 to-cyan-600",
    },
  ];

  const genImg = async () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    setShowImage(false);

    const selectedStyleData = styleOptions.find(
      (style) => style.id === selectedStyle
    );
    const combinedPrompt = `${text}, ${selectedStyleData.prompt}`;

    const width = 1024;
    const height = 1024;
    const seed = Math.floor(Math.random() * 10000);
    const model = "flux";

    const newImageUrl = `https://pollinations.ai/p/${encodeURIComponent(
      combinedPrompt
    )}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

    setTimeout(() => {
      setImageUrl(newImageUrl);
      setIsGenerating(false);
      setShowImage(true);
    }, 2000);
  };

  const downloadImage = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `ai-generated-${Date.now()}.jpg`;
      link.click();
    }
  };

  const regenerateImage = () => {
    if (text.trim()) {
      genImg();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-900 to-indigo-900 p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-10 blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Wand2 className="w-10 h-10 text-white" />
          </div>
          <br />
          <SplitText className="text-5xl pb-5 inline-block font-bold text-white mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text " text="PookiePixel" delay={100} duration={0.6} />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your imagination into stunning visuals with the power of
            AI
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border border-white/20">
          <div className="flex items-center mb-4">
            <Palette className="w-6 h-6 text-purple-400 mr-3" />
            <h2 className="text-2xl font-semibold text-white">
              Describe Your Vision
            </h2>
          </div>

          <div className="relative mb-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="A mystical forest with glowing mushrooms and fairy lights..."
              className="w-full h-32 bg-white/5 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-lg backdrop-blur-sm"
              disabled={isGenerating}
            />
            <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
              {text.length}/500
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
              Choose Art Style
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {styleOptions.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`relative overflow-hidden rounded-xl p-4 transition-all duration-300 transform hover:scale-105 ${
                    selectedStyle === style.id
                      ? `bg-gradient-to-r ${style.gradient} shadow-lg`
                      : "bg-white/5 hover:bg-white/10 border border-white/20"
                  }`}
                  disabled={isGenerating}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{style.icon}</div>
                    <div className="text-white font-medium text-sm">
                      {style.name}
                    </div>
                  </div>
                  {selectedStyle === style.id && (
                    <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-gray-300 text-sm">
                <span className="text-purple-400 font-semibold">
                  Selected Style:
                </span>{" "}
                {
                  styleOptions.find((style) => style.id === selectedStyle)
                    ?.prompt
                }
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={genImg}
              disabled={isGenerating || !text.trim()}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Generating Magic...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Image</span>
                </>
              )}
            </button>

            {imageUrl && !isGenerating && (
              <button
                onClick={regenerateImage}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 border border-white/20"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Regenerate</span>
              </button>
            )}
          </div>
        </div>

        {(isGenerating || imageUrl) && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <ImageIcon className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">
                  Generated Artwork
                </h2>
              </div>

              {imageUrl && showImage && !isGenerating && (
                <button
                  onClick={downloadImage}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              )}
            </div>

            <div className="relative">
              {isGenerating && (
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-white/30">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg font-medium">
                      Creating your masterpiece...
                    </p>
                    <div className="mt-4 flex justify-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}

              {imageUrl && showImage && !isGenerating && (
                <div className="relative group">
                  <img
                    src={imageUrl}
                    alt="Generated AI artwork"
                    className="w-full aspect-square object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Image overlay info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                      "{text}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!imageUrl && !isGenerating && (
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                AI Powered
              </h3>
              <p className="text-gray-300">
                Advanced AI technology creates stunning, unique images from your
                descriptions.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Instant Results
              </h3>
              <p className="text-gray-300">
                Generate high-quality images in seconds with our optimized AI
                pipeline.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Easy Download
              </h3>
              <p className="text-gray-300">
                Download your creations in high resolution for personal or
                commercial use.
              </p>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default GenerateImages;
