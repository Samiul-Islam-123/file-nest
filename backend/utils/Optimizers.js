//this file contains functions to optimize files basically it compresses

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const {exec} = require('child_process');

function OptimizeImage(imagePath) {
  const outputFilePath = path.join(path.dirname(imagePath), `${path.basename(imagePath, path.extname(imagePath))}.webp`);
  
  sharp(imagePath)
    .webp({ quality: 80 }) //lowering quality to 80%
    .toFile(outputFilePath, (err, info) => {
      if (err) {
        console.error('Error optimizing image:', err);
      } else {
        //delete the original file
        fs.unlink(imagePath,(err) =>{
          if(err){
            console.log("Error while deleting original file");
          }
          else

      
        console.log('Image optimized successfully:', info);
        });
        }
    });
}


function OptimizeVideo(videoPath){ 
  const outputFilePath = path.join(path.dirname(videoPath), `${path.basename(videoPath, path.extname(videoPath))}_optimized.mp4`);


  exec(`ffmpeg -i "${videoPath}" -vcodec libx265 -crf 28 -acodec aac "${outputFilePath}"`, (err, stdout, stderr) => {
    if (err) {
      console.error('Error optimizing video:', err);
    } else {exec(`ffmpeg -i "${videoPath}" -vcodec libx265 -crf 28 -acodec aac "${outputFilePath}"`, (err, stdout, stderr) => {
    if (err) {
      console.error('Error optimizing video:', err);
    } else {
      console.log('Video optimized successfully:', stdout);
      //delete the original file
    }
  });
  });
}

function OptimizeDocs(docPath){
  //I will not implement it now :)
}

function main(){
  //to simulate it
  OptimizeImage("../../users/user1/img1.jpg");
}

//main();
module.export = {OptimizeImage, OptimizeVideo, OptimizeDocs};
