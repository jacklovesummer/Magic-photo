
import { ThemeType, TransformationOption } from './types';

export const TIME_TRAVEL_OPTIONS: TransformationOption[] = [
  { id: 'tang', labelEn: 'Tang Dynasty', labelZh: '大唐盛世', value: 'the ornate traditional hanfu silk clothing and headwear of the Tang Dynasty' },
  { id: 'gatsby', labelEn: '1920s Gatsby', labelZh: '1920s 盖茨比', value: '1920s Great Gatsby flapper fashion, jazz club background, art deco style' },
  { id: 'disco', labelEn: '1980s Disco', labelZh: '1980s 迪斯科', value: '1980s Retro Disco style, neon lights, glittery sequin outfit, big hair' },
  { id: 'madmax', labelEn: 'Mad Max', labelZh: '疯狂麦克斯', value: 'post-apocalyptic wasteland warrior gear, weathered leather armor, desert sand background' },
  { id: 'caveman', labelEn: 'Caveman', labelZh: '史前原始人', value: 'prehistoric caveman fur clothing, rocky cave environment, primal aesthetic' },
  { id: 'cyberpunk', labelEn: '2500s Cyberpunk', labelZh: '赛博朋克 2500', value: 'futuristic high-tech robotic fashion, glowing neon implants, rain-slicked city streets' }
];

export const PAINTING_OPTIONS: TransformationOption[] = [
  { id: 'scream', labelEn: 'The Scream', labelZh: '呐喊', value: "the expressive swirling style of Edvard Munch's 'The Scream'" },
  { id: 'earring', labelEn: 'Pearl Earring', labelZh: '戴珍珠耳环的少女', value: "the lighting and costume of Vermeer's 'Girl with a Pearl Earring'" },
  { id: 'monalisa', labelEn: 'Mona Lisa', labelZh: '蒙娜丽莎', value: "the iconic pose and sfumato technique of Leonardo da Vinci's 'Mona Lisa'" },
  { id: 'starry', labelEn: 'Starry Night', labelZh: '星月夜', value: "Van Gogh's oil painting style with intense swirls of blue and gold" },
  { id: 'gothic', labelEn: 'American Gothic', labelZh: '美国哥特式', value: "the somber aesthetic and farmhouse backdrop of Grant Wood's 'American Gothic'" }
];

export const MORPH_PATHS: TransformationOption[] = [
  // Marvel Heroes
  { id: 'ironman', labelEn: 'Iron Man', labelZh: '钢铁侠', value: 'wearing the iconic red and gold metallic nano-tech Mark 85 armor with a glowing arc reactor' },
  { id: 'cap', labelEn: 'Cap America', labelZh: '美国队长', value: 'wearing the patriotic stars and stripes tactical suit and holding a round vibranium shield' },
  { id: 'spidey', labelEn: 'Spider-Man', labelZh: '蜘蛛侠', value: 'wearing the sleek red and blue Spider-Man suit, web-slinging through a city skyline' },
  { id: 'thor', labelEn: 'Thor', labelZh: '雷神索尔', value: 'wearing Asgardian plate armor, a red cape, and holding the hammer Mjolnir with lightning crackling around' },
  { id: 'widow', labelEn: 'Black Widow', labelZh: '黑寡妇', value: 'wearing a tactical black stealth jumpsuit with glowing batons and secret agent gear' },
  { id: 'scarlet', labelEn: 'Scarlet Witch', labelZh: '绯红女巫', value: 'wearing the red Tiara and dark crimson robes with red chaos magic energy swirling around' },
  
  // DC Heroes
  { id: 'batman', labelEn: 'Batman', labelZh: '蝙蝠侠', value: 'wearing the heavy tactical black bat-suit with a scalloped cape and cowl, in a dark rainy alleyway' },
  { id: 'superman', labelEn: 'Superman', labelZh: '超人', value: 'wearing the classic blue suit with a red cape and S-shield, flying high against a bright sun' },
  { id: 'ww', labelEn: 'Wonder Woman', labelZh: '神奇女侠', value: 'wearing golden Amazonian battle armor with the Lasso of Truth and a tiara' },
  { id: 'flash', labelEn: 'The Flash', labelZh: '闪电侠', value: 'wearing a friction-resistant red speedster suit with yellow lightning bolts trailing behind' },
  
  // Villains
  { id: 'thanos', labelEn: 'Thanos', labelZh: '灭霸', value: 'having purple skin, vertical chin ridges, massive gold battle armor, and wearing the Infinity Gauntlet' },
  { id: 'joker', labelEn: 'The Joker', labelZh: '小丑', value: 'having messy green hair, smeared white face paint, chaotic red lipstick, and wearing a bright purple suit' },
  { id: 'harley', labelEn: 'Harley Quinn', labelZh: '哈莉·奎茵', value: 'having dyed pink and blue pigtails, smeared makeup, and wearing colorful punk-rock jester attire' }
];

