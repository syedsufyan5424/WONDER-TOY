import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { Address } from '../models/Address';
import { Coupon } from '../models/Coupon';
import { Review } from '../models/Review';
import { Order } from '../models/Order';
import { Wishlist } from '../models/Wishlist';
import { Cart } from '../models/Cart';

export const categoriesData = [
  {
    "name": "Action Figures",
    "description": "Heroic action figures, super-heroes, and transforming robots for adventurous minds.",
    "image": "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=600&q=80",
    "icon": "Shield",
    "productCount": 6,
    "featured": true
  },
  {
    "name": "Educational Toys",
    "description": "Interactive STEM kits, counting toys, and early learning games for curious kids.",
    "image": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
    "icon": "GraduationCap",
    "productCount": 6,
    "featured": true
  },
  {
    "name": "Remote Control",
    "description": "High-speed RC cars, stunt vehicles, flying drones, and monster trucks.",
    "image": "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80",
    "icon": "Radio",
    "productCount": 6,
    "featured": true
  },
  {
    "name": "Dolls",
    "description": "Charming fashion dolls, baby dolls, styling sets, and accessories.",
    "image": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=600&q=80",
    "icon": "Heart",
    "productCount": 6,
    "featured": true
  },
  {
    "name": "Cars & Vehicles",
    "description": "Die-cast cars, track sets, rescue trucks, and motorized trains.",
    "image": "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=600&q=80",
    "icon": "Car",
    "productCount": 6,
    "featured": true
  },
  {
    "name": "Board Games",
    "description": "Family strategy games, classic chess, trivia, and entertaining card games.",
    "image": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80",
    "icon": "Gamepad2",
    "productCount": 6,
    "featured": true
  },
  {
    "name": "Baby Toys",
    "description": "Gentle sensory rattles, teether rings, tummy time mats, and music players.",
    "image": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",
    "icon": "Baby",
    "productCount": 6,
    "featured": true
  },
  {
    "name": "Outdoor Toys",
    "description": "Blasters, ride-on toys, scooters, sports sets, and bubble machines.",
    "image": "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=600&q=80",
    "icon": "Sun",
    "productCount": 6,
    "featured": true
  },
  {
    "name": "Puzzles",
    "description": "Jigsaw puzzles, 3D wooden brainteasers, and floor puzzle adventures.",
    "image": "https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?auto=format&fit=crop&w=600&q=80",
    "icon": "Puzzle",
    "productCount": 6,
    "featured": true
  },
  {
    "name": "STEM Toys",
    "description": "Robotics kits, solar cars, chemistry lab gear, and electronic circuit builders.",
    "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    "icon": "Cpu",
    "productCount": 6,
    "featured": true
  },
  {
    "name": "Building Blocks",
    "description": "Magnetic tiles, interlocking bricks, architectural sets, and castle builder kits.",
    "image": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=600&q=80",
    "icon": "Layers",
    "productCount": 6,
    "featured": true
  },
  {
    "name": "Arts & Crafts",
    "description": "Non-toxic modeling clay, origami sets, painting easels, and DIY bead jewelry kits.",
    "image": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
    "icon": "Palette",
    "productCount": 6,
    "featured": true
  }
];

