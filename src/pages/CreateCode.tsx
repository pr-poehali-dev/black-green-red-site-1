import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCodeContext } from "@/context/CodeContext";
import { PlusCircle, Upload, X, CheckCircle } from "lucide-react";

const CreateCode = () => {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { addCode } = useCodeContext();
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const newImages = fileArray.map((file) => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() && description.trim()) {
      addCode(code.trim(), description.trim(), images);
      setSuccessMessage("Код успешно сохранен!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-primary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Создание кода</h1>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-black"
          >
            На главную
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 max-w-3xl">
        <Card className="bg-gray-900 border-primary">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <PlusCircle className="h-5 w-5" /> Создание нового кода
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="code" className="block text-sm font-medium">
                  Код
                </label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Введите код"
                  className="bg-gray-800 border-gray-700 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium">
                  Расшифровка
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Введите расшифровку кода"
                  className="min-h-32 bg-gray-800 border-gray-700 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <p className="block text-sm font-medium">Изображения</p>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="images"
                    className="cursor-pointer flex items-center justify-center p-4 border border-dashed border-gray-700 rounded-md hover:border-primary transition-colors"
                  >
                    <Upload className="h-5 w-5 mr-2 text-primary" />
                    <span>Загрузить изображения</span>
                    <input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-black bg-opacity-70 rounded-full p-1 text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Отмена
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-primary text-black hover:bg-primary/90"
            >
              Сохранить
            </Button>
          </CardFooter>
        </Card>

        {successMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex items-center gap-3 text-primary">
              <CheckCircle className="h-6 w-6" />
              {successMessage}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreateCode;
