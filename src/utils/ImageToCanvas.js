const drawFileImageToCanvas = (file, canvas, imageLoadedCallback) => {
  if (file && file.type.match('image.*')) {
    const reader = new FileReader();
    const context = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.style.display = 'none';
    img.onload = function() {
      context.canvas.width = img.width;
      context.canvas.height = img.height;
      context.drawImage(img, 0, 0);
      imageLoadedCallback({ w: img.width, h: img.height });
    };
    reader.readAsDataURL(file);
    reader.onload = function(evt) {
      if (evt.target.readyState === FileReader.DONE) {
        img.src = evt.target.result;
      }
    };
    return {};
  }
  return { errorType: 'notImage' };
};

export default drawFileImageToCanvas;
