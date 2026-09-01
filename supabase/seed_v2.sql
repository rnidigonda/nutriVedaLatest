-- ============================================================
-- NutriVeda Enriched Product Catalog (Batch v2)
-- Adds fancy names, taglines, descriptions, ingredients,
-- how-to-use, storage info, and multi-category assignment.
--
-- PREREQUISITE: run migrations/003_product_rich_content.sql first
-- (adds tagline, how_to_use, ingredients, storage_info, shelf_life)
--
-- Safe to re-run: uses UPDATE for existing IDs, INSERT ... ON CONFLICT
-- for new products.
-- ============================================================

-- ─── NEW CATEGORIES ─────────────────────────────────────────
INSERT INTO categories (name, slug, emoji, display_order) VALUES
  ('Kids Specials', 'kids-specials', '🧒', 24),
  ('Flavoured Makhana', 'makhana', '🍿', 25),
  ('Amla Sanjeevani', 'amla', '🍋', 26),
  ('Sprouted Flours', 'flours', '🌾', 27),
  ('Karam Podis', 'karampodi', '🌶️', 28),
  ('Iron Deficiency', 'iron', '🩸', 29),
  ('B-Complex Support', 'bcomplex', '💊', 30),
  ('Irregular Periods', 'periods', '🌸', 31),
  ('Constipation Care', 'constipation', '🌿', 32),
  ('Cold & Cough', 'cold', '🤧', 33),
  ('Skin Care', 'skin', '✨', 34)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- UPDATES: enrich existing products (IDs 1-94)
-- ============================================================

-- 15: Sprouted Sathu Maavu
UPDATE products SET
  name='AncestralStrength Sathu Maavu',
  tagline='The Desi Protein of Generations',
  cat_key='health,immunity,bone,kids,kids-specials',
  description='A time-honoured South Indian health mix made from sprouted grains, pulses, and nuts — the original desi protein that nourished generations. Sprouting unlocks deeper nutrition, making it rich in plant protein, fibre, and minerals for the whole family.',
  ingredients='Sprouted rice, sprouted ragi, sprouted green gram, roasted grams, cardamom, dry fruits',
  how_to_use='Mix 2 tbsp in hot milk or water, sweeten with jaggery or honey. Enjoy as a morning drink or evening snack.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=15;

-- 16: Veg Goat Leg Soup Mix
UPDATE products SET
  name='JointVeda Mudavattukal Soup',
  tagline='Bones & Joints Partner',
  cat_key='bone,bones-strength,health',
  description='Mudavattukal Kilangu — a traditional vegetarian soup mix crafted to strengthen bones and joints. A natural, plant-based source of calcium and minerals inspired by age-old Ayurvedic wisdom.',
  ingredients='Mudavattukal kilangu (country roots), herbal blend, natural minerals, mild spices',
  how_to_use='Boil 2 tbsp in 2 cups water for 8–10 minutes, strain and drink warm. Best had once daily.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=16;

-- 17: Weight Gain Porridge Mix
UPDATE products SET
  name='WholesomeGain Porridge',
  tagline='Honest Calories for Healthy Weight',
  cat_key='weight,health,kids-specials',
  description='A natural weight-gain formula built on wholesome, calorie-dense whole foods — not empty fillers. Rich in proteins and healthy fats, it helps you gain weight the nourishing way while staying easy on digestion.',
  ingredients='Whole grains, dry fruits, nuts, seeds, natural sweeteners',
  how_to_use='Cook 3 tbsp in milk or water for 5 minutes until creamy. Sweeten to taste. Best had once or twice daily.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=17;

-- 18: Nannari Sharbath Syrup
UPDATE products SET
  name='CoolVeda Nannari Sharbath',
  tagline='Your Natural Body Coolant',
  cat_key='summer,health',
  description='A traditional South Indian cooling syrup pressed from nannari roots. Nature''s answer to scorching summers — refreshing, soothing, and free from artificial colours.',
  ingredients='Nannari (sarsaparilla) roots, natural sweetener',
  how_to_use='Mix 2 tbsp syrup in a glass of cold water, stir and enjoy chilled. Add lemon for extra zing.',
  storage_info='Refrigerate after opening. Keep away from direct sunlight.',
  shelf_life='6 Months'
WHERE id=18;

-- 19: Nalleru Kaaram Podi
UPDATE products SET
  name='BoneStrong Nalleru Podi',
  tagline='Calcium-Rich Spice Blend',
  cat_key='spices,karampodi,bone,bones-strength',
  description='A traditional South Indian spice powder built around nalleru and sesame with strengthening herbs. A flavourful, calcium-rich companion for rice and ghee that supports bone and joint health.',
  ingredients='Nalleru, sesame seeds, red chilli, garlic, curry leaves, rock salt',
  how_to_use='Mix 1–2 tsp with hot rice and ghee, or sprinkle over idli and dosa.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=19;

-- 21: Dryfruit Laddu Dates Punch
UPDATE products SET
  name='RoyalPunch Dates & Nut Laddu',
  tagline='Your Everyday Super Snack',
  cat_key='snacks,kids-specials',
  description='Naturally sweet energy laddus made from dates, premium dry fruits, and nuts bound in pure cow ghee — with zero refined sugar. A rich source of iron and calcium that fuels all ages, all day.',
  ingredients='Dates, almonds, cashews, pistachios, pure cow ghee',
  how_to_use='Enjoy 1–2 laddus a day as a snack or energy boost. Perfect for kids, athletes, and new mothers.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='3 Months'
WHERE id=21;

-- 24: Healthy Snacks Combo
UPDATE products SET
  name='GuiltFree Snack Box',
  tagline='Wholesome Munching, Zero Guilt',
  cat_key='snacks',
  description='A curated variety of nutritious laddus and traditional treats in one family-sized box. Made with natural ingredients and no refined sugar — the smart way to satisfy everyday cravings.',
  ingredients='Assorted laddus (dates, sesame, gond, rice bran), nuts, pure cow ghee',
  how_to_use='Enjoy a piece or two anytime hunger strikes. Great for lunchboxes and travel.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='3 Months'
WHERE id=24;

-- 25: Amla Candy
UPDATE products SET
  name='Sanjeevani Amla Bites',
  tagline='Nature''s Vitamin C Treat',
  cat_key='snacks,immunity,amla,iron,immunity-booster',
  description='Tangy-sweet dried amla morsels bursting with natural Vitamin C — the human sanjeevani of Ayurveda. A guilt-free candy that strengthens immunity, supports digestion, and satisfies snack cravings the wholesome way.',
  ingredients='Amla (Indian gooseberry), rock salt / natural sweetener',
  how_to_use='Enjoy 2–3 pieces a day, any time. Great after meals to aid digestion.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=25;

-- 26: Gond Laddu
UPDATE products SET
  name='MaaShakti Gond Laddu',
  tagline='Strength for New Mothers',
  cat_key='snacks,kids-specials',
  description='Traditional immunity-boosting laddus made with edible gum (gond), pure cow ghee, almonds, and cashews. A postpartum favourite that rebuilds strength, warms the body, and delivers rich, natural energy.',
  ingredients='Edible gum (gond), pure cow ghee, almonds, cashews, jaggery',
  how_to_use='Enjoy 1 laddu a day, ideally in the morning. Especially nourishing for new mothers and during winters.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='3 Months'
WHERE id=26;

-- 27: Omega 3 Laddu
UPDATE products SET
  name='BrainBoost Omega Laddu',
  tagline='Flaxseed Goodness in Every Bite',
  cat_key='snacks,kids-specials,periods',
  description='Wholesome flaxseed laddus rich in Omega 3 & 6 fatty acids, bound in pure cow ghee. A delicious way to support brain function and heart wellness for the whole family.',
  ingredients='Flaxseeds, pure cow ghee, jaggery, dry fruits',
  how_to_use='Enjoy 1–2 laddus a day as a snack or energy boost.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='3 Months'
WHERE id=27;

-- 28: Rice Bran Laddu
UPDATE products SET
  name='VitaB Rice Bran Laddu',
  tagline='A Sweeter Way to B12',
  cat_key='snacks,bcomplex',
  description='Nutrient-rich laddus made from rice bran — a naturally sweet source of Vitamin B12 that supports energy and nervous-system health. Traditional taste, modern nutrition.',
  ingredients='Rice bran, jaggery, pure cow ghee, dry fruits',
  how_to_use='Enjoy 1–2 laddus a day, ideally with breakfast.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='3 Months'
WHERE id=28;

-- 29: Sunnundalu
UPDATE products SET
  name='AndhraGold Sunnundalu',
  tagline='The Andhra Protein Classic',
  cat_key='snacks,kids-specials,bones-strength',
  description='A beloved Andhra Pradesh classic — urad dal laddus made with pure cow ghee. High in protein and natural energy, with the authentic homemade taste that generations grew up loving.',
  ingredients='Urad dal, pure cow ghee, jaggery',
  how_to_use='Enjoy 1–2 laddus a day as a protein-rich snack.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='3 Months'
