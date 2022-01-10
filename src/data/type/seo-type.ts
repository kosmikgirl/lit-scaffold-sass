export type PageMetadata = {
  title: string;
  description?: string;
  banner?: string;
  bannerAlt?: string;
  contentType?: string;
};

export type TwitterData = {
  card: string;
  title: string;
  description: string;
  url: string;
  image: string;
  alt: string;
  site: string;
};

export type FacebookData = {
  type: string;
  title: string;
  description: string;
  url: string;
  locale: string;
  image: string;
  imageAlt: string;
  site_name: string;
};
