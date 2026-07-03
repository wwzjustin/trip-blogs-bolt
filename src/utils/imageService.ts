// All landmark photos are self-hosted in public/images/ (downloaded from
// Wikimedia Commons, free-licensed, resized to 1200px). Hotlinking external
// CDNs (Britannica/Alamy/Wikimedia) fails: blocked, watermarked or
// rate-limited. Matching is longest-key-wins, so specific keys beat generics.
const photoMap: Record<string, string> = {
  // UK
  'windsor': '/images/uk-windsor.jpg',
  'oxford': '/images/uk-oxford.jpg',
  'radcliffe': '/images/uk-oxford.jpg',
  'bodleian': '/images/uk-bodleian.jpg',
  'christ church': '/images/uk-christ-church.jpg',
  'shakespeare': '/images/uk-shakespeare.jpg',
  'stratford': '/images/uk-shakespeare.jpg',
  'birthplace': '/images/uk-shakespeare.jpg',
  'blenheim': '/images/uk-blenheim.jpg',
  'lake district': '/images/uk-lake-district.jpg',
  'windermere': '/images/uk-lake-district.jpg',
  'manchester': '/images/uk-manchester.jpg',
  'edinburgh': '/images/uk-edinburgh-castle.jpg',
  'royal mile': '/images/uk-royal-mile.jpg',
  'glasgow': '/images/uk-glasgow.jpg',
  'whitby': '/images/uk-whitby.jpg',
  'captain cook': '/images/uk-captain-cook.jpg',
  'york': '/images/uk-york.jpg',
  'minster': '/images/uk-york-minster.jpg',
  'lincoln cathedral': '/images/uk-lincoln-cathedral.jpg',
  'lincoln castle': '/images/uk-lincoln-castle.jpg',
  'lincoln': '/images/uk-lincoln-cathedral.jpg',
  'cambridge': '/images/uk-kings-college.jpg',
  'kings college': '/images/uk-kings-college.jpg',
  'trinity college': '/images/uk-trinity-college.jpg',
  'seven sisters': '/images/uk-seven-sisters.jpg',
  'white cliffs': '/images/uk-seven-sisters.jpg',
  'cliffs': '/images/uk-seven-sisters.jpg',
  'brighton': '/images/uk-brighton.jpg',
  'royal pavilion': '/images/uk-brighton.jpg',
  'pavilion': '/images/uk-brighton.jpg',
  'westminster': '/images/uk-westminster.jpg',
  // generic fallbacks (insurance for future keywords)
  'castle': '/images/uk-edinburgh-castle.jpg',
  'palace': '/images/uk-blenheim.jpg',
  'cathedral': '/images/uk-lincoln-cathedral.jpg',
  'abbey': '/images/uk-whitby.jpg',
  'church': '/images/uk-christ-church.jpg',
  'library': '/images/uk-bodleian.jpg',
  'museum': '/images/mx-antropologia.jpg',
  // Mexico
  'chichen itza': '/images/mx-chichen-itza.jpg',
  'teotihuacan': '/images/mx-teotihuacan.jpg',
  'antropolog': '/images/mx-antropologia.jpg',
  'chapultepec': '/images/mx-chapultepec.jpg',
  'zocalo': '/images/mx-zocalo.jpg',
  'templo mayor': '/images/mx-templo-mayor.jpg',
  'xochimilco': '/images/mx-xochimilco.jpg',
  'guadalupe': '/images/mx-guadalupe.jpg',
  'coyoacan': '/images/mx-coyoacan.jpg',
  'estadio olimpico': '/images/mx-estadio-olimpico.jpg',
  'las coloradas': '/images/mx-las-coloradas.jpg',
  'lagartos': '/images/mx-lagartos.jpg',
  'musa': '/images/mx-musa.jpg',
  'isla mujeres': '/images/mx-isla-mujeres.jpg',
  'delfines': '/images/mx-cancun.jpg',
  'cancun': '/images/mx-cancun.jpg',
  'cenote': '/images/mx-cenote.jpg',
  'revolucion': '/images/mx-revolucion.jpg',
  'arte moderno': '/images/mx-arte-moderno.jpg',
  'bellas artes': '/images/mx-bellas-artes.jpg',
};

export const getStockImage = (keyword: string, width = 800, height = 600): string => {
  // '+' is the documented word separator in imageKeyword — normalize it so
  // multi-word photoMap keys ('chichen itza') match '+'-joined keywords.
  const normalizedKeyword = keyword.toLowerCase().replace(/\+/g, ' ');

  // Longest key wins: 'chapultepec castle' must match 'chapultepec' (specific),
  // not the generic 'castle'.
  const matchedPhoto = Object.entries(photoMap)
    .sort(([a], [b]) => b.length - a.length)
    .find(([key]) => normalizedKeyword.includes(key));

  if (matchedPhoto) {
    return matchedPhoto[1];
  }

  // No curated photo — quiet placeholder in the site palette (random stock
  // photos of the wrong subject are worse than none).
  return (
    `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"%3E` +
    `%3Crect width="${width}" height="${height}" fill="%23f2f4f4"/%3E` +
    `%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(
      height / 14
    )}" fill="%239aa0a1"%3E${encodeURIComponent(keyword.replace(/\+/g, ' '))}%3C/text%3E%3C/svg%3E`
  );
};

export const getAttractionImage = (attraction: { nameEn: string; imageKeyword?: string }): string => {
  const keyword = attraction.imageKeyword || attraction.nameEn;
  return getStockImage(keyword, 1200, 800);
};

export const getAttractionThumbnail = (attraction: { nameEn: string; imageKeyword?: string }): string => {
  const keyword = attraction.imageKeyword || attraction.nameEn;
  return getStockImage(keyword, 400, 300);
};
