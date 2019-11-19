// Coding Challenge #102: 2D Water Ripple - 
// Video: https://www.youtube.com/watch?v=BZUdGqeOD0w
// Algorithm: https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm 
  let cols, rows,
    current = [],
    previous = [],
    damping = 0.99;

setTimeout(addRipple, 3000);

function addRipple(){

  current[floor(random(width))][floor(random(height))] = 255;
  damping = random(0.9,0.99);
  let interval = random(100, 1000);
  setTimeout(addRipple, interval);
}

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
  
        let left = i -1;
        let right = i + 1;
         let above = j - 1;
        let below = j + 1;
        
        current[i][j] =
          (previous[left][j] + 
           previous[right][j] +
            previous[i][above] + 
           previous[i][below] +
            previous[left][above] + 
           previous[left][below] +
            previous[right][above] + 
            previous[right][below]
          ) / 4 - (current[i][j]);
        
        //add some damping to the ripples so they don't explode
        current[i][j] = current[i][j] * damping
        
        //our formula for finding a pixel location
        let index = (i + j * cols) * 4;
        
        //the current pixel
        let n = current[i][j];
        
        //you could try adding some color here
 
         let r, g, b;
       let coin = random(1000); 
        if(coin > 800){
          
        r = 0.5-cos(n*17.0);
         g = 0.5-cos(n*13.0);
         b = 0.5-cos(n*23.0);
        } else {
          r = n;
          g = n;
          b = n;
        }
   
       


//         if(i === 1 && j ==1){
//         console.log(r);
//         }
        
        //this should look pretty familiar
         pixels[index + 0] = r*255;
         pixels[index + 1] = g*255;
         pixels[index + 2] = b*255;
        pixels[index + 3] = 255;
    
      }
    }
    updatePixels()

    //swap buffers
    let temp = previous
    previous = current
    current = temp
  
  }
