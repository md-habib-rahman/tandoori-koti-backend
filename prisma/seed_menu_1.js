import prisma from "../src/config/db.js";

// ---------------------------------------------------------------
// Categories (EN + FI) – reused with spread: ...C.starters
// ---------------------------------------------------------------
const C = {
  starters: { categoryEn: "Starters", categoryFi: "Alkuruoat" },
  veg: { categoryEn: "Vegetarian Main Courses", categoryFi: "Kasvispääruoat" },
  sizzling: { categoryEn: "Sizzling", categoryFi: "Sizzlerit" },
  lamb: { categoryEn: "Lamb Main Courses", categoryFi: "Lammaspääruoat" },
  beef: { categoryEn: "Beef Main Courses", categoryFi: "Nautapääruoat" },
  chicken: { categoryEn: "Chicken Main Courses", categoryFi: "Kanapääruoat" },
  seafood: { categoryEn: "Seafood", categoryFi: "Merenelävät" },
  rice: { categoryEn: "Rice", categoryFi: "Riisit" },
  naan: { categoryEn: "Naan Breads", categoryFi: "Naan-leivät" },
  desserts: { categoryEn: "Desserts", categoryFi: "Jälkiruoat" },
  tea: { categoryEn: "Tea", categoryFi: "Tee" },
  drinks: { categoryEn: "Drinks", categoryFi: "Juomat" },
};

// ---------------------------------------------------------------
// Image URLs (unchanged from the old seed)
// ---------------------------------------------------------------
const u = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

const IMG = {
  indianA: u("photo-1601050690597-df0568f70950"),
  indianB: u("photo-1599488615731-7e5c2823ff28"),
  prawn: u("photo-1565557623262-b51c2513a641"),
  chicken: u("photo-1626777552726-4a6b54c97e46"),
  chicken65: u("photo-1610057099443-fde8c4d50f91"),
  curryVeg: u("photo-1546833999-b9f581a1996d"),
  korma: u("photo-1585937421612-70a008356fbe"),
  paneerRed: u("photo-1631452180519-c014fe946bc7"),
  sizzler: u("photo-1555939594-58d7cb561ad1"),
  fish: u("photo-1519708227418-c8fd9a32b7a2"),
  lamb: u("photo-1545247181-516773cae754"),
  beef: u("photo-1534939561126-855b8675edd7"),
  butterChicken: u("photo-1603894584373-5ac82b2ae398"),
  alooGobi: u("photo-1589301760014-d929f3979dbc"),
  basmati: u("photo-1516684732162-798a0062be99"),
  biryani: u("photo-1563379091339-03b21ab4a4f8"),
  naan: u("photo-1626074353765-517a681e40be"),
  gulab: u("photo-1596797038530-2c107229654b"),
  kulfi: u("photo-1505394033641-40c6ad1178d7"),
  sorbet: u("photo-1563805042-7684c019e1cb"),
  iceCream: u("photo-1497034825429-c343d7c6a68f"),
  chai: u("photo-1576092768241-dec231879fc3"),
  blackTea: u("photo-1594631252845-29fc4cc8cde9"),
  greenTea: u("photo-1627435601361-ec25f5b1d0e5"),
  softDrink: u("photo-1622483767028-3f66f32aef97"),
  lassi: u("photo-1528498033373-3c6c08e93d79"),
};