WHERE id=29;

-- 30: Sesame Dates Laddu
UPDATE products SET
  name='CalciRich Sesame Dates Laddu',
  tagline='Calcium & Iron in Every Bite',
  cat_key='snacks,kids-specials,bones-strength',
  description='Nutritious laddus pairing calcium-rich sesame with iron-packed dates. A naturally sweet treat that supports strong bones and healthy blood — no refined sugar needed.',
  ingredients='Sesame seeds, dates, pure cow ghee',
  how_to_use='Enjoy 1–2 laddus a day, especially good for growing kids and women.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='3 Months'
WHERE id=30;

-- 31: Bones & Joints Strength Combo
UPDATE products SET
  name='SkeletonStrong Bones & Joints Combo',
  tagline='Complete Bone Care Solution',
  cat_key='bone,bones-strength,health',
  description='A comprehensive combo pack bringing together our best bone and joint support foods. Natural sources of calcium and minerals to keep you strong, flexible, and mobile.',
  ingredients='Assorted bone-support mixes, sesame blends, herbal roots',
  how_to_use='Follow the usage guide on each product inside the combo for best results.',
  storage_info='Store each item in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=31;

-- 32: Nalleru Pachadi
UPDATE products SET
  name='JointVeda Nalleru Pachadi',
  tagline='Bone Strength Partner',
  cat_key='bone,bones-strength,spices',
  description='A traditional sesame-based chutney powder centred on nalleru for bone and joint strength. Rich in calcium and minerals, with a delicious flavour that makes wellness effortless.',
  ingredients='Nalleru, sesame seeds, red chilli, garlic, rock salt',
  how_to_use='Mix 1–2 tsp with hot rice and ghee, or use as a side with idli/dosa.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=32;

-- 33: Moringa Sesame Kaaram Podi
UPDATE products SET
  name='IronLeaf Moringa Sesame Podi',
  tagline='Iron-Rich Superfood Spice',
  cat_key='spices,karampodi,iron,bones-strength',
  description='An iron-rich spice powder marrying moringa superfood with calcium-packed sesame. A flavourful, nutrient-dense sprinkle that turns everyday meals into wellness meals.',
  ingredients='Moringa leaves, sesame seeds, red chilli, garlic, rock salt',
  how_to_use='Mix 1–2 tsp with hot rice and ghee, or sprinkle over idli and dosa.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=33;

-- 34: Siridanya Dosa Mix
UPDATE products SET
  name='MilletMorning Siridanya Dosa Mix',
  tagline='Traditional Taste, Millet Goodness',
  cat_key='health,instant,cooking,bones-strength',
  description='A wholesome dosa mix made from nutritious siridanya millets. Delivers a crisp, traditional dosa packed with fibre and minerals for a healthy start to the day.',
  ingredients='Mixed millets (foxtail, little, kodo, barnyard), urad dal, natural spices',
  how_to_use='Mix with water to a smooth batter, rest 10 minutes, and cook crisp dosas on a hot tawa.',
  storage_info='Store in a cool, dry, airtight container.',
  shelf_life='6 Months'
WHERE id=34;

-- 35: Sesame Sunflower Kaaram Podi
UPDATE products SET
  name='CalciSeed Sesame Sunflower Podi',
  tagline='Calcium-Rich Seed Spice',
  cat_key='spices,karampodi,periods,iron',
  description='A calcium-rich spice powder blending sesame and sunflower seeds. Flavourful and nutritious, it supports bone health while making every meal tastier.',
  ingredients='Sesame seeds, sunflower seeds, red chilli, garlic, rock salt',
  how_to_use='Mix 1–2 tsp with hot rice and ghee, or use as a dry side dish.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=35;

-- 36: Moringa Curry Leaves Dosa Mix
UPDATE products SET
  name='SuperGreen Moringa Dosa Mix',
  tagline='Superfood Breakfast',
  cat_key='health,instant,iron,bones-strength',
  description='A superfood dosa mix combining moringa and antioxidant-rich curry leaves. Nutritious, flavourful, and iron-rich — a wholesome breakfast the whole family will enjoy.',
  ingredients='Rice, urad dal, moringa leaves, curry leaves, natural spices',
  how_to_use='Mix with water to a smooth batter, rest 10 minutes, cook crisp dosas.',
  storage_info='Store in a cool, dry, airtight container.',
  shelf_life='6 Months'
WHERE id=36;

-- 37: Black Rice Urad Dal Porridge Mix
UPDATE products SET
  name='AncientStrength Black Rice Porridge',
  tagline='The Ancient Secret of Strength',
  cat_key='health,bones-strength,immunity-booster',
  description='An ancient strength-building porridge combining antioxidant-rich black rice with protein-packed urad dal. Nutrient-dense and energising for lasting vitality.',
  ingredients='Black rice, urad dal, cardamom, natural sweetener',
  how_to_use='Cook 3 tbsp in milk or water for 5–7 minutes until creamy. Sweeten to taste.',
  storage_info='Store in a cool, dry, airtight container.',
  shelf_life='6 Months'
WHERE id=37;

-- 38: Immunity Booster Kit
UPDATE products SET
  name='ShieldVeda Immunity Kit',
  tagline='Complete Natural Protection',
  cat_key='immunity,immunity-booster',
  description='A complete immunity-strengthening kit bringing together herbal teas, health mixes, and natural supplements. Build strong, lasting immunity the natural way.',
  ingredients='Assorted herbal teas, health mixes, immunity powders',
  how_to_use='Follow the usage guide on each product inside the kit for a complete daily routine.',
  storage_info='Store each item in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=38;

-- 39: Moringa Powder
UPDATE products SET
  name='PureGreen Moringa Powder',
  tagline='Nature''s Multivitamin',
  cat_key='immunity,iron,immunity-booster,health',
  description='Pure moringa leaf powder — one of nature''s most complete superfoods. Packed with vitamins, minerals, and antioxidants to boost immunity, energy, and everyday vitality.',
  ingredients='100% pure moringa (drumstick) leaf powder',
  how_to_use='Mix 1 tsp in water, juice, smoothies, or dal. Start with a small dose and increase gradually.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=39;

-- 40: Herbal Tea Immunity Blend
UPDATE products SET
  name='ImmunoHerb Wellness Tea',
  tagline='Immunity Boosting Herbal Blend',
  cat_key='tea,immunity,immunity-booster,cold',
  description='An immunity-boosting herbal tea for adults, blending turmeric, cinnamon, and traditional herbs. Caffeine-free warmth and wellness in every cup.',
  ingredients='Turmeric, cinnamon, tulsi, ginger, cardamom, herbal blend',
  how_to_use='Steep 1 tsp in hot water for 3–5 minutes, strain and enjoy. Add honey if desired.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=40;

-- 41: Immune-O-Boost Tulsi Tea
UPDATE products SET
  name='TulsiGuard Immune Tea',
  tagline='Immunity Boosting Tulsi Blend',
  cat_key='tea,immunity,kids,kids-specials,immunity-booster,cold',
  description='A gentle tulsi-based immunity tea suitable for kids and adults alike. A pleasant, herbal blend that strengthens the immune system without any harsh ingredients.',
  ingredients='Tulsi (holy basil), ginger, liquorice, mild herbal blend',
  how_to_use='Steep 1 tsp in hot water for 3–4 minutes, strain and serve warm. Add honey for kids.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=41;

-- 42: Sukku Malli Coffee Powder
UPDATE products SET
  name='VedaSip Sukku Malli Brew',
  tagline='Wake Up the Ancient Way',
  cat_key='immunity,health,constipation,immunity-booster,cold',
  description='For thousands of years, our ancestors began their mornings with warm sukku-malli — long before milk coffee arrived on our shores. Celebrated across Sangam-era wellness traditions, this caffeine-free brew is crafted from genuine Sukku and country Nattu Malli (never hybrid). A soothing, aromatic ritual that warms the body, aids digestion, and reconnects you with a purer morning routine.',
  ingredients='Dry ginger (sukku), coriander seeds, black pepper, ashwagandha, turmeric, nannari roots, cardamom, liquorice root, fenugreek',
  how_to_use='Boil 1 tsp in a cup of water for 3–5 minutes, strain and enjoy hot with palm sugar or honey. Or simply mix with warm milk and jaggery for an instant coffee.',
  storage_info='Store in an airtight container or reseal the pouch fully. Avoid moisture & direct sunlight.',
  shelf_life='6 Months'
WHERE id=42;

-- 43: Guava Leaves Powder
UPDATE products SET
  name='GlucoLeaf Guava Powder',
  tagline='Natural Blood Sugar Support',
  cat_key='immunity,health,immunity-booster',
  description='Pure guava leaf powder, traditionally used to support healthy blood sugar and HbA1c levels. A gentle, natural companion for metabolic wellness.',
  ingredients='100% pure guava leaf powder',
  how_to_use='Steep 1 tsp in hot water for 5 minutes, strain and drink. Best had once daily.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=43;

