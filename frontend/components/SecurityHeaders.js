import React from 'react';
import Head from 'next/head';

/**
 * Security Headers Component
 * Adds important security-related HTTP headers as meta tags
 * Note: For production, these should be implemented as actual HTTP headers on the server
 * 
 * @returns {JSX.Element} - Head component with security meta tags
 */
const SecurityHeaders = () => {
  return (
    <Head>
      {/* Content Security Policy */}
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.google-analytics.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com;"
      />

      {/* Referrer Policy */}
      <meta
        name="referrer"
        content="strict-origin-when-cross-origin"
      />

      {/* Permissions Policy */}
      <meta
        httpEquiv="Permissions-Policy"
        content="camera=(), microphone=(), geolocation=(self), interest-cohort=()"
      />

      {/* X-Content-Type-Options */}
      <meta
        httpEquiv="X-Content-Type-Options"
        content="nosniff"
      />

      {/* X-Frame-Options */}
      <meta
        httpEquiv="X-Frame-Options"
        content="SAMEORIGIN"
      />

      {/* X-XSS-Protection */}
      <meta
        httpEquiv="X-XSS-Protection"
        content="1; mode=block"
      />
    </Head>
  );
};

export default SecurityHeaders;