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
  
  
    startApp();
  })();