export const productsData = [
  {
    "name": "Marvel Avengers Iron Man Mark 85 Deluxe Action Figure",
    "shortDescription": "12-inch articulated Iron Man figure with LED Arc Reactor light and repulsor accessories.",
    "description": "Suit up with Tony Stark in his pinnacle Mark 85 armor. Features 16 points of articulation, illuminating chest Arc Reactor, interchangeable nanotech hands, and blasters for dynamic superhero battle posing.",
    "SKU": "TYV-AF-001",
    "brand": "Marvel",
    "category": "Action Figures",
    "subcategory": "Superheroes",
    "price": 1799,
    "originalPrice": 2499,
    "stock": 28,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 312,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Durable Non-Toxic ABS Plastic",
    "color": "Crimson & Metallic Gold",
    "weight": "450g",
    "dimensions": "30 x 12 x 7 cm",
    "tags": [
      "iron man",
      "marvel",
      "avengers",
      "action figure",
      "superhero"
    ],
    "features": [
      "16 points of realistic articulation",
      "Illuminating LED chest Arc Reactor",
      "Detachable nanotech repulsor accessories",
      "Collectible packaging window box"
    ],
    "specifications": {
      "Height": "12 Inches",
      "Battery Type": "2x LR44 included",
      "Articulation": "16-point hinge"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Transforming Cyber Robot Warrior Mech",
    "shortDescription": "2-in-1 converting robot to sports vehicle with battle shield and blaster.",
    "description": "Convert between an agile cyberpunk mech warrior and an aerodynamic speed cruiser in 10 simple steps. Features reinforced alloy joints, metallic finish, and high-impact plastic armor.",
    "SKU": "TYV-AF-002",
    "brand": "Hasbro",
    "category": "Action Figures",
    "subcategory": "Transformers",
    "price": 1299,
    "originalPrice": 1699,
    "stock": 35,
    "lowStockThreshold": 6,
    "images": [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 184,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Polycarbonate & Metal Pivot Screws",
    "color": "Titanium Blue",
    "weight": "380g",
    "dimensions": "24 x 14 x 8 cm",
    "tags": [
      "robot",
      "transforming",
      "mech",
      "cyber",
      "action figure"
    ],
    "features": [
      "Dual conversion modes (Robot / Cruiser)",
      "Snap-fit articulation joints",
      "Includes plasma blaster and cyber shield"
    ],
    "specifications": {
      "Steps": "10-step conversion",
      "Height": "22 cm in Robot form"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Star Wars Galactic Empire Stormtrooper Commander",
    "shortDescription": "Classic Imperial Stormtrooper collectible figure with E-11 blaster rifle.",
    "description": "Enforce the Imperial order across the galaxy! This faithful 6-inch Black Series inspired Stormtrooper features glossy white composite armor, holstered blaster rifle, and museum-grade movie detailing.",
    "SKU": "TYV-AF-003",
    "brand": "Hasbro",
    "category": "Action Figures",
    "subcategory": "Star Wars",
    "price": 1499,
    "originalPrice": 1999,
    "stock": 22,
    "lowStockThreshold": 4,
    "images": [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 220,
    "ageGroup": "9-12 Years",
    "gender": "All",
    "material": "Premium Molded PVC",
    "color": "Imperial Gloss White",
    "weight": "290g",
    "dimensions": "18 x 8 x 5 cm",
    "tags": [
      "star wars",
      "stormtrooper",
      "galactic",
      "empire",
      "collectible"
    ],
    "features": [
      "Screen-accurate helmet sculpt",
      "Working thigh holster with blaster",
      "Full neck, elbow, and knee articulation"
    ],
    "specifications": {
      "Scale": "6-Inch (1:12)",
      "Material": "High-density PVC"
    },
    "isFeatured": true,
    "isBestSeller": false,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Jurassic Roaring T-Rex Dinosaur with Sound & Motion",
    "shortDescription": "Massive Tyrannosaurus Rex with push-button roaring jaw snap and lifelike skin texture.",
    "description": "Travel back 65 million years to the Cretaceous period! This apex predator features authentic roaring sound effects, snapping jaws, realistic articulated tail, and rough scaly tactile skin.",
    "SKU": "TYV-AF-004",
    "brand": "Mattel",
    "category": "Action Figures",
    "subcategory": "Dinosaurs",
    "price": 1899,
    "originalPrice": 2599,
    "stock": 19,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 410,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Flexible Textured Elastomer & ABS",
    "color": "Forest Hunter Green",
    "weight": "620g",
    "dimensions": "42 x 18 x 12 cm",
    "tags": [
      "dinosaur",
      "t-rex",
      "jurassic",
      "roaring",
      "sound toy"
    ],
    "features": [
      "Trigger-activated roaring audio",
      "Fierce chomp action jaw",
      "Textured rubbery skin realism",
      "Poseable legs and tail"
    ],
    "specifications": {
      "Sound": "High-clarity speaker",
      "Batteries": "3x AA included",
      "Length": "42 cm"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Spiderman Web-Slinging Hero Poseable Figure",
    "shortDescription": "Classic Spider-Man action figure with detachable web nets and suction-cup climber.",
    "description": "Swing into action with everyone’s favorite web-head! Includes flexible web-net accessories, sticky suction pads for window scaling, and 14 articulated joints for acrobatics.",
    "SKU": "TYV-AF-005",
    "brand": "Marvel",
    "category": "Action Figures",
    "subcategory": "Superheroes",
    "price": 999,
    "originalPrice": 1399,
    "stock": 44,
    "lowStockThreshold": 8,
    "images": [
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 156,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Non-Toxic ABS Plastic",
    "color": "Classic Red & Blue",
    "weight": "240g",
    "dimensions": "25 x 10 x 5 cm",
    "tags": [
      "spiderman",
      "marvel",
      "peter parker",
      "action figure"
    ],
    "features": [
      "14 points of bendable articulation",
      "Suction cup hands for glass climbing",
      "Translucent web projectile"
    ],
    "specifications": {
      "Height": "10 Inches",
      "Packaging": "Pegboard blister card"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Batman Dark Knight Armored Defender 12-Inch Figure",
    "shortDescription": "Gotham protector with fabric cape, grappling hook launcher, and tactical batarang.",
    "description": "Defend Gotham City against rogue villains! Decked in reinforced tactical plating, this 12-inch Dark Knight figure includes a cloth cape, spring-loaded batarang launcher, and cowl details.",
    "SKU": "TYV-AF-006",
    "brand": "DC Comics",
    "category": "Action Figures",
    "subcategory": "Superheroes",
    "price": 1399,
    "originalPrice": 1899,
    "stock": 31,
    "lowStockThreshold": 6,
    "images": [
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 204,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "High-Impact Resin & Fabric",
    "color": "Matte Charcoal & Gold Belt",
    "weight": "410g",
    "dimensions": "30 x 13 x 6 cm",
    "tags": [
      "batman",
      "dc comics",
      "dark knight",
      "action figure"
    ],
    "features": [
      "Flowing fabric cloth cape",
      "Spring-loaded launcher and 2 batarangs",
      "11 points of articulated movement"
    ],
    "specifications": {
      "Height": "12 Inches",
      "Accessories": "3 included"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Electronic Musical Piano Keyboard with Microphone",
    "shortDescription": "37-key kids recording synthesizer with drum pads, rhythm tempos, and sing-along mic.",
    "description": "Inspire early musical genius! Features 37 keys, 8 instrument voices, 8 rhythm beats, record and playback functionality, plus a real working handheld vocal microphone.",
    "SKU": "TYV-EDU-001",
    "brand": "Fisher-Price",
    "category": "Educational Toys",
    "subcategory": "Music & Sound",
    "price": 1599,
    "originalPrice": 2199,
    "stock": 26,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 388,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Smooth Rounded BPA-Free Plastic",
    "color": "Vibrant Teal & Coral",
    "weight": "980g",
    "dimensions": "48 x 20 x 8 cm",
    "tags": [
      "piano",
      "musical toy",
      "keyboard",
      "microphone",
      "early learning"
    ],
    "features": [
      "37 tactile keys with responsive tone",
      "Handheld sing-along karaoke microphone",
      "Record and playback studio button",
      "Headphone jack for quiet practice"
    ],
    "specifications": {
      "Keys": 37,
      "Tones": 8,
      "Power Supply": "4x AA or USB 5V cable"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Junior Medical Clinic Doctor Suitcase Set",
    "shortDescription": "15-piece pretend medical station with working electronic stethoscope and thermometer.",
    "description": "Nurture empathy and curiosity with this doctor kit. Features a heartbeat sound stethoscope, LED otoscope, oral mirror, reflex hammer, bandages, and an organized travel carry case.",
    "SKU": "TYV-EDU-002",
    "brand": "Melissa & Doug",
    "category": "Educational Toys",
    "subcategory": "Pretend Play",
    "price": 899,
    "originalPrice": 1299,
    "stock": 40,
    "lowStockThreshold": 8,
    "images": [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 275,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Non-Toxic Food Grade ABS",
    "color": "Doctor Sky Blue",
    "weight": "550g",
    "dimensions": "28 x 22 x 10 cm",
    "tags": [
      "doctor set",
      "pretend play",
      "educational",
      "stethoscope"
    ],
    "features": [
      "Stethoscope plays authentic heartbeat sound",
      "Glowing LED examination otoscope",
      "Locking snap carry case with handle"
    ],
    "specifications": {
      "Pieces": 15,
      "Case": "Hardshell Portable"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Interactive Talking Alphabet & Phonics Learning Pad",
    "shortDescription": "Touch and learn bilingual phonetic tablet with word games and animal sounds.",
    "description": "An interactive early literacy tablet that introduces letter sounds, sight words, spelling quizzes, and catchy musical tunes through sensitive soft-touch buttons and clear audio.",
    "SKU": "TYV-EDU-003",
    "brand": "LeapFrog",
    "category": "Educational Toys",
    "subcategory": "Electronic Learning",
    "price": 1199,
    "originalPrice": 1599,
    "stock": 33,
    "lowStockThreshold": 6,
    "images": [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 215,
    "ageGroup": "0-2 Years",
    "gender": "All",
    "material": "Shatterproof Rubberized Enclosure",
    "color": "Apple Green",
    "weight": "340g",
    "dimensions": "24 x 18 x 3 cm",
    "tags": [
      "phonics",
      "alphabet",
      "learning pad",
      "interactive tablet"
    ],
    "features": [
      "A-Z phonetic pronunciation guide",
      "6 engaging interactive learning modes",
      "Volume control with auto power-off"
    ],
    "specifications": {
      "Languages": "English & Hindi",
      "Screen": "Touch Membrane"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Montessori Wooden Math Abacus & Counting Frame",
    "shortDescription": "Traditional 10-row solid beechwood calculation frame with 100 vibrant beads.",
    "description": "Teach addition, subtraction, and base-ten logic the tactile way! Constructed from sustainable beechwood with water-based non-toxic paints and stainless steel slide wires.",
    "SKU": "TYV-EDU-004",
    "brand": "Funskool",
    "category": "Educational Toys",
    "subcategory": "Math & Logic",
    "price": 699,
    "originalPrice": 999,
    "stock": 45,
    "lowStockThreshold": 10,
    "images": [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 310,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Natural Solid Beechwood",
    "color": "Rainbow Assorted Beads",
    "weight": "620g",
    "dimensions": "31 x 26 x 7 cm",
    "tags": [
      "abacus",
      "montessori",
      "math toy",
      "wooden toy",
      "counting"
    ],
    "features": [
      "100 smooth gliding painted wooden beads",
      "Reinforced stainless steel guide wires",
      "Eco-friendly water-based child-safe paint"
    ],
    "specifications": {
      "Rows": 10,
      "Beads": 100,
      "Certification": "EN71 Safe"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Little Chef Gourmet Pretend Kitchen Cooking Station",
    "shortDescription": "All-inclusive play cookware set with sizzle sound pan, vegetables, and chef apron.",
    "description": "Cook up culinary wonders! Includes stainless cookware, cuttable hook-and-loop fruits and veggies, chef hat, apron, and a portable tabletop cooking burner with lights and sounds.",
    "SKU": "TYV-EDU-005",
    "brand": "Melissa & Doug",
    "category": "Educational Toys",
    "subcategory": "Pretend Play",
    "price": 1499,
    "originalPrice": 2099,
    "stock": 20,
    "lowStockThreshold": 4,
    "images": [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 168,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Stainless Steel & BPA-Free Polymer",
    "color": "Stainless & Multi-Veggie",
    "weight": "890g",
    "dimensions": "36 x 28 x 14 cm",
    "tags": [
      "kitchen toy",
      "pretend cooking",
      "chef set",
      "fruits and vegetables"
    ],
    "features": [
      "Cuttable veggies make realistic crunch sound",
      "Realistic miniature stainless steel pots",
      "Includes cotton chef apron and hat"
    ],
    "specifications": {
      "Total Accessories": 28,
      "Burner": "Sound & LED active"
    },
    "isFeatured": true,
    "isBestSeller": false,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Smart Piggy Bank Coin Counter with Digital Screen",
    "shortDescription": "Electronic financial savings ATM bank that recognizes coin denominations automatically.",
    "description": "Promote healthy financial habits! This digital coin jar tallies Indian currency, features a high-definition LCD deposit total, and includes a PIN-protected motorized bill feeder.",
    "SKU": "TYV-EDU-006",
    "brand": "Fisher-Price",
    "category": "Educational Toys",
    "subcategory": "Math & Logic",
    "price": 849,
    "originalPrice": 1199,
    "stock": 37,
    "lowStockThreshold": 7,
    "images": [
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80",
    "rating": 4.6,
    "reviewCount": 142,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Tough Shatterproof Acrylic & ABS",
    "color": "Neon Pink & White",
    "weight": "430g",
    "dimensions": "19 x 13 x 12 cm",
    "tags": [
      "piggy bank",
      "coin bank",
      "atm",
      "savings",
      "educational"
    ],
    "features": [
      "Automated coin slot reader",
      "LCD total balance calculator",
      "Motorized paper currency feeder"
    ],
    "specifications": {
      "Screen": "Backlit LCD",
      "Batteries": "3x AA required"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "High-Speed 4WD Off-Road Desert Buggy RC Racer",
    "shortDescription": "Pro 2.4GHz 4WD buggy with metal oil shocks, waterproof chassis, and 35 km/h motor.",
    "description": "Tackle sand, gravel, and mud with unstoppable power. Powered by a high-torque 390 brush motor, all-metal differentials, oil-filled coil shocks, and responsive 2.4GHz proportional steering.",
    "SKU": "TYV-RC-001",
    "brand": "Hot Wheels",
    "category": "Remote Control",
    "subcategory": "RC Cars",
    "price": 2499,
    "originalPrice": 3499,
    "stock": 21,
    "lowStockThreshold": 4,
    "images": [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 420,
    "ageGroup": "9-12 Years",
    "gender": "All",
    "material": "Aluminum Alloy & High-Flex Nylon",
    "color": "Speed Crimson & Carbon",
    "weight": "1150g",
    "dimensions": "34 x 22 x 14 cm",
    "tags": [
      "rc car",
      "buggy",
      "4wd",
      "off-road",
      "hot wheels",
      "fast"
    ],
    "features": [
      "Top speed over 35 km/h",
      "Full proportional throttle and steering",
      "IPX4 splashproof electronics",
      "Twin rechargeable 1500mAh Li-ion battery packs"
    ],
    "specifications": {
      "Scale": "1:14",
      "Drive": "4WD Shaft Driven",
      "Range": "80 Meters"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Police Patrol RC Cruiser with Flashing Siren & Lights",
    "shortDescription": "City interceptor RC police car with realistic flashing lightbar and authentic sirens.",
    "description": "Sirens blaring, headlights blazing! This city police cruiser features full-function radio controls, rubber low-profile tires, working headlights, and loud authentic emergency sirens.",
    "SKU": "TYV-RC-002",
    "brand": "Maisto",
    "category": "Remote Control",
    "subcategory": "RC Cars",
    "price": 1399,
    "originalPrice": 1899,
    "stock": 29,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 198,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "High-Impact ABS Plastic",
    "color": "Interceptor Black & White",
    "weight": "640g",
    "dimensions": "29 x 13 x 10 cm",
    "tags": [
      "police car",
      "rc police",
      "siren",
      "emergency vehicle"
    ],
    "features": [
      "Dual-color flashing roof lightbar",
      "Real police siren sound module",
      "Full-direction forward/reverse/turn controls"
    ],
    "specifications": {
      "Scale": "1:16",
      "Battery": "USB Rechargeable 6V"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Sky Hawk Altitude Hold HD Camera RC Drone",
    "shortDescription": "Foldable quadcopter drone with 1080p camera, headless mode, and 1-key take-off.",
    "description": "Soar through skies and capture aerial memories! Features optical flow positioning, altitude hold, headless steering, 360-degree aerial stunts, and real-time WiFi smartphone video streaming.",
    "SKU": "TYV-RC-003",
    "brand": "Syma",
    "category": "Remote Control",
    "subcategory": "Drones",
    "price": 2999,
    "originalPrice": 3999,
    "stock": 16,
    "lowStockThreshold": 3,
    "images": [
      "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 310,
    "ageGroup": "12+ Years",
    "gender": "All",
    "material": "Ultra-Lightweight Carbon Fiber & ABS",
    "color": "Stealth Matte Black",
    "weight": "185g",
    "dimensions": "22 x 18 x 5 cm",
    "tags": [
      "drone",
      "rc quadcopter",
      "hd camera",
      "altitude hold",
      "syma"
    ],
    "features": [
      "1080p HD wide-angle camera",
      "1-Key automated takeoff and return",
      "Optical flow stability sensors",
      "Modular quick-swap battery"
    ],
    "specifications": {
      "Camera": "1080p FHD",
      "FlightTime": "15 Minutes",
      "Range": "100m"
    },
    "isFeatured": true,
    "isBestSeller": false,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Interactive Smart Robotic Puppy Dog with Voice Control",
    "shortDescription": "Barks, walks, wags tail, and dances to music with touch sensor and remote bone.",
    "description": "The ultimate robotic pet with zero mess! Responds to hand claps, touch on the chin, voice commands, and remote bone controller. Walks, dances, rolls over, and displays LED eye expressions.",
    "SKU": "TYV-RC-004",
    "brand": "WowWee",
    "category": "Remote Control",
    "subcategory": "Robotics",
    "price": 1999,
    "originalPrice": 2699,
    "stock": 24,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 260,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Smooth Child-Safe Gloss Polymer",
    "color": "Snow White & Aqua Accent",
    "weight": "720g",
    "dimensions": "26 x 20 x 16 cm",
    "tags": [
      "robot dog",
      "smart pet",
      "interactive toy",
      "puppy"
    ],
    "features": [
      "Touch sensitive chin and head sensors",
      "Expressive animated LED eyes",
      "Plays songs and performs acrobatics"
    ],
    "specifications": {
      "Actions": "12 preprogrammed tricks",
      "Battery": "USB 3.7V Li-ion"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Dual Rotor Gyro Military RC Helicopter",
    "shortDescription": "Built-in precision gyro flight stabilizer with alloy frame and searchlight.",
    "description": "Master indoor piloting with ease! Features a co-axial twin rotor system, electronic gyroscope for rock-solid hovering, alloy crash-resistant skeleton, and an illuminating nose searchlight.",
    "SKU": "TYV-RC-005",
    "brand": "Syma",
    "category": "Remote Control",
    "subcategory": "Helicopters",
    "price": 1499,
    "originalPrice": 1999,
    "stock": 22,
    "lowStockThreshold": 4,
    "images": [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 175,
    "ageGroup": "9-12 Years",
    "gender": "All",
    "material": "Crash-Proof Aircraft Alloy & ABS",
    "color": "Military Gunmetal Gray",
    "weight": "320g",
    "dimensions": "28 x 15 x 6 cm",
    "tags": [
      "rc helicopter",
      "gyro",
      "military",
      "flying toy"
    ],
    "features": [
      "Precision built-in gyro stabilizer",
      "Anti-collision alloy fuselage body",
      "Bright LED landing searchlight"
    ],
    "specifications": {
      "Channels": "3.5 Channel 2.4GHz",
      "FlightTime": "10 mins"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Wall-Climbing Zero-Gravity 360 Stunt RC Car",
    "shortDescription": "Aerodynamic vacuum suction car that drives on floors, walls, and glass windows.",
    "description": "Defy gravity! Advanced vacuum suction technology allows this miniature stunt speedster to cling to vertical walls, mirrors, and ceilings, spinning 360 degrees without falling.",
    "SKU": "TYV-RC-006",
    "brand": "Hot Wheels",
    "category": "Remote Control",
    "subcategory": "RC Cars",
    "price": 1199,
    "originalPrice": 1699,
    "stock": 38,
    "lowStockThreshold": 7,
    "images": [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    "rating": 4.6,
    "reviewCount": 290,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Ultralight Impact Composite",
    "color": "Electric Neon Blue",
    "weight": "210g",
    "dimensions": "15 x 8 x 5 cm",
    "tags": [
      "wall climbing",
      "rc car",
      "hot wheels",
      "gravity defying",
      "stunt"
    ],
    "features": [
      "Dual mode: Floor driving and zero-gravity Wall mode",
      "Rotates 360 degrees on wall without falling",
      "LED front headlights and tail indicators"
    ],
    "specifications": {
      "Technology": "Aerodynamic Vacuum Suction",
      "Battery": "USB Li-Po rechargeable"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Barbie Dreamtopia Rainbow Princess Styling Doll",
    "shortDescription": "12-inch Barbie with brushable pastel hair, shimmering ombre gown, and royal tiara.",
    "description": "Step into a world of fairytale dreams! Features extra-long multi-colored brushable hair, shimmering rainbow ombre ballgown, detachable royal tiara, hair clips, and styling brush.",
    "SKU": "TYV-DOL-001",
    "brand": "Barbie",
    "category": "Dolls",
    "subcategory": "Fashion Dolls",
    "price": 1199,
    "originalPrice": 1599,
    "stock": 42,
    "lowStockThreshold": 8,
    "images": [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 520,
    "ageGroup": "3-5 Years",
    "gender": "Girls",
    "material": "Silky Synthetic Hair & High-Grade Vinyl",
    "color": "Rainbow Ombre & Pink",
    "weight": "320g",
    "dimensions": "30 x 10 x 5 cm",
    "tags": [
      "barbie",
      "princess",
      "fashion doll",
      "styling doll",
      "dolls"
    ],
    "features": [
      "Extra-long brushable pastel hair",
      "Removable shimmering rainbow ballgown",
      "Includes tiara, brush, and accessories"
    ],
    "specifications": {
      "Height": "12 Inches",
      "Accessories": "6 hair pieces"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Royal Victorian 3-Story Wooden Dollhouse & Furniture",
    "shortDescription": "Grand 3-floor dollhouse with 5 furnished rooms, balcony, and elevator.",
    "description": "A lavish mansion for doll adventures! Standing 3 feet tall, this wooden dollhouse includes 15 hand-painted furniture pieces, a gliding elevator, rooftop patio, and working front door.",
    "SKU": "TYV-DOL-002",
    "brand": "KidKraft",
    "category": "Dolls",
    "subcategory": "Dollhouses",
    "price": 3499,
    "originalPrice": 4999,
    "stock": 14,
    "lowStockThreshold": 3,
    "images": [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 380,
    "ageGroup": "3-5 Years",
    "gender": "Girls",
    "material": "Natural MDF Wood & Non-Toxic Paint",
    "color": "Rose Pink & White Trim",
    "weight": "4500g",
    "dimensions": "90 x 60 x 30 cm",
    "tags": [
      "dollhouse",
      "wooden toy",
      "furniture",
      "princess mansion"
    ],
    "features": [
      "3 expansive floors with 5 themed rooms",
      "15 wooden furniture pieces included",
      "Manual gliding doll elevator"
    ],
    "specifications": {
      "Height": "90 cm",
      "Fits": "Dolls up to 12 inches"
    },
    "isFeatured": true,
    "isBestSeller": false,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Baby Alive Sweet Spoonfuls Interactive Baby Doll",
    "shortDescription": "Baby doll that eats pretend food, drinks from bottle, and wets diaper.",
    "description": "Experience real parenting roleplay! Mix doll food in the included blender, feed with the special spoon, give water from her bottle, and gently change her diaper when she pees.",
    "SKU": "TYV-DOL-003",
    "brand": "Hasbro",
    "category": "Dolls",
    "subcategory": "Baby Dolls",
    "price": 1699,
    "originalPrice": 2299,
    "stock": 25,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 295,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Soft Flexible Vinyl",
    "color": "Floral Romper",
    "weight": "680g",
    "dimensions": "35 x 16 x 10 cm",
    "tags": [
      "baby alive",
      "baby doll",
      "nurturing",
      "diaper doll"
    ],
    "features": [
      "Working manual food blender mixer",
      "Drinks water and wets diaper",
      "Soft brushable baby hair and outfit"
    ],
    "specifications": {
      "Height": "14 Inches",
      "Accessories": "Blender, 2 food packets, diaper"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Barbie Glamorous Fashionista Closet with Wardrobe Outfits",
    "shortDescription": "Portable folding closet suitcase with hangers, 3 full outfits, shoes, and jewelry.",
    "description": "Fashion on the go! Open the translucent pink doors to reveal racks, shelves, full-length mirror, 6 hangers, 3 stylish dresses, designer handbags, and trendy footwear pairs.",
    "SKU": "TYV-DOL-004",
    "brand": "Barbie",
    "category": "Dolls",
    "subcategory": "Accessories",
    "price": 1399,
    "originalPrice": 1899,
    "stock": 32,
    "lowStockThreshold": 6,
    "images": [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 210,
    "ageGroup": "6-8 Years",
    "gender": "Girls",
    "material": "Reinforced Molded Polypropylene",
    "color": "Barbie Signature Pink",
    "weight": "820g",
    "dimensions": "32 x 26 x 8 cm",
    "tags": [
      "barbie closet",
      "wardrobe",
      "fashion outfits",
      "shoes"
    ],
    "features": [
      "Fold-and-go carry handle design",
      "Includes 3 dresses, 3 shoe pairs, and 2 necklaces",
      "6 functioning clothes hangers"
    ],
    "specifications": {
      "Compartments": "8 shelves & 1 rack",
      "Portability": "Integrated handle"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Disney Frozen Elsa Musical Singing Snow Queen Doll",
    "shortDescription": "Elsa sings \"Let It Go\" with illuminated bodice lights and glittering cape.",
    "description": "Sing your heart out with Queen Elsa! Press the snowflake button on her icy blue bodice to hear an authentic crystal-clear rendition of \"Let It Go\" while her gown lights up with shimmering snowflake glows.",
    "SKU": "TYV-DOL-005",
    "brand": "Disney",
    "category": "Dolls",
    "subcategory": "Singing Dolls",
    "price": 1599,
    "originalPrice": 2199,
    "stock": 30,
    "lowStockThreshold": 6,
    "images": [
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 450,
    "ageGroup": "3-5 Years",
    "gender": "Girls",
    "material": "Vinyl & Shimmer Sheer Organza",
    "color": "Icy Blue & Frost Silver",
    "weight": "390g",
    "dimensions": "32 x 12 x 6 cm",
    "tags": [
      "elsa",
      "frozen",
      "disney",
      "singing doll",
      "let it go"
    ],
    "features": [
      "Sings full 30-second chorus of \"Let It Go\"",
      "Illuminating LED snowflake gown lights",
      "Braided platinum blonde hair"
    ],
    "specifications": {
      "Batteries": "3x AAA included",
      "Height": "12 Inches"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "My First Soft Cuddle Baby Doll with Blanket",
    "shortDescription": "Ultra-gentle plush baby doll with embroidered eyes and cozy satin trim blanket.",
    "description": "The sweetest first companion for infants and toddlers. Has an ultra-soft huggable plush body, embroidered face features for 100% infant safety, and a machine-washable snuggle blanket.",
    "SKU": "TYV-DOL-006",
    "brand": "Fisher-Price",
    "category": "Dolls",
    "subcategory": "Baby Dolls",
    "price": 699,
    "originalPrice": 999,
    "stock": 48,
    "lowStockThreshold": 9,
    "images": [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 160,
    "ageGroup": "0-2 Years",
    "gender": "All",
    "material": "Hypoallergenic Velboa Fleece",
    "color": "Pastel Peach & Lavender",
    "weight": "190g",
    "dimensions": "28 x 14 x 8 cm",
    "tags": [
      "soft doll",
      "first doll",
      "baby safe",
      "plush doll"
    ],
    "features": [
      "100% embroidered baby-safe features",
      "Machine washable fabric",
      "Includes soft satin-trimmed swaddle blanket"
    ],
    "specifications": {
      "Safety": "0+ Months Certified",
      "Washable": "Machine gentle cycle"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Hot Wheels 10-Car Collector Die-Cast Mega Pack",
    "shortDescription": "1:64 scale authentic die-cast racing cars, hot rods, and exotics pack.",
    "description": "Instant car collection! Packed with 10 legendary 1:64 scale vehicles featuring realistic decos, metallic finishes, and fast-rolling wheels engineered for Hot Wheels track loops.",
    "SKU": "TYV-CAR-001",
    "brand": "Hot Wheels",
    "category": "Cars & Vehicles",
    "subcategory": "Die-Cast Cars",
    "price": 1199,
    "originalPrice": 1599,
    "stock": 40,
    "lowStockThreshold": 8,
    "images": [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 610,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Die-Cast Zinc Metal Alloy",
    "color": "Assorted Metallic Colors",
    "weight": "520g",
    "dimensions": "28 x 19 x 4 cm",
    "tags": [
      "hot wheels",
      "die-cast",
      "toy cars",
      "collector pack"
    ],
    "features": [
      "10 completely unique car castings",
      "Compatible with all Hot Wheels tracks",
      "Authentic detailed racing decos"
    ],
    "specifications": {
      "Scale": "1:64",
      "Count": 10,
      "Body": "Die-cast metal"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Electric High-Speed Bullet Train with Light & Tracks",
    "shortDescription": "Motorized aerodynamic locomotive with 3 passenger carriages and circular track oval.",
    "description": "All aboard the bullet express! Features a motorized locomotive with bright forward headlight, authentic railway station sounds, magnetic carriages, and 16 snap-together track pieces.",
    "SKU": "TYV-CAR-002",
    "brand": "Funskool",
    "category": "Cars & Vehicles",
    "subcategory": "Trains",
    "price": 1399,
    "originalPrice": 1899,
    "stock": 28,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1582845512747-e42001c95638?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1582845512747-e42001c95638?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 280,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Shock-Resistant Polymer",
    "color": "Bullet White & Crimson Stripe",
    "weight": "840g",
    "dimensions": "65 x 45 x 6 cm (assembled)",
    "tags": [
      "train set",
      "bullet train",
      "railway track",
      "motorized train"
    ],
    "features": [
      "Motorized electric locomotive engine",
      "LED front train light and sound chimes",
      "Magnetic carriage coupling connectors"
    ],
    "specifications": {
      "TrackLength": "240 cm oval",
      "Batteries": "2x AA required"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Monster Jam Grave Digger Heavy Duty Monster Truck",
    "shortDescription": "1:24 scale official monster truck with massive BKT rubber tires and working suspension.",
    "description": "Crush the competition with Grave Digger! Features official Monster Jam graphics, oversized deep-tread tires, and functional shocks that bounce over any obstacle.",
    "SKU": "TYV-CAR-003",
    "brand": "Spin Master",
    "category": "Cars & Vehicles",
    "subcategory": "Trucks",
    "price": 999,
    "originalPrice": 1399,
    "stock": 35,
    "lowStockThreshold": 7,
    "images": [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 195,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Cast Metal & Heavy Rubber",
    "color": "Neon Green & Purple Flame",
    "weight": "620g",
    "dimensions": "20 x 14 x 13 cm",
    "tags": [
      "monster truck",
      "grave digger",
      "monster jam",
      "big wheels"
    ],
    "features": [
      "Authentic 1:24 scale replica styling",
      "BKT oversized rubber off-road tires",
      "Functional spring shock suspension"
    ],
    "specifications": {
      "Scale": "1:24",
      "Tires": "BKT licensed"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Die-Cast City Emergency Rescue Fire Engine & Ladder",
    "shortDescription": "Extendable 360-degree rotating ladder fire truck with pump hose and sirens.",
    "description": "Rush to the rescue! This heavy-duty metal fire engine features a rotating 2-stage ladder that extends to 18 inches, realistic emergency sirens, flashing lights, and opening equipment doors.",
    "SKU": "TYV-CAR-004",
    "brand": "Tonka",
    "category": "Cars & Vehicles",
    "subcategory": "Emergency Vehicles",
    "price": 1299,
    "originalPrice": 1799,
    "stock": 24,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 165,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Die-Cast Metal Cab & Tough ABS",
    "color": "Rescue Engine Red",
    "weight": "710g",
    "dimensions": "28 x 14 x 9 cm",
    "tags": [
      "fire truck",
      "emergency",
      "die-cast",
      "rescue ladder"
    ],
    "features": [
      "360-degree rotating extendable ladder",
      "Flashing emergency beacons and dual sirens",
      "Friction powered push-and-go motor"
    ],
    "specifications": {
      "LadderExtension": "45 cm",
      "Sound": "Emergency siren module"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Super Highway Multilevel Car Parking Garage Track Set",
    "shortDescription": "4-level spiral parking tower with manual spiral car lift, helipad, and 4 die-cast cars.",
    "description": "Park, service, and race! Features 4 stories of parking bays, hand-crank spiral elevator, car wash station, gas pump, helicopter landing pad, and twin spiraling launch ramps.",
    "SKU": "TYV-CAR-005",
    "brand": "Hot Wheels",
    "category": "Cars & Vehicles",
    "subcategory": "Track Sets",
    "price": 1899,
    "originalPrice": 2599,
    "stock": 18,
    "lowStockThreshold": 4,
    "images": [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 320,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Reinforced Shatterproof Plastic",
    "color": "Multi-Color Racing Theme",
    "weight": "1450g",
    "dimensions": "55 x 40 x 35 cm",
    "tags": [
      "parking garage",
      "track set",
      "hot wheels",
      "cars"
    ],
    "features": [
      "Hand-crank continuous spiral car lift",
      "Spiral downward racing escape ramps",
      "Includes 4 bonus metal die-cast cars"
    ],
    "specifications": {
      "Levels": 4,
      "IncludedVehicles": 4
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Speed Racing Superbike Die-Cast Miniature Motorcycle",
    "shortDescription": "1:12 scale authentic racing motorbike with steerable handlebar and spring kickstand.",
    "description": "Feel the roar of the racetrack! Features authentic racing livery, turning handlebars, free-spinning soft rubber tires, working rear spring suspension, and a fold-out kickstand.",
    "SKU": "TYV-CAR-006",
    "brand": "Maisto",
    "category": "Cars & Vehicles",
    "subcategory": "Motorcycles",
    "price": 749,
    "originalPrice": 999,
    "stock": 33,
    "lowStockThreshold": 6,
    "images": [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 140,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Die-Cast Metal & Synthetic Rubber",
    "color": "Superbike Racing Green",
    "weight": "280g",
    "dimensions": "17 x 9 x 6 cm",
    "tags": [
      "superbike",
      "motorcycle",
      "die-cast",
      "racing bike"
    ],
    "features": [
      "Working rear monoshock suspension",
      "Steerable front fork handlebars",
      "Fold-out metallic kickstand"
    ],
    "specifications": {
      "Scale": "1:12",
      "Stand": "Foldable metal"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Monopoly Classic Fast-Dealing Property Board Game",
    "shortDescription": "The world’s favorite family trading board game with die-cast tokens and play cash.",
    "description": "Buy, sell, and scheme your way to riches! The quintessential property trading game features the iconic green houses, red hotels, Community Chest cards, and 8 classic metal playing tokens.",
    "SKU": "TYV-BG-001",
    "brand": "Hasbro",
    "category": "Board Games",
    "subcategory": "Family Games",
    "price": 899,
    "originalPrice": 1199,
    "stock": 50,
    "lowStockThreshold": 10,
    "images": [
      "https://images.unsplash.com/photo-1585504198199-20277593b94f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1585504198199-20277593b94f?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 780,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Premium Heavyweight Cardstock & Pewter Tokens",
    "color": "Classic Green Gameboard",
    "weight": "890g",
    "dimensions": "40 x 27 x 5 cm",
    "tags": [
      "monopoly",
      "board game",
      "hasbro",
      "family game",
      "property trading"
    ],
    "features": [
      "8 classic metal collector tokens",
      "Heavy quad-fold laminated gameboard",
      "Full stack of color-coded Monopoly money"
    ],
    "specifications": {
      "Players": "2 to 6 Players",
      "Playtime": "60-90 Mins"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Tournament Wooden Chess & Checkers Dual Folding Set",
    "shortDescription": "Handcrafted Sheesham wood folding board with felted magnetic weighted chess pieces.",
    "description": "Grandmaster quality at home! This 14-inch folding wooden set features hand-carved Staunton chess pieces with weighted bases, velvet storage slots, and 24 polished wooden checkers tokens.",
    "SKU": "TYV-BG-002",
    "brand": "Funskool",
    "category": "Board Games",
    "subcategory": "Strategy Games",
    "price": 1299,
    "originalPrice": 1799,
    "stock": 32,
    "lowStockThreshold": 6,
    "images": [
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 420,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Natural Sheesham & Boxwood",
    "color": "Natural Wood & Dark Walnut",
    "weight": "1100g",
    "dimensions": "35 x 35 x 4 cm",
    "tags": [
      "chess",
      "checkers",
      "wooden chess",
      "brain game",
      "strategy"
    ],
    "features": [
      "Handcrafted Staunton chessmen pieces",
      "Felted scratch-resistant bottom pads",
      "Interior velvet storage compartment"
    ],
    "specifications": {
      "BoardSize": "14 x 14 Inches",
      "KingHeight": "3 Inches"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Scrabble Original Crossword Word Strategy Game",
    "shortDescription": "Every word counts! Classic letter tile crossword game with letter bag and tile racks.",
    "description": "Expand vocabulary and outsmart opponents with premium wooden-letter tiles. Place words on the 15x15 grid, targeting Double and Triple Word score squares for high-scoring victory.",
    "SKU": "TYV-BG-003",
    "brand": "Mattel",
    "category": "Board Games",
    "subcategory": "Word Games",
    "price": 799,
    "originalPrice": 1099,
    "stock": 45,
    "lowStockThreshold": 8,
    "images": [
      "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 350,
    "ageGroup": "9-12 Years",
    "gender": "All",
    "material": "Solid Polymer Tiles & Durable Board",
    "color": "Classic Scrabble Green",
    "weight": "620g",
    "dimensions": "37 x 27 x 4 cm",
    "tags": [
      "scrabble",
      "word game",
      "crossword",
      "vocabulary",
      "mattel"
    ],
    "features": [
      "100 engraved letter tiles",
      "4 sturdy letter tile player racks",
      "Includes drawstring fabric tile storage pouch"
    ],
    "specifications": {
      "Players": "2 to 4 Players",
      "Age": "10+ Years"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Deluxe Double-Six Solid Dominoes Set with Wooden Case",
    "shortDescription": "28 heavy crystalline jumbo dominoes with brass spinners and sliding lid timber box.",
    "description": "A timeless classic. These tournament-grade double-six domino tiles feature smooth rounded corners, black recessed dots, and central brass pivot spinners for effortless mixing.",
    "SKU": "TYV-BG-004",
    "brand": "Hasbro",
    "category": "Board Games",
    "subcategory": "Classic Games",
    "price": 649,
    "originalPrice": 899,
    "stock": 36,
    "lowStockThreshold": 7,
    "images": [
      "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 180,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Dense Urea-Formaldehyde Resin & Solid Wood",
    "color": "Ivory White Tiles in Walnut Box",
    "weight": "580g",
    "dimensions": "20 x 12 x 5 cm",
    "tags": [
      "dominoes",
      "classic games",
      "wooden box",
      "tile game"
    ],
    "features": [
      "28 jumbo-sized crystalline domino tiles",
      "Central brass spinner rivets for quick shuffling",
      "Solid stained timber box with slide lid"
    ],
    "specifications": {
      "TileCount": 28,
      "Size": "5 x 2.5 x 1 cm"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Classic Ludo & Snakes and Ladders 2-in-1 Board Game",
    "shortDescription": "Reversible extra-thick wooden gameboard with colorful pawns and dice shaker cup.",
    "description": "Double the laughter! One side features high-stakes Snakes and Ladders, while the flip side presents the competitive Indian classic Ludo. Built on thick solid board that won’t warp.",
    "SKU": "TYV-BG-005",
    "brand": "Funskool",
    "category": "Board Games",
    "subcategory": "Family Games",
    "price": 499,
    "originalPrice": 699,
    "stock": 60,
    "lowStockThreshold": 12,
    "images": [
      "https://images.unsplash.com/photo-1563941402622-4e7a488bcc57?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1563941402622-4e7a488bcc57?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 510,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "High-Density Rigid Wood & Plastic Pawns",
    "color": "Multi-Color Illustrated",
    "weight": "480g",
    "dimensions": "35 x 35 x 1 cm",
    "tags": [
      "ludo",
      "snakes and ladders",
      "indian games",
      "family game"
    ],
    "features": [
      "Double-sided 2-in-1 reversible board",
      "16 bright wooden player pawns",
      "Included dice shaker cup"
    ],
    "specifications": {
      "Players": "2 to 4 Players",
      "Reversible": true
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Catan Adventure Island Resource Strategy Board Game",
    "shortDescription": "The award-winning game of trading, building, and settling the uncharted island of Catan.",
    "description": "Harvest timber, mine ore, pasture sheep, and build roads and settlements across modular hexagonal tiles. The modern masterpiece of strategic bartering and resource management.",
    "SKU": "TYV-BG-006",
    "brand": "Asmodee",
    "category": "Board Games",
    "subcategory": "Strategy Games",
    "price": 2499,
    "originalPrice": 3299,
    "stock": 20,
    "lowStockThreshold": 4,
    "images": [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 650,
    "ageGroup": "9-12 Years",
    "gender": "All",
    "material": "Heavy Linen-Finish Cardstock & Wood",
    "color": "Island Hexagons & Wooden Pieces",
    "weight": "1250g",
    "dimensions": "30 x 30 x 8 cm",
    "tags": [
      "catan",
      "settlers of catan",
      "strategy game",
      "asmodee"
    ],
    "features": [
      "19 modular hexagonal terrain tiles",
      "95 resource and development cards",
      "16 wooden settlements, 16 cities, and 60 roads"
    ],
    "specifications": {
      "Players": "3 to 4 Players",
      "Playtime": "60-75 Mins"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Super Soft Fluffy Brown Teddy Bear Plush Companion",
    "shortDescription": "18-inch ultra-huggable premium plush teddy with velvety soft fur and satin neck ribbon.",
    "description": "A lifelong cuddle buddy! Stuffed with hypoallergenic cloud-soft filling, featuring velvety mocha fur, locked safety eyes, and a hand-tied satin ribbon for peaceful sleeping.",
    "SKU": "TYV-BABY-001",
    "brand": "Steiff",
    "category": "Baby Toys",
    "subcategory": "Plush Toys",
    "price": 899,
    "originalPrice": 1299,
    "stock": 55,
    "lowStockThreshold": 10,
    "images": [
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 480,
    "ageGroup": "0-2 Years",
    "gender": "All",
    "material": "Ultra-Soft Hypoallergenic Plush & Polyfill",
    "color": "Mocha Brown",
    "weight": "380g",
    "dimensions": "45 x 28 x 20 cm",
    "tags": [
      "teddy bear",
      "plush",
      "stuffed animal",
      "baby soft toy",
      "cuddle"
    ],
    "features": [
      "100% hypoallergenic cloud fiber stuffing",
      "Locked baby-safe nose and eyes",
      "Machine washable on delicate cycle"
    ],
    "specifications": {
      "Height": "18 Inches (45 cm)",
      "Washable": true
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Kick & Play Deluxe Piano Musical Baby Gym Mat",
    "shortDescription": "4-stage sensory activity playmat with kick piano, overhead arches, and 5 toys.",
    "description": "Grows with baby from lay-and-play to tummy time and sit-up discovery! Features 5 light-up piano keys that play music when baby kicks, overhead linkable toys, and a self-discovery mirror.",
    "SKU": "TYV-BABY-002",
    "brand": "Fisher-Price",
    "category": "Baby Toys",
    "subcategory": "Activity Gyms",
    "price": 1999,
    "originalPrice": 2799,
    "stock": 22,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 520,
    "ageGroup": "0-2 Years",
    "gender": "All",
    "material": "Cushioned Breathable Machine-Washable Fabric",
    "color": "Bright Animal Safari",
    "weight": "1250g",
    "dimensions": "86 x 68 x 45 cm",
    "tags": [
      "baby gym",
      "kick piano",
      "playmat",
      "sensory toy",
      "fisher-price"
    ],
    "features": [
      "Kick-activated light-up piano keys",
      "5 repositionable sensory toys including mirror and teether",
      "Removable piano for take-along toddler play"
    ],
    "specifications": {
      "Modes": "4 Stages of Growth",
      "Batteries": "3x AA included"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "BPA-Free Silicone Sensory Teether & Rattle Ring Set",
    "shortDescription": "Set of 4 cooling textured food-grade silicone teethers and shaking rattles.",
    "description": "Soothe sore gums safely! Made from 100% food-grade silicone and BPA-free polymer, with multi-texture teething nubs, easy-grasp handles, and gentle musical sound beads.",
    "SKU": "TYV-BABY-003",
    "brand": "Chicco",
    "category": "Baby Toys",
    "subcategory": "Teethers",
    "price": 499,
    "originalPrice": 749,
    "stock": 65,
    "lowStockThreshold": 12,
    "images": [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 340,
    "ageGroup": "0-2 Years",
    "gender": "All",
    "material": "100% Food-Grade Silicone & BPA-Free ABS",
    "color": "Pastel Mint, Peach & Lemon",
    "weight": "210g",
    "dimensions": "12 x 10 x 3 cm each",
    "tags": [
      "teether",
      "baby rattle",
      "sensory",
      "bpa free"
    ],
    "features": [
      "Sterilizer and dishwasher safe",
      "Gentle soothing gum relief textures",
      "Lightweight ergonomic rings for little hands"
    ],
    "specifications": {
      "Pieces": 4,
      "Material": "BPA & Phthalate Free"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Montessori Wooden Stacking Rings & Balancing Toy",
    "shortDescription": "Classic natural wooden rocking base with 8 rainbow smooth-sanded stacking donuts.",
    "description": "Foster fine motor coordination, size sorting, and balance! Made from polished rubberwood with child-safe vegetable dyes, smooth tactile edges, and a rounded rocking wobble base.",
    "SKU": "TYV-BABY-004",
    "brand": "Melissa & Doug",
    "category": "Baby Toys",
    "subcategory": "Stacking Toys",
    "price": 599,
    "originalPrice": 849,
    "stock": 42,
    "lowStockThreshold": 8,
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 290,
    "ageGroup": "0-2 Years",
    "gender": "All",
    "material": "Natural Solid Rubberwood",
    "color": "Rainbow Spectrum",
    "weight": "460g",
    "dimensions": "22 x 10 x 10 cm",
    "tags": [
      "stacking rings",
      "montessori",
      "wooden toy",
      "baby sorting"
    ],
    "features": [
      "8 graduated smooth wooden sorting rings",
      "Wobbling curved rocking safety base",
      "Non-toxic organic vegetable-based paint"
    ],
    "specifications": {
      "Rings": 8,
      "Height": "22 cm"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Soft Sensory Textured Squeeze Balls for Infants",
    "shortDescription": "6 different sensory grasp balls with varied knobby textures for tactile stimulation.",
    "description": "Engage baby’s sense of touch and motor control! Features 6 brightly colored squeeze balls with varied ridges, knobs, and swirls that squeak softly when pressed.",
    "SKU": "TYV-BABY-005",
    "brand": "Infantino",
    "category": "Baby Toys",
    "subcategory": "Sensory",
    "price": 549,
    "originalPrice": 799,
    "stock": 50,
    "lowStockThreshold": 10,
    "images": [
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 210,
    "ageGroup": "0-2 Years",
    "gender": "All",
    "material": "BPA-Free Soft Food-Grade Vinyl",
    "color": "Rainbow 6-Pack",
    "weight": "310g",
    "dimensions": "7 cm diameter each",
    "tags": [
      "sensory balls",
      "infantino",
      "baby texture",
      "squeeze ball"
    ],
    "features": [
      "6 distinctive sensory tactile surface textures",
      "Gentle air-cushioned squeak mechanism",
      "Easy for tiny infant hands to grip and throw"
    ],
    "specifications": {
      "Pack": 6,
      "Washable": "Warm soapy water"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Musical Starlight Nursery Crib Mobile with Soothing Sounds",
    "shortDescription": "Ceiling galaxy projector with rotating plush clouds, lullabies, and remote control.",
    "description": "Drift effortlessly into sweet slumber. Projects a starry night galaxy onto the nursery ceiling while 4 plush clouds rotate gently to 20 minutes of classical Mozart lullabies and white noise.",
    "SKU": "TYV-BABY-006",
    "brand": "Fisher-Price",
    "category": "Baby Toys",
    "subcategory": "Sleep Soothers",
    "price": 1799,
    "originalPrice": 2499,
    "stock": 19,
    "lowStockThreshold": 4,
    "images": [
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 315,
    "ageGroup": "0-2 Years",
    "gender": "All",
    "material": "Smooth ABS & Soft Organic Cotton",
    "color": "Starlight White & Pastel Gold",
    "weight": "980g",
    "dimensions": "42 x 34 x 12 cm",
    "tags": [
      "crib mobile",
      "nursery",
      "starlight projector",
      "lullaby",
      "fisher-price"
    ],
    "features": [
      "Ceiling starlight galaxy projection",
      "20 minutes of soothing white noise and lullabies",
      "Wireless remote control for parents"
    ],
    "specifications": {
      "Projection": "Starry sky LED",
      "Timer": "Auto shutoff 20 mins"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Nerf Elite 2.0 Commander Motorized Dart Blaster",
    "shortDescription": "Rotating 6-dart cylinder with 24 official foam darts and tactical rail attachments.",
    "description": "Blast into battle with high-powered motorized foam dart firepower! Features a 6-dart rotating cylinder, slam-fire rapid action mode, and launches foam darts up to 90 feet (27 meters).",
    "SKU": "TYV-OUT-001",
    "brand": "Nerf",
    "category": "Outdoor Toys",
    "subcategory": "Blasters",
    "price": 1299,
    "originalPrice": 1799,
    "stock": 45,
    "lowStockThreshold": 8,
    "images": [
      "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 540,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Impact ABS Polymer & Soft Foam Darts",
    "color": "Tactical Teal & High-Viz Orange",
    "weight": "590g",
    "dimensions": "38 x 24 x 7 cm",
    "tags": [
      "nerf",
      "blaster",
      "foam darts",
      "outdoor play",
      "hasbro"
    ],
    "features": [
      "Rotating 6-dart drum cylinder",
      "Includes 24 official Nerf Elite darts",
      "Tactical rails for scopes and barrel extensions"
    ],
    "specifications": {
      "Range": "Up to 27 Meters (90 Ft)",
      "DartsIncluded": 24
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "3-Wheel Foldable LED Light-Up Kick Scooter",
    "shortDescription": "Adjustable T-bar lean-to-steer scooter with motion-powered LED flashing wheels.",
    "description": "Glide smoothly and light up the pavement! Features motion-activated kinetic LED wheels that never require batteries, reinforced wide anti-slip deck, and 4-level adjustable handlebar.",
    "SKU": "TYV-OUT-002",
    "brand": "Micro",
    "category": "Outdoor Toys",
    "subcategory": "Ride-On & Scooters",
    "price": 1899,
    "originalPrice": 2699,
    "stock": 28,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 420,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Aircraft Aluminum & High-Rebound PU Wheels",
    "color": "Neon Cyan & Lime",
    "weight": "2300g",
    "dimensions": "60 x 28 x 78 cm (max height)",
    "tags": [
      "scooter",
      "kick scooter",
      "led wheels",
      "outdoor ride-on"
    ],
    "features": [
      "Battery-free kinetic light-up LED wheels",
      "Intuitive lean-to-steer balance mechanism",
      "Foldable with quick-release 1-button latch"
    ],
    "specifications": {
      "MaxWeight": "50 kg",
      "WheelSize": "120mm PU"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Automatic Hurricane Bubble Blower Blaster Machine",
    "shortDescription": "High-output motor produces 5,000+ floating bubbles per minute with LED lights.",
    "description": "Transform backyards into a bubble wonderland! Features a high-speed rotating 10-wand wheel, quiet motor, leakproof reservoir, and includes 500ml of premium concentrated bubble solution.",
    "SKU": "TYV-OUT-003",
    "brand": "Gazillion",
    "category": "Outdoor Toys",
    "subcategory": "Bubble Toys",
    "price": 899,
    "originalPrice": 1299,
    "stock": 36,
    "lowStockThreshold": 7,
    "images": [
      "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 230,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Durable Non-Toxic Recycled ABS",
    "color": "Bright Sun Yellow & Aqua",
    "weight": "620g",
    "dimensions": "22 x 18 x 16 cm",
    "tags": [
      "bubble machine",
      "bubble blaster",
      "outdoor party",
      "summer fun"
    ],
    "features": [
      "5000+ bubbles per minute output",
      "Includes 500ml non-toxic bubble solution",
      "Dual speed quiet motor settings"
    ],
    "specifications": {
      "Output": "5000/min",
      "Batteries": "4x AA or USB power"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "All-Weather Pro Grip Football / Soccer Ball Size 3",
    "shortDescription": "Textured TPU outer shell soccer ball with reinforced rubber bladder for kids.",
    "description": "Kick start active sports play! Size 3 soccer ball engineered specifically for young players with cushioned foam underlay, machine-stitched seams, and vibrant high-visibility aerodynamic graphics.",
    "SKU": "TYV-OUT-004",
    "brand": "Nike",
    "category": "Outdoor Toys",
    "subcategory": "Sports Balls",
    "price": 699,
    "originalPrice": 999,
    "stock": 50,
    "lowStockThreshold": 10,
    "images": [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 310,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Textured Synthetic TPU & Butyl Bladder",
    "color": "High-Viz Volt Yellow & Black",
    "weight": "340g",
    "dimensions": "19 cm diameter (Size 3)",
    "tags": [
      "football",
      "soccer ball",
      "outdoor sports",
      "sports"
    ],
    "features": [
      "Aerodynamic textured grip casing",
      "Long-lasting air retention bladder",
      "Ideal size 3 for age 4-9 training"
    ],
    "specifications": {
      "Size": "Size 3",
      "Panels": "32-Panel Machine Stitched"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Heavy-Duty 55-Inch Kids Fitness Mini Trampoline with Enclosure",
    "shortDescription": "Safety enclosure net trampoline with padded spring cover and heavy-duty frame.",
    "description": "Safe high-energy bouncing fun! Includes a 360-degree zippered safety enclosure net, thick foam-padded edge mat covering heavy-gauge steel springs, and arched non-slip safety legs.",
    "SKU": "TYV-OUT-005",
    "brand": "BouncePro",
    "category": "Outdoor Toys",
    "subcategory": "Active Play",
    "price": 3799,
    "originalPrice": 4999,
    "stock": 12,
    "lowStockThreshold": 3,
    "images": [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 280,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Galvanized Steel & Polypropylene Mesh",
    "color": "Vibrant Cobalt Blue",
    "weight": "11000g",
    "dimensions": "140 x 140 x 160 cm",
    "tags": [
      "trampoline",
      "mini trampoline",
      "fitness",
      "outdoor jumping"
    ],
    "features": [
      "Full height 360-degree protective enclosure net",
      "Padded foam poles and spring safety skirt",
      "Heavy galvanized rust-proof steel frame"
    ],
    "specifications": {
      "Diameter": "55 Inches (140 cm)",
      "MaxCapacity": "65 kg"
    },
    "isFeatured": true,
    "isBestSeller": false,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Super Soaker Floodtastic High-Capacity Water Blaster",
    "shortDescription": "Pump-to-pressure 1.5L reservoir water blaster shoots up to 35 feet.",
    "description": "Dominate summer water fights! Features a massive 1500ml quick-fill water tank, smooth pump-action pressure mechanism, and a twist-nozzle with 3 spray modes: stream, blast, and scatter.",
    "SKU": "TYV-OUT-006",
    "brand": "Nerf",
    "category": "Outdoor Toys",
    "subcategory": "Water Toys",
    "price": 849,
    "originalPrice": 1199,
    "stock": 35,
    "lowStockThreshold": 7,
    "images": [
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 225,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Heavy-Duty Leakproof ABS Plastic",
    "color": "Aquatic Blue & Neon Coral",
    "weight": "490g",
    "dimensions": "42 x 20 x 8 cm",
    "tags": [
      "water blaster",
      "super soaker",
      "water gun",
      "summer fun",
      "nerf"
    ],
    "features": [
      "1500ml generous quick-fill tank",
      "Shoots water up to 10 meters (35 ft)",
      "Triple spray nozzle patterns"
    ],
    "specifications": {
      "Capacity": "1.5 Liters",
      "Range": "35 Feet"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Rubik's 3x3 Speed Cube Ultra-Smooth Fast Turning",
    "shortDescription": "Official competition speed cube with magnetic core, tension adjustment, and stickerless tiles.",
    "description": "Solve faster with zero corner twists or locks. Features internal magnetic positioning, frosted anti-scratch exterior tiles, rounded core joints, and tension adjustment springs.",
    "SKU": "TYV-PUZ-001",
    "brand": "Rubik's",
    "category": "Puzzles",
    "subcategory": "Brain Teasers",
    "price": 599,
    "originalPrice": 849,
    "stock": 60,
    "lowStockThreshold": 10,
    "images": [
      "https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 890,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Eco-Friendly ABS Matte Plastic",
    "color": "Stickerless Bright Vivid 6-Color",
    "weight": "95g",
    "dimensions": "5.6 x 5.6 x 5.6 cm",
    "tags": [
      "rubiks cube",
      "speed cube",
      "puzzle",
      "brain teaser",
      "3x3"
    ],
    "features": [
      "Magnetic core for instant snap alignment",
      "Stickerless frosted scratch-resistant faces",
      "Adjustable internal spring tensioning"
    ],
    "specifications": {
      "Dimensions": "56 x 56 x 56 mm",
      "Type": "Magnetic 3x3"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "1000-Piece World Map Explorer Premium Jigsaw Puzzle",
    "shortDescription": "High-precision interlocking cardboard puzzle with glare-free linen finish.",
    "description": "Piece together continents, oceans, landmarks, and indigenous wildlife! Made from extra-thick blue board, each piece fits with Ravensburger’s signature Softclick Technology.",
    "SKU": "TYV-PUZ-002",
    "brand": "Ravensburger",
    "category": "Puzzles",
    "subcategory": "Jigsaw Puzzles",
    "price": 1199,
    "originalPrice": 1599,
    "stock": 30,
    "lowStockThreshold": 6,
    "images": [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 380,
    "ageGroup": "12+ Years",
    "gender": "All",
    "material": "Linen Structured Virgin Blue Board",
    "color": "Illustrated Geographical Map",
    "weight": "820g",
    "dimensions": "70 x 50 cm (completed)",
    "tags": [
      "jigsaw puzzle",
      "1000 pieces",
      "world map",
      "ravensburger",
      "puzzle"
    ],
    "features": [
      "Softclick Technology guarantees perfect fit",
      "Anti-glare museum linen texture",
      "Includes full-size fold-out reference poster"
    ],
    "specifications": {
      "Pieces": 1000,
      "Size": "70 x 50 cm"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Montessori Geometric Wooden Tangram Brainteaser Puzzle",
    "shortDescription": "7-piece precision-cut solid wooden tangram puzzle with 60 challenge flashcards.",
    "description": "Ancient Chinese logic geometry brought to life! Rearrange 7 geometric tans to form animals, people, ships, and architectural silhouettes across 60 progressive challenge cards.",
    "SKU": "TYV-PUZ-003",
    "brand": "Melissa & Doug",
    "category": "Puzzles",
    "subcategory": "Wooden Puzzles",
    "price": 499,
    "originalPrice": 699,
    "stock": 45,
    "lowStockThreshold": 8,
    "images": [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 220,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Solid Natural Pine Wood",
    "color": "Rainbow Stained Wood",
    "weight": "340g",
    "dimensions": "18 x 18 x 2 cm",
    "tags": [
      "tangram",
      "montessori",
      "brain teaser",
      "geometry",
      "wooden puzzle"
    ],
    "features": [
      "7 smoothly sanded wooden geometric shapes",
      "60 double-sided challenge puzzle cards",
      "Convenient wooden storage tray"
    ],
    "specifications": {
      "Pieces": 7,
      "Cards": 60,
      "Base": "Pine wood"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Solar System Glow-in-the-Dark 100-Piece Floor Puzzle",
    "shortDescription": "Large 3-foot circular floor puzzle featuring planets, asteroids, and glowing stars.",
    "description": "Assemble the cosmos and turn off the room lights! Features all 8 planets, asteroid belts, orbital paths, and spacecraft illustrations that glow brightly in the dark after light exposure.",
    "SKU": "TYV-PUZ-004",
    "brand": "Melissa & Doug",
    "category": "Puzzles",
    "subcategory": "Floor Puzzles",
    "price": 799,
    "originalPrice": 1099,
    "stock": 28,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 195,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Extra-Thick Wipe-Clean Cardboard",
    "color": "Cosmic Galaxy & Glow Inks",
    "weight": "760g",
    "dimensions": "90 cm diameter circular",
    "tags": [
      "floor puzzle",
      "glow in dark",
      "solar system",
      "space puzzle"
    ],
    "features": [
      "Luminescent phosphorescent glow coating",
      "Jumbo pieces designed for little toddler hands",
      "Wipe-clean laminated surface"
    ],
    "specifications": {
      "Pieces": 100,
      "Diameter": "90 cm"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "3D Wooden Mechanical Puzzle Marble Rollercoaster Run",
    "shortDescription": "Laser-cut birch plywood DIY assembly kit with hand-crank steel marble elevator.",
    "description": "Engineer a working marble coaster! Made from precision laser-cut birchwood, requires no glue, and features a hand-crank marble lift, loop-de-loop track, and distribution switch.",
    "SKU": "TYV-PUZ-005",
    "brand": "ROKR",
    "category": "Puzzles",
    "subcategory": "3D Puzzles",
    "price": 1699,
    "originalPrice": 2299,
    "stock": 18,
    "lowStockThreshold": 4,
    "images": [
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 310,
    "ageGroup": "12+ Years",
    "gender": "All",
    "material": "Precision Laser-Cut Russian Birch Plywood",
    "color": "Natural Wood & Polished Steel",
    "weight": "850g",
    "dimensions": "25 x 23 x 17 cm (assembled)",
    "tags": [
      "3d puzzle",
      "marble run",
      "mechanical puzzle",
      "rokr",
      "diy kit"
    ],
    "features": [
      "Glue-free snap and peg wooden construction",
      "Working hand-crank marble elevator tower",
      "Includes 10 precision steel ball bearings"
    ],
    "specifications": {
      "Parts": 254,
      "AssemblyTime": "4-6 Hours"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Animal Safari Chunky Wooden Peg Puzzle for Toddlers",
    "shortDescription": "8 large easy-to-grasp wooden zoo animals with sound sensors and matching pictures.",
    "description": "Animal sounds reward every successful match! Lift the lion, elephant, or monkey to hear authentic animal sounds. Sturdy wooden knobs are specially designed for developing pincer grasp.",
    "SKU": "TYV-PUZ-006",
    "brand": "Funskool",
    "category": "Puzzles",
    "subcategory": "Peg Puzzles",
    "price": 549,
    "originalPrice": 799,
    "stock": 40,
    "lowStockThreshold": 8,
    "images": [
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 230,
    "ageGroup": "0-2 Years",
    "gender": "All",
    "material": "Eco-Friendly Solid Poplar Wood",
    "color": "Vibrant Jungle Colors",
    "weight": "520g",
    "dimensions": "30 x 22 x 3 cm",
    "tags": [
      "peg puzzle",
      "wooden puzzle",
      "safari animals",
      "toddler toy"
    ],
    "features": [
      "Light-activated authentic animal sound chips",
      "Sturdy wooden peg handles for little fingers",
      "Full-color matching illustrations underneath"
    ],
    "specifications": {
      "Pieces": 8,
      "Batteries": "2x AAA required"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "12-in-1 Solar Powered Hydraulic Robot Engineering Kit",
    "shortDescription": "Build 12 different walking and crawling robots powered completely by solar energy.",
    "description": "Harness clean energy! Assemble 12 distinct functional mechanical creations including a walking dog, rowboat, beetle, and turtle. No batteries needed—runs entirely on solar light.",
    "SKU": "TYV-STEM-001",
    "brand": "Thames & Kosmos",
    "category": "STEM Toys",
    "subcategory": "Robotics",
    "price": 1499,
    "originalPrice": 1999,
    "stock": 25,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 340,
    "ageGroup": "9-12 Years",
    "gender": "All",
    "material": "Engineered High-Grade ABS Plastic",
    "color": "Solar White & Transparent Tech Blue",
    "weight": "480g",
    "dimensions": "28 x 20 x 7 cm",
    "tags": [
      "stem",
      "solar robot",
      "robotics kit",
      "green energy",
      "engineering"
    ],
    "features": [
      "12 unique robot build configurations",
      "Real working monocrystalline solar panel",
      "Teaches mechanical gears and transmission"
    ],
    "specifications": {
      "Models": 12,
      "Power": "Direct Solar Photovoltaic"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "National Geographic 1200x Science Microscope Lab Set",
    "shortDescription": "Compound optical microscope with 40x-1200x magnification, LED illumination, and slides.",
    "description": "Explore the hidden microscopic world! Features all-glass eyepieces, top and bottom dual LED illumination, blank and prepared specimen slides, petri dishes, and a smartphone camera mount.",
    "SKU": "TYV-STEM-002",
    "brand": "National Geographic",
    "category": "STEM Toys",
    "subcategory": "Science Labs",
    "price": 2199,
    "originalPrice": 2999,
    "stock": 18,
    "lowStockThreshold": 4,
    "images": [
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 410,
    "ageGroup": "9-12 Years",
    "gender": "All",
    "material": "Die-Cast Metal Base & Optical Glass Lenses",
    "color": "Explorer Yellow & Black",
    "weight": "1100g",
    "dimensions": "33 x 24 x 13 cm",
    "tags": [
      "microscope",
      "national geographic",
      "science kit",
      "biology",
      "stem"
    ],
    "features": [
      "Magnification levels: 40x, 100x, 400x, 1200x",
      "Smartphone photo adapter included",
      "Includes 12 prepared slides and laboratory tools"
    ],
    "specifications": {
      "Magnification": "Up to 1200x",
      "Body": "Metal Frame"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Electronic Snap Circuits Exploration Electronics Kit",
    "shortDescription": "100+ DIY electronic circuit projects with safe solderless snap-together blocks.",
    "description": "Learn electricity safely with no tools or soldering! Snap together real working circuits to build a flying saucer launcher, AM radio, sound sirens, burglar alarm, and touch sensors.",
    "SKU": "TYV-STEM-003",
    "brand": "Snap Circuits",
    "category": "STEM Toys",
    "subcategory": "Electronics",
    "price": 1699,
    "originalPrice": 2299,
    "stock": 22,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 390,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Solderless Snap Conductive Components",
    "color": "Multi-Color Circuit Blocks",
    "weight": "780g",
    "dimensions": "38 x 28 x 6 cm",
    "tags": [
      "snap circuits",
      "electronics",
      "circuits",
      "stem toy",
      "physics"
    ],
    "features": [
      "Over 100 exciting project schematics",
      "Safe snap-together connectors require no soldering",
      "Includes full-color illustrated manual"
    ],
    "specifications": {
      "Projects": "100+",
      "Power": "2x AA Batteries"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Volcano Eruption & Slime Chemistry Science Experiment Station",
    "shortDescription": "Complete 15-experiment laboratory chemistry beaker set with foaming volcano kit.",
    "description": "Erupt bubbling volcanoes, grow sparkling crystals, and formulate stretchy slime! Includes child-safe test tubes, beakers, measuring flasks, chemical reagents, and protective goggles.",
    "SKU": "TYV-STEM-004",
    "brand": "National Geographic",
    "category": "STEM Toys",
    "subcategory": "Chemistry",
    "price": 999,
    "originalPrice": 1399,
    "stock": 35,
    "lowStockThreshold": 7,
    "images": [
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 275,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Non-Toxic Reagents & Lab-Grade Plastic",
    "color": "Volcanic Red & Neon Slime",
    "weight": "620g",
    "dimensions": "30 x 22 x 8 cm",
    "tags": [
      "volcano",
      "chemistry kit",
      "science experiment",
      "national geographic"
    ],
    "features": [
      "15 safe kitchen-chemistry experiments",
      "Reusable moldable plaster volcano mountain",
      "Includes protective safety goggles and pipettes"
    ],
    "specifications": {
      "Experiments": 15,
      "Reagents": "Child-Safe certified"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Motorized Rotating 3D Solar System Planetarium Glow Model",
    "shortDescription": "Motorized planetary orbit mechanism with glowing sun light and painted planet spheres.",
    "description": "Watch the solar system revolve in your bedroom! A motorized central sun projects light onto revolving planet orbits, demonstrating planetary rotation and celestial mechanics.",
    "SKU": "TYV-STEM-005",
    "brand": "4M KidzLabs",
    "category": "STEM Toys",
    "subcategory": "Astronomy",
    "price": 1199,
    "originalPrice": 1599,
    "stock": 29,
    "lowStockThreshold": 6,
    "images": [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 215,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "ABS Plastic Gears & Hand-Painted Spheres",
    "color": "Galaxy Deep Blue Base & Glowing Sun",
    "weight": "550g",
    "dimensions": "34 x 26 x 10 cm",
    "tags": [
      "solar system",
      "planetarium",
      "astronomy",
      "stem",
      "space model"
    ],
    "features": [
      "Motorized planetary gear transmission",
      "Central LED light illuminating the sun",
      "Includes paints and glow-in-the-dark highlight pen"
    ],
    "specifications": {
      "Span": "34 cm Orbit Span",
      "Power": "4x AA batteries"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Astronomical Refractor Telescope with Tripod & Star Map",
    "shortDescription": "50mm optical glass telescope with 90x magnification, finderscope, and star chart.",
    "description": "Gaze at the craters of the moon and rings of Saturn! Features 50mm coated optical glass objective lens, 2 interchangeable eyepieces (H6mm and H20mm), moon filter, and aluminum tripod.",
    "SKU": "TYV-STEM-006",
    "brand": "Celestron",
    "category": "STEM Toys",
    "subcategory": "Astronomy",
    "price": 2699,
    "originalPrice": 3599,
    "stock": 15,
    "lowStockThreshold": 3,
    "images": [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 310,
    "ageGroup": "9-12 Years",
    "gender": "All",
    "material": "Aluminum Optical Tube & Glass Lenses",
    "color": "Celestron Royal Blue",
    "weight": "1600g",
    "dimensions": "44 x 22 x 10 cm",
    "tags": [
      "telescope",
      "astronomy",
      "moon",
      "stars",
      "stem telescope"
    ],
    "features": [
      "50mm multi-coated optical glass objective lens",
      "Includes 2 eyepieces giving 18x and 90x magnifications",
      "Full height adjustable aluminum tripod"
    ],
    "specifications": {
      "Objective": "50mm",
      "FocalLength": "360mm"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "LEGO Classic 500-Piece Creative Colorful Brick Bucket",
    "shortDescription": "500 authentic classic LEGO bricks with building wheels, windows, doors, and eyes.",
    "description": "The golden standard of creative building! Includes 500 bricks across 33 vivid rainbow colors, specialized wheels, windows, eyes, and an inspirational idea guide book.",
    "SKU": "TYV-BLK-001",
    "brand": "LEGO",
    "category": "Building Blocks",
    "subcategory": "Classic Bricks",
    "price": 1399,
    "originalPrice": 1799,
    "stock": 50,
    "lowStockThreshold": 10,
    "images": [
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 820,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Original ABS LEGO Precision Polymer",
    "color": "Rainbow 33 Assorted Colors",
    "weight": "980g",
    "dimensions": "30 x 25 x 18 cm bucket",
    "tags": [
      "lego",
      "building blocks",
      "creative brick bucket",
      "classic lego"
    ],
    "features": [
      "500 authentic precision interlocking bricks",
      "Includes specialty parts: wheels, eyes, windows",
      "Durable plastic storage box with lid"
    ],
    "specifications": {
      "Pieces": 500,
      "StorageBox": true
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Magna-Tiles 100-Piece Clear Colors 3D Magnetic Tiles Set",
    "shortDescription": "Translucent magnetic construction tiles with sonic-welded neodymium magnets.",
    "description": "Spark geometric creativity and 3D spatial reasoning! Translucent colorful tiles click together with strong rare-earth magnets to build castles, towers, pyramids, and bridges.",
    "SKU": "TYV-BLK-002",
    "brand": "Magna-Tiles",
    "category": "Building Blocks",
    "subcategory": "Magnetic Tiles",
    "price": 2299,
    "originalPrice": 2999,
    "stock": 25,
    "lowStockThreshold": 5,
    "images": [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 540,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "BPA-Free Food-Grade MABS & Neodymium Magnets",
    "color": "Stained Glass Translucent Jewel Tones",
    "weight": "1650g",
    "dimensions": "32 x 24 x 8 cm",
    "tags": [
      "magnetic tiles",
      "magna-tiles",
      "3d tiles",
      "stem blocks"
    ],
    "features": [
      "100 magnetic geometric shapes",
      "Sonic welded rivets prevent magnet dislodging",
      "Translucent colors glow with backlighting"
    ],
    "specifications": {
      "Count": 100,
      "Magnets": "Reinforced Enclosed"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Mega Marble Run Gravity Maze 120-Piece Track Construction",
    "shortDescription": "Translucent spiral track tubes, funnel jumps, and 30 glass race marbles.",
    "description": "Engineer gravity-defying marble drops! Features 120 interlocking see-through track chutes, spinning paddle wheels, centrifugal funnels, and 30 smooth glass marbles.",
    "SKU": "TYV-BLK-003",
    "brand": "ThinkFun",
    "category": "Building Blocks",
    "subcategory": "Marble Runs",
    "price": 1199,
    "originalPrice": 1699,
    "stock": 30,
    "lowStockThreshold": 6,
    "images": [
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 310,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Clear High-Impact Polycarbonate",
    "color": "Neon Glow Translucent Colors",
    "weight": "1100g",
    "dimensions": "40 x 30 x 10 cm",
    "tags": [
      "marble run",
      "gravity maze",
      "building blocks",
      "stem track"
    ],
    "features": [
      "120 sturdy translucent snap-fit track parts",
      "Includes 30 smooth glass racing marbles",
      "Wide stable base plates prevent tipping"
    ],
    "specifications": {
      "Parts": 120,
      "Marbles": 30
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Royal Medieval Castle Wooden Architectural Blocks Set",
    "shortDescription": "75 solid pine building blocks with battlements, towers, archways, and knight flags.",
    "description": "Construct fortresses fit for kings and queens! Solid smooth-sanded pine blocks feature castle spires, drawbridge arches, turrets, and medieval royal flags.",
    "SKU": "TYV-BLK-004",
    "brand": "Melissa & Doug",
    "category": "Building Blocks",
    "subcategory": "Wooden Blocks",
    "price": 999,
    "originalPrice": 1399,
    "stock": 35,
    "lowStockThreshold": 7,
    "images": [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 260,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Natural Solid Pine Wood",
    "color": "Natural Wood & Royal Red/Blue Accents",
    "weight": "1400g",
    "dimensions": "34 x 26 x 8 cm",
    "tags": [
      "wooden blocks",
      "castle",
      "medieval",
      "building blocks",
      "pine wood"
    ],
    "features": [
      "75 handcrafted solid wood architectural blocks",
      "Smooth bevel-sanded splinter-free corners",
      "Sturdy wooden box with sliding lid"
    ],
    "specifications": {
      "Pieces": 75,
      "Material": "Pine Wood"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "LEGO Technic High-Speed Pull-Back Racing Buggy",
    "shortDescription": "Advanced technical gear and piston model with high-torque pull-back motor.",
    "description": "Experience real mechanical engineering! Features a realistic working 4-cylinder engine with moving pistons, heavy-duty off-road suspension, rugged tires, and high-velocity pull-back action.",
    "SKU": "TYV-BLK-005",
    "brand": "LEGO",
    "category": "Building Blocks",
    "subcategory": "Technic",
    "price": 1799,
    "originalPrice": 2399,
    "stock": 22,
    "lowStockThreshold": 4,
    "images": [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 410,
    "ageGroup": "9-12 Years",
    "gender": "All",
    "material": "Reinforced LEGO Technic Beams & Axles",
    "color": "Electric Orange & Matte Black",
    "weight": "620g",
    "dimensions": "26 x 14 x 10 cm",
    "tags": [
      "lego technic",
      "pull back",
      "racing buggy",
      "mechanical lego"
    ],
    "features": [
      "Working engine pistons that pump as car moves",
      "High-torque pull-back propulsion motor",
      "Massive low-profile off-road tread tires"
    ],
    "specifications": {
      "Pieces": 280,
      "Motor": "Pull-back spring drive"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "Large Soft Interlocking Waffle Blocks for Toddlers",
    "shortDescription": "48 oversized soft-foam interlocking waffle blocks for giant indoor fort building.",
    "description": "Build forts, tunnels, and secret castles! These giant, lightweight waffle blocks snap together effortlessly at any angle, creating durable structures that won’t hurt if they tumble.",
    "SKU": "TYV-BLK-006",
    "brand": "Little Tikes",
    "category": "Building Blocks",
    "subcategory": "Large Blocks",
    "price": 1599,
    "originalPrice": 2199,
    "stock": 18,
    "lowStockThreshold": 4,
    "images": [
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 190,
    "ageGroup": "0-2 Years",
    "gender": "All",
    "material": "High-Density Soft EVA Foam",
    "color": "Pastel Primary Colors",
    "weight": "2100g",
    "dimensions": "35 x 35 x 4 cm each piece",
    "tags": [
      "waffle blocks",
      "giant blocks",
      "fort building",
      "soft blocks"
    ],
    "features": [
      "48 large interlocking pieces",
      "Soft cushioned impact-free play",
      "Indoor and outdoor water-resistant use"
    ],
    "specifications": {
      "Pieces": 48,
      "PieceSize": "35 x 35 cm"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Play-Doh Deluxe 24-Pack Rainbow Modeling Clay Studio",
    "shortDescription": "24 vibrant non-toxic modeling compound tubs with rolling pins and shape cutters.",
    "description": "Squish, shape, and sculpt colorful masterpieces! Features 24 classic Play-Doh tubs spanning neon, primary, and pastel colors, plus 12 extruder tools, roller, and animal shape cutters.",
    "SKU": "TYV-ART-001",
    "brand": "Play-Doh",
    "category": "Arts & Crafts",
    "subcategory": "Clay & Dough",
    "price": 799,
    "originalPrice": 1099,
    "stock": 55,
    "lowStockThreshold": 10,
    "images": [
      "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 710,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Wheat-Based Non-Toxic Modeling Compound",
    "color": "24 Rainbow Vibrant Assortment",
    "weight": "1900g",
    "dimensions": "32 x 26 x 10 cm",
    "tags": [
      "play-doh",
      "modeling clay",
      "dough",
      "crafts",
      "creativity"
    ],
    "features": [
      "24 sealed 3oz color cans",
      "100% non-toxic child-safe formula",
      "Includes 12 sculpting cutter accessories"
    ],
    "specifications": {
      "Tubs": 24,
      "Total Dough": "2 kg (72 oz)"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Kids Double-Sided Wooden Art Easel with Chalkboard & Whiteboard",
    "shortDescription": "Adjustable height pine easel with magnetic dry-erase board, chalkboard, and paper roll.",
    "description": "An all-in-one studio for young artists! One side features a magnetic dry-erase whiteboard; the other side offers a chalkboard. Includes a 50-foot paper roll, paint cup trays, and clips.",
    "SKU": "TYV-ART-002",
    "brand": "Melissa & Doug",
    "category": "Arts & Crafts",
    "subcategory": "Easels",
    "price": 2499,
    "originalPrice": 3499,
    "stock": 16,
    "lowStockThreshold": 3,
    "images": [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 390,
    "ageGroup": "3-5 Years",
    "gender": "All",
    "material": "Solid Solid Pine & Magnetic Laminate",
    "color": "Natural Wood Frame",
    "weight": "4800g",
    "dimensions": "110 x 55 x 48 cm",
    "tags": [
      "art easel",
      "chalkboard",
      "whiteboard",
      "melissa and doug",
      "drawing"
    ],
    "features": [
      "Double-sided: Magnetic whiteboard & blackboard",
      "Includes 50-foot continuous paper roll dispenser",
      "Twin deep spill-proof paint cup storage trays"
    ],
    "specifications": {
      "Height": "Adjustable 90-110 cm",
      "PaperRoll": "15 Meters"
    },
    "isFeatured": true,
    "isBestSeller": true,
    "isNew": true,
    "isOnSale": true
  },
  {
    "name": "DIY Sparkle Friendship Bracelet & Bead Jewelry Studio",
    "shortDescription": "2000+ vibrant glass beads, charms, metallic threads, and spinning bead loom.",
    "description": "Design dazzling custom jewelry! Packed with 2000+ acrylic and glass beads, alphabet letter charms, elastic cords, metallic embroidery floss, and a rotating bead threading loom.",
    "SKU": "TYV-ART-003",
    "brand": "Cra-Z-Art",
    "category": "Arts & Crafts",
    "subcategory": "Jewelry Making",
    "price": 699,
    "originalPrice": 999,
    "stock": 40,
    "lowStockThreshold": 8,
    "images": [
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 260,
    "ageGroup": "6-8 Years",
    "gender": "Girls",
    "material": "Polished Acrylic, Enamel & Elastic Floss",
    "color": "Pastel, Metallic & Rainbow Beads",
    "weight": "520g",
    "dimensions": "28 x 20 x 5 cm",
    "tags": [
      "bracelet maker",
      "jewelry kit",
      "beads",
      "diy craft",
      "girls craft"
    ],
    "features": [
      "Over 2000 colorful assorted beads and charms",
      "Includes A-Z alphabet letter monogram beads",
      "Compartment organizer case with latch lock"
    ],
    "specifications": {
      "Beads": "2000+ pieces",
      "Loom": "Handheld spinner included"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Origami Master 200-Sheet Japanese Craft Paper Art Kit",
    "shortDescription": "200 double-sided origami sheets with 40-step illustrated instruction handbook.",
    "description": "Fold paper into birds, cranes, dragons, and boats! Includes 200 sheets of authentic 6x6 inch double-sided Japanese patterned origami paper and an easy step-by-step guidebook.",
    "SKU": "TYV-ART-004",
    "brand": "Funskool",
    "category": "Arts & Crafts",
    "subcategory": "Paper Crafts",
    "price": 449,
    "originalPrice": 649,
    "stock": 50,
    "lowStockThreshold": 10,
    "images": [
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=600&q=80",
    "rating": 4.7,
    "reviewCount": 180,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Crisp Japanese Woodfree Paper 80 GSM",
    "color": "Double-Sided Traditional Floral & Geometric",
    "weight": "310g",
    "dimensions": "15 x 15 cm sheets",
    "tags": [
      "origami",
      "paper craft",
      "japanese art",
      "folding paper"
    ],
    "features": [
      "200 precision square 6x6 inch sheets",
      "Full-color 64-page project instruction handbook",
      "Vibrant non-fading double-sided print"
    ],
    "specifications": {
      "Sheets": 200,
      "PaperSize": "15 x 15 cm"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "Glow-in-the-Dark Cosmic Slime Making Chemistry Lab",
    "shortDescription": "DIY slime station with glitter, neon colors, foam beads, and activator solution.",
    "description": "Mix, stretch, and pop cosmic slime! Includes clear and white PVA glues, skin-safe activator solution, glow-in-the-dark powder, crunchy foam beads, and airtight storage pots.",
    "SKU": "TYV-ART-005",
    "brand": "Elmer's",
    "category": "Arts & Crafts",
    "subcategory": "Slime",
    "price": 649,
    "originalPrice": 899,
    "stock": 45,
    "lowStockThreshold": 8,
    "images": [
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80",
    "rating": 4.8,
    "reviewCount": 310,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Non-Toxic Washable PVA & Activator",
    "color": "Cosmic Purple, Glow Green & Sparkle Silver",
    "weight": "750g",
    "dimensions": "26 x 20 x 7 cm",
    "tags": [
      "slime",
      "slime kit",
      "glow in dark",
      "elmers",
      "diy crafts"
    ],
    "features": [
      "100% skin-safe washable child formula",
      "Phosphorescent glow powder shines in dark",
      "Includes 6 airtight slime storage tubs"
    ],
    "specifications": {
      "SlimeBatches": "Makes 6 batches",
      "Safety": "ASTM D-4236 Certified"
    },
    "isFeatured": false,
    "isBestSeller": true,
    "isNew": false,
    "isOnSale": true
  },
  {
    "name": "100-Piece Dual Tip Watercolor Markers & Sketchbook Set",
    "shortDescription": "Flexible brush and fine line dual-tip markers with 100-page acid-free watercolor pad.",
    "description": "Paint and illustrate with rich vibrant tones! Each pen features a soft flexible brush tip for broad sweeps and a 0.4mm ultra-fine metal-clad tip for intricate outlines. Non-toxic, water-soluble blendable ink.",
    "SKU": "TYV-ART-006",
    "brand": "Faber-Castell",
    "category": "Arts & Crafts",
    "subcategory": "Drawing & Painting",
    "price": 1199,
    "originalPrice": 1699,
    "stock": 35,
    "lowStockThreshold": 7,
    "images": [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    "rating": 4.9,
    "reviewCount": 440,
    "ageGroup": "6-8 Years",
    "gender": "All",
    "material": "Water-Soluble Non-Toxic Pigment Ink",
    "color": "100 Unique Artist Pigments",
    "weight": "820g",
    "dimensions": "30 x 20 x 8 cm",
    "tags": [
      "watercolor pens",
      "markers",
      "drawing",
      "sketchbook",
      "art kit"
    ],
    "features": [
      "Dual tips: 1-4mm soft brush & 0.4mm fine line tip",
      "100 completely unique blendable colors",
      "Includes spiral bound 100-page watercolor pad"
    ],
    "specifications": {
      "Markers": 100,
      "Ink": "Water-based wash easily"
    },
    "isFeatured": false,
    "isBestSeller": false,
    "isNew": true,
    "isOnSale": true
  }
];

export const couponsData = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 499,
    maxDiscount: 300,
    expiryDate: new Date('2028-12-31'),
    isActive: true,
  },
  {
    code: 'TOY20',
    discountType: 'percentage',
    discountValue: 20,
    minPurchase: 999,
    maxDiscount: 600,
    expiryDate: new Date('2028-12-31'),
    isActive: true,
  },
  {
    code: 'SAVE500',
    discountType: 'fixed',
    discountValue: 500,
    minPurchase: 2499,
    maxDiscount: 500,
    expiryDate: new Date('2028-12-31'),
    isActive: true,
  },
  {
    code: 'KIDS15',
    discountType: 'percentage',
    discountValue: 15,
    minPurchase: 799,
    maxDiscount: 450,
    expiryDate: new Date('2028-12-31'),
    isActive: true,
  },
  {
    code: 'SUMMER25',
    discountType: 'percentage',
    discountValue: 25,
    minPurchase: 1499,
    maxDiscount: 750,
    expiryDate: new Date('2028-12-31'),
    isActive: true,
  },
];

export const indianCustomersData = [
  {
    name: 'Syed Ahmed',
    email: 'syed.ahmed@example.com',
    phone: '+91 98765 43210',
    address: {
      fullName: 'Syed Ahmed',
      phone: '+91 98765 43210',
      houseFlat: 'H.No 12-3-45',
      street: 'Akbar Bagh Road',
      area: 'Malakpet',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500036',
      isDefault: true,
    },
  },
  {
    name: 'Nusreth Mohammed',
    email: 'nusreth.m@example.com',
    phone: '+91 91234 56789',
    address: {
      fullName: 'Nusreth Mohammed',
      phone: '+91 91234 56789',
      houseFlat: 'Flat 402, Green Meadows',
      street: 'Saidabad Main Rd',
      area: 'Saidabad',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500059',
      isDefault: true,
    },
  },
  {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98111 22334',
    address: {
      fullName: 'Rahul Sharma',
      phone: '+91 98111 22334',
      houseFlat: 'B-24, Pocket 3',
      street: 'Mayur Vihar Phase 1',
      area: 'East Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      pinCode: '110091',
      isDefault: true,
    },
  },
  {
    name: 'Priya Mehta',
    email: 'priya.mehta@example.com',
    phone: '+91 98222 33445',
    address: {
      fullName: 'Priya Mehta',
      phone: '+91 98222 33445',
      houseFlat: '104, Sunrise Heights',
      street: 'Linking Road',
      area: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400050',
      isDefault: true,
    },
  },
  {
    name: 'Arjun Kumar',
    email: 'arjun.kumar@example.com',
    phone: '+91 98333 44556',
    address: {
      fullName: 'Arjun Kumar',
      phone: '+91 98333 44556',
      houseFlat: 'Villa 18, Palm Meadows',
      street: 'Whitefield Main Rd',
      area: 'Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560066',
      isDefault: true,
    },
  },
  {
    name: 'Ananya Iyer',
    email: 'ananya.iyer@example.com',
    phone: '+91 98444 55667',
    address: {
      fullName: 'Ananya Iyer',
      phone: '+91 98444 55667',
      houseFlat: '4B, Chaitanya Apts',
      street: 'TTK Road',
      area: 'Alwarpet',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pinCode: '600018',
      isDefault: true,
    },
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91 98555 66778',
    address: {
      fullName: 'Vikram Singh',
      phone: '+91 98555 66778',
      houseFlat: 'Plot 55, Civil Lines',
      street: 'MI Road',
      area: 'C-Scheme',
      city: 'Jaipur',
      state: 'Rajasthan',
      pinCode: '302001',
      isDefault: true,
    },
  },
  {
    name: 'Sneha Patel',
    email: 'sneha.patel@example.com',
    phone: '+91 98666 77889',
    address: {
      fullName: 'Sneha Patel',
      phone: '+91 98666 77889',
      houseFlat: '802, Shivalik Enclave',
      street: 'CG Road',
      area: 'Navrangpura',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pinCode: '380009',
      isDefault: true,
    },
  },
  {
    name: 'Rohan Verma',
    email: 'rohan.verma@example.com',
    phone: '+91 98777 88990',
    address: {
      fullName: 'Rohan Verma',
      phone: '+91 98777 88990',
      houseFlat: '22, Sector 15',
      street: 'Madhya Marg',
      area: 'Sector 15',
      city: 'Chandigarh',
      state: 'Punjab',
      pinCode: '160015',
      isDefault: true,
    },
  },
  {
    name: 'Deepa Nair',
    email: 'deepa.nair@example.com',
    phone: '+91 98888 99001',
    address: {
      fullName: 'Deepa Nair',
      phone: '+91 98888 99001',
      houseFlat: 'C-12, Skyline City',
      street: 'MG Road',
      area: 'Kadavanthra',
      city: 'Kochi',
      state: 'Kerala',
      pinCode: '682020',
      isDefault: true,
    },
  },
];

export const seedDatabase = async (): Promise<void> => {
  try {
    console.log('[Seed] Clearing existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Address.deleteMany({}),
      Coupon.deleteMany({}),
      Review.deleteMany({}),
      Order.deleteMany({}),
      Wishlist.deleteMany({}),
      Cart.deleteMany({}),
    ]);

    console.log('[Seed] Inserting Categories...');
    const createdCategories = await Category.insertMany(
      categoriesData.map((c) => ({
        ...c,
        slug: slugify(c.name, { lower: true, strict: true }),
      }))
    );

    console.log('[Seed] Inserting Coupons...');
    await Coupon.insertMany(couponsData);

    console.log('[Seed] Creating Demo Admin & Customer accounts...');
    const adminUser = await User.create({
      _id: new mongoose.Types.ObjectId('6ac797e7d735d1123a407e9c'),
      name: 'ToyVerse Admin',
      email: 'admin@toyverse.com',
      phone: '+91 98000 00000',
      password: 'Admin@12345',
      role: 'admin',
    });

    const demoCustomer = await User.create({
      _id: new mongoose.Types.ObjectId('6ac797e7d735d1123a407e9d'),
      name: 'Demo Customer',
      email: 'customer@toyverse.com',
      phone: '+91 98765 00000',
      password: 'Customer@12345',
      role: 'customer',
    });

    const syedCustomer = await User.create({
      name: 'Syed Sufyan Mehdi',
      email: 'syedsufyanmehdi991@gmail.com',
      phone: '+91 98765 43210',
      password: 'Syed@123',
      role: 'customer',
    });

    // Create demo customer saved address (matching Reference Image screen 5: Syed Ahmed & Nusreth Mohammed)
    const demoCustomerAddress1 = await Address.create({
      user: demoCustomer._id,
      fullName: 'Syed Ahmed',
      phone: '+91 98765 43210',
      email: demoCustomer.email,
      houseFlat: 'H.No 12-3-45',
      street: 'Akbar Bagh',
      area: 'Malakpet',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500036',
      isDefault: true,
    });

    const demoCustomerAddress2 = await Address.create({
      user: demoCustomer._id,
      fullName: 'Nusreth Mohammed',
      phone: '+91 91234 56789',
      email: demoCustomer.email,
      houseFlat: 'Saidabad Colony, Plot 22',
      street: 'Main Road',
      area: 'Saidabad',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500059',
      isDefault: false,
    });

    console.log('[Seed] Creating 10 Indian Customers...');
    const createdCustomers = [demoCustomer];
    for (const cust of indianCustomersData) {
      const u = await User.create({
        name: cust.name,
        email: cust.email,
        phone: cust.phone,
        password: 'Password@123',
        role: 'customer',
      });
      await Address.create({
        user: u._id,
        ...cust.address,
      });
      createdCustomers.push(u);
    }

    console.log('[Seed] Inserting 42+ Products...');
    const formattedProducts = productsData.map((prod) => {
      const discountPercentage = Math.round(
        ((prod.originalPrice - prod.price) / prod.originalPrice) * 100
      );
      const { isNew, ...rest } = prod as any;
      return {
        ...rest,
        slug: slugify(prod.name, { lower: true, strict: true }),
        discountPercentage,
        isNewArrival: Boolean(isNew),
        isOnSale: discountPercentage > 0,
      };
    });

    const createdProducts = await Product.insertMany(formattedProducts);

    // Update category product counts
    for (const cat of createdCategories) {
      const count = await Product.countDocuments({ category: cat.name });
      cat.productCount = count;
      await cat.save();
    }

    console.log('[Seed] Seeding Reviews...');
    const sampleReviews = [
      {
        userName: 'Pooja Reddy',
        rating: 5,
        title: 'Amazing quality! My 6yo loves the RC car!',
        comment: 'High speed and very sturdy. Has taken multiple wall crashes and still drives perfectly. LED lights look fantastic at night!',
      },
      {
        userName: 'Vikram Malhotra',
        rating: 5,
        title: 'Worth every rupee',
        comment: 'The building blocks fit just like Lego and the bucket is very convenient for keeping things tidy.',
      },
      {
        userName: 'Neha Singhania',
        rating: 4,
        title: 'Super soft plush bear',
        comment: 'Really soft material, no chemical smell, completely safe for my toddler.',
      },
      {
        userName: 'Syed Ahmed',
        rating: 5,
        title: 'Top notch packaging & prompt delivery',
        comment: 'Ordered as a birthday gift for my nephew. Delivered in 2 days in Hyderabad in flawless condition.',
      },
    ];

    for (let i = 0; i < Math.min(createdProducts.length, 15); i++) {
      const p = createdProducts[i];
      const rev = sampleReviews[i % sampleReviews.length];
      await Review.create({
        product: p._id,
        user: createdCustomers[i % createdCustomers.length]._id,
        userName: rev.userName,
        rating: rev.rating,
        title: rev.title,
        comment: rev.comment,
        verifiedPurchase: true,
      });
    }

    console.log('[Seed] Seeding Wishlist & Cart for Demo Customer...');
    // Seed wishlist with 3 items
    await Wishlist.create({
      user: demoCustomer._id,
      products: [createdProducts[0]._id, createdProducts[1]._id, createdProducts[3]._id],
    });

    // Seed cart matching Reference Image Screen 4 (LEGO Blocks, Teddy Bear, Remote Control Car)
    const legoProduct = createdProducts.find((p) => p.name.includes('LEGO')) || createdProducts[1];
    const teddyProduct = createdProducts.find((p) => p.name.includes('Teddy')) || createdProducts[2];
    const rcProduct = createdProducts.find((p) => p.name.includes('Remote Control')) || createdProducts[0];

    await Cart.create({
      user: demoCustomer._id,
      items: [
        { product: legoProduct._id, quantity: 1, price: legoProduct.price },
        { product: teddyProduct._id, quantity: 1, price: teddyProduct.price },
        { product: rcProduct._id, quantity: 1, price: rcProduct.price },
      ],
      couponCode: 'TOY20',
      discount: 400,
    });

    console.log('[Seed] Seeding 20+ Orders (Matching Screen 7 Admin Dashboard items)...');
    // Screen 7 shows recent orders:
    // #1001 Syed Ahmed ₹2,697 Delivered
    // #1002 Rahul Sharma ₹1,499 Processing
    // #1003 Priya Mehta ₹899 Pending
    // #1004 Arjun Kumar ₹1,299 Delivered
    const ordersToSeed = [
      {
        orderId: '#1001',
        customer: demoCustomer._id,
        customerDetails: { name: 'Syed Ahmed', email: 'syed.ahmed@example.com', phone: '+91 98765 43210' },
        items: [
          { product: legoProduct._id, name: legoProduct.name, image: legoProduct.thumbnail, price: legoProduct.price, quantity: 1, subtotal: legoProduct.price },
          { product: teddyProduct._id, name: teddyProduct.name, image: teddyProduct.thumbnail, price: teddyProduct.price, quantity: 1, subtotal: teddyProduct.price },
          { product: rcProduct._id, name: rcProduct.name, image: rcProduct.thumbnail, price: rcProduct.price, quantity: 1, subtotal: rcProduct.price },
        ],
        shippingAddress: {
          fullName: 'Syed Ahmed',
          phone: '+91 98765 43210',
          houseFlat: 'H.No 12-3-45',
          street: 'Akbar Bagh',
          area: 'Malakpet',
          city: 'Hyderabad',
          state: 'Telangana',
          pinCode: '500036',
        },
        paymentMethod: 'Razorpay',
        paymentStatus: 'Paid',
        orderStatus: 'Delivered',
        subtotal: 3097,
        shipping: 0,
        discount: 400,
        couponCode: 'TOY20',
        tax: 0,
        total: 2697,
        statusHistory: [
          { status: 'Order Placed', date: new Date(Date.now() - 5 * 86400000), note: 'Order placed' },
          { status: 'Confirmed', date: new Date(Date.now() - 4 * 86400000), note: 'Payment verified' },
          { status: 'Packed', date: new Date(Date.now() - 3 * 86400000), note: 'Packed at warehouse' },
          { status: 'Shipped', date: new Date(Date.now() - 2 * 86400000), note: 'Shipped with BlueDart' },
          { status: 'Delivered', date: new Date(Date.now() - 1 * 86400000), note: 'Delivered to recipient' },
        ],
      },
      {
        orderId: '#1002',
        customer: createdCustomers[2]._id,
        customerDetails: { name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '+91 98111 22334' },
        items: [
          { product: rcProduct._id, name: rcProduct.name, image: rcProduct.thumbnail, price: 1499, quantity: 1, subtotal: 1499 },
        ],
        shippingAddress: {
          fullName: 'Rahul Sharma',
          phone: '+91 98111 22334',
          houseFlat: 'B-24, Pocket 3',
          street: 'Mayur Vihar Phase 1',
          area: 'East Delhi',
          city: 'New Delhi',
          state: 'Delhi',
          pinCode: '110091',
        },
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        orderStatus: 'Processing',
        subtotal: 1499,
        shipping: 0,
        discount: 0,
        tax: 0,
        total: 1499,
        statusHistory: [
          { status: 'Order Placed', date: new Date(Date.now() - 1 * 86400000), note: 'Order placed' },
          { status: 'Processing', date: new Date(), note: 'Order undergoing packaging' },
        ],
      },
      {
        orderId: '#1003',
        customer: createdCustomers[3]._id,
        customerDetails: { name: 'Priya Mehta', email: 'priya.mehta@example.com', phone: '+91 98222 33445' },
        items: [
          { product: createdProducts[1]._id, name: createdProducts[1].name, image: createdProducts[1].thumbnail, price: 899, quantity: 1, subtotal: 899 },
        ],
        shippingAddress: {
          fullName: 'Priya Mehta',
          phone: '+91 98222 33445',
          houseFlat: '104, Sunrise Heights',
          street: 'Linking Road',
          area: 'Bandra West',
          city: 'Mumbai',
          state: 'Maharashtra',
          pinCode: '400050',
        },
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'Pending',
        orderStatus: 'Pending',
        subtotal: 899,
        shipping: 0,
        discount: 0,
        tax: 0,
        total: 899,
        statusHistory: [
          { status: 'Order Placed', date: new Date(), note: 'COD order verification pending' },
        ],
      },
      {
        orderId: '#1004',
        customer: createdCustomers[4]._id,
        customerDetails: { name: 'Arjun Kumar', email: 'arjun.kumar@example.com', phone: '+91 98333 44556' },
        items: [
          { product: createdProducts[3]._id, name: createdProducts[3].name, image: createdProducts[3].thumbnail, price: 1299, quantity: 1, subtotal: 1299 },
        ],
        shippingAddress: {
          fullName: 'Arjun Kumar',
          phone: '+91 98333 44556',
          houseFlat: 'Villa 18, Palm Meadows',
          street: 'Whitefield Main Rd',
          area: 'Whitefield',
          city: 'Bengaluru',
          state: 'Karnataka',
          pinCode: '560066',
        },
        paymentMethod: 'Credit/Debit Card',
        paymentStatus: 'Paid',
        orderStatus: 'Delivered',
        subtotal: 1299,
        shipping: 0,
        discount: 0,
        tax: 0,
        total: 1299,
        statusHistory: [
          { status: 'Order Placed', date: new Date(Date.now() - 6 * 86400000), note: 'Order placed' },
          { status: 'Delivered', date: new Date(Date.now() - 2 * 86400000), note: 'Delivered' },
        ],
      },
    ];

    // Add 16 more realistic orders to reach 20+ orders
    for (let i = 5; i <= 21; i++) {
      const randCust = createdCustomers[i % createdCustomers.length];
      const randProd = createdProducts[i % createdProducts.length];
      const statuses = ['Delivered', 'Shipped', 'Processing', 'Confirmed', 'Delivered'];
      const currentStatus = statuses[i % statuses.length] as any;
      const orderTotal = randProd.price + (randProd.price < 999 ? 99 : 0);

      ordersToSeed.push({
        orderId: `#${1000 + i}`,
        customer: randCust._id,
        customerDetails: { name: randCust.name, email: randCust.email, phone: randCust.phone },
        items: [
          {
            product: randProd._id,
            name: randProd.name,
            image: randProd.thumbnail,
            price: randProd.price,
            quantity: 1,
            subtotal: randProd.price,
          },
        ],
        shippingAddress: {
          fullName: randCust.name,
          phone: randCust.phone,
          houseFlat: `Flat ${100 + i}`,
          street: 'Colony Main Street',
          area: 'Central Zone',
          city: 'Hyderabad',
          state: 'Telangana',
          pinCode: '500034',
        },
        paymentMethod: i % 2 === 0 ? 'Razorpay' : 'UPI',
        paymentStatus: currentStatus === 'Pending' ? 'Pending' : 'Paid',
        orderStatus: currentStatus,
        subtotal: randProd.price,
        shipping: randProd.price < 999 ? 99 : 0,
        discount: 0,
        tax: 0,
        total: orderTotal,
        statusHistory: [
          { status: 'Order Placed', date: new Date(Date.now() - (25 - i) * 86400000), note: 'Order placed' },
          { status: currentStatus, date: new Date(Date.now() - (24 - i) * 86400000), note: `Status: ${currentStatus}` },
        ],
      });
    }

    await Order.insertMany(ordersToSeed);

    console.log('[Seed] Database successfully seeded with:');
    console.log(`- ${createdCategories.length} Categories`);
    console.log(`- ${createdProducts.length} Products`);
    console.log(`- ${couponsData.length} Coupons`);
    console.log(`- ${createdCustomers.length + 1} Users (1 Admin, 1 Demo Customer, 10 Customers)`);
    console.log(`- ${ordersToSeed.length} Orders`);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    throw error;
  }
};