-- 44: Super Kid Combo
UPDATE products SET
  name='LittleChamp Growth Combo',
  tagline='Everything Your Child Needs, In One Box',
  cat_key='kids,kids-specials',
  description='A thoughtfully curated bundle that packs a growing child''s daily nutrition into one delightful box — health mix, wholesome snacks, and gentle supplements. Made with natural, kid-approved ingredients that support height, brain development, and everyday energy.',
  ingredients='Sprouted grains, dry fruits, ragi, natural sweeteners, millets (varies by pack)',
  how_to_use='Follow the individual usage on each product inside the combo. Ideal for children 2–12 years.',
  storage_info='Store each item in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=44;

-- 45: ABC Malt
UPDATE products SET
  name='TriGlow ABC Malt',
  tagline='Amla, Beetroot & Carrot in One Sip',
  cat_key='kids,malts,kids-specials,immunity',
  description='An all-in-one malt harnessing the triple goodness of Amla, Beetroot, and Carrot. Rich in natural iron, Vitamin A, and Vitamin C, it''s a colourful, kid-loved way to build immunity, boost haemoglobin, and support healthy vision.',
  ingredients='Amla, beetroot, carrot, natural grains, cardamom',
  how_to_use='Mix 2 tbsp in warm milk, sweeten with jaggery. Ideal as a daily morning or evening drink.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=45;

-- 46: Baby Bath Powder
UPDATE products SET
  name='KomalTouch Sunni Pindi',
  tagline='Gentle Care, The Traditional Way',
  cat_key='babycare,kids-specials',
  description='A traditional herbal bath powder (sunni pindi) that lovingly cleanses and nourishes delicate baby skin. A chemical-free alternative to soap, passed down through generations for soft, healthy skin.',
  ingredients='Green gram flour, sandalwood, turmeric, rose petals, herbal blend',
  how_to_use='Mix with a little water or milk into a paste, apply gently on baby''s skin, then rinse with lukewarm water.',
  storage_info='Store in a dry, airtight container away from moisture.',
  shelf_life='6 Months'
WHERE id=46;

-- 47: Panchagavya Tooth Powder
UPDATE products SET
  name='PureBloom Panchagavya Dental',
  tagline='Ancient Wisdom for a Bright Smile',
  cat_key='oralcare,kids-specials,health',
  description='A traditional Ayurvedic tooth powder crafted with Panchagavya and natural herbs. Free from harsh chemicals, it cleans teeth, strengthens gums, and freshens breath the way nature intended.',
  ingredients='Panchagavya, neem, clove, herbal blend, natural minerals',
  how_to_use='Take a pinch on a wet toothbrush or fingertip, brush gently, and rinse. Use twice daily.',
  storage_info='Store in a dry, airtight container away from moisture.',
  shelf_life='6 Months'
WHERE id=47;

-- 48: Multi Millet Penne Pasta
UPDATE products SET
  name='MilletFusion Penne',
  tagline='Pasta With a Healthy Twist',
  cat_key='health,kids-specials',
  description='Everybody''s favourite penne, reinvented with nutrient-dense millets. A wholesome, kid-friendly alternative to refined wheat pasta — high in fibre and naturally satisfying.',
  ingredients='Multi millets, natural binding grains',
  how_to_use='Boil in salted water for 8–10 minutes until al dente, drain and toss with your favourite sauce.',
  storage_info='Store in a cool, dry, airtight container.',
  shelf_life='9 Months'
WHERE id=48;

-- 49: Sprouted Ragi Choco Malt
UPDATE products SET
  name='ChocoSprout Ragi Malt',
  tagline='Chocolate Kids Love, Nutrition You Trust',
  cat_key='kids,kids-specials',
  description='The chocolate malt reinvented — with sprouted ragi at its heart. Delivers calcium and natural energy in a rich cocoa flavour that turns drink your milk into a joyful daily treat.',
  ingredients='Sprouted ragi, cocoa, natural grains, cardamom, jaggery',
  how_to_use='Mix 2 tbsp in warm or cold milk, stir well. A perfect breakfast or after-school drink.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=49;

-- 50: Little Millet Macaroni Pasta
UPDATE products SET
  name='MilletFusion Macaroni',
  tagline='Little Millet, Big Nutrition',
  cat_key='health,kids-specials',
  description='Classic macaroni crafted from wholesome little millet — a healthier, fibre-rich twist on your child''s favourite pasta that cooks up soft and delicious.',
  ingredients='Little millet, natural binding grains',
  how_to_use='Boil in salted water for 8–10 minutes, drain and mix with sauce or veggies.',
  storage_info='Store in a cool, dry, airtight container.',
  shelf_life='9 Months'
WHERE id=50;

-- 51: Dry Fruit Powder
UPDATE products SET
  name='NutriGold Dry Fruit Mix',
  tagline='Instant Nutrition, Naturally',
  cat_key='kids,kids-specials,cooking',
  description='A premium blend of almonds, cashews, and other dry fruits ground into an instant nutrition booster. A spoonful adds brain-boosting goodness and natural energy to milk, porridge, or sweets.',
  ingredients='Almonds, cashews, pistachios, walnuts, dates',
  how_to_use='Add 1–2 tsp to milk, porridge, smoothies, or desserts. Ideal daily for kids and adults.',
  storage_info='Store in an airtight container in a cool, dry place.',
  shelf_life='3 Months'
WHERE id=51;

-- 52: Triphala Powder
UPDATE products SET
  name='TriphalaPure Digestive Powder',
  tagline='The Classic Ayurvedic Cleanser',
  cat_key='herbal,kids-specials,constipation,health',
  description='Classic Ayurvedic Triphala powder — a time-tested blend of Amla, Haritaki, and Bibhitaki. Supports gentle daily detox, smooth digestion, and gut health for the whole family.',
  ingredients='Amla, haritaki, bibhitaki',
  how_to_use='Mix 1 tsp in warm water and drink at bedtime. Start with a small dose.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=52;

-- 53: Foxtail Millet Vermicelli
UPDATE products SET
  name='MilletFusion Foxtail Vermicelli',
  tagline='Healthy Twist on a Breakfast Classic',
  cat_key='health,kids-specials',
  description='Soft, quick-cooking vermicelli made from wholesome foxtail millet. A low-glycemic, fibre-rich alternative for wholesome upma, kheer, or a light breakfast.',
  ingredients='Foxtail millet',
  how_to_use='Roast lightly, then cook in boiling water for 5–7 minutes. Use for upma, kheer, or savoury dishes.',
  storage_info='Store in a cool, dry, airtight container.',
  shelf_life='9 Months'
WHERE id=53;

-- 54: Power Seed Mix
UPDATE products SET
  name='SeedPower 7-in-1 Mix',
  tagline='Seven Seeds, One Powerhouse',
  cat_key='snacks,kids-specials,periods,health',
  description='A sand-roasted blend of seven nutritious seeds — an instant energy booster and crunchy healthy snack. Nutrient-dense goodness you can sprinkle or munch anytime.',
  ingredients='Pumpkin, flax, sunflower, sesame, chia, watermelon & muskmelon seeds',
  how_to_use='Eat a small handful as a snack, or sprinkle over salads, curd, and smoothies.',
  storage_info='Store in an airtight container in a cool, dry place.',
  shelf_life='6 Months'
WHERE id=54;

-- 55: Red Banana Malt
UPDATE products SET
  name='RedGain Banana Malt',
  tagline='Natural Weight Gain for Kids',
  cat_key='kids,malts,kids-specials',
  description='A special malt made from nutrient-rich red bananas to support healthy weight gain in children. Naturally sweet, wholesome, and gentle on little tummies.',
  ingredients='Red banana, natural grains, cardamom',
  how_to_use='Mix 2 tbsp in warm milk, sweeten with jaggery. Best as a daily morning drink.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=55;

-- 56: Beetroot Malt
UPDATE products SET
  name='RubyBoost Beetroot Malt',
  tagline='Natural Haemoglobin Booster',
  cat_key='kids,malts,kids-specials,iron',
  description='A vibrant beetroot malt that naturally supports healthy haemoglobin levels. Rich in iron and delicious in flavour — perfect for kids and anyone needing an iron lift.',
  ingredients='Beetroot, natural grains, cardamom, jaggery',
  how_to_use='Mix 2 tbsp in warm milk, stir well. Ideal as a daily morning or evening drink.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=56;

-- 57: Beetroot Amla
UPDATE products SET
  name='RubyGlow Beetroot Amla',
  tagline='Tangy Chat with Iron Power',
  cat_key='snacks,amla,iron',
  description='A flavourful chatpata snack marrying earthy beetroot with tangy amla. Loaded with iron and Vitamin C, it''s a delicious way to support haemoglobin and immunity between meals.',
  ingredients='Beetroot, amla, rock salt, natural spices',
  how_to_use='Enjoy a small handful as an anytime snack. Great tangy topping for salads too.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=57;

