import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageContainer from '../components/PageContainer';
import LoadingSpinner from '../components/LoadingSpinner';
import { showSuccess, showError } from '../components/ToastNotification';

/**
 * Claim Upload Page
 * Allows users to upload multiple supporting documents for claims
 */
const ClaimUpload = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onBlur' });

  const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const maxFiles = 5;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (uploadedFiles.length + files.length > maxFiles) {
      showError(`Maximum ${maxFiles} files allowed. Please remove some files first.`);
      e.target.value = '';
      return;
    }

    const validFiles = [];
    const fileErrors = [];

    files.forEach((file) => {
      if (!allowedFileTypes.includes(file.type)) {
        fileErrors.push(`${file.name}: Invalid file type.`);
        return;
      }
      if (file.size > maxFileSize) {
        fileErrors.push(`${file.name}: File must be under 10MB.`);
        return;
      }
      const isDuplicate = uploadedFiles.some(
        f => f.name === file.name && f.size === file.size
      );
      if (isDuplicate) {
        fileErrors.push(`${file.name}: Already added.`);
        return;
      }
      validFiles.push(file);
    });

    if (fileErrors.length) showError(fileErrors[0]);
    if (validFiles.length) setUploadedFiles(prev => [...prev, ...validFiles]);
    e.target.value = '';
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setUploadedFiles([]);
    const input = document.querySelector('input[type="file"]');
    if (input) input.value = '';
  };

  const onSubmit = async (data) => {
    if (uploadedFiles.length === 0) {
      showError('Please upload at least one supporting document');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(res => setTimeout(res, 1500));

      const uploadId = `UPL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const uploadData = {
        uploadId,
        claimNumber: data.claimNumber,
        files: uploadedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
        })),
        totalFiles: uploadedFiles.length,
        uploadedAt: new Date().toISOString(),
        status: 'Uploaded',
      };

      const existingUploads = JSON.parse(localStorage.getItem('claim_uploads') || '[]');
      existingUploads.push(uploadData);
      localStorage.setItem('claim_uploads', JSON.stringify(existingUploads));

      showSuccess(`${uploadedFiles.length} document(s) uploaded successfully! Redirecting...`);

      setTimeout(() => {
        navigate('/success', { state: { uploadId, totalFiles: uploadedFiles.length, type: 'upload' } });
      }, 2000);

    } catch (err) {
      console.error(err);
      showError('Failed to upload documents. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  const getFileIcon = (fileType) => (
    <svg className="w-8 h-8 text-exide-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  return (
    <PageContainer>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-exide-blue">Upload Claim Documents</h1>
        <p className="text-gray-600">Upload up to 5 supporting files</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div>
            <label className="label">Claim Number *</label>
            <input
              className={`input-field ${errors.claimNumber ? 'border-red-500' : ''}`}
              {...register('claimNumber', { required: 'Claim number is required' })}
            />
            {errors.claimNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.claimNumber.message}</p>
            )}
          </div>

          <div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              <input type="file" multiple onChange={handleFileChange} className="hidden" id="fileUpload" />
              <label htmlFor="fileUpload" className="cursor-pointer text-exide-blue font-medium">
                Click to upload files
              </label>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, i) => (
                    <div key={i} className="flex justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        <span>{file.name} ({formatFileSize(file.size)})</span>
                      </div>
                      <button type="button" onClick={() => removeFile(i)} className="text-red-500">Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={clearAllFiles} className="text-sm text-gray-500">Clear All</button>
                </div>
              )}
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? <LoadingSpinner size="sm" /> : 'Upload Documents'}
          </button>

          <button type="button" onClick={() => { reset(); setUploadedFiles([]); }} className="text-sm text-gray-500">
            Clear Form
          </button>
        </form>
      </div>
    </PageContainer>
  );
};

export default ClaimUpload;
