# Tampermonkey scripts for bypassing

A collection of Tampermonkey userscripts that automate link bypassing and page navigation across various sites.

---

## Scripts

### 1. Shrinkme to Themezon Automator

**File:** [ShrinkmeAutomator.js](ShrinkmeAutomator.js) | **Raw:** [View](https://raw.githubusercontent.com/daoerbai-max/My-OP-tampermonkey-scripts/refs/heads/main/ShrinkmeAutomator.js)

**Sites covered:** `mrproblogger.com`, `shrinkme.click`, `themezon.net`

#### Usage

1. Install the script in Tampermonkey.
2. Navigate to any of the supported sites. The script runs automatically on page load — no manual intervention needed.

#### How it works (per site)

| Site | Behavior |
|------|----------|
| **mrproblogger.com** | Watches for the `.get-link` button to become active (the `disabled` class is removed by the server after a timer). Once enabled, it auto-clicks the button to reveal the destination link. |
| **shrinkme.click** | Reads the `data-link` attribute from the human-verification div (`#div-human-verification`) and redirects you directly to `themezon.net/link.php?link=...`, skipping the manual verification step. |
| **themezon.net** | If on a `link.php` page, auto-submits the non-search form to proceed to the next step. Otherwise, removes disabled attributes, clears CSS click-blockers (`pointer-events: none`), and auto-clicks buttons whose text matches `get`, `link`, `go`, `continue`, `submit`, or `skip`. |

#### Expected result

- **mrproblogger.com**: The page's countdown timer expires, the `.get-link` button auto-clicks, and you are taken to the final destination without waiting.
- **shrinkme.click**: You are instantly redirected through themezon.net without completing any human verification.
- **themezon.net**: Multi-step forms are auto-submitted; click-blocking overlays are removed and confirmation buttons are clicked automatically, taking you to the final link.

---

### 2. Jobustecher Automation

**File:** [Jobustecher Automation.js](Jobustecher%20Automation.js)

**Site covered:** `jobustecher.letest25.co`

#### Usage

1. Install the script in Tampermonkey.
2. Navigate to any page on `jobustecher.letest25.co`. The script detects which of the 4 pages you are on and runs the appropriate automation — no manual intervention needed.

#### How it works (per page)

| Page | Detection | Behavior |
|------|-----------|----------|
| **Page 1** | `#yuidea-btn-before`, `#yuidea-generate`, or `#tp-snp2` is present (and `#starfish` is absent) | Bypasses countdown timers by setting timer variables to 0. Submits a hidden form or clicks the generate button. Then clicks the `#tp-snp2` continue button. |
| **Page 2** | `#notarobot` element is present | Clicks the parent of the `#notarobot` element to proceed. |
| **Page 3** | `#overlay`, `#getlink`, or `#btn7` is present | Hides the overlay banner. Clears all active intervals. Reveals hidden buttons (`#getlink`, `#btn6`, `#btn7`). Clicks the get-link button, then after 100ms clicks the final button inside `#btn7`. |
| **Page 4** | `#starfish` element is present | Bypasses countdown (sets `count` to 0). Clears all intervals. Reveals `#tp-generate` and `#tp-snp2` elements. Auto-clicks the continue button. |

#### Expected result

- **Page 1**: The countdown is skipped, the generate button or hidden form is triggered, and the "continue" button is clicked — forwarding you to Page 2.
- **Page 2**: The "I'm not a robot" step is auto-clicked, taking you to Page 3.
- **Page 3**: The overlay is removed, the get-link button appears and is clicked, and the final button is auto-clicked — taking you to Page 4 or the destination.
- **Page 4**: The countdown is bypassed and the continue button is auto-clicked, landing you on the final destination page.

---

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser.
2. Open the raw `.js` file from this repo.
3. Tampermonkey will prompt you to install/update the script — click **Install**.
4. The script runs automatically when you visit the matching sites.
