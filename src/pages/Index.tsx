import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useCodeContext } from "@/context/CodeContext";
import { PlusCircle, Search, Lock, Unlock } from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";

const Index = () => {
  const [searchCode, setSearchCode] = useState("");
  const [searchResult, setSearchResult] = useState<{
    description: string;
    images: string[];
  } | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { getCode } = useCodeContext();
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedCode = searchCode.trim();
    if (!trimmedCode) return;

    const result = getCode(trimmedCode);
    if (result) {
      setSearchResult({
        description: result.description,
        images: result.images,
      });
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <MatrixBackground />
      
      <header className="bg-black/80 border-b border-primary p-4 relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Система кодов</h1>
          <Button
            onClick={() => navigate("/create")}
            className="bg-primary text-black hover:bg-primary/90 flex items-center gap-2"
          >
            <PlusCircle className="h-5 w-5" /> Создать код
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-xl mx-auto">
          <Card className="bg-gray-900/90 border-primary mb-8 backdrop-blur shadow-lg shadow-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2 text-primary">Введите код для расшифровки</h2>
                <p className="text-gray-400">
                  Получите доступ к расшифровке, введя правильный код
                </p>
              </div>

              <div className="flex gap-2">
                <Input
                  value={searchCode}
                  onChange={(e) => {
                    setSearchCode(e.target.value);
                    setNotFound(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Введите код"
                  className="bg-gray-800 border-gray-700 focus:border-primary text-center text-lg py-6"
                />
                <Button
                  onClick={handleSearch}
                  className="bg-primary text-black hover:bg-primary/90 flex-shrink-0"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>

              {notFound && (
                <div className="mt-4 p-3 bg-secondary/10 border border-secondary/30 rounded-md flex items-center gap-2 text-secondary">
                  <Lock className="h-5 w-5" />
                  <p>Код не найден. Проверьте правильность ввода.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {searchResult && (
            <Card className="bg-gray-900/90 border-green-600 animate-fade-in backdrop-blur shadow-lg shadow-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Unlock className="h-5 w-5" />
                  <h3 className="text-xl font-bold">Расшифровка найдена</h3>
                </div>

                <div className="mb-6 p-4 bg-gray-800/80 rounded-md">
                  <p className="whitespace-pre-line">{searchResult.description}</p>
                </div>

                {searchResult.images.length > 0 && (
                  <div>
                    <h4 className="text-md font-medium mb-3 text-primary">Изображения:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {searchResult.images.map((image, index) => (
                        <div key={index} className="aspect-video">
                          <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="h-full w-full object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity border border-primary/30"
                            onClick={() => window.open(image, "_blank")}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <footer className="mt-auto p-4 border-t border-gray-800 text-center text-gray-500 text-sm bg-black/80 relative z-10">
        <p>Система кодирования и расшифровки © 2023</p>
      </footer>
    </div>
  );
};

export default Index;