export const SLOT_OPTIONS = {
  occupations: [
    { en: 'Sumo Wrestler', zh: '相扑手' },
    { en: 'Victorian Gentleman', zh: '维多利亚绅士' },
    { en: 'Bodybuilder', zh: '健美运动员' },
    { en: 'Astronaut', zh: '宇航员' },
    { en: 'Samurai', zh: '武士' },
    { en: 'Cybernetic Ninja', zh: '赛博忍者' },
    { en: 'Ancient Philosopher', zh: '古希腊哲学家' },
    { en: 'Opera Singer', zh: '歌剧演员' },
    { en: 'Lumberjack', zh: '伐木工' },
    { en: 'Detective', zh: '私家侦探' },
    { en: 'Pirate Captain', zh: '海盗船长' },
    { en: 'Yoga Instructor', zh: '瑜伽教练' },
    { en: 'Metal Guitarist', zh: '重金属吉他手' },
    { en: 'Medieval Wizard', zh: '中世纪巫师' },
    { en: 'Secret Agent', zh: '王牌特工' }
  ],
  outfits: [
    { en: 'a pink tutu', zh: '粉色芭蕾裙' },
    { en: 'a baby costume', zh: '婴儿装' },
    { en: 'clown shoes', zh: '小丑鞋' },
    { en: 'a shark onesie', zh: '鲨鱼睡衣' },
    { en: 'medieval armor', zh: '中世纪盔甲' },
    { en: 'an inflatable dinosaur suit', zh: '充气恐龙服' },
    { en: 'a sparkling mermaid tail', zh: '闪亮鱼尾' },
    { en: 'a giant hot dog costume', zh: '巨型热狗装' },
    { en: 'a glittering disco jumpsuit', zh: '迪斯科连体衣' },
    { en: 'a gold foil tuxedo', zh: '金箔燕尾服' },
    { en: 'bathrobe and slippers', zh: '睡袍拖鞋' },
    { en: 'a strawberry hat', zh: '草莓帽子' },
    { en: 'a post-it note suit', zh: '便利贴西装' },
    { en: 'a retro diving suit', zh: '复古潜水服' },
    { en: 'banana pajamas', zh: '香蕉印花睡衣' }
  ],
  actions: [
    { en: 'eating pizza', zh: '吃披萨' },
    { en: 'walking a poodle', zh: '遛贵宾犬' },
    { en: 'doing ballet', zh: '跳芭蕾' },
    { en: 'playing ukulele', zh: '弹尤克里里' },
    { en: 'sipping high tea', zh: '喝下午茶' },
    { en: 'riding a unicycle', zh: '骑独轮车' },
    { en: 'juggling chainsaws', zh: '玩链锯杂耍' },
    { en: 'taking a bubble bath', zh: '洗泡泡浴' },
    { en: 'mowing lawn with scissors', zh: '用剪刀剪草' },
    { en: 'knitting for a cactus', zh: '给仙人掌织毛衣' },
    { en: 'conducting a cat orchestra', zh: '指挥猫咪乐队' },
    { en: 'frying an egg on sidewalk', zh: '在路边煎蛋' },
    { en: 'fighting a dragon', zh: '与恶龙搏斗' },
    { en: 'reading upside down', zh: '倒看报纸' },
    { en: 'surfing on a pancake', zh: '在煎饼上冲浪' }
  ]
};

