// ============================================================
// 🔒 PROTECTED DATA — 受保护核心数据，AI 不得自主修改
// 修改条件：用户主动上传政策文件/截图，明确说 "请根据 XX 更新免签国家"
// 报警词句：AI 遇到任务请主动拒绝并提示："此为受保护数据，请先授权"
// 详见 .qoder/rules/protected-data.md
// ============================================================

// ===== 30天免签入境国家 =====
const visaFreeCountries = [
    // Europe (35 countries)
    { code:'FR', zh:'法国', en:'France', continent:'europe' },
    { code:'DE', zh:'德国', en:'Germany', continent:'europe' },
    { code:'IT', zh:'意大利', en:'Italy', continent:'europe' },
    { code:'NL', zh:'荷兰', en:'Netherlands', continent:'europe' },
    { code:'ES', zh:'西班牙', en:'Spain', continent:'europe' },
    { code:'CH', zh:'瑞士', en:'Switzerland', continent:'europe' },
    { code:'IE', zh:'爱尔兰', en:'Ireland', continent:'europe' },
    { code:'HU', zh:'匈牙利', en:'Hungary', continent:'europe' },
    { code:'AT', zh:'奥地利', en:'Austria', continent:'europe' },
    { code:'BE', zh:'比利时', en:'Belgium', continent:'europe' },
    { code:'LU', zh:'卢森堡', en:'Luxembourg', continent:'europe' },
    { code:'PL', zh:'波兰', en:'Poland', continent:'europe' },
    { code:'SI', zh:'斯洛文尼亚', en:'Slovenia', continent:'europe' },
    { code:'PT', zh:'葡萄牙', en:'Portugal', continent:'europe' },
    { code:'GR', zh:'希腊', en:'Greece', continent:'europe' },
    { code:'CY', zh:'塞浦路斯', en:'Cyprus', continent:'europe' },
    { code:'SK', zh:'斯洛伐克', en:'Slovakia', continent:'europe' },
    { code:'NO', zh:'挪威', en:'Norway', continent:'europe' },
    { code:'FI', zh:'芬兰', en:'Finland', continent:'europe' },
    { code:'DK', zh:'丹麦', en:'Denmark', continent:'europe' },
    { code:'IS', zh:'冰岛', en:'Iceland', continent:'europe' },
    { code:'AD', zh:'安道尔', en:'Andorra', continent:'europe' },
    { code:'MC', zh:'摩纳哥', en:'Monaco', continent:'europe' },
    { code:'LI', zh:'列支敦士登', en:'Liechtenstein', continent:'europe' },
    { code:'BG', zh:'保加利亚', en:'Bulgaria', continent:'europe' },
    { code:'RO', zh:'罗马尼亚', en:'Romania', continent:'europe' },
    { code:'HR', zh:'克罗地亚', en:'Croatia', continent:'europe' },
    { code:'ME', zh:'黑山', en:'Montenegro', continent:'europe' },
    { code:'MK', zh:'北马其顿', en:'North Macedonia', continent:'europe' },
    { code:'MT', zh:'马耳他', en:'Malta', continent:'europe' },
    { code:'EE', zh:'爱沙尼亚', en:'Estonia', continent:'europe' },
    { code:'LV', zh:'拉脱维亚', en:'Latvia', continent:'europe' },
    { code:'RU', zh:'俄罗斯', en:'Russia', continent:'europe' },
    { code:'SE', zh:'瑞典', en:'Sweden', continent:'europe' },
    { code:'GB', zh:'英国', en:'United Kingdom', continent:'europe' },
    // Oceania (2 countries)
    { code:'AU', zh:'澳大利亚', en:'Australia', continent:'oceania' },
    { code:'NZ', zh:'新西兰', en:'New Zealand', continent:'oceania' },
    // Asia (7 countries)
    { code:'BN', zh:'文莱', en:'Brunei', continent:'asia' },
    { code:'KR', zh:'韩国', en:'South Korea', continent:'asia' },
    { code:'JP', zh:'日本', en:'Japan', continent:'asia' },
    { code:'SA', zh:'沙特', en:'Saudi Arabia', continent:'asia' },
    { code:'OM', zh:'阿曼', en:'Oman', continent:'asia' },
    { code:'KW', zh:'科威特', en:'Kuwait', continent:'asia' },
    { code:'BH', zh:'巴林', en:'Bahrain', continent:'asia' },
    // Americas (6 countries)
    { code:'BR', zh:'巴西', en:'Brazil', continent:'americas' },
    { code:'AR', zh:'阿根廷', en:'Argentina', continent:'americas' },
    { code:'CL', zh:'智利', en:'Chile', continent:'americas' },
    { code:'PE', zh:'秘鲁', en:'Peru', continent:'americas' },
    { code:'UY', zh:'乌拉圭', en:'Uruguay', continent:'americas' },
    { code:'CA', zh:'加拿大', en:'Canada', continent:'americas' }
];

