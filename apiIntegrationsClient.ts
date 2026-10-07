import { Internship, Webinar } from '../types';

export interface ApiIntegrationsStatus {
  jsearch: {
    name: string;
    description: string;
    configured: boolean;
    envVar: string;
    targetPlatforms: string[];
  };
  adzuna: {
    name: string;
    description: string;
    configured: boolean;
    envVars: string[];
    supportedCountries: string[];
  };
  youtubeLuma: {
    name: string;
    description: string;
    configured: boolean;
    envVars: string[];
    types: string[];
  };
}

export async function checkIntegrationsStatus(): Promise<ApiIntegrationsStatus | null> {
  try {
    const res = await fetch('/api/integrations/status');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[API Client] Could not fetch integration status:', err);
  }
  return null;
}

export async function fetchLiveJSearchInternships(params: {
  query?: string;
  location?: string;
  country?: string;
}): Promise<{ internships: Internship[]; source: string }> {
  try {
    const res = await fetch('/api/internships/live-jsearch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[API Client] JSearch request failed:', err);
  }
  return { internships: [], source: 'Failed to connect to RapidAPI JSearch' };
}

export async function fetchLiveAdzunaInternships(params: {
  query?: string;
  location?: string;
  country?: string;
}): Promise<{ internships: Internship[]; source: string }> {
  try {
    const res = await fetch('/api/internships/live-adzuna', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[API Client] Adzuna request failed:', err);
  }
  return { internships: [], source: 'Failed to connect to Adzuna API' };
}

export async function fetchAggregatedLiveInternships(params: {
  query?: string;
  location?: string;
  country?: string;
}): Promise<{ internships: Internship[]; sources: string[] }> {
  try {
    const res = await fetch('/api/internships/live-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[API Client] Aggregated live internship search failed:', err);
  }
  return { internships: [], sources: [] };
}

export async function fetchLiveWebinarsFeed(params: {
  category?: string;
  query?: string;
}): Promise<{ webinars: Webinar[]; source: string }> {
  try {
    const res = await fetch('/api/webinars/live-feed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[API Client] Webinars live feed failed:', err);
  }
  return { webinars: [], source: 'Failed to connect to YouTube Data API / Luma' };
}
