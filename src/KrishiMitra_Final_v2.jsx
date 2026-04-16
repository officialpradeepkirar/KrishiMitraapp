import { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════════════
   🌾 KRISHIMITRA PRO v3.0 — COMPLETE APP
   Login · Crop Library · Seed/Tool Shop · Kisan Credit · Order Delivery/Pickup
   Machine Booking · Fertilizer Calc · FPO · Schemes · Profile + Orders
   Claude AI decisions on every screen
   ═══════════════════════════════════════════════════════════════════════════════ */

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const T={
  bg:"#05100a",bgDeep:"#020a05",bgCard:"rgba(255,255,255,0.046)",bgCardH:"rgba(255,255,255,0.08)",
  brd:"rgba(255,255,255,0.07)",brdG:"rgba(74,222,128,0.25)",brdGold:"rgba(251,191,36,0.3)",
  g4:"#4ade80",g5:"#22c55e",g6:"#16a34a",g7:"#15803d",g8:"#166534",g9:"#14532d",
  gL:"#bbf7d0",gold:"#fbbf24",goldS:"#f59e0b",blue:"#60a5fa",blueD:"#1d4ed8",
  orange:"#fb923c",red:"#f87171",purple:"#c084fc",teal:"#2dd4bf",
  t0:"#fff",t70:"rgba(255,255,255,0.7)",t50:"rgba(255,255,255,0.5)",
  t30:"rgba(255,255,255,0.3)",t15:"rgba(255,255,255,0.15)",t08:"rgba(255,255,255,0.08)",
};
const R={xs:8,sm:10,md:14,lg:20,xl:28};

// ─── CROP LIBRARY DATA ────────────────────────────────────────────────────────
const CROP_LIBRARY = {
  "Soybean":{
    icon:"🟤",color:T.gold,hindiName:"सोयाबीन",season:"Kharif (Jun-Oct)",
    soil:{type:"Loamy / Clay Loam",pH:"6.5–7.5",drainage:"Achha drainage zaroor",prep:"Deep ploughing + 2 harrowings"},
    climate:{temp:"25–32°C",rainfall:"600–1000mm",humidity:"Medium",sunlight:"Full sun"},
    seeds:{ratePerAcre:"30–35 kg",variety:["JS 335 (Popular)","NRC 86","RVS 2001-4","JS 9752"],seedCost:"₹3,500–5,000/acre",treatment:"Rhizobium + PSB seed treatment"},
    investment:{seedCost:4200,fertilizer:2800,pesticide:1800,irrigation:800,labour:3500,machinery:2000,other:900,total:16000},
    production:{yieldPerAcre:"8–14 Quintal",avgYield:"11 Q/acre",days:"90–100 din",incomePerAcre:"₹44,000–₹67,200",profitPerAcre:"₹28,000–₹51,000"},
    schedule:[{day:"Day 0",task:"Beej upchar + Baai"},{day:"Day 15",task:"Pehli nindai"},{day:"Day 20–25",task:"Pehla chhidkav (fungicide)"},{day:"Day 35",task:"DAP spray (if needed)"},{day:"Day 45–50",task:"Keeda chhidkav"},{day:"Day 60",task:"Doosri nindai / weed control"},{day:"Day 90–100",task:"Katai (Harvesting)"}],
    diseases:[{name:"Yellow Mosaic Virus",symptoms:"Patte peele padna",treatment:"Imidacloprid 17.8 SL — 0.5ml/L pani",img:"🟡"},{name:"Anthracnose",symptoms:"Kale dhabbe patte aur tane par",treatment:"Mancozeb 75 WP — 2.5g/L",img:"⬛"},{name:"Charcoal Rot",symptoms:"Jad sukhna, safed growth",treatment:"Thiram seed treatment + drainage sudhaaro",img:"⚫"}],
    pests:[{name:"Girdle Beetle",symptoms:"Tane pe ring cut",treatment:"Chlorpyrifos 20 EC — 2ml/L",img:"🐛"},{name:"Stem Fly",symptoms:"Seedling mur jana",treatment:"Imidacloprid seed treatment",img:"🦟"},{name:"Whitefly",symptoms:"Patte ka peelepan + virus vector",treatment:"Thiamethoxam 25 WG — 0.3g/L",img:"🪲"}],
    weeds:[{name:"Commelina (Kanki)",type:"Broad-leaf",treatment:"Imazethapyr 10 SL — 1L/ha"},{name:"Cynodon (Doob Ghaas)",type:"Narrow-leaf",treatment:"Quizalofop 5 EC — 1.5L/ha"},{name:"Cyperus (Motha)",type:"Sedge",treatment:"Sodium acifluorfen — 1.5L/ha"}],
  },
  "Gehun (Wheat)":{
    icon:"🌾",color:"#fde68a",hindiName:"गेहूँ",season:"Rabi (Oct-Mar)",
    soil:{type:"Heavy Loam / Clay",pH:"6.0–7.5",drainage:"Moderate",prep:"2 deep ploughings after Kharif"},
    climate:{temp:"15–25°C (sowing), 25–35°C (grain filling)",rainfall:"25–75cm during season",humidity:"Low–Medium",sunlight:"Full sun"},
    seeds:{ratePerAcre:"40–45 kg",variety:["HI 8498 (Malav Shakti)","GW 322","MP 4010","HI 8713"],seedCost:"₹2,000–3,500/acre",treatment:"Vitavax Power 2.5g/kg seed"},
    investment:{seedCost:2800,fertilizer:3500,pesticide:1200,irrigation:2000,labour:3000,machinery:2500,other:500,total:15500},
    production:{yieldPerAcre:"16–22 Quintal",avgYield:"18 Q/acre",days:"115–130 din",incomePerAcre:"₹34,880–₹48,400",profitPerAcre:"₹19,380–₹32,900"},
    schedule:[{day:"Oct 20–Nov 15",task:"Baai — timely sowing zaroori"},{day:"Day 21",task:"Crown Root Irrigation (CRI)"},{day:"Day 21",task:"Pehli N dose (Urea)"},{day:"Day 45",task:"Doosri irrigation + 2nd N dose"},{day:"Day 60",task:"Yellow rust check karo"},{day:"Day 75",task:"Flag leaf stage — fungicide spray"},{day:"Day 115–130",task:"Katai + threshing"}],
    diseases:[{name:"Yellow Rust",symptoms:"Patta par peeli lines",treatment:"Propiconazole 25 EC — 1ml/L",img:"🟡"},{name:"Loose Smut",symptoms:"Baal mein kala powder",treatment:"Carboxin seed treatment",img:"⚫"},{name:"Powdery Mildew",symptoms:"Safed powder patte par",treatment:"Sulphur 80 WP — 3g/L",img:"⬜"}],
    pests:[{name:"Aphids (Maahu)",symptoms:"Baal sucking, honeydew",treatment:"Dimethoate 30 EC — 1ml/L",img:"🟢"},{name:"Termite",symptoms:"Jad khaana",treatment:"Chlorpyrifos soil drench",img:"🐜"},{name:"Armyworm",symptoms:"Patte aur grain khaana",treatment:"Lambda-cyhalothrin 5 EC",img:"🐛"}],
    weeds:[{name:"Phalaris minor (Gujri)",type:"Narrow-leaf grass",treatment:"Clodinafop 15 WP — 160g/acre"},{name:"Bathua (Chenopodium)",type:"Broad-leaf",treatment:"2,4-D Amine 500ml/acre"},{name:"Jungali Jai (Wild oat)",type:"Grass",treatment:"Isoproturon 75 WP — 1.5kg/acre"}],
  },
  "Dhan (Rice)":{
    icon:"🌿",color:T.teal,hindiName:"धान",season:"Kharif (Jun-Oct)",
    soil:{type:"Clay / Heavy Clay",pH:"5.5–6.5",drainage:"Puddled (standing water ok)",prep:"Puddling + leveling — critical"},
    climate:{temp:"20–35°C",rainfall:"1000–2000mm",humidity:"High",sunlight:"Full sun"},
    seeds:{ratePerAcre:"8–10 kg (transplant)",variety:["IR 64","Pusa 1121 (Basmati)","MTU 1010","DRR Dhan 44"],seedCost:"₹1,500–4,000/acre",treatment:"Bavistin 2g/kg + Trichoderma"},
    investment:{seedCost:2500,fertilizer:3800,pesticide:2200,irrigation:1500,labour:5000,machinery:2000,other:800,total:17800},
    production:{yieldPerAcre:"14–20 Quintal",avgYield:"17 Q/acre",days:"100–130 din",incomePerAcre:"₹44,800–₹64,000",profitPerAcre:"₹27,000–₹46,200"},
    schedule:[{day:"Day 0–25",task:"Nursery taiyaar karo"},{day:"Day 21–25",task:"Transplanting"},{day:"Day 7 after transplant",task:"Pehla Urea"},{day:"Day 30–35",task:"Herbicide spray (basal)"},{day:"Day 45",task:"2nd Urea + Zinc"},{day:"Day 60–65",task:"Panicle initiation — fertilizer"},{day:"Day 100–130",task:"Harvest"}],
    diseases:[{name:"Blast",symptoms:"Patte par diamond-shape dhabbe",treatment:"Tricyclazole 75 WP — 0.6g/L",img:"🔴"},{name:"Brown Plant Hopper (BPH)",symptoms:"Hopperburn — seedling sukh jaana",treatment:"Buprofezin 25 SC — 2ml/L",img:"🟤"},{name:"Sheath Blight",symptoms:"Tane ki sheath par dhabbe",treatment:"Hexaconazole 5 SC — 2ml/L",img:"🟫"}],
    pests:[{name:"Stem Borer",symptoms:"Deadheart / Whitear",treatment:"Carbofuran 3G — 10kg/acre",img:"⬜"},{name:"Leaf Folder",symptoms:"Patta fold hona",treatment:"Chlorpyrifos 20 EC — 2ml/L",img:"🌿"},{name:"Gall Midge",symptoms:"Silver shoot",treatment:"Carbofuran granules",img:"🔴"}],
    weeds:[{name:"Echinochloa (Shyama)",type:"Grass weed",treatment:"Bispyribac Na 10 SC — 200ml/acre"},{name:"Monochoria",type:"Broad-leaf aquatic",treatment:"2,4-D Na Salt"},{name:"Cyperus iria (Mutha)",type:"Sedge",treatment:"Ethoxysulfuron WG"}],
  },
  "Chana (Chickpea)":{
    icon:"🫘",color:T.orange,hindiName:"चना",season:"Rabi (Oct-Feb)",
    soil:{type:"Medium Black / Loam",pH:"6.0–7.5",drainage:"Well-drained — waterlogging deadly",prep:"1 deep plough + 1 harrowing"},
    climate:{temp:"15–30°C",rainfall:"60–90cm",humidity:"Dry preferred",sunlight:"Full sun"},
    seeds:{ratePerAcre:"30–35 kg",variety:["JG 11 (Most popular in MP)","JG 16","KAK 2","Virat"],seedCost:"₹2,500–4,000/acre",treatment:"Rhizobium + Thiram 3g/kg"},
    investment:{seedCost:3000,fertilizer:1800,pesticide:1200,irrigation:600,labour:2500,machinery:1500,other:400,total:11000},
    production:{yieldPerAcre:"6–10 Quintal",avgYield:"8 Q/acre",days:"90–110 din",incomePerAcre:"₹31,500–₹52,500",profitPerAcre:"₹20,500–₹41,500"},
    schedule:[{day:"Oct 20–Nov 5",task:"Baai (timely critical)"},{day:"Day 30–35",task:"Pehli nindai"},{day:"Day 45",task:"Helicoverpa check"},{day:"Day 50–55",task:"Fungicide (Blight)"},{day:"Day 60",task:"Pehli irrigation (if needed)"},{day:"Day 90–110",task:"Katai"}],
    diseases:[{name:"Ascochyta Blight",symptoms:"Patte + tane + phali par dhabbe",treatment:"Mancozeb 75 WP 2.5g/L ya Chlorothalonil",img:"🟤"},{name:"Wilt (Fusarium)",symptoms:"Puri plant sukh jaana",treatment:"Trichoderma seed treatment + Carbendazim",img:"🟫"},{name:"Collar Rot",symptoms:"Jad ke paas sukhna",treatment:"Metalaxyl seed treatment",img:"⬛"}],
    pests:[{name:"Helicoverpa (Pod Borer)",symptoms:"Phali mein ghusna — dana khaana",treatment:"Emamectin Benzoate 5 SG — 0.4g/L",img:"🐛"},{name:"Cutworm",symptoms:"Seedling kaat deta hai raat ko",treatment:"Chlorpyrifos soil spray",img:"🐜"},{name:"Pod Bug",symptoms:"Phali suck karta hai",treatment:"Quinalphos 25 EC — 2ml/L",img:"🪲"}],
    weeds:[{name:"Chenopodium (Bathua)",type:"Broad-leaf",treatment:"Pendimethalin 30 EC (pre-emergence)"},{name:"Phalaris minor",type:"Grass",treatment:"Imazethapyr 10 SL"},{name:"Rumex (Khatta Palak)",type:"Broad-leaf",treatment:"2,4-D amine 500ml/acre"}],
  },
  "Sarson (Mustard)":{
    icon:"🌼",color:"#fde047",hindiName:"सरसों",season:"Rabi (Oct-Feb)",
    soil:{type:"Sandy Loam to Loam",pH:"6.0–7.5",drainage:"Well-drained",prep:"Fine tilth zaroor — 2-3 harrowings"},
    climate:{temp:"10–25°C",rainfall:"25–40cm",humidity:"Low–Medium",sunlight:"Full sun"},
    seeds:{ratePerAcre:"2–2.5 kg (very low!)",variety:["RH 749","Pusa Bold","RH 30","Vardan"],seedCost:"₹600–1,200/acre",treatment:"Thiram 3g/kg seed"},
    investment:{seedCost:900,fertilizer:2500,pesticide:800,irrigation:1200,labour:2000,machinery:1200,other:400,total:9000},
    production:{yieldPerAcre:"5–8 Quintal",avgYield:"6.5 Q/acre",days:"110–130 din",incomePerAcre:"₹26,000–₹41,600",profitPerAcre:"₹17,000–₹32,600"},
    schedule:[{day:"Oct 1–15",task:"Baai — sarson ke liye early sowing better"},{day:"Day 25–30",task:"Thinning (plants 15cm gap rakhein)"},{day:"Day 30",task:"1st irrigation + Urea"},{day:"Day 45–50",task:"Aphid check — critical stage"},{day:"Day 60",task:"2nd irrigation"},{day:"Day 110–130",task:"Katai (jab siliquae peeli ho)"}],
    diseases:[{name:"Alternaria Blight",symptoms:"Patte + siliquae par dhabbe",treatment:"Mancozeb 75 WP 2g/L",img:"🟤"},{name:"White Rust",symptoms:"Patte ki nichli taraf safed patches",treatment:"Metalaxyl + Mancozeb",img:"⬜"},{name:"Sclerotinia Rot",symptoms:"Tane par safed cottony growth",treatment:"Carbendazim 1g/L",img:"⚫"}],
    pests:[{name:"Aphids (Maahu) — Major pest",symptoms:"Bud aur flower suck karna",treatment:"Dimethoate 30 EC — 1ml/L, spray at threshold (100/plant)",img:"🟢"},{name:"Painted Bug",symptoms:"Seedling damge",treatment:"Malathion 50 EC — 2ml/L",img:"🎨"},{name:"Sawfly",symptoms:"Patte khaana",treatment:"Quinalphos 25 EC",img:"🐛"}],
    weeds:[{name:"Rumex/Kasni",type:"Broad-leaf",treatment:"Metribuzin pre-emergence"},{name:"Phalaris minor",type:"Grass",treatment:"Isoproturon 75 WP 1kg/acre"},{name:"Chenopodium",type:"Broad-leaf",treatment:"2,4-D — avoid during flowering!"}],
  },
  "Makka (Maize)":{
    icon:"🌽",color:T.gold,hindiName:"मक्का",season:"Kharif (Jun-Sep)",
    soil:{type:"Sandy Loam to Loam",pH:"6.0–7.5",drainage:"Well-drained",prep:"Deep ploughing + 2 harrowings"},
    climate:{temp:"21–27°C",rainfall:"500–750mm",humidity:"Medium",sunlight:"Full sun — shade-intolerant"},
    seeds:{ratePerAcre:"8–10 kg (hybrid)",variety:["DKC 9144","P 3396","NK 6240","Vivek Hybrid 9"],seedCost:"₹1,800–3,500/acre",treatment:"Thiram + Carbendazim 3g/kg"},
    investment:{seedCost:2500,fertilizer:3000,pesticide:1500,irrigation:1000,labour:3000,machinery:1800,other:700,total:13500},
    production:{yieldPerAcre:"18–28 Quintal",avgYield:"22 Q/acre",days:"90–110 din",incomePerAcre:"₹33,120–₹51,520",profitPerAcre:"₹19,620–₹38,020"},
    schedule:[{day:"Day 0",task:"Baai (40–45 cm row spacing)"},{day:"Day 15",task:"Pehli nindai (critical)"},{day:"Day 20",task:"Thinning + 1st Urea"},{day:"Day 35",task:"2nd Urea + irrigation"},{day:"Day 45–50",task:"Fall Armyworm check — daily"},{day:"Day 60",task:"Tasseling — irrigation zaroori"},{day:"Day 90–110",task:"Harvest"}],
    diseases:[{name:"Turcicum Leaf Blight",symptoms:"Patte par elongated grey lesions",treatment:"Mancozeb + Carbendazim spray",img:"🟫"},{name:"Fall Armyworm (FAW)",symptoms:"Patta khaana, drass mein ghusna",treatment:"Emamectin Benzoate 5 SG — 0.4g/L — early morning spray",img:"🐛"},{name:"Common Rust",symptoms:"Brown pustules on leaves",treatment:"Propiconazole 25 EC — 1ml/L",img:"🟤"}],
    pests:[{name:"Fall Armyworm (FAW)",symptoms:"Drass (whorl) mein frass + hole",treatment:"Emamectin 5 SG 0.4g/L + Neem oil",img:"🐛"},{name:"Stem Borer",symptoms:"Deadheart",treatment:"Chlorpyrifos granules in whorl",img:"⬛"},{name:"Aphids",symptoms:"Leaf + tassel suck karna",treatment:"Imidacloprid 17.8 SL — 0.5ml/L",img:"🟢"}],
    weeds:[{name:"Phalaris (Kanki)",type:"Grass",treatment:"Atrazine 50 WP pre-emergence 1.5kg/acre"},{name:"Commelina",type:"Broad-leaf",treatment:"2,4-D amine 500ml/acre post-emergence"},{name:"Cyperus (Motha)",type:"Sedge",treatment:"Atrazine + pendimethalin combo"}],
  },
  "Tamatar (Tomato)":{
    icon:"🍅",color:T.red,hindiName:"टमाटर",season:"Rabi/Kharif dono",
    soil:{type:"Sandy Loam + organic matter",pH:"6.0–7.0",drainage:"Excellent",prep:"Raised beds (15cm) + FYM 8–10 ton/acre"},
    climate:{temp:"20–27°C (day), 15–20°C (night)",rainfall:"Moderate — avoid high humidity",humidity:"Moderate",sunlight:"Full sun"},
    seeds:{ratePerAcre:"150–200g (nursery)",variety:["Pusa Ruby","Arka Rakshak (blight resistant)","Naveen","Hybrid Syngenta 5039"],seedCost:"₹800–3,000/acre",treatment:"Carbendazim 2g/kg seed"},
    investment:{seedCost:2000,fertilizer:4500,pesticide:3500,irrigation:2500,labour:8000,machinery:1000,other:1500,total:23000},
    production:{yieldPerAcre:"80–120 Quintal",avgYield:"100 Q/acre",days:"60–80 din (transplant se)",incomePerAcre:"₹40,000–₹2,40,000 (price variable!)",profitPerAcre:"₹17,000–₹2,17,000"},
    schedule:[{day:"Nursery Day 0",task:"Seed sowing in tray"},{day:"Day 25–30",task:"Transplanting (evening)"},{day:"Day 7 after transplant",task:"Starter dose fertilizer"},{day:"Day 30",task:"Staking + pruning"},{day:"Day 35–40",task:"Fungicide spray (blight prone)"},{day:"Day 45",task:"Fruit set — drip irrigation"},{day:"Day 60–80",task:"Harvest start"}],
    diseases:[{name:"Early Blight",symptoms:"Concentric ring dhabbe patte par",treatment:"Mancozeb 75 WP 2.5g/L ya Iprodione",img:"🟤"},{name:"Late Blight",symptoms:"Dark water-soaked lesions",treatment:"Metalaxyl + Mancozeb — urgent!",img:"⬛"},{name:"Leaf Curl Virus",symptoms:"Patte mude + chhote phal",treatment:"Imidacloprid (for whitefly vector)",img:"🌿"}],
    pests:[{name:"Fruit Borer (Helicoverpa)",symptoms:"Fruit mein ghusna",treatment:"Emamectin Benzoate 5 SG 0.4g/L",img:"🐛"},{name:"Whitefly",symptoms:"Virus vector + suck",treatment:"Thiamethoxam 25 WG 0.3g/L",img:"🪲"},{name:"Mites",symptoms:"Bronzing of leaves",treatment:"Abamectin 1.8 EC — 1ml/L",img:"🔴"}],
    weeds:[{name:"Mixed weeds",type:"All types",treatment:"Mulching (plastic/organic) — best for tomato"},{name:"Nutgrass",type:"Sedge",treatment:"Manual removal zaroori"},{name:"Purslane",type:"Broad-leaf",treatment:"Pendimethalin pre-planting"}],
  },
  "Pyaz (Onion)":{
    icon:"🧅",color:T.purple,hindiName:"प्याज़",season:"Rabi (Nov-Apr)",
    soil:{type:"Sandy Loam / Loam",pH:"6.0–7.5",drainage:"Well-drained — waterlogging se phaphoond",prep:"Fine tilth + FYM 15 ton/acre"},
    climate:{temp:"15–25°C",rainfall:"Dry during bulb development",humidity:"Low-Medium",sunlight:"Full sun"},
    seeds:{ratePerAcre:"4–5 kg (transplant nursery)",variety:["Bhima Raj","Bhima Kiran","Agrifound Light Red","N 2-4-1"],seedCost:"₹3,000–5,000/acre (transplant cost included)",treatment:"Thiram 3g/kg + Bavistin"},
    investment:{seedCost:4000,fertilizer:3500,pesticide:2500,irrigation:2800,labour:6000,machinery:1200,other:1000,total:21000},
    production:{yieldPerAcre:"50–80 Quintal",avgYield:"65 Q/acre",days:"120–150 din",incomePerAcre:"₹1,30,000–₹3,20,000 (price volatile!)",profitPerAcre:"₹1,09,000–₹2,99,000"},
    schedule:[{day:"Nursery",task:"Seed sowing in raised bed"},{day:"Day 40–45",task:"Transplanting"},{day:"Day 15 after transplant",task:"Pehli N dose"},{day:"Day 30",task:"2nd irrigation + weeding"},{day:"Day 60",task:"K dose (bulb development)"},{day:"Day 90",task:"Irrigation band karo (10 din pehle)"},{day:"Day 120–150",task:"Harvest + curing"}],
    diseases:[{name:"Purple Blotch",symptoms:"Patte par purple bordered dhabbe",treatment:"Mancozeb 75 WP 2g/L ya Iprodione",img:"🟣"},{name:"Stemphylium Blight",symptoms:"Patte sukh jaana — tip se",treatment:"Carbendazim + Mancozeb mix",img:"🟤"},{name:"Basal Rot",symptoms:"Bulb sadna jad mein",treatment:"Trichoderma soil treatment",img:"⚫"}],
    pests:[{name:"Thrips",symptoms:"Silver streaks on leaves",treatment:"Fipronil 5 SC — 2ml/L + Neem oil",img:"🌾"},{name:"Leaf Miner",symptoms:"White mines in leaves",treatment:"Abamectin 1.8 EC — 1ml/L",img:"⬛"},{name:"Cutworm",symptoms:"Young plant katna",treatment:"Chlorpyrifos soil drench",img:"🐜"}],
    weeds:[{name:"Mixed grasses",type:"Grass",treatment:"Pendimethalin pre-emergence 3L/ha"},{name:"Cyperus (Nutgrass)",type:"Sedge",treatment:"Manual + Halosulfuron"},{name:"Broad-leaf weeds",type:"Broad-leaf",treatment:"Oxyfluorfen 23.5 EC 200ml/acre"}],
  },
};

// ─── SHOP DATA ─────────────────────────────────────────────────────────────────
const SEEDS_CATALOG = [
  { id:"s1", cat:"seeds", crop:"Soybean",  name:"JS 335 Certified Seed",     brand:"MPKV",         price:180, unit:"kg",  minQty:10, rating:4.6, tag:"Most Popular", desc:"MP ki number 1 soybean variety — 90-95 din, 12-14 Q/acre", img:"🟤", stock:true },
  { id:"s2", cat:"seeds", crop:"Soybean",  name:"RVS 2001-4 Soybean",        brand:"IARI Indore",  price:220, unit:"kg",  minQty:10, rating:4.4, tag:"High Yield",   desc:"Naya variety — yellow mosaic resistant, 14 Q/acre",        img:"🌿", stock:true },
  { id:"s3", cat:"seeds", crop:"Wheat",    name:"HI 8498 (Malav Shakti)",    brand:"JNKVV",        price:45,  unit:"kg",  minQty:40, rating:4.7, tag:"MP Special",   desc:"MP climate ke liye best — 18-20 Q/acre, rust resistant",   img:"🌾", stock:true },
  { id:"s4", cat:"seeds", crop:"Wheat",    name:"GW 322 Wheat",              brand:"CSAUAT",       price:42,  unit:"kg",  minQty:40, rating:4.5, tag:"Reliable",     desc:"Stable variety — har sal achha result",                    img:"🌾", stock:true },
  { id:"s5", cat:"seeds", crop:"Chana",    name:"JG 11 Chickpea",            brand:"JNKVV Jabalpur",price:95, unit:"kg",  minQty:30, rating:4.8, tag:"Best Seller",  desc:"Sabse zyada bechi jaane wali chana variety in MP",         img:"🫘", stock:true },
  { id:"s6", cat:"seeds", crop:"Maize",    name:"DKC 9144 Hybrid Maize",     brand:"Dekalb",       price:580, unit:"kg",  minQty:8,  rating:4.5, tag:"Hybrid",       desc:"FAW tolerant + high yield — 28 Q/acre possible",           img:"🌽", stock:true },
  { id:"s7", cat:"seeds", crop:"Tomato",   name:"Arka Rakshak Tomato",       brand:"IIHR",         price:850, unit:"10g", minQty:1,  rating:4.9, tag:"Disease Res.", desc:"Blight + Virus double resistant — game changer",           img:"🍅", stock:true },
  { id:"s8", cat:"seeds", crop:"Mustard",  name:"RH 749 Mustard",            brand:"CCS HAU",      price:320, unit:"kg",  minQty:2,  rating:4.6, tag:"Top Rated",    desc:"High oil content (42%) + good yield — 7-8 Q/acre",        img:"🌼", stock:true },
  { id:"s9", cat:"seeds", crop:"Onion",    name:"Bhima Raj Onion",           brand:"NHRDF",        price:1800,unit:"kg",  minQty:4,  rating:4.7, tag:"Certified",    desc:"Dark red, good storage — 65-70 Q/acre",                   img:"🧅", stock:false},
];

const TOOLS_CATALOG = [
  { id:"t1", cat:"tools", name:"Knapsack Spray Pump (16L)",  brand:"Aspee",     price:1850, unit:"piece", minQty:1, rating:4.5, tag:"Best Seller",  desc:"16L battery-free, adjustable nozzle — sabse zyada bikne wala", img:"💧", stock:true },
  { id:"t2", cat:"tools", name:"Battery Sprayer (16L)",      brand:"Fortune",   price:3200, unit:"piece", minQty:1, rating:4.6, tag:"Power Saver",  desc:"Li-ion battery, 4-6 hours backup — kam mehnat zyada kaam",    img:"⚡", stock:true },
  { id:"t3", cat:"tools", name:"Rotary Weeder",              brand:"Local",     price:450,  unit:"piece", minQty:1, rating:4.2, tag:"Manual",       desc:"Dhan/Soybean mein manual weeding — desi jugaad",              img:"🌿", stock:true },
  { id:"t4", cat:"tools", name:"Garden Fork (4-tine)",       brand:"Zenith",    price:380,  unit:"piece", minQty:1, rating:4.3, tag:"Durable",      desc:"Forged steel — soil loosening ke liye best",                  img:"🌱", stock:true },
  { id:"t5", cat:"tools", name:"Digital Soil pH Tester",     brand:"HM Digital",price:1200, unit:"piece", minQty:1, rating:4.4, tag:"New",          desc:"Seconds mein pH result — 10-20 guna sasta vs lab test",        img:"🧪", stock:true },
  { id:"t6", cat:"tools", name:"Moisture Meter (Grain)",     brand:"Agritech",  price:2800, unit:"piece", minQty:1, rating:4.5, tag:"Harvest Tool", desc:"Gehun/Soybean moisture % seedha pata chalta hai",             img:"📊", stock:true },
  { id:"t7", cat:"tools", name:"Seed Drill (Manual 3-Row)",  brand:"Excel",     price:8500, unit:"piece", minQty:1, rating:4.3, tag:"Heavy Duty",   desc:"3 row — Gehun/Chana sowing ke liye — seedha + sahi depth",    img:"🌾", stock:true },
  { id:"t8", cat:"tools", name:"Tarpaulin 20x20 ft",         brand:"HDP",       price:1100, unit:"piece", minQty:1, rating:4.4, tag:"Essential",    desc:"Threshing + storage ke liye — 200 GSM strong",                img:"🟦", stock:true },
  { id:"t9", cat:"tools", name:"Safety Kit (Mask+Gloves)",   brand:"3M",        price:650,  unit:"set",   minQty:1, rating:4.8, tag:"Safety",       desc:"Spray ke time protection — mask + nitrile gloves + goggles",  img:"🛡️", stock:true },
];

const AGRI_PRODUCTS = [
  { id:"p1", cat:"agri",  name:"Nativo 75 WG",    brand:"Bayer",    price:680,  unit:"100g",  minQty:1, rating:4.5, tag:"Best Seller",  desc:"Wheat & rice — rain-fast fungicide",           img:"🔵", stock:true  },
  { id:"p2", cat:"agri",  name:"Tafaban 50EC",    brand:"Dhanuka",  price:420,  unit:"L",     minQty:1, rating:4.2, tag:"Value Pick",   desc:"Aphids, whitefly, thrips control",             img:"🟢", stock:true  },
  { id:"p3", cat:"agri",  name:"Nominee Gold",    brand:"PI Ind.",  price:750,  unit:"100ml", minQty:1, rating:4.6, tag:"Top Rated",    desc:"Rice mein post-emergent weed control",         img:"🔴", stock:true  },
  { id:"p4", cat:"agri",  name:"Topik 15 WP",     brand:"Syngenta", price:580,  unit:"40g",   minQty:1, rating:4.4, tag:"Herbicide",    desc:"Wheat mein narrow-leaf weed",                  img:"🟤", stock:true  },
  { id:"p5", cat:"agri",  name:"Gromor 20:20:0",  brand:"Coromandel",price:1450,unit:"50kg",  minQty:1, rating:4.1, tag:"Fertilizer",   desc:"Balanced NPK for vegetative growth",           img:"⚪", stock:true  },
  { id:"p6", cat:"agri",  name:"Emamectin 5 SG",  brand:"Dhanuka",  price:520,  unit:"100g",  minQty:1, rating:4.7, tag:"FAW Killer",   desc:"Fall armyworm + Helicoverpa best control",     img:"🟣", stock:true  },
];

const ALL_PRODUCTS = [...SEEDS_CATALOG, ...TOOLS_CATALOG, ...AGRI_PRODUCTS];

const MANDI_PRICES = {
  "Soybean":       [{ m:"Indore",    st:"MP", p:4450, c:+120, v:"22,000 Q", up:true  },{ m:"Latur",    st:"MH", p:4380, c:+80,  v:"18,400 Q", up:true  },{ m:"Kota",   st:"RJ", p:4320, c:-30,  v:"9,200 Q",  up:false }],
  "Gehun (Wheat)": [{ m:"Indore",    st:"MP", p:2180, c:+45,  v:"12,400 Q", up:true  },{ m:"Hapur",    st:"UP", p:2210, c:+30,  v:"8,200 Q",  up:true  },{ m:"Karnal", st:"HR", p:2195, c:-10,  v:"15,600 Q", up:false }],
  "Chana (Chickpea)":[{ m:"Indore",  st:"MP", p:5250, c:+100, v:"8,400 Q",  up:true  },{ m:"Akola",    st:"MH", p:5180, c:+60,  v:"6,200 Q",  up:true  }],
  "Sarson (Mustard)":[{ m:"Jaipur",  st:"RJ", p:5200, c:+80,  v:"14,000 Q", up:true  },{ m:"Alwar",    st:"RJ", p:5150, c:+60,  v:"11,200 Q", up:true  }],
  "Makka (Maize)": [{ m:"Davangere", st:"KA", p:1840, c:+60,  v:"18,400 Q", up:true  },{ m:"Nizamabad",st:"TS", p:1810, c:+25,  v:"14,200 Q", up:true  }],
  "Pyaz (Onion)":  [{ m:"Lasalgaon", st:"MH", p:2800, c:-150, v:"22,000 Q", up:false },{ m:"Hubli",    st:"KA", p:2650, c:-80,  v:"16,400 Q", up:false }],
};

const MACHINES_LIST = [
  { id:1, name:"Rotavator",       owner:"Suresh Patel",       dist:"1.2 km", rate:"₹800/ghanta", avail:true,  icon:"🚜", rat:4.8 },
  { id:2, name:"Drone Spray",     owner:"AgriDrone Sehore",   dist:"3.5 km", rate:"₹400/acre",   avail:true,  icon:"🚁", rat:4.9 },
  { id:3, name:"Combine Harvester",owner:"MP Agri Services",  dist:"5 km",   rate:"₹1,800/acre", avail:false, icon:"🌾", rat:4.6 },
  { id:4, name:"Seed Drill",      owner:"Ramesh Kumar",       dist:"0.8 km", rate:"₹600/acre",   avail:true,  icon:"🌱", rat:4.7 },
  { id:5, name:"Tractor 45 HP",   owner:"Kishan Singh",       dist:"2.1 km", rate:"₹700/ghanta", avail:true,  icon:"🚛", rat:4.5 },
];

const FPO_LIST = [
  { crop:"Soybean",     fpoR:4780, mR:4450, premium:330, fpo:"Sehore Kisan FPO",   min:"5 Q",  dl:"30 Nov 2026" },
  { crop:"Gehun",       fpoR:2320, mR:2180, premium:140, fpo:"Vidisha Agri FPO",   min:"10 Q", dl:"15 Apr 2027" },
  { crop:"Chana",       fpoR:5500, mR:5250, premium:250, fpo:"Hoshangabad FPO",    min:"3 Q",  dl:"20 Feb 2027" },
  { crop:"Sarson",      fpoR:5350, mR:5200, premium:150, fpo:"Raisen Oilseed FPO", min:"5 Q",  dl:"10 Mar 2027" },
];

const GOVT_SCHEMES = [
  { id:1, name:"PM-KISAN",               icon:"💰", benefit:"₹6,000/year",         cat:"Income",   color:T.g4,    desc:"Seedha bank account mein — 3 installments",                deadline:"Year-round", steps:["pm-kisan.nic.in register karo","Aadhaar bank se link karo","e-KYC CSC se karwao","Status check karo"] },
  { id:2, name:"Fasal Bima (PMFBY)",      icon:"🛡️", benefit:"Full crop coverage",  cat:"Insurance",color:T.blue,  desc:"Kharif 2% | Rabi 1.5% premium — poori fasal cover",       deadline:"Season-wise", steps:["Bank ya CSC pe apply karo","Premium jama karo","Kharif: Jul 31 | Rabi: Dec 31","Nuksan par 72 hrs mein report"] },
  { id:3, name:"Kisan Credit Card (KCC)", icon:"💳", benefit:"₹3L @ 4% interest",   cat:"Credit",   color:T.gold,  desc:"Khad, seed, machine ke liye revolving credit",             deadline:"Year-round", steps:["Bank se KCC form lo","Land records + Aadhaar + PAN","7 din approval","Revolving limit use karo"] },
  { id:4, name:"MP CM Kisan Kalyan",      icon:"🌾", benefit:"₹4,000 extra/year",   cat:"MP Extra", color:T.purple,desc:"PM-KISAN ke upar MP sarkar ka bonus",                       deadline:"Automatic", steps:["PM-KISAN mein registered hona chahiye","Automatic benefit","MP Online pe check karo"] },
  { id:5, name:"PM Kisan Maandhan",       icon:"👴", benefit:"₹3,000/month pension", cat:"Pension",  color:T.teal,  desc:"60 saal ke baad guaranteed monthly pension",               deadline:"Year-round", steps:["Age 18-40 eligible","₹55-200/month premium","CSC enrollment","Aadhaar + bank + land records"] },
];

const KM_CENTERS = [
  { id:1, name:"KrishiMitra Kendra — Vidisha",  addr:"Near KVK Office, Vidisha",          dist:"2.4 km", hours:"9am–6pm Mon–Sat" },
  { id:2, name:"KrishiMitra Kendra — Sehore",   addr:"Grain Market, Sehore Bypass",        dist:"5.1 km", hours:"9am–6pm Mon–Sat" },
  { id:3, name:"KrishiMitra Kendra — Raisen",   addr:"Patel Chowk, Raisen",                dist:"18 km",  hours:"9am–5pm Mon–Sat" },
];

// ─── CLAUDE AI ────────────────────────────────────────────────────────────────
async function ai(prompt, img64=null, sys=null) {
  const r = await fetch("/api/claude",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      prompt,
      img64,
      sys: sys||`Tu KrishiMitra AI hai — India ka sabse smart krishi sahayak (30 saal ka anubhav).
Hamesha Hindi mein jawab de. Practical, warm, simple bhasha.
Numbers clearly do. MP/Madhya Pradesh context dhyan rakho. Emojis se structure karo.`,
    }),
  });
  const d = await r.json();
  if(d.error) throw new Error(d.error);
  return d.text || "Jawab nahi mila.";
}

