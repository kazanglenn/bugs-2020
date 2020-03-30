// assumes circles not squares
export function contact(sprite1, sprite2) {
  return cirleCollision(sprite1, sprite2);
};

// cirle collision detection algorithm
function cirleCollision(circle1, circle2) {
  circle1.radius = circle1.height / 2;
  circle2.radius = circle2.height / 2;

  var dx = circle1.x - circle2.x;
  var dy = circle1.y - circle2.y;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < circle1.radius + circle2.radius) {
    return true;
  }
  return false;
}

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