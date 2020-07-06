const escpos = require('escpos');
 
// Select the adapter based on your printer type
const device  = new escpos.USB(0x0456, 0x0808);
// const device  = new escpos.Network('localhost');
//const device  = new escpos.Serial('/dev/usb/lp0');
 
const options = { encoding: "GB18030" /* default */ }
// encoding is optional
 
const printer = new escpos.Printer(device, options);
 
 
 
device.open(function(){
  printer
  .font('a')
  .align('ct')
  .style('bu')
  .size(1, 1)
  .text('Order 1234 From To The High Street')
  .text(' 0800 1234565')
  .control('LF')
  .control('LF')  
  .control('LF')
  .control('LF')  
  .text('2 * Blossom Hill Crisp & Fruity @ 10')
  .text('2 * Crates of Fosters @ 20')
  .control('LF')
  .control('LF')
  .text('Order Total: 30')
  .control('LF')
  .control('LF')  
  .control('LF')
  .control('LF')  
  .close()
});