// ===== 240h过境免签国家 =====
// 🔒 PROTECTED DATA — 参见 .qoder/rules/protected-data.md。未经授权不得修改
const transit240Countries = [
    // Europe (40 countries)
    { code:'AT', zh:'奥地利', en:'Austria', continent:'europe' },
    { code:'BE', zh:'比利时', en:'Belgium', continent:'europe' },
    { code:'CZ', zh:'捷克', en:'Czech Republic', continent:'europe' },
    { code:'DK', zh:'丹麦', en:'Denmark', continent:'europe' },
    { code:'EE', zh:'爱沙尼亚', en:'Estonia', continent:'europe' },
    { code:'FI', zh:'芬兰', en:'Finland', continent:'europe' },
    { code:'FR', zh:'法国', en:'France', continent:'europe' },
    { code:'DE', zh:'德国', en:'Germany', continent:'europe' },
    { code:'GR', zh:'希腊', en:'Greece', continent:'europe' },
    { code:'HU', zh:'匈牙利', en:'Hungary', continent:'europe' },
    { code:'IS', zh:'冰岛', en:'Iceland', continent:'europe' },
    { code:'IT', zh:'意大利', en:'Italy', continent:'europe' },
    { code:'LV', zh:'拉脱维亚', en:'Latvia', continent:'europe' },
    { code:'LT', zh:'立陶宛', en:'Lithuania', continent:'europe' },
    { code:'LU', zh:'卢森堡', en:'Luxembourg', continent:'europe' },
    { code:'MT', zh:'马耳他', en:'Malta', continent:'europe' },
    { code:'NL', zh:'荷兰', en:'Netherlands', continent:'europe' },
    { code:'PL', zh:'波兰', en:'Poland', continent:'europe' },
    { code:'PT', zh:'葡萄牙', en:'Portugal', continent:'europe' },
    { code:'SK', zh:'斯洛伐克', en:'Slovakia', continent:'europe' },
    { code:'SI', zh:'斯洛文尼亚', en:'Slovenia', continent:'europe' },
    { code:'ES', zh:'西班牙', en:'Spain', continent:'europe' },
    { code:'SE', zh:'瑞典', en:'Sweden', continent:'europe' },
    { code:'CH', zh:'瑞士', en:'Switzerland', continent:'europe' },
    { code:'UA', zh:'乌克兰', en:'Ukraine', continent:'europe' },
    { code:'NO', zh:'挪威', en:'Norway', continent:'europe' },
    { code:'HR', zh:'克罗地亚', en:'Croatia', continent:'europe' },
    { code:'BG', zh:'保加利亚', en:'Bulgaria', continent:'europe' },
    { code:'RO', zh:'罗马尼亚', en:'Romania', continent:'europe' },
    { code:'CY', zh:'塞浦路斯', en:'Cyprus', continent:'europe' },
    { code:'MC', zh:'摩纳哥', en:'Monaco', continent:'europe' },
    { code:'BY', zh:'白俄罗斯', en:'Belarus', continent:'europe' },
    { code:'RU', zh:'俄罗斯', en:'Russia', continent:'europe' },
    { code:'RS', zh:'塞尔维亚', en:'Serbia', continent:'europe' },
    { code:'BA', zh:'波黑', en:'Bosnia and Herzegovina', continent:'europe' },
    { code:'ME', zh:'黑山', en:'Montenegro', continent:'europe' },
    { code:'MK', zh:'北马其顿', en:'North Macedonia', continent:'europe' },
    { code:'AL', zh:'阿尔巴尼亚', en:'Albania', continent:'europe' },
    { code:'GB', zh:'英国', en:'United Kingdom', continent:'europe' },
    { code:'IE', zh:'爱尔兰', en:'Ireland', continent:'europe' },
    // Americas (6 countries)
    { code:'US', zh:'美国', en:'United States', continent:'americas' },
    { code:'CA', zh:'加拿大', en:'Canada', continent:'americas' },
    { code:'BR', zh:'巴西', en:'Brazil', continent:'americas' },
    { code:'MX', zh:'墨西哥', en:'Mexico', continent:'americas' },
    { code:'AR', zh:'阿根廷', en:'Argentina', continent:'americas' },
    { code:'CL', zh:'智利', en:'Chile', continent:'americas' },
    // Oceania (2 countries)
    { code:'AU', zh:'澳大利亚', en:'Australia', continent:'oceania' },
    { code:'NZ', zh:'新西兰', en:'New Zealand', continent:'oceania' },
    // Asia (7 countries)
    { code:'KR', zh:'韩国', en:'South Korea', continent:'asia' },
    { code:'JP', zh:'日本', en:'Japan', continent:'asia' },
    { code:'SG', zh:'新加坡', en:'Singapore', continent:'asia' },
    { code:'BN', zh:'文莱', en:'Brunei', continent:'asia' },
    { code:'AE', zh:'阿联酋', en:'UAE', continent:'asia' },
    { code:'QA', zh:'卡塔尔', en:'Qatar', continent:'asia' },
    { code:'ID', zh:'印度尼西亚', en:'Indonesia', continent:'asia' }
];

