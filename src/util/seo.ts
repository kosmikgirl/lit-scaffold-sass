import data from '../data/site/metadata.json';
import {FacebookData, PageMetadata, TwitterData} from '../data/type/index';
import {SeoAttribute, SeoType} from '../data/enum/index';

export default class SEO {
  public static setSiteMetadata = (pageMetadata: PageMetadata): void => {
    const {head} = document;
    if (!head) return;

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
    const seoTitle = `${pageMetadata.title ?? title}${globalTitle ?? ''}`;
    const seoDescription = pageMetadata.description ?? description;
    const seoBanner = `${seoUrl}${pageMetadata.banner ?? banner.url}`;
    const seoBannerAlt = pageMetadata.bannerAlt ?? banner.alt;
    const seoContentType = pageMetadata.contentType ?? 'Website';

    const twitterData: TwitterData = {
      card: 'summary',
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      image: seoBanner,
      alt: seoBannerAlt,
      site: social.twitter.user,
    };

    const facebookData: FacebookData = {
      type: seoContentType,
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      locale: language,
      image: seoBanner,
      imageAlt: seoBannerAlt,
      site_name: title,
    };

    document.title = seoTitle;

    const setMetaTag = (
      attribute: string,
      type: string,
      data: string
    ): void => {
      const meta = <HTMLMetaElement>document.createElement('meta');
      meta.setAttribute(attribute, type);
      meta.setAttribute(SeoAttribute.CONTENT, data);
      meta.dataset.type = 'seo';
      head.appendChild(meta);
    };

    setMetaTag(SeoAttribute.NAME, SeoType.DESCRIPTION, seoDescription);
    setMetaTag(SeoAttribute.NAME, SeoType.IMAGE, seoBanner);

    Object.entries(twitterData).forEach(attribute => {
      setMetaTag(
        SeoAttribute.NAME,
        `twitter:${attribute[0] === 'alt' ? 'image:alt' : attribute[0]}`,
        attribute[1]
      );
    });

    Object.entries(facebookData).forEach(attribute => {
      setMetaTag(
        SeoAttribute.PROPERTY,
        `${attribute[0] === 'alt' ? 'og:image:alt' : `og:${attribute[0]}`}`,
        attribute[1]
      );
    });

    const schemaWebPage = {
      '@context': 'http://schema.org',
      '@type': 'WebPage',
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
        '@type': 'ImageObject',
        url: logo,
      },
    };

    const script = <HTMLScriptElement>document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.innerHTML = JSON.stringify(schemaWebPage);
    script.dataset.type = 'seo';
    head.appendChild(script);
  };
}
