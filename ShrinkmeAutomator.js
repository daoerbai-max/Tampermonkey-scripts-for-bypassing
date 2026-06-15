// ==UserScript==
// @name         Combined Link Bypasser & Observer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automates link bypassing across shrinkme.click, themezon.net, and mrproblogger.com
// @author       ABcr892
// @match        *://en.mrproblogger.com/*
// @match        *://*.shrinkme.click/*
// @match        *://*.themezon.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mrproblogger.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const currentUrl = window.location.href;

    // =========================================================================
    // 1. MRPROBLOGGER.COM HANDLING (Mutation Observer for 'get-link' button)
    // =========================================================================
    if (currentUrl.includes('mrproblogger.com')) {
        console.log("Observer active. Watching for the exact moment the server enables the link...");

        const targetBtn = document.querySelector('.get-link');

        if (!targetBtn) {
            console.error("Could not find the target button.");
            return;
        }

        // If the button is somehow already active, click it immediately
        if (!targetBtn.classList.contains('disabled')) {
            targetBtn.click();
            return;
        }

        // Set up an observer to watch for changes to the button's attributes/classes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const currentClass = mutation.target.className;
                    // If 'disabled' is no longer part of the class list, the server time is up
                    if (!currentClass.includes('disabled')) {
                        console.log("Class change detected! Simulating click event...");
                        mutation.target.click();
                        observer.disconnect(); // Stop watching to prevent infinite loops
                    }
                }
            });
        });

        // Start monitoring the button
        observer.observe(targetBtn, { attributes: true });
    }

    // =========================================================================
    // 2. SHRINKME.CLICK HANDLING
    // =========================================================================
    if (currentUrl.includes('shrinkme.click')) {
        const verificationDiv = document.getElementById("div-human-verification");
        if (verificationDiv) {
            const dataLink = verificationDiv.getAttribute("data-link");
            if (dataLink) {
                window.location.href = "https://themezon.net/link.php?link=" + dataLink;
            }
        }
    }

    // =========================================================================
    // 3. THEMEZON.NET HANDLING
    // =========================================================================
    if (currentUrl.includes('themezon.net')) {
        // Check if we are on the first landing page vs the final page
        // We target the non-search form to submit for Step 2
        const step2Form = document.querySelector('form:not(.search-form)');

        if (step2Form && currentUrl.includes('link.php')) {
            const hiddenForms = document.querySelectorAll('form, a[href*="link"]');
            if (hiddenForms.length > 0) {
                console.log("Found potential landing hooks:", hiddenForms);
            } else {
                console.log("No further redirection elements found in this layout slice.");
            }

            // Submit the form to redirect to the next page
            step2Form.submit();

        } else {
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
                    console.log("Found likely target button, forcing click:", btn);
                    btn.click();
                }
            });
        }
    }
})();
