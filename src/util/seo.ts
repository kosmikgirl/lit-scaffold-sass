import data from '../data/site/metadata.json';
import {PageMetadata} from '../data/type/index';

export default class SEO {
  public static setSiteMetadata = (pageMetadata: PageMetadata): void => {
    const seoElements = document.querySelectorAll('[data-type="seo"]');
    seoElements &&
      seoElements.forEach(element => {
        element.remove();
      });

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
    const seoTitle: string = `${
      pageMetadata.title ? pageMetadata.title : title
    }${globalTitle ? globalTitle : ``}`;
    const seoDescription: string = pageMetadata.description
      ? pageMetadata.description
      : description;
    const seoBanner: string = pageMetadata.banner
      ? `${seoUrl}${pageMetadata.banner}`
      : `${seoUrl}${banner.url}`;
    const seoBannerAlt: string = pageMetadata.bannerAlt
      ? pageMetadata.bannerAlt
      : banner.alt;
    const seoContentType: string = pageMetadata.contentType
      ? pageMetadata.contentType
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

    const {head} = document;
    document.title = seoTitle;

    const setMetaTag = (
      attribute: string,
      type: string,
      data: string
    ): void => {
      const meta = <HTMLMetaElement>document.createElement('meta');
      meta.setAttribute(attribute, type);
      meta.setAttribute('content', data);
      meta.dataset.type = 'seo';
      head?.appendChild(meta);
    };

    setMetaTag('name', 'description', seoDescription);
    setMetaTag('name', 'image', seoBanner);

    Object.entries(twitterData).forEach(attribute => {
      setMetaTag(
        'name',
        `twitter:${attribute[0] === 'alt' ? 'image:alt' : attribute[0]}`,
        attribute[1]
      );
    });

    Object.entries(facebookData).forEach(attribute => {
      setMetaTag(
        'property',
        `${attribute[0] === 'alt' ? 'og:image:alt' : `og:${attribute[0]}`}`,
        attribute[1]
      );
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

    const script = <HTMLScriptElement>document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.innerHTML = JSON.stringify(schemaWebPage);
    script.dataset.type = 'seo';
    head?.appendChild(script);
  };
}