-- 58: Carrot Malt
UPDATE products SET
  name='VisionGlow Carrot Malt',
  tagline='Vitamin A for Bright Eyes',
  cat_key='kids,malts,kids-specials',
  description='A nourishing carrot malt rich in Vitamin A for healthy eyes and strong immunity. Naturally sweet and delicious — a wholesome daily drink kids happily finish.',
  ingredients='Carrot, natural grains, cardamom, jaggery',
  how_to_use='Mix 2 tbsp in warm milk, stir well. Best as a daily morning or evening drink.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=58;

-- 59: Moringa Sesame Makhana
UPDATE products SET
  name='CrunchVeda Moringa Sesame Makhana',
  tagline='World''s Unique Superfood Makhana',
  cat_key='snacks,makhana',
  description='A one-of-a-kind flavoured makhana crafted with moringa superfood and calcium-rich sesame. Light, crunchy, protein-rich, and utterly guilt-free munching.',
  ingredients='Fox nuts (makhana), moringa, sesame, mild spices',
  how_to_use='Enjoy straight from the pack as an anytime snack. No cooking needed.',
  storage_info='Store in an airtight container away from moisture.',
  shelf_life='4 Months'
WHERE id=59;

-- 60: Almond Curry Leaves Makhana
UPDATE products SET
  name='CrunchVeda Almond Curry Makhana',
  tagline='World''s Unique Superfood Makhana',
  cat_key='snacks,makhana',
  description='A delightful flavoured makhana pairing crunchy almonds with antioxidant-rich curry leaves. The perfect balance of taste and nutrition for guilt-free snacking.',
  ingredients='Fox nuts (makhana), almonds, curry leaves, mild spices',
  how_to_use='Enjoy straight from the pack as an anytime snack. No cooking needed.',
  storage_info='Store in an airtight container away from moisture.',
  shelf_life='4 Months'
WHERE id=60;

-- 61: Pumpkin Flax Seeds Makhana
UPDATE products SET
  name='CrunchVeda Pumpkin Flax Makhana',
  tagline='World''s Unique Superfood Makhana',
  cat_key='snacks,makhana',
  description='An omega-rich flavoured makhana blended with pumpkin and flax seeds. A crunchy, heart-healthy snack that keeps hunger and guilt away.',
  ingredients='Fox nuts (makhana), pumpkin seeds, flax seeds, mild spices',
  how_to_use='Enjoy straight from the pack as an anytime snack. No cooking needed.',
  storage_info='Store in an airtight container away from moisture.',
  shelf_life='4 Months'
WHERE id=61;

-- 62: Amla Powder
UPDATE products SET
  name='Sanjeevani Amla Powder',
  tagline='The Human Sanjeevani',
  cat_key='immunity,amla,iron,periods,immunity-booster',
  description='Pure amla powder — revered in Ayurveda as the human sanjeevani. Exceptionally rich in Vitamin C and antioxidants, it supports immunity, digestion, and radiant hair & skin.',
  ingredients='100% pure amla (Indian gooseberry) powder',
  how_to_use='Mix 1 tsp in water, juice, or honey daily. Can also be used in hair packs.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=62;

-- 63: Beetroot Dosa Mix
UPDATE products SET
  name='RubyMorning Beetroot Dosa Mix',
  tagline='Iron-Rich Breakfast',
  cat_key='instant,iron',
  description='An iron-rich dosa mix infused with natural beetroot. A vibrant, healthy, and delicious breakfast that supports haemoglobin the tasty way.',
  ingredients='Rice, urad dal, beetroot, natural spices',
  how_to_use='Mix with water to a smooth batter, rest 10 minutes, cook crisp dosas.',
  storage_info='Store in a cool, dry, airtight container.',
  shelf_life='6 Months'
WHERE id=63;

-- 64: Finger Millet Pongal Premix
UPDATE products SET
  name='MilletMorning Ragi Pongal Premix',
  tagline='All-Time Favourite Breakfast',
  cat_key='instant',
  description='A comforting pongal premix made with wholesome finger millet (ragi). Calcium-rich, diabetic-friendly, and ready in minutes — the all-time favourite breakfast, made healthy.',
  ingredients='Finger millet (ragi), moong dal, pepper, cumin, curry leaves',
  how_to_use='Cook 1 cup premix in 3 cups water for 8–10 minutes, temper with ghee. Serve hot.',
  storage_info='Store in a cool, dry, airtight container.',
  shelf_life='6 Months'
WHERE id=64;

-- 65: Wheat Ravva Upma Premix
UPDATE products SET
  name='QuickMorning Wheat Upma Premix',
  tagline='Delicious Staple, Ready in Minutes',
  cat_key='instant',
  description='The deliciousness of classic wheat ravva upma in an instant premix. Quick, easy, and tasty — a wholesome breakfast without the prep.',
  ingredients='Wheat ravva, dried vegetables, mustard, curry leaves, spices',
  how_to_use='Add premix to boiling water (1:2), cook 5 minutes, temper with ghee. Serve hot.',
  storage_info='Store in a cool, dry, airtight container.',
  shelf_life='6 Months'
WHERE id=65;

-- 66: Coconut Chutney Premix
UPDATE products SET
  name='InstantSide Coconut Chutney Premix',
  tagline='Goes With Everything',
  cat_key='instant',
  description='An instant coconut chutney premix that pairs perfectly with dosa, idli, and more. Authentic South Indian taste in minutes — no grinding, no preservatives.',
  ingredients='Dried coconut, roasted gram, green chilli, curry leaves, salt',
  how_to_use='Mix with a little water to desired consistency. Temper with mustard and curry leaves if you like.',
  storage_info='Store in a cool, dry, airtight container. Refrigerate after mixing.',
  shelf_life='4 Months'
WHERE id=66;

-- 67: Lakadong Turmeric Powder
UPDATE products SET
  name='GoldRoot Lakadong Turmeric',
  tagline='Single-Origin, Higher Curcumin',
  cat_key='cooking,spices',
  description='Single-origin Lakadong turmeric from Meghalaya, prized for its exceptionally high curcumin content. A premium, anti-inflammatory turmeric for cooking and daily wellness.',
  ingredients='100% pure Lakadong turmeric powder',
  how_to_use='Use in cooking, or mix 1/2 tsp in warm milk (golden milk) for daily wellness.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='12 Months'
WHERE id=67;

-- 68: Kashmiri Mongra Saffron
UPDATE products SET
  name='RoyalThread Kashmiri Saffron',
  tagline='A++ Grade, Single Origin',
  cat_key='cooking',
  description='Single-origin A++ grade Kashmiri Mongra saffron — pure, deep-red threads with a rich aroma and vivid colour. A luxurious touch for sweets, biryanis, and wellness milk.',
  ingredients='100% pure Kashmiri Mongra saffron threads',
  how_to_use='Soak a few strands in warm milk or water for 10 minutes, then add to your dish.',
  storage_info='Store in an airtight container away from light & moisture.',
  shelf_life='24 Months'
WHERE id=68;

-- 69: Kura Karam Masala Chilli Powder
UPDATE products SET
  name='AromaFire Kura Karam Masala',
  tagline='Aromatic Curry Spice Blend',
  cat_key='cooking,spices',
  description='An aromatic, flavourful masala chilli powder blend — the secret to authentic South Indian curries. Freshly ground, perfectly balanced, and free from artificial colours.',
  ingredients='Red chilli, coriander, cumin, garlic, curry leaves, spices',
  how_to_use='Add 1–2 tsp while cooking curries and gravies for rich flavour and colour.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='9 Months'
WHERE id=69;

-- 70: Multi Floral Honey
UPDATE products SET
  name='PureHive Multi-Floral Honey',
  tagline='Raw & Unprocessed',
  cat_key='cooking',
  description='Naturally sourced multi-floral honey — raw, pure, and unprocessed to preserve every drop of its natural goodness and antioxidants. Nature''s original sweetener.',
  ingredients='100% pure multi-floral honey',
  how_to_use='Use as a natural sweetener in drinks, on toast, or take a spoonful daily.',
  storage_info='Store in a cool, dry place. Natural crystallisation is normal.',
  shelf_life='24 Months'
WHERE id=70;

-- 71: Organic Jaggery Powder
UPDATE products SET
  name='GurGold Organic Jaggery',
  tagline='The Goodness of Sugarcane',
  cat_key='cooking',
  description='Organic sugarcane jaggery powder — an unrefined, mineral-rich alternative to white sugar. Naturally sweet with the wholesome taste of traditional gur.',
  ingredients='100% organic sugarcane jaggery',
  how_to_use='Use as a 1:1 replacement for sugar in drinks, sweets, and cooking.',
  storage_info='Store in an airtight container in a cool, dry place.',
  shelf_life='12 Months'
WHERE id=71;

