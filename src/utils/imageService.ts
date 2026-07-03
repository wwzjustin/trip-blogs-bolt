const photoMap: Record<string, string> = {
  'british museum': 'https://cdn.britannica.com/12/127112-050-F4DD3B7A/British-Museum-London.jpg',
  'westminster abbey': 'https://c8.alamy.com/comp/F09W8F/interior-of-westminster-abbey-london-uk-F09W8F.jpg',
  'tower of london': 'https://cdn.britannica.com/45/196945-050-CCF8BD5C/tower-of-London-on-the-River-Thames-London-England.jpg',
  'buckingham palace': 'https://cdn.britannica.com/00/129500-050-D622CD57/Buckingham-Palace-London.jpg',
  'big ben': 'https://cdn.britannica.com/90/94490-050-45C82D8D/view-Big-Ben-River-Thames-London.jpg',
  'london bridge': 'https://cdn.britannica.com/44/94444-050-9CA4B1C7/Tower-Bridge-London-England.jpg',
  'parliament': 'https://cdn.britannica.com/08/194808-050-3C9A95A5/Palace-of-Westminster-London-England.jpg',
  'edinburgh castle': 'https://cdn.britannica.com/24/94424-050-6302BA2E/Edinburgh-Castle-Scotland.jpg',
  'edinburgh': 'https://cdn.britannica.com/24/94424-050-6302BA2E/Edinburgh-Castle-Scotland.jpg',
  'royal mile': 'https://cdn.britannica.com/24/94424-050-6302BA2E/Edinburgh-Castle-Scotland.jpg',
  'bath': 'https://cdn.britannica.com/88/156588-050-2C7E5C89/Roman-Baths-Bath-England.jpg',
  'roman baths': 'https://cdn.britannica.com/88/156588-050-2C7E5C89/Roman-Baths-Bath-England.jpg',
  'oxford': 'https://cdn.britannica.com/03/117103-050-F4C2FC83/view-University-of-Oxford-England-Oxfordshire.jpg',
  'radcliffe': 'https://c8.alamy.com/comp/2C5DDAW/radcliffe-camera-bodleian-library-oxford-university-oxford-oxfordshire-england-united-kingdom-2C5DDAW.jpg',
  'bodleian': 'https://c8.alamy.com/comp/2C5DDAW/radcliffe-camera-bodleian-library-oxford-university-oxford-oxfordshire-england-united-kingdom-2C5DDAW.jpg',
  'christ church': 'https://c8.alamy.com/comp/E9KXTY/the-great-hall-christ-church-oxford-england-uk-E9KXTY.jpg',
  'cambridge': 'https://cdn.britannica.com/77/94477-050-2F31008E/Chapel-of-King-College-Cambridge-University-Cambridgeshire.jpg',
  'kings college': 'https://cdn.britannica.com/77/94477-050-2F31008E/Chapel-of-King-College-Cambridge-University-Cambridgeshire.jpg',
  'trinity college': 'https://englandrover.com/wp-content/uploads/2018/07/trinity-college-cambridge-1280x853.jpg',
  'stonehenge': 'https://cdn.britannica.com/34/143234-050-D0F3D195/Stonehenge-Wiltshire-England.jpg',
  'windsor castle': 'https://cdn.britannica.com/91/116791-050-095B7167/Windsor-Castle-Berkshire-England.jpg',
  'windsor': 'https://cdn.britannica.com/91/116791-050-095B7167/Windsor-Castle-Berkshire-England.jpg',
  'canterbury': 'https://cdn.britannica.com/48/94448-050-8D37F931/Cathedral-Canterbury-Kent-England.jpg',
  'cathedral': 'https://cdn.britannica.com/48/94448-050-8D37F931/Cathedral-Canterbury-Kent-England.jpg',
  'museum': 'https://cdn.britannica.com/12/127112-050-F4DD3B7A/British-Museum-London.jpg',
  'library': 'https://c8.alamy.com/comp/2C5DDAW/radcliffe-camera-bodleian-library-oxford-university-oxford-oxfordshire-england-united-kingdom-2C5DDAW.jpg',
  'church': 'https://cdn.britannica.com/48/94448-050-8D37F931/Cathedral-Canterbury-Kent-England.jpg',
  'castle': 'https://cdn.britannica.com/24/94424-050-6302BA2E/Edinburgh-Castle-Scotland.jpg',
  'palace': 'https://cdn.britannica.com/00/129500-050-D622CD57/Buckingham-Palace-London.jpg',
  'york': 'https://cdn.britannica.com/99/94499-050-F602FBAF/York-Minster-England.jpg',
  'minster': 'https://cdn.britannica.com/99/94499-050-F602FBAF/York-Minster-England.jpg',
  'lincoln': 'https://cdn.britannica.com/85/94485-050-B2A7D972/Cathedral-Lincoln-Lincolnshire-England.jpg',
  'whitby': 'https://cdn.britannica.com/67/213267-050-270E2F81/Whitby-Abbey-North-Yorkshire-England.jpg',
  'abbey': 'https://cdn.britannica.com/67/213267-050-270E2F81/Whitby-Abbey-North-Yorkshire-England.jpg',
  'lake district': 'https://cdn.britannica.com/43/94443-050-3B3E3CC3/Lake-Windermere-Lake-District-Cumbria-England.jpg',
  'windermere': 'https://cdn.britannica.com/43/94443-050-3B3E3CC3/Lake-Windermere-Lake-District-Cumbria-England.jpg',
  'manchester': 'https://cdn.britannica.com/84/94484-050-0D4F4F2F/Manchester-Cathedral-England.jpg',
  'glasgow': 'https://cdn.britannica.com/12/94512-050-D5B8D4BA/University-of-Glasgow-Scotland.jpg',
  'stratford': 'https://cdn.britannica.com/67/4467-050-11F97BAB/Birthplace-William-Shakespeare-Stratford-upon-Avon-England-Warwickshire.jpg',
  'shakespeare': 'https://cdn.britannica.com/67/4467-050-11F97BAB/Birthplace-William-Shakespeare-Stratford-upon-Avon-England-Warwickshire.jpg',
  'birthplace': 'https://cdn.britannica.com/67/4467-050-11F97BAB/Birthplace-William-Shakespeare-Stratford-upon-Avon-England-Warwickshire.jpg',
  'blenheim': 'https://cdn.britannica.com/16/94416-050-3B3C7BEA/Blenheim-Palace-Oxfordshire-England.jpg',
  'brighton': 'https://c8.alamy.com/comp/D69GA8/royal-pavilion-brighton-england-uk-D69GA8.jpg',
  'royal pavilion': 'https://c8.alamy.com/comp/D69GA8/royal-pavilion-brighton-england-uk-D69GA8.jpg',
  'pavilion': 'https://c8.alamy.com/comp/D69GA8/royal-pavilion-brighton-england-uk-D69GA8.jpg',
  'white cliffs': 'https://cdn.britannica.com/09/188409-050-9L3E8DD6/White-Cliffs-Dover-England.jpg',
  'dover': 'https://cdn.britannica.com/09/188409-050-9L3E8DD6/White-Cliffs-Dover-England.jpg',
  'cliffs': 'https://cdn.britannica.com/09/188409-050-9L3E8DD6/White-Cliffs-Dover-England.jpg',
  'captain cook': 'https://cdn.britannica.com/67/213267-050-270E2F81/Whitby-Abbey-North-Yorkshire-England.jpg',
  // Mexico — self-hosted in public/images/ (downloaded from Wikimedia Commons,
  // free-licensed; hotlinking upload.wikimedia.org gets rate-limited/ORB-blocked).
  // Specific keys before generic ones — matching iterates in insertion order.
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

  const seed = normalizedKeyword.replace(/[^a-z0-9]/g, '');
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

export const getAttractionImage = (attraction: { nameEn: string; imageKeyword?: string }): string => {
  const keyword = attraction.imageKeyword || attraction.nameEn;
  return getStockImage(keyword, 1200, 800);
};

export const getAttractionThumbnail = (attraction: { nameEn: string; imageKeyword?: string }): string => {
  const keyword = attraction.imageKeyword || attraction.nameEn;
  return getStockImage(keyword, 400, 300);
};
