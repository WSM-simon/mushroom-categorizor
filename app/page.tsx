"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, Loader2 } from "lucide-react";

interface Prediction {
  name: string;
  confidence: number;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [topN, setTopN] = useState(5);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setPredictions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("n", topN.toString());

      const response = await fetch("/mushrooms/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get predictions");
      }

      const data = await response.json();
      setPredictions(data.top_n);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to classify mushroom. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-800 dark:text-green-200 mb-4">
            🍄 Mushroom Classifier
          </h1>
          <p className="text-xl text-green-700 dark:text-green-300">
            AI-powered mushroom species identification
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
            Upload a mushroom image to identify its species
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          {/* Upload Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Select a mushroom image (JPG or PNG)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  {preview ? (
                    <div className="space-y-4">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-w-full h-auto rounded-lg mx-auto max-h-64 object-contain"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setFile(null);
                          setPreview(null);
                          setPredictions([]);
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center space-y-2">
                        <Upload className="h-12 w-12 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Click to upload or drag and drop
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Top N Predictions: {topN}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={topN}
                    onChange={(e) => setTopN(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!file || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Classifying...
                    </>
                  ) : (
                    "Classify Mushroom"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Predictions</CardTitle>
              <CardDescription>
                {predictions.length > 0
                  ? "Top predicted mushroom species"
                  : "Results will appear here"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {predictions.length > 0 ? (
                <div className="space-y-3">
                  {predictions.map((prediction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-green-900 dark:text-green-100">
                            {prediction.name.replace(/_/g, " ")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-700 dark:text-green-300">
                          {(prediction.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <p>Upload an image to see predictions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 text-sm text-green-700 dark:text-green-300">
          <p>
            ⚠️ This is an AI model and may not be 100% accurate. Never consume
            mushrooms based solely on this identification.
          </p>
        </div>
      </div>
    </main>
  );
}
