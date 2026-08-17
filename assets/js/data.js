/* =============================================================
   Shared site data — Shree Munisuvrat Swami Jain Derasar
   Edit this one file and every page picks up the change.
   ============================================================= */
window.DERASAR = (function () {

  /* --- Temple details ------------------------------------------------- */
  const info = {
    name:     'Shree Munisuvrat Swami Jain Derasar',
    nameGu:   'શ્રી મુનિસુવ્રત સ્વામી જૈન દેરાસર',
    sangh:    'Shri Karelibaug Shwetambar Murtipujak Jain Sangh',
    sanghGu:  'શ્રી કારેલીબાગ શ્વેતામ્બર મૂર્તિપૂજક જૈન સંઘ',
    phone:    '099674 76524',
    phoneRaw: '+919967476524',
    address:  'Naka Jivan Bharti, Pratapkunj Society Road, Opposite Arya Kanya Vidyalaya, Karelibagh, Vadodara, Gujarat 390018',
    plusCode: '858X+CV Vadodara, Gujarat',
    lat: 22.3160642,
    lng: 73.1997035,
    rating: 4.6,
    reviewCount: 172,
    mapsUrl: 'https://maps.app.goo.gl/kbTzvgjWpJrhCLjv8',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=22.3160642%2C73.1997035'
  };

  /* --- Daily darshan & aarti schedule (IST) --------------------------- */
  const schedule = [
    { key: 'open',     t: '05:45', name: 'Derasar opens',   nameGu: 'દેરાસર ખૂલે',       desc: 'The gabhara doors open and prakshal begins',        icon: 'sunrise' },
    { key: 'prakshal', t: '06:30', name: 'Prakshal & Puja', nameGu: 'પ્રક્ષાલ અને પૂજા', desc: 'Abhishek of the Mulnayak, then ashtaprakari puja',  icon: 'kalash'  },
    { key: 'snatra',   t: '08:30', name: 'Snatra Puja',     nameGu: 'સ્નાત્ર પૂજા',      desc: 'On parva days and sponsored occasions',             icon: 'lotus'   },
    { key: 'noon',     t: '12:00', name: 'Madhyahn Puja',   nameGu: 'મધ્યાહ્ન પૂજા',     desc: 'The midday puja; the sanctum then rests',           icon: 'sun'     },
    { key: 'reopen',   t: '16:30', name: 'Evening darshan', nameGu: 'સાંજે દર્શન',       desc: 'Doors reopen for darshan and chaityavandan',        icon: 'door'    },
    { key: 'aarti',    t: '19:00', name: 'Sandhya Aarti',   nameGu: 'સંધ્યા આરતી',       desc: 'The evening aarti, followed by Mangal Divo',        icon: 'diya'    },
    { key: 'close',    t: '20:30', name: 'Derasar closes',  nameGu: 'દેરાસર બંધ',        desc: 'The last darshan of the day',                       icon: 'moon'    }
  ];

  /* --- Photographs ---------------------------------------------------- */
  const gallery = [
    { f: 'facade-day',         cat: 'architecture', tall: false, cap: 'The full shikhar-bandhi facade in white marble and rose sandstone, with the pair of carved elephants flanking the steps.' },
    { f: 'mulnayak-aarti',     cat: 'sanctum',      tall: false, cap: 'Mulnayak Shri Munisuvrat Swami Bhagwan, angi-adorned, ringed by ghee lamps at aarti.' },
    { f: 'mulnayak-closeup',   cat: 'sanctum',      tall: true,  cap: 'The shyam-varna Mulnayak in the golden parikar, framed by inlaid marble and chhatras.' },
    { f: 'facade-dusk',        cat: 'architecture', tall: false, cap: 'Diyas along the compound wall at dusk — the derasar on a parva evening.' },
    { f: 'gabhara-doorway',    cat: 'sanctum',      tall: true,  cap: 'The gabhara doorway: Shri Mahavir Swami on the left, Shri Naminath on the right of the Mulnayak.' },
    { f: 'rangmandap-silver',  cat: 'interior',     tall: false, cap: 'Silver-plated gabhara doors and the painted rangmandap ceiling, with a silver samavasaran alongside.' },
    { f: 'simandhar-shrine',   cat: 'interior',     tall: false, cap: 'The Shri Simandhar Swami shrine, lit and garlanded, with the aarti and Mangal Divo verses on the wall.' },
    { f: 'entrance-gate',      cat: 'architecture', tall: true,  cap: 'The main gate under the Sangh nameplate, crowned by the dharmachakra and guardian lions.' },
    { f: 'ghantakarna-mandap', cat: 'architecture', tall: true,  cap: 'The pillared sandstone mandap beside the Shri Ghantakarna Mahavir devalaya.' },
    { f: 'tirthpata-hall',     cat: 'interior',     tall: false, cap: 'The hall behind the derasar: framed tirth-patas of the great Jain tirths above an inlaid marble floor.' },
    { f: 'shikhar-elephant',   cat: 'architecture', tall: true,  cap: 'The dhwaja-danda over the shikhar, and the painted elephant at the compound gate.' },
    { f: 'street-corner',      cat: 'architecture', tall: true,  cap: 'The derasar from Pratapkunj Society Road, the way most visitors first see it.' }
  ];

  /* --- What visitors say ---------------------------------------------- */
  const reviews = [
    { who: 'Bhushan Vyas', meta: 'Visitor · Google review', stars: 5,
      text: 'Beautiful jain temple in karelibaug. Very much neat and clean complex. Carving is beautiful. Colourful idols are attractive. Divine and peaceful place.' },
    { who: 'Milind Shah', meta: 'Visitor · Google review', stars: 5,
      text: 'Most devine place for your inner peace.' },
    { who: 'Visitor', meta: 'Review highlight', stars: 5,
      text: 'Holy temple located at a peaceful, non-traffic area.' },
    { who: 'Visitor', meta: 'Review highlight', stars: 5,
      text: 'Excellent place of worship.' }
  ];

  /* --- The Jain parva calendar (tithi-based, so it holds every year) --- */
  const festivals = [
    { when: 'Kartik Sud 5',       name: 'Gyan Panchami',            note: 'The Sangh’s gnan-bhandar and pothis are cleaned, arranged and worshipped — a day for the vandana of knowledge itself.' },
    { when: 'Kartik Purnima',     name: 'Kartik Purnima',           note: 'The close of chaturmas. Traditionally the day the Shatrunjay yatra season opens and sanghs set out on tirth-yatra.' },
    { when: 'Magsar Sud 11',      name: 'Maun Ekadashi',            note: 'A day of silence and japa; devotees keep maun through the day and the derasar is unusually still.' },
    { when: 'Posh Vad 10',        name: 'Posh Dashami',             note: 'Janma-kalyanak of Shri Parshwanath Bhagwan — marked here with attham tap, abhishek and three days of puja.' },
    { when: 'Maha Sud 13',        name: 'Varshi Tap begins',        note: 'Devotees taking the year-long varshi tap begin their ekantar upvas cycle.' },
    { when: 'Chaitra Sud 13',     name: 'Mahavir Janma Kalyanak',   note: 'The largest day of the year — janma-vachan, snatra puja, an evening bhavna and a Sangh-wide procession.' },
    { when: 'Vaishakh Sud 3',     name: 'Akshay Tritiya',           note: 'The parna of varshi tap with sugarcane juice, recalling Rushabhdev Bhagwan’s first alms after a year of fasting.' },
    { when: 'Ashadh Sud 14',      name: 'Chaumasi Chaudas',         note: 'The beginning of the four-month chaturmas; pratikraman, and the resolutions taken for the rainy season.' },
    { when: 'Bhadrapad · 8 days', name: 'Paryushan Mahaparva',      note: 'The eight days of the year: daily pravachan, the Kalpasutra vachan, the Mahavir-janma-vachan, tapasya and the Ashtaprakari puja.' },
    { when: 'Bhadrapad Sud 4/5',  name: 'Samvatsari',               note: 'Barsa-sutra shravan, the great pratikraman, and the day the whole Sangh asks and grants forgiveness — micchami dukkadam.' },
    { when: 'Aso Vad 13–15',      name: 'Diwali & Mahavir Nirvana', note: 'Chopda pujan, the nirvana-kalyanak of Shri Mahavir Swami, and the kevalgnan of Gautam Swami on Bestu Varsh.' }
  ];

  /* --- Seva & daan ---------------------------------------------------- */
  const sevas = [
    { name: 'Ashtaprakari Puja',    gu: 'અષ્ટપ્રકારી પૂજા',    icon: 'lotus',    note: 'Sponsor the eight-fold puja — jal, chandan, pushpa, dhoop, deep, akshat, naivedya, phal — for a chosen day.' },
    { name: 'Snatra Puja',          gu: 'સ્નાત્ર પૂજા',        icon: 'kalash',   note: 'The abhishek vidhi performed with the Sangh, usually offered on a birthday, a tithi or a family remembrance.' },
    { name: 'Angi Rachna',          gu: 'આંગી રચના',           icon: 'star',     note: 'Sponsor the day’s angi — the flower, silver-foil or kesar adornment of the Mulnayak.' },
    { name: 'Ghee Deepak & Aarti',  gu: 'ઘી દીપક અને આરતી',    icon: 'diya',     note: 'Offer the ghee for the evening lamps, or the aarti and Mangal Divo on a parva evening.' },
    { name: 'Nityapuja Nidhi',      gu: 'નિત્યપૂજા નિધિ',      icon: 'dharma',   note: 'A corpus contribution towards kesar, sukhad, flowers and the daily requirements of the gabhara.' },
    { name: 'Jirnoddhar & Upkaran', gu: 'જીર્ણોદ્ધાર',         icon: 'hand',     note: 'Towards marble, silver-work, lighting and the upkeep of the shikhar, mandap and compound.' },
    { name: 'Pathshala Support',    gu: 'પાઠશાળા',             icon: 'book',     note: 'Books, prizes and tiffin for the children’s pathshala run in the Sangh hall.' },
    { name: 'Anukampa & Jeev Daya', gu: 'અનુકંપા અને જીવદયા',  icon: 'heart',    note: 'Through the Jain Anukampa Group, Karelibaug — medical help, ration kits and animal-feed seva.' }
  ];

  /* --- Marquee tickers ------------------------------------------------ */
  const ticker = [
    'Shri Munisuvrat Swami Bhagwan',
    'Shri Mahavir Swami Bhagwan',
    'Shri Naminath Bhagwan',
    'Shri Simandhar Swami',
    'Shri Shankheshwar Parshwanath',
    'Shri Ghantakarna Mahavir'
  ];

  const tirths = [
    'Shatrunjay · Palitana',
    'Girnar · Junagadh',
    'Sammet Shikhar',
    'Shankheshwar',
    'Ranakpur',
    'Delwada · Abu',
    'Taranga',
    'Kesariyaji'
  ];

  return { info, schedule, gallery, reviews, festivals, sevas, ticker, tirths };
})();
