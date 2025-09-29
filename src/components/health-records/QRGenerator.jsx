import React, { useState, useRef } from 'react';
import { QrCode, Download, Share2, X, Copy, Check } from 'lucide-react';
import QRCode from 'react-qr-code';
import { useLanguage } from '../../hooks/useLanguage';

const QRGenerator = ({ record, onClose }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  if (!record) return null;

  // Generate QR data - contains essential record information
  const qrData = JSON.stringify({
    id: record.id,
    type: record.type,
    title: record.title,
    date: record.date,
    doctor: record.doctor,
    diagnosis: record.diagnosis,
    patientId: record.patientId || 'PAT12345',
    timestamp: new Date().toISOString()
  });

  // Generate shareable URL (mock URL for demo)
  const shareableUrl = `https://nabha-health.app/records/${record.id}`;

  const handleDownloadQR = () => {
    const svg = qrRef.current;
    if (!svg) return;

    // Convert SVG to canvas then to image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      // Download as PNG
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `health-record-${record.id}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleShareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t?.healthRecordQR || 'Health Record QR Code',
          text: `${record.title || 'Health Record'} - ${record.date}`,
          url: shareableUrl
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          alert(t?.shareError || 'Unable to share');
        }
      }
    } else {
      // Fallback: copy URL to clipboard
      handleCopyUrl();
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert(t?.copyError || 'Unable to copy to clipboard');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-800">
              {t?.qrCode || 'QR Code'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Record Info */}
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 mb-1">
              {record.title || t?.healthRecord || 'Health Record'}
            </h3>
            <p className="text-sm text-gray-500">{formatDate(record.date)}</p>
            {record.doctor && (
              <p className="text-sm text-gray-600 mt-1">{record.doctor}</p>
            )}
          </div>

          {/* QR Code Display */}
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200 flex justify-center">
            <div ref={qrRef}>
              <QRCode
                value={qrData}
                size={220}
                level="H"
                fgColor="#1f2937"
                bgColor="#ffffff"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              {t?.qrInstructions || 'Scan this QR code to quickly access your health record. Share it with healthcare providers for instant record access.'}
            </p>
          </div>

          {/* Shareable URL */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              {t?.shareableLink || 'Shareable Link'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareableUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-700"
              />
              <button
                onClick={handleCopyUrl}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title={t?.copyLink || 'Copy Link'}
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-green-600 mt-1">
                {t?.linkCopied || 'Link copied to clipboard!'}
              </p>
            )}
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              <span className="font-semibold">{t?.securityNote || 'Security Note'}:</span>{' '}
              {t?.qrSecurityMessage || 'Only share this QR code with trusted healthcare providers. It contains sensitive medical information.'}
            </p>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="border-t border-gray-200 p-4 flex gap-3">
          <button
            onClick={handleDownloadQR}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            {t?.download || 'Download'}
          </button>
          <button
            onClick={handleShareQR}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Share2 className="w-4 h-4" />
            {t?.share || 'Share'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;