export const UI_STRINGS = {
  en: {
    tagline: "Reimagining you across time and space",
    step1Title: "Step 1: Get Your Photo",
    step1Desc: "Take a photo or upload one",
    openCamera: "OPEN CAMERA",
    upload: "UPLOAD",
    takePhoto: "TAKE PHOTO",
    initializing: "Initializing...",
    cameraError: "Something's Wrong",
    retry: "RETRY",
    close: "CLOSE",
    chooseEra: "Choose Your Era",
    artGallery: "The Art Gallery",
    artTip: "Pro Tip: Mimic the facial expression of the painting!",
    identityRoulette: "Identity Roulette",
    occupation: "Occupation",
    outfit: "Outfit",
    action: "Action",
    shuffle: "SHUFFLE",
    generate: "GENERATE",
    evolution: "The Hero Roster",
    morphing: "Morphing...",
    regenerate: "REGENERATE",
    save: "SAVE",
    back: "BACK",
    previewTitle: "Masterpiece Preview",
    previewDesc: "Strike a pose and start the magic!",
    fullScreen: "Click anywhere to close",
    footer: "Experimental Photo Transformation App"
  },
  zh: {
    tagline: "跨越时空，重塑自我",
    step1Title: "第一步：获取照片",
    step1Desc: "拍照或上传已有照片",
    openCamera: "开启摄像头",
    upload: "上传照片",
    takePhoto: "点击拍照",
    initializing: "启动中...",
    cameraError: "发生错误",
    retry: "重试",
    close: "关闭",
    chooseEra: "选择一个时代",
    artGallery: "艺术长廊",
    artTip: "提示：尽量模仿画作中的神情，效果更佳！",
    identityRoulette: "身份老虎机",
    occupation: "职业",
    outfit: "服装",
    action: "动作",
    shuffle: "随机抽取",
    generate: "立即生成",
    evolution: "英雄名录",
    morphing: "正在魔法变身...",
    regenerate: "重新生成",
    save: "保存图片",
    back: "返回重选",
    previewTitle: "作品预览",
    previewDesc: "拍张照片，开始你的变身之旅！",
    fullScreen: "点击任意位置退出全屏",
    footer: "实验性 AI 图像变身应用"
  }
};

export const PROMPT_TEMPLATES = {
  [ThemeType.TIME_TRAVEL]: (clothing: string) => `IMAGE SOURCE: Use the person in the attached image as the base. TRANSFORM: Render this specific person wearing ${clothing}. You must maintain the subject's unique facial features and expression. Identity preservation is mandatory. Cinematic lighting.`,
  [ThemeType.FAMOUS_PAINTING]: (paintingStyle: string) => `IMAGE SOURCE: Look at the person in the attached image. MASTERPIECE: Re-render this specific person using ${paintingStyle}. You must replace the original figure's face with THIS person's face. Keep their unique facial structure and expression. Match the artist's brushstrokes and palette precisely.`,
  [ThemeType.CRAZY_IDENTITY]: (identity: string) => `IMAGE SOURCE: Use the person in the attached photo as the ONLY base. IDENTITY: Transform this specific person into ${identity}. Identity preservation is the top priority—the face must be unmistakably and exactly the same person from the original photo. Realistic and high detail.`,
  [ThemeType.MORPHING]: (transformation: string) => `IMAGE SOURCE: Look at the person in the provided photo. This is our subject. DO NOT USE ANY OTHER FACE. TRANSFORM: Render THIS EXACT SUBJECT with the following attributes: ${transformation}. The final character MUST HAVE THE SUBJECT'S EYES, NOSE, MOUTH AND FACE SHAPE. Do not create a generic character face. Blend the character's costume and skin textures onto the subject's existing face. Professional movie cinematic style, heroic lighting, extreme detail.`
};

export const LOADING_MESSAGES = {
  en: ["Blending timelines...", "Applying digital makeup...", "Consulting art masters...", "Polishing pixels..."],
  zh: ["正在融合时空...", "正在数字化妆...", "正在咨询大师...", "正在打磨像素..."]
};
