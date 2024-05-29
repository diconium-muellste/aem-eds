import * as Video from '../video/video.js';
import * as Carousel from '../carousel/carousel.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      const link = col.querySelector('a');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        } else {
          const classesToAdd = [ 'carousel', 'carousel-columns' ];
          col.classList.add(...classesToAdd);
          Carousel.default(col);
        }
      } else if (link && Video.isVideo(link.href)) {
        Video.default(col);
      }
    });
  });
}
