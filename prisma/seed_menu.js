

import prisma from "../src/config/db.js";

const menuItems = [
  // ==========================================
  // 1. STARTERS / ALKURUOAT
  // ==========================================
  {
    categoryEn: "Starters",
    categoryFi: "Alkuruoat",
    nameEn: "Paneer Pakora",
    nameFi: "Paneer Pakora",
    preparationEn:
      "Deep-fried Indian cottage cheese fritters coated in spiced gram flour batter.",
    preparationFi:
      "Friteerattua tuorejuustoa maustetussa kikhernejauhotaikinassa.",
    price: 7.0,
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Starters",
    categoryFi: "Alkuruoat",
    nameEn: "Fish Pakora",
    nameFi: "Fish Pakora",
    preparationEn:
      "Crisp, deep-fried spiced fish fillets coated in seasoned batter.",
    preparationFi: "Rapeaksi friteerattua maustettua kalafileetä.",
    price: 8.0,
    imageUrl:
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Starters",
    categoryFi: "Alkuruoat",
    nameEn: "Prawn Puri",
    nameFi: "Prawn Puri",
    preparationEn:
      "Juicy spiced prawns cooked with herbs and served on fried Indian puri bread.",
    preparationFi:
      "Mausteisia meheviä katkarapuja tarjoiltuna paistetun intialaisen puri-leivän päällä.",
    price: 8.9,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Starters",
    categoryFi: "Alkuruoat",
    nameEn: "Chicken Pakora",
    nameFi: "Chicken Pakora",
    preparationEn:
      "Tender chicken pieces coated in seasoned chickpea batter and deep-fried.",
    preparationFi:
      "Mureita kanapaloja maustetussa kikhernejauhotaikinassa friteerattuna.",
    price: 7.5,
    imageUrl:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Starters",
    categoryFi: "Alkuruoat",
    nameEn: "Chicken 65",
    nameFi: "Chicken 65",
    preparationEn:
      "Crispy, spicy South Indian fried chicken tossed with curry leaves and green chilies.",
    preparationFi:
      "Rapeaa ja tulista eteläintialaista kanaa paistettuna currylehtien ja chilin kera.",
    price: 9.0,
    imageUrl:
      "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Starters",
    categoryFi: "Alkuruoat",
    nameEn: "Chicken Tikka",
    nameFi: "Chicken Tikka",
    preparationEn:
      "Boneless chicken chunks marinated in yogurt and tandoori spices, char-grilled.",
    preparationFi:
      "Jogurtissa ja tandoorimausteissa marinoituja tandoorissa grillattuja kanapaloja.",
    price: 9.0,
    imageUrl:
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Starters",
    categoryFi: "Alkuruoat",
    nameEn: "Mushroom Tikka",
    nameFi: "Mushroom Tikka",
    preparationEn:
      "Fresh button mushrooms marinated in aromatic spices and skewered in the tandoor.",
    preparationFi:
      "Tuoreita herkkusieniä marinoituna aromaattisissa mausteissa ja grillattuna tandoorissa.",
    price: 8.5,
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Starters",
    categoryFi: "Alkuruoat",
    nameEn: "Vegetable Samosa (2 pcs)",
    nameFi: "Kasvissamosa (2 kpl)",
    preparationEn:
      "Crispy triangular pastries stuffed with spiced potatoes, green peas, and herbs.",
    preparationFi:
      "Rapeita leivonnaisia maustetulla peruna-, herne- ja yrttitäytteellä.",
    price: 7.0,
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Starters",
    categoryFi: "Alkuruoat",
    nameEn: "Samosa Chana Chaat",
    nameFi: "Samosa Chana Chaat",
    preparationEn:
      "Crushed vegetable samosa topped with spiced chickpea curry, yogurt, and chutneys.",
    preparationFi:
      "Kasvissamosaa mausteisen kikhernecurryn, jogurtin ja tamarindikastikkeen kera.",
    price: 8.5,
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },

  // ==========================================
  // 2. VEGETARIAN MAIN COURSES / KASVISPÄÄRUOAT
  // ==========================================
  {
    categoryEn: "Vegetarian Main Courses",
    categoryFi: "Kasvispääruoat",
    nameEn: "Palak Paneer",
    nameFi: "Palak Paneer",
    preparationEn:
      "Fresh cottage cheese cubes cooked in a spiced, creamy spinach puree.",
    preparationFi:
      "Tuorejuustoa pehmeässä ja mausteisessa pinaattikastikkeessa.",
    price: 15.5,
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Vegetarian Main Courses",
    categoryFi: "Kasvispääruoat",
    nameEn: "Mix Vegetable Curry",
    nameFi: "Sekavihannescurry",
    preparationEn:
      "Assorted seasonal vegetables simmered in a traditional Indian spiced curry sauce.",
    preparationFi:
      "Kauden kasviksia perinteisessä mausteisessa intialaisessa currykastikkeessa.",
    price: 15.5,
    imageUrl:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Vegetarian Main Courses",
    categoryFi: "Kasvispääruoat",
    nameEn: "Vegetable Korma",
    nameFi: "Kasviskorma",
    preparationEn:
      "Mixed vegetables gently cooked in a mild, velvety cashew and coconut cream sauce.",
    preparationFi:
      "Vihanneksia miedossa, kermaisessa cashew- ja kookoskermakastikkeessa.",
    price: 15.9,
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Vegetarian Main Courses",
    categoryFi: "Kasvispääruoat",
    nameEn: "Vegetable Jalfrezi",
    nameFi: "Kasvis Jalfrezi",
    preparationEn:
      "Stir-fried vegetables with onions, bell peppers, tomatoes, and spicy gravy.",
    preparationFi:
      "Paistettuja vihanneksia sipulin, paprikan ja tulisen tomaattikastikkeen kera.",
    price: 15.9,
    imageUrl:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Vegetarian Main Courses",
    categoryFi: "Kasvispääruoat",
    nameEn: "Shahi Paneer",
    nameFi: "Shahi Paneer",
    preparationEn:
      "Cottage cheese simmered in a royal, rich tomato, cashew nut, and cream sauce.",
    preparationFi:
      "Tuorejuustoa kuninkaallisessa, kermaisessa tomaatti- ja cashew-pähkinäkastikkeessa.",
    price: 16.0,
    imageUrl:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Vegetarian Main Courses",
    categoryFi: "Kasvispääruoat",
    nameEn: "Kadai Paneer",
    nameFi: "Kadai Paneer",
    preparationEn:
      "Cottage cheese stir-fried with bell peppers, onions, and freshly roasted spices.",
    preparationFi:
      "Tuorejuustoa paistettuna paprikan, sipulin ja vastajauhettujen mausteiden kera.",
    price: 16.0,
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Vegetarian Main Courses",
    categoryFi: "Kasvispääruoat",
    nameEn: "Paneer Mushroom Curry",
    nameFi: "Paneer-sienicurry",
    preparationEn:
      "Fresh cottage cheese and button mushrooms cooked in an aromatic herb curry.",
    preparationFi:
      "Tuorejuustoa ja herkkusieniä kypsennettynä mausteisessa yrtti-currykastikkeessa.",
    price: 16.0,
    imageUrl:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Vegetarian Main Courses",
    categoryFi: "Kasvispääruoat",
    nameEn: "Aloo Gobi Masala",
    nameFi: "Aloo Gobi Masala",
    preparationEn:
      "Potatoes and cauliflower florets sautéed with ginger, garlic, and ground spices.",
    preparationFi:
      "Perunaa ja kukkakaalia haudutettuna inkiväärin, valkosipulin ja mausteiden kera.",
    price: 14.5,
    imageUrl:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Vegetarian Main Courses",
    categoryFi: "Kasvispääruoat",
    nameEn: "Aloo Palak",
    nameFi: "Aloo Palak",
    preparationEn:
      "Diced tender potatoes cooked in a smooth, flavorful spinach gravy.",
    preparationFi:
      "Perunakuutioita maukkaassa maustetussa pinaattikastikkeessa.",
    price: 14.5,
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Vegetarian Main Courses",
    categoryFi: "Kasvispääruoat",
    nameEn: "Chana Masala",
    nameFi: "Chana Masala",
    preparationEn:
      "Chickpeas simmered with tomatoes, onions, garlic, and authentic Punjabi spices.",
    preparationFi:
      "Kikherneitä tomaatti-sipulikastikkeessa aidoilla punjabilaisilla mausteilla.",
    price: 14.5,
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Vegetarian Main Courses",
    categoryFi: "Kasvispääruoat",
    nameEn: "Paneer Butter Masala",
    nameFi: "Paneer Butter Masala",
    preparationEn:
      "Cottage cheese pieces bathed in a smooth, rich tomato butter cream sauce.",
    preparationFi:
      "Tuorejuustoa pehmeässä ja täyteläisessä tomaatti-voikermakastikkeessa.",
    price: 16.5,
    imageUrl:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Vegetarian Main Courses",
    categoryFi: "Kasvispääruoat",
    nameEn: "Paneer Tikka Masala",
    nameFi: "Paneer Tikka Masala",
    preparationEn:
      "Tandoori-grilled spiced cottage cheese cubes served in a rich masala sauce.",
    preparationFi:
      "Tandoorigrillattuja marinoituja tuorejuustopaloja mausteisessa masalakastikkeessa.",
    price: 16.5,
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },

  // ==========================================
  // 3. SIZZLING / SIZZLERIT
  // ==========================================
  {
    categoryEn: "Sizzling",
    categoryFi: "Sizzlerit",
    nameEn: "Mix Grill Sizzler",
    nameFi: "Mix Grill Sizzler",
    preparationEn:
      "Assorted tandoori chicken, juicy lamb, and king prawns served on a piping hot sizzler.",
    preparationFi:
      "Valikoima tandoorikanaa, lammasta ja jättikatkarapuja kuumalla parilalla.",
    price: 22.5,
    imageUrl:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Sizzling",
    categoryFi: "Sizzlerit",
    nameEn: "Tandoori King Prawn Sizzler",
    nameFi: "Tandoori King Prawn Sizzler",
    preparationEn:
      "Jumbo king prawns marinated in tandoori spices and roasted, served sizzling.",
    preparationFi:
      "Tandoorimarinoituja ja paahdettuja jättikatkarapuja tirisevällä parilalla.",
    price: 22.0,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Sizzling",
    categoryFi: "Sizzlerit",
    nameEn: "Tandoori Mix Tikka Sizzler",
    nameFi: "Tandoori Mix Tikka Sizzler",
    preparationEn:
      "Tandoori chicken tikka, lamb tikka, and paneer tikka served on a sizzling hot plate.",
    preparationFi:
      "Kanan, lampaan ja tuorejuuston tikkapaloja tirisevällä parilalla.",
    price: 20.5,
    imageUrl:
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Sizzling",
    categoryFi: "Sizzlerit",
    nameEn: "Fish Tikka Sizzler",
    nameFi: "Fish Tikka Sizzler",
    preparationEn:
      "Spiced fish fillets grilled in clay tandoor and served on a bed of sautéed onions.",
    preparationFi:
      "Maustettuja tandoorissa grillattuja kalafileitä kuumalla sipulipedillä.",
    price: 20.5,
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Sizzling",
    categoryFi: "Sizzlerit",
    nameEn: "Vegetarian Sizzler",
    nameFi: "Kasvis Sizzler",
    preparationEn:
      "Grilled paneer, button mushrooms, and seasoned vegetables served sizzling hot.",
    preparationFi:
      "Grillattua paneeria, herkkusieniä ja maustettuja kasviksia tirisevällä parilalla.",
    price: 18.5,
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },

  // ==========================================
  // 4. LAMB MAIN COURSES / LAMMASPÄÄRUOAT
  // ==========================================
  {
    categoryEn: "Lamb Main Courses",
    categoryFi: "Lammaspääruoat",
    nameEn: "Mutton Rogan Josh",
    nameFi: "Mutton Rogan Josh",
    preparationEn:
      "Tender lamb pieces simmered in rich gravy with Kashmiri red chilies and aromatics.",
    preparationFi:
      "Mureaa lammasta kashmirilaisessa aromaattisessa punaisessa yrttikastikkeessa.",
    price: 18.9,
    imageUrl:
      "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Lamb Main Courses",
    categoryFi: "Lammaspääruoat",
    nameEn: "Lamb Korma",
    nameFi: "Lamb Korma",
    preparationEn:
      "Tender lamb simmered in a mild, creamy sauce made of cashews, almonds, and cream.",
    preparationFi:
      "Mureaa lammasta miedossa ja kermaisessa cashew-mantelikastikkeessa.",
    price: 18.9,
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Lamb Main Courses",
    categoryFi: "Lammaspääruoat",
    nameEn: "Lamb Spinach",
    nameFi: "Lamb Spinach (Pinaattilammas)",
    preparationEn:
      "Tender lamb chunks cooked with fresh pureed spinach, garlic, and warming spices.",
    preparationFi:
      "Mureaa lammasta tuoreessa maustetussa pinaatti-valkosipulikastikkeessa.",
    price: 18.9,
    imageUrl:
      "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Lamb Main Courses",
    categoryFi: "Lammaspääruoat",
    nameEn: "Butter Mutton Curry",
    nameFi: "Butter Mutton Curry",
    preparationEn:
      "Tender lamb pieces cooked in a luxurious butter, tomato, and cream sauce.",
    preparationFi:
      "Mureaa lammasta täyteläisessä tomaatti-, voi- ja kermakastikkeessa.",
    price: 18.9,
    imageUrl:
      "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Lamb Main Courses",
    categoryFi: "Lammaspääruoat",
    nameEn: "Lamb Jalfrezi",
    nameFi: "Lamb Jalfrezi",
    preparationEn:
      "Lamb pieces cooked with stir-fried bell peppers, onions, tomatoes, and chilies.",
    preparationFi:
      "Lammasta paistettuna paprikan, sipulin, tomaatin ja tuoreen chilin kera.",
    price: 18.9,
    imageUrl:
      "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Lamb Main Courses",
    categoryFi: "Lammaspääruoat",
    nameEn: "Mutton Tikka Masala",
    nameFi: "Mutton Tikka Masala",
    preparationEn:
      "Tandoori-grilled marinated lamb pieces served in a zesty, spiced masala sauce.",
    preparationFi:
      "Tandoorissa grillattua marinoitua lammasta mausteisessa masalakastikkeessa.",
    price: 19.5,
    imageUrl:
      "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Lamb Main Courses",
    categoryFi: "Lammaspääruoat",
    nameEn: "Lamb Vindaloo",
    nameFi: "Lamb Vindaloo",
    preparationEn:
      "Very spicy Goan curry of lamb cooked with potatoes, vinegar, and hot chili paste.",
    preparationFi:
      "Erittäin tulista lammasta etikka-chilikastikkeessa perunoiden kera.",
    price: 18.9,
    imageUrl:
      "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80",
  },

  // ==========================================
  // 5. BEEF MAIN COURSES / NAUTAPÄÄRUOAT
  // ==========================================
  {
    categoryEn: "Beef Main Courses",
    categoryFi: "Nautapääruoat",
    nameEn: "Beef Vindaloo",
    nameFi: "Nautaa Vindaloo",
    preparationEn:
      "Fiery hot beef curry with vinegar, red chilies, and soft potatoes.",
    preparationFi:
      "Erittäin tulista nautaa tulisessa chili-etikkakastikkeessa perunan kera.",
    price: 17.9,
    imageUrl:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Beef Main Courses",
    categoryFi: "Nautapääruoat",
    nameEn: "Traditional Beef Curry",
    nameFi: "Perinteinen nautacurry",
    preparationEn:
      "Tender beef chunks simmered slowly in an authentic Indian spiced onion curry.",
    preparationFi:
      "Mureita naudanlihapaloja haudutettuna perinteisessä intialaisessa maustekastikkeessa.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Beef Main Courses",
    categoryFi: "Nautapääruoat",
    nameEn: "Beef Korma",
    nameFi: "Nautaa Korma",
    preparationEn:
      "Tender beef cooked gently in a mild, silky cashew and cream curry.",
    preparationFi:
      "Mureaa nautaa miedossa ja kermaisessa cashew-pähkinäkastikkeessa.",
    price: 17.9,
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Beef Main Courses",
    categoryFi: "Nautapääruoat",
    nameEn: "Madras Beef Curry",
    nameFi: "Madras Nautacurry",
    preparationEn:
      "Spicy South Indian beef curry with mustard seeds, coconut, and curry leaves.",
    preparationFi:
      "Tulista eteläintialaista nautacurrya sinapinsiemenillä, kookoksella ja currylehdillä.",
    price: 17.9,
    imageUrl:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Beef Main Courses",
    categoryFi: "Nautapääruoat",
    nameEn: "Mughlai Beef Curry",
    nameFi: "Mughlai Nautacurry",
    preparationEn:
      "Tender beef cubes cooked in an opulent Mughlai style spiced cream gravy.",
    preparationFi:
      "Täyteläistä nautaa kuninkaallisessa Mughlai-tyylisessä maustekermakastikkeessa.",
    price: 17.9,
    imageUrl:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Beef Main Courses",
    categoryFi: "Nautapääruoat",
    nameEn: "Beef Chilli Garlic",
    nameFi: "Nautaa valkosipuli-chili",
    preparationEn:
      "Beef strips sautéed with sliced fresh garlic, hot green chilies, and onions.",
    preparationFi:
      "Nautasuikaleita paistettuna tuoreen valkosipulin, tulisen chilin ja sipulin kera.",
    price: 17.9,
    imageUrl:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Beef Main Courses",
    categoryFi: "Nautapääruoat",
    nameEn: "Mushroom Beef Curry",
    nameFi: "Nautaa herkkusienillä",
    preparationEn:
      "Tender beef chunks and fresh button mushrooms simmered in curry sauce.",
    preparationFi:
      "Mureaa naudanlihaa ja tuoreita herkkusieniä mausteisessa currykastikkeessa.",
    price: 17.9,
    imageUrl:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Beef Main Courses",
    categoryFi: "Nautapääruoat",
    nameEn: "Beef Dalwala",
    nameFi: "Nautaa Dalwala",
    preparationEn:
      "Slow-cooked beef simmered with yellow lentils and tempered spices.",
    preparationFi:
      "Haudutettua naudanlihaa keltaisten linssien ja mausteiden kera.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Beef Main Courses",
    categoryFi: "Nautapääruoat",
    nameEn: "Beef Palak",
    nameFi: "Nautaa Palak",
    preparationEn:
      "Beef cubes cooked with creamy, garlic-infused spinach puree.",
    preparationFi:
      "Naudankuutioita kermaisessa ja valkosipulisessa pinaattikastikkeessa.",
    price: 17.9,
    imageUrl:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Beef Main Courses",
    categoryFi: "Nautapääruoat",
    nameEn: "Beef Tikka Masala",
    nameFi: "Nautaa Tikka Masala",
    preparationEn:
      "Tandoori-roasted beef cooked in a vibrant, spiced tomato and onion gravy.",
    preparationFi:
      "Tandoorissa paahdettua nautaa mausteisessa tomaatti-sipulimasalakastikkeessa.",
    price: 18.5,
    imageUrl:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80",
  },

  // ==========================================
  // 6. CHICKEN MAIN COURSES / KANAPÄÄRUOAT
  // ==========================================
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Chicken Korma",
    nameFi: "Kanakorma",
    preparationEn:
      "Boneless chicken simmered in a mild, sweet cashew and coconut cream sauce.",
    preparationFi:
      "Pehmeää kananrintaa miedossa ja makeahkossa cashew-kookoskermakastikkeessa.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Murg Makhani (Butter Chicken)",
    nameFi: "Murg Makhani (Voikana)",
    preparationEn:
      "Tandoori chicken pieces cooked in a rich, buttery tomato cream gravy.",
    preparationFi:
      "Tandoorigrillattua kanaa täyteläisessä tomaatti-voikermakastikkeessa.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Chicken Curry",
    nameFi: "Kanacurry",
    preparationEn:
      "Traditional home-style chicken curry cooked with onions, ginger, and garlic.",
    preparationFi:
      "Perinteistä intialaista kanacurrya inkiväärillä, valkosipulilla ja mausteilla.",
    price: 17.0,
    imageUrl:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Chicken Pepper Fry",
    nameFi: "Pippurinen paistettu kana",
    preparationEn:
      "Chicken tossed with cracked black pepper, curry leaves, ginger, and onion.",
    preparationFi:
      "Kanaa paistettuna mustapippurin, currylehtien, inkiväärin ja sipulin kera.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Chicken Palak",
    nameFi: "Kana Palak (Pinaattikana)",
    preparationEn:
      "Chicken cooked in a smooth, flavorful spinach sauce with ground herbs.",
    preparationFi:
      "Kanaa pehmeässä ja maustetussa pinaattikastikkeessa yrteillä.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Mughlai Murgh Curry",
    nameFi: "Mughlai Kanacurry",
    preparationEn:
      "Chicken cooked in a rich, mild royal Mughal style nut-infused cream sauce.",
    preparationFi:
      "Kanaa kuninkaallisessa Mughlai-tyylisessä pähkinä-kermakastikkeessa.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Chicken Tikka Masala",
    nameFi: "Kana Tikka Masala",
    preparationEn:
      "Marinated roasted chicken pieces in a spiced, creamy tomato and onion sauce.",
    preparationFi:
      "Marinoitua tandoorikanaa mausteisessa tomaatti-sipulimasalakastikkeessa.",
    price: 17.9,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Chicken Vindaloo",
    nameFi: "Kana Vindaloo",
    preparationEn:
      "Fiery hot Goan chicken curry cooked with potatoes, vinegar, and hot chili paste.",
    preparationFi:
      "Erittäin tulista kanaa etikka-chilikastikkeessa perunoiden kera.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Methi Chicken Curry",
    nameFi: "Methi Kanacurry",
    preparationEn:
      "Chicken cooked with aromatic dried fenugreek leaves and traditional spices.",
    preparationFi:
      "Kanaa valmistettuna aromaattisten sarviapilanlehtien ja mausteiden kera.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Mango Chicken Curry",
    nameFi: "Mango Kanacurry",
    preparationEn:
      "Chicken cooked in a mild, sweet, and tangy mango cream sauce.",
    preparationFi:
      "Kanaa miedossa, makeassa ja hedelmäisessä mango-kermakastikkeessa.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Chicken Jalfrezi",
    nameFi: "Kana Jalfrezi",
    preparationEn:
      "Chicken stir-fried with bell peppers, onions, tomatoes, and spicy curry gravy.",
    preparationFi:
      "Kanaa paistettuna paprikan, sipulin, tomaatin ja mausteisen kastikkeen kera.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Madras Chicken Curry",
    nameFi: "Madras Kanacurry",
    preparationEn:
      "South Indian spicy chicken curry with coconut milk, curry leaves, and mustard seeds.",
    preparationFi:
      "Tulista eteläintialaista kanacurrya kookosmaidolla, currylehdillä ja sinapinsiemenillä.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Kadai Chicken Curry",
    nameFi: "Kadai Kanacurry",
    preparationEn:
      "Chicken pieces cooked in a wok with freshly ground coriander, chili, and peppers.",
    preparationFi:
      "Kanaa valmistettuna wokissa vastajauhetun korianterin, chilin ja paprikan kera.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Dahi Masala Chicken",
    nameFi: "Dahi Masala Kana",
    preparationEn:
      "Chicken cooked in a tangy spiced yogurt sauce enriched with roasted cumin.",
    preparationFi:
      "Kanaa täyteläisessä jogurttikastikkeessa paahdetun kuminan ja mausteiden kera.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Chicken Main Courses",
    categoryFi: "Kanapääruoat",
    nameEn: "Hyderabadi Chicken Curry",
    nameFi: "Hyderabadi Kanacurry",
    preparationEn:
      "Authentic Hyderabadi chicken curry cooked with roasted coconut, poppy seeds, and herbs.",
    preparationFi:
      "Aitoa Hyderabadi-kanacurrya paahdetulla kookoksella, unikon siemenillä ja yrteillä.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  },

  // ==========================================
  // 7. SEAFOOD / MERENELÄVÄT
  // ==========================================
  {
    categoryEn: "Seafood",
    categoryFi: "Merenelävät",
    nameEn: "Garlic Prawns",
    nameFi: "Valkosipulikatkaravut",
    preparationEn:
      "Succulent king prawns sautéed with crushed garlic, butter, and coriander.",
    preparationFi:
      "Meheviä jättikatkarapuja paistettuna tuoreen valkosipulin, voin ja korianterin kera.",
    price: 18.9,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Seafood",
    categoryFi: "Merenelävät",
    nameEn: "Fish Curry",
    nameFi: "Kalacurry",
    preparationEn:
      "Fish fillets simmered in coconut milk, mustard seeds, and tangy tamarind curry.",
    preparationFi:
      "Kalafileitä kookosmaidossa, sinapinsiemenissä ja tamarindilla maustetussa curryssa.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Seafood",
    categoryFi: "Merenelävät",
    nameEn: "Prawn Curry",
    nameFi: "Katkarapucurry",
    preparationEn:
      "Tender prawns simmered in an onion-tomato gravy with Indian spices.",
    preparationFi:
      "Meheviä katkarapuja haudutettuna tomaatti-sipulikastikkeessa intialaisilla mausteilla.",
    price: 18.5,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Seafood",
    categoryFi: "Merenelävät",
    nameEn: "Tandoori King Prawns",
    nameFi: "Tandoori Jättikatkaravut",
    preparationEn:
      "Jumbo king prawns marinated in spiced tandoori yogurt and grilled over hot coals.",
    preparationFi:
      "Jättikatkarapuja marinoituna tandoorimausteissa ja grillattuna hiilillä.",
    price: 20.9,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Seafood",
    categoryFi: "Merenelävät",
    nameEn: "Squid Prawn",
    nameFi: "Mustekala-katkarapu",
    preparationEn:
      "Tender squid rings and juicy prawns stir-fried with onions, peppers, and spicy sauce.",
    preparationFi:
      "Mustekalarenkaita ja katkarapuja paistettuna sipulin, paprikan ja maustekastikkeen kera.",
    price: 19.5,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Seafood",
    categoryFi: "Merenelävät",
    nameEn: "Prawn Chilli Curry",
    nameFi: "Katkarapu-chilicurry",
    preparationEn:
      "Prawns sautéed with red chilies, bell peppers, onions, and spicy tomato sauce.",
    preparationFi:
      "Katkarapuja paistettuna punaisen chilin, paprikan, sipulin ja chilikastikkeen kera.",
    price: 18.9,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Seafood",
    categoryFi: "Merenelävät",
    nameEn: "Fish Chilli Curry",
    nameFi: "Kala-chilicurry",
    preparationEn:
      "Fish fillets cooked in hot chili gravy with fresh peppers, onions, and ginger.",
    preparationFi:
      "Kalafileitä tulisessa chilikastikkeessa paprikan, sipulin ja inkiväärin kera.",
    price: 18.0,
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Seafood",
    categoryFi: "Merenelävät",
    nameEn: "Fish Masala",
    nameFi: "Kalamasala",
    preparationEn:
      "Fish pieces cooked in a thick, hearty onion, tomato, and ground garam masala gravy.",
    preparationFi:
      "Kalapaloja paksussa sipuli-, tomaatti- ja garam masalakastikkeessa.",
    price: 17.9,
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
  },

  // ==========================================
  // 8. RICE / RIISI
  // ==========================================
  {
    categoryEn: "Rice",
    categoryFi: "Riisit",
    nameEn: "Basmati Rice",
    nameFi: "Basmatiriisi",
    preparationEn: "Fragrant, fluffy long-grain steamed basmati rice.",
    preparationFi:
      "Aromaattista, kuohkeaa ja höyrytettyä pitkäjyväistä basmatiriisiä.",
    price: 3.5,
    imageUrl:
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Rice",
    categoryFi: "Riisit",
    nameEn: "Vegetable Biryani",
    nameFi: "Kasvisbiryani",
    preparationEn:
      "Layered basmati rice and fresh vegetables cooked with saffron, mint, and spices.",
    preparationFi:
      "Haudutettua basmatiriisiä ja vihanneksia sahramilla, mintulla ja mausteilla.",
    price: 15.5,
    imageUrl:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Rice",
    categoryFi: "Riisit",
    nameEn: "Chicken Biryani",
    nameFi: "Kanabiryani",
    preparationEn:
      "Aromatic basmati rice cooked on 'dum' with marinated tender chicken and spices.",
    preparationFi:
      "Aromaattista basmatiriisiä haudutettuna marinoidun kanan ja mausteiden kera.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Rice",
    categoryFi: "Riisit",
    nameEn: "Beef Biryani",
    nameFi: "Nautabiryani",
    preparationEn:
      "Spiced basmati rice layered with slow-cooked tender beef and aromatics.",
    preparationFi:
      "Mausteista basmatiriisiä ja hitaasti haudutettua mureaa naudanlihaa.",
    price: 18.0,
    imageUrl:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Rice",
    categoryFi: "Riisit",
    nameEn: "Lamb Biryani",
    nameFi: "Lammasbiryani",
    preparationEn:
      "Royal basmati rice cooked with succulent spiced lamb chunks and saffron.",
    preparationFi:
      "Sahramilla maustettua basmatiriisiä ja mureita mausteisia lampaanpaloja.",
    price: 18.5,
    imageUrl:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Rice",
    categoryFi: "Riisit",
    nameEn: "Prawn Biryani",
    nameFi: "Katkarapubiryani",
    preparationEn:
      "Basmati rice layered and cooked with juicy prawns, onions, and garam masala.",
    preparationFi:
      "Basmatiriisiä kypsennettynä mehevien katkarapujen ja mausteiden kera.",
    price: 19.5,
    imageUrl:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
  },

  // ==========================================
  // 9. NAAN BREADS / NAAN-LEIVÄT
  // ==========================================
  {
    categoryEn: "Naan Breads",
    categoryFi: "Naan-leivät",
    nameEn: "Plain Naan",
    nameFi: "Perinteinen naan",
    preparationEn:
      "Traditional soft and fluffy white flour flatbread baked in the clay tandoor.",
    preparationFi:
      "Perinteinen pehmeä saviuunissa paistettu intialainen vehnäleipä.",
    price: 2.5,
    imageUrl:
      "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Naan Breads",
    categoryFi: "Naan-leivät",
    nameEn: "Butter Naan",
    nameFi: "Voinaan",
    preparationEn:
      "Flaky layered tandoori flatbread brushed generously with melted butter.",
    preparationFi:
      "Lehtevä tandoorileipä siveltynä runsaasti sulatetulla voilla.",
    price: 3.0,
    imageUrl:
      "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Naan Breads",
    categoryFi: "Naan-leivät",
    nameEn: "Garlic Naan",
    nameFi: "Valkosipulinaan",
    preparationEn:
      "Tandoori flatbread topped with minced garlic butter and fresh cilantro.",
    preparationFi:
      "Tandoorileipä valkosipulivoilla ja tuoreella korianterilla maustettuna.",
    price: 3.5,
    imageUrl:
      "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80",
  },

  // ==========================================
  // 10. DESSERTS / JÄLKIRUOAT
  // ==========================================
  {
    categoryEn: "Desserts",
    categoryFi: "Jälkiruoat",
    nameEn: "Gulab Jamun",
    nameFi: "Gulab Jamun",
    preparationEn:
      "Deep-fried milk dough dumplings soaked in fragrant rose and cardamom syrup.",
    preparationFi:
      "Friteerattuja maitotiivistepalloja ruusuvedellä ja kardemummalla maustetussa siirapissa.",
    price: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Desserts",
    categoryFi: "Jälkiruoat",
    nameEn: "Mango Kulfi",
    nameFi: "Mangokulfi",
    preparationEn:
      "Traditional dense and creamy Indian ice cream flavored with sweet Alphonso mango.",
    preparationFi:
      "Perinteistä täyteläistä intialaista Alphonso-mangolla maustettua kulfi-jäätelöä.",
    price: 5.0,
    imageUrl:
      "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Desserts",
    categoryFi: "Jälkiruoat",
    nameEn: "Chili Lemon Sorbet",
    nameFi: "Chili-sitruunasorbetti",
    preparationEn:
      "Refreshing, tangy lemon sorbet with a subtle hint of warming chili spice.",
    preparationFi:
      "Raikasta sitruunasorbettia hienovaraisella ja lämpimällä chilin vivahteella.",
    price: 5.5,
    imageUrl:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Desserts",
    categoryFi: "Jälkiruoat",
    nameEn: "Ice Cream",
    nameFi: "Jäätelö",
    preparationEn:
      "Two scoops of premium ice cream (Vanilla, Chocolate, or Strawberry).",
    preparationFi: "Kaksi palloa jäätelöä (vanilja, suklaa tai mansikka).",
    price: 4.0,
    imageUrl:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80",
  },

  // ==========================================
  // 11. TEA / TEE
  // ==========================================
  {
    categoryEn: "Tea",
    categoryFi: "Tee",
    nameEn: "Indian Chai",
    nameFi: "Intialainen tee (Chai)",
    preparationEn:
      "Traditional spiced black milk tea brewed with cardamom, ginger, and cloves.",
    preparationFi:
      "Perinteistä mausteista mustaa maitoteetä kardemummalla, inkiväärillä ja neilikalla.",
    price: 3.5,
    imageUrl:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Tea",
    categoryFi: "Tee",
    nameEn: "Black Tea",
    nameFi: "Musta tee",
    preparationEn: "Freshly brewed classic aromatic black tea.",
    preparationFi: "Vastahaudutettua perinteistä aromaattista mustaa teetä.",
    price: 2.5,
    imageUrl:
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Tea",
    categoryFi: "Tee",
    nameEn: "Green Tea",
    nameFi: "Vihreä tee",
    preparationEn: "Steamed, delicate antioxidant-rich green tea leaves.",
    preparationFi: "Raikasta ja kevyttä antioksidanttirikasta vihreää teetä.",
    price: 2.5,
    imageUrl:
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80",
  },

  // ==========================================
  // 12. DRINKS / JUOMAT
  // ==========================================
  {
    categoryEn: "Drinks",
    categoryFi: "Juomat",
    nameEn: "Soft Drinks (0.33l / 0.5l)",
    nameFi: "Virvoitusjuomat (0,33 l / 0,5 l)",
    preparationEn: "Choice of Coca-Cola, Coca-Cola Zero, Fanta, or Sprite.",
    preparationFi:
      "Valinnan mukaan Coca-Cola, Coca-Cola Zero, Fanta tai Sprite.",
    price: 3.0,
    imageUrl:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Drinks",
    categoryFi: "Juomat",
    nameEn: "Mango Lassi",
    nameFi: "Mangolassi",
    preparationEn:
      "Chilled yogurt smoothie blended with ripe mango puree and cardamom.",
    preparationFi:
      "Kylmä ja täyteläinen intialainen jogurttijuoma mangososeella ja kardemummalla.",
    price: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&w=600&q=80",
  },
  {
    categoryEn: "Drinks",
    categoryFi: "Juomat",
    nameEn: "Sweet Lassi",
    nameFi: "Makea lassi",
    preparationEn:
      "Traditional sweetened churned yogurt cooler with a hint of rosewater.",
    preparationFi:
      "Perinteinen makea vispattu jogurttijuoma ruusuveden vivahteella.",
    price: 4.0,
    imageUrl:
      "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&w=600&q=80",
  },
];

async function seedDatabase() {
  console.log("Seeding Tandoori Koti À La Carte Menu into Neon PostgreSQL...");

  // Clear existing items to prevent duplicates
  await prisma.regularMenu.deleteMany({});
  console.log("Cleared existing dishes from database.");

  // Insert all dishes
  let count = 0;
  for (const item of menuItems) {
    await prisma.regularMenu.create({
      data: item,
    });
    count++;
  }

  console.log(
    `Successfully seeded ${count} bilingual dishes into the database!`,
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
