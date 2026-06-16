// ==UserScript==
// @name         Jobustecher Automation (Flexible)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automates pages 1 to 4 on jobustecher.letest25.co
// @author       Your Name
// @match        *://jobustecher.letest25.co/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // --- PAGE 1 LOGIC ---
    // Runs if standard countdown elements or page 1 buttons exist (but not the page 4 starfish wrapper)
    if ((document.querySelector('#yuidea-btn-before, #yuidea-generate') || document.getElementById('tp-snp2')) && !document.getElementById('starfish')) {
        console.log("Executing Page 1 Automation...");

        // Step 1. bypass banner 10s
        if (typeof downloadCountdown !== 'undefined') downloadCountdown = 0;
        if (typeof counter !== 'undefined') counter = 0;
        if (typeof time !== 'undefined') time = 0;
        if (typeof count !== 'undefined') count = 0;

        const generateBtn = document.querySelector('#yuidea-btn-before, #yuidea-generate button, #btn1, .btn-success');
        const hiddenForm = document.querySelector('#yuidea-generate form, form[action*="universitiestudy"]');

        if (hiddenForm) {
            hiddenForm.submit();
        } else if (generateBtn) {
            generateBtn.click();
        } else {
            ['#yuidea-generate', '#yuidea-wait2', '#yuidea-snp', '#btn1', '#btn2'].forEach(id => {
                const el = document.querySelector(id);
                if (el) {
                    el.style.setProperty('display', 'block', 'important');
                    el.style.setProperty('visibility', 'visible', 'important');
                }
            });

            const link = document.querySelector('#yuidea-generate a, #yuidea-snp a, .btn a');
            if (link) window.location.href = link.href;
        }

        // Step 2. page 1 and 4 click continue
        const p1Continue = document.getElementById('tp-snp2');
        if (p1Continue) p1Continue.click();
    }

    // --- PAGE 2 LOGIC ---
    // Runs specifically if the "notarobot" element is present
    if (document.getElementById('notarobot')) {
        console.log("Executing Page 2 Automation...");

        // Step 1. page 2 click here to continue
        const robotBtn = document.getElementById('notarobot');
        if (robotBtn && robotBtn.parentElement) {
            robotBtn.parentElement.click();
        }
    }

    // --- PAGE 3 LOGIC ---
    // Runs if the overlay banner or the native getlink buttons exist
    if (document.getElementById('overlay') || document.getElementById('getlink') || document.getElementById('btn7')) {
        console.log("Executing Page 3 Automation...");

        // Step 1. page 3 hinde banner
        const overlay = document.getElementById('overlay');
        if (overlay) overlay.style.display = 'none';

        for (let i = 1; i < 99999; i++) window.clearInterval(i);

        if (document.getElementById('tp-time')) document.getElementById('tp-time').style.display = 'none';
        if (document.getElementById('getlink')) document.getElementById('getlink').style.display = 'block';
        if (document.getElementById('btn6')) document.getElementById('btn6').style.display = 'block';

        const finalLinkContainer = document.getElementById('btn7');
        if (finalLinkContainer) {
            finalLinkContainer.style.setProperty('display', 'block', 'important');
        } else {
            window.location.href = "https://jobustecher.letest25.co/geio.php?grey=u6mPD";
        }

        // Step 2. page 3 auto click button
        const getLinkBtn = document.getElementById('getlink');
        if (getLinkBtn) {
            getLinkBtn.style.display = 'block';
            getLinkBtn.click();
        }

        setTimeout(() => {
            const btn6 = document.getElementById('btn6');
            const btn7 = document.getElementById('btn7');

            if (btn6) btn6.style.display = 'none';
            if (btn7) {
                btn7.style.setProperty('display', 'block', 'important');
                const finalBtn = btn7.querySelector('button');
                if (finalBtn) {
                    finalBtn.click();
                } else {
                    btn7.click();
                }
            }
        }, 100);
    }

    // --- PAGE 4 LOGIC ---
    // Runs specifically if the unique 'starfish' layout element is detected
    if (document.getElementById('starfish')) {
        console.log("Executing Page 4 Automation...");

        // Step 1. page 4 bypass 10s
        if (typeof count !== 'undefined') {
            count = 0;
        }

        for (let i = 1; i < 99999; i++) {
            window.clearInterval(i);
        }

        const starfish = document.getElementById('starfish');
        if (starfish) starfish.style.position = 'static';

        const tpGenerate = document.getElementById('tp-generate');
        if (tpGenerate) tpGenerate.style.display = 'block';

        const continueBtn = document.getElementById('tp-snp2');
        if (continueBtn) {
            continueBtn.style.setProperty('display', 'block', 'important');

            // Step 2. page 1 and 4 click continue
            continueBtn.click();
        }
    }
})();
