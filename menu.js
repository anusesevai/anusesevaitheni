/* =========================================================
   COMMON MENU LOADER
   THENI ANU'S E-SEVAI
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuContainer =
        document.getElementById("common-menu");

    if (!menuContainer) {
        return;
    }


    /* =====================================================
       LOAD COMMON MENU
       ===================================================== */

    fetch("menu.html")

        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "menu.html could not be loaded"
                );
            }

            return response.text();

        })

        .then(function (html) {

            /* Insert Common Menu */

            menuContainer.innerHTML = html;


            /* =================================================
               GET MENU ELEMENTS
               ================================================= */

            const menuButton =
                document.getElementById(
                    "commonMenuButton"
                );

            const menu =
                document.getElementById(
                    "commonMenu"
                );


            /* =================================================
               MOBILE HAMBURGER MENU
               ================================================= */

            if (menuButton && menu) {

                menuButton.addEventListener(
                    "click",
                    function () {

                        menu.classList.toggle(
                            "mobile-open"
                        );


                        const isOpen =
                            menu.classList.contains(
                                "mobile-open"
                            );


                        menuButton.setAttribute(
                            "aria-expanded",
                            isOpen ? "true" : "false"
                        );

                    }
                );


                /* =============================================
                   CLOSE MENU AFTER CLICKING LINK
                   ============================================= */

                menu.querySelectorAll("a")
                    .forEach(function (link) {

                        link.addEventListener(
                            "click",
                            function () {

                                menu.classList.remove(
                                    "mobile-open"
                                );


                                menuButton.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }
                        );

                    });

            }


            /* =================================================
               ACTIVE MENU
               ================================================= */

            const currentPage =
                window.location.pathname
                    .split("/")
                    .pop()
                    .toLowerCase();


            menu.querySelectorAll("a")
                .forEach(function (link) {

                    const href =
                        link.getAttribute("href") || "";


                    const linkPage =
                        href
                            .split("#")[0]
                            .split("/")
                            .pop()
                            .toLowerCase();


                    if (
                        linkPage !== "" &&
                        linkPage === currentPage
                    ) {

                        link.classList.add(
                            "common-active"
                        );

                    }

                });


            /* =================================================
               INDEX PAGE SECTION LINKS
               ================================================= */

            if (
                currentPage === "" ||
                currentPage === "index.html"
            ) {

                menu.querySelectorAll(
                    'a[href^="index.html#"]'
                ).forEach(function (link) {

                    const href =
                        link.getAttribute("href");


                    const hash =
                        href.substring(
                            href.indexOf("#")
                        );


                    link.setAttribute(
                        "href",
                        hash
                    );

                });

            }

        })


        /* =====================================================
           ERROR HANDLING
           ===================================================== */

        .catch(function (error) {

            console.error(
                "Common Menu Error:",
                error
            );

        });

});