-- 72: Dry Dates Powder
UPDATE products SET
  name='DateGold Natural Sweetener',
  tagline='Natural Energy & Everyday Strength',
  cat_key='cooking',
  description='Naturally sweet dry dates powder — a wholesome, iron-rich sweetener and energy booster. A guilt-free way to sweeten milk, sweets, and smoothies.',
  ingredients='100% dry dates powder',
  how_to_use='Add 1–2 tsp to milk, porridge, or desserts as a natural sweetener.',
  storage_info='Store in an airtight container in a cool, dry place.',
  shelf_life='6 Months'
WHERE id=72;

-- 73: Turmeric Powder
UPDATE products SET
  name='GoldRoot Turmeric Powder',
  tagline='Nature''s Goodness',
  cat_key='cooking,spices',
  description='Pure, farm-fresh turmeric powder with a rich colour and earthy aroma. An everyday anti-inflammatory essential for cooking and wellness.',
  ingredients='100% pure turmeric powder',
  how_to_use='Use in daily cooking, or mix in warm milk for golden milk.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='12 Months'
WHERE id=73;

-- 74: Red Chilli Powder
UPDATE products SET
  name='FireRed Chilli Powder',
  tagline='Hotness, Freshly Ground',
  cat_key='cooking,spices',
  description='Pure, vibrant red chilli powder with a bold heat and freshly-ground aroma. No additives, no artificial colour — just authentic fire for your dishes.',
  ingredients='100% pure red chilli powder',
  how_to_use='Add to curries, marinades, and gravies to taste.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='12 Months'
WHERE id=74;

-- 75: Amchur Powder
UPDATE products SET
  name='TangVeda Amchur Powder',
  tagline='The Goodness of Raw Mango',
  cat_key='cooking,spices,iron',
  description='Tangy raw mango powder (amchur) — a zesty flavour enhancer and digestive aid rich in Vitamin C. The traditional secret to that perfect sour note in North Indian dishes.',
  ingredients='100% dried raw mango powder',
  how_to_use='Add 1/2 tsp to curries, chaats, and marinades for a tangy kick.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='9 Months'
WHERE id=75;

-- 76: Mango Orugulu
UPDATE products SET
  name='TangVeda Mango Orugulu',
  tagline='Dried Raw Mango Pieces',
  cat_key='cooking,iron',
  description='Sun-dried raw mango pieces (orugulu) — a tangy traditional pickle ingredient and Vitamin-C-rich snack. Bring authentic sourness to your homemade pickles.',
  ingredients='100% dried raw mango pieces',
  how_to_use='Use in pickles and curries, or soak before cooking. Can be enjoyed as a tangy nibble.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='9 Months'
WHERE id=76;

-- 77: Organic Black Pepper Powder
UPDATE products SET
  name='BlackGold Pepper Powder',
  tagline='Freshness Packed',
  cat_key='cooking,spices',
  description='Freshly ground organic black pepper powder with a bold aroma and pungent warmth. A premium digestive spice for everyday cooking and wellness.',
  ingredients='100% organic black pepper',
  how_to_use='Season dishes to taste, or add a pinch to warm water or kashayam.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='12 Months'
WHERE id=77;

-- 78: Organic Black Pepper Whole
UPDATE products SET
  name='BlackGold Whole Peppercorns',
  tagline='Grind Fresh, Every Time',
  cat_key='cooking,spices',
  description='Premium organic whole black peppercorns for the freshest flavour. Grind on demand to unlock the full aroma and warmth of this timeless spice.',
  ingredients='100% organic whole black peppercorns',
  how_to_use='Grind fresh over dishes, or use whole in rasam, kashayam, and pickles.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='24 Months'
WHERE id=78;

-- 79: Sprouted Fenugreek Powder
UPDATE products SET
  name='SproutVeda Fenugreek Powder',
  tagline='Sprouted for Diabetic Care',
  cat_key='cooking,health',
  description='Sprouted fenugreek powder — gentler and more nutrient-rich than the regular seed. Traditionally used to support healthy blood sugar and digestion.',
  ingredients='100% sprouted fenugreek (methi) powder',
  how_to_use='Mix 1/2 tsp in warm water and drink in the morning, or add to cooking.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=79;

-- 80: Gond Katira
UPDATE products SET
  name='CoolGum Gond Katira',
  tagline='Nature''s Tree Gum Coolant',
  cat_key='cooking,summer,health',
  description='Natural tree gum (gond katira) — a traditional body coolant for summer drinks and desserts. Soak, swell, and enjoy its refreshing, digestive goodness.',
  ingredients='100% natural gond katira (tragacanth gum)',
  how_to_use='Soak 1 tsp in water for a few hours until it swells, then add to sharbat, milk, or desserts.',
  storage_info='Store in an airtight container away from moisture.',
  shelf_life='12 Months'
WHERE id=80;

-- 81: Sea Buckthorn Dried
UPDATE products SET
  name='SuperBerry Sea Buckthorn',
  tagline='Nature''s Omega Superfruit',
  cat_key='immunity,health',
  description='Dried sea buckthorn berries — nature''s rare superfruit packed with Omega 3, 6, 7 & 9 and abundant Vitamin C. A powerful antioxidant boost for immunity and energy.',
  ingredients='100% dried sea buckthorn berries',
  how_to_use='Eat a small handful daily, or steep in hot water for a tangy herbal tea.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=81;

-- 82: ABC Powder
UPDATE products SET
  name='TriGlow ABC Powder',
  tagline='Amla, Beetroot & Carrot Trio',
  cat_key='health,immunity,iron',
  description='The triple goodness of Amla, Beetroot, and Carrot in one convenient powder. A complete nutrition blend for immunity, iron, energy, and radiant vitality.',
  ingredients='Amla, beetroot, carrot (dehydrated & powdered)',
  how_to_use='Mix 1–2 tsp in water, juice, or milk daily.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=82;

-- 83: Diabetic Health Mix
UPDATE products SET
  name='GlucoBalance Health Mix',
  tagline='Low-GI Energy, No Sugar Spikes',
  cat_key='health',
  description='An energy-boosting, diabetic-friendly health mix with a low glycemic index. Sustained nourishment and satisfying fibre without the sugar spikes.',
  ingredients='Sprouted millets, whole grains, fenugreek, nuts, natural fibre',
  how_to_use='Mix 2 tbsp in warm water or unsweetened milk. Enjoy as a wholesome meal replacement.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=83;

-- 84: Mango Seeds Powder
UPDATE products SET
  name='VitaB Mango Seed Powder',
  tagline='Your Daily Dose of B12',
  cat_key='health,bcomplex',
  description='Mango seed powder — a sustainable, natural source of Vitamin B12 to support energy and metabolism. Nutrition from a part of the fruit usually discarded.',
  ingredients='100% mango seed (kernel) powder',
  how_to_use='Mix 1/2 tsp in water or add to smoothies daily.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=84;

-- 85: Diabetic Control Powder
UPDATE products SET
  name='GlucoGuard Control Powder',
  tagline='Natural HbA1c Support',
  cat_key='health',
  description='A herbal blend traditionally used to support healthy blood sugar and HbA1c levels. Natural, daily metabolic wellness in a simple spoonful.',
  ingredients='Fenugreek, guava leaf, gymnema, herbal blend',
  how_to_use='Mix 1 tsp in warm water and drink before meals, once or twice daily.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=85;

-- 86: ABCD Powder
UPDATE products SET
  name='QuadGlow ABCD Powder',
  tagline='Amla, Beetroot, Carrot & Dry Dates',
  cat_key='health,immunity,iron',
  description='Four superfoods in one — Amla, Beetroot, Carrot, and Dry Dates. A naturally sweet, nutrient-dense blend for immunity, iron, and everyday energy.',
  ingredients='Amla, beetroot, carrot, dry dates (dehydrated & powdered)',
  how_to_use='Mix 1–2 tsp in water, juice, or milk daily.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=86;

-- 87: Wheat Grass Powder
UPDATE products SET
  name='GreenDetox Wheat Grass',
  tagline='Fresh Greens for Daily Detox',
  cat_key='health,iron,immunity-booster',
  description='Pure wheat grass powder — a chlorophyll-rich green superfood for daily detox and alkalising energy. Nature''s cleanse in a glass.',
  ingredients='100% pure wheat grass powder',
  how_to_use='Mix 1 tsp in water or juice on an empty stomach in the morning.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=87;

-- 88: Rice Bran Powder
UPDATE products SET
  name='VitaB Rice Bran Powder',
  tagline='Heart-Friendly & B-Rich',
  cat_key='health,bcomplex',
  description='Fibre-rich, heart-friendly rice bran powder — a natural source of B vitamins and healthy fats. Supports cholesterol balance and everyday wellness.',
  ingredients='100% stabilised rice bran powder',
  how_to_use='Add 1–2 tsp to porridge, smoothies, or batter.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=88;

