// Helper functions
const collegeCols = []; // Gets filled up on init
function getColor(key) {
  return collegeCols[key] || [128, 128, 128]; // Default color
}

function getTeam(key) {
  teams = {
    ATL: ["Atlanta Hawks", "Atlanta, GA", "https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg"],
    BKN: ["Brooklyn Nets", "New York, NY", "https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg"],
    BOS: ["Boston Celtics", "Boston, MA", "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg"],
    CHA: ["Charlotte Hornets", "Charlotte, NC", "https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg"],
    CHI: ["Chicago Bulls", "Chicago, IL", "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg"],
    CLE: ["Cleveland Cavaliers", "Cleveland, OH", "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cleveland_Cavaliers_logo.svg"],
    DAL: ["Dallas Mavericks", "Dallas, TX", "https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg"],
    DEN: ["Denver Nuggets", "Denver, CO", "https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg"],
    DET: ["Detroit Pistons", "Detroit, MI", "https://upload.wikimedia.org/wikipedia/commons/7/7c/Pistons_logo17.svg"],
    GSW: ["Golden State Warriors", "San Francisco, CA", "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg"],
    HOU: ["Houston Rockets", "Houston, TX", "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg"],
    IND: ["Indiana Pacers", "Indiana, IN", "https://upload.wikimedia.org/wikipedia/en/1/1b/Indiana_Pacers.svg"],
    LAC: ["Los Angeles Clippers", "Los Angeles, CA", "https://upload.wikimedia.org/wikipedia/en/b/bb/Los_Angeles_Clippers_%282015%29.svg"],
    LAL: ["Los Angeles Lakers", "Los Angeles, CA", "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg"],
    MEM: ["Memphis Grizzlies", "Memphis, TN", "https://upload.wikimedia.org/wikipedia/en/f/f1/Memphis_Grizzlies.svg"],
    MIA: ["Miami Heat", "Miami, FL", "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg"],
    MIL: ["Milwaukee Bucks", "Milwaukee, WI", "https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg"],
    MIN: ["Minnesota Timberwolves", "Minnesota, MN", "https://upload.wikimedia.org/wikipedia/en/c/c2/Minnesota_Timberwolves_logo.svg"],
    NOP: ["New Orleans Pelicans", "New Orleans, LA", "https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg"],
    NYK: ["New York Knicks", "New York, NY", "https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Knicks_logo.svg"],
    OKC: ["Oklahoma City Thunder", "Oklahoma City, OK", "https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg"],
    ORL: ["Orlando Magic", "Orlando, FL", "https://upload.wikimedia.org/wikipedia/en/1/10/Orlando_Magic_logo.svg"],
    PHI: ["Philadelphia 76ers", "Philadelphia, PA", "https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg"],
    PHX: ["Phoenix Suns", "Phoenix, AZ", "https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg"],
    POR: ["Portland Trail Blazers", "Portland, OR", "https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg"],
    SAC: ["Sacramento Kings", "Sacramento, CA", "https://upload.wikimedia.org/wikipedia/en/c/c7/SacramentoKings.svg"],
    SAS: ["San Antonio Spurs", "San Antonio, TX", "https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg"],
    TOR: ["Toronto Raptors", "Toronto, ON", "https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg"],
    UTA: ["Utah Jazz", "Salt Lake City, UT", "https://upload.wikimedia.org/wikipedia/en/5/52/Utah_Jazz_logo_2022.svg"],
    WAS: ["Washington Wizards", "Washington D.C.", "https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg"],
    CHH: ["Charlotte Hornets", "Charlotte, NC", "https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg"],
    NJN: ["New Jersey Nets", "New Jersey, NJ", "https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg"],
    NOH: ["New Orleans Hornets", "New Orleans, LA", "https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg"],
    NOK: ["New Orleans Hornets", "New Orleans, LA", "https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg"],
    SEA: ["Seattle SuperSonics", "Seattle, WA", "https://upload.wikimedia.org/wikipedia/en/a/a4/Seattle_SuperSonics_logo.svg"],
    VAN: ["Vancouver Grizzlies", "Vancouver, BC", "https://upload.wikimedia.org/wikipedia/en/1/1e/Vancouver_Grizzlies_logo.svg"],
  };
  return teams[key] || key;
}

const colors = [
  [145, 151, 255],
  [255, 195, 100],
  [255, 187, 88],
  [0, 139, 101],
  [179, 238, 133],
  [97, 182, 212],
  [0, 152, 111],
  [84, 111, 0],
  [204, 148, 207],
  [96, 139, 0],
  [255, 186, 176],
  [255, 147, 228],
  [116, 234, 222],
  [247, 150, 240],
  [181, 140, 13],
  [106, 246, 147],
  [0, 165, 220],
  [122, 240, 203],
  [0, 170, 170],
  [81, 228, 226],
  [207, 201, 126],
  [0, 118, 130],
  [0, 190, 255],
  [178, 117, 155],
  [203, 195, 255],
  [190, 206, 127],
  [0, 236, 215],
  [81, 236, 255],
  [230, 126, 168],
  [166, 94, 76],
  [53, 147, 52],
  [95, 130, 237],
  [161, 98, 187],
  [18, 123, 157],
  [155, 66, 192],
  [0, 153, 254],
  [97, 192, 147],
  [200, 71, 138],
  [255, 146, 214],
  [199, 130, 229],
  [0, 233, 230],
  [0, 233, 255],
  [205, 73, 25],
  [254, 176, 110],
  [172, 137, 75],
  [0, 156, 205],
  [93, 103, 244],
  [0, 117, 195],
  [183, 60, 40],
  [65, 167, 206],
  [101, 182, 92],
  [166, 91, 234],
  [255, 200, 255],
  [137, 198, 255],
  [0, 230, 255],
  [236, 115, 199],
  [186, 54, 77],
  [242, 117, 89],
  [251, 74, 84],
  [0, 224, 220],
  [174, 176, 46],
  [0, 147, 61],
  [0, 148, 101],
  [189, 180, 10],
  [217, 197, 255],
  [112, 241, 233],
  [239, 132, 182],
  [0, 212, 255],
  [24, 239, 233],
  [0, 226, 255],
  [242, 161, 243],
  [141, 123, 209],
  [223, 187, 92],
  [132, 136, 0],
  [221, 176, 235],
  [218, 79, 124],
  [0, 206, 189],
  [255, 164, 131],
  [153, 232, 79],
  [245, 159, 146],
  [95, 169, 0],
  [106, 166, 225],
  [200, 101, 153],
  [0, 219, 252],
  [39, 152, 22],
  [181, 155, 66],
  [181, 193, 112],
  [83, 206, 84],
  [174, 101, 0],
  [0, 148, 47],
  [172, 44, 69],
  [228, 127, 200],
  [84, 184, 255],
  [182, 70, 107],
  [217, 50, 93],
  [255, 152, 205],
  [246, 174, 255],
  [255, 187, 215],
  [255, 177, 255],
  [0, 166, 174],
];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Duplicate player names:
// Ken Johnson
// Charles Jones
// Chris Wright
// Tony Mitchell
// Mark Jones
// Luke Jackson
// Tim Hardaway
// Larry Johnson
// Reggie Williams
// Dee Brown
// Greg Smith
// Mark Davis
// Charles Smith
// Eddie Johnson
// Bobby Jones
// Chris Johnson
// Walker Russell
// Michael Smith
// Glen Rice
// Glenn Robinson
// David Lee
// Chris Smith
// Mike Dunleavy
// Gerald Henderson
// David Vaughn
// Marcus Williams
// Cedric Henderson