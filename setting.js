const chalk = require("chalk")
const fs = require("fs")

global.ownerNama = "Ruslan"
global.botNama = "RusBot"
global.ownerNomer = ["6285793433348"]

global.wm = "𝑅𝑢𝑠𝐵𝑜𝑡 ⚡🔥"
global.packname = "Created By"
global.author = "RusBot\n6285218652672"
global.thumb = fs.readFileSync("./basexd/gambar/thumb.jpg")

global.mess = {
  succes: 'Done', 
  group: 'Hanya Bisa Di Gunakan Di Group', 
  botAdmin: 'Jadiin Bot Admin Dong Biar Bisa', 
  admin: 'Fitur Khusus Admin', 
  bot: 'Fitur Khusus Nomer Bot', 
  owner: 'Fitur Khusus Owner', 
  wait: 'Wait Loading', 
  error: 'Fitur Sedang Eror', 
  prem: 'Fitur Khusus User Premium', 
} 

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyanBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})