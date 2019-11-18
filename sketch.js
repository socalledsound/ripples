// Coding Challenge #102: 2D Water Ripple - 
// Video: https://www.youtube.com/watch?v=BZUdGqeOD0w
// Algorithm: https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm 
  let cols, rows,
    current = [],
    previous = [],
    damping = 0.95;

//introduce one white pixel to this black screen
  function mouseDragged() {
    current[mouseX][mouseY] = 255
    // current[mouseX][mouseY+1] = 255
    // current[mouseX][mouseY-1] = 255
    // current[mouseX+1][mouseY] = 255
    // current[mouseX+1][mouseY+1] = 255
    // current[mouseX+1][mouseY-1] = 255
    // current[mouseX-1][mouseY] = 255
    // current[mouseX-1][mouseY+1] = 255
    // current[mouseX-1][mouseY-1] = 255
  }

  function setup() {
    pixelDensity(1)
    createCanvas(400, 400)
    cols = width;
    rows = height;
  //initialize both  2d arrays, all black
    for (let i = 0; i < cols; i++) {
      current[i] = []
      previous[i] = []
      for (let j = 0; j < rows; j++) {
        current[i][j] = 0
        previous[i][j] = 0
      }
    }
    //but put one black pixel in 
    previous[200][200] = 255
  }

  function draw() {
   // background(0);
    loadPixels()
    

   //iterate through the pixel arrays
    for (let i = 1; i < cols - 1; i++) {
      for (let j = 1; j < rows - 1; j++) {
        current[i][j] =
          (previous[i - 1][j] + 
           previous[i + 1][j] +
            previous[i][j - 1] + 
           previous[i][j + 1] +
            previous[i - 1][j - 1] + 
           previous[i - 1][j + 1] +
            previous[i + 1][j - 1] + 
            previous[i + 1][j + 1]
          ) / 4 - current[i][j];
        
        //add some damping to the ripples so they don't explode
        current[i][j] = current[i][j] * damping
        
        //our formula for finding a pixel location
        let index = (i + j * cols) * 4;
        
        //the current pixel
        let n = current[i][j];
        
        //you could try adding some color here
//         let r = 0.5-cos(n*17.0);
//         let g = 0.5-cos(n*13.0);
//         let b = 0.5-cos(n*23.0);
        
//         if(i === 1 && j ==1){
//         console.log(r);
//         }
        
        //this should look pretty familiar
         pixels[index + 0] = n * 255;
         pixels[index + 1] = n * 255;
         pixels[index + 2] = n * 255;
        pixels[index + 3] = 255;
    
      }
    }
    updatePixels()

    //swap buffers
    let temp = previous
    previous = current
    current = temp
  
  }
