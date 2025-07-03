
import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

interface MobileAppProps {
  children: React.ReactNode;
}

const MobileApp = ({ children }: MobileAppProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(Capacitor.isNativePlatform());
  }, []);

  return (
    <div className={`mobile-app ${isMobile ? 'native-mobile' : 'web-mobile'}`}>
      <style jsx global>{`
        .mobile-app {
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        
        .native-mobile {
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
        
        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .mobile-app {
            font-size: 16px;
            -webkit-text-size-adjust: 100%;
          }
          
          /* Improve touch targets */
          button, .clickable {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Prevent zoom on input focus */
          input, select, textarea {
            font-size: 16px;
          }
        }
      `}</style>
      {children}
    </div>
  );
};

export default MobileApp;