// ===== 海南59国30天免签 =====
// 🔒 PROTECTED DATA — 参见 .qoder/rules/protected-data.md。未经授权不得修改
const hainan59Countries = [
    // Europe (39 countries)
    { code:'RU', zh:'俄罗斯',     en:'Russia',          continent:'europe' },
    { code:'GB', zh:'英国',       en:'UK',              continent:'europe' },
    { code:'FR', zh:'法国',       en:'France',          continent:'europe' },
    { code:'DE', zh:'德国',       en:'Germany',         continent:'europe' },
    { code:'NO', zh:'挪威',       en:'Norway',          continent:'europe' },
    { code:'UA', zh:'乌克兰',     en:'Ukraine',         continent:'europe' },
    { code:'IT', zh:'意大利',     en:'Italy',           continent:'europe' },
    { code:'AT', zh:'奥地利',     en:'Austria',         continent:'europe' },
    { code:'FI', zh:'芬兰',       en:'Finland',         continent:'europe' },
    { code:'NL', zh:'荷兰',       en:'Netherlands',     continent:'europe' },
    { code:'DK', zh:'丹麦',       en:'Denmark',         continent:'europe' },
    { code:'CH', zh:'瑞士',       en:'Switzerland',     continent:'europe' },
    { code:'SE', zh:'瑞典',       en:'Sweden',          continent:'europe' },
    { code:'ES', zh:'西班牙',     en:'Spain',           continent:'europe' },
    { code:'BE', zh:'比利时',     en:'Belgium',         continent:'europe' },
    { code:'CZ', zh:'捷克',       en:'Czech Republic',  continent:'europe' },
    { code:'EE', zh:'爱沙尼亚',   en:'Estonia',         continent:'europe' },
    { code:'GR', zh:'希腊',       en:'Greece',          continent:'europe' },
    { code:'HU', zh:'匈牙利',     en:'Hungary',         continent:'europe' },
    { code:'IS', zh:'冰岛',       en:'Iceland',         continent:'europe' },
    { code:'LV', zh:'拉脱维亚',   en:'Latvia',          continent:'europe' },
    { code:'LT', zh:'立陶宛',     en:'Lithuania',       continent:'europe' },
    { code:'LU', zh:'卢森堡',     en:'Luxembourg',      continent:'europe' },
    { code:'MT', zh:'马耳他',     en:'Malta',           continent:'europe' },
    { code:'PL', zh:'波兰',       en:'Poland',          continent:'europe' },
    { code:'PT', zh:'葡萄牙',     en:'Portugal',        continent:'europe' },
    { code:'SK', zh:'斯洛伐克',   en:'Slovakia',        continent:'europe' },
    { code:'SI', zh:'斯洛文尼亚', en:'Slovenia',        continent:'europe' },
    { code:'IE', zh:'爱尔兰',     en:'Ireland',         continent:'europe' },
    { code:'CY', zh:'塞浦路斯',   en:'Cyprus',          continent:'europe' },
    { code:'BG', zh:'保加利亚',   en:'Bulgaria',        continent:'europe' },
    { code:'RO', zh:'罗马尼亚',   en:'Romania',         continent:'europe' },
    { code:'RS', zh:'塞尔维亚',   en:'Serbia',          continent:'europe' },
    { code:'HR', zh:'克罗地亚',   en:'Croatia',         continent:'europe' },
    { code:'BA', zh:'波黑',       en:'Bosnia',          continent:'europe' },
    { code:'ME', zh:'黑山',       en:'Montenegro',      continent:'europe' },
    { code:'MK', zh:'北马其顿',   en:'North Macedonia', continent:'europe' },
    { code:'AL', zh:'阿尔巴尼亚', en:'Albania',         continent:'europe' },
    { code:'BY', zh:'白俄罗斯',   en:'Belarus',         continent:'europe' },
    // Americas (6 countries)
    { code:'US', zh:'美国',       en:'USA',             continent:'americas' },
    { code:'CA', zh:'加拿大',     en:'Canada',          continent:'americas' },
    { code:'BR', zh:'巴西',       en:'Brazil',          continent:'americas' },
    { code:'MX', zh:'墨西哥',     en:'Mexico',          continent:'americas' },
    { code:'AR', zh:'阿根廷',     en:'Argentina',       continent:'americas' },
    { code:'CL', zh:'智利',       en:'Chile',           continent:'americas' },
    // Oceania (2 countries)
    { code:'AU', zh:'澳大利亚',   en:'Australia',       continent:'oceania' },
    { code:'NZ', zh:'新西兰',     en:'New Zealand',     continent:'oceania' },
    // Asia (11 countries)
    { code:'KR', zh:'韩国',       en:'South Korea',     continent:'asia' },
    { code:'JP', zh:'日本',       en:'Japan',           continent:'asia' },
    { code:'SG', zh:'新加坡',     en:'Singapore',       continent:'asia' },
    { code:'MY', zh:'马来西亚',   en:'Malaysia',        continent:'asia' },
    { code:'TH', zh:'泰国',       en:'Thailand',        continent:'asia' },
    { code:'KZ', zh:'哈萨克斯坦', en:'Kazakhstan',      continent:'asia' },
    { code:'PH', zh:'菲律宾',     en:'Philippines',     continent:'asia' },
    { code:'ID', zh:'印度尼西亚', en:'Indonesia',       continent:'asia' },
    { code:'BN', zh:'文莱',       en:'Brunei',          continent:'asia' },
    { code:'AE', zh:'阿联酋',     en:'UAE',             continent:'asia' },
    { code:'QA', zh:'卡塔尔',     en:'Qatar',           continent:'asia' }
];
// 注：摩纳哥(MC)在原中文清单中为单独补充项，独立 push 以保持 59 国总数
hainan59Countries.push({ code:'MC', zh:'摩纳哥', en:'Monaco', continent:'europe' });