-- 89: Dry Ginger Powder
UPDATE products SET
  name='SontiVeda Dry Ginger Powder',
  tagline='Traditional Digestion Aid',
  cat_key='health,constipation,cold',
  description='Pure dry ginger powder (sonti) — a warming, traditional remedy for cold relief and smooth digestion. A pinch of ancient wellness for everyday use.',
  ingredients='100% pure dry ginger powder',
  how_to_use='Mix 1/2 tsp in warm water or milk, or add to tea and cooking.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='9 Months'
WHERE id=89;

-- 90: Seed Cycling Kit
UPDATE products SET
  name='HerBalance Seed Cycling Kit',
  tagline='Natural Hormonal Harmony',
  cat_key='women,health,periods',
  description='A complete seed-cycling kit designed to support hormonal balance and regular cycles the natural way. Simple, effective, and rooted in seed nutrition.',
  ingredients='Pumpkin seeds, flax seeds, sunflower seeds, sesame seeds',
  how_to_use='Follow the phase-wise chart in the kit — flax & pumpkin in the first half of your cycle, sesame & sunflower in the second. 1 tbsp daily.',
  storage_info='Store each seed in an airtight container in a cool, dry place.',
  shelf_life='6 Months'
WHERE id=90;

-- 91: Curry Leaves Powder
UPDATE products SET
  name='GreenLeaf Curry Powder',
  tagline='Healthy Flavour Enhancer',
  cat_key='cooking,health,iron',
  description='Antioxidant-rich curry leaf powder — a nutritious flavour enhancer that supports hair health and digestion. Authentic South Indian taste in a healthy sprinkle.',
  ingredients='100% pure curry leaf powder (with mild spices)',
  how_to_use='Mix with hot rice and ghee, sprinkle over dishes, or add to buttermilk.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=91;

-- 92: DeBloat Powder
UPDATE products SET
  name='TummyEase DeBloat Powder',
  tagline='Gentle Relief from Gas & Bloat',
  cat_key='digestive,health,constipation',
  description='A natural herbal blend to ease excess gas, bloating, and discomfort. Fast-acting, gentle digestive support for a lighter, happier tummy.',
  ingredients='Ajwain, fennel, cumin, ginger, herbal blend',
  how_to_use='Mix 1/2 tsp in warm water after meals, or chew a pinch directly.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='9 Months'
WHERE id=92;

-- 93: LactoBoost Health Mix
UPDATE products SET
  name='MaaCare LactoBoost Mix',
  tagline='Nourishing Support for New Mothers',
  cat_key='women,health',
  description='A special health mix for lactating mothers, traditionally used to support healthy milk production and postpartum recovery. Wholesome nourishment for mother and baby.',
  ingredients='Fenugreek, sprouted grains, nuts, natural galactagogues, cardamom',
  how_to_use='Mix 2 tbsp in warm milk once or twice daily.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=93;

-- 94: Slim-Tox Tea
UPDATE products SET
  name='SlimTox Detox Tea',
  tagline='Your Gut Health Specialist',
  cat_key='tea,constipation,weight',
  description='A herbal tea blend crafted for slimming, detox, and digestive wellness. Sip your way to a lighter, cleaner, more energised you.',
  ingredients='Green tea, ginger, tulsi, fennel, senna-free herbal blend',
  how_to_use='Steep 1 tsp in hot water for 3–5 minutes, strain and drink. Best after meals.',
  storage_info='Store in an airtight container away from moisture & sunlight.',
  shelf_life='6 Months'
WHERE id=94;

