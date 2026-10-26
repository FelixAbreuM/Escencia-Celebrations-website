# Escencia Celebrations

#### Video Demo: https://youtu.be/SmPRjjxmbto

#### Description:

Escencia Celebrations is a responsive website for an event décor business serving Ellijay and the surrounding North Georgia communities. The site gives prospective customers a clear way to learn about the business, see examples of its work, explore its event services, arrange a consultation, and request a quote. I built it as a small, polished business website rather than a generic portfolio: each section helps a visitor move from inspiration toward getting in touch.

The page opens with the business name, service area, a featured event photograph, and two useful actions: booking a consultation or requesting an event quote. The portfolio has three categories—weddings, birthdays, and other celebrations. Selecting a category updates the gallery on the page, including its title, description, and photo count. Visitors can open any gallery image in a larger view. The services section summarizes décor for weddings, birthdays, and other occasions. The contact area explains how to book a one-hour consultation and includes a form for sharing event and contact details. The footer repeats direct phone, text, email, and Instagram links so customers can find them easily.

### Files and how they work

`index.html` contains the page structure and the text customers see. It organizes the navigation, introduction, portfolio, services, consultation information, quote form, and footer into semantic sections. It also loads Bootstrap, the project’s stylesheets, the site configuration, and the JavaScript. I kept the page content in HTML so its headings, labels, links, and form fields remain understandable even before the interactive behavior is considered.

`app.js` makes the page interactive. It stores the titles, descriptions, image paths, and captions for each portfolio category, then renders the selected collection when a visitor chooses a category. It also opens gallery images in a Bootstrap modal and supports opening them with the keyboard. The script reads the booking link and quote submission endpoint from the site configuration, updates the consultation buttons when a booking URL is available, closes the mobile navigation after a link is chosen, and handles quote form submission. The form displays progress, success, or fallback messages, and includes a hidden honeypot field to help catch basic automated submissions.

`site-config.js` keeps the external service URLs in one small configuration file instead of scattering them through the page logic. It currently supplies the Cal.com consultation link and the Formspree quote form endpoint. This makes it easier to change either connection without searching through the HTML or rewriting the gallery code.

The CSS is divided by responsibility so each part of the design can be adjusted without making one large stylesheet difficult to navigate. `styles/global.css` defines the shared color palette, typography, buttons, section spacing, and visible keyboard-focus styles. `styles/header.css` styles the service-area banner, brand and navigation, and the featured introduction. `styles/portfolio.css` controls the category cards, responsive gallery, captions, and enlarged-image view. `styles/services.css` styles the service summaries, consultation details, quote form, and its status messages. `styles/footer.css` handles the footer layout and contact links.

The `assets` folder contains the visual identity and portfolio photography. `assets/logo.png` and `assets/logo-mark.png` provide the business logo artwork. `assets/weddings/` contains eight wedding images: `GRW09713.jpg`, `GRW09746.jpg`, `GRW09754.jpg`, `GRW09781.jpg`, `GWD02855.jpg`, `GWD02866.jpg`, `GWD02883.jpg`, and `GWD03387.jpg`. `assets/birthdays/Minnies_birthday.jpg` is the birthday portfolio image. `assets/celebrations/` contains four additional event photos: `Anniversary.jpg`, `Even-2.jpg`, `Event-1.jpg`, and `Private_event.jpg`. The JavaScript supplies descriptive alternative text and captions for gallery images to make the collection easier to understand.

`.vscode/settings.json` sets the Live Server preview port to `5501` for this development workspace.

### Design choices

I chose a single-page layout because the business needs a compact introduction, portfolio, services, and contact path; visitors can move between them without waiting for separate pages to load. The portfolio uses category buttons rather than displaying every image in one long grid. That keeps the page organized while still letting visitors browse the work they care about. Images open in a larger view so details are easier to see without leaving the page.

I separated the styles into focused files to make visual changes easier to maintain, while using Bootstrap for the responsive grid and modal behavior instead of recreating those common interface patterns from scratch. The custom CSS provides the brand colors, typography, and layout details. I also included semantic headings, form labels, descriptive image text, keyboard focus indicators, and live status messages so the site is more usable with keyboards and assistive technology.

The quote form asks for event details that help prepare a useful response, including the event type, date, location, guest count, and budget range. Since sending a quote request depends on an external service, the page reports whether submission succeeded and offers a phone or text fallback if the service is unavailable. Consultation booking is handled through a separate calendar link, keeping scheduling distinct from quote inquiries. Together, these choices make the site useful.
