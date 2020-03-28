// assumes circles not squares
export function contact(sprite1, sprite2) {
  // return contactFirst(sprite1, sprite2);
  return cirleCollision(sprite1, sprite2);
  // return rectIntersect(
  //   sprite1.x,
  //   sprite1.y,
  //   sprite1.width,
  //   sprite1.height,
  //   sprite2.x,
  //   sprite2.y,
  //   sprite2.width,
  //   sprite2.height
  // );
};

function cirleCollision(circle1, circle2) {
  circle1.radius = circle1.width/2;
  circle2.radius = circle2.width/2;

  var dx = circle1.x - circle2.x;
  var dy = circle1.y - circle2.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < circle1.radius + circle2.radius) {
    return true;
  }
  return false;
}

// see https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
  console.log("rect")
  // Check x and y for overlap
  if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
      return false;
  }
  return true;
};

function circleIntersect(x1, y1, r1, x2, y2, r2) {
  // Calculate the distance between the two circles
  var squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);

  // When the distance is smaller or equal to the sum
  // of the two radius, the circles touch or overlap
  return squareDistance <= ((r1 + r2) * (r1 + r2))
};

/**
* -----------------------------------------------
* Contact function - have two sprites connected?  
* see https://github.com/kittykatattack/learningPixi#the-hittestrectangle-function
* -----------------------------------------------
*/
export function contactFirst(r1, r2) {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  
    //hit will determine whether there's a collision
    hit = false; // assume not to start
  
    // console.log("h", r1.height, r2.height);
  
    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;
  
    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;
  
    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
  
    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  
    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      //A collision might be occurring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        //There's definitely a collision happening
        hit = true;
      }
    }
  
    //`hit` will be either `true` or `false`
    return hit;
  };
  
  
  // not used yet
  export function wrap(original, xbounds, ybounds, width, height) {
    var item = Object.assign({}, original);

    if (item.x < xbounds) {
      item.x += width;
    }
    else if (item.x > xbounds + width) {
      item.x -= width;
    }
    if (item.y < ybounds) {
      item.y += height;
    }
    else if (item.y > ybounds + height) {
      item.y -= height;
    }
    return item;
  };