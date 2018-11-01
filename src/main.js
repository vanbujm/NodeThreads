import { Worker, isMainThread, workerData, parentPort, threadId } from 'worker_threads';
import recaman from './RecamanDrawer';

if (isMainThread) {
  const startTime = Date.now();

  const numWorkers = 4;

  const workers = Array.from({ length: numWorkers }, () => new Worker(__filename, { startTime }));

  const { createCanvas } = require('canvas');

  const fs = require('fs');
  const canvas = createCanvas(1920, 1080);
  const ctx = canvas.getContext('2d');

  ctx.strokeStyle = 'white';
  ctx.font = '20px Georgia';
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(100, 0);

  const sendWork = (buffer, time) => {
    const randomWorker = workers[Math.floor(Math.random() * 4)];
    randomWorker.postMessage({ buffer, time });
  };

  workers.forEach(
    worker => {
      worker.on('error', console.error);
      worker.on('exit', (code) => code !== 0 ? console.error(new Error(`Worker stopped with exit code ${code}`)) : null);
      worker.ref();

    }
  );

  const context = { height: canvas.height };

  const leftpad = (str, len, ch) => {
    str = String(str);
    let i = -1;
    if (!ch && ch !== 0) ch = ' ';
    len = len - str.length;
    while (++i < len) {
      str = ch + str;
    }
    return str;
  };

  const interval = setInterval(() => {
    context.h = context.h || 0;
    context.h += 10;
    const recamanObj = recaman(Date.now(), context);
    ctx.strokeStyle = `hsl(${context.h % 360},100%,50%)`;

    ctx.fillStyle = 'black';
    ctx.fillRect(50, 50, canvas.width, 100);
    ctx.fillStyle = 'white';
    ctx.fillText(`n=${context.series.length}`, 100, 100);
    ctx.fillStyle = 'black';

    ctx.beginPath();
    ctx.arc(...recamanObj.arc);
    ctx.stroke();

    const buffer = canvas.toBuffer();
    // fs.writeFileSync(`frames/${leftpad(context.series.length.toString(), 3, '0')}.png`, buffer);
    sendWork(buffer.toString('base64'), recamanObj.time);
  }, 1).ref();

} else {
  const terminalImage = require('terminal-image');

  parentPort.on('message', ({ buffer }) => {
    terminalImage.buffer(Buffer.from(buffer, 'base64')).then(image => {
      console.log(image);
    });
  });
}