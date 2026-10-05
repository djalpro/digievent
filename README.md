# DigiEvent

Showcase website for **DigiEvent**, a digital event management agency (corporate events, weddings, conferences, virtual and hybrid events).

Static site in pure HTML / CSS / JavaScript, no dependencies to install.

## Pages

| Page | Content |
| --- | --- |
| `index.html` | Hero, services, 4-step process, stats, testimonials, call to action |
| `about.html` | Agency story, values, key figures |
| `services.html` | Event types and pricing packages |
| `contact.html` | Contact details and form with validation |

## Structure

```
css/digievent.css   styles (CSS variables, responsive, animations)
js/main.js          burger menu, active link, scroll animations, form validation
img/                images
```

## Run locally

Open `index.html` in a browser, or start a small local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Note

The contact form only validates on the client side and shows a confirmation message.
To actually receive messages, connect it to a service such as Formspree or Netlify Forms, or to your own backend.