// ---------------------------------------------------------------
// NEW FIELDS per dish:
//   storyEn / storyFi        -> optional (null = no story shown)
//   servings                 -> optional Int
//   portionLabelEn / Fi      -> optional String
// NOTE: servings / portion labels below are sensible defaults.
// Adjust them to the restaurant's real portion sizes.
// ---------------------------------------------------------------
const menuItems = [
  // ==========================================
  // 1. STARTERS / ALKURUOAT
  // ==========================================
  {
    ...C.starters,
    nameEn: "Paneer Pakora",
    nameFi: "Paneer Pakora",
    preparationEn:
      "Deep-fried Indian cottage cheese fritters coated in spiced gram flour batter.",
    preparationFi:
      "Friteerattua tuorejuustoa maustetussa kikhernejauhotaikinassa.",
    storyEn:
      "Pakoras are a beloved street snack across India, traditionally enjoyed with a hot cup of chai during monsoon rains.",
    storyFi:
      "Pakorat ovat rakastettu intialainen katuruoka, jota nautitaan perinteisesti kuuman chai-teen kera monsuunisateella.",
    price: 7.0,
    servings: 1,
    portionLabelEn: "6 pcs",
    portionLabelFi: "6 kpl",
    imageUrl: IMG.indianA,
  },
  {
    ...C.starters,
    nameEn: "Fish Pakora",
    nameFi: "Fish Pakora",
    preparationEn:
      "Crisp, deep-fried spiced fish fillets coated in seasoned batter.",
    preparationFi: "Rapeaksi friteerattua maustettua kalafileetä.",
    storyEn:
      "Fish fritters in spiced chickpea batter are a classic of Punjabi cooking, especially popular in the cooler months.",
    storyFi:
      "Kalapakorat kikhernejauhotaikinassa ovat punjabilaisen keittiön klassikko, erityisesti viileämpinä vuodenaikoina.",
    price: 8.0,
    servings: 1,
    portionLabelEn: "6 pcs",
    portionLabelFi: "6 kpl",
    imageUrl: IMG.indianB,
  },
  {
    ...C.starters,
    nameEn: "Prawn Puri",
    nameFi: "Prawn Puri",
    preparationEn:
      "Juicy spiced prawns cooked with herbs and served on fried Indian puri bread.",
    preparationFi:
      "Mausteisia meheviä katkarapuja tarjoiltuna paistetun intialaisen puri-leivän päällä.",
    storyEn:
      "A coastal Indian favourite where spiced prawns are served on puffed, golden puri bread.",
    storyFi:
      "Rannikon intialainen suosikki, jossa mausteiset katkaravut tarjoillaan kullanruskean, pullistuvan puri-leivän päällä.",
    price: 8.9,
    servings: 1,
    portionLabelEn: "1 portion",
    portionLabelFi: "1 annos",
    imageUrl: IMG.prawn,
  },
  {
    ...C.starters,
    nameEn: "Chicken Pakora",
    nameFi: "Chicken Pakora",
    preparationEn:
      "Tender chicken pieces coated in seasoned chickpea batter and deep-fried.",
    preparationFi:
      "Mureita kanapaloja maustetussa kikhernejauhotaikinassa friteerattuna.",
    storyEn:
      "A crunchy snack made with chicken in a spiced gram flour coating, a favourite at Indian tea-time and celebrations.",
    storyFi:
      "Rapea välipala, jossa kana on maustetussa kikhernejauhopanerouksessa – suosikki intialaisella teehetkellä ja juhlissa.",
    price: 7.5,
    servings: 1,
    portionLabelEn: "6 pcs",
    portionLabelFi: "6 kpl",
    imageUrl: IMG.chicken,
  },
  {
    ...C.starters,
    nameEn: "Chicken 65",
    nameFi: "Chicken 65",
    preparationEn:
      "Crispy, spicy South Indian fried chicken tossed with curry leaves and green chilies.",
    preparationFi:
      "Rapeaa ja tulista eteläintialaista kanaa paistettuna currylehtien ja chilin kera.",
    storyEn:
      "A fiery South Indian classic from Chennai. Its curious name is the subject of many legends, and it remains a favourite bar snack.",
    storyFi:
      "Tulinen eteläintialainen klassikko Chennaista. Sen erikoisesta nimestä kerrotaan monia tarinoita, ja se on edelleen suosittu naposteltava.",
    price: 9.0,
    servings: 1,
    portionLabelEn: "Approx. 200 g",
    portionLabelFi: "Noin 200 g",
    imageUrl: IMG.chicken65,
  },
  {
    ...C.starters,
    nameEn: "Chicken Tikka",
    nameFi: "Chicken Tikka",
    preparationEn:
      "Boneless chicken chunks marinated in yogurt and tandoori spices, char-grilled.",
    preparationFi:
      "Jogurtissa ja tandoorimausteissa marinoituja tandoorissa grillattuja kanapaloja.",
    storyEn:
      "Tikka means 'pieces' – marinated chicken cooked in the clay tandoor, a technique rooted in the Punjab region.",
    storyFi:
      "Tikka tarkoittaa 'paloja' – marinoitua kanaa kypsennettynä savitandoorissa, tekniikka on peräisin Punjabin alueelta.",
    price: 9.0,
    servings: 1,
    portionLabelEn: "6 pcs",
    portionLabelFi: "6 kpl",
    imageUrl: IMG.indianB,
  },
  {
    ...C.starters,
    nameEn: "Mushroom Tikka",
    nameFi: "Mushroom Tikka",
    preparationEn:
      "Fresh button mushrooms marinated in aromatic spices and skewered in the tandoor.",
    preparationFi:
      "Tuoreita herkkusieniä marinoituna aromaattisissa mausteissa ja grillattuna tandoorissa.",
    storyEn:
      "A vegetarian take on the tandoori tikka tradition, where juicy mushrooms soak up smoky spices.",
    storyFi:
      "Kasvisversio tandoori-tikan perinteestä, jossa mehevät herkkusienet imevät itseensä savuisia mausteita.",
    price: 8.5,
    servings: 1,
    portionLabelEn: "6 pcs",
    portionLabelFi: "6 kpl",
    imageUrl: IMG.indianA,
  },
  {
    ...C.starters,
    nameEn: "Vegetable Samosa (2 pcs)",
    nameFi: "Kasvissamosa (2 kpl)",
    preparationEn:
      "Crispy triangular pastries stuffed with spiced potatoes, green peas, and herbs.",
    preparationFi:
      "Rapeita leivonnaisia maustetulla peruna-, herne- ja yrttitäytteellä.",
    storyEn:
      "The samosa is one of India's most iconic snacks, a golden pastry filled with spiced potatoes and peas.",
    storyFi:
      "Samosa on yksi Intian tunnetuimmista välipaloista: kullanruskea leivonnainen, jonka täytteenä on maustettua perunaa ja herneitä.",
    price: 7.0,
    servings: 1,
    portionLabelEn: "2 pcs",
    portionLabelFi: "2 kpl",
    imageUrl: IMG.indianA,
  },
  {
    ...C.starters,
    nameEn: "Samosa Chana Chaat",
    nameFi: "Samosa Chana Chaat",
    preparationEn:
      "Crushed vegetable samosa topped with spiced chickpea curry, yogurt, and chutneys.",
    preparationFi:
      "Kasvissamosaa mausteisen kikhernecurryn, jogurtin ja tamarindikastikkeen kera.",
    storyEn:
      "Chaat is Indian street food at its best – a playful mix of crunchy, creamy, tangy and spicy flavours.",
    storyFi:
      "Chaat on intialaista katuruokaa parhaimmillaan – leikkisä sekoitus rapeaa, kermaista, happamaa ja mausteista.",
    price: 8.5,
    servings: 1,
    portionLabelEn: "1 portion",
    portionLabelFi: "1 annos",
    imageUrl: IMG.indianA,
  },

  // ==========================================
  // 2. VEGETARIAN MAIN COURSES / KASVISPÄÄRUOAT
  // ==========================================
  {
    ...C.veg,
    nameEn: "Palak Paneer",
    nameFi: "Palak Paneer",
    preparationEn:
      "Fresh cottage cheese cubes cooked in a spiced, creamy spinach puree.",
    preparationFi:
      "Tuorejuustoa pehmeässä ja mausteisessa pinaattikastikkeessa.",
    storyEn:
      "A North Indian favourite pairing soft paneer with silky spinach, loved by vegetarians and meat-eaters alike.",
    storyFi:
      "Pohjois-Intian suosikki, jossa pehmeä paneeri yhdistyy silkkiseen pinaattiin – rakastettu niin kasvissyöjien kuin lihansyöjienkin keskuudessa.",
    price: 15.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.indianA,
  },
  {
    ...C.veg,
    nameEn: "Mix Vegetable Curry",
    nameFi: "Sekavihannescurry",
    preparationEn:
      "Assorted seasonal vegetables simmered in a traditional Indian spiced curry sauce.",
    preparationFi:
      "Kauden kasviksia perinteisessä mausteisessa intialaisessa currykastikkeessa.",
    storyEn:
      "An everyday home-style curry found on tables across India, made with whatever vegetables are in season.",
    storyFi:
      "Arkinen kotitekoinen curry, jota tarjoillaan kaikkialla Intiassa – valmistettu kauden kasviksista.",
    price: 15.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.curryVeg,
  },
  {
    ...C.veg,
    nameEn: "Vegetable Korma",
    nameFi: "Kasviskorma",
    preparationEn:
      "Mixed vegetables gently cooked in a mild, velvety cashew and coconut cream sauce.",
    preparationFi:
      "Vihanneksia miedossa, kermaisessa cashew- ja kookoskermakastikkeessa.",
    storyEn:
      "Korma comes from the royal Mughal kitchens, where slow braising in nuts and cream created dishes fit for emperors.",
    storyFi:
      "Korma on peräisin Mughal-hallitsijoiden keittiöistä, joissa hidas haudutus pähkinöissä ja kermassa loi keisarin arvoisia ruokia.",
    price: 15.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.korma,
  },
  {
    ...C.veg,
    nameEn: "Vegetable Jalfrezi",
    nameFi: "Kasvis Jalfrezi",
    preparationEn:
      "Stir-fried vegetables with onions, bell peppers, tomatoes, and spicy gravy.",
    preparationFi:
      "Paistettuja vihanneksia sipulin, paprikan ja tulisen tomaattikastikkeen kera.",
    storyEn:
      "Jalfrezi means 'hot fry' – a quick, vibrant stir-fry style that was originally a clever way to use up leftovers.",
    storyFi:
      "Jalfrezi tarkoittaa 'tulista paistoa' – nopea ja värikäs paistotyyli, joka sai alkunsa tähteiden hyödyntämisestä.",
    price: 15.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.curryVeg,
  },
  {
    ...C.veg,
    nameEn: "Shahi Paneer",
    nameFi: "Shahi Paneer",
    preparationEn:
      "Cottage cheese simmered in a royal, rich tomato, cashew nut, and cream sauce.",
    preparationFi:
      "Tuorejuustoa kuninkaallisessa, kermaisessa tomaatti- ja cashew-pähkinäkastikkeessa.",
    storyEn:
      "'Shahi' means royal. This rich dish reflects the Mughal love of cream, nuts and gentle spices.",
    storyFi:
      "'Shahi' tarkoittaa kuninkaallista. Tämä täyteläinen ruoka kuvastaa mughalien rakkautta kermaan, pähkinöihin ja hienovaraisiin mausteisiin.",
    price: 16.0,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.paneerRed,
  },
  {
    ...C.veg,
    nameEn: "Kadai Paneer",
    nameFi: "Kadai Paneer",
    preparationEn:
      "Cottage cheese stir-fried with bell peppers, onions, and freshly roasted spices.",
    preparationFi:
      "Tuorejuustoa paistettuna paprikan, sipulin ja vastajauhettujen mausteiden kera.",
    storyEn:
      "Named after the kadai, a traditional Indian wok, this dish is known for its freshly ground coriander and chili.",
    storyFi:
      "Nimensä on saanut kadai-wokista, ja ruoka tunnetaan vastajauhetusta korianterista ja chilistä.",
    price: 16.0,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.indianA,
  },
  {
    ...C.veg,
    nameEn: "Paneer Mushroom Curry",
    nameFi: "Paneer-sienicurry",
    preparationEn:
      "Fresh cottage cheese and button mushrooms cooked in an aromatic herb curry.",
    preparationFi:
      "Tuorejuustoa ja herkkusieniä kypsennettynä mausteisessa yrtti-currykastikkeessa.",
    storyEn:
      "A hearty vegetarian curry where soft paneer and earthy mushrooms meet in a fragrant herb sauce.",
    storyFi:
      "Täyteläinen kasviscurry, jossa pehmeä paneeri ja maanläheiset herkkusienet kohtaavat tuoksuvassa yrttikastikkeessa.",
    price: 16.0,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.curryVeg,
  },
  {
    ...C.veg,
    nameEn: "Aloo Gobi Masala",
    nameFi: "Aloo Gobi Masala",
    preparationEn:
      "Potatoes and cauliflower florets sautéed with ginger, garlic, and ground spices.",
    preparationFi:
      "Perunaa ja kukkakaalia haudutettuna inkiväärin, valkosipulin ja mausteiden kera.",
    storyEn:
      "'Aloo' is potato and 'gobi' is cauliflower – a comforting, home-cooked dish loved across North India.",
    storyFi:
      "'Aloo' tarkoittaa perunaa ja 'gobi' kukkakaalia – lohdullinen kotiruoka, jota rakastetaan kaikkialla Pohjois-Intiassa.",
    price: 14.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.alooGobi,
  },
  {
    ...C.veg,
    nameEn: "Aloo Palak",
    nameFi: "Aloo Palak",
    preparationEn:
      "Diced tender potatoes cooked in a smooth, flavorful spinach gravy.",
    preparationFi:
      "Perunakuutioita maukkaassa maustetussa pinaattikastikkeessa.",
    storyEn:
      "A simple and nourishing everyday dish pairing soft potatoes with fresh spinach.",
    storyFi:
      "Yksinkertainen ja ravitseva arkiruoka, jossa pehmeät perunat yhdistyvät tuoreeseen pinaattiin.",
    price: 14.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.indianA,
  },
  {
    ...C.veg,
    nameEn: "Chana Masala",
    nameFi: "Chana Masala",
    preparationEn:
      "Chickpeas simmered with tomatoes, onions, garlic, and authentic Punjabi spices.",
    preparationFi:
      "Kikherneitä tomaatti-sipulikastikkeessa aidoilla punjabilaisilla mausteilla.",
    storyEn:
      "A staple of Punjabi kitchens, traditionally served with bhature or rice and enjoyed from street stalls to family tables.",
    storyFi:
      "Punjabilaisten keittiöiden peruspilari, jota tarjoillaan perinteisesti bhature-leivän tai riisin kanssa katukojuista perheen pöytään.",
    price: 14.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.korma,
  },
  {
    ...C.veg,
    nameEn: "Paneer Butter Masala",
    nameFi: "Paneer Butter Masala",
    preparationEn:
      "Cottage cheese pieces bathed in a smooth, rich tomato butter cream sauce.",
    preparationFi:
      "Tuorejuustoa pehmeässä ja täyteläisessä tomaatti-voikermakastikkeessa.",
    storyEn:
      "The vegetarian cousin of butter chicken, with the same velvety tomato and butter sauce wrapped around soft paneer.",
    storyFi:
      "Voikanan kasvisserkku, jossa sama samettinen tomaatti-voikastike ympäröi pehmeää paneeria.",
    price: 16.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.paneerRed,
  },
  {
    ...C.veg,
    nameEn: "Paneer Tikka Masala",
    nameFi: "Paneer Tikka Masala",
    preparationEn:
      "Tandoori-grilled spiced cottage cheese cubes served in a rich masala sauce.",
    preparationFi:
      "Tandoorigrillattuja marinoituja tuorejuustopaloja mausteisessa masalakastikkeessa.",
    storyEn:
      "Smoky tandoor-grilled paneer meets a rich masala sauce, a modern classic of Indian restaurant cooking.",
    storyFi:
      "Savuinen tandoorissa grillattu paneeri kohtaa täyteläisen masalakastikkeen – intialaisen ravintolakeittiön moderni klassikko.",
    price: 16.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.indianA,
  },

  // ==========================================
  // 3. SIZZLING / SIZZLERIT
  // ==========================================
  {
    ...C.sizzling,
    nameEn: "Mix Grill Sizzler",
    nameFi: "Mix Grill Sizzler",
    preparationEn:
      "Assorted tandoori chicken, juicy lamb, and king prawns served on a piping hot sizzler.",
    preparationFi:
      "Valikoima tandoorikanaa, lammasta ja jättikatkarapuja kuumalla parilalla.",
    storyEn:
      "A celebratory platter of tandoori favourites, served sizzling at the table for a dramatic start to the meal.",
    storyFi:
      "Juhlava tandoori-herkkujen lautanen, joka tarjoillaan tirisevänä pöytään näyttävänä aloituksena ateriaan.",
    price: 22.5,
    servings: 1,
    portionLabelEn: "1 sizzler plate",
    portionLabelFi: "1 sizzler-lautanen",
    imageUrl: IMG.sizzler,
  },
  {
    ...C.sizzling,
    nameEn: "Tandoori King Prawn Sizzler",
    nameFi: "Tandoori King Prawn Sizzler",
    preparationEn:
      "Jumbo king prawns marinated in tandoori spices and roasted, served sizzling.",
    preparationFi:
      "Tandoorimarinoituja ja paahdettuja jättikatkarapuja tirisevällä parilalla.",
    storyEn:
      "Large king prawns marinated in tandoori spices and served on a hot plate that fills the room with aroma.",
    storyFi:
      "Tandoorimausteisiin marinoituja jättikatkarapuja kuumalla parilalla, joka täyttää huoneen tuoksulla.",
    price: 22.0,
    servings: 1,
    portionLabelEn: "1 sizzler plate",
    portionLabelFi: "1 sizzler-lautanen",
    imageUrl: IMG.prawn,
  },
  {
    ...C.sizzling,
    nameEn: "Tandoori Mix Tikka Sizzler",
    nameFi: "Tandoori Mix Tikka Sizzler",
    preparationEn:
      "Tandoori chicken tikka, lamb tikka, and paneer tikka served on a sizzling hot plate.",
    preparationFi:
      "Kanan, lampaan ja tuorejuuston tikkapaloja tirisevällä parilalla.",
    storyEn:
      "A tasting of three tikkas – chicken, lamb and paneer – brought sizzling to your table.",
    storyFi:
      "Kolmen tikan maistelu – kana, lammas ja paneeri – tuotuna tirisevänä pöytääsi.",
    price: 20.5,
    servings: 1,
    portionLabelEn: "1 sizzler plate",
    portionLabelFi: "1 sizzler-lautanen",
    imageUrl: IMG.indianB,
  },
  {
    ...C.sizzling,
    nameEn: "Fish Tikka Sizzler",
    nameFi: "Fish Tikka Sizzler",
    preparationEn:
      "Spiced fish fillets grilled in clay tandoor and served on a bed of sautéed onions.",
    preparationFi:
      "Maustettuja tandoorissa grillattuja kalafileitä kuumalla sipulipedillä.",
    storyEn:
      "Tender fish marinated in aromatic spices and grilled in the tandoor, served on caramelised onions.",
    storyFi:
      "Aromaattisiin mausteisiin marinoitua mureaa kalaa grillattuna tandoorissa, tarjoiltuna karamellisoitujen sipulien päällä.",
    price: 20.5,
    servings: 1,
    portionLabelEn: "1 sizzler plate",
    portionLabelFi: "1 sizzler-lautanen",
    imageUrl: IMG.fish,
  },
  {
    ...C.sizzling,
    nameEn: "Vegetarian Sizzler",
    nameFi: "Kasvis Sizzler",
    preparationEn:
      "Grilled paneer, button mushrooms, and seasoned vegetables served sizzling hot.",
    preparationFi:
      "Grillattua paneeria, herkkusieniä ja maustettuja kasviksia tirisevällä parilalla.",
    storyEn:
      "A colourful vegetarian grill of paneer, mushrooms and vegetables, served with the same sizzling show as the meat sizzlers.",
    storyFi:
      "Värikäs kasvisgrilli paneerista, sienistä ja kasviksista, tarjoiltuna samalla tirisevällä näyttävyydellä kuin lihasizzlerit.",
    price: 18.5,
    servings: 1,
    portionLabelEn: "1 sizzler plate",
    portionLabelFi: "1 sizzler-lautanen",
    imageUrl: IMG.indianA,
  },

  // ==========================================
  // 4. LAMB MAIN COURSES / LAMMASPÄÄRUOAT
  // ==========================================
  {
    ...C.lamb,
    nameEn: "Mutton Rogan Josh",
    nameFi: "Mutton Rogan Josh",
    preparationEn:
      "Tender lamb pieces simmered in rich gravy with Kashmiri red chilies and aromatics.",
    preparationFi:
      "Mureaa lammasta kashmirilaisessa aromaattisessa punaisessa yrttikastikkeessa.",
    storyEn:
      "Rogan Josh is the signature dish of Kashmir, coloured deep red by Kashmiri chilies and slow-cooked until tender.",
    storyFi:
      "Rogan Josh on Kashmirin tunnusruoka, jonka syvän punaisen värin antavat kashmirilaiset chilit ja jota haudutetaan hitaasti mureaksi.",
    price: 18.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.lamb,
  },
  {
    ...C.lamb,
    nameEn: "Lamb Korma",
    nameFi: "Lamb Korma",
    preparationEn:
      "Tender lamb simmered in a mild, creamy sauce made of cashews, almonds, and cream.",
    preparationFi:
      "Mureaa lammasta miedossa ja kermaisessa cashew-mantelikastikkeessa.",
    storyEn:
      "A refined Mughal-style curry where lamb is braised gently in a silky sauce of nuts and cream.",
    storyFi:
      "Hienostunut mughal-tyylinen curry, jossa lammasta haudutetaan hellävaraisesti pähkinöistä ja kermasta tehdyssä silkkisessä kastikkeessa.",
    price: 18.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.korma,
  },
  {
    ...C.lamb,
    nameEn: "Lamb Spinach",
    nameFi: "Lamb Spinach (Pinaattilammas)",
    preparationEn:
      "Tender lamb chunks cooked with fresh pureed spinach, garlic, and warming spices.",
    preparationFi:
      "Mureaa lammasta tuoreessa maustetussa pinaatti-valkosipulikastikkeessa.",
    storyEn:
      "Known in India as Saag Gosht, a hearty pairing of lamb and spinach from the Punjab.",
    storyFi:
      "Intiassa Saag Gosht -nimellä tunnettu täyteläinen lampaan ja pinaatin yhdistelmä Punjabista.",
    price: 18.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.lamb,
  },
  {
    ...C.lamb,
    nameEn: "Butter Mutton Curry",
    nameFi: "Butter Mutton Curry",
    preparationEn:
      "Tender lamb pieces cooked in a luxurious butter, tomato, and cream sauce.",
    preparationFi:
      "Mureaa lammasta täyteläisessä tomaatti-, voi- ja kermakastikkeessa.",
    storyEn:
      "Inspired by the famous butter chicken, this version swaps in lamb for a deeper, richer flavour.",
    storyFi:
      "Kuuluisan voikanan innoittama versio, jossa kana on vaihdettu lampaaseen syvemmän ja täyteläisemmän maun saamiseksi.",
    price: 18.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.lamb,
  },
  {
    ...C.lamb,
    nameEn: "Lamb Jalfrezi",
    nameFi: "Lamb Jalfrezi",
    preparationEn:
      "Lamb pieces cooked with stir-fried bell peppers, onions, tomatoes, and chilies.",
    preparationFi:
      "Lammasta paistettuna paprikan, sipulin, tomaatin ja tuoreen chilin kera.",
    storyEn:
      "A lively stir-fry curry with crisp peppers and onions, finished with a fresh chili kick.",
    storyFi:
      "Eloisa paistettu curry rapeine paprikoineen ja sipuleineen, viimeisteltynä tuoreella chilin potkulla.",
    price: 18.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.lamb,
  },
  {
    ...C.lamb,
    nameEn: "Mutton Tikka Masala",
    nameFi: "Mutton Tikka Masala",
    preparationEn:
      "Tandoori-grilled marinated lamb pieces served in a zesty, spiced masala sauce.",
    preparationFi:
      "Tandoorissa grillattua marinoitua lammasta mausteisessa masalakastikkeessa.",
    storyEn:
      "Marinated lamb is first grilled in the tandoor, then finished in a rich masala sauce for a smoky depth of flavour.",
    storyFi:
      "Marinoitu lammas grillataan ensin tandoorissa ja viimeistellään täyteläisessä masalakastikkeessa savuisen syvän maun saamiseksi.",
    price: 19.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.lamb,
  },
  {
    ...C.lamb,
    nameEn: "Lamb Vindaloo",
    nameFi: "Lamb Vindaloo",
    preparationEn:
      "Very spicy Goan curry of lamb cooked with potatoes, vinegar, and hot chili paste.",
    preparationFi:
      "Erittäin tulista lammasta etikka-chilikastikkeessa perunoiden kera.",
    storyEn:
      "Vindaloo comes from Goa, where Portuguese wine-and-garlic cooking merged with Indian chilies into a famously fiery curry.",
    storyFi:
      "Vindaloo on kotoisin Goasta, jossa portugalilainen viini-valkosipulikeittiö sulautui intialaisiin chileihin ja synnytti kuuluisan tulisen curryn.",
    price: 18.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.lamb,
  },

  // ==========================================
  // 5. BEEF MAIN COURSES / NAUTAPÄÄRUOAT
  // ==========================================
  {
    ...C.beef,
    nameEn: "Beef Vindaloo",
    nameFi: "Nautaa Vindaloo",
    preparationEn:
      "Fiery hot beef curry with vinegar, red chilies, and soft potatoes.",
    preparationFi:
      "Erittäin tulista nautaa tulisessa chili-etikkakastikkeessa perunan kera.",
    storyEn:
      "A Goan classic shaped by Portuguese influence, with a sharp tang of vinegar and plenty of chili heat.",
    storyFi:
      "Goalainen klassikko, jossa on portugalilaista vaikutetta: terävä etikan happamuus ja runsaasti chilin tulisuutta.",
    price: 17.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.beef,
  },
  {
    ...C.beef,
    nameEn: "Traditional Beef Curry",
    nameFi: "Perinteinen nautacurry",
    preparationEn:
      "Tender beef chunks simmered slowly in an authentic Indian spiced onion curry.",
    preparationFi:
      "Mureita naudanlihapaloja haudutettuna perinteisessä intialaisessa maustekastikkeessa.",
    storyEn:
      "A slow-simmered, home-style beef curry built on caramelised onions and a warm blend of spices.",
    storyFi:
      "Hitaasti haudutettu kotitekoinen nautacurry, jonka pohjana ovat karamellisoidut sipulit ja lämmin mausteseos.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.beef,
  },
  {
    ...C.beef,
    nameEn: "Beef Korma",
    nameFi: "Nautaa Korma",
    preparationEn:
      "Tender beef cooked gently in a mild, silky cashew and cream curry.",
    preparationFi:
      "Mureaa nautaa miedossa ja kermaisessa cashew-pähkinäkastikkeessa.",
    storyEn:
      "A mild and creamy korma in the Mughal tradition, ideal for those who prefer gentle flavours.",
    storyFi:
      "Mieto ja kermainen korma mughal-perinteen mukaan, ihanteellinen niille, jotka pitävät lempeistä mauista.",
    price: 17.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.korma,
  },
  {
    ...C.beef,
    nameEn: "Madras Beef Curry",
    nameFi: "Madras Nautacurry",
    preparationEn:
      "Spicy South Indian beef curry with mustard seeds, coconut, and curry leaves.",
    preparationFi:
      "Tulista eteläintialaista nautacurrya sinapinsiemenillä, kookoksella ja currylehdillä.",
    storyEn:
      "Madras-style curries come from South India, known for mustard seeds, curry leaves and a warming chili heat.",
    storyFi:
      "Madras-tyyliset currya ovat kotoisin Etelä-Intiasta, ja ne tunnetaan sinapinsiemenistä, currylehdistä ja lämmittävästä chilin tulisuudesta.",
    price: 17.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.beef,
  },
  {
    ...C.beef,
    nameEn: "Mughlai Beef Curry",
    nameFi: "Mughlai Nautacurry",
    preparationEn:
      "Tender beef cubes cooked in an opulent Mughlai style spiced cream gravy.",
    preparationFi:
      "Täyteläistä nautaa kuninkaallisessa Mughlai-tyylisessä maustekermakastikkeessa.",
    storyEn:
      "Inspired by the imperial Mughal courts, with a rich, aromatic cream sauce.",
    storyFi:
      "Mughal-hovien inspiroima ruoka, jossa on täyteläinen ja aromaattinen kermakastike.",
    price: 17.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.beef,
  },
  {
    ...C.beef,
    nameEn: "Beef Chilli Garlic",
    nameFi: "Nautaa valkosipuli-chili",
    preparationEn:
      "Beef strips sautéed with sliced fresh garlic, hot green chilies, and onions.",
    preparationFi:
      "Nautasuikaleita paistettuna tuoreen valkosipulin, tulisen chilin ja sipulin kera.",
    storyEn:
      "A bold, quick-cooked dish where fresh garlic and green chili take centre stage.",
    storyFi:
      "Rohkea ja nopeasti valmistuva ruoka, jossa tuore valkosipuli ja vihreä chili ovat pääosassa.",
    price: 17.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.beef,
  },
  {
    ...C.beef,
    nameEn: "Mushroom Beef Curry",
    nameFi: "Nautaa herkkusienillä",
    preparationEn:
      "Tender beef chunks and fresh button mushrooms simmered in curry sauce.",
    preparationFi:
      "Mureaa naudanlihaa ja tuoreita herkkusieniä mausteisessa currykastikkeessa.",
    storyEn:
      "Earthy mushrooms soak up the curry sauce alongside slow-cooked beef for a comforting main.",
    storyFi:
      "Maanläheiset herkkusienet imevät currykastiketta hitaasti haudutetun naudanlihan seurassa – lohdullinen pääruoka.",
    price: 17.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.beef,
  },
  {
    ...C.beef,
    nameEn: "Beef Dalwala",
    nameFi: "Nautaa Dalwala",
    preparationEn:
      "Slow-cooked beef simmered with yellow lentils and tempered spices.",
    preparationFi:
      "Haudutettua naudanlihaa keltaisten linssien ja mausteiden kera.",
    storyEn:
      "'Dalwala' means 'with lentils' – a nourishing combination of tender beef and creamy yellow dal.",
    storyFi:
      "'Dalwala' tarkoittaa 'linssien kanssa' – ravitseva yhdistelmä mureaa naudanlihaa ja kermaista keltaista dalia.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.curryVeg,
  },
  {
    ...C.beef,
    nameEn: "Beef Palak",
    nameFi: "Nautaa Palak",
    preparationEn:
      "Beef cubes cooked with creamy, garlic-infused spinach puree.",
    preparationFi:
      "Naudankuutioita kermaisessa ja valkosipulisessa pinaattikastikkeessa.",
    storyEn:
      "Tender beef in a garlicky spinach sauce, a hearty take on the classic palak preparation.",
    storyFi:
      "Mureaa naudanlihaa valkosipulisessa pinaattikastikkeessa – täyteläinen tulkinta klassisesta palak-ruoasta.",
    price: 17.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.beef,
  },
  {
    ...C.beef,
    nameEn: "Beef Tikka Masala",
    nameFi: "Nautaa Tikka Masala",
    preparationEn:
      "Tandoori-roasted beef cooked in a vibrant, spiced tomato and onion gravy.",
    preparationFi:
      "Tandoorissa paahdettua nautaa mausteisessa tomaatti-sipulimasalakastikkeessa.",
    storyEn:
      "Tandoor-roasted beef finished in a vibrant tomato-onion masala for a smoky, spiced result.",
    storyFi:
      "Tandoorissa paahdettu naudanliha viimeistellään eloisassa tomaatti-sipulimasalassa savuisen mausteiseen lopputulokseen.",
    price: 18.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.beef,
  },

  // ==========================================
  // 6. CHICKEN MAIN COURSES / KANAPÄÄRUOAT
  // ==========================================
  {
    ...C.chicken,
    nameEn: "Chicken Korma",
    nameFi: "Kanakorma",
    preparationEn:
      "Boneless chicken simmered in a mild, sweet cashew and coconut cream sauce.",
    preparationFi:
      "Pehmeää kananrintaa miedossa ja makeahkossa cashew-kookoskermakastikkeessa.",
    storyEn:
      "A gentle, creamy curry from the Mughal tradition, perfect for anyone new to Indian food.",
    storyFi:
      "Lempeä ja kermainen curry mughal-perinteestä, täydellinen kaikille, jotka tutustuvat intialaiseen ruokaan.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.korma,
  },
  {
    ...C.chicken,
    nameEn: "Murg Makhani (Butter Chicken)",
    nameFi: "Murg Makhani (Voikana)",
    preparationEn:
      "Tandoori chicken pieces cooked in a rich, buttery tomato cream gravy.",
    preparationFi:
      "Tandoorigrillattua kanaa täyteläisessä tomaatti-voikermakastikkeessa.",
    storyEn:
      "Butter chicken was created in Delhi in the 1950s, when leftover tandoori chicken was simmered in a tomato-butter sauce. It has since become one of India's most famous dishes.",
    storyFi:
      "Voikana syntyi Delhissä 1950-luvulla, kun tandoorikanan jämät haudutettiin tomaatti-voikastikkeessa. Siitä on tullut yksi Intian tunnetuimmista ruoista.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.butterChicken,
  },
  {
    ...C.chicken,
    nameEn: "Chicken Curry",
    nameFi: "Kanacurry",
    preparationEn:
      "Traditional home-style chicken curry cooked with onions, ginger, and garlic.",
    preparationFi:
      "Perinteistä intialaista kanacurrya inkiväärillä, valkosipulilla ja mausteilla.",
    storyEn:
      "The everyday chicken curry of Indian homes, built on onions, ginger, garlic and a warm blend of spices.",
    storyFi:
      "Intialaisten kotien arkinen kanacurry, jonka pohjana ovat sipuli, inkivääri, valkosipuli ja lämmin mausteseos.",
    price: 17.0,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.chicken,
  },
  {
    ...C.chicken,
    nameEn: "Chicken Pepper Fry",
    nameFi: "Pippurinen paistettu kana",
    preparationEn:
      "Chicken tossed with cracked black pepper, curry leaves, ginger, and onion.",
    preparationFi:
      "Kanaa paistettuna mustapippurin, currylehtien, inkiväärin ja sipulin kera.",
    storyEn:
      "A South Indian speciality where freshly cracked black pepper, once the region's prized spice, takes the lead.",
    storyFi:
      "Eteläintialainen erikoisuus, jossa vastamurskattu musta pippuri, alueen aikoinaan arvostettu mauste, on pääosassa.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.chicken65,
  },
  {
    ...C.chicken,
    nameEn: "Chicken Palak",
    nameFi: "Kana Palak (Pinaattikana)",
    preparationEn:
      "Chicken cooked in a smooth, flavorful spinach sauce with ground herbs.",
    preparationFi:
      "Kanaa pehmeässä ja maustetussa pinaattikastikkeessa yrteillä.",
    storyEn:
      "Tender chicken in a velvety spinach sauce, a wholesome North Indian favourite.",
    storyFi:
      "Mureaa kanaa samettisessa pinaattikastikkeessa – ravitseva pohjoisintialainen suosikki.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.butterChicken,
  },
  {
    ...C.chicken,
    nameEn: "Mughlai Murgh Curry",
    nameFi: "Mughlai Kanacurry",
    preparationEn:
      "Chicken cooked in a rich, mild royal Mughal style nut-infused cream sauce.",
    preparationFi:
      "Kanaa kuninkaallisessa Mughlai-tyylisessä pähkinä-kermakastikkeessa.",
    storyEn:
      "A royal-style curry from the Mughal courts, with a mild, nutty cream sauce and fragrant spices.",
    storyFi:
      "Kuninkaallisen tyylinen curry mughal-hoveista, mieto pähkinäinen kermakastike ja tuoksuvat mausteet.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.korma,
  },
  {
    ...C.chicken,
    nameEn: "Chicken Tikka Masala",
    nameFi: "Kana Tikka Masala",
    preparationEn:
      "Marinated roasted chicken pieces in a spiced, creamy tomato and onion sauce.",
    preparationFi:
      "Marinoitua tandoorikanaa mausteisessa tomaatti-sipulimasalakastikkeessa.",
    storyEn:
      "One of the world's best-loved curries: smoky tandoori chicken in a creamy, spiced tomato sauce.",
    storyFi:
      "Yksi maailman rakastetuimmista curryista: savuista tandoorikanaa kermaisessa, mausteisessa tomaattikastikkeessa.",
    price: 17.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.prawn,
  },
  {
    ...C.chicken,
    nameEn: "Chicken Vindaloo",
    nameFi: "Kana Vindaloo",
    preparationEn:
      "Fiery hot Goan chicken curry cooked with potatoes, vinegar, and hot chili paste.",
    preparationFi:
      "Erittäin tulista kanaa etikka-chilikastikkeessa perunoiden kera.",
    storyEn:
      "From Goa, a fiery curry shaped by Portuguese cooking, with a sharp vinegar tang and strong chili heat.",
    storyFi:
      "Goalta peräisin oleva tulinen curry, jossa on portugalilaista vaikutetta: terävä etikan happamuus ja voimakas chilin tulisuus.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.chicken,
  },
  {
    ...C.chicken,
    nameEn: "Methi Chicken Curry",
    nameFi: "Methi Kanacurry",
    preparationEn:
      "Chicken cooked with aromatic dried fenugreek leaves and traditional spices.",
    preparationFi:
      "Kanaa valmistettuna aromaattisten sarviapilanlehtien ja mausteiden kera.",
    storyEn:
      "Methi (fenugreek) gives this curry its distinctive, slightly bitter and deeply aromatic character.",
    storyFi:
      "Methi (sarviapila) antaa tälle currylle sen omaleimaisen, hieman karvaan ja syvän aromaattisen luonteen.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.butterChicken,
  },
  {
    ...C.chicken,
    nameEn: "Mango Chicken Curry",
    nameFi: "Mango Kanacurry",
    preparationEn:
      "Chicken cooked in a mild, sweet, and tangy mango cream sauce.",
    preparationFi:
      "Kanaa miedossa, makeassa ja hedelmäisessä mango-kermakastikkeessa.",
    storyEn:
      "India's king of fruits meets creamy curry in this sweet, tangy and mild dish.",
    storyFi:
      "Intian hedelmien kuningas kohtaa kermaisen curryn tässä makeassa, raikkaassa ja miedossa ruoassa.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.korma,
  },
  {
    ...C.chicken,
    nameEn: "Chicken Jalfrezi",
    nameFi: "Kana Jalfrezi",
    preparationEn:
      "Chicken stir-fried with bell peppers, onions, tomatoes, and spicy curry gravy.",
    preparationFi:
      "Kanaa paistettuna paprikan, sipulin, tomaatin ja mausteisen kastikkeen kera.",
    storyEn:
      "A vibrant stir-fried curry with crisp peppers and onions in a thick, spicy tomato gravy.",
    storyFi:
      "Eloisa paistettu curry rapeine paprikoineen ja sipuleineen paksussa, mausteisessa tomaattikastikkeessa.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.chicken,
  },
  {
    ...C.chicken,
    nameEn: "Madras Chicken Curry",
    nameFi: "Madras Kanacurry",
    preparationEn:
      "South Indian spicy chicken curry with coconut milk, curry leaves, and mustard seeds.",
    preparationFi:
      "Tulista eteläintialaista kanacurrya kookosmaidolla, currylehdillä ja sinapinsiemenillä.",
    storyEn:
      "A South Indian style curry with coconut, mustard seeds and curry leaves, finished with a lively chili heat.",
    storyFi:
      "Eteläintialaistyylinen curry kookoksella, sinapinsiemenillä ja currylehdillä, viimeistelty eloisalla chilin tulisuudella.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.butterChicken,
  },
  {
    ...C.chicken,
    nameEn: "Kadai Chicken Curry",
    nameFi: "Kadai Kanacurry",
    preparationEn:
      "Chicken pieces cooked in a wok with freshly ground coriander, chili, and peppers.",
    preparationFi:
      "Kanaa valmistettuna wokissa vastajauhetun korianterin, chilin ja paprikan kera.",
    storyEn:
      "Cooked in a traditional kadai wok, this curry is known for its bold freshly ground spices.",
    storyFi:
      "Perinteisessä kadai-wokissa valmistettu curry tunnetaan rohkeista vastajauhetuista mausteistaan.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.chicken,
  },
  {
    ...C.chicken,
    nameEn: "Dahi Masala Chicken",
    nameFi: "Dahi Masala Kana",
    preparationEn:
      "Chicken cooked in a tangy spiced yogurt sauce enriched with roasted cumin.",
    preparationFi:
      "Kanaa täyteläisessä jogurttikastikkeessa paahdetun kuminan ja mausteiden kera.",
    storyEn:
      "'Dahi' means yogurt. This curry has a gentle tang and warm roasted cumin aroma.",
    storyFi:
      "'Dahi' tarkoittaa jogurttia. Tässä curryssa on lempeä happamuus ja lämmin paahdetun kuminan aromi.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.butterChicken,
  },
  {
    ...C.chicken,
    nameEn: "Hyderabadi Chicken Curry",
    nameFi: "Hyderabadi Kanacurry",
    preparationEn:
      "Authentic Hyderabadi chicken curry cooked with roasted coconut, poppy seeds, and herbs.",
    preparationFi:
      "Aitoa Hyderabadi-kanacurrya paahdetulla kookoksella, unikon siemenillä ja yrteillä.",
    storyEn:
      "From the city of Hyderabad, where Mughal and South Indian cooking blend into richly layered, nutty curries.",
    storyFi:
      "Hyderabadin kaupungista, jossa mughal- ja eteläintialainen ruoanlaitto sulautuvat monikerroksisiksi, pähkinäisiksi curryiksi.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.prawn,
  },

  // ==========================================
  // 7. SEAFOOD / MERENELÄVÄT
  // ==========================================
  {
    ...C.seafood,
    nameEn: "Garlic Prawns",
    nameFi: "Valkosipulikatkaravut",
    preparationEn:
      "Succulent king prawns sautéed with crushed garlic, butter, and coriander.",
    preparationFi:
      "Meheviä jättikatkarapuja paistettuna tuoreen valkosipulin, voin ja korianterin kera.",
    storyEn:
      "Juicy king prawns quickly sautéed so garlic and butter let the sweetness of the seafood shine.",
    storyFi:
      "Mehevät jättikatkaravut paistetaan nopeasti, jotta valkosipuli ja voi tuovat esiin äyriäisten makeuden.",
    price: 18.9,
    servings: 1,
    portionLabelEn: "Approx. 250 g",
    portionLabelFi: "Noin 250 g",
    imageUrl: IMG.prawn,
  },
  {
    ...C.seafood,
    nameEn: "Fish Curry",
    nameFi: "Kalacurry",
    preparationEn:
      "Fish fillets simmered in coconut milk, mustard seeds, and tangy tamarind curry.",
    preparationFi:
      "Kalafileitä kookosmaidossa, sinapinsiemenissä ja tamarindilla maustetussa curryssa.",
    storyEn:
      "Coastal India's comfort food: fish in a tangy coconut and tamarind curry.",
    storyFi:
      "Intian rannikon lohturuoka: kalaa raikkaassa kookos-tamarindicurryssa.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.fish,
  },
  {
    ...C.seafood,
    nameEn: "Prawn Curry",
    nameFi: "Katkarapucurry",
    preparationEn:
      "Tender prawns simmered in an onion-tomato gravy with Indian spices.",
    preparationFi:
      "Meheviä katkarapuja haudutettuna tomaatti-sipulikastikkeessa intialaisilla mausteilla.",
    storyEn:
      "A classic coastal curry where sweet prawns simmer in a fragrant onion and tomato gravy.",
    storyFi:
      "Klassinen rannikkocurry, jossa makeat katkaravut haudutetaan tuoksuvassa sipuli-tomaattikastikkeessa.",
    price: 18.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.prawn,
  },
  {
    ...C.seafood,
    nameEn: "Tandoori King Prawns",
    nameFi: "Tandoori Jättikatkaravut",
    preparationEn:
      "Jumbo king prawns marinated in spiced tandoori yogurt and grilled over hot coals.",
    preparationFi:
      "Jättikatkarapuja marinoituna tandoorimausteissa ja grillattuna hiilillä.",
    storyEn:
      "Large king prawns marinated in yogurt and spices, then charred in the clay tandoor for a smoky finish.",
    storyFi:
      "Jättikatkaravut marinoidaan jogurtissa ja mausteissa ja kypsennetään savitandoorissa savuiseen lopputulokseen.",
    price: 20.9,
    servings: 1,
    portionLabelEn: "6 pcs",
    portionLabelFi: "6 kpl",
    imageUrl: IMG.prawn,
  },
  {
    ...C.seafood,
    nameEn: "Squid Prawn",
    nameFi: "Mustekala-katkarapu",
    preparationEn:
      "Tender squid rings and juicy prawns stir-fried with onions, peppers, and spicy sauce.",
    preparationFi:
      "Mustekalarenkaita ja katkarapuja paistettuna sipulin, paprikan ja maustekastikkeen kera.",
    storyEn:
      "A seafood stir-fry combining tender squid and juicy prawns in a lively spiced sauce.",
    storyFi:
      "Merenelävien paistos, jossa mureat mustekalat ja mehevät katkaravut yhdistyvät eloisassa mausteisessa kastikkeessa.",
    price: 19.5,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.prawn,
  },
  {
    ...C.seafood,
    nameEn: "Prawn Chilli Curry",
    nameFi: "Katkarapu-chilicurry",
    preparationEn:
      "Prawns sautéed with red chilies, bell peppers, onions, and spicy tomato sauce.",
    preparationFi:
      "Katkarapuja paistettuna punaisen chilin, paprikan, sipulin ja chilikastikkeen kera.",
    storyEn:
      "Sweet prawns meet red chili and peppers in a bold, spicy tomato sauce.",
    storyFi:
      "Makeat katkaravut kohtaavat punaisen chilin ja paprikat rohkeassa, tulisessa tomaattikastikkeessa.",
    price: 18.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.prawn,
  },
  {
    ...C.seafood,
    nameEn: "Fish Chilli Curry",
    nameFi: "Kala-chilicurry",
    preparationEn:
      "Fish fillets cooked in hot chili gravy with fresh peppers, onions, and ginger.",
    preparationFi:
      "Kalafileitä tulisessa chilikastikkeessa paprikan, sipulin ja inkiväärin kera.",
    storyEn:
      "Tender fish fillets in a hot chili gravy with fresh peppers and a hint of ginger.",
    storyFi:
      "Mureita kalafileitä tulisessa chilikastikkeessa tuoreen paprikan ja inkiväärin vivahteella.",
    price: 18.0,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.fish,
  },
  {
    ...C.seafood,
    nameEn: "Fish Masala",
    nameFi: "Kalamasala",
    preparationEn:
      "Fish pieces cooked in a thick, hearty onion, tomato, and ground garam masala gravy.",
    preparationFi:
      "Kalapaloja paksussa sipuli-, tomaatti- ja garam masalakastikkeessa.",
    storyEn:
      "A hearty fish dish simmered in a thick onion-tomato masala finished with garam masala.",
    storyFi:
      "Täyteläinen kalaruoka, jota haudutetaan paksussa sipuli-tomaattimasalassa ja viimeistellään garam masalalla.",
    price: 17.9,
    servings: 1,
    portionLabelEn: "Approx. 300 g",
    portionLabelFi: "Noin 300 g",
    imageUrl: IMG.fish,
  },

  // ==========================================
  // 8. RICE / RIISI
  // ==========================================
  {
    ...C.rice,
    nameEn: "Basmati Rice",
    nameFi: "Basmatiriisi",
    preparationEn: "Fragrant, fluffy long-grain steamed basmati rice.",
    preparationFi:
      "Aromaattista, kuohkeaa ja höyrytettyä pitkäjyväistä basmatiriisiä.",
    storyEn: null,
    storyFi: null,
    price: 3.5,
    servings: 1,
    portionLabelEn: "Approx. 200 g",
    portionLabelFi: "Noin 200 g",
    imageUrl: IMG.basmati,
  },
  {
    ...C.rice,
    nameEn: "Vegetable Biryani",
    nameFi: "Kasvisbiryani",
    preparationEn:
      "Layered basmati rice and fresh vegetables cooked with saffron, mint, and spices.",
    preparationFi:
      "Haudutettua basmatiriisiä ja vihanneksia sahramilla, mintulla ja mausteilla.",
    storyEn:
      "Biryani is a celebration dish of layered rice and spices. This vegetarian version is fragrant with saffron and mint.",
    storyFi:
      "Biryani on juhla-ateria kerrostetusta riisistä ja mausteista. Tämä kasvisversio tuoksuu sahramilta ja mintulta.",
    price: 15.5,
    servings: 1,
    portionLabelEn: "Approx. 400 g",
    portionLabelFi: "Noin 400 g",
    imageUrl: IMG.biryani,
  },
  {
    ...C.rice,
    nameEn: "Chicken Biryani",
    nameFi: "Kanabiryani",
    preparationEn:
      "Aromatic basmati rice cooked on 'dum' with marinated tender chicken and spices.",
    preparationFi:
      "Aromaattista basmatiriisiä haudutettuna marinoidun kanan ja mausteiden kera.",
    storyEn:
      "Cooked in the 'dum' style, where the pot is sealed so rice and marinated chicken steam together in their own aromas.",
    storyFi:
      "Valmistettu 'dum'-tyylillä, jossa kattila suljetaan ja riisi sekä marinoitu kana kypsyvät yhdessä omissa tuoksuissaan.",
    price: 17.5,
    servings: 1,
    portionLabelEn: "Approx. 450 g",
    portionLabelFi: "Noin 450 g",
    imageUrl: IMG.biryani,
  },
  {
    ...C.rice,
    nameEn: "Beef Biryani",
    nameFi: "Nautabiryani",
    preparationEn:
      "Spiced basmati rice layered with slow-cooked tender beef and aromatics.",
    preparationFi:
      "Mausteista basmatiriisiä ja hitaasti haudutettua mureaa naudanlihaa.",
    storyEn:
      "Slow-cooked beef layered with fragrant basmati rice in the great biryani tradition.",
    storyFi:
      "Hitaasti haudutettua naudanlihaa kerroksittain tuoksuvan basmatiriisin kanssa suuren biryani-perinteen hengessä.",
    price: 18.0,
    servings: 1,
    portionLabelEn: "Approx. 450 g",
    portionLabelFi: "Noin 450 g",
    imageUrl: IMG.biryani,
  },
  {
    ...C.rice,
    nameEn: "Lamb Biryani",
    nameFi: "Lammasbiryani",
    preparationEn:
      "Royal basmati rice cooked with succulent spiced lamb chunks and saffron.",
    preparationFi:
      "Sahramilla maustettua basmatiriisiä ja mureita mausteisia lampaanpaloja.",
    storyEn:
      "A royal biryani with spiced lamb and saffron rice, a dish traditionally served at feasts and weddings.",
    storyFi:
      "Kuninkaallinen biryani mausteisella lampaalla ja sahramiriisillä – perinteisesti juhlien ja häiden ruoka.",
    price: 18.5,
    servings: 1,
    portionLabelEn: "Approx. 450 g",
    portionLabelFi: "Noin 450 g",
    imageUrl: IMG.biryani,
  },
  {
    ...C.rice,
    nameEn: "Prawn Biryani",
    nameFi: "Katkarapubiryani",
    preparationEn:
      "Basmati rice layered and cooked with juicy prawns, onions, and garam masala.",
    preparationFi:
      "Basmatiriisiä kypsennettynä mehevien katkarapujen ja mausteiden kera.",
    storyEn:
      "A coastal take on biryani, pairing sweet prawns with fragrant spiced rice.",
    storyFi:
      "Rannikon tulkinta biryanista, jossa makeat katkaravut yhdistyvät tuoksuvaan maustettuun riisiin.",
    price: 19.5,
    servings: 1,
    portionLabelEn: "Approx. 450 g",
    portionLabelFi: "Noin 450 g",
    imageUrl: IMG.biryani,
  },

  // ==========================================
  // 9. NAAN BREADS / NAAN-LEIVÄT
  // ==========================================
  {
    ...C.naan,
    nameEn: "Plain Naan",
    nameFi: "Perinteinen naan",
    preparationEn:
      "Traditional soft and fluffy white flour flatbread baked in the clay tandoor.",
    preparationFi:
      "Perinteinen pehmeä saviuunissa paistettu intialainen vehnäleipä.",
    storyEn: null,
    storyFi: null,
    price: 2.5,
    servings: 1,
    portionLabelEn: "1 pc",
    portionLabelFi: "1 kpl",
    imageUrl: IMG.naan,
  },
  {
    ...C.naan,
    nameEn: "Butter Naan",
    nameFi: "Voinaan",
    preparationEn:
      "Flaky layered tandoori flatbread brushed generously with melted butter.",
    preparationFi:
      "Lehtevä tandoorileipä siveltynä runsaasti sulatetulla voilla.",
    storyEn: null,
    storyFi: null,
    price: 3.0,
    servings: 1,
    portionLabelEn: "1 pc",
    portionLabelFi: "1 kpl",
    imageUrl: IMG.naan,
  },
  {
    ...C.naan,
    nameEn: "Garlic Naan",
    nameFi: "Valkosipulinaan",
    preparationEn:
      "Tandoori flatbread topped with minced garlic butter and fresh cilantro.",
    preparationFi:
      "Tandoorileipä valkosipulivoilla ja tuoreella korianterilla maustettuna.",
    storyEn:
      "Naan baked on the hot wall of the tandoor, topped with garlic butter and fresh coriander – perfect for scooping up curry.",
    storyFi:
      "Tandoorin kuumalla seinällä paistettu naan valkosipulivoilla ja tuoreella korianterilla – täydellinen currykastikkeen kauhomiseen.",
    price: 3.5,
    servings: 1,
    portionLabelEn: "1 pc",
    portionLabelFi: "1 kpl",
    imageUrl: IMG.naan,
  },

  // ==========================================
  // 10. DESSERTS / JÄLKIRUOAT
  // ==========================================
  {
    ...C.desserts,
    nameEn: "Gulab Jamun",
    nameFi: "Gulab Jamun",
    preparationEn:
      "Deep-fried milk dough dumplings soaked in fragrant rose and cardamom syrup.",
    preparationFi:
      "Friteerattuja maitotiivistepalloja ruusuvedellä ja kardemummalla maustetussa siirapissa.",
    storyEn:
      "A festive favourite across India, these soft milk dumplings are soaked in rose and cardamom syrup.",
    storyFi:
      "Juhlien suosikki kaikkialla Intiassa: pehmeät maitopallot liotetaan ruusu-kardemummasiirapissa.",
    price: 4.5,
    servings: 1,
    portionLabelEn: "2 pcs",
    portionLabelFi: "2 kpl",
    imageUrl: IMG.gulab,
  },
  {
    ...C.desserts,
    nameEn: "Mango Kulfi",
    nameFi: "Mangokulfi",
    preparationEn:
      "Traditional dense and creamy Indian ice cream flavored with sweet Alphonso mango.",
    preparationFi:
      "Perinteistä täyteläistä intialaista Alphonso-mangolla maustettua kulfi-jäätelöä.",
    storyEn:
      "Kulfi is India's traditional frozen dessert, denser and creamier than ice cream, here flavoured with sweet mango.",
    storyFi:
      "Kulfi on Intian perinteinen jäädytetty jälkiruoka, tiiviimpää ja kermaisempaa kuin jäätelö – tässä makealla mangolla maustettuna.",
    price: 5.0,
    servings: 1,
    portionLabelEn: "1 portion",
    portionLabelFi: "1 annos",
    imageUrl: IMG.kulfi,
  },
  {
    ...C.desserts,
    nameEn: "Chili Lemon Sorbet",
    nameFi: "Chili-sitruunasorbetti",
    preparationEn:
      "Refreshing, tangy lemon sorbet with a subtle hint of warming chili spice.",
    preparationFi:
      "Raikasta sitruunasorbettia hienovaraisella ja lämpimällä chilin vivahteella.",
    storyEn:
      "A refreshing palate cleanser: tangy lemon with a gentle warmth of chili.",
    storyFi:
      "Virkistävä makuhermojen puhdistaja: raikasta sitruunaa ja lempeä chilin lämpö.",
    price: 5.5,
    servings: 1,
    portionLabelEn: "2 scoops",
    portionLabelFi: "2 palloa",
    imageUrl: IMG.sorbet,
  },
  {
    ...C.desserts,
    nameEn: "Ice Cream",
    nameFi: "Jäätelö",
    preparationEn:
      "Two scoops of premium ice cream (Vanilla, Chocolate, or Strawberry).",
    preparationFi: "Kaksi palloa jäätelöä (vanilja, suklaa tai mansikka).",
    storyEn: null,
    storyFi: null,
    price: 4.0,
    servings: 1,
    portionLabelEn: "2 scoops",
    portionLabelFi: "2 palloa",
    imageUrl: IMG.iceCream,
  },

  // ==========================================
  // 11. TEA / TEE
  // ==========================================
  {
    ...C.tea,
    nameEn: "Indian Chai",
    nameFi: "Intialainen tee (Chai)",
    preparationEn:
      "Traditional spiced black milk tea brewed with cardamom, ginger, and cloves.",
    preparationFi:
      "Perinteistä mausteista mustaa maitoteetä kardemummalla, inkiväärillä ja neilikalla.",
    storyEn:
      "Chai is the heartbeat of Indian daily life, simmered with milk and warming spices and shared at every hour of the day.",
    storyFi:
      "Chai on intialaisen arjen sydän: maidossa ja lämmittävissä mausteissa haudutettu tee, jota jaetaan päivän jokaisena hetkenä.",
    price: 3.5,
    servings: 1,
    portionLabelEn: "1 cup",
    portionLabelFi: "1 kuppi",
    imageUrl: IMG.chai,
  },
  {
    ...C.tea,
    nameEn: "Black Tea",
    nameFi: "Musta tee",
    preparationEn: "Freshly brewed classic aromatic black tea.",
    preparationFi: "Vastahaudutettua perinteistä aromaattista mustaa teetä.",
    storyEn: null,
    storyFi: null,
    price: 2.5,
    servings: 1,
    portionLabelEn: "1 cup",
    portionLabelFi: "1 kuppi",
    imageUrl: IMG.blackTea,
  },
  {
    ...C.tea,
    nameEn: "Green Tea",
    nameFi: "Vihreä tee",
    preparationEn: "Steamed, delicate antioxidant-rich green tea leaves.",
    preparationFi: "Raikasta ja kevyttä antioksidanttirikasta vihreää teetä.",
    storyEn: null,
    storyFi: null,
    price: 2.5,
    servings: 1,
    portionLabelEn: "1 cup",
    portionLabelFi: "1 kuppi",
    imageUrl: IMG.greenTea,
  },

  // ==========================================
  // 12. DRINKS / JUOMAT
  // ==========================================
  {
    ...C.drinks,
    nameEn: "Soft Drinks (0.33l / 0.5l)",
    nameFi: "Virvoitusjuomat (0,33 l / 0,5 l)",
    preparationEn: "Choice of Coca-Cola, Coca-Cola Zero, Fanta, or Sprite.",
    preparationFi:
      "Valinnan mukaan Coca-Cola, Coca-Cola Zero, Fanta tai Sprite.",
    storyEn: null,
    storyFi: null,
    price: 3.0,
    servings: 1,
    portionLabelEn: "0.33 l / 0.5 l",
    portionLabelFi: "0,33 l / 0,5 l",
    imageUrl: IMG.softDrink,
  },
  {
    ...C.drinks,
    nameEn: "Mango Lassi",
    nameFi: "Mangolassi",
    preparationEn:
      "Chilled yogurt smoothie blended with ripe mango puree and cardamom.",
    preparationFi:
      "Kylmä ja täyteläinen intialainen jogurttijuoma mangososeella ja kardemummalla.",
    storyEn:
      "Lassi is a cooling yogurt drink from the Punjab. The mango version is its most popular variation worldwide.",
    storyFi:
      "Lassi on viilentävä jogurttijuoma Punjabista. Mangoversio on sen suosituin muunnelma maailmalla.",
    price: 4.5,
    servings: 1,
    portionLabelEn: "Approx. 0.3 l",
    portionLabelFi: "Noin 0,3 l",
    imageUrl: IMG.lassi,
  },
  {
    ...C.drinks,
    nameEn: "Sweet Lassi",
    nameFi: "Makea lassi",
    preparationEn:
      "Traditional sweetened churned yogurt cooler with a hint of rosewater.",
    preparationFi:
      "Perinteinen makea vispattu jogurttijuoma ruusuveden vivahteella.",
    storyEn:
      "The classic Punjabi lassi: churned yogurt, lightly sweetened and perfumed with rosewater.",
    storyFi:
      "Klassinen punjabilainen lassi: kirnuttua jogurttia, kevyesti makeutettuna ja ruusuvedellä tuoksutettuna.",
    price: 4.0,
    servings: 1,
    portionLabelEn: "Approx. 0.3 l",
    portionLabelFi: "Noin 0,3 l",
    imageUrl: IMG.lassi,
  },
];

async function seedDatabase() {
  console.log("Seeding Tandoori Koti À La Carte Menu into Neon PostgreSQL...");

  // WARNING: deleteMany will fail with a foreign-key error if any
  // BuffetMenu or DeliveryOrderItem rows reference these dishes.
  // In that case, clear those relations first or switch to upsert.
  await prisma.regularMenu.deleteMany({});
  console.log("Cleared existing dishes from database.");

  const result = await prisma.regularMenu.createMany({
    data: menuItems,
  });

  console.log(
    `Successfully seeded ${result.count} bilingual dishes into the database!`,
  );
}

seedDatabase()
  .catch((e) => {
    console.error("Database Seeding Failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
