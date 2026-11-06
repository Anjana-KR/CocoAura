import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';

const framesDir = path.resolve('public', 'frames');
if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

// Clean any old frames
const oldFiles = fs.readdirSync(framesDir);
for (const f of oldFiles) {
  fs.unlinkSync(path.join(framesDir, f));
}

const videoPath = path.resolve('scroll video', 'gemini_generated_video_bb5c51d0.mp4');
console.log('Extracting pristine 1080p high-clarity frames from:', videoPath);

// Extract exactly 92 frames at 1920x1080 Full HD with Lanczos scaling and CAS sharpening
const cmd = `"${ffmpegPath}" -y -i "${videoPath}" -vf "fps=fps=92/10.01,scale=1920:1080:flags=lanczos,cas=0.35" -frames:v 92 -q:v 3 "${path.join(framesDir, 'frame_%03d.jpg')}"`;
console.log('Running:', cmd);

execSync(cmd, { stdio: 'inherit' });

const extractedFiles = fs.readdirSync(framesDir).filter(f => f.endsWith('.jpg'));
console.log(`Successfully extracted ${extractedFiles.length} frames!`);
