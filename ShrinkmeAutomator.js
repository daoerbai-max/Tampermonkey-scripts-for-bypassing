// ==UserScript==
// @name         Shrinkme to Themezon Automator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automates link bypassing between shrinkme.click and themezon.net
// @author       Your Name
// @match        *://*.shrinkme.click/*
// @match        *://*.themezon.net/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const currentUrl = window.location.href;

    // === STEP 1: Shrinkme.click Handling ===
    if (currentUrl.includes('shrinkme.click')) {
        const verificationDiv = document.getElementById("div-human-verification");
        if (verificationDiv) {
            const dataLink = verificationDiv.getAttribute("data-link");
            if (dataLink) {
                window.location.href = "https://themezon.net/link.php?link=" + dataLink;
            }
        }
    }

    // === STEP 2 & 3: Themezon.net Handling ===
    if (currentUrl.includes('themezon.net')) {

        // Check if we are on the first landing page (Step 2) vs the final page (Step 3)
        // We target the non-search form to submit for Step 2
        const step2Form = document.querySelector('form:not(.search-form)');

        if (step2Form && currentUrl.includes('link.php')) {
            // --- STEP 2 CODE ---
            const hiddenForms = document.querySelectorAll('form, a[href*="link"]');
            if (hiddenForms.length > 0) {
                console.log("Found potential landing hooks:", hiddenForms);
            } else {
                console.log("No further redirection elements found in this layout slice.");
            }

            // Submit the form to redirect to the next page
            step2Form.submit();

        } else {
            // --- STEP 3 CODE ---
            // 1. Enable disabled elements
            document.querySelectorAll('[disabled]').forEach(el => el.removeAttribute('disabled'));

            // 2. Clear any CSS tricks blocking your clicks
            const style = document.createElement('style');
            style.innerHTML = '* { pointer-events: auto !important; cursor: pointer !important; }';
            document.head.appendChild(style);

            // 3. Look for a button that looks like a confirmation action and click it
            const buttons = document.querySelectorAll('button, input[type="button"], input[type="submit"], .btn, .button');
            buttons.forEach(btn => {
                const textMatch = btn.textContent && btn.textContent.match(/(get|link|go|continue|submit|skip)/i);
                const valueMatch = btn.value && btn.value.match(/(get|link|go|continue|submit|skip)/i);

                if (textMatch || valueMatch) {
                    console.log("?? Found likely target button, forcing click:", btn);
                    btn.click();
                }
            });
        }
    }
})();
