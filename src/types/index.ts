// ============================================
// Core Types for Joshua's Portfolio
// ============================================

// ----- Site Configuration -----
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    email: string;
    github: string;
    linkedin: string;
    youtube: string;
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  author: {
    name: string;
    bio: string;
    avatar: string;
    tagline: string;
    location: string;
  };
}

// ----- Navigation -----
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// ----- Topic Types -----
export interface Topic {
  id: string;
  slug: string;

  category: string;

  question: string;

  answer: string;

  explanation: string;

  catechism: {
    paragraphs: string[];
    text: string;
  };

  scripture: {
    reference: string;
    text: string;
  };
}

export interface TopicSlide {
  type:
    | 'question'
    | 'answer'
    | 'explanation'
    | 'catechism'
    | 'scripture';

  title: string;

  content: string;

  reference?: string;
}

// ----- Component Props -----
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends BaseProps {
  id?: string;
  title?: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
}

// ----- Form Types -----
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ----- API Response Types -----
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