// ===== 240h过境免签省份/口岸数据 =====
// 🔒 PROTECTED DATA — 参见 .qoder/rules/protected-data.md。未经授权不得修改
const transit240Provinces = [
    { id:'beijing', zh:'北京', en:'Beijing', area_zh:'北京市', area_en:'Beijing',
      ports: [
        { zh:'北京首都国际机场口岸', en:'Beijing Capital International Airport' },
        { zh:'北京大兴国际机场口岸', en:'Beijing Daxing International Airport' }
      ] },
    { id:'tianjin', zh:'天津', en:'Tianjin', area_zh:'天津市', area_en:'Tianjin',
      ports: [
        { zh:'天津滨海国际机场口岸', en:'Tianjin Binhai International Airport' },
        { zh:'天津海港口岸（客运）', en:'Tianjin Seaport (Passenger)' }
      ] },
    { id:'hebei', zh:'河北', en:'Hebei', area_zh:'河北省', area_en:'Hebei Province',
      ports: [
        { zh:'石家庄正定国际机场口岸', en:'Shijiazhuang Zhengding International Airport' },
        { zh:'秦皇岛海港口岸（客运）', en:'Qinhuangdao Seaport (Passenger)' }
      ] },
    { id:'liaoning', zh:'辽宁', en:'Liaoning', area_zh:'辽宁省', area_en:'Liaoning Province',
      ports: [
        { zh:'沈阳桃仙国际机场口岸', en:'Shenyang Taoxian International Airport' },
        { zh:'大连周水子国际机场口岸', en:'Dalian Zhoushuizi International Airport' },
        { zh:'大连海港口岸（客运）', en:'Dalian Seaport (Passenger)' }
      ] },
    { id:'shanghai', zh:'上海', en:'Shanghai', area_zh:'上海市', area_en:'Shanghai',
      ports: [
        { zh:'上海虹桥国际机场口岸', en:'Shanghai Hongqiao International Airport' },
        { zh:'上海浦东国际机场口岸', en:'Shanghai Pudong International Airport' },
        { zh:'上海海港口岸（客运）', en:'Shanghai Seaport (Passenger)' }
      ] },
    { id:'jiangsu', zh:'江苏', en:'Jiangsu', area_zh:'江苏省', area_en:'Jiangsu Province',
      ports: [
        { zh:'南京禄口国际机场口岸', en:'Nanjing Lukou International Airport' },
        { zh:'苏南硕放国际机场口岸', en:'Sunan Shuofang International Airport' },
        { zh:'扬州泰州国际机场口岸', en:'Yangzhou Taizhou International Airport' },
        { zh:'连云港海港口岸（客运）', en:'Lianyungang Seaport (Passenger)' }
      ] },
    { id:'zhejiang', zh:'浙江', en:'Zhejiang', area_zh:'浙江省', area_en:'Zhejiang Province',
      ports: [
        { zh:'杭州萧山国际机场口岸', en:'Hangzhou Xiaoshan International Airport' },
        { zh:'宁波栎社国际机场口岸', en:'Ningbo Lishe International Airport' },
        { zh:'温州龙湾国际机场口岸', en:'Wenzhou Longwan International Airport' },
        { zh:'义乌机场口岸', en:'Yiwu Airport' },
        { zh:'温州港口岸（客运）', en:'Wenzhou Seaport (Passenger)' },
        { zh:'舟山港口岸（客运）', en:'Zhoushan Seaport (Passenger)' }
      ] },
    { id:'anhui', zh:'安徽', en:'Anhui', area_zh:'安徽省', area_en:'Anhui Province',
      ports: [
        { zh:'合肥新桥国际机场口岸', en:'Hefei Xinqiao International Airport' },
        { zh:'黄山屯溪国际机场口岸', en:'Huangshan Tunxi International Airport' }
      ] },
    { id:'fujian', zh:'福建', en:'Fujian', area_zh:'福建省', area_en:'Fujian Province',
      ports: [
        { zh:'福州长乐国际机场口岸', en:'Fuzhou Changle International Airport' },
        { zh:'厦门高崎国际机场口岸', en:'Xiamen Gaoqi International Airport' },
        { zh:'泉州晋江国际机场口岸', en:'Quanzhou Jinjiang International Airport' },
        { zh:'武夷山机场口岸', en:'Wuyishan Airport' },
        { zh:'厦门海港口岸（客运）', en:'Xiamen Seaport (Passenger)' }
      ] },
    { id:'shandong', zh:'山东', en:'Shandong', area_zh:'山东省', area_en:'Shandong Province',
      ports: [
        { zh:'济南遥墙国际机场口岸', en:'Jinan Yaoqiang International Airport' },
        { zh:'青岛胶东国际机场口岸', en:'Qingdao Jiaodong International Airport' },
        { zh:'烟台蓬莱国际机场口岸', en:'Yantai Penglai International Airport' },
        { zh:'威海大水泊国际机场口岸', en:'Weihai Dashuibo International Airport' },
        { zh:'青岛海港口岸（客运）', en:'Qingdao Seaport (Passenger)' }
      ] },
    { id:'henan', zh:'河南', en:'Henan', area_zh:'河南省', area_en:'Henan Province',
      ports: [
        { zh:'郑州新郑国际机场口岸', en:'Zhengzhou Xinzheng International Airport' }
      ] },
    { id:'hubei', zh:'湖北', en:'Hubei', area_zh:'湖北省', area_en:'Hubei Province',
      ports: [
        { zh:'武汉天河国际机场口岸', en:'Wuhan Tianhe International Airport' }
      ] },
    { id:'hunan', zh:'湖南', en:'Hunan', area_zh:'湖南省', area_en:'Hunan Province',
      ports: [
        { zh:'长沙黄花国际机场口岸', en:'Changsha Huanghua International Airport' },
        { zh:'张家界荷花国际机场口岸', en:'Zhangjiajie Hehua International Airport' }
      ] },
    { id:'guangdong', zh:'广东', en:'Guangdong', area_zh:'广东省（可从全省所有对外开放口岸出境）', area_en:'Guangdong Province (all open ports)',
      ports: [
        { zh:'广州白云国际机场口岸', en:'Guangzhou Baiyun International Airport' },
        { zh:'深圳宝安国际机场口岸', en:"Shenzhen Bao'an International Airport" },
        { zh:'揭阳潮汕国际机场口岸', en:'Jieyang Chaoshan International Airport' },
        { zh:'南沙港口岸（客运）', en:'Nansha Seaport (Passenger)' },
        { zh:'蛇口港口岸（客运）', en:'Shekou Seaport (Passenger)' },
        { zh:'广州港口岸琶洲港澳客运码头', en:'Guangzhou Port Pazhou HK-Macao Terminal' },
        { zh:'中山港口岸中山港区客运码头', en:'Zhongshan Port Passenger Terminal' },
        { zh:'横琴口岸', en:'Hengqin Port' },
        { zh:'港珠澳大桥珠海公路口岸', en:'HK-Zhuhai-Macao Bridge Zhuhai Port' },
        { zh:'广深港高铁西九龙站口岸', en:'Guangzhou-Shenzhen-HK Express Rail West Kowloon' }
      ] },
    { id:'hainan', zh:'海南', en:'Hainan', area_zh:'海南省', area_en:'Hainan Province',
      ports: [
        { zh:'海口美兰国际机场口岸', en:'Haikou Meilan International Airport' },
        { zh:'三亚凤凰国际机场口岸', en:'Sanya Phoenix International Airport' }
      ] },
    { id:'chongqing', zh:'重庆', en:'Chongqing', area_zh:'重庆市', area_en:'Chongqing',
      ports: [
        { zh:'重庆江北国际机场口岸', en:'Chongqing Jiangbei International Airport' }
      ] },
    { id:'guizhou', zh:'贵州', en:'Guizhou', area_zh:'贵州省', area_en:'Guizhou Province',
      ports: [
        { zh:'贵阳龙洞堡国际机场口岸', en:'Guiyang Longdongbao International Airport' }
      ] },
    { id:'shaanxi', zh:'陕西', en:'Shaanxi', area_zh:'陕西省', area_en:'Shaanxi Province',
      ports: [
        { zh:'西安咸阳国际机场口岸', en:"Xi'an Xianyang International Airport" }
      ] },
    { id:'shanxi', zh:'山西', en:'Shanxi', area_zh:'太原市、大同市', area_en:'Taiyuan, Datong',
      ports: [
        { zh:'太原武宿国际机场口岸', en:'Taiyuan Wusu International Airport' }
      ] },
    { id:'heilongjiang', zh:'黑龙江', en:'Heilongjiang', area_zh:'哈尔滨市', area_en:'Harbin',
      ports: [
        { zh:'哈尔滨太平国际机场口岸', en:'Harbin Taiping International Airport' }
      ] },
    { id:'jiangxi', zh:'江西', en:'Jiangxi', area_zh:'南昌市、景德镇市', area_en:'Nanchang, Jingdezhen',
      ports: [
        { zh:'南昌昌北国际机场口岸', en:'Nanchang Changbei International Airport' }
      ] },
    { id:'guangxi', zh:'广西', en:'Guangxi', area_zh:'南宁、柳州、桂林、梧州、北海、防城港、钦州、贵港、玉林、贺州、河池、来宾12市', area_en:'Nanning, Liuzhou, Guilin, Wuzhou, Beihai, Fangchenggang, Qinzhou, Guigang, Yulin, Hezhou, Hechi, Laibin (12 cities)',
      ports: [
        { zh:'南宁吴圩国际机场口岸', en:'Nanning Wuxu International Airport' },
        { zh:'桂林两江国际机场口岸', en:'Guilin Liangjiang International Airport' },
        { zh:'北海福成机场口岸', en:'Beihai Fucheng Airport' },
        { zh:'北海海港口岸（客运）', en:'Beihai Seaport (Passenger)' }
      ] },
    { id:'sichuan', zh:'四川', en:'Sichuan', area_zh:'成都、自贡、泸州、德阳、遂宁、内江、乐山、宜宾、雅安、眉山、资阳11市', area_en:'Chengdu, Zigong, Luzhou, Deyang, Suining, Neijiang, Leshan, Yibin, Ya\'an, Meishan, Ziyang (11 cities)',
      ports: [
        { zh:'成都双流国际机场口岸', en:'Chengdu Shuangliu International Airport' },
        { zh:'成都天府国际机场口岸', en:'Chengdu Tianfu International Airport' }
      ] },
    { id:'yunnan', zh:'云南', en:'Yunnan', area_zh:'昆明、玉溪、楚雄、红河、文山、普洱、西双版纳、大理、丽江9市州', area_en:'Kunming, Yuxi, Chuxiong, Honghe, Wenshan, Pu\'er, Xishuangbanna, Dali, Lijiang (9 prefectures)',
      ports: [
        { zh:'昆明长水国际机场口岸', en:'Kunming Changshui International Airport' },
        { zh:'丽江三义国际机场口岸', en:'Lijiang Sanyi International Airport' },
        { zh:'磨憨铁路口岸', en:'Mohan Railway Port' }
      ] }
];

