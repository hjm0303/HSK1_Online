const HSK_COURSES = [
  {
    id: "hsk1",
    level: 1,
    label: "HSK 1",
    title: "HSK 1 Standard Course",
    description: "基础汉语课程 · 15课",
    available: true,
    lessons: [
      {
        id: 1,
        title: "你好",
        pinyin: "Nǐ hǎo",
        file: "lesson1-1.html",
        locked: false
      },
      {
        id: 2,
        title: "谢谢你",
        pinyin: "Xièxie nǐ",
        file: "lesson1-2.html",
        locked: false
      },
      {
        id: 3,
        title: "你叫什么名字",
        pinyin: "Nǐ jiào shénme míngzi",
        file: "lesson1-3.html",
        locked: false
      },
      {
        id: 4,
        title: "她是我的汉语老师",
        pinyin: "Tā shì wǒ de hànyǔ lǎoshī",
        file: "lesson1-4.html",
        locked: false
      },
      {
        id: 5,
        title: "她女儿今年二十岁",
        pinyin: "Tā nǚ'ér jīnnián èrshí suì",
        file: "lesson1-5.html",
        locked: false
      },
      {
        id: 6,
        title: "我会说汉语",
        pinyin: "Wǒ huì shuō Hànyǔ",
        file: "lesson1-6.html",
        locked: false
      },
      {
        id: 7,
        title: "今天几号",
        pinyin: "Jīntiān jǐ hào",
        file: "lesson1-7.html",
        locked: false
      },
      {
        id: 8,
        title: "我想喝茶",
        pinyin: "Wǒ xiǎng hē chá",
        file: "lesson1-8.html",
        locked: false
      },
      {
        id: 9,
        title: "你儿子在哪里工作",
        pinyin: "Nǐ érzi zài nǎlǐ gōngzuò",
        file: "lesson1-9.html",
        locked: false
      },
      {
        id: 10,
        title: "我能坐这儿吗",
        pinyin: "Wǒ néng zuò zhèr ma",
        file: "lesson1-10.html",
        locked: false
      },
      {
        id: 11,
        title: "现在几点",
        pinyin: "Xiànzài jǐ diǎn",
        file: "lesson1-11.html",
        locked: false
      },
      {
        id: 12,
        title: "明天天气怎么样",
        pinyin: "Míngtiān tiānqì zěnmeyàng",
        file: "lesson1-12.html",
        locked: false
      },
      {
        id: 13,
        title: "他在学做中国菜呢",
        pinyin: "Tā zài xué zuò Zhōngguó cài ne",
        file: "lesson1-13.html",
        locked: false
      },
      {
        id: 14,
        title: "她买了不少衣服",
        pinyin: "Tā mǎi le bù shǎo yīfu",
        file: "lesson1-14.html",
        locked: false
      },
      {
        id: 15,
        title: "我是坐飞机来的",
        pinyin: "Wǒ shì zuò fēijī lái de",
        file: "lesson1-15.html",
        locked: false
      }
    ]
  },
  {
    id: "hsk2",
    level: 2,
    label: "HSK 2",
    title: "HSK 2 Standard Course",
    description: "基础汉语课程 · 15课",
    available: true,
    lessons: [
	  {
        id: 1,
        title: "九月去北京旅游最好",
        pinyin: "Jiǔyuè qù Běijīng lǚyóu zuì hǎo",
        file: "lesson2-1.html",
        locked: false
      },
      {
        id: 2,
        title: "我每天六点起床",
        pinyin: "Wǒ měitiān liù diǎn qǐchuáng",
        file: "lesson2-2.html",
        locked: false
      },
      {
        id: 3,
        title: "左边那个红色的是我的",
        pinyin: "Zuǒbiān nà gè hóngsè de shì wǒ de",
        file: "lesson2-3.html",
        locked: false
      },
      {
        id: 4,
        title: "这个工作是他帮我介绍的",
        pinyin: "Zhège gōngzuò shì tā bāng wǒ jièshào de",
        file: "lesson2-4.html",
        locked: false
      },
      {
        id: 5,
        title: "就买这件吧",
        pinyin: "Jiù mǎi zhè jiàn ba",
        file: "lesson2-5.html",
        locked: false
      },
      {
        id: 6,
        title: "你怎么不吃了?",
        pinyin: "Nǐ zěn me bù chī le?",
        file: "lesson2-6.html",
        locked: false
      },
      {
        id: 7,
        title: "你家离公司远吗?",
        pinyin: "Nǐ jiā lí gōngsī yuǎn ma?",
        file: "lesson2-7.html",
        locked: false
      },
      {
        id: 8,
        title: "让我想想再告诉你",
        pinyin: "Ràng wǒ xiǎng xiǎng zài gàosù nǐ",
        file: "lesson2-8.html",
        locked: false
      },
      {
        id: 9,
        title: "题太多，我没做完",
        pinyin: "Tí tài duō, wǒ méi zuò wán",
        file: "lesson2-9.html",
        locked: false
      },
      {
        id: 10,
        title: "别找了，手机在桌子上呢",
        pinyin: "Bié zhǎole, shǒujī zài zhuōzǐ shàng ne",
        file: "lesson2-10.html",
        locked: false
      },
      {
        id: 11,
        title: "他比我大三岁",
        pinyin: "Tā bǐ wǒ dà sān suì",
        file: "lesson2-11.html",
        locked: false
      },
      {
        id: 12,
        title: "你穿得太少了",
        pinyin: "Nǐ chuān dé tài shǎo le",
        file: "lesson2-12.html",
        locked: false
      },
      {
        id: 13,
        title: "门开着呢",
        pinyin: "Mén kāi zhe ne",
        file: "lesson2-13.html",
        locked: false
      },
      {
        id: 14,
        title: "你看过那个电影吗？",
        pinyin: "Nǐ kàn guò nà gè diàn yǐng ma?",
        file: "lesson2-14.html",
        locked: false
      },
      {
        id: 15,
        title: "新年就要到了",
        pinyin: "Xīnnián jiù yào dàole",
        file: "lesson2-15.html",
        locked: false
      } 
	
	
	]
  },
  {
    id: "hsk3",
    level: 3,
    label: "HSK 3",
    title: "HSK 3 Standard Course",
    description: "课程内容即将更新",
    available: true,
    lessons: [
        {
        id: 1,
        title: "周末你有什么打算",
        pinyin: "Zhōumò nǐ yǒu shé me dǎsuàn",
        file: "lesson3-1.html",
        locked: true
       },
       {
        id: 2,
        title: "他什么时候回来？",
        pinyin: "Tā shénme shíhòu huílái ？",
        file: "lesson3-2.html",
        locked: true
       },
       {
        id: 3,
        title: "桌子上放着很多饮料",
        pinyin: "Zhuōzǐ shàng fàngzhe hěnduō yǐnliào",
        file: "lesson3-3.html",
        locked: true
       },
       {
        id: 4,
        title: "她总是笑着跟客人说话",
        pinyin: "Tā zǒngshì xiàozhe gēn kèrén shuōhuà",
        file: "lesson3-4.html",
        locked: true
       },
       {
        id: 5,
        title: "我最近越来越胖了",
        pinyin: "Wǒ zuìjìn yuèláiyuè pàng le",
        file: "lesson3-5.html",
        locked: true
       },
       {
        id: 6,
        title: "怎么突然找不到了？",
        pinyin: "Zěnme tūrán zhǎo bú dào le?",
        file: "lesson3-6.html",
        locked: true
       },
       {
        id: 7,
        title: "我跟她都认识五年了",
        pinyin: "Wǒ gēn tā dōu rènshi wǔ nián le",
        file: "lesson3-7.html",
        locked: true 
       },
       {
        id: 8,
        title: "你去哪儿我就去哪儿",
        pinyin: "Nǐ qù nǎr, wǒ jiù qù nǎr",
        file: "lesson3-8.html",
        locked: true 
       },
       {
        id: 9,
        title: "她的汉语说得跟中国人一样好",
        pinyin: "Tā de Hànyǔ shuō de gēn Zhōngguórén yíyàng hǎo",
        file: "lesson3-9.html",
        locked: true 
       },
       {
        id: 10,
        title: "数学比历史难多了",
        pinyin: "Shùxué bǐ lìshǐ nán duō le",
        file: "lesson3-10.html",
        locked: true 
       },
       {
        id: 11,
        title: "别忘了把空调关了",
        pinyin: "Bié wàng le bǎ kōngtiáo guān le",
        file: "lesson3-11.html",
        locked: true 
       },
       {
        id: 12,
        title: "把重要的东西放在我这儿吧",
        pinyin: "Bǎ zhòngyào de dōngxi fàng zài wǒ zhèr ba",
        file: "lesson3-12.html",
        locked: true 
       },
       {
        id: 13,
        title: "我是走回来的",
        pinyin: "Wǒ shì zǒu huílai de",
        file: "lesson3-13.html",
        locked: true 
       },
       {
        id: 14,
        title: "你把水果拿过来",
        pinyin: "Nǐ bǎ shuǐguǒ ná guòlai",
        file: "lesson3-14.html",
        locked: true 
       },
       {
        id: 15,
        title: "其他都没什么问题",
        pinyin: "Qítā dōu méi shénme wèntí",
        file: "lesson3-15.html",
        locked: true  
       },
       {
        id: 16,
        title: "我现在累得下了班就想睡觉",
        pinyin: "Wǒ xiànzài lèi de xià le bān jiù xiǎng shuìjiào",
        file: "lesson3-16.html",
        locked: true 
       },
       {
        id: 17,
        title: "谁都有办法看好你的“病”",
        pinyin: "Shéi dōu yǒu bànfǎ kànhǎo nǐ de “bìng”",
        file: "lesson3-17.html",
        locked: true 
       },
       {
        id: 18,
        title: "我相信他们会同意的",
        pinyin: "Wǒ xiāngxìn tāmen huì tóngyì de",
        file: "lesson3-18.html",
        locked: true 
       },
       {
        id: 19,
        title: "你没看出来吗？",
        pinyin: "Nǐ méi kàn chūlai ma?",
        file: "lesson3-19.html",
        locked: true 
       },
       {
        id: 20,
        title: "我被他影响了",
        pinyin: "Wǒ bèi tā yǐngxiǎng le",
        file: "lesson3-20.html",
        locked: true 
       }
       ]
  },
  {
    id: "hsk4",
    level: 4,
    label: "HSK 4",
    title: "HSK 4 Standard Course",
    description: "课程内容即将更新",
    available: false,
    lessons: []
  }
];
