import data from '../data/site/metadata.json';

export default class SEO {
  public static setSiteMetadata = (
    pageTitle: string,
    pageDescription?: string,
    pageBanner?: string,
    pageBannerAlt?: string,
    pageContentType?: string
  ): void => {
    const {
      author,
      authorType,
      banner,
      description,
      globalTitle,
      language,
      logo,
      social,
      title,
    } = data.site;

    const seoUrl = window.location.href;
    const seoTitle: string = `${pageTitle ? pageTitle : title}${
      globalTitle ? globalTitle : ``
    }`;
    const seoDescription: string = pageDescription
      ? pageDescription
      : description;
    const seoBanner: string = pageBanner
      ? `${seoUrl}${pageBanner}`
      : `${seoUrl}${banner.url}`;
    const seoBannerAlt: string = pageBannerAlt ? pageBannerAlt : banner.alt;
    const seoContentType: string = pageContentType
      ? pageContentType
      : `Website`;

    const twitterData = {
      card: 'summary',
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      image: seoBanner,
      alt: seoBannerAlt,
      site: social.twitter.user,
    };

    const facebookData = {
      type: seoContentType,
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      locale: language,
      image: seoBanner,
      imageAlt: seoBannerAlt,
      site_name: title,
    };

    const head = document.getElementsByTagName('head').item(0);

    document.title = seoTitle;

    const metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', seoDescription);
    head?.appendChild(metaDescription);

    const metaImage = document.createElement('meta');
    metaImage.setAttribute('name', 'image');
    metaImage.setAttribute('content', seoBanner);
    head?.appendChild(metaImage);

    Object.entries(twitterData).forEach(attribute => {
      const meta = document.createElement('meta');
      meta.setAttribute(
        'name',
        `twitter:${attribute[0] === 'alt' ? 'image:alt' : attribute[0]}`
      );
      meta.setAttribute('content', attribute[1]);
      head?.appendChild(meta);
    });

    Object.entries(facebookData).forEach(attribute => {
      const meta = document.createElement('meta');
      meta.setAttribute(
        'property',
        `${attribute[0] === 'alt' ? 'og:image:alt' : `og:${attribute[0]}`}`
      );
      meta.setAttribute('content', attribute[1]);
      head?.appendChild(meta);
    });

    const schemaWebPage = {
      '@context': `http://schema.org`,
      '@type': `WebPage`,
      url: seoUrl,
      description: description,
      inLanguage: language,
      mainEntityOfPage: seoUrl,
      name: seoTitle,
      author: {
        '@type': authorType,
        name: author,
      },
      copyrightHolder: {
        '@type': authorType,
        name: author,
      },
      copyrightYear: new Date().getFullYear().toString(),
      creator: {
        '@type': authorType,
        name: author,
      },
      publisher: {
        '@type': authorType,
        name: author,
      },
      image: {
        '@type': `ImageObject`,
        url: logo,
      },
    };

    if (!pageContentType) {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.innerHTML = JSON.stringify(schemaWebPage);
      head?.appendChild(script);
    }
  };
}
