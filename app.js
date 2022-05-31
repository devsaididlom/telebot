const TeleBot = require('telebot');
const cfg = require('./config');
const bot = new TeleBot(cfg.token);
const fs = require('fs');
const path = require('path');
//
const rmDefault = bot.keyboard([
    [bot.button("📚Kurslar ro'yxati")],
    [bot.button("📞Bog'lanish"), bot.button("🏘Manzil")],
    [bot.button("✅Chegirmalar")]
],{resize: true});
//
const rmCources = bot.inlineKeyboard([
    [bot.inlineButton('1️⃣ - Savodhonlik',{callback: 'savodhonlik'})],
    [bot.inlineButton('2️⃣ - Web Frontend',{callback: 'front'})],
    [bot.inlineButton('2️⃣ - Web Backend',{callback: 'back'})],
    [bot.inlineButton('3️⃣ - Grafik Dizayn',{callback: 'grafik'})]
])
//
const rmBackC = bot.inlineKeyboard([
    [bot.inlineButton('🔙Ortga',{callback: 'cources'})]
])
//
bot.start();
bot.on('text', async (msg)=>{
    let cid = msg.from.id;
    let tx = msg.text;
    //
    if(tx=='/start'){
        fs.readFile(path.join(__dirname,'/','base.db'),'utf-8',(err, data)=>{
            if(err) throw err
            if(!data.includes(cid)){
                fs.appendFile(path.join(__dirname, '/', 'base.db'),'\n'+cid, (err)=>{
                        if(err) throw err
                        console .log('Bazaga kiritildi...')
                    })
            }
        })
        bot.sendMessage(cid, "👨‍💻*Salom sizni botda ko'rib turganimizdan hursandmiz!*\n_✅Bot orqali IT-PARK ning Jalaquduqdagi mahalliy filiali bilan yaqindan tanishishingiz mumkin_\n📑Kerakli bo'limni tanlang",{parseMode: 'markdown', replyMarkup: rmDefault})
    }
    //
    else if(tx=="📚Kurslar ro'yxati"){
        bot.sendMessage(cid, "👨‍🏫*Kurslarimiz ro'yhati bilan tansihib chiqing!*\n\n1️⃣* - KOMPYUTER SAVODHONLIGI*\n💻_WORD_\n🧮_EXCEL_\n🎬_POWER POINT_\n🛡_ACCESS_\n\n*2️⃣ - WEB DASTURLASH*\n🌐_Frontend_\n🛠_Backend_\n\n3️⃣* - GRAFIK DIZAYN*\n🎴_Adobe Photoshop_\n🖋_Adobe Illustrator_\n✒_CorelDraw_\n\n*💳Kurslar narxlarini pastdagi tugmalar orqali bilib olasiz!*",{ parseMode: 'markdown',replyMarkup: rmCources})
    }
    //
    else if(tx == "📞Bog'lanish"){
        bot.sendMessage(cid, "*📞Bog'lanish uchun telefon raqamlari:*\n_+998-(93)-104-22-55 | Saidislom\n+998-(93)-003-23-63 | Sanjarbek\n+998-(88)-988-39-00 | Jasurbek_\n\n*⬇Telegram orqali bog'lanish⬇*",{parseMode: 'markdown',replyMarkup: bot.inlineKeyboard([[bot.inlineButton('🆙Bog\'lanish',{url: "https://t.me/saidweb"})]])})
    }
    //
    else if(tx == "🏘Manzil"){
        bot.sendMessage(cid, "*🔗Manzilimiz: Jalaquduq tumani,Pochta binosi yonida*",{parseMode: 'markdown',replyMarkup: bot.inlineKeyboard([[bot.inlineButton('📍Joylashuv haritasi',{url: "https://goo.gl/maps/HugYpUbFCeFA7bKy8"})]])})
    }
    else if(tx == '✅Chegirmalar'){
        bot.sendMessage(cid, "*✅Chegirmalar ro'yhati bilan tanishing*\n\n_👥O'zingiz bilan yana 2 ta o'quvchi olib keling va oylik to'lovingiz uchun 50% chegirmani qo'lga kiriting\n\n👨‍👨‍👧‍👦Bitta oiladan 1 tadan ko'p o'quvchi kelsa ushbu o'quvchilar uchun chegirmalar mavjud\n\n👨‍🦽Nogironligi bor oilalar yoki shaxslar uchun alohida chegirmalar ajratilgan\n\n👨‍💻Eng iqtidorli o'quvchi uchun keyingi oy o'qish bepul_", {parseMode: 'markdown'})
    }
    else if(tx == '/send' && cid == cfg.admin){
        fs.readFile(path.join(__dirname,'/','base.db'),'utf-8',(err, data)=>{
            if(err) throw err
            var soni = data.split("\n")
            bot.sendMessage(cfg.admin, data+"\nBarchasi: "+soni.length, {parseMode: 'markdown'});
        })
    }
});
//
bot.on('callbackQuery', async msg=>{    
    let cid = msg.from.id
    let data = msg.data
    //
    if(data == 'cources'){
        bot.deleteMessage(cid, msg.message.message_id);
        bot.sendMessage(cid, "👨‍🏫*Kurslarimiz ro'yhati bilan tansihib chiqing!*\n\n1️⃣* - KOMPYUTER SAVODHONLIGI*\n💻_WORD_\n🧮_EXCEL_\n🎬_POWER POINT_\n🛡_ACCESS_\n\n*2️⃣ - WEB DASTURLASH*\n🌐_Frontend_\n🛠_Backend_\n\n3️⃣* - GRAFIK DIZAYN*\n🎴_Adobe Photoshop_\n🖋_Adobe Illustrator_\n✒_Corel Draw_\n\n*💳Kurslar narxlarini pastdagi tugmalar orqali bilib olasiz!*",{ parseMode: 'markdown',replyMarkup: rmCources})
    }
    //
    else if(data == 'savodhonlik'){
        bot.deleteMessage(cid, msg.message.message_id);
        bot.sendMessage(cid,  "📚*Kompyuter savodhonligi kursi*\n🛠_Kurs davomida:_\n1️⃣* - WORD*\n2️⃣ *- EXCEL*\n3️⃣ *- PowerPoint*\n4️⃣ *- ACCESS*\n*dasturlarida ishlashni mukammal darajada o'rganasiz!*\n📊Kurs davomiyligi 2-3 oy\n💳Oyiga 220 000 so'm",{parseMode: 'markdown',replyMarkup: rmBackC})
    }
    //
    else if(data == 'front'){
        bot.deleteMessage(cid, msg.message.message_id);
        bot.sendMessage(cid, "👨‍💻*Webdasturlash kursi*\n\n🌐_Frontend kursi davomida:_\n*1️⃣ - HTML\n2️⃣ - CSS\n3️⃣ - SASS & SCSS\n4️⃣ - JavaScript\n5️⃣ - ReactJS*\n_dasturlash texnologiyalarini o'rganasiz_\n📊Kurs davomiyligi 5-7 oy\n💳Oyiga 220 000 so'm", {parseMode: 'markdown', replyMarkup: rmBackC})
    }
    //
    else if(data == 'back'){
        bot.deleteMessage(cid, msg.message.message_id);
        bot.sendMessage(cid, "👨‍💻*Webdasturlash kursi*\n\n _🛠Backend kursi davomida:_\n*1️⃣ - JavaScript\n2️⃣ - NodeJS\n3️⃣ - ExpressJS\n4️⃣ - MongoDB\n5️⃣ - Python & Django\n6️⃣ - PostgreSQL *\n_dasturlash texnologiyalarini o'rganasiz_\n📊Kurs davomiyligi 6-8 oy\n💳Oyiga 320 000 so'm", {parseMode: 'markdown', replyMarkup: rmBackC})
    }
    //
    else if(data == 'grafik'){
        bot.deleteMessage(cid, msg.message.message_id);
        bot.sendMessage(cid,  "📚*Grafik Dizayn kursi*\n🛠_Kurs davomida:_\n1️⃣* - Adobe Photoshop\n2️⃣ - Adobe Illustrator\n3️⃣ - CorelDraw\ndasturlarida ishlashni mukammal darajada o'rganasiz!*\n📊Kurs davomiyligi 4-6 oy\n💳Oyiga 220 000 so'm",{parseMode: 'markdown',replyMarkup: rmBackC})
    }
}); 