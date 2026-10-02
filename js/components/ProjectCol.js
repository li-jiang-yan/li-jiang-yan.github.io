import { render } from "../render.js";


export function ProjectCol(object) {
  const btnGroup = BtnGroup();
  const result = Fragment(
    Col(
      Card(
        Thumbnail(object.thumbnail),
        CardBody(
          CardTitle(object.title),
          CardText(object.text),
          Dflex(btnGroup, Small(object.skills.join(', '))
          )
        )
      )
    )
  );

  // Collapse/Carousel
  if (object.carousel.length !== 0) {
    const collapseId = crypto.randomUUID();
    btnGroup.appendChild(ViewButton(collapseId));

    const carouselId = crypto.randomUUID();
    const carouselItems = object.carousel.map(object => CarouselItem(object));
    carouselItems[0].classList.add('active');
    result.appendChild(
      Collapse(
        collapseId,
        CollapseCard(
          Carousel(
            carouselId,
            CarouselControl('prev', carouselId),
            CarouselInner(...carouselItems),
            CarouselControl('next', carouselId)
          )
        )
      )
    );
  }

  // GitHub Button
  if (object.link !== '') {
    btnGroup.appendChild(GitHubButton(object.link));
  }

  return result;
}


function Fragment(...children) {
  const result = document.createDocumentFragment();
  result.replaceChildren(...children);
  return result;
}


function Col(...children) {
  const result = render('<div class="col"></div>');
  result.replaceChildren(...children);
  return result;
}


function Card(...children) {
  const result = render('<div class="card shadow-sm"></div>');
  result.replaceChildren(...children);
  return result;
}


function Thumbnail(thumbnailField) {
  if (thumbnailField.startsWith('../../assets/images/')) {
    return ImageThumbnail(thumbnailField);
  } else if (thumbnailField.startsWith('../../assets/videos/')) {
    return VideoThumbnail(thumbnailField);
  } else {
    return BlankThumbnail();
  }
}


function ImageThumbnail(thumbnailField) {
  return render(`<img src="${thumbnailField}" class="object-fit-contain" height="225"></img>`);
}


function VideoThumbnail(thumbnailField) {
  return render(
    `<video src="${thumbnailField}" class="object-fit-contain" height="225" autoplay></video>`
  );
}


function BlankThumbnail() {
  return render(
    `<svg
      aria-label="Placeholder: Thumbnail"
      class="bd-placeholder-img card-img-top"
      height="225"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="#55595c"></rect>
      <text x="50%" y="50%" fill="#eceeef" dy=".3em">
        Thumbnail
      </text>
    </svg>`
  );
}


function CardBody(...children) {
  const result = render('<div class="card-body"></div>')
  result.replaceChildren(...children);
  return result;
}


function CardTitle(textContent) {
  const result = render('<h5 class="card-title"></h5>');
  result.textContent = textContent;
  return result;
}


function CardText(textContent) {
  const result = render('<p class="card-text"></p>');
  result.textContent = textContent;
  return result;
}


function Dflex(...children) {
  const result = render(
    '<div class="d-flex justify-content-between align-items-center"></div>'
  );
  result.replaceChildren(...children);
  return result;
}


function BtnGroup(...children) {
  const result = render('<div class="btn-group"></div>');
  result.replaceChildren(...children);
  return result;
}


function ViewButton(collapseId) {
  return render(
    `<button
      type="button"
      class="btn btn-sm btn-outline-secondary"
      data-bs-toggle="collapse"
      href="#${collapseId}"
    >
      View
    </button>`
  );
}

function GitHubButton(hrefField) {
  return render(
    `<a type="button" class="btn btn-sm btn-outline-secondary" href=${hrefField}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-github"
        viewBox="0 0 16 16"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
      </svg>
    </a>`
  );
}


function Small(textContent) {
  const result = render('<small class="text-body-secondary text-end"></small>');
  result.textContent = textContent;
  return result;
}


function Collapse(id, ...children) {
  const result = render(
    `<div class="collapse w-100 project-collapse" id="${id}" data-bs-parent="#projects"></div>`
  );
  result.replaceChildren(...children);
  return result;
}


function CollapseCard(...children) {
  const result = render('<div class="card card-body"></div>');
  result.replaceChildren(...children);
  return result;
}


function Carousel(id, ...children) {
  const result = render(`<div id="${id}" class="carousel slide"></div>`);
  result.replaceChildren(...children);
  return result;
}


function CarouselInner(...children) {
  const result = render('<div class="carousel-inner" style="min-height: 500px;"></div>');
  result.replaceChildren(...children);
  return result;
}


function CarouselItem(object) {
  const result = render('<div class="carousel-item"></div>');
  result.replaceChildren(renderObject(object));
  return result;
}


function renderObject(object) {
  const result = document.createElement(object.tag);
  if (Object.hasOwn(object, "attrs")) {
    Object.entries(object.attrs).forEach(
      ([key, value]) => {
        result.setAttribute(key, value);
      }
    );
  }
  if (Object.hasOwn(object, "children")) {
    result.replaceChildren(
      ...object.children.map(
        (child) => {
          if (isObject(child)) {
            return renderObject(child);
          } else {
            return child;
          }
        }
      )
    );
  }
  return result;
}


const isObject = value => typeof value === 'object' && value !== null && !Array.isArray(value);


function CarouselControl(slide, carouselId) {
  return render(
    `<button
      class="carousel-control-${slide}"
      type="button"
      data-bs-target="#${carouselId}"
      data-bs-slide="${slide}"
    >
      <span class="carousel-control-${slide}-icon" aria-hidden="true"></span>
      <span class="visually-hidden">${slide.charAt(0).toUpperCase()}${slide.slice(1)}</span>
    </button>`
  );
}
