// // client/src/components/Captcha.jsx
// import React, { useRef, useState, useEffect } from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';
// import api from '../api/apiConfig';

// const Captcha = ({ onChange, onError }) => {
//   const recaptchaRef = useRef(null);
//   const [siteKey, setSiteKey] = useState('');
//   const [enabled, setEnabled] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCaptchaConfig = async () => {
//       try {
//         const response = await api.get('/captcha/config');
//         const config = response.data?.data || response.data;
//         setEnabled(config.enabled || false);
//         setSiteKey(config.siteKey || '');
//       } catch (error) {
//         console.error('Failed to load CAPTCHA config:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchCaptchaConfig();
//   }, []);

//   const handleChange = (token) => {
//     onChange(token);
//   };

//   const handleError = () => {
//     console.error('CAPTCHA error');
//     if (onError) onError();
//   };

//   const resetCaptcha = () => {
//     if (recaptchaRef.current) {
//       recaptchaRef.current.reset();
//     }
//   };

//   if (loading || !enabled || !siteKey) {
//     return null;
//   }

//   return (
//     <div className="flex justify-center my-4">
//       <ReCAPTCHA
//         ref={recaptchaRef}
//         sitekey={siteKey}
//         onChange={handleChange}
//         onErrored={handleError}
//         onExpired={() => onChange(null)}
//         theme="light"
//       />
//     </div>
//   );
// };

// export default Captcha;














// client/src/components/Captcha.jsx
import React, { useRef, useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import api from '../api/apiConfig';
import { AlertCircle } from 'lucide-react';

const Captcha = ({ onChange, onError }) => {
  const recaptchaRef = useRef(null);
  const [siteKey, setSiteKey] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchCaptchaConfig = async () => {
      try {
        console.log('🔐 Fetching CAPTCHA config...');
        const response = await api.get('/captcha/config');
        const config = response.data?.data || response.data;
        
        console.log('📦 CAPTCHA config received:', {
          enabled: config.enabled,
          hasSiteKey: !!config.siteKey,
          siteKeyPrefix: config.siteKey ? config.siteKey.substring(0, 10) + '...' : 'none',
          type: config.type
        });
        
        setEnabled(config.enabled || false);
        setSiteKey(config.siteKey || '');
        
        if (config.enabled && !config.siteKey) {
          console.warn('⚠️ CAPTCHA enabled but no site key provided');
          setError('CAPTCHA configuration incomplete. Please contact administrator.');
        }
        
      } catch (error) {
        console.error('❌ Failed to load CAPTCHA config:', error);
        setError('Failed to load CAPTCHA configuration');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCaptchaConfig();
  }, [retryCount]);

  const handleChange = (token) => {
    console.log('🔐 CAPTCHA token received:', token ? `✅ Token (${token.substring(0, 10)}...)` : '❌ No token');
    if (token) {
      setError(null);
      onChange(token);
    } else {
      onChange(null);
    }
  };

  const handleError = () => {
    console.error('❌ CAPTCHA error occurred');
    setError('CAPTCHA verification failed. Please refresh and try again.');
    if (onError) onError();
    onChange(null);
  };

  const handleExpired = () => {
    console.log('⏰ CAPTCHA expired, resetting...');
    setError('CAPTCHA expired. Please verify again.');
    onChange(null);
  };

  const resetCaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setError(null);
      console.log('🔄 CAPTCHA reset');
    }
  };

  const retryLoad = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
    setLoading(true);
  };

  // Don't render if CAPTCHA is not enabled
  if (!enabled) {
    console.log('🔓 CAPTCHA is disabled, skipping render');
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center my-4">
        <div className="animate-pulse text-gray-400 text-sm">Loading CAPTCHA...</div>
      </div>
    );
  }

  // Show error state
  if (error || !siteKey) {
    return (
      <div className="my-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-yellow-700">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error || 'CAPTCHA not available'}</span>
          </div>
          <button
            type="button"
            onClick={retryLoad}
            className="mt-2 text-xs text-yellow-600 hover:text-yellow-800 underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-4">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={handleChange}
        onErrored={handleError}
        onExpired={handleExpired}
        theme="light"
        size="normal"
        hl="en"
      />
      <button
        type="button"
        onClick={resetCaptcha}
        className="mt-2 text-xs text-gray-400 hover:text-gray-600 underline"
      >
        Reset CAPTCHA
      </button>
    </div>
  );
};

export default Captcha;