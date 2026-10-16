# Auto Motive Car Services

Part 3 update of the Auto Motive Car Services website, with interactive vehicle discovery, form validation, and SEO improvements.

## Preview

Open the homepage to preview the website locally:

[Open the website preview](index.html)

The homepage links to the vehicle catalogue, finance and test-drive forms, gallery, reviews, contact page, general enquiry, enquiry cart, and references.

## Code

| Page | Source |
| --- | --- |
| Home, search, and comparison | [index.html](index.html) |
| Vehicles for sale and enquiry forms | [vehicles.html](vehicles.html) |
| Finance application | [finance.html](finance.html) |
| Test-drive booking | [test-drive.html](test-drive.html) |
| Vehicle gallery | [gallery.html](gallery.html) |
| Customer reviews | [reviews.html](reviews.html) |
| Contact and location | [contact.html](contact.html) |
| General enquiry form | [enquiry.html](enquiry.html) |
| Enquiry cart | [cart.html](cart.html) |
| Image and vehicle references | [references.html](references.html) |
| Shared JavaScript interactions | [script.js](script.js) |
| Shared styling and responsive layout | [styles.css](styles.css) |
| Crawler rules and sitemap | [robots.txt](robots.txt), [sitemap.xml](sitemap.xml) |

## Part 3 Changelog

- Fixed the homepage vehicle search so one handler filters comparison columns consistently; added sorting by vehicle name and price and an accessible match count.
- Added a general enquiry page with required fields, browser validation, a phone format check, and links from site navigation.
- Added Ford EcoSport, Hyundai Venue, Toyota Hilux, and Volvo XC90 listings using the supplied local photos; included them in the homepage, comparison/search table, test-drive choices, and image gallery.
- The added vehicle prices, years, mileage, and feature lists are sample catalogue data and must be verified against actual inventory before publication.
- Updated contact, finance, test-drive, review, cart, and general enquiry forms to prepare a message addressed to sales@automotivecarservices.co.za. The JavaScript reports that the email app is opening and does not claim the message was received.
- Added explicit mailto form actions as a no-JavaScript fallback and made cart vehicle labels with DOM APIs rather than interpolated HTML.
- Added canonical URLs to the site pages and listed the general enquiry page in the XML sitemap.
- Kept the existing interactive FAQ, image lightbox, vehicle cart, location map, responsive layout, and robots.txt rules.
- Documented feedback-related corrections from the previous version: removed the duplicate vehicle filter handler, corrected the misleading maximum-price option, and removed the false form-submission confirmation.

## Form Delivery

This is a static HTML site. Form validation runs in the browser and valid forms open the visitor's configured email application with a prepared message. The visitor must review and send that message. Automatic delivery or AJAX submission requires a backend or a configured form-processing service; neither is included in this repository.

## Publishing

The site can be hosted as static files on GitHub Pages, Netlify, or another static hosting service. Before publishing, confirm that `automotivecarservices.co.za` is the correct domain for canonical URLs and the sitemap, and replace the fictional dealership address and sample business details with approved information.

## Run Locally

1. Download or clone this repository.
2. Open `index.html` in a web browser.

No build tools or external dependencies are required.

## Technologies

- HTML5
- CSS3
- JavaScript (DOM interactions, vehicle filtering/sorting, and browser form validation)
- Responsive design with media queries