-- ============================================================
-- NEW PRODUCTS (IDs 95+)
-- ============================================================
INSERT INTO products (name, slug, category_name, cat_key, emoji, badge, price, mrp, rating, review_count, description, benefits, tags, tagline, ingredients, how_to_use, storage_info, shelf_life, is_featured, stock_quantity) VALUES
('Vippa Puvvu Laddu', 'vippa-puvvu-laddu', 'Healthy Snacks', 'snacks', '🌼', 'Traditional Delicacy', 449, 529, 4.7, 42, 'A rare traditional laddu made from vippa puvvu (mahua flowers) — a forgotten delicacy rich in natural sweetness and rustic nourishment. A taste of authentic village heritage.', ARRAY['Traditional mahua flower recipe','Natural sweetness','Rustic nourishment','Pure cow ghee','No refined sugar'], ARRAY['Vippa Puvvu','Laddu','Traditional','Snack'], 'A Forgotten Village Delicacy', 'Vippa puvvu (mahua flowers), pure cow ghee, jaggery, dry fruits', 'Enjoy 1–2 laddus a day as a snack or energy boost.', 'Store in an airtight container away from moisture & sunlight.', '3 Months', FALSE, 100),
('Sprouted Multigrain Flour', 'sprouted-multigrain-flour', 'Sprouted Flours', 'flours,health', '🌾', 'Sprouted Nutrition', 249, 299, 4.8, 56, 'A wholesome multigrain flour made from sprouted grains for deeper, more bioavailable nutrition. Sprouting boosts protein and minerals for healthier rotis, dosas, and more.', ARRAY['Made from sprouted grains','Higher bioavailable nutrition','Rich in protein & fibre','Multi-grain blend','Easy to digest'], ARRAY['Sprouted','Multigrain','Flour','Healthy'], 'Sprouted Goodness in Every Grain', 'Sprouted wheat, ragi, jowar, bajra, green gram', 'Use like regular atta for rotis, dosas, and baking. Blends well with wheat flour.', 'Store in a cool, dry, airtight container.', '3 Months', FALSE, 100),
('Sprouted Ragi Flour', 'sprouted-ragi-flour', 'Sprouted Flours', 'flours,health,iron', '🌾', 'Calcium Rich', 199, 249, 4.9, 78, 'Sprouted finger-millet (ragi) flour — a calcium- and iron-rich staple with enhanced nutrition from sprouting. Perfect for wholesome rotis, porridge, and baby food.', ARRAY['Sprouted for better nutrition','Rich in calcium & iron','Great for all ages','Gluten-free','Easy to digest'], ARRAY['Sprouted','Ragi','Flour','Calcium'], 'Calcium-Rich Ancient Grain', '100% sprouted ragi (finger millet) flour', 'Use for rotis, dosas, porridge, or baby food. Cook 2 tbsp in water/milk for a quick porridge.', 'Store in a cool, dry, airtight container.', '3 Months', FALSE, 100),
('Sprouted Wheat Flour', 'sprouted-wheat-flour', 'Sprouted Flours', 'flours,health', '🌾', 'Everyday Staple', 199, 249, 4.7, 51, 'Sprouted wheat flour for softer, more digestible rotis with elevated nutrition. Sprouting unlocks nutrients while keeping the familiar taste you love.', ARRAY['Sprouted whole wheat','More digestible','Higher nutrition','Soft rotis','Everyday staple'], ARRAY['Sprouted','Wheat','Flour','Healthy'], 'The Everyday Roti, Upgraded', '100% sprouted whole wheat flour', 'Use like regular atta for soft rotis and parathas.', 'Store in a cool, dry, airtight container.', '3 Months', FALSE, 100),
('Sprouted Ragi Almond Date Porridge Mix', 'sprouted-ragi-almond-date-porridge-mix', 'Kids Nutrition', 'kids,kids-specials,iron', '🥣', 'Complete Meal', 329, 389, 4.85, 64, 'A complete porridge mix combining sprouted ragi, almonds, and dates. Naturally sweet, iron- and calcium-rich — a nourishing meal for babies, kids, and adults alike.', ARRAY['Sprouted ragi base','Almonds for brain health','Dates for natural sweetness','Rich in iron & calcium','Great for all ages'], ARRAY['Ragi','Almond','Dates','Porridge'], 'A Complete Bowl of Goodness', 'Sprouted ragi, almonds, dates, cardamom', 'Cook 3 tbsp in milk or water for 5 minutes until creamy. No extra sugar needed.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Beetroot Powder', 'beetroot-powder', 'General Health', 'health,iron,kids-specials', '🍠', 'Iron Rich', 199, 239, 4.8, 47, 'Pure beetroot powder — a vibrant, iron-rich superfood to support healthy haemoglobin and natural energy. A colourful, nutritious addition to drinks and dishes.', ARRAY['Rich in iron','Supports haemoglobin','Natural energy','Vibrant colour','Versatile use'], ARRAY['Beetroot','Iron','Powder','Superfood'], 'Vibrant Iron Boost', '100% pure beetroot powder', 'Mix 1 tsp in milk, juice, smoothies, or dosa batter.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Carrot Powder', 'carrot-powder', 'General Health', 'health,kids-specials', '🥕', 'Vitamin A Rich', 199, 239, 4.7, 39, 'Pure carrot powder rich in Vitamin A for healthy eyes and immunity. A naturally sweet, versatile way to add wholesome nutrition to everyday food.', ARRAY['Rich in Vitamin A','Supports eye health','Boosts immunity','Naturally sweet','Versatile use'], ARRAY['Carrot','Vitamin A','Powder','Superfood'], 'Sunshine for Your Eyes', '100% pure carrot powder', 'Mix 1 tsp in milk, juice, smoothies, or batter.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Multi Vitamin Kaaram Podi', 'multi-vitamin-kaaram-podi', 'Karam Podis', 'karampodi,spices,health', '🌶️', 'Nutrient Packed', 219, 269, 4.75, 44, 'A nutrient-packed spice powder blending greens, seeds, and lentils for an everyday multivitamin boost. Turns plain rice into a wholesome, flavourful meal.', ARRAY['Multi-nutrient blend','Greens & seeds','Everyday wellness','Flavourful','Traditional recipe'], ARRAY['Kaaram Podi','Multivitamin','Spice','Healthy'], 'Your Daily Multivitamin, Deliciously', 'Moringa, curry leaves, sesame, flax, lentils, red chilli, garlic', 'Mix 1–2 tsp with hot rice and ghee, or sprinkle over idli and dosa.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Almond Curry Leaves Kaaram Podi', 'almond-curry-leaves-kaaram-podi', 'Karam Podis', 'karampodi,spices', '🌶️', 'Protein Rich', 229, 279, 4.7, 38, 'A protein-rich spice powder pairing almonds with antioxidant curry leaves. A crunchy, nutritious podi that makes every meal special.', ARRAY['Almond protein','Curry leaf antioxidants','Rich flavour','Traditional recipe','Nutritious'], ARRAY['Kaaram Podi','Almond','Curry Leaves','Spice'], 'Nutty, Crunchy, Nutritious', 'Almonds, curry leaves, red chilli, garlic, rock salt', 'Mix 1–2 tsp with hot rice and ghee, or use as a dry side.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Pumpkin Flaxseeds Kaaram Podi', 'pumpkin-flaxseeds-kaaram-podi', 'Karam Podis', 'karampodi,spices,periods', '🌶️', 'Omega Rich', 219, 269, 4.7, 36, 'An omega-rich spice powder blending pumpkin and flax seeds. A heart-healthy, hormone-friendly podi packed with essential fatty acids and flavour.', ARRAY['Omega 3 & 6 rich','Pumpkin & flax seeds','Hormone-friendly','Heart healthy','Traditional recipe'], ARRAY['Kaaram Podi','Pumpkin','Flax','Omega'], 'Omega Goodness in a Spice', 'Pumpkin seeds, flax seeds, red chilli, garlic, rock salt', 'Mix 1–2 tsp with hot rice and ghee.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Flax Seeds Kaaram Podi', 'flax-seeds-kaaram-podi', 'Karam Podis', 'karampodi,spices,periods', '🌶️', 'Omega Rich', 199, 249, 4.7, 34, 'A flavourful flaxseed spice powder rich in Omega 3 fatty acids and fibre. A simple, delicious way to add heart-healthy nutrition to daily meals.', ARRAY['Rich in Omega 3','High fibre','Heart healthy','Traditional recipe','Flavourful'], ARRAY['Kaaram Podi','Flax','Omega','Spice'], 'Everyday Omega, Made Tasty', 'Flax seeds, red chilli, garlic, cumin, rock salt', 'Mix 1–2 tsp with hot rice and ghee.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Velluli Kaaram Podi', 'velluli-kaaram-podi', 'Karam Podis', 'karampodi,spices', '🧄', 'Garlic Power', 189, 239, 4.75, 41, 'A bold garlic (velluli) spice powder — pungent, flavourful, and traditionally valued for heart and immunity support. The perfect fiery companion for rice and ghee.', ARRAY['Rich garlic flavour','Heart & immunity support','Traditional recipe','No additives','Bold taste'], ARRAY['Kaaram Podi','Garlic','Velluli','Spice'], 'Bold Garlic, Big Flavour', 'Garlic, red chilli, cumin, sesame, rock salt', 'Mix 1–2 tsp with hot rice and ghee, or use as a dry side.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Palli Kaaram Podi', 'palli-kaaram-podi', 'Karam Podis', 'karampodi,spices', '🥜', 'Peanut Rich', 189, 239, 4.8, 47, 'A classic Andhra peanut (palli) spice powder — nutty, protein-rich, and irresistibly flavourful. A household favourite that turns simple rice into a feast.', ARRAY['Peanut protein','Authentic Andhra recipe','Rich flavour','No additives','Household favourite'], ARRAY['Kaaram Podi','Peanut','Palli','Spice'], 'The Andhra Peanut Classic', 'Roasted peanuts, red chilli, garlic, cumin, rock salt', 'Mix 1–2 tsp with hot rice and ghee.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Nalla Kaaram Podi', 'nalla-kaaram-podi', 'Karam Podis', 'karampodi,spices', '🌶️', 'Spicy Classic', 189, 239, 4.7, 39, 'A traditional spicy Andhra podi (nalla kaaram) with a deep, robust flavour. The perfect fiery mix to elevate rice, idli, and dosa.', ARRAY['Robust spicy flavour','Authentic recipe','No additives','Versatile','Household favourite'], ARRAY['Kaaram Podi','Spicy','Andhra','Spice'], 'Deep, Robust & Fiery', 'Red chilli, urad dal, chana dal, garlic, cumin, rock salt', 'Mix 1–2 tsp with hot rice and ghee, or use with idli and dosa.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Skin Glow Tea', 'skin-glow-tea', 'Tea Blends', 'tea,skin', '✨', 'Beauty Blend', 299, 359, 4.7, 52, 'A herbal beauty tea blended to support clear, radiant skin from within. Antioxidant-rich botanicals that let your natural glow shine through.', ARRAY['Supports clear skin','Antioxidant rich','Caffeine-free','Herbal blend','Beauty from within'], ARRAY['Tea','Skin','Beauty','Herbal'], 'Radiance in Every Cup', 'Rose petals, hibiscus, tulsi, green tea, herbal blend', 'Steep 1 tsp in hot water for 3–5 minutes, strain and drink. Best once daily.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Butterfly Pea Flower Tea', 'butterfly-pea-flower-tea', 'Tea Blends', 'tea,skin', '🦋', 'Antioxidant Rich', 279, 339, 4.8, 58, 'A stunning blue herbal tea from butterfly pea flowers, rich in antioxidants. Sip it for wellness and watch it turn violet with a squeeze of lemon — beauty and magic in one cup.', ARRAY['Rich in antioxidants','Naturally caffeine-free','Colour-changing magic','Supports skin & calm','Herbal wellness'], ARRAY['Tea','Butterfly Pea','Antioxidant','Herbal'], 'The Colour-Changing Wellness Tea', '100% dried butterfly pea flowers', 'Steep 5–6 flowers in hot water for 3–4 minutes. Add lemon to turn it violet.', 'Store in an airtight container away from moisture & sunlight.', '12 Months', FALSE, 100),
('Chana Seeds Coffee', 'chana-seeds-coffee', 'General Health', 'health', '☕', 'Caffeine Free', 199, 249, 4.6, 33, 'A caffeine-free coffee alternative roasted from chana (chickpea) seeds. Rich, warming, and protein-friendly — enjoy the coffee ritual without the caffeine jitters.', ARRAY['Zero caffeine','Protein-friendly','Rich roasted flavour','Traditional alternative','Warming drink'], ARRAY['Coffee Alternative','Chana','Caffeine Free','Healthy'], 'Coffee Ritual, Zero Caffeine', 'Roasted chana (chickpea) seeds', 'Mix 1 tsp in hot water or milk, sweeten with jaggery if desired.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Neem Powder', 'neem-powder', 'General Health', 'health,skin', '🌿', 'Purifying Herb', 179, 219, 4.7, 45, 'Pure neem leaf powder — a time-honoured purifying herb for skin, blood, and immunity. Nature''s cleanser for internal and external wellness.', ARRAY['Blood purifier','Supports clear skin','Immunity boost','100% pure neem','Multi-purpose'], ARRAY['Neem','Purifying','Skin','Herbal'], 'Nature''s Purifier', '100% pure neem leaf powder', 'Mix 1/2 tsp in water and drink, or make a face/hair pack with water.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Pumpkin Seeds Sand Roasted', 'pumpkin-seeds-sand-roasted', 'Healthy Snacks', 'snacks,periods,health', '🎃', 'Mineral Rich', 199, 249, 4.8, 49, 'Crunchy sand-roasted pumpkin seeds — a mineral-rich, zinc-packed snack that supports immunity and hormonal balance. Wholesome munching, naturally roasted.', ARRAY['Rich in zinc & magnesium','Supports hormonal balance','Sand roasted, no oil','Crunchy snack','Protein rich'], ARRAY['Pumpkin Seeds','Zinc','Snack','Roasted'], 'Naturally Roasted Mineral Boost', '100% sand-roasted pumpkin seeds', 'Eat a small handful as a snack, or sprinkle over salads and curd.', 'Store in an airtight container in a cool, dry place.', '6 Months', FALSE, 100),
('Flax Seeds Sand Roasted', 'flax-seeds-sand-roasted', 'Healthy Snacks', 'snacks,periods,health', '🌰', 'Omega Rich', 179, 219, 4.8, 43, 'Crunchy sand-roasted flax seeds rich in Omega 3 and fibre. A heart-healthy, hormone-friendly snack roasted the natural way — no oil, all goodness.', ARRAY['Rich in Omega 3','High fibre','Sand roasted, no oil','Heart healthy','Hormone-friendly'], ARRAY['Flax Seeds','Omega','Snack','Roasted'], 'Heart-Healthy Crunch', '100% sand-roasted flax seeds', 'Eat a small handful, or sprinkle over salads, curd, and smoothies.', 'Store in an airtight container in a cool, dry place.', '6 Months', FALSE, 100),
('Sunflower Seeds Sand Roasted', 'sunflower-seeds-sand-roasted', 'Healthy Snacks', 'snacks,periods,health', '🌻', 'Vitamin E Rich', 179, 219, 4.7, 40, 'Crunchy sand-roasted sunflower seeds rich in Vitamin E and healthy fats. A skin-loving, energising snack roasted naturally without oil.', ARRAY['Rich in Vitamin E','Healthy fats','Sand roasted, no oil','Skin health','Crunchy snack'], ARRAY['Sunflower Seeds','Vitamin E','Snack','Roasted'], 'Skin-Loving Crunch', '100% sand-roasted sunflower seeds', 'Eat a small handful, or sprinkle over salads and curd.', 'Store in an airtight container in a cool, dry place.', '6 Months', FALSE, 100),
('Sesame Seeds Sand Roasted', 'sesame-seeds-sand-roasted', 'Healthy Snacks', 'snacks,periods,health', '⚪', 'Calcium Rich', 169, 209, 4.7, 37, 'Crunchy sand-roasted sesame seeds — a calcium-rich, bone-friendly snack roasted the traditional way. Nutty goodness for meals and munching.', ARRAY['Rich in calcium','Bone-friendly','Sand roasted, no oil','Nutty flavour','Versatile'], ARRAY['Sesame Seeds','Calcium','Snack','Roasted'], 'Calcium-Rich Nutty Crunch', '100% sand-roasted sesame seeds', 'Sprinkle over dishes, add to laddus, or eat a small handful.', 'Store in an airtight container in a cool, dry place.', '6 Months', FALSE, 100),
('Sugandhi Roots Dried', 'sugandhi-roots-dried', 'General Health', 'health,summer', '🌱', 'Natural Coolant', 199, 249, 4.6, 31, 'Dried sugandhi (nannari) roots — a fragrant, traditional body coolant. Brew them for a refreshing, detoxifying drink that soothes the body in summer heat.', ARRAY['Natural body coolant','Fragrant & refreshing','Traditional detox','Caffeine-free','Summer wellness'], ARRAY['Sugandhi','Nannari','Coolant','Herbal'], 'Fragrant Roots of Coolness', '100% dried sugandhi (nannari) roots', 'Boil a few roots in water, cool, and drink. Or soak overnight for a refreshing infusion.', 'Store in a dry, airtight container.', '12 Months', FALSE, 100),
('Avarampoo Flower Powder', 'avarampoo-flower-powder', 'General Health', 'health,skin', '🌼', 'Skin & Sugar Care', 219, 269, 4.7, 38, 'Traditional avarampoo (tanner''s cassia) flower powder, valued for skin radiance and healthy blood sugar. A cherished Tamil beauty and wellness secret.', ARRAY['Supports clear skin','Blood sugar support','Traditional beauty herb','100% natural','Multi-purpose'], ARRAY['Avarampoo','Skin','Herbal','Wellness'], 'A Tamil Beauty Secret', '100% pure avarampoo flower powder', 'Mix into face packs with water/milk, or steep 1/2 tsp in hot water as tea.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Date Seed Coffee Powder', 'date-seed-coffee-powder', 'General Health', 'health', '☕', 'Caffeine Free', 199, 249, 4.6, 35, 'A caffeine-free coffee alternative made from roasted date seeds. Rich, dark, and naturally satisfying — a sustainable brew from seeds usually thrown away.', ARRAY['Zero caffeine','Rich roasted flavour','Sustainable & natural','Antioxidant rich','Guilt-free brew'], ARRAY['Coffee Alternative','Date Seed','Caffeine Free','Healthy'], 'Dark, Rich & Caffeine-Free', 'Roasted date seeds', 'Mix 1 tsp in hot water or milk, sweeten with jaggery if desired.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Bitter Gourd Powder', 'bitter-gourd-powder', 'General Health', 'health', '🥒', 'Sugar Care', 199, 249, 4.6, 42, 'Pure bitter gourd (karela) powder, traditionally used to support healthy blood sugar and digestion. A potent green ally for metabolic wellness.', ARRAY['Blood sugar support','Aids digestion','100% pure karela','Rich in nutrients','Daily wellness'], ARRAY['Bitter Gourd','Karela','Sugar Care','Herbal'], 'The Green Metabolic Ally', '100% pure bitter gourd (karela) powder', 'Mix 1/2 tsp in warm water and drink before meals.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Black Stone Flower', 'black-stone-flower', 'Cooking Essentials', 'cooking,spices', '🪨', 'Aromatic Spice', 179, 229, 4.7, 29, 'Black stone flower (kalpasi) — a rare, aromatic spice essential to authentic Chettinad and biryani flavours. A little goes a long way in adding deep, smoky notes.', ARRAY['Authentic Chettinad spice','Deep aromatic flavour','Essential for biryani','100% natural','A little goes far'], ARRAY['Black Stone Flower','Kalpasi','Spice','Aromatic'], 'The Secret of Chettinad', '100% natural black stone flower (kalpasi)', 'Add a small piece while tempering biryani, curries, and masalas.', 'Store in a dry, airtight container.', '24 Months', FALSE, 100),
('Aliv Seeds', 'aliv-seeds-halim', 'General Health', 'health,iron,periods', '🌱', 'Iron Powerhouse', 189, 229, 4.8, 46, 'Aliv (halim/garden cress) seeds — a tiny iron powerhouse traditionally used to boost haemoglobin and support lactation. Nutrient-dense goodness in every spoon.', ARRAY['Exceptionally iron-rich','Supports haemoglobin','Aids lactation','Rich in folate','Tiny superfood'], ARRAY['Aliv','Halim','Iron','Superfood'], 'A Tiny Iron Powerhouse', '100% aliv (halim/garden cress) seeds', 'Soak 1 tsp in milk or water, then add to laddus, kheer, or drink directly.', 'Store in an airtight container in a cool, dry place.', '9 Months', FALSE, 100),
('Himalayan Garlic', 'himalayan-garlic', 'Cooking Essentials', 'cooking', '🧄', 'Single Clove', 249, 299, 4.8, 44, 'Rare single-clove Himalayan garlic (snow mountain garlic), prized for its potent flavour and heart & immunity benefits. A concentrated dose of nature''s medicine.', ARRAY['Single-clove potency','Heart & immunity support','Rich flavour','Rare Himalayan variety','100% natural'], ARRAY['Garlic','Himalayan','Immunity','Cooking'], 'Rare Single-Clove Potency', '100% Himalayan single-clove garlic', 'Use in cooking, or consume 1 clove daily (raw or lightly crushed) for wellness.', 'Store in a cool, dry, ventilated place.', '3 Months', FALSE, 100),
('Raw Turmeric Ginger Candy', 'raw-turmeric-ginger-candy', 'Healthy Snacks', 'snacks,immunity,cold', '🟠', 'Immunity Treat', 229, 279, 4.8, 53, 'A warming candy made from raw turmeric and ginger — a tangy-sweet immunity treat that soothes the throat and fights the sniffles. Wellness you can enjoy like a sweet.', ARRAY['Immunity boosting','Soothes throat','Anti-inflammatory','Tangy-sweet taste','Natural cold remedy'], ARRAY['Turmeric','Ginger','Candy','Immunity'], 'Sweet Warmth for Cold Days', 'Raw turmeric, ginger, jaggery/honey', 'Enjoy 1–2 pieces a day, especially when you feel a cold coming on.', 'Store in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100),
('Skin Glow Combo', 'skin-glow-combo', 'General Health', 'skin,health', '✨', 'Beauty Bundle', 699, 899, 4.7, 28, 'A curated beauty bundle of skin-loving powders and teas for natural, radiant skin. Nourish your glow from the inside out with time-tested botanicals.', ARRAY['Complete skin care bundle','Natural botanicals','Beauty from within','Multiple products','Great value'], ARRAY['Skin','Beauty','Combo','Natural'], 'Radiance, Bundled', 'Assorted skin-care powders and herbal teas', 'Follow the usage guide on each product inside the combo.', 'Store each item in an airtight container away from moisture & sunlight.', '6 Months', FALSE, 100)
ON CONFLICT (slug) DO NOTHING;

-- Keep the id sequence ahead of the highest inserted id
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
