const PasteHandler = (function () {
    'use strict';

    /**
     * Cache DOM.
     */
    const editor = document.getElementById('editor');
    const modal = document.getElementById('my_modal');
    const removeFormattingBtn = document.getElementById('remove_formatting');
    const keepFormattingBtn = document.getElementById('keep_formatting');
    const closeButton = document.getElementsByClassName('close-button')[0];

    /**
     * Event handler for paste event on the editor.
     */
    function handlePasteEvent(event) {
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('text/html');
        const isHTML = pastedData !== '';

        if (isHTML) {
            showModal();
            setModalButtonHandlers(pastedData);
            closeButton.onclick = hideModal;
            event.preventDefault();
        }
    }

    /**
     * Show modal dialog.
     */
    function showModal() {
        modal.style.display = "block";
    }

    /**
     * Hide modal dialog.
     */
    function hideModal() {
        modal.style.display = "none";
    }

    /**
     * Set button handlers in the modal dialog.
     */
    function setModalButtonHandlers(pastedData) {
        removeFormattingBtn.onclick = function () {
            handlePaste(false, pastedData);
            hideModal();
        };

        keepFormattingBtn.onclick = function () {
            handlePaste(true, pastedData);
            hideModal();
        };
    }

    /**
     * Handle paste operation based on user choice.
     */
    function handlePaste(keepFormatting, html) {
        editor.focus();

        if (!keepFormatting) {
            // Convert HTML to plain text
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            const plainText = tempDiv.innerText;
            html = plainText;
        }

        document.execCommand('insertHTML', false, html);
    }

    // Attach event listener
    editor.addEventListener('paste', handlePasteEvent);

    // Public methods
    return {
        handlePaste
    };
})();
