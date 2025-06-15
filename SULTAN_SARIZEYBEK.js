(() => {
    const startApp = () => {
        const checkCurrentPage = () =>
            window.location.pathname === "/" || window.location.pathname === "/index.html";
        if (!checkCurrentPage()) return console.log("wrong page");
        const self = {
            buildHTML,
            buildCSS,
            displayItems,
            setEvents,
        };
        const cachedData = localStorage.getItem("productListData"), likedItems = JSON.parse(localStorage.getItem("userFavorites") || "[]");
        if (cachedData) {
            const itemList = JSON.parse(cachedData);
            self.buildHTML();
            self.buildCSS();
            self.displayItems(itemList, likedItems);
            self.setEvents();
        } else {
            fetch(
                "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
            )
                .then((response) => response.json())
                .then((itemList) => {
                    localStorage.setItem("productListData", JSON.stringify(itemList));
                    self.buildHTML();
                    self.buildCSS();
                    self.displayItems(itemList, likedItems);
                    self.setEvents(itemList);
                })
                .catch(function (e) {
                    if (e && e.message) {
                        console.log("Error message:", e.message);
                    } else {
                        console.log("Unknown error occurred:", e);
                    }
                });      
        }
    };
  
    const buildHTML = () => {
        const htmlContent = `
            <product-showcase>
                <div class="banner">
                    <div class="container">
                        <showcase-header class="ng-star-inserted">
                            <div class="banner__titles">
                                <h2 class="title-primary">Beğenebileceğinizi düşündüklerimiz</h2>
                            </div>
                        </showcase-header>
                        <div class="banner__wrapper ng-star-inserted">
                            <div>
                                <item-slider class="product-list__best-products">
                                    <div class="owl-carousel owl-theme owl-loaded owl-responsive owl-drag">
                                        <div class="owl-stage-outer ng-star-inserted">
                                            <div class="ng-tns-c125-3">
                                                <div class="owl-stage" id="items-display">
                                                    <!-- Products will be rendered here -->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="owl-nav disabled ng-star-inserted">
                                            <div class="owl-prev" id="slider-prev"><i class="icon icon-prev"></i></div>
                                            <div class="owl-next" id="slider-next"><i class="icon icon-next"></i></div>
                                        </div>
                                    </div>
                                </item-slider>
                                <button aria-label="back" class="swiper-prev"></button>
                                <button aria-label="next" class="swiper-next"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </product-showcase>
        `;
  
        const targetSection = document.querySelector("cx-page-slot.Section2A");
        targetSection && targetSection.insertAdjacentHTML("afterbegin", htmlContent);
    };
    const buildCSS = () => {
        const styleSheet = document.createElement("style");
        styleSheet.innerHTML = `
            .heart-icon.hovered {
                display: none;
            }
            .heart:hover .heart-icon {
                display: none;
            }
            .heart:hover .heart-icon.hovered {
                display: inline-block;
            }
            .owl-carousel {
                cursor: grab;
            }
            .owl-carousel:active {
                cursor: grabbing;
            }
            .disabled {
                opacity: 0.5;
                cursor: default !important;
                pointer-events: none;
            }
            .owl-item img {
                pointer-events: none; 
            }
            .owl-item a {
                pointer-events: auto; 
            }
            .owl-stage {
                touch-action: pan-y;
                display: flex;
                transition: transform 0.5s ease;
            }
            .wish-list-btn a {
                z-index: 10; 
                position: relative;
            }
            .owl-item {
                flex: 0 0 auto;
                margin-right: 20px;
            }
            @media (max-width: 575px) {
                .owl-item {
                    width: calc(100vw - 40px);
                    max-width: 280px;
                    margin-right: 15px;
                }
                .product-item {
                    width: 100%;
                }
                .product-item__img img {
                    width: 100%;
                    height: auto;
                    max-height: 200px;
                    object-fit: cover;
                }
                .banner__titles h2 {
                    font-size: 1.2rem;
                }
            }
            @media (min-width: 576px) and (max-width: 767px) {
                .owl-item {
                    width: calc(50vw - 30px);
                    max-width: 250px;
                    margin-right: 20px;
                }
                .product-item__img img {
                    width: 100%;
                    height: auto;
                    max-height: 220px;
                    object-fit: cover;
                }
            }
            @media (min-width: 768px) and (max-width: 991px) {
                .owl-item {
                    width: calc(33.333vw - 27px);
                    max-width: 280px;
                    margin-right: 20px;
                }
                .product-item__img img {
                    width: 100%;
                    height: auto;
                    max-height: 240px;
                    object-fit: cover;
                }
            }
            @media (min-width: 992px) and (max-width: 1199px) {
                .owl-item {
                    width: calc(25vw - 25px);
                    max-width: 300px;
                    margin-right: 20px;
                }
                .product-item__img img {
                    width: 100%;
                    height: auto;
                    max-height: 260px;
                    object-fit: cover;
                }
            }
            @media (min-width: 1200px) {
                .owl-item {
                    width: calc(20vw - 24px);
                    max-width: 320px;
                    margin-right: 20px;
                }
                .product-item__img img {
                    width: 100%;
                    height: auto;
                    max-height: 280px;
                    object-fit: cover;
                }
            }
            @media (min-width: 1400px) {
                .owl-item {
                    width: calc(16.666vw - 23px);
                    max-width: 350px;
                    margin-right: 20px;
                }
            }
            .product-item {
                width: 100%;
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            
            .product-item-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: 10px;
            }
            
            .product-item__brand {
                font-size: clamp(0.8rem, 2vw, 1rem);
                line-height: 1.2;
                margin-bottom: 8px;
            }
            
            .product-item__price {
                margin-top: auto;
                font-size: clamp(0.9rem, 2.5vw, 1.1rem);
            }
            
            .product-item__old-price {
                font-size: clamp(0.7rem, 2vw, 0.9rem);
            }
            
            .product-item__percent {
                font-size: clamp(0.6rem, 1.8vw, 0.8rem);
            }
            .owl-nav {
                display: flex;
                justify-content: space-between;
                position: absolute;
                top: 50%;
                width: 100%;
                transform: translateY(-50%);
                pointer-events: none;
            }
            
            .owl-prev, .owl-next, .swiper-prev, .swiper-next {
                pointer-events: all;
                background: rgba(255, 255, 255, 0.8);
                border: 1px solid #ddd;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            @media (max-width: 768px) {
                .owl-prev, .owl-next, .swiper-prev, .swiper-next {
                    width: 35px;
                    height: 35px;
                }
            }
            
            .owl-prev:hover, .owl-next:hover, .swiper-prev:hover, .swiper-next:hover {
                background: rgba(255, 255, 255, 0.95);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }
        `;
        document.head.appendChild(styleSheet);
    };
    const displayItems = (itemList, likedItems) => {
        const displayArea = document.getElementById("items-display");
        let itemsMarkup = "";
        for (const item of itemList) {
            const isLiked = likedItems.includes(item.id);
            const discountPercent =
                item.original_price > item.price
                    ? Math.round(
                        ((item.original_price - item.price) / item.original_price) * 100
                    )
                    : 0;
            itemsMarkup += `
                <div class="owl-item ng-tns-c125-3 ng-trigger ng-trigger-autoHeight active ng-star-inserted">
                    <div class="ins-web-smart-recommender-box-item ng-star-inserted">
                        <div event-collection="true" class="ins-product-box ins-element-link ins-add-to-cart-wrapper ins-sr-api" ins-product-id="${item.id}">
                            <showcase-item class="ng-star-inserted">
                                <div class="product-item">
                                    <generic-link class="product-item-anchor" event-collection="true">
                                        <a class="product-item-anchor ng-star-inserted" href="${item.url}" target="_blank">
                                            <figure class="product-item__img ng-star-inserted">
                                                <span class="d-flex flex-column align-items-start justify-content-end position-absolute bottom-0">
                                                    <new-badge class="mb-3"></new-badge>
                                                </span>
                                                <cx-media alt="Popular" format="product" class="is-initialized">
                                                    <img class="ng-star-inserted ls-is-cached lazyloaded" alt="${item.name}" src="${item.img}">
                                                </cx-media>
                                                <div class="d-flex ml-4"></div>
                                            </figure>
                                            <div class="product-item-content ng-star-inserted">
                                                <generic-link class="product-item-anchor">
                                                    <a class="product-item-anchor ng-star-inserted" href="${item.url}">
                                                        <h2 class="product-item__brand ng-star-inserted">
                                                            <b>${item.brand} - </b>
                                                            <span>${item.name}</span>
                                                        </h2>
                                                    </a>
                                                </generic-link>
                                                <div class="product-item__price">
                                                    ${item.original_price > item.price
                    ? `<div class="d-flex align-items-center ng-star-inserted">
                                                                <span class="product-item__old-price ng-star-inserted">${item.original_price.toFixed(2)} TL</span>
                                                                <span class="product-item__percent carousel-product-price-percent ml-2 ng-star-inserted">%${discountPercent} <i class="icon icon-decrease"></i></span>
                                                            </div>
                                                            <span class="product-item__new-price discount-product ng-star-inserted">${item.price.toFixed(2)} TL</span>`
                    : `<span class="product-item__new-price ng-star-inserted">${item.price.toFixed(2)} TL</span>`
                }
                                                </div>
                                            </div>
                                            <div class="product-list-promo ng-star-inserted"></div>
                                        </a>
                                    </generic-link>
                                    <wish-list-btn>
                      <a href="javascript:void(0)" class="ng-star-inserted" data-item-id="${item.id}">
                        <div class="heart ng-star-inserted">
                          ${isLiked
                    ? `<img src="assets/svg/added-favorite.svg" alt="heart fill" class="heart-icon">
                             <img src="assets/svg/added-favorite-hover.svg" alt="heart fill" class="heart-icon hovered">`
                    : `<img id="default-favorite" src="assets/svg/default-favorite.svg" alt="heart" class="heart-icon">
                             <img src="assets/svg/default-hover-favorite.svg" alt="heart" class="heart-icon hovered">`
                }
                          <div class="toolbox">
                            <div class="toolbox-triangle"></div>
                            <span>Listelerimi güncelle</span>
                          </div>
                        </div>
                      </a>
                    </wish-list-btn>
                                    <div class="product-item-content">
                                        <div class="product-item__price">
                                            <div class="ins-add-to-cart-wrapper" ins-product-id="${item.id}">
                                                <cart-button buttonclass="close-btn">
                                                    <form novalidate="" class="ng-untouched ng-pristine ng-valid ng-star-inserted">
                                                        <button id="addToCartBtn" type="submit" class="btn close-btn disable ng-star-inserted">Sepete Ekle</button>
                                                    </form>
                                                </cart-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </showcase-item>
                        </div>
                    </div>
                </div>
            `;
            }
  
        displayArea && (displayArea.innerHTML = itemsMarkup);
    };
    const getResponsiveValues = () => {
        const w = window.innerWidth;
        const breakpoints = [576, 768, 992, 1200, 1400];
        const items = [1, 2, 3, 4, 5, 6];
      
        const index = breakpoints.findIndex(bp => w < bp);
        return { itemsPerView: index === -1 ? 6 : items[index] };
    };
    const setEvents = (itemList) => {
        const heartButtons = document.querySelectorAll("wish-list-btn a");
        for (const heartBtn of heartButtons) {
            heartBtn.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
        
                const itemId = parseInt(this.getAttribute("data-item-id"));
                const likedItems = JSON.parse(localStorage.getItem("userFavorites")) || [];
        
                const itemIndex = likedItems.indexOf(itemId);
                const heartElement = this.querySelector(".heart");
        
                if (itemIndex === -1) {
                    likedItems.push(itemId);
                    heartElement.innerHTML = `
                        <img src="assets/svg/added-favorite.svg" alt="heart fill" class="heart-icon">
                        <img src="assets/svg/added-favorite-hover.svg" alt="heart fill" class="heart-icon hovered">
                        <div class="toolbox">
                            <div class="toolbox-triangle"></div>
                            <span>Listelerimi güncelle</span>
                        </div>
                    `;
                } else {
                    likedItems.splice(itemIndex, 1);
                    heartElement.innerHTML = `
                        <img id="default-favorite" src="assets/svg/default-favorite.svg" alt="heart" class="heart-icon">
                        <img src="assets/svg/default-hover-favorite.svg" alt="heart" class="heart-icon hovered">
                        <div class="toolbox">
                            <div class="toolbox-triangle"></div>
                            <span>Listelerimi güncelle</span>
                        </div>
                    `;
                }
        
                localStorage.setItem("userFavorites", JSON.stringify(likedItems));
            });
        }
        const itemLinks = document.querySelectorAll(".product-item-anchor");
        for (const link of itemLinks) {
            link.addEventListener("click", function (e) {
                return !window.isDragging ? true : (e.preventDefault(), false);
            });
        }
        let currentPosition = 0;
        const displayArea = document.getElementById("items-display");
        if (!displayArea) return;
        const calculateSliderValues = () => {
            const sliderItems = document.querySelectorAll(".owl-item");
            if (sliderItems.length === 0) return null;
            const { itemsPerView } = getResponsiveValues();
            const itemWidth = sliderItems[0].getBoundingClientRect().width + 
                             parseInt(getComputedStyle(sliderItems[0]).marginRight);
  
            const totalCount = sliderItems.length;
            const maxPosition = Math.max(0, (totalCount - itemsPerView) * itemWidth);
            return { itemWidth, maxPosition, itemsPerView, totalCount };
        };
        const smoothScroll = function scrollToPosition(position) {
            displayArea.style.transition = "transform 0.5s ease";
            displayArea.style.transform = `translateX(-${position}px)`;
        };
        const updateNavigation = () => {
            const values = calculateSliderValues();
            if (!values) return;
            const { maxPosition } = values;
            const prevBtn = document.getElementById("slider-prev");
            const nextBtn = document.getElementById("slider-next");
            const swiperPrev = document.querySelector(".swiper-prev");
            const swiperNext = document.querySelector(".swiper-next");
            [prevBtn, swiperPrev].forEach(btn => {
                btn && (currentPosition <= 0 ? btn.classList.add("disabled") : btn.classList.remove("disabled"));
            });
            [nextBtn, swiperNext].forEach(btn => {
                btn && (currentPosition >= maxPosition
                    ? btn.classList.add("disabled")
                    : btn.classList.remove("disabled"));
                  
            });
        };
        const setupNavigation = () => {
            const prevBtn = document.getElementById("slider-prev");
            const nextBtn = document.getElementById("slider-next");
            const swiperPrev = document.querySelector(".swiper-prev");
            const swiperNext = document.querySelector(".swiper-next");
            const buttons = [prevBtn, swiperPrev];
            for (let i = 0; i < buttons.length; i++) {
                const btn = buttons[i];
                if (btn) {
                    btn.addEventListener("click", () => {
                        const values = calculateSliderValues();
                        if (!values || currentPosition <= 0) return;
                        const { itemWidth } = values;
                        currentPosition = Math.max(0, currentPosition - itemWidth);
                        smoothScroll(currentPosition);
                        updateNavigation();
                    });
                }
            }
            [nextBtn, swiperNext].forEach(btn => {
                if (btn) {
                    btn.addEventListener("click", () => {
                        const values = calculateSliderValues();
                        if (!values) return;
                        const { itemWidth, maxPosition } = values;
                        if (currentPosition >= maxPosition) return;
                        currentPosition = Math.min(maxPosition, currentPosition + itemWidth);
                        smoothScroll(currentPosition);
                        updateNavigation();
                    });
                }
            });
        };
        setupNavigation();
        const sliderContainer = document.querySelector(".owl-carousel");
        window.isDragging = false;
        let startPoint = 0;
        let startPosition = 0;
        let moveThreshold = 5;
        let hasMoved = false; 
        sliderContainer.addEventListener("mousedown", (e) => {
            if (e.target.closest("button") || e.target.closest("wish-list-btn a")) return;
            window.isDragging = true;
            startPoint = e.clientX;
            startPosition = currentPosition;
            sliderContainer.style.cursor = "grabbing";
            hasMoved = false;
            e.preventDefault();
        });
        document.addEventListener("mousemove", (e) => {
            if (!window.isDragging) return;
            const deltaX = e.clientX - startPoint;
            hasMoved = Math.abs(deltaX) > moveThreshold ? true : hasMoved;
            switch (hasMoved) {
                case true:
                  const values = calculateSliderValues();
                  if (!values) break;
                  const { maxPosition } = values;
                  let newPosition = startPosition - deltaX;
                  newPosition = Math.max(0, Math.min(maxPosition, newPosition));
                  displayArea.style.transition = "none";
                  displayArea.style.transform = `translateX(-${newPosition}px)`;
                  break;
              }
              
        });
        document.addEventListener("mouseup", (e) => {
            if (!window.isDragging) return;
            if (!hasMoved) {
                const clickedItem = e.target.closest(".product-item-anchor");
                clickedItem?.href && window.open(clickedItem.href, "_blank");
            } else {
                const values = calculateSliderValues();
                if (values) {
                    const { itemWidth, maxPosition } = values;
                    const transformMatrix = new DOMMatrix(getComputedStyle(displayArea).transform);
                    const currentPos = -transformMatrix.m41;
  
                    currentPosition = Math.round(currentPos / itemWidth) * itemWidth;
                    currentPosition = Math.max(0, Math.min(maxPosition, currentPosition));
                    smoothScroll(currentPosition);
                    updateNavigation();
                }
            }
            window.isDragging = false;
            hasMoved = false;
            sliderContainer.style.cursor = "grab";
        });
        const images = sliderContainer.querySelectorAll("img");
        images.forEach((img) => {
            img.addEventListener("dragstart", (e) => {
                e.preventDefault();
            });
        });
        setTimeout(() => {
            updateNavigation();
        }, 100);
        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const values = calculateSliderValues();
                if (!values) return;
                const { maxPosition } = values;
                currentPosition > maxPosition && (currentPosition = maxPosition, smoothScroll(currentPosition));
                updateNavigation();
            }, 250);
        });
    };
    startApp();
  })();