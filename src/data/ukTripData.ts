import { Trip } from '../types/trip';

export const ukTrip: Trip = {
  id: 'uk-2024',
  title: '英国历史文化深度游',
  subtitle: 'A Journey Through British Civilization: From Roman Outposts to Modern Institutions',
  traveler: 'Justin',
  date: '2025年12月',
  days: [
    {
      day: 1,
      title: '伦敦 → 温莎城堡 → 牛津',
      cities: ['伦敦', '温莎', '牛津'],
      attractions: [
        {
          id: 'windsor-castle',
          nameCn: '温莎城堡',
          nameEn: 'Windsor Castle',
          type: '皇家城堡',
          imageKeyword: 'Windsor+Castle+England',
          historicalContext: '世界上最古老、仍在使用的皇家居所。1066年诺曼征服后由威廉一世建立，至今已有近1000年历史。这不是博物馆，而是"活着的制度"——现任英国君主仍在此居住和工作，举行国事活动。',
          experience: '圆塔(Round Tower)展示诺曼式防御建筑精髓，俯瞰泰晤士河谷战略要地，体现了诺曼人对军事地理的精准把控。圣乔治礼拜堂(St George\'s Chapel)是哥特式垂直建筑的杰作，作为嘉德骑士团(Order of the Garter)总部，见证了英国骑士传统的延续。礼拜堂内安葬着亨利八世、查理一世等多位英国君主，是王权历史的缩影。国家套房(State Apartments)至今仍用于国事活动，华丽的装饰和精美的艺术品收藏展示着英国王权的连续性。',
          insight: '温莎不是权力的"展示"，而是权力的"日常化"。它告诉你：王权已经从"征服工具"（诺曼军事要塞）变成"国家象征"（君主立宪制的视觉载体）。在这里，你看到的是制度如何通过空间的持续使用来维持其合法性。',
          relatedPeople: ['威廉一世（征服者威廉，1066年建立城堡）', '亨利八世（都铎王朝，安葬于圣乔治礼拜堂）', '查理一世（英国内战时期国王，安葬于此）'],
          historicalPeriod: '诺曼征服(1066年) - 至今'
        },
        {
          id: 'oxford-university',
          nameCn: '牛津大学',
          nameEn: 'University of Oxford',
          type: '学院制大学',
          imageKeyword: 'Oxford+University+Radcliffe+Camera',
          historicalContext: '英语世界最古老大学（12世纪成立），但牛津不是"一所大学"，而是38个自治学院的联邦体系。每个学院都是独立的权力单元，拥有自己的财产、图书馆、礼拜堂和庭院。大学本身只是协调平台，真正的教育和生活发生在学院内部。这种学院制源自修道院模式，将知识制度化保存和传递。',
          experience: '参观了Balliol College（1263年创立，培养过多位英国首相）、Merton College（1264年创立，学院制原型）、Christ Church College（亨利八世创立，牛津最宏伟学院，培养过13位首相，《哈利波特》大礼堂取景地）、All Souls College（极其特殊的学院，没有本科生只有研究员，为百年战争阵亡者祈祷而建）。博德利图书馆(Bodleian Library)是英国第二大图书馆，作为法定送存图书馆，地下隧道连接各学院，书籍不外借。拉德克利夫圆楼(Radcliffe Camera)是标志性的圆形阅览室。Martyrs\' Memorial纪念血腥玛丽时期被烧死的新教殉道者Cranmer、Latimer、Ridley三位主教，是宗教改革血腥记忆的见证。',
          insight: '牛津不是"知识的博物馆"，而是"精英复制机器"。它的封闭性（学院围墙）、排他性（严格的入学标准）、学院自治（财产独立），都是为了确保：知识在这里被制度化保存、传递、控制。学院制=修道院模式的世俗化，导师制(Tutorial System)=苏格拉底式一对一教学。这套系统运行了800年，塑造了英国精英的思维方式和气质。',
          relatedPeople: ['亨利八世（创立Christ Church）', 'Cranmer、Latimer、Ridley（新教殉道者）', '历任13位英国首相（Christ Church校友）'],
          historicalPeriod: '中世纪大学形成(12-14世纪) - 至今'
        },
        {
          id: 'bodleian-library',
          nameCn: '博德利图书馆',
          nameEn: 'Bodleian Library',
          type: '图书馆',
          imageKeyword: 'Bodleian+Library+Oxford',
          historicalContext: '英国第二大图书馆（仅次于大英图书馆），作为英国六大法定送存图书馆之一，每本在英国出版的书籍都必须送存一份副本。建立于1602年，以Thomas Bodley爵士命名。',
          experience: '见证了法定送存制度(Legal Deposit)的运作，这是知识制度化保存的典范。图书馆通过地下隧道系统连接牛津各学院，书籍不外借的传统确保了知识的持续可及性。Divinity School的哥特式扇形天花板是建筑杰作，曾是神学辩论场所。',
          insight: '知识的制度化保存，确保学术连续性。法定送存制度体现了国家对知识保存的承诺，而不外借政策则保证了原始文献的完整性。这是英国式的"知识主权"。',
          historicalPeriod: '1602年至今'
        },
        {
          id: 'christ-church',
          nameCn: '基督堂学院',
          nameEn: 'Christ Church College',
          type: '学院',
          imageKeyword: 'Christ+Church+Oxford+Great+Hall',
          historicalContext: '1546年由亨利八世创立，是牛津最宏伟的学院。其独特之处在于学院的礼拜堂同时也是牛津大教堂(Oxford Cathedral)，这种"双重身份"体现了宗教改革后王权对教会的控制。学院培养了13位英国首相，是权力精英的摇篮。',
          experience: '大礼堂(Great Hall)气势恢宏，《哈利波特》电影在此取景，展现了英国精英教育的传统空间设计。墙上悬挂着历代校友和捐赠者的肖像，视觉化地展示着精英网络的延续。教堂-学院的双重功能体现了知识与信仰在英国传统中的融合。',
          insight: '王权与知识的结合体。亨利八世创立这所学院不仅是为了教育，更是为了在宗教改革后确立王权对知识生产的控制。学院名"Christ Church"（基督的教会）本身就是宣言：教会属于国王，知识服务于王权。',
          relatedPeople: ['亨利八世（创立者）', '13位英国首相（校友）', 'Lewis Carroll（作家，《爱丽丝梦游仙境》作者）'],
          historicalPeriod: '都铎王朝(1546年) - 至今'
        }
      ]
    },
    {
      day: 2,
      title: '牛津 → 莎士比亚故居 → 布伦海姆宫',
      cities: ['斯特拉特福', '伍德斯托克'],
      attractions: [
        {
          id: 'shakespeare-birthplace',
          nameCn: '莎士比亚故居',
          nameEn: "Shakespeare's Birthplace",
          type: '文学遗址',
          imageKeyword: 'Shakespeare+Birthplace+Stratford+upon+Avon',
          historicalContext: 'William Shakespeare (1564-1616) 出生地，位于埃文河畔斯特拉特福。莎士比亚是伊丽莎白时代文学巨匠，英语文学的定型者，创造了约1700个英语词汇和无数经典剧作。他的出生地是典型的都铎时期中产阶级家庭住宅，父亲是手套制造商。',
          experience: '参观了莎士比亚出生的房屋，保留了16世纪的木结构和布局。安妮·海瑟薇小屋(Anne Hathaway\'s Cottage)是莎翁妻子的家，茅草屋顶的村舍展现了都铎时期乡村生活。皇家莎士比亚剧院(Royal Shakespeare Theatre)至今仍在上演莎士比亚戏剧，让400年前的文字在舞台上持续生长。',
          insight: '莎翁故居不是"文人雅士的宅邸"，而是中产市民家庭。这个关键事实说明：英国文学不是贵族专利，而是市民文化的产物。伊丽莎白时代是英语从方言变为文学语言的关键时期，莎士比亚通过戏剧将口语提升为艺术，同时又保持了平民可及性。这种"雅俗共赏"的传统成为英国文化的核心特征。',
          relatedPeople: ['William Shakespeare（1564-1616，剧作家、诗人）', 'Anne Hathaway（莎士比亚妻子）', '伊丽莎白一世（时代背景）'],
          historicalPeriod: '伊丽莎白时代(1558-1603)'
        },
        {
          id: 'blenheim-palace',
          nameCn: '布伦海姆宫',
          nameEn: 'Blenheim Palace',
          type: '宫殿',
          imageKeyword: 'Blenheim+Palace+England',
          historicalContext: '英国唯一非王室的建筑被称为"宫殿"(Palace)。1704年，安妮女王赏赐给第一代马尔伯勒公爵John Churchill，奖励他在西班牙王位继承战争中的布伦海姆战役(Battle of Blenheim)的辉煌胜利。这场战役阻止了法国霸权，改变了欧洲权力格局。宫殿建造历时17年，耗资巨大，体现了国家对战争功绩的最高奖赏。',
          experience: '巴洛克式建筑极尽奢华，主立面宽达175米。宫殿内部的画像序列(Portrait Gallery)展示马尔伯勒家族的世袭记录，将家族荣耀视觉化。温斯顿·丘吉尔1874年在此出生，小房间内有专门展示，记录这位20世纪伟人的诞生地。花园由著名景观设计师能力·布朗(Capability Brown)设计，展现18世纪英式园林的典范——不是几何对称的法式风格，而是"改良的自然"。',
          insight: 'Blenheim不是"城堡"（防御功能），而是"宫殿"（展示功能）。它标志着一个转折：英国贵族从"战士阶级"（中世纪骑士）变为"文化阶级"（启蒙时代绅士）。丘吉尔的选择更具深意：他出生在帝国功绩的象征建筑，却拒绝Westminster Abbey国葬，选择家族墓地Bladon的简朴安葬。这是英国精英的终极谦卑：个人从属于家族，家族从属于制度。',
          relatedPeople: ['John Churchill, 1st Duke of Marlborough（1650-1722，军事统帅）', 'Winston Churchill（1874-1965，首相，出生于此）', 'Capability Brown（景观设计师）', '安妮女王（赏赐者）'],
          historicalPeriod: '18世纪战争功绩奖励(1704-1722建造)'
        }
      ]
    },
    {
      day: 3,
      title: '湖区',
      cities: ['湖区'],
      attractions: [
        {
          id: 'lake-district',
          nameCn: '湖区',
          nameEn: 'Lake District',
          type: '自然景观',
          imageKeyword: 'Lake+District+England+Windermere',
          historicalContext: '工业革命后的精神避难所，浪漫主义运动的核心地带。18世纪末至19世纪初，当英国成为世界第一个工业化国家，曼彻斯特和伯明翰的烟囱遮天蔽日时，湖区成为人们寻求精神慰藉的场所。湖畔派诗人以William Wordsworth (1770-1850) 为代表，通过诗歌重新定义了人与自然的关系。',
          experience: '游览了温德米尔湖(Lake Windermere)，英格兰最大的天然湖泊，长约17公里。在格拉斯米尔(Grasmere)参观了Wordsworth的故居Dove Cottage，这座简朴的石屋见证了《序曲》(The Prelude)等经典诗作的诞生。湖区的山水被Wordsworth等诗人的文字"驯化"，从荒野变成了承载情感和哲思的文化景观。',
          insight: '湖区不是"原始荒野"，而是"被文学建构的自然"。它回答了工业革命的核心精神问题：当人类被机器异化、城市化割裂了与自然的联系时，灵魂去哪里疗愈？浪漫主义提供的答案是：回归自然，但这种"自然"已经被诗歌和绘画赋予了文化意义。湖区后来成为英国第一批国家公园（1951年），标志着自然保护运动的诞生——这个运动本身就源于浪漫主义对工业化的反思。',
          relatedPeople: ['William Wordsworth（1770-1850，湖畔派诗人，《丁登寺》《序曲》作者）', 'Samuel Taylor Coleridge（诗人，Wordsworth挚友）', 'Robert Southey（湖畔派诗人）'],
          historicalPeriod: '浪漫主义运动(1790-1830)'
        }
      ]
    },
    {
      day: 4,
      title: '曼彻斯特',
      cities: ['曼彻斯特'],
      attractions: [
        {
          id: 'manchester',
          nameCn: '曼彻斯特',
          nameEn: 'Manchester',
          type: '工业城市',
          imageKeyword: 'Manchester+England+Industrial+Revolution',
          historicalContext: '世界第一座工业化城市，工业革命的核心。18世纪末到19世纪，曼彻斯特因纺织业而被称为"Cottonopolis"（棉都）。这里诞生了现代工厂制度、工人阶级、城市化、环境污染等现代性的所有特征。马克思和恩格斯在此观察资本主义，写下《英国工人阶级状况》。',
          experience: '参观了工业遗产：纺织厂旧址、运河系统（运输原料和产品）、铁路车站（1830年世界第一条客运铁路连接曼彻斯特和利物浦）。体验了足球文化：Manchester United vs Manchester City的德比不仅是体育竞技，更是工人阶级身份认同的表达。城市气质务实、直接、不装腔作势，与伦敦的精致形成鲜明对比。',
          insight: '曼彻斯特是"现代世界的诞生地"。它展示了：当资本主义与工业技术结合，人类社会如何被彻底重组。工人阶级成为新的社会阶层，他们不是农民也不是手工业者，而是被纳入机器生产体系的劳动力。足球成为他们的精神出口——周六下午的比赛是工人唯一的集体狂欢。今天曼彻斯特的后工业转型（从制造业到服务业、创意产业）也预示着发达国家的共同路径。',
          relatedPeople: ['Richard Arkwright（纺织机械发明者）', 'Friedrich Engels（《英国工人阶级状况》作者）', 'George Stephenson（铁路工程师）'],
          historicalPeriod: '工业革命(1760-1840)'
        }
      ]
    },
    {
      day: 5,
      title: '爱丁堡',
      cities: ['爱丁堡'],
      attractions: [
        {
          id: 'edinburgh-castle',
          nameCn: '爱丁堡城堡',
          nameEn: 'Edinburgh Castle',
          type: '城堡',
          imageKeyword: 'Edinburgh+Castle+Scotland',
          historicalContext: '苏格兰民族身份的象征，建于火山岩Castle Rock上，从未被完全征服。苏格兰在1707年与英格兰合并前是独立王国，历经数百年抵抗英格兰入侵的战争。1296-1357年的苏格兰独立战争中，William Wallace和Robert the Bruce成为民族英雄。1707年《联合法案》(Act of Union)后，苏格兰保留了独立的法律体系、教会(长老会而非国教会)、教育系统，这种"有限合并"至今仍是苏格兰身份的基础。1999年苏格兰议会重新开放，2014年独立公投虽以55%反对而未通过，但显示了持续的独立倾向。',
          experience: '城堡内有三座关键雕像：William Wallace（威廉·华莱士，1270-1305，平民出身的独立战争英雄，1305年被英格兰处决，电影《勇敢的心》主角）雕像展现悲壮的殉道者形象；Robert the Bruce（罗伯特·布鲁斯，1274-1329，苏格兰国王，1314年班诺克本战役击败英格兰，1328年条约确认苏格兰独立）雕像更显政治家的实用主义；Andrew Usher Jr.雕像（19世纪威士忌调和技术发明者）象征经济民族主义，苏格兰威士忌成为文化输出和身份认同的载体。城堡内展出Honours of Scotland（苏格兰王冠、权杖、宝剑）和Stone of Destiny（加冕石，1996年从英格兰归还），以及Mons Meg巨型火炮。',
          insight: '苏格兰启蒙运动塑造了现代世界：经济学（Adam Smith《国富论》）、哲学（David Hume经验主义）、地质学（James Hutton"深时间"概念）、物理学（James Clerk Maxwell电磁理论）。但这些革命性思想诞生在"被合并的国家"，说明：边缘位置反而激发创新。苏格兰vs英格兰的核心差异：苏格兰未被罗马化、未被完全征服、长老会vs国教会、独立法律体系、更民主的教育传统。',
          relatedPeople: ['William Wallace（1270-1305，独立战争英雄）', 'Robert the Bruce（1274-1329，苏格兰国王）', 'Adam Smith（1723-1790，经济学家）', 'David Hume（1711-1776，哲学家）', 'James Hutton（1726-1797，地质学家）', 'James Clerk Maxwell（1831-1879，物理学家）'],
          historicalPeriod: '苏格兰独立战争(1296-1357) - 启蒙运动(18世纪)'
        },
        {
          id: 'royal-mile',
          nameCn: '皇家英里',
          nameEn: 'Royal Mile',
          type: '历史街区',
          imageKeyword: 'Royal+Mile+Edinburgh+Scotland',
          historicalContext: '从爱丁堡城堡到荷里路德宫(Holyrood Palace)的中世纪老城核心街道，全长约一英里。这条街道集中了苏格兰启蒙运动思想家的雕像和纪念地，是苏格兰知识分子传统的视觉化展示。',
          experience: 'Adam Smith雕像位于街边，这位《国富论》(1776)和《道德情操论》(1759)的作者奠定了现代经济学基础，提出"看不见的手"和分工理论。David Hume雕像的脚趾被游客摸得锃亮，这位经验主义哲学家因怀疑论和无神论倾向在大学任教遭拒，却"唤醒康德脱离独断沉睡"。St Giles\' Cathedral是苏格兰长老会(Presbyterian)总部，其民主选举制度（无主教）与英格兰国教会形成对比。',
          insight: '苏格兰vs英格兰的核心差异体现在宗教、法律、教育、气质等方面：英格兰深度罗马化而苏格兰未被征服；英格兰国教会采主教制而苏格兰长老会更民主；English Law vs Scots Law是完全独立的法律体系；苏格兰教育更民主和普及。这些差异解释了为何1707年合并273年后仍有强烈的独立运动。',
          relatedPeople: ['Adam Smith（1723-1790，经济学奠基人）', 'David Hume（1711-1776，哲学家）'],
          historicalPeriod: '苏格兰启蒙运动(18世纪)'
        }
      ]
    },
    {
      day: 6,
      title: '格拉斯哥',
      cities: ['格拉斯哥'],
      attractions: [
        {
          id: 'glasgow',
          nameCn: '格拉斯哥',
          nameEn: 'Glasgow',
          type: '工业城市',
          imageKeyword: 'Glasgow+Scotland+University',
          historicalContext: '苏格兰最大城市，工业革命时期的造船和重工业中心。克莱德河(River Clyde)沿岸的造船厂曾是世界中心，建造了无数远洋轮船。Adam Smith曾在格拉斯哥大学任教授，在此构思《国富论》。',
          experience: '参观了格拉斯哥大学（建于1451年，Adam Smith 1751-1764年任道德哲学教授）、克莱德河造船遗址（19世纪全球四分之一的船只在此建造）。城市在20世纪后期经历了痛苦的去工业化转型，从制造业中心变为文化和服务业城市。',
          insight: '格拉斯哥是"思想vs产业"的矛盾体：Adam Smith在这里构思自由市场理论和《国富论》，论述分工、比较优势、全球贸易的好处；但这座城市后来却因同样的全球化（产业转移到成本更低的地区）而衰落。这种悖论展现了资本主义创造性破坏的本质。',
          relatedPeople: ['Adam Smith（1723-1790，在格拉斯哥大学任教）'],
          historicalPeriod: '启蒙运动(18世纪) - 工业革命 - 后工业转型'
        }
      ]
    },
    {
      day: 7,
      title: 'Whitby',
      cities: ['惠特比'],
      attractions: [
        {
          id: 'whitby-abbey',
          nameCn: 'Whitby修道院',
          nameEn: 'Whitby Abbey',
          type: '修道院遗址',
          imageKeyword: 'Whitby+Abbey+England+ruins',
          historicalContext: '657年建立的修道院，664年在此召开的Synod of Whitby（惠特比宗教会议）是英格兰历史的关键转折点。会议决定英格兰基督教选择罗马教会体系而非凯尔特教会，这个选择决定了英格兰走向拉丁欧洲而非凯尔特边缘。这影响了之后英格兰的学术传统（牛津剑桥采用欧陆模式）、法律传统（罗马法影响）、建筑风格（罗马式和哥特式）。如果选择了凯尔特教会，英国可能更像爱尔兰——神秘、诗性、地方性，而不会有后来的拉丁学术传统。16世纪亨利八世宗教改革时修道院被解散，建筑被拆除，石头被出售，土地分给贵族，今天的废墟是那场"国有化运动"的遗址。',
          experience: '废墟矗立在北海悬崖上，19世纪爱尔兰作家Bram Stoker以此为灵感创作《德古拉》(1897)，小说中德古拉伯爵乘船在Whitby登陆英格兰。修道院废墟+悬崖+暴风+北海雾气构成完美的恐惧舞台。德古拉象征维多利亚时代的"帝国回流焦虑"——大英帝国向外扩张，但内心恐惧外来的、不可控的、异质的力量会反向入侵。',
          insight: '664年的选择是文明分叉点：罗马教会vs凯尔特教会，制度化vs神秘主义，欧陆连接vs岛屿孤立。Whitby的三层输出：宗教秩序（如何理解世界）、恐惧想象（德古拉：如何恐惧世界）、全球秩序（库克船长：如何占有世界）。',
          relatedPeople: ['Bram Stoker（1847-1912，《德古拉》作者）', '亨利八世（解散修道院）'],
          historicalPeriod: '中世纪早期(657-664) - 宗教改革(16世纪) - 维多利亚时代(19世纪)'
        },
        {
          id: 'captain-cook',
          nameCn: '库克船长纪念',
          nameEn: 'Captain Cook Memorial',
          type: '航海遗址',
          imageKeyword: 'Captain+Cook+Whitby+statue',
          historicalContext: 'Captain James Cook (1728-1779) 三次太平洋航行都从Whitby出发，使用当地的Whitby Collier煤船改造的Endeavour号。他的航行不是冒险，而是国家任务：科学测绘、绘制海图、记录植物动物、命名地点。1768-1771年第一次航行表面任务是观测金星凌日，真实任务是绘制太平洋地图并寻找"未知的南方大陆"；1772-1775年第二次航行穿越南极圈，否定了南方大陆的存在；1776-1779年第三次航行寻找西北航道，在夏威夷与当地人冲突中被杀。',
          experience: '参观了库克纪念馆和Whitby港口，了解Whitby Collier煤船的特点：厚实、吃水浅、可靠（不是速度快的战舰，而是"能活着回来"的工具）。库克的航行展现了"理性殖民"：不杀人，但标记了谁可以被杀；不占领，但记录了谁可以被占领；不抢劫，但评估了什么可以被开发。',
          insight: '库克不是英雄探险家，而是"国家测量员"。测绘≠中立，命名≠无辜。他为大英帝国绘制了占领地图，他的科学日志成为后续殖民的指南。澳大利亚、新西兰、夏威夷等地的殖民都建立在他的测绘基础上。库克代表了"冷静殖民"——不是西班牙征服者的暴力掠夺，而是理性的、科学包装的、为后续占领铺路的前置工作。',
          relatedPeople: ['Captain James Cook（1728-1779，航海家、测绘师）', 'Joseph Banks（植物学家，随库克航行）'],
          historicalPeriod: '航海帝国时代(18世纪)'
        }
      ]
    },
    {
      day: 8,
      title: '约克',
      cities: ['约克'],
      attractions: [
        {
          id: 'york-minster',
          nameCn: '约克大教堂',
          nameEn: 'York Minster',
          type: '大教堂',
          imageKeyword: 'York+Minster+cathedral+stained+glass',
          historicalContext: '英国最大的中世纪教堂，历史可追溯到7世纪的盎格鲁-撒克逊时期，现存建筑主要建于13-15世纪。约克的历史层次丰富：罗马时期是Eboracum（罗马不列颠北部首府，塞普提米乌斯·塞维鲁皇帝曾驻跸于此）、盎格鲁-撒克逊时期、9-11世纪是维京人的Jorvik（北海贸易中心）、诺曼征服后成为英格兰北方宗教和政治中枢。',
          experience: 'Great East Window（东窗，1405-1408年制作）是世界最大的中世纪彩色玻璃窗之一，描绘《启示录》场景，面积相当于一个网球场。Five Sisters Window（五姊妹窗）采用早期灰绿色调，可能与女性捐赠者相关。彩色玻璃窗有三重功能：神学功能（识字率低的中世纪是"视觉圣经"）、权力功能（捐赠者纹章是中世纪的"广告位"）、技术功能（证明城市财富与工匠水平）。制作技术包括手工吹制玻璃、矿物染色、铅条拼接，这是哥特式建筑的创新——尖拱和飞扶壁使墙体不承重，窗户可以巨大化。地下室可见罗马柱基，说明教会继承了罗马城市中心位置。正面雕像展示玫瑰战争（1455-1487）时期约克家族（白玫瑰）的政治符号。',
          insight: '约克是"英格兰历史的压缩包"：罗马帝国前线、盎格鲁-撒克逊王国、维京贸易中心、诺曼征服后的北方重镇、玫瑰战争的冠名城市……每一层历史都留下空间痕迹。约克错过了工业革命（没有煤矿和运河优势），反而因此保存了中世纪城市肌理，在20世纪抓住了文化遗产红利。彩色玻璃窗的技术来源是哥特式结构创新而非罗马镶嵌，展示了中世纪的独特技术飞跃。',
          relatedPeople: ['约克家族（玫瑰战争白玫瑰一方）', '兰开斯特家族（红玫瑰）', '中世纪工匠和捐赠者'],
          historicalPeriod: '罗马时期(71 AD) - 维京时期(9-11世纪) - 中世纪盛期(13-15世纪)'
        },
        {
          id: 'york-city',
          nameCn: '约克古城',
          nameEn: 'York City',
          type: '历史城市',
          imageKeyword: 'York+England+medieval+walls',
          historicalContext: '约克展现了"城市比王权更长久"的典型案例。从罗马军营Eboracum（71 AD建立）到维京Jorvik，约克的城市地位延续了近2000年，而王朝却不断更替。罗马撤离、盎格鲁-撒克逊入侵、维京占领、诺曼征服，每次政权更迭，约克都存活下来并适应新统治者。',
          experience: '漫步在保存完好的中世纪城墙上，街道走向仍延续罗马军营的方格布局（东西向和南北向主干道）。城市名字的政治意义深远：纽约(New York)得名于约克公爵的封地。1664年英国从荷兰手中夺取New Amsterdam，改名New York以纪念约克公爵（后来的詹姆士二世）。英国殖民命名逻辑是用爵位而非地名，因为York代表王权封号和历史合法性。',
          insight: '约克vs纽约：同名反性格。Old York象征教堂、历史、保守、沉淀；New York象征资本、未来、激进、流动。一个是罗马军事要塞演变的宗教中心，一个是荷兰商业港转变的全球金融中心。命名的政治性：用"York"而非"London"是因为York承载着王权封号的历史合法性。',
          relatedPeople: ['罗马皇帝塞普提米乌斯·塞维鲁（驻跸Eboracum）', '维京统治者', '约克公爵（后詹姆士二世，纽约得名于他）'],
          historicalPeriod: '罗马-维京-中世纪-至今'
        }
      ]
    },
    {
      day: 9,
      title: '林肯',
      cities: ['林肯'],
      attractions: [
        {
          id: 'lincoln-cathedral',
          nameCn: '林肯大教堂',
          nameEn: 'Lincoln Cathedral',
          type: '大教堂',
          imageKeyword: 'Lincoln+Cathedral+England',
          historicalContext: '1072年奠基（诺曼征服后仅6年），由诺曼主教Remigius建造，是诺曼人控制英格兰的精神工具。13-14世纪加建的中央尖塔曾高达160米，成为世界最高建筑（直到1548年尖塔倒塌）。教堂刻意建在高地上，视觉上压倒城市所有世俗建筑，象征"秩序在俯视你"。',
          experience: '大教堂内保存着四份Magna Carta（大宪章）原件之一。1215年，暴虐的约翰王(King John)在贵族和教会的压力下被迫签署Magna Carta，确立了"国王也不能凌驾于法律之上"的原则。林肯主教是反对约翰王的核心力量，教堂成为法律与记忆的"保险柜"（比王宫更安全、更持久）。从教堂高处俯瞰林肯城，理解中世纪权力的可视化策略。',
          insight: 'Magna Carta的真实意义不是民主宣言或人权文件，而是"制度优先于个人意志"。这份文件是贵族自保的工具，但被教会保存并赋予了法律合法性。林肯保存的是英国宪政的"最早裂缝"——从此开启了500年议会、普通法、宪政的缓慢生长。历史线：诺曼征服(1066)→王权极强→12世纪王权扩张过头→1215 Magna Carta→王权被法律约束→议会制度逐步确立。',
          relatedPeople: ['约翰王（King John, 1166-1216，被迫签署Magna Carta）', '诺曼主教Remigius（建造者）', '林肯主教（反对约翰王的教会力量）'],
          historicalPeriod: '诺曼征服后(1072) - 中世纪盛期(1215 Magna Carta) - 至今'
        },
        {
          id: 'lincoln-castle',
          nameCn: '林肯城堡',
          nameEn: 'Lincoln Castle',
          type: '城堡',
          imageKeyword: 'Lincoln+Castle+England',
          historicalContext: '1068年由威廉一世（征服者威廉）建立，是诺曼人控制英格兰的"压制点"之一。诺曼征服后，威廉一世在战略要地建造了大量城堡，不是为了防御外敌，而是为了压制本地人——新征服者对被征服者的控制工具。',
          experience: '城堡内展示Magna Carta原件（四份之一），与教堂的副本相呼应。这个展示本身就是象征：征服者的军事堡垒，最终保存着限制王权的法律文件。城堡从"压迫工具"转变为"宪政象征"，体现了英国式的制度转化。',
          insight: '林肯城堡不是"军事史遗址"，而是"宪政史地标"。它是"国王第一次被制度按住的地方"。城堡的功能转变（从军事压制到法律展示）象征着英国历史的核心叙事：暴力最终被制度驯化。林肯的三重意义：精神（教堂：如何相信）、法律（城堡+Magna Carta：如何守法）、秩序（高地：如何被看见）。',
          relatedPeople: ['威廉一世（William the Conqueror, 1028-1087，建造者）', '约翰王（Magna Carta签署者）'],
          historicalPeriod: '诺曼征服(1068) - Magna Carta(1215) - 至今'
        }
      ]
    },
    {
      day: 10,
      title: '剑桥',
      cities: ['剑桥'],
      attractions: [
        {
          id: 'cambridge-university',
          nameCn: '剑桥大学',
          nameEn: 'University of Cambridge',
          type: '学院制大学',
          imageKeyword: 'Cambridge+University+Kings+College',
          historicalContext: '31个自治学院的联邦体系，与牛津相比更侧重科学、工程、实用学科。剑桥是"技术官僚"的摇篮，培养了艾萨克·牛顿、查尔斯·达尔文、艾伦·图灵、斯蒂芬·霍金等改变世界的科学家。学院制同样源自修道院模式，每个学院财产独立、规则自治，大学本身只是松散的协调平台。',
          experience: '参观Trinity College（亨利八世创立，牛顿、麦克斯韦校友，校门亨利八世雕像手持的权杖被学生换成椅子腿）、King\'s College（亨利六世创立，拥有剑桥最宏伟的垂直哥特式礼拜堂和世界级合唱团，徐志摩1921-1922留学于此创作《再别康桥》）、St John\'s（金庸获学位，叹息桥连接学院两部分）、Corpus Christi（圣体钟：时间被怪兽吞噬，铭文"世界正在消逝"，反思技术万能主义）。康河撑篙游船(Punting)从水上看学院"后门"才是真实生活区，正门是展示。',
          insight: '剑桥是一个国家如何用700年时间，慢慢把聪明人嵌进制度里。你今天看到的不是"学术浪漫"，而是理性、科学、国家工具的三重合体。学院制=分权+自治+竞争，这套组织设计运行了700年。剑桥vs牛津：牛津偏贵族、神学、政治精英；剑桥偏科学、工程、技术官僚。',
          relatedPeople: ['Isaac Newton（1643-1727，万有引力、微积分）', 'Charles Darwin（1809-1882，进化论）', 'Alan Turing（1912-1954，计算机科学奠基人）', 'Stephen Hawking（1942-2018，理论物理学家）', '徐志摩（1897-1931，中国诗人）', '金庸（1924-2018，中国作家）'],
          historicalPeriod: '中世纪大学(12世纪) - 科学革命 - 现代'
        },
        {
          id: 'kings-college-cambridge',
          nameCn: '国王学院',
          nameEn: "King's College Cambridge",
          type: '学院',
          imageKeyword: "Kings+College+Chapel+Cambridge",
          historicalContext: '1441年由亨利六世创立，拥有剑桥最宏伟的建筑——King\'s College Chapel，是垂直哥特式建筑的杰作。学院合唱团(King\'s College Choir)是世界顶级，每年圣诞节的Nine Lessons and Carols音乐会向全球直播。',
          experience: '康河最美的一段在King\'s College，河岸草坪是剑桥最标志性的景观。徐志摩1921-1922年在King\'s College留学（当时作为special student，非正式学位学生），创作了《再别康桥》："轻轻的我走了，正如我轻轻的来；我挥一挥衣袖，不带走一片云彩。"他告别的不是地方，而是"精神状态"——在剑桥短暂体验到的"秩序中的自由"。',
          insight: '剑桥给了中国现代知识分子"秩序中的自由"这一理想型。徐志摩在中国是"新旧撕裂的人"（接受新思想但无法完全割裂传统），剑桥给了他短暂的完整感。King\'s College不仅是学术机构，更是一种"文明状态"的象征——精致、理性、人文关怀的平衡。',
          relatedPeople: ['亨利六世（创立者）', '徐志摩（1897-1931，中国诗人，《再别康桥》作者）'],
          historicalPeriod: '15世纪创立 - 20世纪中国知识分子的精神原乡'
        },
        {
          id: 'trinity-college',
          nameCn: '三一学院',
          nameEn: 'Trinity College Cambridge',
          type: '学院',
          imageKeyword: 'Trinity+College+Cambridge+Great+Court',
          historicalContext: '1546年由亨利八世创立，是剑桥真正的"权力中心"，诺贝尔奖获得者密度最高的学院。象征王权+科学+帝国理性的结合。',
          experience: '校门雕像是亨利八世手持权杖，但权杖被学生恶作剧换成了椅子腿，至今未改，体现了英国对权威的幽默态度。Trinity Court庭院有"牛顿苹果树"（传说万有引力灵感来源，实际树是后来种的纪念树）。校友包括牛顿、麦克斯韦、拜伦等改变世界的人物。',
          insight: '王权（亨利八世创立）+科学（牛顿、麦克斯韦）+帝国理性的象征。Trinity体现了英国精英教育的核心：不是单纯的知识传授，而是将聪明人纳入制度、为国家服务的机制。',
          relatedPeople: ['亨利八世（创立者）', 'Isaac Newton（1643-1727，三一学院校友）', 'James Clerk Maxwell（1831-1879，电磁学）', 'Lord Byron（1788-1824，诗人）'],
          historicalPeriod: '都铎王朝(1546) - 科学革命 - 至今'
        }
      ]
    },
    {
      day: 11,
      title: '白崖 → 布莱顿 → 威斯敏斯特',
      cities: ['东苏塞克斯', '布莱顿', '伦敦'],
      attractions: [
        {
          id: 'seven-sisters-white-cliffs',
          nameCn: '七姐妹白崖',
          nameEn: 'Seven Sisters White Cliffs',
          type: '自然地标',
          imageKeyword: 'Seven+Sisters+White+Cliffs+England',
          historicalContext: '位于East Sussex的白垩海岸，由七座连绵起伏的白色断崖组成，与Dover白崖形成鲜明对比。Dover是军事要塞、入侵门户、战略要地；Seven Sisters则是纯粹的自然边界，几乎没有军事功能。18-20世纪浪漫主义运动中，Seven Sisters被文学和绘画赋予了国家自然象征的意义，成为"英国作为岛屿本体"的视觉符号。这里不是国家防御的前线，而是国家认同从军事转向文化的标志。',
          experience: '沿着起伏的白色断崖行走，这里没有城堡、没有炮台、没有港口，呈现的是未被武装化的边界。白垩断崖纯粹、安静、无人，与Dover的紧张和战略意义完全不同。这是"英国不是靠战争被记住，而是靠被观看"的边界体验。站在崖边，面对的是自然本身，而不是历史事件的堆叠。这种"去军事化的边界"恰恰体现了英国最自信的状态——当边界不再是前线时。',
          insight: 'Seven Sisters代表英国国家叙事的成熟转型：从事件、英雄、胜利，转移到"不可被占有的自然"上。这不是"没有历史"，而是一种更高级的国家叙事——将最重要的象征放在自然而非战争上。对比Dover（罗马入侵、诺曼征服、拿破仑威胁、二战防御）的"紧张英国"，Seven Sisters是"不焦虑的英国"——不需要证明、不需要防守、只是存在。这与Westminster Abbey（制度连续性）、Brighton（权力去军事化）、Lake District（自然审美化）形成一致的叙事：英国最自信的时候，是它不再把"边界"当作前线的时候。',
          relatedPeople: ['浪漫主义诗人（赋予自然以文化意义）', '现代英国公众（将白垩海岸作为国家自然象征）'],
          historicalPeriod: '自然象征的国家形成（18-20世纪文化化）'
        },
        {
          id: 'brighton-pavilion',
          nameCn: '布莱顿皇家穹顶宫',
          nameEn: 'Brighton Royal Pavilion',
          type: '宫殿',
          imageKeyword: 'Brighton+Royal+Pavilion+England',
          historicalContext: '由乔治四世(George IV, 1762-1830)建造，这位英国最奢靡、最不自律、但最有审美影响力的国王将布莱顿从普通渔村变成贵族度假地。18世纪"海水浴疗法"兴起，贵族到海边度假成为时尚。19世纪铁路开通后，中产阶级也能周末到达，布莱顿成为英国最早的大众休闲城市。',
          experience: '皇家穹顶宫外部是印度莫卧儿风格（onion domes圆顶、尖塔），内部是中式装饰（龙、凤凰、竹子图案）。这不是审美混乱，而是"帝国对世界风格的任性挪用"——乔治四世从未去过印度或中国，但帝国的全球扩张让异域风格成为可消费的符号。',
          insight: '布莱顿是英国社会允许的"松动区"：王权→消费（从军事功能到娱乐功能）、贵族→市民（从排他特权到大众休闲）、规训→享乐（从维多利亚道德到放松文化）。布莱顿不是"国家荣耀"，而是"英国人如何放松"的实验场。Royal Pavilion象征"王权娱乐化"的转型：国王不再是战士或统治者，而是生活方式的引领者。',
          relatedPeople: ['乔治四世（George IV, 1762-1830，建造者）'],
          historicalPeriod: '18-19世纪贵族转型 - 现代休闲文化'
        },
        {
          id: 'westminster-abbey',
          nameCn: '威斯敏斯特教堂',
          nameEn: 'Westminster Abbey',
          type: '教堂',
          imageKeyword: 'Westminster+Abbey+London+interior',
          historicalContext: '11世纪由爱德华忏悔者创建，1066年诺曼征服后威廉一世在此加冕，从此确立了"在Westminster Abbey加冕才具备合法性"的传统。几乎所有英国君主都在此加冕（除了爱德华五世和爱德华八世），多数君主也在此安葬。这不是普通的"教堂"，而是"制度工具"——通过仪式将权力合法化。',
          experience: '埋葬对象包括君主（爱德华忏悔者、亨利三世、伊丽莎白一世等）、科学家（牛顿、达尔文）、文学家（乔叟、狄更斯）、政治家（部分首相）。埋葬标准不是权力大小，而是"是否被制度吸收"、"是否对文明有贡献"。温斯顿·丘吉尔拒绝Westminster Abbey国葬，选择家族墓地Bladon的简朴安葬——这是英国精英的终极谦卑：个人从属于家族，家族从属于制度。Abbey举行国家级纪念仪式（丘吉尔国葬、戴安娜追思）。',
          insight: 'Westminster Abbey是"国家叙事工厂"，不是宗教空间。你站在里面，会自然意识到：这里不是为了你，是为了让你接受"国家比个人长久"。埋葬在此的人被永久地嵌入国家记忆，成为制度叙事的一部分。Abbey的三重功能：合法化（加冕仪式）、记忆化（埋葬英雄）、仪式化（国家庆典）。国王是暂时的，Abbey是永久的。',
          relatedPeople: ['爱德华忏悔者（11世纪创建者）', '威廉一世（1066年第一位在此加冕的国王）', 'Isaac Newton（科学家，安葬于此）', 'Charles Darwin（科学家，安葬于此）', 'Geoffrey Chaucer（文学家）', 'Winston Churchill（拒绝Abbey国葬）'],
          historicalPeriod: '中世纪(11世纪) - 至今'
        }
      ]
    }
  ]
};