// ─── UI ATOMS ─────────────────────────────────────────────────────────────────
const GL = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
textarea,input,select{font-family:inherit;outline:none}
::-webkit-scrollbar{width:0;height:0}
::placeholder{color:rgba(255,255,255,0.2)!important}
select option{background:#0a1a0a;color:#fff}
button:active{transform:scale(0.955)!important}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.fadeUp{animation:fadeUp .3s ease both}
.slideIn{animation:slideIn .3s ease both}
`;

function Spin() { return <div style={{width:18,height:18,border:`2px solid ${T.t15}`,borderTop:`2px solid ${T.g4}`,borderRadius:"50%",animation:"spin .7s linear infinite",flexShrink:0}}/>; }
function Dots() { const [n,setN]=useState(1); useEffect(()=>{const t=setInterval(()=>setN(x=>x%3+1),450);return()=>clearInterval(t)},[]);  return <span>{".".repeat(n)}</span>; }
function Toast({msg,onDone}){ useEffect(()=>{if(msg){const t=setTimeout(onDone,2800);return()=>clearTimeout(t)}},[msg]); if(!msg)return null; return <div style={{position:"fixed",bottom:88,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#16a34a,#15803d)",color:"#fff",padding:"11px 22px",borderRadius:30,fontWeight:700,fontSize:13,zIndex:9999,whiteSpace:"nowrap",boxShadow:"0 6px 28px rgba(22,163,74,.5)",pointerEvents:"none"}}>{msg}</div>; }

function Tag({children,c=T.g4}){ return <span style={{display:"inline-block",padding:"2px 9px",borderRadius:99,background:`${c}1a`,color:c,fontSize:10,fontWeight:700,letterSpacing:.3}}>{children}</span>; }
function Bar({v,c=T.g4}){ return <div style={{height:5,borderRadius:99,background:T.t08}}><div style={{width:`${v}%`,height:"100%",background:c,borderRadius:99,transition:"width .6s ease"}}/></div>; }

function Btn({children,onClick,v="green",disabled,full,sm,style:s={}}){
  const vs={green:{background:disabled?"rgba(22,163,74,.3)":`linear-gradient(135deg,${T.g5},${T.g7})`,color:"#fff",boxShadow:disabled?"none":"0 4px 16px rgba(22,163,74,.4)"},gold:{background:`linear-gradient(135deg,${T.goldS},#d97706)`,color:"#fff",boxShadow:"0 4px 14px rgba(245,158,11,.35)"},outline:{background:"transparent",border:`1.5px solid ${T.brdG}`,color:T.g4},ghost:{background:T.bgCard,border:`1px solid ${T.brd}`,color:T.t50},danger:{background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.3)",color:T.red},purple:{background:"linear-gradient(135deg,#9333ea,#7c3aed)",color:"#fff",boxShadow:"0 4px 16px rgba(147,51,234,.35)"}};
  return <button disabled={disabled} onClick={onClick} style={{border:"none",borderRadius:R.md,fontWeight:700,fontSize:sm?12:14,cursor:disabled?"not-allowed":"pointer",transition:"all .2s",padding:sm?"8px 14px":"12px 20px",width:full?"100%":undefined,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,fontFamily:"inherit",...vs[v],...s}}>{children}</button>;
}

function Card({children,style:s={},onClick,glow,accent}){
  return <div onClick={onClick} style={{background:T.bgCard,border:`1px solid ${glow?T.brdG:accent?`${accent}30`:T.brd}`,borderRadius:R.lg,padding:16,cursor:onClick?"pointer":undefined,transition:"all .2s",...s}}>{children}</div>;
}

function SH({title,sub,back}){
  return <div style={{marginBottom:16}}>{back&&<button onClick={back} style={{background:"none",border:"none",cursor:"pointer",color:T.t30,fontSize:13,padding:"0 0 10px",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}>‹ Wapas</button>}<div style={{color:T.t0,fontSize:20,fontWeight:800,lineHeight:1.2}}>{title}</div>{sub&&<div style={{color:T.t30,fontSize:12,marginTop:3}}>{sub}</div>}</div>;
}

function AiBox({text,loading,title="🤖 AI Salah",accent=T.g4}){
  if(!text&&!loading)return null;
  return <div className="fadeUp" style={{background:`${accent}09`,border:`1px solid ${accent}28`,borderRadius:R.lg,padding:18,marginBottom:16}}><div style={{color:accent,fontWeight:700,fontSize:13,marginBottom:10,display:"flex",alignItems:"center",gap:8}}>{loading&&<Spin/>}{title}</div>{loading&&!text?<div style={{color:T.t30,fontSize:13}}>Soch raha hoon<Dots/></div>:<div style={{color:"rgba(240,253,244,.88)",fontSize:14,lineHeight:1.9,whiteSpace:"pre-wrap"}}>{text}</div>}</div>;
}

// ─── SHARED ───────────────────────────────────────────────────────────────────
function ProductItem({p,onAdd,qty,onQtyChange}){
  const catColor={seeds:T.g4,tools:T.blue,agri:T.orange};
  const c=catColor[p.cat]||T.g4;
  return(
    <Card style={{marginBottom:10}}>
      <div style={{display:"flex",gap:10,alignItems:"center"}}>
        <div style={{fontSize:30,flexShrink:0}}>{p.img}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:2}}>
            <span style={{color:T.t0,fontWeight:700,fontSize:14}}>{p.name}</span>
            <Tag c={c}>{p.tag}</Tag>
          </div>
          <div style={{color:T.t30,fontSize:11}}>{p.brand} • {p.unit && `per ${p.unit}`}</div>
          <div style={{color:T.t50,fontSize:11,marginTop:1}}>{p.desc}</div>
          <div style={{display:"flex",gap:4,alignItems:"center",marginTop:3}}>
            <span style={{color:T.gold,fontSize:10}}>{"★".repeat(Math.floor(p.rating))}</span>
            <span style={{color:T.t30,fontSize:9}}>{p.rating}</span>
          </div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:10}}>
        <div>
          <span style={{color:T.gold,fontWeight:800,fontSize:16}}>₹{p.price}</span>
          <span style={{color:T.t30,fontSize:11}}>/{p.unit}</span>
          {p.minQty>1&&<div style={{color:T.t30,fontSize:10}}>Min: {p.minQty} {p.unit}</div>}
          <div style={{color:p.stock?T.g4:T.red,fontSize:10,fontWeight:600,marginTop:1}}>{p.stock?"✅ In Stock":"⚠️ Limited"}</div>
        </div>
        {qty?(
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>onQtyChange(Math.max(p.minQty,qty-p.minQty))} style={{width:28,height:28,borderRadius:"50%",background:T.t08,border:`1px solid ${T.brd}`,color:T.t0,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>−</button>
            <span style={{color:T.t0,fontWeight:700,minWidth:24,textAlign:"center"}}>{qty}</span>
            <button onClick={()=>onQtyChange(qty+p.minQty)} style={{width:28,height:28,borderRadius:"50%",background:T.bgCard,border:`1px solid ${T.brd}`,color:T.t0,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>+</button>
          </div>
        ):(
          <Btn sm onClick={()=>onAdd(p)} disabled={!p.stock}>Cart Mein</Btn>
        )}
      </div>
    </Card>
  );
}

// ─── LOGIN / ONBOARDING ───────────────────────────────────────────────────────
function LoginScreen({onLogin}){
  const [step,setStep]=useState(1);
  const [name,setName]=useState("");
  const [village,setVillage]=useState("");
  const [phone,setPhone]=useState("");
  const [selectedCrops,setSelectedCrops]=useState([]);

  const allCropOptions=Object.keys(CROP_LIBRARY);

  const toggle=(crop)=>setSelectedCrops(p=>p.includes(crop)?p.filter(c=>c!==crop):[...p,crop]);

  const finish=()=>{
    if(selectedCrops.length===0)return;
    onLogin({name,village,phone,crops:selectedCrops,activeCrop:selectedCrops[0],creditLimit:0,creditUsed:0,creditStatus:"none",orders:[],orderCount:0});
  };

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#020a05 0%,#0a1f0a 60%,#05100a 100%)",display:"flex",flexDirection:"column",padding:24,fontFamily:"'Noto Sans','Noto Sans Devanagari',sans-serif"}}>
      <style>{GL}</style>
      {/* Logo */}
      <div style={{textAlign:"center",paddingTop:40,paddingBottom:32}}>
        <div style={{fontSize:64,marginBottom:8}}>🌾</div>
        <div style={{color:T.g4,fontWeight:900,fontSize:28,letterSpacing:-0.5}}>KrishiMitra Pro</div>
        <div style={{color:T.t30,fontSize:13,marginTop:4}}>भारत के किसान का Digital साथी</div>
      </div>

      {/* Step indicator */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:28}}>
        {[1,2].map(s=><div key={s} style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:step>=s?T.g5:T.t08,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,border:step===s?`2px solid ${T.g4}`:"none",transition:"all .3s"}}>{s}</div>
          {s<2&&<div style={{width:40,height:2,background:step>s?T.g5:T.t08,borderRadius:99,transition:"all .3s"}}/>}
        </div>)}
      </div>

      {step===1&&(
        <div className="slideIn" style={{flex:1}}>
          <div style={{color:T.t0,fontWeight:700,fontSize:18,marginBottom:4}}>Aapka Swagat Hai! 🙏</div>
          <div style={{color:T.t30,fontSize:13,marginBottom:24}}>Pehle thoda aapke baare mein jaante hain</div>

          {[{label:"👨‍🌾 Aapka Naam",ph:"Jaise: Ramlal Patel",val:name,set:setName},
            {label:"🏘️ Gaon / Sheher",ph:"Jaise: Sehore, Vidisha...",val:village,set:setVillage},
            {label:"📱 Mobile Number",ph:"10-digit number",val:phone,set:setPhone,type:"tel"},
          ].map((f,i)=>(
            <div key={i} style={{marginBottom:14}}>
              <label style={{color:T.blue,fontSize:11,fontWeight:700,display:"block",marginBottom:6}}>{f.label}</label>
              <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} type={f.type||"text"} style={{width:"100%",padding:"13px 16px",borderRadius:R.md,background:T.bgCard,border:`1px solid ${T.brd}`,color:T.t0,fontSize:14}}/>
            </div>
          ))}

          <Btn full onClick={()=>name&&village&&phone?setStep(2):null} disabled={!name||!village||!phone} style={{marginTop:8,padding:15,fontSize:16}}>
            Aage Badho →
          </Btn>
        </div>
      )}

      {step===2&&(
        <div className="slideIn" style={{flex:1}}>
          <div style={{color:T.t0,fontWeight:700,fontSize:18,marginBottom:4}}>Aapki Fasalein Chunein 🌱</div>
          <div style={{color:T.t30,fontSize:13,marginBottom:6}}>Jo bhi fasal aap ugate ho — sab chunein</div>
          <div style={{color:T.gold,fontSize:12,marginBottom:18}}>({selectedCrops.length} chuni gayi)</div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:20}}>
            {allCropOptions.map(crop=>{
              const d=CROP_LIBRARY[crop];
              const sel=selectedCrops.includes(crop);
              return(
                <div key={crop} onClick={()=>toggle(crop)} style={{background:sel?"rgba(74,222,128,.1)":T.bgCard,border:`1.5px solid ${sel?T.g4:T.brd}`,borderRadius:R.lg,padding:"14px 12px",cursor:"pointer",textAlign:"center",transition:"all .2s"}}>
                  <div style={{fontSize:26,marginBottom:4}}>{d.icon}</div>
                  <div style={{color:sel?T.g4:T.t0,fontWeight:700,fontSize:12,lineHeight:1.3}}>{crop.split("(")[0].trim()}</div>
                  <div style={{color:T.t30,fontSize:10,marginTop:2}}>{d.season.split("(")[0]}</div>
                  {sel&&<div style={{marginTop:6,fontSize:14}}>✅</div>}
                </div>
              );
            })}
          </div>

          <div style={{display:"flex",gap:10}}>
            <Btn v="ghost" onClick={()=>setStep(1)} style={{flex:0,padding:"12px 18px"}}>← Wapas</Btn>
            <Btn full disabled={selectedCrops.length===0} onClick={finish} style={{padding:15,fontSize:16}}>
              🚀 App Shuru Karo ({selectedCrops.length})
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({user,setUser,nav}){
  const crops=user.crops;
  const active=user.activeCrop;
  const cropD=CROP_LIBRARY[active]||CROP_LIBRARY["Soybean"];
  const todayTask=cropD.schedule[1];

  return(
    <div style={{paddingBottom:80}}>
      {/* Hero */}
      <div style={{background:"linear-gradient(160deg,#0a1f0a,#122b12,#0f2410)",padding:"20px 18px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-20,top:-20,fontSize:120,opacity:.04,lineHeight:1}}>🌾</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div>
            <div style={{color:T.t30,fontSize:12}}>Namaste 🙏</div>
            <div style={{color:T.t0,fontSize:22,fontWeight:800}}>{user.name}</div>
            <div style={{color:T.gL,fontSize:12,marginTop:1}}>{user.village}, MP</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}}>
            {user.creditLimit>0&&(
              <div style={{background:"rgba(192,132,252,.15)",border:"1px solid rgba(192,132,252,.3)",borderRadius:R.md,padding:"6px 10px",textAlign:"center"}}>
                <div style={{color:T.purple,fontWeight:800,fontSize:13}}>₹{(user.creditLimit-user.creditUsed).toLocaleString()}</div>
                <div style={{color:T.t30,fontSize:9}}>Credit Available</div>
              </div>
            )}
            <Tag c={T.gold}>⭐ Gold</Tag>
          </div>
        </div>

        {/* Active crop selector */}
        <div style={{marginBottom:12}}>
          <div style={{color:T.t30,fontSize:10,fontWeight:600,marginBottom:6}}>AAPKI FASALEIN</div>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:2}}>
            {crops.map(c=>{
              const d=CROP_LIBRARY[c]; const sel=c===active;
              return(
                <button key={c} onClick={()=>setUser(u=>({...u,activeCrop:c}))} style={{flexShrink:0,display:"flex",alignItems:"center",gap:6,padding:"7px 12px",borderRadius:R.md,background:sel?"rgba(74,222,128,.2)":T.t08,border:`1.5px solid ${sel?T.g4:"transparent"}`,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>
                  <span style={{fontSize:16}}>{d?.icon||"🌱"}</span>
                  <span style={{color:sel?T.g4:T.t50,fontWeight:700,fontSize:11}}>{c.split("(")[0].trim()}</span>
                </button>
              );
            })}
            <button onClick={()=>nav("library")} style={{flexShrink:0,padding:"7px 12px",borderRadius:R.md,background:T.t08,border:`1px dashed ${T.brd}`,cursor:"pointer",fontFamily:"inherit",color:T.t30,fontSize:11,fontWeight:600}}>+ Naya Khet</button>
          </div>
        </div>

        {/* Active crop card */}
        <div style={{background:"rgba(0,0,0,.2)",borderRadius:R.md,padding:"12px 14px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:32}}>{cropD.icon}</span>
            <div style={{flex:1}}>
              <div style={{color:T.t0,fontWeight:700,fontSize:15}}>{active}</div>
              <div style={{color:T.gL,fontSize:11}}>{cropD.season} • Yield: {cropD.production.avgYield}</div>
              <div style={{color:T.gold,fontSize:11,marginTop:2}}>⚡ Next: {cropD.schedule[2]?.task}</div>
            </div>
            <Btn sm onClick={()=>nav("library","detail",active)} v="outline">Poori Jaankari</Btn>
          </div>
        </div>
      </div>

      {/* Weather strip */}
      <div style={{margin:"12px 16px 0",background:"rgba(96,165,250,.08)",border:"1px solid rgba(96,165,250,.2)",borderRadius:R.md,padding:"10px 14px",display:"flex",gap:10,alignItems:"center"}}>
        <span style={{fontSize:22}}>🌦️</span>
        <div style={{flex:1}}>
          <div style={{color:T.t0,fontWeight:600,fontSize:13}}>26°C — Halki baarish sambhav (60%)</div>
          <div style={{color:"rgba(96,165,250,.8)",fontSize:11}}>Irrigation rok do • Fungicide spray kal karo</div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{padding:"16px 16px 0"}}>
        <div style={{color:T.t0,fontWeight:700,fontSize:14,marginBottom:10}}>⚡ Quick Actions</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {[
            {icon:"🦠",label:"Rog AI",      sub:"Diagnose",      tab:"diagnose",  mode:"disease"},
            {icon:"🐛",label:"Keeda AI",     sub:"Pest Control",  tab:"diagnose",  mode:"pest"   },
            {icon:"🌿",label:"Kharpatwar",   sub:"Weed AI",       tab:"diagnose",  mode:"weed"   },
            {icon:"📚",label:"Fasal Guide",  sub:"Crop Library",  tab:"library"                  },
            {icon:"🛒",label:"Shop",         sub:"Seed+Tools",    tab:"shop"                     },
            {icon:"📊",label:"Mandi",        sub:"Live Bhav",     tab:"mandi"                    },
          ].map((a,i)=>(
            <button key={i} onClick={()=>nav(a.tab,a.mode)} style={{background:T.bgCard,border:`1px solid ${T.brd}`,borderRadius:R.lg,padding:"14px 8px",cursor:"pointer",textAlign:"center",fontFamily:"inherit"}}>
              <div style={{fontSize:24,marginBottom:4}}>{a.icon}</div>
              <div style={{color:T.t0,fontWeight:700,fontSize:11}}>{a.label}</div>
              <div style={{color:T.t30,fontSize:9,marginTop:1}}>{a.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Today's tip for active crop */}
      <div style={{padding:"16px 16px 0"}}>
        <Card glow style={{padding:14}}>
          <div style={{color:T.g4,fontWeight:700,fontSize:12,marginBottom:8}}>🌱 {active} — Aaj Ki Zaruri Baat</div>
          <div style={{color:T.t50,fontSize:12,lineHeight:1.7}}>
            🌡️ {cropD.climate.temp} • 💧 {cropD.climate.rainfall}<br/>
            🪴 Mitti: {cropD.soil.type} (pH {cropD.soil.pH})<br/>
            📅 Beej: {cropD.seeds.ratePerAcre} per acre • {cropD.seeds.variety[0]}
          </div>
          <Btn sm v="outline" onClick={()=>nav("library","detail",active)} style={{marginTop:10,width:"100%"}}>Poori Fasal Guide Dekho →</Btn>
        </Card>
      </div>

      {/* Kisan Credit CTA */}
      {user.creditStatus==="none"&&(
        <div style={{padding:"14px 16px 0"}}>
          <div onClick={()=>nav("more","credit")} style={{background:"linear-gradient(135deg,rgba(147,51,234,.12),rgba(109,40,217,.08))",border:"1px solid rgba(147,51,234,.3)",borderRadius:R.lg,padding:16,cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:32}}>💳</span>
              <div style={{flex:1}}>
                <div style={{color:T.purple,fontWeight:700,fontSize:14}}>Kisan Input Credit Apply Karo</div>
                <div style={{color:T.t50,fontSize:12,marginTop:2}}>Seed+Tool kharido — baad mein chukao • Low interest</div>
                <div style={{color:T.gold,fontSize:12,fontWeight:700,marginTop:4}}>₹5,000 – ₹50,000 credit limit</div>
              </div>
              <div style={{color:T.purple,fontSize:22}}>›</div>
            </div>
          </div>
        </div>
      )}
      {user.creditStatus==="approved"&&(
        <div style={{padding:"14px 16px 0"}}>
          <Card accent={T.purple} style={{padding:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{color:T.purple,fontWeight:700,fontSize:13}}>💳 Kisan Credit Active</div>
                <div style={{color:T.t30,fontSize:11,marginTop:2}}>Available: <span style={{color:T.gold,fontWeight:700}}>₹{(user.creditLimit-user.creditUsed).toLocaleString()}</span></div>
              </div>
              <Btn sm v="purple" onClick={()=>nav("shop")}>Shop Karo</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* Stats */}
      <div style={{padding:"14px 16px 16px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {[{v:user.orders?.length||0,l:"Orders",i:"📦"},{v:"23",l:"Diagnose",i:"🔬"},{v:"₹4,200",l:"Bachaya",i:"💰"}].map((s,i)=>(
            <Card key={i} style={{textAlign:"center",padding:12}}>
              <div style={{fontSize:18}}>{s.i}</div>
              <div style={{color:T.gold,fontWeight:800,fontSize:17,margin:"3px 0 2px"}}>{s.v}</div>
              <div style={{color:T.t30,fontSize:10}}>{s.l}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CROP LIBRARY ─────────────────────────────────────────────────────────────
function LibraryScreen({initCrop,userCrops}){
  const [sel,setSel]=useState(initCrop||null);
  const [section,setSection]=useState("overview");
  const [aiText,setAiText]=useState("");
  const [busy,setBusy]=useState(false);

  const sections=[{id:"overview",l:"📋 Overview"},{id:"calendar",l:"📅 Schedule"},{id:"disease",l:"🦠 Rog"},{id:"pest",l:"🐛 Keeda"},{id:"weed",l:"🌿 Kharpatwar"},{id:"economics",l:"💰 Kamai"}];

  const askAI=async(crop,sec)=>{
    setBusy(true);setAiText("");
    const d=CROP_LIBRARY[crop];
    const prompts={
      overview:`${crop} ki kheti ke liye sabse zaroori 5 tips do — MP ke liye specific.`,
      calendar:`${crop} ke liye exact calendar — seedhi aur kaam ki baatein batao kis mahine mein kya karna hai.`,
      disease:`${crop} ke major rogo ka practical treatment guide. Kaunsi dawai, kaunsi matra, kab spray karein.`,
      pest:`${crop} ke keedon ka short practical control guide. Threshold, dawai, timing.`,
      weed:`${crop} mein weed control — pre-emergence + post-emergence — practical advice.`,
      economics:`${crop} ki kheti mein kharcha aur kamai ka analysis — MP mein realistic figures. Kaise maximize karein profit?`,
    };
    try{ setAiText(await ai(prompts[sec]||prompts.overview)); }catch{ setAiText("Error."); }
    setBusy(false);
  };

  if(!sel){
    return(
      <div style={{padding:"16px 16px 90px"}}>
        <SH title="📚 Fasal Paathshala" sub="Har fasal ki poori jankari — AI ke saath"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {Object.entries(CROP_LIBRARY).map(([name,d])=>{
            const isUser=userCrops.includes(name);
            return(
              <div key={name} onClick={()=>{setSel(name);setSection("overview");setAiText("")}} style={{background:isUser?"rgba(74,222,128,.08)":T.bgCard,border:`1.5px solid ${isUser?T.brdG:T.brd}`,borderRadius:R.lg,padding:16,cursor:"pointer",transition:"all .2s"}}>
                <div style={{fontSize:34,marginBottom:6}}>{d.icon}</div>
                <div style={{color:isUser?T.g4:T.t0,fontWeight:700,fontSize:14}}>{name.split("(")[0].trim()}</div>
                <div style={{color:T.t30,fontSize:11,marginTop:2}}>{d.season}</div>
                <div style={{color:T.gold,fontSize:11,marginTop:3,fontWeight:600}}>{d.production.avgYield} avg</div>
                {isUser&&<Tag c={T.g4} style={{marginTop:6}}>Meri Fasal ✅</Tag>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const d=CROP_LIBRARY[sel];
  return(
    <div style={{padding:"16px 16px 90px"}}>
      <SH title={`${d.icon} ${sel}`} sub={`${d.hindiName} • ${d.season}`} back={()=>{setSel(null);setAiText("")}}/>

      {/* Section tabs */}
      <div style={{display:"flex",gap:7,marginBottom:16,overflowX:"auto",paddingBottom:2}}>
        {sections.map(s=>(
          <button key={s.id} onClick={()=>{setSection(s.id);setAiText("")}} style={{flexShrink:0,padding:"8px 12px",borderRadius:99,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:11,border:section===s.id?`1.5px solid ${d.color}`:`1px solid ${T.brd}`,background:section===s.id?`${d.color}18`:T.bgCard,color:section===s.id?d.color:T.t30}}>
            {s.l}
          </button>
        ))}
      </div>

      {/* Content */}
      {section==="overview"&&(
        <div className="fadeUp">
          {/* Quick stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:14}}>
            {[{l:"Yield/Acre",v:d.production.avgYield,c:d.color},{l:"Days",v:d.production.days,c:T.blue},{l:"Investment/Acre",v:`₹${d.investment.total.toLocaleString()}`,c:T.orange},{l:"Profit/Acre",v:d.production.profitPerAcre.split("-")[0],c:T.g4}].map((s,i)=>(
              <Card key={i} style={{padding:12,textAlign:"center"}}>
                <div style={{color:T.t30,fontSize:10,marginBottom:3}}>{s.l}</div>
                <div style={{color:s.c,fontWeight:800,fontSize:15}}>{s.v}</div>
              </Card>
            ))}
          </div>
          <Card style={{marginBottom:10}}>
            <div style={{color:d.color,fontWeight:700,fontSize:13,marginBottom:8}}>🌱 Mitti Ki Zarurat</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {[["Mitti Ka Type",d.soil.type],["pH Range",d.soil.pH],["Drainage",d.soil.drainage],["Taiyaari",d.soil.prep]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",gap:12}}>
                  <span style={{color:T.t30,fontSize:12,flexShrink:0}}>{l}</span>
                  <span style={{color:T.t0,fontSize:12,textAlign:"right"}}>{v}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card style={{marginBottom:10}}>
            <div style={{color:T.blue,fontWeight:700,fontSize:13,marginBottom:8}}>🌡️ Mausam</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {[["Temperature",d.climate.temp],["Rainfall",d.climate.rainfall],["Sunlight",d.climate.sunlight]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",gap:12}}>
                  <span style={{color:T.t30,fontSize:12}}>{l}</span>
                  <span style={{color:T.t0,fontSize:12}}>{v}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div style={{color:T.gold,fontWeight:700,fontSize:13,marginBottom:8}}>🌱 Beej</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:T.t30,fontSize:12}}>Rate/Acre</span><span style={{color:T.t0,fontSize:12}}>{d.seeds.ratePerAcre}</span></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:T.t30,fontSize:12}}>Cost</span><span style={{color:T.t0,fontSize:12}}>{d.seeds.seedCost}</span></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:T.t30,fontSize:12}}>Treatment</span><span style={{color:T.t0,fontSize:12,textAlign:"right",maxWidth:"60%"}}>{d.seeds.treatment}</span></div>
              <div style={{marginTop:4}}>
                <div style={{color:T.t30,fontSize:11,marginBottom:4}}>Achhi Varieties:</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {d.seeds.variety.map((v,i)=><Tag key={i} c={d.color}>{v}</Tag>)}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {section==="calendar"&&(
        <div className="fadeUp">
          {d.schedule.map((s,i)=>(
            <div key={i} style={{display:"flex",gap:12,marginBottom:12}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:`${d.color}22`,border:`2px solid ${d.color}`,display:"flex",alignItems:"center",justifyContent:"center",color:d.color,fontSize:11,fontWeight:800,flexShrink:0}}>{i+1}</div>
                {i<d.schedule.length-1&&<div style={{width:2,height:24,background:T.brd,margin:"4px 0"}}/>}
              </div>
              <Card style={{flex:1,padding:"10px 14px",marginBottom:0}}>
                <div style={{color:d.color,fontSize:11,fontWeight:700}}>{s.day}</div>
                <div style={{color:T.t0,fontSize:13,marginTop:3,fontWeight:600}}>{s.task}</div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {(section==="disease"||section==="pest")&&(
        <div className="fadeUp">
          {(section==="disease"?d.diseases:d.pests).map((item,i)=>(
            <Card key={i} style={{marginBottom:10}}>
              <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                <div style={{fontSize:28,flexShrink:0}}>{item.img}</div>
                <div style={{flex:1}}>
                  <div style={{color:T.t0,fontWeight:700,fontSize:14}}>{item.name}</div>
                  <div style={{color:T.t30,fontSize:12,marginTop:2}}>{item.symptoms}</div>
                  <div style={{background:"rgba(74,222,128,.08)",border:"1px solid rgba(74,222,128,.2)",borderRadius:R.sm,padding:"8px 10px",marginTop:8}}>
                    <div style={{color:T.g4,fontSize:10,fontWeight:700,marginBottom:2}}>💊 TREATMENT</div>
                    <div style={{color:T.gL,fontSize:12}}>{item.treatment}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {section==="weed"&&(
        <div className="fadeUp">
          {d.weeds.map((w,i)=>(
            <Card key={i} style={{marginBottom:10}}>
              <div style={{color:T.t0,fontWeight:700,fontSize:14}}>{w.name}</div>
              <Tag c={T.teal} style={{marginTop:4}}>{w.type}</Tag>
              <div style={{background:"rgba(45,212,191,.08)",border:"1px solid rgba(45,212,191,.2)",borderRadius:R.sm,padding:"8px 10px",marginTop:8}}>
                <div style={{color:T.teal,fontSize:10,fontWeight:700,marginBottom:2}}>🌿 HERBICIDE</div>
                <div style={{color:"rgba(153,246,228,.9)",fontSize:12}}>{w.treatment}</div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {section==="economics"&&(
        <div className="fadeUp">
          <Card style={{marginBottom:10}}>
            <div style={{color:T.t0,fontWeight:700,fontSize:14,marginBottom:10}}>💸 Investment / Acre</div>
            {Object.entries(d.investment).filter(([k])=>k!=="total").map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
                <span style={{color:T.t50,fontSize:12,textTransform:"capitalize"}}>{k}</span>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:80,height:4,borderRadius:99,background:T.t08,overflow:"hidden"}}>
                    <div style={{width:`${(v/d.investment.total)*100}%`,height:"100%",background:T.orange,borderRadius:99}}/>
                  </div>
                  <span style={{color:T.t0,fontWeight:600,fontSize:12,minWidth:48,textAlign:"right"}}>₹{v.toLocaleString()}</span>
                </div>
              </div>
            ))}
            <div style={{borderTop:`1px solid ${T.brd}`,marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between"}}>
              <span style={{color:T.t0,fontWeight:700}}>Total</span>
              <span style={{color:T.orange,fontWeight:800,fontSize:16}}>₹{d.investment.total.toLocaleString()}</span>
            </div>
          </Card>
          <Card>
            <div style={{color:T.t0,fontWeight:700,fontSize:14,marginBottom:10}}>📈 Expected Kamai</div>
            {[["Average Yield",d.production.avgYield],["Days to Harvest",d.production.days],["Income/Acre",d.production.incomePerAcre],["Profit/Acre",d.production.profitPerAcre]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{color:T.t30,fontSize:12}}>{l}</span>
                <span style={{color:T.g4,fontWeight:700,fontSize:12}}>{v}</span>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* AI Ask button */}
      <Btn full v="ghost" onClick={()=>askAI(sel,section)} disabled={busy} style={{marginTop:14,border:`1px solid rgba(96,165,250,.3)`,color:T.blue}}>
        {busy?<><Spin/>AI soch raha hai<Dots/></>:`🤖 AI Se ${sections.find(s=>s.id===section)?.l} Advice Lo`}
      </Btn>
      <AiBox text={aiText} loading={busy} accent={d.color}/>
    </div>
  );
}

// ─── DIAGNOSE ─────────────────────────────────────────────────────────────────
function DiagnoseScreen({mode,activeCrop}){
  const [crop,setCrop]=useState(activeCrop||"Soybean");
  const [desc,setDesc]=useState("");
  const [img,setImg]=useState(null);
  const [b64,setB64]=useState(null);
  const [ans,setAns]=useState("");
  const [busy,setBusy]=useState(false);
  const [prods,setProds]=useState([]);
  const [toast,setToast]=useState(null);
  const fRef=useRef();
  const ms={disease:{icon:"🦠",t:"Fasal Rog Pahchaan",ph:"Patte peele, kale dhabbe...",photo:true,c:T.red},pest:{icon:"🐛",t:"Keeda Niyantran",ph:"Kaunse kide dikh rahe hain...",photo:true,c:T.orange},weed:{icon:"🌿",t:"Kharpatwar",ph:"Kaunse weed hain...",photo:true,c:T.teal},weather:{icon:"🌤️",t:"Mausam Salah",ph:"Barish ke baad kya karein...",photo:false,c:T.blue},loan:{icon:"💰",t:"Kisan Credit",ph:"Loan ki zarurat...",photo:false,c:T.gold},general:{icon:"🧑‍🌾",t:"Khet Ki Salah",ph:"Apna sawaal...",photo:false,c:T.g4}};
  const m=ms[mode]||ms.general;
  const ps={disease:`Meri ${crop} fasal mein: "${desc}". (1) Bimari ka naam (2) Karan (3) Treatment + fungicide dose`,pest:`Meri ${crop} mein keeda: "${desc}". (1) Naam (2) Insecticide + dose (3) Spray timing`,weed:`Meri ${crop} mein weed: "${desc}". (1) Weed type (2) Herbicide + dose (3) Best timing`,weather:`${crop} ke liye weather query: "${desc}". Short practical advice.`,loan:`Kisan credit query: "${desc}". Schemes, eligibility, process.`,general:`${crop} ke baare mein: "${desc}". Practical advice.`};
  const go=async()=>{if(!desc.trim())return;setBusy(true);setAns("");setProds([]);try{setAns(await ai(ps[mode]||ps.general,b64));if(mode==="disease")setProds(AGRI_PRODUCTS.slice(0,2));else if(mode==="pest")setProds(AGRI_PRODUCTS.slice(1,3));else if(mode==="weed")setProds(AGRI_PRODUCTS.slice(2,4));}catch{setAns("⚠️ Error. Internet check karein.");}setBusy(false);};
  const handleImg=e=>{const f=e.target.files[0];if(!f)return;setImg(URL.createObjectURL(f));const r=new FileReader();r.onload=ev=>setB64(ev.target.result.split(",")[1]);r.readAsDataURL(f);};
  return(
    <div style={{padding:"16px 16px 90px"}}>
      <SH title={`${m.icon} ${m.t}`} sub="AI se seedha, bilkul free"/>
      <div style={{marginBottom:12}}>
        <label style={{color:T.blue,fontSize:11,fontWeight:700,display:"block",marginBottom:5}}>🌱 Fasal</label>
        <select value={crop} onChange={e=>setCrop(e.target.value)} style={{width:"100%",padding:"12px 14px",borderRadius:R.md,background:T.bgCard,border:`1px solid ${T.brd}`,color:T.t0,fontSize:14}}>
          {Object.keys(CROP_LIBRARY).map(c=><option key={c}>{c}</option>)}
        </select>
      </div>
      <div style={{marginBottom:12}}>
        <label style={{color:T.blue,fontSize:11,fontWeight:700,display:"block",marginBottom:5}}>📝 Samasya</label>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder={m.ph} rows={4} style={{width:"100%",padding:13,borderRadius:R.md,background:T.bgCard,border:`1px solid ${T.brd}`,color:T.t0,fontSize:14,resize:"none",lineHeight:1.65}}/>
      </div>
      {m.photo&&(<div style={{marginBottom:14}}><Btn full v="outline" onClick={()=>fRef.current?.click()}>📷 Photo Upload Karo (Optional)</Btn><input ref={fRef} type="file" accept="image/*" capture="environment" onChange={handleImg} style={{display:"none"}}/>{img&&<img src={img} alt="" style={{width:"100%",borderRadius:R.md,marginTop:10,maxHeight:180,objectFit:"cover",border:`2px solid ${T.g4}`}}/>}</div>)}
      <Btn full disabled={busy||!desc.trim()} onClick={go} style={{padding:15,fontSize:15,marginBottom:20}}>
        {busy?<><Spin/>Soch raha hoon<Dots/></>:"🔍 AI Se Diagnose Karo"}
      </Btn>
      <AiBox text={ans} loading={busy} accent={m.c}/>
      {ans&&prods.length>0&&<div className="fadeUp"><div style={{color:T.gold,fontWeight:700,fontSize:14,marginBottom:8}}>💊 Recommended Products</div>{prods.map(p=><ProductItem key={p.id} p={p} onAdd={()=>setToast(`✅ ${p.name} add!`)}/>)}</div>}
      <Toast msg={toast} onDone={()=>setToast(null)}/>
    </div>
  );
}

// ─── SHOP ─────────────────────────────────────────────────────────────────────
function ShopScreen({user,setUser,activeCrop}){
  const [view,setView]=useState("browse");
  const [cat,setCat]=useState("seeds");
  const [srch,setSrch]=useState("");
  const [cartItems,setCartItems]=useState({});
  const [checkout,setCheckout]=useState(false);
  const [delivery,setDelivery]=useState("home");
  const [addr,setAddr]=useState({name:user.name,phone:user.phone,line1:"",pin:"",city:user.village});
  const [selCenter,setSelCenter]=useState(0);
  const [payMode,setPayMode]=useState("online");
  const [useCredit,setUseCredit]=useState(false);
  const [ordered,setOrdered]=useState(false);
  const [toast,setToast]=useState(null);

  const cats=[{id:"seeds",l:"🌱 Seeds"},{id:"tools",l:"🔧 Tools"},{id:"agri",l:"💊 Agri"}];
  const shown=ALL_PRODUCTS.filter(p=>p.cat===cat&&(!srch||p.name.toLowerCase().includes(srch.toLowerCase())||p.brand.toLowerCase().includes(srch.toLowerCase())));

  const totalItems=Object.values(cartItems).reduce((a,v)=>a+v,0);
  const cartProducts=ALL_PRODUCTS.filter(p=>cartItems[p.id]);
  const subtotal=cartProducts.reduce((a,p)=>a+(p.price*(cartItems[p.id]||0)),0);
  const creditAvail=user.creditLimit-user.creditUsed;

  const addToCart=(p)=>{setCartItems(prev=>({...prev,[p.id]:(prev[p.id]||0)+p.minQty}));setToast(`✅ ${p.name} add!`);};
  const updateQty=(id,q)=>setCartItems(prev=>q<=0?Object.fromEntries(Object.entries(prev).filter(([k])=>k!==id)):{...prev,[id]:q});

  const placeOrder=()=>{
    const ord={id:`KM${Date.now()}`,items:cartProducts.map(p=>({...p,qty:cartItems[p.id]})),subtotal,delivery,addr:delivery==="home"?addr:KM_CENTERS[selCenter],payMode:useCredit?"credit":payMode,date:new Date().toLocaleDateString("en-IN"),status:"Confirmed"};
    const newCredit=useCredit?user.creditUsed+subtotal:user.creditUsed;
    setUser(u=>({...u,orders:[...u.orders,ord],creditUsed:newCredit}));
    setOrdered(true);setCartItems({});
  };

  if(ordered) return(
    <div style={{padding:"40px 16px",textAlign:"center"}}>
      <div style={{fontSize:64,marginBottom:16}}>🎉</div>
      <div style={{color:T.g4,fontWeight:800,fontSize:22,marginBottom:8}}>Order Place Ho Gaya!</div>
      <div style={{color:T.t50,fontSize:14,marginBottom:24}}>Aapka order confirm ho gaya hai.<br/>Delivery/Pickup details SMS pe milegi.</div>
      <Btn onClick={()=>{setOrdered(false);setCheckout(false);setView("browse")}}>Shopping Jaari Rakhein</Btn>
    </div>
  );

  if(checkout) return(
    <div style={{padding:"16px 16px 100px"}}>
      <SH title="🛒 Checkout" back={()=>setCheckout(false)}/>

      {/* Cart summary */}
      <Card style={{marginBottom:14}}>
        <div style={{color:T.t0,fontWeight:700,fontSize:14,marginBottom:10}}>📦 Cart ({totalItems} items)</div>
        {cartProducts.map(p=>(
          <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
            <span style={{fontSize:20}}>{p.img}</span>
            <div style={{flex:1}}>
              <div style={{color:T.t0,fontSize:13,fontWeight:600}}>{p.name}</div>
              <div style={{color:T.t30,fontSize:11}}>{p.brand} • {cartItems[p.id]} {p.unit}</div>
            </div>
            <div style={{color:T.gold,fontWeight:700,fontSize:13}}>₹{(p.price*cartItems[p.id]).toLocaleString()}</div>
          </div>
        ))}
        <div style={{borderTop:`1px solid ${T.brd}`,paddingTop:10,marginTop:6,display:"flex",justifyContent:"space-between"}}>
          <span style={{color:T.t0,fontWeight:700}}>Total</span>
          <span style={{color:T.gold,fontWeight:800,fontSize:17}}>₹{subtotal.toLocaleString()}</span>
        </div>
      </Card>

      {/* Delivery mode */}
      <div style={{marginBottom:14}}>
        <div style={{color:T.t50,fontSize:11,fontWeight:700,marginBottom:8}}>📍 DELIVERY YA PICKUP</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[{id:"home",i:"🏠",l:"Ghar Pe Delivery",s:"2-4 din"},{id:"pickup",i:"🏪",l:"Kendra Se Pickup",s:"Same day"}].map(o=>(
            <div key={o.id} onClick={()=>setDelivery(o.id)} style={{padding:14,borderRadius:R.md,border:`1.5px solid ${delivery===o.id?T.g4:T.brd}`,background:delivery===o.id?"rgba(74,222,128,.1)":T.bgCard,cursor:"pointer",textAlign:"center"}}>
              <div style={{fontSize:24,marginBottom:4}}>{o.i}</div>
              <div style={{color:delivery===o.id?T.g4:T.t0,fontWeight:700,fontSize:12}}>{o.l}</div>
              <div style={{color:T.t30,fontSize:10,marginTop:2}}>{o.s}</div>
            </div>
          ))}
        </div>
      </div>

      {delivery==="home"?(
        <Card style={{marginBottom:14}}>
          <div style={{color:T.blue,fontWeight:700,fontSize:13,marginBottom:10}}>📮 Delivery Address</div>
          {[["Naam",addr.name,"name"],[" Mobile",addr.phone,"phone"],["Ghar/Mohalla",addr.line1,"line1"],["Pin Code",addr.pin,"pin"],["Shahar/Gaon",addr.city,"city"]].map(([l,v,k])=>(
            <div key={k} style={{marginBottom:9}}>
              <label style={{color:T.t30,fontSize:11,display:"block",marginBottom:4}}>{l}</label>
              <input value={v} onChange={e=>setAddr(a=>({...a,[k]:e.target.value}))} placeholder={l} style={{width:"100%",padding:"11px 12px",borderRadius:R.sm,background:T.t08,border:`1px solid ${T.brd}`,color:T.t0,fontSize:13}}/>
            </div>
          ))}
        </Card>
      ):(
        <div style={{marginBottom:14}}>
          <div style={{color:T.t50,fontSize:11,fontWeight:700,marginBottom:8}}>🏪 KENDRA CHUNEIN</div>
          {KM_CENTERS.map((c,i)=>(
            <div key={c.id} onClick={()=>setSelCenter(i)} style={{padding:12,borderRadius:R.md,border:`1.5px solid ${selCenter===i?T.g4:T.brd}`,background:selCenter===i?"rgba(74,222,128,.08)":T.bgCard,cursor:"pointer",marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{color:selCenter===i?T.g4:T.t0,fontWeight:700,fontSize:13}}>{c.name}</div>
                  <div style={{color:T.t30,fontSize:11,marginTop:2}}>{c.addr}</div>
                  <div style={{color:T.t50,fontSize:11,marginTop:1}}>⏰ {c.hours}</div>
                </div>
                <Tag c={T.blue}>{c.dist}</Tag>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment */}
      <div style={{marginBottom:14}}>
        <div style={{color:T.t50,fontSize:11,fontWeight:700,marginBottom:8}}>💳 PAYMENT</div>
        {user.creditStatus==="approved"&&creditAvail>=subtotal&&(
          <div onClick={()=>setUseCredit(!useCredit)} style={{padding:12,borderRadius:R.md,border:`1.5px solid ${useCredit?T.purple:T.brd}`,background:useCredit?"rgba(192,132,252,.1)":T.bgCard,cursor:"pointer",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${useCredit?T.purple:T.brd}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{useCredit&&<div style={{width:8,height:8,borderRadius:"50%",background:T.purple}}/>}</div>
              <div>
                <div style={{color:T.purple,fontWeight:700,fontSize:13}}>💳 Kisan Credit Use Karo</div>
                <div style={{color:T.t30,fontSize:11}}>Available: ₹{creditAvail.toLocaleString()} • Low interest</div>
              </div>
            </div>
          </div>
        )}
        {!useCredit&&[{id:"online",l:"UPI / Online Payment",i:"📱"},{id:"cod",l:"Cash on Delivery / Pickup",i:"💵"}].map(o=>(
          <div key={o.id} onClick={()=>setPayMode(o.id)} style={{padding:12,borderRadius:R.md,border:`1.5px solid ${payMode===o.id?T.gold:T.brd}`,background:payMode===o.id?"rgba(251,191,36,.08)":T.bgCard,cursor:"pointer",marginBottom:8,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${payMode===o.id?T.gold:T.brd}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{payMode===o.id&&<div style={{width:8,height:8,borderRadius:"50%",background:T.gold}}/>}</div>
            <span style={{fontSize:18}}>{o.i}</span>
            <span style={{color:payMode===o.id?T.gold:T.t50,fontWeight:600,fontSize:13}}>{o.l}</span>
          </div>
        ))}
      </div>

      <div style={{background:"rgba(74,222,128,.06)",border:"1px solid rgba(74,222,128,.2)",borderRadius:R.md,padding:14,marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{color:T.t30,fontSize:12}}>Total Amount</div><div style={{color:T.gold,fontWeight:800,fontSize:20}}>₹{subtotal.toLocaleString()}</div></div>
        <div style={{textAlign:"right"}}><div style={{color:T.t30,fontSize:11}}>Pay Mode</div><div style={{color:useCredit?T.purple:T.gold,fontWeight:700,fontSize:13}}>{useCredit?"Kisan Credit":payMode==="cod"?"Cash":"Online"}</div></div>
      </div>

      <Btn full onClick={placeOrder} style={{padding:16,fontSize:16}}>✅ Order Place Karo</Btn>
    </div>
  );

  return(
    <div style={{padding:"16px 16px 90px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <SH title="🛒 Kisan Dukaan" sub="Seeds • Tools • Agri Products"/>
        {totalItems>0&&(
          <button onClick={()=>setCheckout(true)} style={{background:`linear-gradient(135deg,${T.g5},${T.g7})`,border:"none",borderRadius:R.md,padding:"8px 14px",cursor:"pointer",fontFamily:"inherit",color:"#fff",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:6}}>
            🛒 {totalItems} items →
          </button>
        )}
      </div>

      <input value={srch} onChange={e=>setSrch(e.target.value)} placeholder="🔍 Product ya variety search..." style={{width:"100%",padding:"11px 14px",borderRadius:R.md,background:T.bgCard,border:`1px solid ${T.brd}`,color:T.t0,fontSize:13,marginBottom:12}}/>

      {/* Category + Crop filter */}
      <div style={{display:"flex",gap:7,marginBottom:12,overflowX:"auto"}}>
        {cats.map(c=>(
          <button key={c.id} onClick={()=>{setCat(c.id);setSrch("")}} style={{flexShrink:0,padding:"8px 14px",borderRadius:99,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:12,border:cat===c.id?`1.5px solid ${T.g4}`:`1px solid ${T.brd}`,background:cat===c.id?"rgba(74,222,128,.12)":T.bgCard,color:cat===c.id?T.g4:T.t30}}>
            {c.l}
          </button>
        ))}
      </div>

      {cat==="seeds"&&(
        <div style={{background:"rgba(74,222,128,.05)",border:"1px solid rgba(74,222,128,.15)",borderRadius:R.md,padding:"10px 12px",marginBottom:12,fontSize:12,color:T.t50}}>
          🌱 <span style={{color:T.g4,fontWeight:600}}>Aapki fasal ({activeCrop})</span> ke seeds seedhe crop ke naam se filter karein
        </div>
      )}

      {shown.map(p=>(
        <ProductItem key={p.id} p={p} onAdd={addToCart} qty={cartItems[p.id]||0} onQtyChange={(q)=>updateQty(p.id,q)}/>
      ))}
      {shown.length===0&&<div style={{textAlign:"center",padding:32,color:T.t30}}>Koi product nahi mila</div>}

      {totalItems>0&&(
        <div style={{position:"sticky",bottom:72,padding:"12px 0"}}>
          <Btn full onClick={()=>setCheckout(true)} style={{padding:15,fontSize:15,boxShadow:"0 4px 24px rgba(22,163,74,.5)"}}>
            🛒 Checkout ({totalItems} items) — ₹{subtotal.toLocaleString()} →
          </Btn>
        </div>
      )}
      <Toast msg={toast} onDone={()=>setToast(null)}/>
    </div>
  );
}

// ─── MANDI ────────────────────────────────────────────────────────────────────
function MandiScreen({activeCrop}){
  const [crop,setCrop]=useState(activeCrop&&MANDI_PRICES[activeCrop]?activeCrop:"Soybean");
  const [ans,setAns]=useState("");
  const [busy,setBusy]=useState(false);
  const data=MANDI_PRICES[crop]||[];
  const best=data.length?data.reduce((a,b)=>b.p>a.p?b:a,data[0]):{};
  const go=async()=>{setBusy(true);setAns("");try{setAns(await ai(`${crop} mandi prices: ${data.map(d=>`${d.m}(${d.st}): ₹${d.p}/Q, change ${d.c>0?"+":""}${d.c}`).join(", ")}. Kisan ke liye: kab bechein, kahan bechein, outlook, 1 practical tip.`));}catch{setAns("Error.");}setBusy(false);};
  return(
    <div style={{padding:"16px 16px 90px"}}>
      <SH title="📊 Mandi Bhav" sub="Live prices + AI selling strategy"/>
      <select value={crop} onChange={e=>{setCrop(e.target.value);setAns("");}} style={{width:"100%",padding:"12px 14px",borderRadius:R.md,marginBottom:14,background:T.bgCard,border:`1px solid ${T.brd}`,color:T.t0,fontSize:14,fontWeight:600}}>
        {Object.keys(MANDI_PRICES).map(c=><option key={c}>{c}</option>)}
      </select>
      {best.m&&<Card glow style={{marginBottom:12,padding:"14px 18px"}}><div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:28}}>🏆</span><div><div style={{color:T.t30,fontSize:10,fontWeight:700}}>SABSE ACHA BHAV</div><div style={{color:T.gold,fontWeight:800,fontSize:17}}>{best.m}, {best.st}</div><div style={{color:T.t0,fontWeight:700,fontSize:15}}>₹{best.p}/Q</div></div></div></Card>}
      {data.map((d,i)=>(
        <div key={i} style={{background:d.p===best.p?"rgba(251,191,36,.07)":T.bgCard,border:`1px solid ${d.p===best.p?T.brdGold:d.up?T.brdG:"rgba(248,113,113,.2)"}`,borderRadius:R.md,padding:"13px 16px",marginBottom:9,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{color:T.t0,fontWeight:700,fontSize:14}}>{d.m}</div><div style={{color:T.t30,fontSize:11}}>{d.st} • {d.v}</div></div>
          <div style={{textAlign:"right"}}><div style={{color:d.p===best.p?T.gold:T.t0,fontWeight:800,fontSize:18}}>₹{d.p}</div><div style={{color:d.up?T.g4:T.red,fontSize:12,fontWeight:600}}>{d.up?"▲":"▼"} ₹{Math.abs(d.c)}/Q</div></div>
        </div>
      ))}
      <Btn full v="ghost" disabled={busy} onClick={go} style={{marginBottom:14,border:`1px solid rgba(96,165,250,.3)`,color:T.blue}}>
        {busy?<><Spin/>AI soch raha hai<Dots/></>:"🤖 AI — Kab Kahan Bechein?"}
      </Btn>
      <AiBox text={ans} loading={busy} accent={T.blue}/>
      {FPO_LIST.filter(f=>f.crop===crop||crop.includes(f.crop)).map((f,i)=>(
        <Card key={i} glow style={{marginTop:14}}><div style={{color:T.g4,fontWeight:700,fontSize:12,marginBottom:8}}>🤝 FPO Buyback Option</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{color:T.t0,fontWeight:700,fontSize:14}}>{f.fpo}</div><div style={{color:T.t30,fontSize:11,marginTop:2}}>Min: {f.min} • {f.dl}</div></div><div style={{textAlign:"right"}}><div style={{color:T.gold,fontWeight:800,fontSize:18}}>₹{f.fpoR}</div><div style={{color:T.g4,fontSize:11,fontWeight:700}}>+₹{f.premium} vs Mandi</div></div></div></Card>
      ))}
    </div>
  );
}

// ─── MORE SCREEN (Schemes + Credit + Machines + FPO + Profile + Orders) ───────
function MoreScreen({user,setUser}){
  const [view,setView]=useState("hub");
  const [subData,setSubData]=useState(null);
  const [ans,setAns]=useState("");
  const [busy,setBusy]=useState(false);
  const [toast,setToast]=useState(null);
  const [booked,setBooked]=useState({});
  const [fpoReg,setFpoReg]=useState({});

  // Credit flow
  const [creditStep,setCreditStep]=useState(user.creditStatus==="approved"?"active":user.creditStatus==="kyc"?"kyc":"apply");
  const [creditAmt,setCreditAmt]=useState("15000");

  const applyCredit=()=>{ setCreditStep("kyc"); };
  const completeKYC=()=>{
    const amt=parseInt(creditAmt)||15000;
    setUser(u=>({...u,creditStatus:"approved",creditLimit:amt,creditUsed:0}));
    setCreditStep("active");
    setToast("🎉 Credit Approved! ₹"+amt.toLocaleString()+" available hai.");
  };

  if(view==="orders") return(
    <div style={{padding:"16px 16px 90px"}}>
      <SH title="📦 Mere Orders" sub="Sare orders aur services" back={()=>setView("hub")}/>
      {user.orders.length===0?(
        <div style={{textAlign:"center",padding:"60px 0",color:T.t30}}>
          <div style={{fontSize:48,marginBottom:12}}>📦</div>
          <div style={{fontSize:14}}>Abhi koi order nahi hai</div>
          <div style={{fontSize:12,marginTop:6}}>Shop se kharido!</div>
        </div>
      ):(
        user.orders.map((o,i)=>(
          <Card key={i} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div><div style={{color:T.t0,fontWeight:700,fontSize:14}}>Order #{o.id.slice(-6)}</div><div style={{color:T.t30,fontSize:11,marginTop:1}}>{o.date} • {o.payMode}</div></div>
              <Tag c={T.g4}>{o.status}</Tag>
            </div>
            {o.items.map((item,j)=>(
              <div key={j} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                <span style={{fontSize:18}}>{item.img}</span>
                <div style={{flex:1}}><div style={{color:T.t0,fontSize:12,fontWeight:600}}>{item.name}</div><div style={{color:T.t30,fontSize:10}}>Qty: {item.qty} {item.unit}</div></div>
                <div style={{color:T.gold,fontSize:12,fontWeight:700}}>₹{(item.price*item.qty).toLocaleString()}</div>
              </div>
            ))}
            <div style={{borderTop:`1px solid ${T.brd}`,paddingTop:8,marginTop:4,display:"flex",justifyContent:"space-between"}}>
              <span style={{color:T.t30,fontSize:12}}>{o.delivery==="home"?"🏠 Home Delivery":"🏪 Kendra Pickup"}</span>
              <span style={{color:T.gold,fontWeight:700}}>₹{o.subtotal.toLocaleString()}</span>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  if(view==="credit") return(
    <div style={{padding:"16px 16px 90px"}}>
      <SH title="💳 Kisan Input Credit" sub="Kharido abhi, baad mein chukao" back={()=>setView("hub")}/>
      <Card style={{marginBottom:16,background:"rgba(147,51,234,.08)",borderColor:"rgba(147,51,234,.3)"}}>
        <div style={{color:T.purple,fontWeight:700,fontSize:13,marginBottom:6}}>Kisan Credit Kya Hai?</div>
        <div style={{color:T.t50,fontSize:12,lineHeight:1.75}}>Seeds, tools, fertilizer ke liye <strong style={{color:T.t0}}>interest-free 60 din</strong> ya phir <strong style={{color:T.t0}}>6-12 mahine EMI</strong> par le sakte hain. KrishiMitra Kendra pe sirf ek baar KYC karo — phir seedha app se kharido.</div>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
        {[{l:"Limit",v:`₹${user.creditStatus==="approved"?user.creditLimit.toLocaleString():"5K–50K"}`,c:T.purple},{l:"Interest",v:"0% (60 din)",c:T.g4},{l:"Processing",v:"Free KYC",c:T.gold}].map((s,i)=>(
          <Card key={i} style={{textAlign:"center",padding:12}}><div style={{color:T.t30,fontSize:10}}>{s.l}</div><div style={{color:s.c,fontWeight:800,fontSize:13,marginTop:3}}>{s.v}</div></Card>
        ))}
      </div>

      {creditStep==="apply"&&(
        <div className="fadeUp">
          <div style={{marginBottom:14}}>
            <label style={{color:T.blue,fontSize:11,fontWeight:700,display:"block",marginBottom:6}}>Kitna Credit Chahiye?</label>
            <select value={creditAmt} onChange={e=>setCreditAmt(e.target.value)} style={{width:"100%",padding:"12px 14px",borderRadius:R.md,background:T.bgCard,border:`1px solid ${T.brd}`,color:T.t0,fontSize:14}}>
              {["5000","10000","15000","25000","50000"].map(v=><option key={v} value={v}>₹{parseInt(v).toLocaleString()}</option>)}
            </select>
          </div>
          <Card style={{marginBottom:14,background:"rgba(74,222,128,.05)",borderColor:T.brdG}}>
            <div style={{color:T.g4,fontWeight:700,fontSize:13,marginBottom:8}}>📋 Documents Chahiye (KYC)</div>
            {["Aadhaar Card","Pan Card ya Voter ID","Khet ki khasra nakal (Land Record)","Selfie with Aadhaar","Bank Passbook copy"].map((d,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}>
                <span style={{color:T.g4,fontSize:12,fontWeight:700,flexShrink:0}}>✓</span>
                <span style={{color:T.t50,fontSize:12}}>{d}</span>
              </div>
            ))}
          </Card>
          <Card style={{marginBottom:16,background:"rgba(251,191,36,.06)"}}>
            <div style={{color:T.gold,fontWeight:700,fontSize:13,marginBottom:6}}>🏪 KYC Kaise Karein</div>
            <div style={{color:T.t50,fontSize:12,lineHeight:1.7}}>Upar ke documents lekar nazdiki <strong style={{color:T.t0}}>KrishiMitra Kendra</strong> pe aao. 30 minute mein KYC complete hogi. Approval same day ya 24 ghante mein milti hai.</div>
          </Card>
          <Btn full v="purple" onClick={applyCredit} style={{padding:15}}>Apply Karo — KYC Ke Liye</Btn>
        </div>
      )}

      {creditStep==="kyc"&&(
        <div className="fadeUp">
          <Card style={{textAlign:"center",padding:24,marginBottom:16,background:"rgba(147,51,234,.08)",borderColor:"rgba(147,51,234,.3)"}}>
            <div style={{fontSize:48,marginBottom:12}}>🏪</div>
            <div style={{color:T.purple,fontWeight:700,fontSize:16,marginBottom:8}}>KYC Ke Liye Kendra Jaayein</div>
            <div style={{color:T.t50,fontSize:13,lineHeight:1.75}}>Nazdiki KrishiMitra Kendra pe jaayein documents ke saath. Woh aapka KYC verify karenge aur credit approve karenge.</div>
          </Card>
          {KM_CENTERS.map((c,i)=>(
            <Card key={c.id} style={{marginBottom:10,padding:12}}>
              <div style={{color:T.t0,fontWeight:600,fontSize:13}}>{c.name}</div>
              <div style={{color:T.t30,fontSize:11,marginTop:2}}>{c.addr} • {c.dist}</div>
              <div style={{color:T.g4,fontSize:11,marginTop:1}}>⏰ {c.hours}</div>
            </Card>
          ))}
          <Btn full v="ghost" onClick={completeKYC} style={{marginTop:8,border:"1px solid rgba(147,51,234,.4)",color:T.purple}}>
            ✅ KYC Ho Gayi (Simulate)
          </Btn>
        </div>
      )}

      {creditStep==="active"&&(
        <div className="fadeUp">
          <Card glow style={{marginBottom:14,textAlign:"center",padding:24}}>
            <div style={{fontSize:40,marginBottom:8}}>✅</div>
            <div style={{color:T.g4,fontWeight:800,fontSize:18}}>Credit Active Hai!</div>
            <div style={{color:T.gold,fontWeight:800,fontSize:28,margin:"8px 0"}}>₹{user.creditLimit.toLocaleString()}</div>
            <div style={{color:T.t30,fontSize:12}}>Total Limit</div>
          </Card>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            <Card style={{textAlign:"center",padding:14}}><div style={{color:T.t30,fontSize:11}}>Used</div><div style={{color:T.red,fontWeight:800,fontSize:18}}>₹{user.creditUsed.toLocaleString()}</div></Card>
            <Card style={{textAlign:"center",padding:14}}><div style={{color:T.t30,fontSize:11}}>Available</div><div style={{color:T.g4,fontWeight:800,fontSize:18}}>₹{(user.creditLimit-user.creditUsed).toLocaleString()}</div></Card>
          </div>
          <Bar v={(user.creditUsed/user.creditLimit)*100} c={T.orange}/>
          <div style={{color:T.t30,fontSize:11,textAlign:"center",marginTop:6}}>Interest-free 60 days • Repay at harvest</div>
          {user.creditUsed>0&&<div style={{background:"rgba(251,191,36,.07)",border:"1px solid rgba(251,191,36,.25)",borderRadius:R.md,padding:12,marginTop:12,textAlign:"center"}}><div style={{color:T.gold,fontSize:12}}>Outstanding: ₹{user.creditUsed.toLocaleString()} — Due: {new Date(Date.now()+60*86400000).toLocaleDateString("en-IN")}</div></div>}
        </div>
      )}
      <Toast msg={toast} onDone={()=>setToast(null)}/>
    </div>
  );

  if(view==="machines") return(
    <div style={{padding:"16px 16px 90px"}}>
      <SH title="🚜 Machine Booking" back={()=>setView("hub")} sub="Nazdiki machines — 1-tap booking"/>
      {MACHINES_LIST.map(m=>(
        <Card key={m.id} style={{marginBottom:12}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{fontSize:30,flexShrink:0}}>{m.icon}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:2}}><div style={{color:T.t0,fontWeight:700,fontSize:14}}>{m.name}</div><Tag c={m.avail?T.g4:T.red}>{m.avail?"Available":"Booked"}</Tag></div>
              <div style={{color:T.t30,fontSize:12}}>{m.owner} • {m.dist}</div>
              <div style={{color:T.gold,fontWeight:700,fontSize:13,marginTop:3}}>{m.rate}</div>
              <div style={{color:T.gold,fontSize:11}}>{"★".repeat(Math.floor(m.rat))} {m.rat}</div>
            </div>
            <div style={{flexShrink:0}}>{booked[m.id]?<Tag c={T.g4}>Booked ✅</Tag>:<Btn sm disabled={!m.avail} onClick={()=>{setBooked(b=>({...b,[m.id]:true}));setToast(`✅ ${m.name} book ho gaya!`);}}>Book</Btn>}</div>
          </div>
        </Card>
      ))}
      <Toast msg={toast} onDone={()=>setToast(null)}/>
    </div>
  );

  if(view==="schemes") return(
    <div style={{padding:"16px 16px 90px"}}>
      <SH title="🏛️ Sarkari Yojana" back={()=>setView("hub")} sub="Aapke haq ki yojanaein"/>
      {GOVT_SCHEMES.map(s=>(
        <div key={s.id} onClick={()=>{setSubData(s);setView("schemeDetail")}} style={{display:"flex",alignItems:"center",gap:12,background:T.bgCard,border:`1px solid ${T.brd}`,borderRadius:R.lg,padding:"13px 15px",marginBottom:10,cursor:"pointer"}}>
          <span style={{fontSize:28,flexShrink:0}}>{s.icon}</span>
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:2,flexWrap:"wrap"}}><div style={{color:T.t0,fontWeight:700,fontSize:14}}>{s.name}</div><Tag c={s.color}>{s.cat}</Tag></div>
            <div style={{color:T.t30,fontSize:11}}>{s.desc.substring(0,55)}...</div>
            <div style={{color:T.gold,fontWeight:700,fontSize:12,marginTop:2}}>{s.benefit}</div>
          </div>
          <div style={{color:T.t30,fontSize:18}}>›</div>
        </div>
      ))}
    </div>
  );

  if(view==="schemeDetail"&&subData) return(
    <div style={{padding:"16px 16px 90px"}}>
      <SH title={`${subData.icon} ${subData.name}`} back={()=>{setView("schemes");setAns("")}}/>
      <div style={{textAlign:"center",paddingBottom:20}}>
        <div style={{fontSize:52,marginBottom:8}}>{subData.icon}</div>
        <Tag c={subData.color}>{subData.cat}</Tag>
        <div style={{color:T.t50,fontSize:13,marginTop:10,lineHeight:1.75}}>{subData.desc}</div>
        <div style={{color:T.gold,fontWeight:800,fontSize:20,marginTop:10}}>💰 {subData.benefit}</div>
      </div>
      <Card style={{marginBottom:14}}>
        <div style={{color:T.t0,fontWeight:700,fontSize:14,marginBottom:12}}>📋 Kaise Apply Karein</div>
        {subData.steps.map((s,i)=>(
          <div key={i} style={{display:"flex",gap:10,marginBottom:10}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:`${subData.color}25`,border:`2px solid ${subData.color}`,display:"flex",alignItems:"center",justifyContent:"center",color:subData.color,fontSize:11,fontWeight:800,flexShrink:0}}>{i+1}</div>
            <div style={{color:T.t50,fontSize:13,lineHeight:1.65}}>{s}</div>
          </div>
        ))}
      </Card>
      <Btn full onClick={async()=>{setBusy(true);setAns("");try{setAns(await ai(`${subData.name} ke liye MP mein step-by-step apply guide + documents + common mistakes.`));}catch{setAns("Error.");}setBusy(false);}} disabled={busy} style={{marginBottom:14}}>
        {busy?<><Spin/>AI guide bana raha hai<Dots/></>:"🤖 AI Se Detailed Guide Lo"}
      </Btn>
      <AiBox text={ans} loading={busy} accent={subData.color}/>
    </div>
  );

  if(view==="profile") return(
    <div style={{padding:"16px 16px 90px"}}>
      <SH title="👨‍🌾 Mera Profile" back={()=>setView("hub")}/>
      <div style={{background:"linear-gradient(135deg,rgba(13,43,13,.8),rgba(22,101,52,.4))",border:`1px solid ${T.brdG}`,borderRadius:R.xl,padding:24,textAlign:"center",marginBottom:16}}>
        <div style={{fontSize:52,marginBottom:8}}>👨‍🌾</div>
        <div style={{color:T.t0,fontWeight:800,fontSize:20}}>{user.name}</div>
        <div style={{color:T.gL,fontSize:13,marginTop:3}}>{user.village}, MP • 📱 {user.phone}</div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:10,flexWrap:"wrap"}}>
          {user.crops.map(c=><Tag key={c} c={T.g4}>{CROP_LIBRARY[c]?.icon||"🌱"} {c.split("(")[0].trim()}</Tag>)}
        </div>
        <Tag c={T.gold} style={{marginTop:10}}>⭐ Gold Member</Tag>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:16}}>
        {[{v:user.orders.length,l:"Orders",i:"📦"},{v:user.crops.length,l:"Fasalein",i:"🌱"},{v:user.creditStatus==="approved"?`₹${(user.creditLimit-user.creditUsed).toLocaleString()}`:"N/A",l:"Credit",i:"💳"},{v:"₹4,200",l:"Bachaya",i:"💰"}].map((s,i)=>(
          <Card key={i} style={{textAlign:"center",padding:14}}>
            <div style={{fontSize:22}}>{s.i}</div>
            <div style={{color:T.gold,fontWeight:800,fontSize:18,margin:"4px 0 2px"}}>{s.v}</div>
            <div style={{color:T.t30,fontSize:11}}>{s.l}</div>
          </Card>
        ))}
      </div>
      <Btn full v="outline" onClick={()=>setView("orders")} style={{marginBottom:8}}>📦 Mere Orders Dekho</Btn>
      <Btn full v="ghost" onClick={()=>setView("credit")}>💳 Kisan Credit</Btn>
    </div>
  );

  // Hub
  const hubItems=[
    {id:"schemes",  i:"🏛️",t:"Sarkari Yojana",  s:"PM-KISAN, PMFBY, KCC + 2 aur",    c:T.g4    },
    {id:"machines", i:"🚜",t:"Machine Booking", s:"Tractor, Drone, Harvester",          c:T.blue  },
    {id:"credit",   i:"💳",t:"Kisan Credit",    s:"Buy now, pay at harvest",             c:T.purple},
    {id:"orders",   i:"📦",t:"Mere Orders",     s:`${user.orders.length} orders • History`, c:T.gold  },
    {id:"profile",  i:"👤",t:"Mera Profile",    s:"Fasal, credit, settings",             c:T.orange},
  ];

  return(
    <div style={{padding:"16px 16px 90px"}}>
      <SH title="⚙️ Aur Suvidhaein" sub="Sari facilities ek jagah"/>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
        {hubItems.map(h=>(
          <div key={h.id} onClick={()=>setView(h.id)} style={{display:"flex",alignItems:"center",gap:14,background:T.bgCard,border:`1px solid ${T.brd}`,borderRadius:R.lg,padding:"15px 16px",cursor:"pointer"}}>
            <div style={{fontSize:32,flexShrink:0}}>{h.i}</div>
            <div style={{flex:1}}><div style={{color:T.t0,fontWeight:700,fontSize:14}}>{h.t}</div><div style={{color:T.t30,fontSize:12,marginTop:2}}>{h.s}</div></div>
            <div style={{color:h.c,fontSize:22}}>›</div>
          </div>
        ))}
      </div>
      <Card style={{background:"rgba(74,222,128,.05)",borderColor:T.brdG,textAlign:"center",padding:18}}>
        <div style={{fontSize:28,marginBottom:6}}>📞</div>
        <div style={{color:T.t0,fontWeight:700,fontSize:14}}>KrishiMitra Helpline</div>
        <div style={{color:T.gold,fontWeight:800,fontSize:20,margin:"4px 0"}}>1800-XXX-XXXX</div>
        <div style={{color:T.t30,fontSize:11}}>Mon–Sat • 9am–6pm • Hindi • Free</div>
      </Card>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
const TABS=[{id:"home",i:"🏠",l:"Home"},{id:"diagnose",i:"🔬",l:"Diagnose"},{id:"library",i:"📚",l:"Fasal"},{id:"shop",i:"🛒",l:"Shop"},{id:"mandi",i:"📊",l:"Mandi"},{id:"more",i:"⚙️",l:"More"}];

export default function App(){
  const [user,setUser]=useState(null);
  const [tab,setTab]=useState("home");
  const [diagMode,setDiagMode]=useState("disease");
  const [libCrop,setLibCrop]=useState(null);
  const [cartCount,setCartCount]=useState(0);

  const nav=(t,modeOrCrop,crop)=>{
    if(t==="diagnose"&&modeOrCrop){setDiagMode(modeOrCrop);setTab("diagnose");}
    else if(t==="library"&&modeOrCrop==="detail"&&crop){setLibCrop(crop);setTab("library");}
    else if(t==="library"){setLibCrop(null);setTab("library");}
    else if(t==="more"&&modeOrCrop){setTab("more");}
    else setTab(t);
  };

  if(!user) return <LoginScreen onLogin={(u)=>{setUser({...u,orders:[],creditUsed:0,creditLimit:0,creditStatus:"none"});setTab("home");}}/>;

  const screen=()=>{
    switch(tab){
      case "home":    return <HomeScreen user={user} setUser={setUser} nav={nav}/>;
      case "diagnose":return <DiagnoseScreen mode={diagMode} activeCrop={user.activeCrop}/>;
      case "library": return <LibraryScreen initCrop={libCrop} userCrops={user.crops}/>;
      case "shop":    return <ShopScreen user={user} setUser={setUser} activeCrop={user.activeCrop}/>;
      case "mandi":   return <MandiScreen activeCrop={user.activeCrop}/>;
      case "more":    return <MoreScreen user={user} setUser={setUser}/>;
      default:        return <HomeScreen user={user} setUser={setUser} nav={nav}/>;
    }
  };

  return(
    <div style={{width:"100%",minHeight:"100vh",maxWidth:430,margin:"0 auto",background:T.bg,fontFamily:"'Noto Sans','Noto Sans Devanagari','Segoe UI',sans-serif",position:"relative",color:T.t0}}>
      <style>{GL}</style>
      {/* Status bar */}
      <div style={{background:T.bgDeep,padding:"9px 20px 5px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{color:T.t30,fontSize:11}}>9:41</span>
        <div style={{display:"flex",gap:3,alignItems:"center"}}>{[1,2,3,4].map(i=><div key={i} style={{width:3,height:4+i*2,background:T.t30,borderRadius:1}}/>)}<span style={{color:T.t30,fontSize:11,marginLeft:5}}>🔋</span></div>
      </div>
      <div style={{paddingBottom:64}}>{screen()}</div>
      {/* Bottom nav */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:`${T.bgDeep}F8`,backdropFilter:"blur(20px)",borderTop:`1px solid ${T.brd}`,display:"flex",padding:"7px 0 10px",zIndex:100}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>nav(t.id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"3px 0",fontFamily:"inherit",position:"relative"}}>
            {t.id==="shop"&&user.orders.length>0&&<div style={{position:"absolute",top:0,right:"calc(50% - 18px)",width:14,height:14,borderRadius:"50%",background:T.orange,color:"#fff",fontSize:8,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{user.orders.length}</div>}
            <div style={{fontSize:20,filter:tab===t.id?"none":"grayscale(1) opacity(0.35)",transform:tab===t.id?"scale(1.1)":"scale(1)",transition:"all .2s"}}>{t.i}</div>
            <div style={{fontSize:9,fontWeight:700,color:tab===t.id?T.g4:T.t30}}>{t.l}</div>
            {tab===t.id&&<div style={{width:3,height:3,borderRadius:"50%",background:T.g4}}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
