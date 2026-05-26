/* =========================================================
   LAOWAITOWN Homepage Tool Data
   Keep tool content/config here so index.html stays focused on rendering and interaction.
   ========================================================= */

window.LWToolData = (function () {
        // ====== Tools Data ======
        const TOOLS = [
            { id: 'stay', icon: '📅', name: 'Stay Calc' },
            { id: 'currency', icon: '💱', name: 'Currency' },
            { id: 'timezone', icon: '🕐', name: 'Timezone' },
            { id: 'phrases', icon: '💬', name: 'Phrases' },
            { id: 'weather', icon: '🌤', name: 'Weather' },
            { id: 'emergency', icon: '🚨', name: 'Emergency' },
            { id: 'sim', icon: '📶', name: 'SIM Card' },
            { id: 'vpn', icon: '🔒', name: 'VPN Info' },
            { id: 'translate', icon: '🗣', name: 'Translate' },
            { id: 'maps', icon: '🗺', name: 'Maps' }
        ];

        const CURRENCIES = ['CNY','USD','EUR','JPY','GBP','HKD','THB','AUD','SGD','KRW','CAD'];
        const USD_RATES = { USD:1, CNY:7.2, EUR:0.92, JPY:155, GBP:0.79, HKD:7.8, THB:36, AUD:1.52, SGD:1.34, KRW:1360, CAD:1.36 };

        const PHRASE_SCENES = [
            { id:'communication', icon:'🗣️', en:'Communication', zh:'语言沟通', phrases:[
                ["你好，我听不懂中文，可以用英语吗？","Hello, I don't speak Chinese. Could we use English?"],
                ['请把这句话写下来/打在手机上给我看。','Please type it on your phone to show me.'],
                ['请说慢一点，我需要用翻译软件。','Please speak slowly. I need to use a translation app.']
            ]},
            { id:'arrival', icon:'🛂', en:'Arrival', zh:'入境', phrases:[
                ['请问入境检查在哪里？','Where is immigration control?'],
                ['我来中国旅游/商务出差。','I am visiting China for tourism / business.'],
                ['这是我的酒店预订单和返程/联程机票。','This is my hotel reservation and return/onward ticket.']
            ]},
            { id:'payment', icon:'💳', en:'QR Payment', zh:'扫码支付', phrases:[
                ['我没有微信/支付宝，可以用现金吗？','I do not have WeChat Pay / Alipay. Can I pay in cash?'],
                ['请扫我手机上的付款码。','Please scan the payment QR code on my phone.'],
                ['这里可以刷外国信用卡（Visa/Mastercard）吗？','Do you accept foreign credit cards (Visa/Mastercard)?']
            ]},
            { id:'taxi', icon:'🚕', en:'Taxi', zh:'打车', phrases:[
                ['请带我去这个地址，谢谢。（出示手机地图）','Please take me to this address, thank you.'],
                ['请打表，不用绕路。','Please use the meter, no detours.'],
                ["请在这里停车，我在这儿下。","Please stop here, I'll get off."]
            ]},
            { id:'directions', icon:'🧭', en:'Directions', zh:'问路', phrases:[
                ['这个地方怎么走？远不远？','How do I get to this place? Is it far?'],
                ['最近的地铁站/公交站在哪里？','Where is the nearest subway / bus station?'],
                ['最近的医院/药店在哪里？','Where is the nearest hospital / pharmacy?']
            ]},
            { id:'transit', icon:'🚇', en:'Transit', zh:'交通换乘', phrases:[
                ['请问中转柜台在哪里？','Where is the transfer counter?'],
                ['我可以离开机场去市区吗？','Can I leave the airport and go downtown?'],
                ['请问去这个地方应该坐地铁还是打车？','Should I take the subway or a taxi to this place?']
            ]},
            { id:'food', icon:'🍜', en:'Ordering Food', zh:'点菜', phrases:[
                ['请给我一份英文菜单。','Could I have an English menu, please?'],
                ["这道菜辣吗？我不能吃辣。","Is this dish spicy? I can't eat spicy food."],
                ['买单，谢谢。','Check, please.']
            ]},
            { id:'allergies', icon:'⚠️', en:'Allergies', zh:'过敏/忌口', phrases:[
                ["我对花生/海鲜/牛奶过敏，请不要放。","I'm allergic to peanuts / seafood / dairy, please do not add any."],
                ["我是素食者，不吃任何肉和海鲜。","I'm vegetarian, no meat or seafood please."],
                ['请给我一杯温水/冰水。','A glass of warm / ice water, please.']
            ]},
            { id:'shopping', icon:'🛍️', en:'Shopping', zh:'购物', phrases:[
                ['这个多少钱？能便宜一点吗？','How much is this? Can you make it cheaper?'],
                ['我可以试穿吗？有大一号的吗？','Can I try this on? Do you have a bigger size?'],
                ['请给我一张发票/收据。','Could I have a receipt, please?']
            ]},
            { id:'hotel', icon:'🏨', en:'Hotel / Wi-Fi', zh:'住宿/Wi-Fi', phrases:[
                ['请问 Wi-Fi 密码是多少？',"What's the Wi-Fi password, please?"],
                ['我预订了房间，这是我的护照。','I have a reservation. Here is my passport.'],
                ["空调/热水坏了，可以帮我看看吗？","The AC / hot water isn't working. Could you check it?"]
            ]},
            { id:'emergency', icon:'🚨', en:'Emergency', zh:'急救/报警', phrases:[
                ['我不舒服，请帮我叫医生/救护车。（120）','I do not feel well. Please call a doctor / ambulance (120).'],
                ['请帮我叫警察。（110）','Please call the police (110).'],
                ["我的护照/手机/钱包丢了，请帮帮我。","I've lost my passport / phone / wallet. Please help."]
            ]},
            { id:'daily', icon:'🤝', en:'Daily Helpers', zh:'日常便利', phrases:[
                ['请问洗手间在哪里？','Where is the restroom?'],
                ['可以帮我拍张照吗？','Could you take a photo for me, please?'],
                ["我用翻译软件和你交流，请稍等。","I'll use a translation app with you, one moment please."]
            ]}
        ];

        const CITY_WEATHER = ['Beijing','Shanghai','Guangzhou','Shenzhen','Chengdu','Hangzhou','Xi’an','Kunming'];
        const MAP_CITIES = ['Beijing','Shanghai','Guangzhou','Shenzhen','Chengdu','Hangzhou'];

        return {
            TOOLS,
            CURRENCIES,
            USD_RATES,
            PHRASE_SCENES,
            CITY_WEATHER,
            MAP_CITIES
        };
})();
