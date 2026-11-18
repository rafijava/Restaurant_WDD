# Spice Garden Restaurant (Bootstrap, No Build Tools)

A complete, responsive restaurant website built with plain HTML, CSS, JavaScript
and Bootstrap 5 (loaded via CDN). No npm, no build step, no installation needed.

## How to Run

Just double-click `index.html` to open it in your browser. That's it.

(Optional, for smoother local testing: right-click `index.html` in VS Code and
choose "Open with Live Server" if you have that extension. It is not required.)

## Pages

- `index.html` — Home
- `menu.html` — Menu with search, category filter, and veg/non-veg toggle
- `booking.html` — Table booking form with validation
- `contact.html` — Contact form with validation

## Structure

```
spice-garden-bootstrap/
  index.html
  menu.html
  booking.html
  contact.html
  css/
    style.css
  js/
    menuData.js   -> 8 menu items as a plain JS array
    menu.js       -> search + category + veg filtering logic
    booking.js    -> booking form validation
    contact.js    -> contact form validation
    main.js       -> shared footer year script
```

## Notes

- Menu images are pulled live from LoremFlickr (a free demo image service) so
  the site looks complete out of the box. Swap the `image` URLs in
  `js/menuData.js` for your own restaurant photos whenever you're ready.
- "Grilled Chicken" is set to `available: false` in `menuData.js` and shows a
  red "Unavailable" badge on its card.
- Booking form: name, phone, date, and guests are required; phone must be
  exactly 11 digits; date cannot be in the past; guests must be 1–12.
- An internet connection is needed the first time you open the pages, since
  Bootstrap, fonts, and images load from CDNs.
