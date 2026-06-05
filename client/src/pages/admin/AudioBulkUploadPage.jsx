// client/src/pages/admin/AudioBulkUploadPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Download, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import audioAPI from '../../api/audioAPI';
import toast from 'react-hot-toast';

const AudioBulkUploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);
  const [preview, setPreview] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          setPreview(data.audios || data);
        } catch (error) {
          toast.error('Invalid JSON file');
        }
      };
      reader.readAsText(selectedFile);
    } else {
      toast.error('Please upload a JSON file');
    }
  };

  const handleBulkUpload = async () => {
    if (!preview.length) {
      toast.error('No audio data found');
      return;
    }

    setUploading(true);
    try {
      const response = await audioAPI.bulkUploadAudio({ audios: preview });
      setResults(response.data);
      toast.success(`Successfully uploaded ${response.data.successful?.length || 0} audio files`);
    } catch (error) {
      console.error('Bulk upload error:', error);
      toast.error('Failed to upload audio files');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const template = {
      audios: [
        {
          title: "Example Audio Title",
          type: "nauha",
          audioUrl: "https://example.com/audio.mp3",
          description: "Audio description here",
          language: "urdu",
          occasion: "muharram",
          tags: ["example", "sample"],
          isPublished: true
        }
      ]
    };
    
    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audio-bulk-upload-template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Template downloaded');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Audio Upload</h1>
          <p className="text-gray-500 mt-1">Upload multiple audio files at once using JSON</p>
        </div>
        <button onClick={downloadTemplate} className="btn-outline inline-flex items-center gap-2">
          <Download className="h-5 w-5" />
          <span>Download Template</span>
        </button>
      </div>

      <div className="card p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="application/json"
            onChange={handleFileChange}
            className="hidden"
            id="json-upload"
          />
          <label htmlFor="json-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Click to upload JSON file</p>
            <p className="text-sm text-gray-400 mt-1">JSON format with audio array</p>
          </label>
        </div>

        {file && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Preview ({preview.length} items)</h3>
              <button
                onClick={handleBulkUpload}
                disabled={uploading || !preview.length}
                className="btn-primary inline-flex items-center gap-2"
              >
                {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
                <span>{uploading ? 'Uploading...' : 'Start Bulk Upload'}</span>
              </button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Title</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Language</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Occasion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {preview.slice(0, 10).map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 capitalize">{item.type}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{item.language}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 capitalize">{item.occasion || 'general'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {preview.length > 10 && (
                  <div className="p-2 text-center text-sm text-gray-500">
                    +{preview.length - 10} more items
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-lg bg-gray-50"
          >
            <h3 className="font-semibold text-gray-900 mb-3">Upload Results</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>Successful: {results.successful?.length || 0}</span>
              </div>
              {results.failed?.length > 0 && (
                <div className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-5 w-5" />
                  <span>Failed: {results.failed.length}</span>
                </div>
              )}
              {results.failed?.length > 0 && (
                <details className="mt-2">
                  <summary className="text-sm text-gray-600 cursor-pointer">View failed items</summary>
                  <div className="mt-2 space-y-1">
                    {results.failed.map((fail, idx) => (
                      <div key={idx} className="text-sm text-red-500">
                        {fail.data?.title}: {fail.error}
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Instructions</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>1. Download the JSON template using the button above</p>
          <p>2. Fill in your audio data following the template structure</p>
          <p>3. Upload the completed JSON file</p>
          <p>4. Review the preview and click "Start Bulk Upload"</p>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Required fields for each audio:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>title (string) - Audio title</li>
                <li>type (string) - One of: nauha, marsiya, soz, salam, majlis, etc.</li>
                <li>audioUrl (string) - URL to the audio file</li>
                <li>language (string) - urdu, hindi, english, arabic, persian</li>
                <li>occasion (string) - muharram, ramadan, eid, milad, general</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioBulkUploadPage;