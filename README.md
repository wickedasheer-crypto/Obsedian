# OBSEDIAN STUDIO — README
## How to Update Your Website Without Breaking Anything

---

## The Golden Rule

> **Only ever edit `data.js`.**  
> The other three files (`index.html`, `styles.css`, `app.js`) handle the structure, design, and logic.  
> `data.js` is your control panel.

---

## File Map

| File | What it does | Should you edit it? |
|---|---|---|
| `data.js` | All content: pricing, services, portfolio, testimonials | ✅ YES — your primary edit zone |
| `index.html` | Page skeleton & section structure | Only for adding new sections |
| `styles.css` | All visual styling | Only for design changes |
| `app.js` | Renders `data.js` content into HTML | ❌ Do not edit |

---

## How to Update Pricing

1. Open `data.js` in any text editor.
2. Find the `pricing: [...]` array (around line 70).
3. For each package, locate the `price` field:
   ```js
   price: "₹25,000",
   ```
4. Change the number inside the quotes. Example:
   ```js
   price: "₹35,000",   // ← Updated price
   ```
5. You can also update `priceNote` (e.g., `"per project"`, `"/ month"`).
6. Save the file. Refresh your browser. Done.

**Do NOT remove commas, brackets, or quote marks.**

---

## How to Add a Portfolio Item

1. Open `data.js` and find the `portfolio: [...]` array.
2. Copy an existing item block (from `{` to `},`) and paste it at the end of the array (before the final `]`).
3. Update the fields:
   ```js
   {
     id: 7,                                      // Increment the number
     title: "ClientName — Project Type",
     category: "cgi",                            // Must be: "cgi", "xr", "post", or "growth"
     tags: ["CGI", "FMCG", "New Product"],
     description: "Short one-line description.",
     image: "assets/portfolio/my-new-image.jpg", // Place image in /assets/portfolio/
     placeholderBg: "#FFE000"                    // Fallback colour if image is missing
   }
   ```
4. Upload your image to the `assets/portfolio/` folder on your server.
5. Save `data.js`. Refresh. The card appears automatically.

> **If you leave the `image` path blank or the file is missing**, the site gracefully shows a coloured placeholder — it will **never crash**.

---

## How to Remove a Portfolio Item

1. Find the item in the `portfolio: [...]` array.
2. Delete the entire object from `{` to the closing `},`.
3. Make sure the remaining items still have commas between them (but no trailing comma after the last item).

---

## How to Add a Testimonial

1. Find `testimonials: [...]` in `data.js`.
2. Add a new object:
   ```js
   {
     quote: "This team transformed our brand completely.",
     author: "Sunita Rao",
     title: "Founder, RaoBrands",
     avatar: "SR"   // 2 initials shown as avatar
   }
   ```

---

## How to Update Contact Details

1. Find `agency: { ... }` near the top of `data.js`.
2. Update `email`, `phone`, `location`, or social links directly.
3. **To activate the contact form**, replace the `formspreeEndpoint`:
   - Sign up free at [formspree.io](https://formspree.io)
   - Create a new form and copy your endpoint URL.
   - Replace `"https://formspree.io/f/YOUR_ENDPOINT"` with your real URL.

---

## Deploying to Your Domain

1. Upload all four files to your hosting root:
   ```
   /index.html
   /styles.css
   /app.js
   /data.js
   /assets/portfolio/  ← your portfolio images go here
   ```
2. All asset links are **relative**, so they work on any domain automatically.
3. No build step. No npm. No framework. Just upload and go.

---

## JSON Safety Checklist (before saving data.js)

- Every `{` has a matching `}`
- Every `[` has a matching `]`
- Every property value ends with a `,` **except the last one** in a block
- All strings are wrapped in double quotes `"..."`
- Numbers do NOT have quotes (unless they contain `₹` or `+`)

If you're unsure, paste your `data.js` into [jsonlint.com](https://jsonlint.com) (wrap the `OBSEDIAN_DATA = { ... }` in `{...}`) to check for errors.

---

*Made with ☕ + 🎨 by Obsedian Studio, Mumbai.*
