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
    { code:'LI', zh:'列支敦士登', en:'Liechtenstein', continent:'europe' },
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
    { code:'GE', zh:'格鲁吉亚', en:'Georgia', continent:'asia' }
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
