import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useCodeContext } from "@/context/CodeContext";
import { ArrowLeft, Upload, X, Check } from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";

const CreateCode = () => {
  const navigate = useNavigate();
  const { addCode } = useCodeContext();
  
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isCreated, setIsCreated] = useState(false);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      const newImages = filesArray.map((file) => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index]);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleCreateCode = () => {
    if (code.trim() && description.trim()) {
      addCode({
        code: code.trim(),
        description: description.trim(),
        images,
      });
      setIsCreated(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <MatrixBackground />
      
      <header className="bg-black/80 border-b border-primary p-4 relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-primary hover:text-primary/90 hover:bg-primary/10 flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" /> Назад
          </Button>
          <h1 className="text-2xl font-bold text-primary">Создание кода</h1>
          <div className="w-24"></div> {/* Placeholder for layout balance */}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <Card className="bg-gray-900/90 border-primary backdrop-blur shadow-lg shadow-primary/20 w-full max-w-2xl">
          <CardContent className="p-8">
            {isCreated ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
                  <Check className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-primary">Код успешно создан!</h2>
                <p className="text-gray-400">Перенаправление на главную страницу...</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 text-primary text-center">Создание нового кода</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Код для доступа</label>
                    <Input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Введите код"
                      className="bg-gray-800 border-gray-700 focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Расшифровка кода</label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Введите информацию для расшифровки..."
                      className="bg-gray-800 border-gray-700 focus:border-primary min-h-[150px]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Изображения (опционально)</label>
                    <div className="mb-4">
                      <label 
                        className="flex items-center justify-center gap-2 p-4 border border-dashed border-primary/50 rounded-md cursor-pointer hover:bg-primary/5 transition-colors"
                      >
                        <Upload className="h-5 w-5 text-primary" />
                        <span>Загрузить изображения</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Uploaded ${index + 1}`}
                              className="h-24 w-full object-cover rounded-md border border-primary/30"
                            />
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-secondary rounded-full p-1 opacity-80 hover:opacity-100 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={handleCreateCode}
                    className="w-full bg-primary text-black hover:bg-primary/90"
                    disabled={!code.trim() || !description.trim()}
                  >
                    Создать код
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="mt-auto p-4 border-t border-gray-800 text-center text-gray-500 text-sm bg-black/80 relative z-10">
        <p>Система кодирования и расшифровки © 2023</p>
      </footer>
    </div>
  );
};

export default CreateCode;
