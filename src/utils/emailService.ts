/**
 * Email Service Dispatcher for Ikasle PrintHub
 * Handles observable form submission to the configured email service endpoint.
 *
 * Supports:
 * - VITE_EMAIL_SERVICE_URL / VITE_CONTACT_API_URL / VITE_QUOTE_API_URL environment variables
 * - First-class /api/contact and /api/quote endpoints (handled via Vite middleware & Vercel serverless)
 * - Public email forwarding service fallback (formsubmit.co)
 */

export const DEFAULT_BUSINESS_EMAIL = 'businessgroupikasle@gmail.com';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface QuoteFormData {
  quoteReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  selectedService: string;
  quantity: number;
  material: string;
  finish: string;
  turnaround: string;
  artworkFile?: string | null;
  artworkFileSize?: number | null;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
}

const getEndpoint = (type: 'contact' | 'quote'): string => {
  if (type === 'contact') {
    return (
      import.meta.env.VITE_CONTACT_API_URL ||
      import.meta.env.VITE_EMAIL_SERVICE_URL ||
      '/api/contact'
    );
  }
  return (
    import.meta.env.VITE_QUOTE_API_URL ||
    import.meta.env.VITE_EMAIL_SERVICE_URL ||
    '/api/quote'
  );
};

/**
 * Submits contact inquiry to the configured email service endpoint.
 * Generates an observable HTTP network request and awaits confirmation.
 */
export async function sendContactInquiry(payload: ContactFormData): Promise<SubmissionResponse> {
  const primaryEndpoint = getEndpoint('contact');
  const body = JSON.stringify({
    ...payload,
    _subject: `New Print Inquiry from ${payload.name} (${payload.email})`,
    _replyto: payload.email,
    recipient: DEFAULT_BUSINESS_EMAIL,
    timestamp: new Date().toISOString(),
    source: 'Ikasle PrintHub - Contact Modal',
  });

  try {
    const res = await fetch(primaryEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body,
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: true,
        message: data.message || 'Inquiry successfully dispatched.',
      };
    }

    // If primary endpoint returned non-200 (e.g. 404 on static hosting without serverless)
    // fallback to public form email forwarder
    if (primaryEndpoint.startsWith('/api/')) {
      const fallbackUrl = `https://formsubmit.co/ajax/${DEFAULT_BUSINESS_EMAIL}`;
      const fallbackRes = await fetch(fallbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body,
      });

      if (fallbackRes.ok) {
        return {
          success: true,
          message: 'Inquiry successfully dispatched to print specialist.',
        };
      }
    }

    return {
      success: false,
      message: 'Failed to send inquiry. Please try again or message us directly on WhatsApp.',
    };
  } catch (err) {
    // If primary fetch threw network error and was local endpoint, try public fallback
    if (primaryEndpoint.startsWith('/api/')) {
      try {
        const fallbackUrl = `https://formsubmit.co/ajax/${DEFAULT_BUSINESS_EMAIL}`;
        const fallbackRes = await fetch(fallbackUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body,
        });
        if (fallbackRes.ok) {
          return {
            success: true,
            message: 'Inquiry successfully dispatched to print specialist.',
          };
        }
      } catch {
        // Fallback also failed
      }
    }

    return {
      success: false,
      message: err instanceof Error ? err.message : 'Network error. Please check your connection and retry.',
    };
  }
}

/**
 * Submits custom quote request to the configured email service endpoint.
 * Generates an observable HTTP network request and awaits confirmation.
 */
export async function sendQuoteRequest(payload: QuoteFormData): Promise<SubmissionResponse> {
  const primaryEndpoint = getEndpoint('quote');
  const body = JSON.stringify({
    ...payload,
    _subject: `Print Quote Request [${payload.quoteReference}] - ${payload.selectedService} (${payload.customerName})`,
    _replyto: payload.customerEmail,
    recipient: DEFAULT_BUSINESS_EMAIL,
    timestamp: new Date().toISOString(),
    source: 'Ikasle PrintHub - Quote Modal',
  });

  try {
    const res = await fetch(primaryEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body,
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: true,
        message: data.message || 'Quote request successfully registered.',
      };
    }

    if (primaryEndpoint.startsWith('/api/')) {
      const fallbackUrl = `https://formsubmit.co/ajax/${DEFAULT_BUSINESS_EMAIL}`;
      const fallbackRes = await fetch(fallbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body,
      });

      if (fallbackRes.ok) {
        return {
          success: true,
          message: 'Quote request dispatched to print engineering team.',
        };
      }
    }

    return {
      success: false,
      message: 'Failed to dispatch quote request. Please try again or contact us via WhatsApp.',
    };
  } catch (err) {
    if (primaryEndpoint.startsWith('/api/')) {
      try {
        const fallbackUrl = `https://formsubmit.co/ajax/${DEFAULT_BUSINESS_EMAIL}`;
        const fallbackRes = await fetch(fallbackUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body,
        });
        if (fallbackRes.ok) {
          return {
            success: true,
            message: 'Quote request dispatched to print engineering team.',
          };
        }
      } catch {
        // Fallback error
      }
    }

    return {
      success: false,
      message: err instanceof Error ? err.message : 'Network error. Please check your connection and retry.',
    };
  }
}

