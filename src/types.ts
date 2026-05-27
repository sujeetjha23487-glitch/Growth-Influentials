export interface Creator {
  id: string;
  name: string;
  niche: string;
  category: string; // 'fashion' | 'tech' | 'health' | 'food' | 'finance' | 'travel' | 'gaming' | 'b2b'
  followers: string;
  engagementRate: string;
  platform: 'Instagram' | 'YouTube' | 'TikTok';
  initials: string;
}

export interface CaseStudy {
  id: string;
  brand: string;
  category: string;
  challenge: string;
  solution: string;
  metrics: {
    reach: string;
    engagement: string;
    roas: string;
  };
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  brandName?: string;
  website?: string;
  budget?: string;
  targetAudience?: string;
  message?: string;
  submittedAt: string;
}