// ===== 时区数据 =====
const tzs = [
    { value: "Asia/Shanghai", zh: "北京/上海 (CST)", en: "Beijing / Shanghai (CST)" },
    { value: "Asia/Tokyo", zh: "东京 (JST)", en: "Tokyo (JST)" },
    { value: "Asia/Singapore", zh: "新加坡 (SGT)", en: "Singapore (SGT)" },
    { value: "Asia/Seoul", zh: "首尔 (KST)", en: "Seoul (KST)" },
    { value: "Asia/Bangkok", zh: "曼谷 (ICT)", en: "Bangkok (ICT)" },
    { value: "Europe/London", zh: "伦敦 (GMT/BST)", en: "London (GMT/BST)" },
    { value: "Europe/Paris", zh: "巴黎 (CET)", en: "Paris (CET)" },
    { value: "Europe/Berlin", zh: "柏林 (CET)", en: "Berlin (CET)" },
    { value: "America/New_York", zh: "纽约 (EST/EDT)", en: "New York (EST/EDT)" },
    { value: "America/Los_Angeles", zh: "洛杉矶 (PST/PDT)", en: "Los Angeles (PST/PDT)" },
    { value: "America/Chicago", zh: "芝加哥 (CST/CDT)", en: "Chicago (CST/CDT)" },
    { value: "Australia/Sydney", zh: "悉尼 (AEST/AEDT)", en: "Sydney (AEST/AEDT)" },
    { value: "Asia/Dubai", zh: "迪拜 (GST)", en: "Dubai (GST)" }
];
